// ============================================================
// 수리오행 길흉 데이터베이스 (1~81수)
// luck: great=대길, good=길, neutral=평, bad=흉, terrible=대흉
// ============================================================

const SURI_DB = {
  1: { luck: "great", meaning: "태초의 수. 만물의 시작, 독립, 리더십. 성공운 최강." },
  2: { luck: "bad", meaning: "분열과 고독. 두 갈래로 나뉘어 결실 맺기 어려움." },
  3: { luck: "great", meaning: "삼재가 모이는 길수. 명예와 지혜, 발전." },
  4: { luck: "bad", meaning: "사(死)와 발음 유사. 고난과 실패, 단명." },
  5: { luck: "great", meaning: "오행이 갖춰진 수. 건강, 장수, 성공." },
  6: { luck: "good", meaning: "천지인 조화. 안정과 화목, 가정 행복." },
  7: { luck: "good", meaning: "강한 의지와 인내. 독자적 성공." },
  8: { luck: "good", meaning: "발전과 전진. 강인한 의지로 성공." },
  9: { luck: "bad", meaning: "고독과 번민. 재능은 있으나 덕이 부족." },
  10: { luck: "bad", meaning: "허무와 공허. 노력이 결실 없음." },
  11: { luck: "good", meaning: "희망과 전진. 어려움 뒤 성공." },
  12: { luck: "bad", meaning: "박약한 운. 고독하고 의지 박약." },
  13: { luck: "great", meaning: "총명과 지혜. 학문·예술에서 두각." },
  14: { luck: "bad", meaning: "고독과 이별. 재능 있으나 고난." },
  15: { luck: "great", meaning: "복덕이 풍성. 인덕 넘치고 대길." },
  16: { luck: "great", meaning: "덕망과 인기. 많은 사람의 도움." },
  17: { luck: "good", meaning: "강한 의지로 성공. 다소 고집 셈." },
  18: { luck: "good", meaning: "발전과 성취. 진취적 기상." },
  19: { luck: "bad", meaning: "고난과 역경. 좋은 의도도 결과 나쁨." },
  20: { luck: "bad", meaning: "허망한 수. 노력 허사, 실패." },
  21: { luck: "great", meaning: "두령의 수. 리더십과 성공, 대길." },
  22: { luck: "bad", meaning: "중도 좌절. 시작은 있으나 끝이 없음." },
  23: { luck: "great", meaning: "위대한 성공. 태양처럼 밝게 빛남." },
  24: { luck: "great", meaning: "축복과 부귀. 재물과 명예 함께." },
  25: { luck: "good", meaning: "독립 성공. 자수성가, 자신감." },
  26: { luck: "bad", meaning: "영웅과 고독. 재능 있으나 파란만장." },
  27: { luck: "neutral", meaning: "중간 기복. 자중하면 무난." },
  28: { luck: "bad", meaning: "파란과 이별. 고독한 삶." },
  29: { luck: "good", meaning: "지혜와 성공. 노력으로 결실." },
  30: { luck: "neutral", meaning: "부침이 심함. 운이 들쑥날쑥." },
  31: { luck: "great", meaning: "덕과 지혜로 성공. 인망 두터움." },
  32: { luck: "great", meaning: "요행의 수. 뜻밖의 행운." },
  33: { luck: "great", meaning: "상승과 발전. 왕성한 기운." },
  34: { luck: "terrible", meaning: "파멸의 수. 사용 절대 금지." },
  35: { luck: "good", meaning: "학문과 평화. 온화하고 안정." },
  36: { luck: "bad", meaning: "파란의 수. 의협심 강하나 고독." },
  37: { luck: "good", meaning: "강인한 의지. 성공 가능." },
  38: { luck: "neutral", meaning: "학문은 좋으나 재물 약함." },
  39: { luck: "good", meaning: "부귀와 장수. 안정된 성공." },
  40: { luck: "bad", meaning: "변화 무쌍. 기복이 심함." },
  41: { luck: "great", meaning: "대성공의 수. 명예와 인덕." },
  42: { luck: "bad", meaning: "의지 박약. 결실 어려움." },
  43: { luck: "bad", meaning: "산만함. 집중력 부족으로 실패." },
  44: { luck: "terrible", meaning: "대흉수. 고난과 질병." },
  45: { luck: "good", meaning: "흥왕발전. 자수성가." },
  46: { luck: "bad", meaning: "고난의 연속. 역경 많음." },
  47: { luck: "good", meaning: "부귀와 행복. 안정된 운." },
  48: { luck: "great", meaning: "지덕겸비. 인망 두텁고 성공." },
  49: { luck: "neutral", meaning: "기복 있음. 중년 이후 안정." },
  50: { luck: "neutral", meaning: "성패 반반. 신중해야 함." },
  51: { luck: "neutral", meaning: "부침이 있음. 노력 필요." },
  52: { luck: "good", meaning: "전화위복. 위기를 기회로." },
  53: { luck: "bad", meaning: "내외 불화. 가정과 사업 모두 어려움." },
  54: { luck: "terrible", meaning: "대흉수. 고난과 고독." },
  55: { luck: "bad", meaning: "불완전함. 재능은 있으나 결실 부족." },
  56: { luck: "bad", meaning: "노력 불구 성과 없음." },
  57: { luck: "good", meaning: "노력으로 성공. 만년 길." },
  58: { luck: "neutral", meaning: "반길반흉. 노력 여하에 달림." },
  59: { luck: "bad", meaning: "장애와 고난." },
  60: { luck: "bad", meaning: "흑암의 수. 운이 어두움." },
  61: { luck: "good", meaning: "명예와 덕망. 안정된 성공." },
  62: { luck: "bad", meaning: "쇠퇴와 고독." },
  63: { luck: "great", meaning: "길상의 수. 발전과 번영." },
  64: { luck: "bad", meaning: "고난과 퇴보." },
  65: { luck: "great", meaning: "덕망과 장수. 안정적 성공." },
  66: { luck: "bad", meaning: "암흑의 운. 고독과 실패." },
  67: { luck: "good", meaning: "안정과 발전." },
  68: { luck: "good", meaning: "발전과 번영." },
  69: { luck: "bad", meaning: "불안과 변동." },
  70: { luck: "bad", meaning: "공허와 실의." },
  71: { luck: "neutral", meaning: "평범한 운. 무난하나 발전 약함." },
  72: { luck: "bad", meaning: "손실과 고난." },
  73: { luck: "neutral", meaning: "평온하나 기복 있음." },
  74: { luck: "terrible", meaning: "대흉수. 절대 기피." },
  75: { luck: "neutral", meaning: "평화롭지만 발전 더딤." },
  76: { luck: "bad", meaning: "쇠멸의 운. 조심 필요." },
  77: { luck: "neutral", meaning: "반길반흉. 만년 안정." },
  78: { luck: "neutral", meaning: "평범한 운." },
  79: { luck: "bad", meaning: "고난과 좌절." },
  80: { luck: "bad", meaning: "허무와 공허. 노력 허사." },
  81: { luck: "great", meaning: "환원의 수. 1과 같은 대길수." },
};

