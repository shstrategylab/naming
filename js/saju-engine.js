/**
 * saju-engine.js — 사주 분석 엔진
 * 의존: manseryok.js (먼저 로드)
 *
 * 주요 기능:
 *   - 사주원국 계산 (만세력 기반)
 *   - 오행 분포 + 지장간(地藏干) 반영
 *   - 십성(十星) 계산 (위치 가중치 포함)
 *   - 신강/신약 판단
 *   - 격국(格局) 자동 분류
 *   - 용신(用神)·희신(喜神)·기신(忌神) 도출
 *   - 대운(大運) 계산
 *   - 합충형파해(合沖刑破害) 탐지
 *   - 신살(神殺) 탐지
 */
const SajuEngine = (() => {
  const M = (typeof Manseryok !== 'undefined') ? Manseryok : require('./manseryok');

  const { CHEONGAN, CHEONGAN_HJ, JIJI, JIJI_HJ,
    STEM_OHENG_IDX, BRANCH_OHENG_IDX, OHENG_NAMES, OHENG_HJ,
    CHEONGAN_OHENG, CHEONGAN_UMNYANG, JIJI_OHENG, JIJI_UMNYANG,
    BRANCH_MAIN_STEM, getYeonju, getWolju, getIlju, getSiju } = M;

  // ── 지장간(地藏干) ─────────────────────────────────────────────
  const JIJANGGAN = {
    자: [{gan:'임',sIdx:8,days:10,type:'y'},{gan:'계',sIdx:9,days:20,type:'j'}],
    축: [{gan:'계',sIdx:9,days:9,type:'y'},{gan:'신',sIdx:7,days:3,type:'m'},{gan:'기',sIdx:5,days:18,type:'j'}],
    인: [{gan:'무',sIdx:4,days:7,type:'y'},{gan:'병',sIdx:2,days:7,type:'m'},{gan:'갑',sIdx:0,days:16,type:'j'}],
    묘: [{gan:'갑',sIdx:0,days:10,type:'y'},{gan:'을',sIdx:1,days:20,type:'j'}],
    진: [{gan:'을',sIdx:1,days:9,type:'y'},{gan:'계',sIdx:9,days:3,type:'m'},{gan:'무',sIdx:4,days:18,type:'j'}],
    사: [{gan:'무',sIdx:4,days:7,type:'y'},{gan:'경',sIdx:6,days:7,type:'m'},{gan:'병',sIdx:2,days:16,type:'j'}],
    오: [{gan:'병',sIdx:2,days:10,type:'y'},{gan:'기',sIdx:5,days:10,type:'m'},{gan:'정',sIdx:3,days:10,type:'j'}],
    미: [{gan:'정',sIdx:3,days:9,type:'y'},{gan:'을',sIdx:1,days:3,type:'m'},{gan:'기',sIdx:5,days:18,type:'j'}],
    신: [{gan:'무',sIdx:4,days:7,type:'y'},{gan:'임',sIdx:8,days:7,type:'m'},{gan:'경',sIdx:6,days:16,type:'j'}],
    유: [{gan:'경',sIdx:6,days:10,type:'y'},{gan:'신',sIdx:7,days:20,type:'j'}],
    술: [{gan:'신',sIdx:7,days:9,type:'y'},{gan:'정',sIdx:3,days:3,type:'m'},{gan:'무',sIdx:4,days:18,type:'j'}],
    해: [{gan:'무',sIdx:4,days:7,type:'y'},{gan:'갑',sIdx:0,days:5,type:'m'},{gan:'임',sIdx:8,days:18,type:'j'}],
  };

  // ── 십성 계산 ─────────────────────────────────────────────────
  function getSipseong(dayStemIdx, targetStemIdx) {
    const rel  = (STEM_OHENG_IDX[targetStemIdx] - STEM_OHENG_IDX[dayStemIdx] + 5) % 5;
    const same = (dayStemIdx % 2) === (targetStemIdx % 2);
    if (rel === 0) return same ? '비견' : '겁재';
    if (rel === 1) return same ? '식신' : '상관';
    if (rel === 2) return same ? '편재' : '정재';
    if (rel === 3) return same ? '편관' : '정관';
    return same ? '편인' : '정인';
  }

  function getBranchSipseong(dayStemIdx, branchIdx) {
    const rel  = (BRANCH_OHENG_IDX[branchIdx] - STEM_OHENG_IDX[dayStemIdx] + 5) % 5;
    const same = (dayStemIdx % 2) === (BRANCH_MAIN_STEM[branchIdx] % 2);
    if (rel === 0) return same ? '비견' : '겁재';
    if (rel === 1) return same ? '식신' : '상관';
    if (rel === 2) return same ? '편재' : '정재';
    if (rel === 3) return same ? '편관' : '정관';
    return same ? '편인' : '정인';
  }

  // ── 오행 분포 (지장간 정기 포함) ──────────────────────────────
  function getOhengDistribution(pillars) {
    const dist = [0, 0, 0, 0, 0]; // 목화토금수
    pillars.forEach(p => {
      if (!p) return;
      dist[STEM_OHENG_IDX[p.stemIdx]]++;
      dist[BRANCH_OHENG_IDX[p.branchIdx]]++;
      // 지장간 정기 추가 (0.5 가중치로 반올림하지 않고 합산)
      const jjg = JIJANGGAN[p.ji] || [];
      const jeonggi = jjg.find(j => j.type === 'j');
      if (jeonggi) dist[STEM_OHENG_IDX[jeonggi.sIdx]] += 0.5;
    });
    return dist.map(v => Math.round(v * 10) / 10);
  }

  // ── 신강/신약 판단 ────────────────────────────────────────────
  function getShingang(pillars, dayStemIdx) {
    const myOhIdx = STEM_OHENG_IDX[dayStemIdx];
    // 나를 생하는 인성 오행 인덱스
    const inOhIdx = (myOhIdx + 4) % 5; // 나를 생하는 것
    let myScore = 0, total = 0;
    pillars.forEach(p => {
      if (!p) return;
      const sOh = STEM_OHENG_IDX[p.stemIdx];
      const bOh = BRANCH_OHENG_IDX[p.branchIdx];
      [sOh, bOh].forEach(oh => {
        total++;
        if (oh === myOhIdx || oh === inOhIdx) myScore++;
      });
    });
    const ratio = total > 0 ? myScore / total : 0;
    if (ratio >= 0.5) return 'strong';
    if (ratio <= 0.25) return 'weak';
    return 'neutral';
  }

  // ── 격국 판단 ────────────────────────────────────────────────
  function getGeokguk(wolju, dayStemIdx) {
    const ilOh   = STEM_OHENG_IDX[dayStemIdx];
    const wolJiOh = BRANCH_OHENG_IDX[wolju.branchIdx];
    if (wolJiOh === ilOh) {
      return wolju.branchIdx % 2 === 0 ? '건록격' : '양인격';
    }
    const rel  = (wolJiOh - ilOh + 5) % 5;
    const same = (dayStemIdx % 2) === (BRANCH_MAIN_STEM[wolju.branchIdx] % 2);
    const ssArr = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
    const tbl   = [same?'비견':'겁재', same?'식신':'상관', same?'편재':'정재', same?'편관':'정관', same?'편인':'정인'];
    const ss    = tbl[rel];
    const map   = {식신:'식신격',상관:'상관격',편재:'편재격',정재:'정재격',편관:'편관격',정관:'정관격',편인:'편인격',정인:'정인격',비견:'건록격',겁재:'양인격'};
    return map[ss] || '정관격';
  }

  // ── 용신 도출 (신강/신약 + 격국 조합) ───────────────────────
  function getYongsin(shingangLevel, ilganIdx, geokguk, dist) {
    const myOh = STEM_OHENG_IDX[ilganIdx];
    const gen  = o => (o + 1) % 5; // 내가 생하는 것 (식상)
    const ctrl = o => (o + 2) % 5; // 내가 극하는 것 (재성)
    const kill = o => (o + 3) % 5; // 나를 극하는 것 (관성)
    const make = o => (o + 4) % 5; // 나를 생하는 것 (인성)

    let yongsin, heesin, gisin;

    if (shingangLevel === 'strong') {
      if (geokguk === '건록격' || geokguk === '양인격') {
        yongsin = [ctrl(myOh), kill(myOh)];
        heesin  = [gen(myOh)];
        gisin   = [myOh, make(myOh)];
      } else if (geokguk.includes('식신') || geokguk.includes('상관')) {
        yongsin = [gen(myOh)];
        heesin  = [ctrl(myOh)];
        gisin   = [myOh, make(myOh)];
      } else if (geokguk.includes('편재') || geokguk.includes('정재')) {
        yongsin = [ctrl(myOh)];
        heesin  = [gen(myOh), kill(myOh)];
        gisin   = [myOh, make(myOh)];
      } else if (geokguk.includes('편관') || geokguk.includes('정관')) {
        yongsin = [kill(myOh)];
        heesin  = [ctrl(myOh)];
        gisin   = [myOh, make(myOh)];
      } else {
        yongsin = [kill(myOh), ctrl(myOh)];
        heesin  = [gen(myOh)];
        gisin   = [myOh, make(myOh)];
      }
    } else if (shingangLevel === 'weak') {
      yongsin = [make(myOh), myOh];
      heesin  = [gen(myOh)];
      gisin   = [kill(myOh), ctrl(myOh)];
    } else {
      // 중화: 과다 오행 억제
      const maxIdx = dist.indexOf(Math.max(...dist));
      yongsin = [(maxIdx + 2) % 5, (maxIdx + 3) % 5];
      heesin  = [(maxIdx + 1) % 5];
      gisin   = [maxIdx];
    }

    const toInfo = idxArr => idxArr.map(i => ({ idx: i, name: OHENG_NAMES[i], hj: OHENG_HJ[i] }));
    return { yongsin: toInfo(yongsin), heesin: toInfo(heesin), gisin: toInfo(gisin) };
  }

  // ── 대운 계산 ─────────────────────────────────────────────────
  function getDaeun(year, month, day, hour, gender, wolju, ilju) {
    // 양남음녀=순행, 음남양녀=역행
    const yeonStemOdd = (getYeonju(year, month, day).stemIdx % 2 === 1); // 음간이면 true
    const isYang = yeonStemOdd ? false : true; // 갑을병정무기경신임계, 홀수=음간
    const forward = (isYang && gender === 'M') || (!isYang && gender === 'F');

    // 절기까지 남은 일수로 대운수 계산
    const jq = M.getJieqi(year);
    const jieqiDay = jq[month - 1];
    let diff;
    if (forward) {
      // 다음 절기까지
      diff = jieqiDay - day;
      if (diff < 0) {
        const nextMonth = month < 12 ? month + 1 : 1;
        const nextYear  = month < 12 ? year : year + 1;
        diff = (M.getJieqi(nextYear)[nextMonth - 1]) + (30 - day);
      }
    } else {
      // 이전 절기까지 (역행)
      diff = day - jieqiDay;
      if (diff < 0) {
        const prevMonth = month > 1 ? month - 1 : 12;
        const prevYear  = month > 1 ? year : year - 1;
        diff = day + (30 - M.getJieqi(prevYear)[prevMonth - 1]);
      }
    }
    const startAge = Math.round(diff / 3); // 3일 = 1년

    const runs = [];
    for (let i = 0; i < 8; i++) {
      const offset = forward ? (wolju.stemIdx - wolju.stemIdx % 10) + wolju.stemIdx % 10 + (i + 1)
                             : wolju.stemIdx - (i + 1);
      const sIdx = ((wolju.stemIdx + (forward ? i + 1 : -(i + 1))) % 10 + 10) % 10;
      const bIdx = ((wolju.branchIdx + (forward ? i + 1 : -(i + 1))) % 12 + 12) % 12;
      runs.push({
        age: startAge + i * 10,
        stemIdx: sIdx, branchIdx: bIdx,
        gan: CHEONGAN[sIdx], ji: JIJI[bIdx],
        ganHJ: CHEONGAN_HJ[sIdx], jiHJ: JIJI_HJ[bIdx],
      });
    }
    return { startAge, forward, runs };
  }

  // ── 합충형파해 탐지 ──────────────────────────────────────────
  function getHapChung(pillars) {
    const result = { cheonganHap: [], jijihap: [], chung: [], hyeong: [], pa: [], hae: [] };
    const n = pillars.length;

    // 천간합 (갑기, 을경, 병신, 정임, 무계)
    const CG_HAP = [[0,5],[1,6],[2,7],[3,8],[4,9]];
    const CG_HAP_NAME = ['갑기합(토)','을경합(금)','병신합(수)','정임합(목)','무계합(화)'];
    for (let i = 0; i < n; i++) for (let j = i+1; j < n; j++) {
      CG_HAP.forEach(([a, b], k) => {
        if ((pillars[i].stemIdx===a && pillars[j].stemIdx===b) ||
            (pillars[i].stemIdx===b && pillars[j].stemIdx===a))
          result.cheonganHap.push({ name: CG_HAP_NAME[k], pos: `${['연','월','일','시'][i]}·${['연','월','일','시'][j]}` });
      });
    }

    // 지지삼합 (신자진수국, 해묘미목국, 인오술화국, 사유축금국)
    const SAMHAP = [[8,0,4],[11,3,7],[2,6,10],[5,9,1]];
    const SAMHAP_NAME = ['신자진(수)','해묘미(목)','인오술(화)','사유축(금)'];
    const branches = pillars.map(p => p.branchIdx);
    SAMHAP.forEach(([a,b,c], k) => {
      const has = [a,b,c].map(x => branches.includes(x));
      if (has.every(Boolean)) result.jijihap.push({ name: SAMHAP_NAME[k]+'삼합', type: 'full' });
      else if (has.filter(Boolean).length === 2) result.jijihap.push({ name: SAMHAP_NAME[k]+'반합', type: 'half' });
    });

    // 지지충 (자오, 축미, 인신, 묘유, 진술, 사해)
    const CHUNG = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
    const CHUNG_NAME = ['자오충','축미충','인신충','묘유충','진술충','사해충'];
    for (let i = 0; i < n; i++) for (let j = i+1; j < n; j++) {
      CHUNG.forEach(([a,b], k) => {
        if ((pillars[i].branchIdx===a && pillars[j].branchIdx===b) ||
            (pillars[i].branchIdx===b && pillars[j].branchIdx===a))
          result.chung.push({ name: CHUNG_NAME[k], pos: `${['연','월','일','시'][i]}·${['연','월','일','시'][j]}` });
      });
    }

    return result;
  }

  // ── 신살 탐지 ────────────────────────────────────────────────
  function getSinsal(dayStemIdx, pillars) {
    const found = [];
    const LABELS = ['연주','월주','일주','시주'];

    // 천을귀인
    const CE_MAP = {0:[1,7],1:[0,8],2:[11,9],3:[10,8],4:[1,7],5:[0,8],6:[11,9],7:[10,8],8:[3,5],9:[2,6]};
    const cePos = [];
    pillars.forEach((p,i) => { if((CE_MAP[dayStemIdx]||[]).includes(p.branchIdx)) cePos.push(LABELS[i]); });
    if (cePos.length) found.push({ name:'천을귀인(天乙貴人)', pos: cePos.join('·'), desc:'귀인의 도움을 받는 최고 길성' });

    // 문창귀인
    const MUNCHANG = [5,6,7,8,9,10,11,0,1,2];
    pillars.forEach((p,i) => { if(p.branchIdx===MUNCHANG[dayStemIdx]) found.push({name:'문창귀인(文昌貴人)',pos:LABELS[i],desc:'학문·시험·문서운 길성'}); });

    // 역마살
    const YEOKMA = {0:8,3:8,6:8,9:8,1:11,4:11,7:11,10:11,2:5,5:5,8:5,11:5};
    const ilBranch = pillars[2]?.branchIdx ?? -1;
    if (YEOKMA[ilBranch] !== undefined)
      pillars.forEach((p,i) => { if(p.branchIdx===YEOKMA[ilBranch]) found.push({name:'역마살(驛馬殺)',pos:LABELS[i],desc:'이동·변화·해외 인연'}); });

    // 도화살
    const DOHWA = {0:3,3:0,6:9,9:6,1:3,4:0,7:9,10:6,2:3,5:0,8:9,11:6};
    if (DOHWA[ilBranch] !== undefined)
      pillars.forEach((p,i) => { if(p.branchIdx===DOHWA[ilBranch]) found.push({name:'도화살(桃花殺)',pos:LABELS[i],desc:'매력·이성 인연·예술 감각'}); });

    // 양인살
    const YANGIN = [3,2,5,4,5,4,9,8,11,10];
    pillars.forEach((p,i) => { if(p.branchIdx===YANGIN[dayStemIdx]) found.push({name:'양인살(羊刃殺)',pos:LABELS[i],desc:'강한 추진력·승부욕, 충동 주의'}); });

    // 공망
    const ilStemIdx = pillars[2]?.stemIdx ?? 0;
    const 순시작지지 = ((ilBranch - ilStemIdx + 12) % 12);
    const gm1 = (순시작지지 + 10) % 12, gm2 = (순시작지지 + 11) % 12;
    const gmPos = [];
    pillars.forEach((p,i) => { if(p.branchIdx===gm1||p.branchIdx===gm2) gmPos.push(LABELS[i]); });
    if (gmPos.length) found.push({name:`공망(空亡) ${JIJI_HJ[gm1]}${JIJI_HJ[gm2]}`,pos:gmPos.join('·'),desc:'해당 위치 기운이 약해짐'});

    return found;
  }

  // ── 일간 설명 ─────────────────────────────────────────────────
  const ILGAN_DESC = {
    갑:{name:'갑목(甲木)',symbol:'큰 나무',personality:'리더십이 강하고 진취적입니다. 곧고 올바른 성품으로 주변을 이끌지만 고집이 세고 융통성이 부족할 수 있습니다.',strength:'추진력, 리더십, 정의감',weakness:'고집, 독단적 성향'},
    을:{name:'을목(乙木)',symbol:'화초·덩굴',personality:'유연하고 적응력이 뛰어납니다. 사교적이며 주변 환경을 잘 활용하지만 우유부단하고 의존적인 면이 있습니다.',strength:'유연성, 사교성, 친화력',weakness:'우유부단, 의존성'},
    병:{name:'병화(丙火)',symbol:'태양',personality:'밝고 외향적이며 에너지가 넘칩니다. 강한 자존심과 카리스마로 사람들을 끌어당기지만 자기중심적인 면이 있습니다.',strength:'카리스마, 열정, 창의력',weakness:'자기중심적, 과시욕'},
    정:{name:'정화(丁火)',symbol:'촛불·등불',personality:'섬세하고 감성적이며 따뜻한 성품입니다. 예술적 감각이 뛰어나고 직관력이 강하지만 감정 기복이 심할 수 있습니다.',strength:'감성, 직관력, 예술성',weakness:'감정 기복, 예민함'},
    무:{name:'무토(戊土)',symbol:'큰 산·대지',personality:'포용력이 넓고 안정적입니다. 신뢰감을 주는 성품으로 리더 역할에 적합하지만 변화에 둔감하고 보수적입니다.',strength:'포용력, 안정성, 신뢰',weakness:'보수성, 변화 거부'},
    기:{name:'기토(己土)',symbol:'논밭·전원',personality:'꼼꼼하고 성실하며 현실적입니다. 계획적이고 안정을 추구하지만 소심하고 의심이 많은 면이 있습니다.',strength:'성실함, 꼼꼼함, 현실감',weakness:'소심함, 의심'},
    경:{name:'경금(庚金)',symbol:'원석·쇠',personality:'강직하고 결단력이 있습니다. 의리를 중시하고 원칙을 지키지만 융통성이 없고 다소 폭력적일 수 있습니다.',strength:'결단력, 의리, 정의감',weakness:'고집, 융통성 부족'},
    신:{name:'신금(辛金)',symbol:'보석·칼날',personality:'섬세하고 예민하며 완벽주의적입니다. 심미안이 뛰어나고 직관력이 강하지만 자존심이 세고 상처를 잘 받습니다.',strength:'완벽주의, 심미안, 직관력',weakness:'자존심, 상처받기 쉬움'},
    임:{name:'임수(壬水)',symbol:'큰 강·바다',personality:'포용력이 넓고 지혜롭습니다. 다양한 사람과 어울리며 융통성이 있지만 변덕스럽고 지조가 약할 수 있습니다.',strength:'지혜, 포용력, 융통성',weakness:'변덕, 지조 약함'},
    계:{name:'계수(癸水)',symbol:'빗물·샘물',personality:'섬세하고 감성적이며 직관력이 뛰어납니다. 창의적이고 예술적이지만 소극적이고 현실 도피적 성향이 있습니다.',strength:'감성, 창의력, 직관력',weakness:'소극성, 현실 도피'},
  };

  // ── 메인 분석 함수 ────────────────────────────────────────────
  function analyze(year, month, day, hour, gender = 'M') {
    const yeonju = getYeonju(year, month, day);
    const wolju  = getWolju(year, month, day);
    const ilju   = getIlju(year, month, day);
    const siju   = getSiju(hour, ilju.stemIdx);

    const dayStemIdx = ilju.stemIdx;
    const pillars    = [yeonju, wolju, ilju, siju].filter(Boolean);

    const dist     = getOhengDistribution(pillars);
    const shingang = getShingang(pillars, dayStemIdx);
    const geokguk  = getGeokguk(wolju, dayStemIdx);
    const yongsin  = getYongsin(shingang, dayStemIdx, geokguk, dist);
    const daeun    = getDaeun(year, month, day, hour, gender, wolju, ilju);
    const hapchung = getHapChung(pillars);
    const sinsal   = getSinsal(dayStemIdx, pillars);
    const ilganDesc = ILGAN_DESC[ilju.gan] || {};

    return {
      yeonju, wolju, ilju, siju, pillars,
      dayStemIdx,
      dist, shingang, geokguk, yongsin,
      daeun, hapchung, sinsal, ilganDesc,
    };
  }

  return {
    analyze,
    getSipseong, getBranchSipseong,
    getOhengDistribution, getShingang, getGeokguk, getYongsin,
    getDaeun, getHapChung, getSinsal,
    JIJANGGAN, ILGAN_DESC,
    CHEONGAN, CHEONGAN_HJ, JIJI, JIJI_HJ,
    STEM_OHENG_IDX, BRANCH_OHENG_IDX, OHENG_NAMES, OHENG_HJ,
    CHEONGAN_OHENG, CHEONGAN_UMNYANG,
  };
})();

if (typeof module !== "undefined") module.exports = SajuEngine;
if (typeof globalThis !== "undefined") globalThis.SajuEngine = SajuEngine;
