/**
 * naming-engine.js — 작명 엔진
 * 의존: naming-db.js, saju-engine.js
 *
 * 핵심 원리:
 *   1. 자원오행(字源五行): 한자의 뜻·형태 오행이 용신과 일치
 *   2. 음령오행(音靈五行): 이름 초성 발음 오행이 용신과 상생
 *   3. 수리성명학: 4격(원·형·이·정) 모두 길수 조합
 *   4. 음령오행 상생 흐름: 성씨→이름1→이름2 상생 or 동기(同氣)
 *   5. 대흉수(34·44·54·74) 완전 배제
 */
const NamingEngine = (() => {

  const OH_NAMES = ['목', '화', '토', '금', '수'];
  const OH_HJ    = ['木', '火', '土', '金', '水'];

  // 오행 상생: 목→화→토→금→수→목
  function isShangsheng(from, to) {
    return (from + 1) % 5 === to;
  }
  // 오행 상극: 목극토, 화극금, 토극수, 금극목, 수극화
  function isShangke(from, to) {
    return (from + 2) % 5 === to;
  }
  // 동기(同氣)
  function isSame(a, b) { return a === b; }
  // 길한 관계 (상생 or 동기)
  function isGil(from, to) { return isSame(from, to) || isShangsheng(from, to); }

  /**
   * 이름 후보 생성
   * @param {object} sajuResult   SajuEngine.analyze() 결과
   * @param {string} surname      성씨 한글
   * @param {number} nameLen      이름 글자 수 (1 or 2)
   * @param {string} gender       'M'|'F'|'N'
   * @param {Array}  fortunePref  원하는 운 배열
   * @returns {Array} 점수 내림차순 이름 후보 목록
   */
  function generateNames(sajuResult, surname, nameLen, gender, fortunePref = []) {
    const DB = (typeof HANJA_DB !== 'undefined') ? HANJA_DB : require('./naming-db').HANJA_DB;
    const SD = (typeof SURI_DB  !== 'undefined') ? SURI_DB  : require('./naming-db').SURI_DB;

    const yongsinIdxArr = sajuResult.yongsin.yongsin.map(y => y.idx);
    const heesinIdxArr  = sajuResult.yongsin.heesin.map(y => y.idx);
    const gisinIdxArr   = sajuResult.yongsin.gisin.map(y => y.idx);
    const yong = yongsinIdxArr[0]; // 주용신
    const hee  = heesinIdxArr[0];  // 희신

    const surnameStroke = getSurnameStroke(surname);
    const surnameEumOh  = getEumOh(surname[surname.length - 1]); // 성씨 끝자 발음

    // 성별 필터
    const gFilter = h => gender === 'M' ? h.gender !== 'F'
                       : gender === 'F' ? h.gender !== 'M' : true;

    // 자원오행 점수 (용신 일치=3, 희신=2, 기신=-1, 나머지=1)
    function jawonScore(oh) {
      if (yongsinIdxArr.includes(oh)) return 3;
      if (heesinIdxArr.includes(oh))  return 2;
      if (gisinIdxArr.includes(oh))   return -1;
      return 1;
    }

    // 음령오행 점수
    function eumScore(korChar) {
      const oh = getEumOh(korChar);
      if (yongsinIdxArr.includes(oh)) return 3;
      if (heesinIdxArr.includes(oh))  return 2;
      if (gisinIdxArr.includes(oh))   return 0;
      return 1;
    }

    // 수리 격 점수
    function suriScore(geok) {
      const scores = ['won', 'hyeong', 'i', 'jeong'].map(k => luckScore(SD[geok[k]]?.luck));
      // 정격·원격 가중치 높음
      return scores[0] * 1.5 + scores[1] + scores[2] + scores[3] * 2;
    }

    // 음령 흐름 점수 (성씨→이름1→이름2)
    function eumFlowScore(oh1, oh2) {
      let s = 0;
      if (isGil(surnameEumOh, oh1)) s += 2;
      else if (!isShangke(surnameEumOh, oh1)) s += 1;
      if (oh2 !== null && isGil(oh1, oh2)) s += 2;
      else if (oh2 !== null && !isShangke(oh1, oh2)) s += 1;
      return s;
    }

    const candidates = [];
    const pool = DB.filter(gFilter);
    const yongPool = pool.filter(h => yongsinIdxArr.includes(h.oh));
    const heePool  = pool.filter(h => heesinIdxArr.includes(h.oh));
    const mixPool  = [...yongPool, ...heePool];

    if (nameLen === 2) {
      // 이름1: 용신/희신, 이름2: 용신/희신 조합
      const limit1 = Math.min(mixPool.length, 30);
      const limit2 = Math.min(mixPool.length, 30);
      for (let i = 0; i < limit1; i++) {
        const h1 = mixPool[i];
        for (let j = 0; j < limit2; j++) {
          const h2 = mixPool[j];
          if (h1.char === h2.char) continue;
          const geok = getSuriGeok(surnameStroke, h1.stroke, h2.stroke);
          if (hasTerrible(geok)) continue;
          const eumOh1 = getEumOh(h1.kor[0]);
          const eumOh2 = getEumOh(h2.kor[0]);
          const total =
            jawonScore(h1.oh) * 2 +
            jawonScore(h2.oh) * 2 +
            eumScore(h1.kor[0]) * 1.5 +
            eumScore(h2.kor[0]) * 1.5 +
            suriScore(geok) * 2 +
            eumFlowScore(eumOh1, eumOh2) * 1.5;
          candidates.push({ h1, h2, geok, eumOh1, eumOh2, total });
        }
      }
    } else {
      // 한 글자 이름
      mixPool.forEach(h1 => {
        const geok = getSuriGeok(surnameStroke, h1.stroke, 0);
        if (hasTerrible(geok)) return;
        const eumOh1 = getEumOh(h1.kor[0]);
        const total =
          jawonScore(h1.oh) * 3 +
          eumScore(h1.kor[0]) * 2 +
          suriScore(geok) * 2 +
          eumFlowScore(eumOh1, null) * 1.5;
        candidates.push({ h1, h2: null, geok, eumOh1, eumOh2: null, total });
      });
    }

    // 점수 내림차순 정렬, 중복 제거, 상위 10개
    const seen = new Set();
    return candidates
      .sort((a, b) => b.total - a.total)
      .filter(c => {
        const key = c.h1.char + (c.h2?.char || '');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 10)
      .map(c => ({ ...c, maxScore: nameLen === 2 ? 60 : 40 }));
  }

  /**
   * 개별 이름 상세 검수
   * @param {object} candidate  generateNames() 반환 항목
   * @param {object} sajuResult SajuEngine.analyze() 결과
   * @param {string} surname    성씨
   * @returns {Array} 검수 항목 배열
   */
  function inspectName(candidate, sajuResult, surname) {
    const { h1, h2, geok, eumOh1, eumOh2 } = candidate;
    const yong = sajuResult.yongsin.yongsin[0]?.idx ?? 0;
    const yongArr = sajuResult.yongsin.yongsin.map(y => y.idx);
    const heeArr  = sajuResult.yongsin.heesin.map(y => y.idx);
    const surnameEumOh = getEumOh(surname[surname.length - 1]);
    const SD = (typeof SURI_DB !== 'undefined') ? SURI_DB : require('./naming-db').SURI_DB;
    const checks = [];

    // 자원오행 검수
    const jaw1Gil = yongArr.includes(h1.oh) || heeArr.includes(h1.oh);
    checks.push({
      label: `${h1.char} 자원오행`,
      desc: `${OH_HJ[h1.oh]}(${OH_NAMES[h1.oh]}) — 용신 ${yongArr.includes(h1.oh) ? '일치' : heeArr.includes(h1.oh) ? '희신 상생' : '부합 미흡'}`,
      ok: jaw1Gil, warn: !jaw1Gil,
    });
    if (h2) {
      const jaw2Gil = yongArr.includes(h2.oh) || heeArr.includes(h2.oh);
      checks.push({
        label: `${h2.char} 자원오행`,
        desc: `${OH_HJ[h2.oh]}(${OH_NAMES[h2.oh]}) — 용신 ${yongArr.includes(h2.oh) ? '일치' : heeArr.includes(h2.oh) ? '희신 상생' : '부합 미흡'}`,
        ok: jaw2Gil, warn: !jaw2Gil,
      });
    }

    // 음령오행 검수 (성→이름1)
    const eumFlow1Ok = isGil(surnameEumOh, eumOh1);
    const eumConflict1 = isShangke(surnameEumOh, eumOh1);
    checks.push({
      label: '음령오행 흐름 (성→이름1)',
      desc: `${OH_HJ[surnameEumOh]}→${OH_HJ[eumOh1]} ${eumFlow1Ok ? '상생/동기 ✓' : eumConflict1 ? '상극 주의' : '무관'}`,
      ok: eumFlow1Ok, warn: eumConflict1,
    });
    if (h2 && eumOh2 !== null) {
      const eumFlow2Ok = isGil(eumOh1, eumOh2);
      const eumConflict2 = isShangke(eumOh1, eumOh2);
      checks.push({
        label: '음령오행 흐름 (이름1→이름2)',
        desc: `${OH_HJ[eumOh1]}→${OH_HJ[eumOh2]} ${eumFlow2Ok ? '상생/동기 ✓' : eumConflict2 ? '상극 주의' : '무관'}`,
        ok: eumFlow2Ok, warn: eumConflict2,
      });
    }

    // 수리 4격 검수
    [['won','원격(초년운)'],['hyeong','형격(청년운)'],['i','이격(장년운)'],['jeong','정격(총운)']].forEach(([k, label]) => {
      const n = geok[k];
      const luck = SD[n]?.luck;
      checks.push({
        label,
        desc: `${n}수 — ${SD[n]?.meaning || ''}`,
        ok: ['great','good'].includes(luck),
        warn: luck === 'terrible' || luck === 'bad',
        luck,
      });
    });

    // 대흉수 없음
    const noTerrible = !hasTerrible(geok);
    checks.push({
      label: '대흉수(34·44·54·74) 회피',
      desc: noTerrible ? '없음 ✓' : '대흉수 포함! 이름 변경 강력 권고',
      ok: noTerrible, warn: !noTerrible,
    });

    return checks;
  }

  return { generateNames, inspectName, isGil, isShangke, isShangsheng, OH_NAMES, OH_HJ };
})();

if (typeof module !== "undefined") module.exports = NamingEngine;
if (typeof globalThis !== "undefined") globalThis.NamingEngine = NamingEngine;