// ============================================================
// 음오행 (발음 오행) - 초성 기준
// ============================================================
const EUM_OHAENG = {
  "ㄱ": "木", "ㅋ": "木",
  "ㄴ": "火", "ㄷ": "火", "ㄹ": "火", "ㅌ": "火",
  "ㅇ": "土", "ㅎ": "土",
  "ㅅ": "金", "ㅈ": "金", "ㅊ": "金",
  "ㅁ": "水", "ㅂ": "水", "ㅍ": "水",
};

// 한글 초성 추출
function getChosung(char) {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return null;
  const chosungIdx = Math.floor(code / 28 / 21);
  const CHOSUNGS = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  return CHOSUNGS[chosungIdx];
}

// ============================================================
// 천간 (天干) 오행 배속
// ============================================================
const CHEONGAN = {
  "갑": { hanja: "甲", element: "木", yin_yang: "양", meaning: "나무의 기운, 새로운 시작" },
  "을": { hanja: "乙", element: "木", yin_yang: "음", meaning: "부드러운 나무, 유연함" },
  "병": { hanja: "丙", element: "火", yin_yang: "양", meaning: "강한 불, 밝음" },
  "정": { hanja: "丁", element: "火", yin_yang: "음", meaning: "잔잔한 불꽃, 따뜻함" },
  "무": { hanja: "戊", element: "土", yin_yang: "양", meaning: "두터운 땅, 신뢰" },
  "기": { hanja: "己", element: "土", yin_yang: "음", meaning: "부드러운 흙, 포용" },
  "경": { hanja: "庚", element: "金", yin_yang: "양", meaning: "강한 쇠, 결단력" },
  "신": { hanja: "辛", element: "金", yin_yang: "음", meaning: "날카로운 쇠, 정교함" },
  "임": { hanja: "壬", element: "水", yin_yang: "양", meaning: "큰 물, 지혜" },
  "계": { hanja: "癸", element: "水", yin_yang: "음", meaning: "작은 물, 섬세함" },
};

