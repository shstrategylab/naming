/**
 * manseryok.js — 만세력(萬歲曆) 핵심 계산 모듈
 * 역할: 생년월일시 → 연주·월주·일주·시주(四柱) 계산
 * 의존: 없음 (순수 계산 모듈)
 */
const Manseryok = (() => {

  const CHEONGAN    = ['갑','을','병','정','무','기','경','신','임','계'];
  const CHEONGAN_HJ = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  const JIJI        = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  const JIJI_HJ     = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

  // 오행 인덱스: 0=목 1=화 2=토 3=금 4=수
  const STEM_OHENG_IDX   = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  const BRANCH_OHENG_IDX = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
  const OHENG_NAMES      = ['목', '화', '토', '금', '수'];
  const OHENG_HJ         = ['木', '火', '土', '金', '水'];
  const BRANCH_MAIN_STEM = [9, 5, 0, 1, 4, 2, 3, 5, 6, 7, 4, 8];

  const CHEONGAN_OHENG = {}, CHEONGAN_UMNYANG = {};
  CHEONGAN.forEach((g, i) => {
    CHEONGAN_OHENG[g]   = OHENG_NAMES[STEM_OHENG_IDX[i]];
    CHEONGAN_UMNYANG[g] = i % 2 === 0 ? '양' : '음';
  });

  const JIJI_OHENG = {}, JIJI_UMNYANG = {};
  JIJI.forEach((j, i) => {
    JIJI_OHENG[j]   = OHENG_NAMES[BRANCH_OHENG_IDX[i]];
    JIJI_UMNYANG[j] = i % 2 === 0 ? '양' : '음';
  });

  // ── 절기 입절일 테이블 ─────────────────────────────────────────
  // [소한,입춘,경칩,청명,입하,망종,소서,입추,백로,한로,입동,대설]
  const JIEQI = {
    default: [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7],
    1944:[6,5,6,5,6,6,7,8,8,8,8,7], 1945:[6,4,6,5,6,6,7,8,8,9,8,7],
    1946:[6,4,6,5,6,6,7,8,8,9,8,8], 1947:[6,4,6,5,6,6,7,8,8,9,8,8],
    1948:[6,5,6,5,6,6,7,8,8,8,8,7], 1949:[6,4,6,5,6,6,7,8,8,9,8,7],
    1950:[6,4,6,5,6,6,7,8,8,9,8,8], 1951:[6,4,6,5,6,6,7,8,8,9,8,8],
    1952:[6,5,6,5,6,6,7,8,8,8,8,7], 1953:[6,4,6,5,6,6,7,8,8,9,8,7],
    1954:[6,4,6,5,6,6,7,8,8,9,8,8], 1955:[6,4,6,5,6,6,7,8,8,9,8,8],
    1956:[6,5,6,5,6,6,7,8,8,8,8,7], 1957:[6,4,6,5,6,6,7,8,8,9,8,7],
    1958:[6,4,6,5,6,6,7,8,8,9,8,8], 1959:[6,4,6,5,6,6,7,8,8,9,8,8],
    1960:[6,5,6,5,6,6,7,8,8,8,8,7], 1961:[6,4,6,5,6,6,7,8,8,9,8,7],
    1962:[6,4,6,5,6,6,7,8,8,9,8,8], 1963:[6,4,6,5,6,6,7,8,8,9,8,8],
    1964:[6,5,6,5,6,6,7,8,8,8,8,7], 1965:[6,4,6,5,6,6,7,8,8,9,8,7],
    1966:[6,4,6,5,6,6,7,8,8,9,8,8], 1967:[6,4,6,5,6,6,7,8,8,9,8,8],
    1968:[6,5,6,5,6,6,7,8,8,8,8,7], 1969:[6,4,6,5,6,6,7,8,8,9,8,7],
    1970:[6,4,6,5,6,6,7,8,8,9,8,8], 1971:[6,4,6,5,6,6,7,8,8,9,8,8],
    1972:[6,5,6,5,6,6,7,8,8,8,8,7], 1973:[6,4,6,5,6,6,7,8,8,9,8,7],
    1974:[6,4,6,5,6,6,7,8,8,9,8,8], 1975:[6,4,6,5,6,6,7,8,8,9,8,8],
    1976:[6,5,6,5,6,6,7,8,8,8,8,7], 1977:[6,4,6,5,6,6,7,8,8,9,8,7],
    1978:[6,4,6,5,6,6,7,8,8,9,8,8], 1979:[6,4,6,5,6,6,7,8,8,9,8,8],
    1980:[6,5,6,5,6,6,7,8,8,8,8,7], 1981:[6,4,6,5,6,6,7,8,8,9,8,7],
    1982:[6,4,6,5,6,6,7,8,8,9,8,8], 1983:[6,4,6,5,6,6,7,8,8,9,8,8],
    1984:[6,5,6,5,6,6,7,8,8,8,8,7], 1985:[6,4,6,5,6,6,7,8,8,9,8,7],
    1986:[6,4,6,5,6,6,7,8,8,9,8,8], 1987:[6,4,6,5,6,6,7,8,8,9,8,8],
    1988:[6,5,6,5,6,6,7,8,8,8,8,7], 1989:[6,4,6,5,6,6,7,8,8,9,8,7],
    1990:[6,4,6,5,6,6,7,8,8,9,8,7], 1991:[6,4,6,5,6,6,7,8,8,9,8,8],
    1992:[6,5,6,5,6,6,7,8,8,8,8,7], 1993:[6,4,6,5,6,6,7,8,8,9,8,7],
    1994:[6,4,6,5,6,6,7,8,8,9,8,8], 1995:[6,4,6,5,6,6,7,8,8,9,8,8],
    1996:[6,5,6,5,6,6,7,8,8,8,8,7], 1997:[6,4,6,5,6,6,7,8,8,9,8,7],
    1998:[6,4,6,5,6,6,7,8,8,9,8,8], 1999:[6,4,6,5,6,6,7,8,8,9,8,8],
    2000:[6,5,6,5,6,6,7,8,8,8,8,7], 2001:[6,4,6,5,6,6,7,8,8,9,8,7],
    2002:[6,4,6,5,6,6,7,8,8,9,8,8], 2003:[6,4,6,5,6,6,7,8,8,9,8,8],
    2004:[6,5,6,5,6,6,7,8,8,8,8,7], 2005:[6,4,6,5,6,6,7,8,8,9,8,7],
    2006:[6,4,6,5,6,6,7,8,8,9,8,8], 2007:[6,4,6,5,6,6,7,8,8,9,8,8],
    2008:[6,6,6,5,5,6,7,8,8,8,7,7], 2009:[6,4,6,5,6,6,7,8,8,9,8,7],
    2010:[6,5,6,5,6,6,7,7,8,8,7,7], 2011:[6,4,6,5,6,6,7,8,8,9,8,7],
    2012:[6,5,6,4,5,6,7,7,8,8,7,7], 2013:[6,4,6,5,6,6,7,7,8,8,7,7],
    2014:[6,4,6,5,6,6,7,8,8,8,7,7], 2015:[6,4,6,5,6,6,7,8,8,8,8,7],
    2016:[6,5,6,4,5,6,7,7,8,8,7,7], 2017:[6,4,6,5,6,6,7,7,8,8,7,7],
    2018:[6,4,6,5,6,6,7,7,8,8,7,7], 2019:[6,4,6,5,6,6,7,8,8,8,8,7],
    2020:[6,6,6,5,5,6,7,8,8,8,7,7], 2021:[6,4,6,5,6,6,7,7,8,8,7,7],
    2022:[6,4,6,5,6,6,7,7,8,8,7,7], 2023:[6,4,6,5,6,6,7,7,8,8,7,7],
    2024:[6,5,6,4,5,6,7,7,8,8,7,7], 2025:[6,4,6,5,6,6,7,7,8,8,7,7],
    2026:[6,4,6,5,6,6,7,7,8,8,7,7], 2027:[6,4,6,5,6,6,7,7,8,8,7,7],
    2028:[6,5,6,4,5,6,7,7,8,8,7,7], 2029:[6,4,6,5,6,6,7,7,8,8,7,7],
    2030:[6,4,6,5,6,6,7,7,8,8,7,7],
  };

  function getJieqi(year) {
    return JIEQI[year] || JIEQI.default;
  }

  function julianDay(y, m, d) {
    const a = Math.floor((14 - m) / 12);
    const yr = y - a, mo = m + 12 * a - 2;
    return d + Math.floor((153 * mo + 2) / 5) + 365 * yr
      + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045;
  }

  function getYeonju(year, month, day) {
    // 입춘 이전이면 전년도 기준
    const jq = getJieqi(year);
    const useYear = (month === 1 || (month === 2 && day < jq[1])) ? year - 1 : year;
    const base = 1924; // 甲子년
    let off = (useYear - base) % 60;
    if (off < 0) off += 60;
    return {
      stemIdx: off % 10, branchIdx: off % 12,
      gan: CHEONGAN[off % 10], ji: JIJI[off % 12],
      ganHJ: CHEONGAN_HJ[off % 10], jiHJ: JIJI_HJ[off % 12],
    };
  }

  function getWolju(year, month, day) {
    const jq = getJieqi(year);
    // 해당 월 절기일 이전이면 전달 월지
    const entered = day >= jq[month - 1];
    let wm = entered ? month : month - 1;
    let wy = year;
    if (wm <= 0) { wm += 12; wy--; }

    // 월지: 인(1월)~축(12월) 순서
    const JI_IDX = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];
    const branchIdx = JI_IDX[wm - 1];

    // 연간 기준 (입춘 이전이면 전년 연간 사용)
    const jq2 = getJieqi(wy);
    const yeonStemIdx = (() => {
      const useY = (wm <= 2 && (wm === 1 || day < jq2[1])) ? wy - 1 : wy;
      const base = 1924;
      let off = (useY - base) % 60;
      if (off < 0) off += 60;
      return off % 10;
    })();

    // 월간 기산표 (년간 인덱스 → 인월 천간 인덱스)
    const BASE_MAP = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
    const stemIdx = (BASE_MAP[yeonStemIdx] + (wm - 1)) % 10;

    return {
      stemIdx, branchIdx,
      gan: CHEONGAN[stemIdx], ji: JIJI[branchIdx],
      ganHJ: CHEONGAN_HJ[stemIdx], jiHJ: JIJI_HJ[branchIdx],
    };
  }

  function getIlju(year, month, day) {
    const jd = julianDay(year, month, day);
    const base = julianDay(1955, 1, 1); // 甲子일 기준
    let off = ((jd - base) % 60 + 60) % 60;
    return {
      stemIdx: off % 10, branchIdx: off % 12,
      gan: CHEONGAN[off % 10], ji: JIJI[off % 12],
      ganHJ: CHEONGAN_HJ[off % 10], jiHJ: JIJI_HJ[off % 12],
    };
  }

  function getSiju(hour, dayStemIdx) {
    if (hour === null || hour === undefined || hour === '') return null;
    const h = parseInt(hour);
    let ti;
    if (h === 23 || h < 1) ti = 0;       // 자시(23~00)
    else ti = Math.floor((h + 1) / 2) % 12;
    const BASE_MAP = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    const stemIdx = (BASE_MAP[dayStemIdx] + ti) % 10;
    return {
      stemIdx, branchIdx: ti,
      gan: CHEONGAN[stemIdx], ji: JIJI[ti],
      ganHJ: CHEONGAN_HJ[stemIdx], jiHJ: JIJI_HJ[ti],
    };
  }

  return {
    CHEONGAN, CHEONGAN_HJ, JIJI, JIJI_HJ,
    STEM_OHENG_IDX, BRANCH_OHENG_IDX, OHENG_NAMES, OHENG_HJ,
    CHEONGAN_OHENG, CHEONGAN_UMNYANG,
    JIJI_OHENG, JIJI_UMNYANG,
    BRANCH_MAIN_STEM,
    JIEQI, getJieqi, julianDay,
    getYeonju, getWolju, getIlju, getSiju,
  };
})();

if (typeof module !== "undefined") module.exports = Manseryok;
if (typeof globalThis !== "undefined") globalThis.Manseryok = Manseryok;