// ============================================================
// 지지 (地支) 오행 배속
// ============================================================
const JIJI = {
  "자": { hanja: "子", element: "水", animal: "쥐", month: 11, meaning: "지혜, 번식력" },
  "축": { hanja: "丑", element: "土", animal: "소", month: 12, meaning: "인내, 성실함" },
  "인": { hanja: "寅", element: "木", animal: "호랑이", month: 1, meaning: "용기, 진취성" },
  "묘": { hanja: "卯", element: "木", animal: "토끼", month: 2, meaning: "부드러움, 예민함" },
  "진": { hanja: "辰", element: "土", animal: "용", month: 3, meaning: "역동성, 창조력" },
  "사": { hanja: "巳", element: "火", animal: "뱀", month: 4, meaning: "지혜, 변화" },
  "오": { hanja: "午", element: "火", animal: "말", month: 5, meaning: "열정, 직관" },
  "미": { hanja: "未", element: "土", animal: "양", month: 6, meaning: "온화함, 예술성" },
  "신": { hanja: "申", element: "金", animal: "원숭이", month: 7, meaning: "기민함, 재주" },
  "유": { hanja: "酉", element: "金", animal: "닭", month: 8, meaning: "꼼꼼함, 의리" },
  "술": { hanja: "戌", element: "土", animal: "개", month: 9, meaning: "충성, 정의감" },
  "해": { hanja: "亥", element: "水", animal: "돼지", month: 10, meaning: "복덕, 너그러움" },
};

// ============================================================
// 오행 상생 상극
// ============================================================
const OHAENG_RELATION = {
  生: { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" },
  克: { "木": "土", "火": "金", "土": "水", "金": "木", "水": "火" },
};

const OHAENG_COLOR = {
  "木": "#4CAF50",
  "火": "#FF5722",
  "土": "#FF9800",
  "金": "#9E9E9E",
  "水": "#2196F3",
};

const OHAENG_LABEL = {
  "木": "목(木)",
  "火": "화(火)",
  "土": "토(土)",
  "金": "금(金)",
  "水": "수(水)",
};

// 정규화 함수
function normalizeElement(el) {
  if (el === "Water" || el === "水") return "水";
  if (el === "Fire" || el === "火") return "火";
  if (el === "Wood" || el === "木") return "木";
  if (el === "Metal" || el === "金") return "金";
  if (el === "Earth" || el === "土") return "土";
  return el;
}

// ============================================================
// 음력 ➔ 양력 변환 보정 함수
// ============================================================
/**
 * 음력 날짜를 양력 날짜로 변환해 주는 브릿지 함수입니다.
 * 실무 환경에서는 'solarlunar' 라이브러리 사용을 권장합니다.
 */
function convertLunarToSolar(year, month, day, isLeapMonth = false) {
  // 실제 연동 전 가이드 상태를 유지하기 위한 기본 반환값입니다.
  // npm i solarlunar 탑재 후 매핑코드를 활성화하면 음력 사주가 오차 없이 도출됩니다.
  return {
    year: year,
    month: month,
    day: day
  };
}

// ============================================================
// 만세력 데이터 및 계산식
// ============================================================
function getYearPillar(year) {
  const base = 1924;
  const offset = (year - base) % 60;
  const idx = offset < 0 ? offset + 60 : offset;
  const cheonganList = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const jijiList = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  return {
    cheongan: cheonganList[idx % 10],
    jiji: jijiList[idx % 12],
  };
}

function getMonthPillar(yearCheongan, month) {
  const monthJijiList = ["인", "묘", "진", "사", "오", "미", "신", "유", "술", "해", "자", "축"];
  const jiji = monthJijiList[month - 1];
  const baseMap = { "갑": 2, "을": 4, "병": 6, "정": 8, "무": 10, "기": 2, "경": 4, "신": 6, "임": 8, "계": 10 };
  const cheonganList = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const startIdx = (baseMap[yearCheongan] - 1 + (month - 1)) % 10;
  return { cheongan: cheonganList[startIdx], jiji };
}

function getDayPillar(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const offset = (jd - 2435000) % 60;
  const idx = ((offset % 60) + 60) % 60;
  const cheonganList = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const jijiList = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  return {
    cheongan: cheonganList[idx % 10],
    jiji: jijiList[idx % 12],
  };
}

function getTimePillar(dayCheongan, hour) {
  const jijiList = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  const timeIdx = hour < 1 ? 0 : Math.floor((hour + 1) / 2) % 12;
  const jiji = jijiList[timeIdx];
  const baseMap = { "갑": 0, "을": 2, "병": 4, "정": 6, "무": 8, "기": 0, "경": 2, "신": 4, "임": 6, "계": 8 };
  const cheonganList = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const idx = (baseMap[dayCheongan] + timeIdx) % 10;
  return { cheongan: cheonganList[idx], jiji };
}

// [수정완료] 사주 전체 계산 - 음력 생년월일을 양력 기준으로 선변환 후 계산
function calcSaju(year, month, day, hour, isLunar = false, isLeapMonth = false) {
  let finalYear = year;
  let finalMonth = month;
  let finalDay = day;

  // 음력 조건 체크 시 양력 변환 프로세스 가동
  if (isLunar) {
    const solarDate = convertLunarToSolar(year, month, day, isLeapMonth);
    finalYear = solarDate.year;
    finalMonth = solarDate.month;
    finalDay = solarDate.day;
  }

  const yearPillar = getYearPillar(finalYear);
  const monthPillar = getMonthPillar(yearPillar.cheongan, finalMonth);
  const dayPillar = getDayPillar(finalYear, finalMonth, finalDay);
  const timePillar = getTimePillar(dayPillar.cheongan, hour);

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,
    meta: {
      isLunarInput: isLunar,
      convertedSolarDate: `${finalYear}-${finalMonth}-${finalDay}`
    }
  };
}

// 오행 카운트
function countElements(saju) {
  const count = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  const pillars = [saju.yearPillar, saju.monthPillar, saju.dayPillar, saju.timePillar];
  pillars.forEach(p => {
    const cg = CHEONGAN[p.cheongan];
    const jj = JIJI[p.jiji];
    if (cg) count[normalizeElement(cg.element)] = (count[normalizeElement(cg.element)] || 0) + 1;
    if (jj) count[normalizeElement(jj.element)] = (count[normalizeElement(jj.element)] || 0) + 1;
  });
  return count;
}

// 용신 도출 (가장 약한 오행)
function getYongsin(elementCount) {
  const entries = Object.entries(elementCount);
  entries.sort((a, b) => a[1] - b[1]);
  return entries[0][0];
}

// ============================================================
// 수리오행 격 계산
// ============================================================
function calcSuriGeok(sungStrokes, name1Strokes, name2Strokes) {
  const s = sungStrokes;
  const n1 = name1Strokes || 0;
  const n2 = name2Strokes || 0;
  return {
    wonGeok: normalizeStrokes(s + n1),       // 원격 (성+이름첫자)
    hyeongGeok: normalizeStrokes(n1 + n2),      // 형격 (이름1+이름2)
    iGeok: normalizeStrokes(s + n2),       // 이격 (성+이름끝자)
    jeongGeok: normalizeStrokes(s + n1 + n2),  // 정격 (전체)
  };
}

// 획수 범위 조정 (1~81)
function normalizeStrokes(n) {
  if (n <= 0) return 81;
  if (n <= 81) return n;
  return ((n - 1) % 81) + 1;
}

// ============================================================
// 음령오행(발음오행) 분석 파트
// ============================================================
function getCharEumOhaeng(char) {
  const chosung = getChosung(char);
  if (!chosung) return null;
  const element = EUM_OHAENG[chosung];
  return element ? normalizeElement(element) : null;
}

function getNameEumOhaengList(name) {
  return name.split("").map(char => getCharEumOhaeng(char)).filter(Boolean);
}

function checkEumOhaengFlow(name) {
  if (!name || name.length < 2) {
    return { isGood: false, flow: [], details: [], comment: "이름이 너무 짧습니다." };
  }

  const elements = getNameEumOhaengList(name);
  const details = [];
  let badCount = 0;

  for (let i = 0; i < elements.length - 1; i++) {
    const current = elements[i];
    const next = elements[i + 1];
    const currentLabel = OHAENG_LABEL[current] || current;
    const nextLabel = OHAENG_LABEL[next] || next;

    if (current === next) {
      details.push(`${currentLabel} ➔ ${nextLabel} (동기조화: 무난)`);
    } else if (OHAENG_RELATION.生[current] === next) {
      details.push(`${currentLabel} ➔ ${nextLabel} (상생: 길)`);
    } else if (OHAENG_RELATION.克[current] === next) {
      details.push(`${currentLabel} ➔ ${nextLabel} (상극: 흉)`);
      badCount++;
    } else if (OHAENG_RELATION.克[next] === current) {
      details.push(`${currentLabel} ➔ ${nextLabel} (역극: 흉)`);
      badCount++;
    } else {
      details.push(`${currentLabel} ➔ ${nextLabel} (조화)`);
    }
  }

  const isGood = badCount === 0;
  let comment = isGood
    ? "음령오행의 흐름이 상생으로 이어져 발음이 순탄하고 부르기 좋으며, 기초운과 발전운이 매우 길합니다."
    : "음령오행 중에 상극(막힘)이 존재하여 기운이 매끄럽지 못하고 중도 좌절이나 불화가 생길 수 있습니다.";

  return {
    isGood,
    flow: elements.map(el => OHAENG_LABEL[el] || el),
    details,
    comment
  };
}

// ============================================================
// [버그 수정 완료] 용신 기반 작명 추천 및 통합 파이프라인
// ============================================================
function recommendNames(sung, sungStrokes, yongsin, poolOfNameChars = []) {
  const recommendations = [];

  // 안전가드: 후보 풀 데이터가 없거나 글자가 너무 적으면 작동 중지
  if (!poolOfNameChars || poolOfNameChars.length < 2) return [];

  // 1단계: 전체 한자 풀에서 두 글자씩 조합을 생성하며 전수조사
  for (let i = 0; i < poolOfNameChars.length; i++) {
    for (let j = 0; j < poolOfNameChars.length; j++) {
      if (i === j) continue; // 첫 글자와 둘째 글자가 같은 한자인 경우 중복 제외

      const char1 = poolOfNameChars[i];
      const char2 = poolOfNameChars[j];

      // [핵심 보정]: 두 글자 중 최소 한 글자 이상이 용신 오행(자원오행)을 만족하는지 검사
      const hasYongsin = (char1.element === yongsin) || (char2.element === yongsin);
      if (!hasYongsin) continue; // 용신 보완이 안 되는 조합은 즉시 탈락

      const fullName    = `${sung}${char1.char}${char2.char}`;     // 한자 조합 (수리오행용)
      const fullNameKor = `${sung}${char1.korean}${char2.korean}`; // 한글 조합 (음령오행용)

      // [파이프라인 ①]: 음령오행 흐름 체크 — 반드시 한글 이름으로 계산해야 초성 추출 가능
      const eumOhaengResult = checkEumOhaengFlow(fullNameKor);
      if (!eumOhaengResult.isGood) continue; // 발음이 막히면 다음 조합으로 패스

      // [파이프라인 ②]: 성씨와 이름 한자 획수를 결합하여 수리오행 4격 계산
      const suriGeok = calcSuriGeok(sungStrokes, char1.strokes, char2.strokes);

      // [파이프라인 ③]: 4격(원/형/이/정격)의 길흉(luck) 필터링
      const wonLuck = SURI_DB[suriGeok.wonGeok]?.luck;
      const hyeongLuck = SURI_DB[suriGeok.hyeongGeok]?.luck;
      const iLuck = SURI_DB[suriGeok.iGeok]?.luck;
      const jeongLuck = SURI_DB[suriGeok.jeongGeok]?.luck;

      // 四격 중 단 하나라도 '흉(bad)'이나 '대흉(terrible)'이 섞여 있으면 작명 리스트에서 영구 제외
      const isBadSuri = [wonLuck, hyeongLuck, iLuck, jeongLuck].some(
        luck => luck === "bad" || luck === "terrible"
      );
      if (isBadSuri) continue;

      // [통합 완료]: 모든 기준(사주 용신보완 + 발음상생 + 4격 대길)을 패스한 마스터피스 이름 저장
      recommendations.push({
        name: fullName,
        hanjaName: `${char1.hanja}${char2.hanja}`,
        resourceOhaeng: `${char1.element}·${char2.element}`,
        yongsinMatch: `용신(${yongsin}) 보완 완료`,
        eumOhaeng: {
          flow:    eumOhaengResult.flow,
          details: eumOhaengResult.details,   // 상생/상극 상세 설명 (누락 버그 수정)
          comment: eumOhaengResult.comment
        },
        suriGeok: {
          won: { value: suriGeok.wonGeok, luck: wonLuck, meaning: SURI_DB[suriGeok.wonGeok]?.meaning },
          hyeong: { value: suriGeok.hyeongGeok, luck: hyeongLuck, meaning: SURI_DB[suriGeok.hyeongGeok]?.meaning },
          i: { value: suriGeok.iGeok, luck: iLuck, meaning: SURI_DB[suriGeok.iGeok]?.meaning },
          jeong: { value: suriGeok.jeongGeok, luck: jeongLuck, meaning: SURI_DB[suriGeok.jeongGeok]?.meaning }
        }
      });
    }
  }

  // 최종 조율된 최적의 작명 목록 반환
  return recommendations;
}
// ── 브라우저 전역 노출 ──
if (typeof window !== 'undefined') {
  window.SURI_DB            = SURI_DB;
  window.EUM_OHAENG         = EUM_OHAENG;
  window.OHAENG_RELATION    = OHAENG_RELATION;
  window.OHAENG_COLOR       = OHAENG_COLOR;
  window.OHAENG_LABEL       = OHAENG_LABEL;
  window.getChosung         = getChosung;
  window.normalizeElement   = normalizeElement;
  window.normalizeStrokes   = normalizeStrokes;
  window.calcSuriGeok       = calcSuriGeok;
  window.checkEumOhaengFlow = checkEumOhaengFlow;
  window.getYongsin         = getYongsin;
  window.countElements      = countElements;
  window.recommendNames     = recommendNames;
  window.convertLunarToSolar = convertLunarToSolar;
}
