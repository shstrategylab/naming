/**
 * naming-db.js — 작명용 통합 데이터베이스
 *
 * 포함 내용:
 *   1. HANJA_DB     - 이름용 한자 (자원오행·획수·성별·뜻)
 *   2. SURI_DB      - 수리오행 길흉 (1~81수)
 *   3. EUM_OHAENG   - 음령오행 (초성 기준)
 *   4. SURNAME_DB   - 성씨 획수 (220개)
 *   유틸: getEumOh, getSuriGeok, normStroke
 */

// ── 1. 음령오행 (초성 → 오행 인덱스: 0목 1화 2토 3금 4수) ───────
const EUM_OHAENG_MAP = {
  'ㄱ':0,'ㄲ':0,'ㅋ':0,         // 木
  'ㄴ':1,'ㄷ':1,'ㄸ':1,'ㄹ':1,'ㅌ':1, // 火
  'ㅇ':2,'ㅎ':2,                // 土
  'ㅅ':3,'ㅆ':3,'ㅈ':3,'ㅉ':3,'ㅊ':3, // 金
  'ㅁ':4,'ㅂ':4,'ㅃ':4,'ㅍ':4,  // 水
};

const CHOSUNG_LIST = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function getChosung(char) {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return null;
  return CHOSUNG_LIST[Math.floor(code / 28 / 21)];
}

function getEumOh(char) {
  const cs = getChosung(char);
  return cs !== null ? (EUM_OHAENG_MAP[cs] ?? 2) : 2;
}

// ── 2. 수리오행 길흉 DB (1~81수) ───────────────────────────────
// luck: great=대길, good=길, neutral=평, bad=흉, terrible=대흉
const SURI_DB = {
  1:{luck:'great',meaning:'태초의 수. 만물의 시작, 독립, 리더십. 성공운 최강.'},
  2:{luck:'bad',meaning:'분열과 고독. 두 갈래로 나뉘어 결실 맺기 어려움.'},
  3:{luck:'great',meaning:'삼재가 모이는 길수. 명예와 지혜, 발전.'},
  4:{luck:'bad',meaning:'고난과 실패. 사(死)와 발음 유사. 단명'},
  5:{luck:'great',meaning:'오행이 갖춰진 수. 건강, 장수, 성공.'},
  6:{luck:'good',meaning:'천지인 조화. 안정과 화목, 가정 행복.'},
  7:{luck:'good',meaning:'강한 의지와 인내. 독자적 성공.'},
  8:{luck:'good',meaning:'발전과 전진. 강인한 의지로 성공.'},
  9:{luck:'bad',meaning:'고독과 번민. 재능은 있으나 덕이 부족.'},
  10:{luck:'bad',meaning:'허무와 공허. 노력이 결실 없음.'},
  11:{luck:'good',meaning:'희망과 전진. 어려움 뒤 성공.'},
  12:{luck:'bad',meaning:'박약한 운. 고독하고 의지 박약.'},
  13:{luck:'great',meaning:'총명과 지혜. 학문·예술에서 두각.'},
  14:{luck:'bad',meaning:'고독과 이별. 재능 있으나 고난.'},
  15:{luck:'great',meaning:'복덕이 풍성. 인덕 넘치고 대길.'},
  16:{luck:'great',meaning:'덕망과 인기. 많은 사람의 도움.'},
  17:{luck:'good',meaning:'강한 의지로 성공. 다소 고집 셈.'},
  18:{luck:'good',meaning:'발전과 성취. 진취적 기상.'},
  19:{luck:'bad',meaning:'고난과 역경. 좋은 의도도 결과 나쁨.'},
  20:{luck:'bad',meaning:'허망한 수. 노력 허사, 실패.'},
  21:{luck:'great',meaning:'두령의 수. 리더십과 성공, 대길.'},
  22:{luck:'bad',meaning:'중도 좌절. 시작은 있으나 끝이 없음.'},
  23:{luck:'great',meaning:'위대한 성공. 태양처럼 밝게 빛남.'},
  24:{luck:'great',meaning:'축복과 부귀. 재물과 명예 함께.'},
  25:{luck:'good',meaning:'독립 성공. 자수성가, 자신감.'},
  26:{luck:'bad',meaning:'영웅과 고독. 재능 있으나 파란만장.'},
  27:{luck:'neutral',meaning:'중간 기복. 자중하면 무난.'},
  28:{luck:'bad',meaning:'파란과 이별. 고독한 삶.'},
  29:{luck:'good',meaning:'지혜와 성공. 노력으로 결실.'},
  30:{luck:'neutral',meaning:'부침이 심함. 운이 들쑥날쑥.'},
  31:{luck:'great',meaning:'덕과 지혜로 성공. 인망 두터움.'},
  32:{luck:'great',meaning:'요행의 수. 뜻밖의 행운.'},
  33:{luck:'great',meaning:'상승과 발전. 왕성한 기운.'},
  34:{luck:'terrible',meaning:'파멸의 수. 사용 절대 금지.'},
  35:{luck:'good',meaning:'학문과 평화. 온화하고 안정.'},
  36:{luck:'bad',meaning:'파란의 수. 의협심 강하나 고독.'},
  37:{luck:'good',meaning:'강인한 의지. 성공 가능.'},
  38:{luck:'neutral',meaning:'학문은 좋으나 재물 약함.'},
  39:{luck:'good',meaning:'부귀와 장수. 안정된 성공.'},
  40:{luck:'bad',meaning:'변화 무쌍. 기복이 심함.'},
  41:{luck:'great',meaning:'대성공의 수. 명예와 인덕.'},
  42:{luck:'bad',meaning:'의지 박약. 결실 어려움.'},
  43:{luck:'bad',meaning:'산만함. 집중력 부족으로 실패.'},
  44:{luck:'terrible',meaning:'대흉수. 고난과 질병.'},
  45:{luck:'good',meaning:'흥왕발전. 자수성가.'},
  46:{luck:'bad',meaning:'고난의 연속. 역경 많음.'},
  47:{luck:'good',meaning:'부귀와 행복. 안정된 운.'},
  48:{luck:'great',meaning:'지덕겸비. 인망 두텁고 성공.'},
  49:{luck:'neutral',meaning:'기복 있음. 중년 이후 안정.'},
  50:{luck:'neutral',meaning:'성패 반반. 신중해야 함.'},
  51:{luck:'neutral',meaning:'부침이 있음. 노력 필요.'},
  52:{luck:'good',meaning:'전화위복. 위기를 기회로.'},
  53:{luck:'bad',meaning:'내외 불화. 가정과 사업 모두 어려움.'},
  54:{luck:'terrible',meaning:'대흉수. 고난과 고독.'},
  55:{luck:'bad',meaning:'불완전함. 재능은 있으나 결실 부족.'},
  56:{luck:'bad',meaning:'노력 불구 성과 없음.'},
  57:{luck:'good',meaning:'노력으로 성공. 만년 길.'},
  58:{luck:'neutral',meaning:'반길반흉. 노력 여하에 달림.'},
  59:{luck:'bad',meaning:'장애와 고난.'},
  60:{luck:'bad',meaning:'흑암의 수. 운이 어두움.'},
  61:{luck:'good',meaning:'명예와 덕망. 안정된 성공.'},
  62:{luck:'bad',meaning:'쇠퇴와 고독.'},
  63:{luck:'great',meaning:'길상의 수. 발전과 번영.'},
  64:{luck:'bad',meaning:'고난과 퇴보.'},
  65:{luck:'great',meaning:'덕망과 장수. 안정적 성공.'},
  66:{luck:'bad',meaning:'암흑의 운. 고독과 실패.'},
  67:{luck:'good',meaning:'안정과 발전.'},
  68:{luck:'good',meaning:'발전과 번영.'},
  69:{luck:'bad',meaning:'불안과 변동.'},
  70:{luck:'bad',meaning:'공허와 실의.'},
  71:{luck:'neutral',meaning:'평범한 운. 무난하나 발전 약함.'},
  72:{luck:'bad',meaning:'손실과 고난.'},
  73:{luck:'neutral',meaning:'평온하나 기복 있음.'},
  74:{luck:'terrible',meaning:'대흉수. 절대 기피.'},
  75:{luck:'neutral',meaning:'평화롭지만 발전 더딤.'},
  76:{luck:'bad',meaning:'쇠멸의 운. 조심 필요.'},
  77:{luck:'neutral',meaning:'반길반흉. 만년 안정.'},
  78:{luck:'neutral',meaning:'평범한 운.'},
  79:{luck:'bad',meaning:'고난과 좌절.'},
  80:{luck:'bad',meaning:'허무와 공허. 노력 허사.'},
  81:{luck:'great',meaning:'환원의 수. 1과 같은 대길수.'},
};

// ── 3. 성씨 획수 DB (220개+) ───────────────────────────────────
const SURNAME_DB = {
  '가':9,'간':7,'갈':13,'감':13,'강':11,'견':11,'경':15,'계':9,'고':10,'곡':7,
  '공':4,'곽':11,'관':11,'광':9,'구':5,'국':11,'궁':10,'권':15,'근':14,'금':8,
  '기':9,'길':6,'김':8,'나':6,'남':9,'낭':10,'노':8,'뇨':7,'능':10,
  '다':6,'단':9,'담':16,'당':10,'대':5,'도':10,'독':9,'동':12,'두':7,'등':12,
  '라':8,'란':13,'랑':10,'려':13,'로':7,'뢰':13,'류':9,'륙':6,'리':6,'림':8,
  '마':10,'만':15,'맹':8,'모':5,'목':4,'묘':8,'문':4,'미':8,
  '박':6,'반':7,'방':4,'배':10,'백':5,'번':19,'범':15,'변':9,'복':9,'봉':8,
  '부':4,'빈':11,
  '사':5,'산':3,'삼':3,'상':12,'서':6,'석':5,'선':9,'설':11,'성':8,'소':12,
  '손':10,'송':8,'수':6,'순':12,'승':4,'시':5,'신':13,'심':11,
  '아':7,'안':6,'양':6,'어':7,'엄':20,'여':6,'연':11,'염':9,'영':14,'예':11,
  '오':7,'옥':5,'온':12,'왕':4,'요':13,'우':4,'원':10,'위':12,'유':6,'윤':4,
  '은':10,'이':6,'임':7,'임':7,
  '자':6,'장':11,'전':6,'정':8,'제':14,'조':7,'종':8,'좌':5,'주':6,'준':13,
  '증':12,'지':4,'진':10,
  '차':7,'채':11,'천':4,'최':12,'추':10,'춘':9,
  '탁':8,'태':5,'팽':12,
  '하':7,'한':5,'함':13,'해':10,'허':11,'현':11,'홍':9,'화':7,'환':17,'황':12,'후':9,'흥':16,
};

function getSurnameStroke(surname) {
  if (!surname) return 6;
  // 각 글자 획수 합산 (다자 성씨 대응)
  let total = 0;
  for (const ch of surname) {
    total += SURNAME_DB[ch] || 6;
  }
  return total;
}

// ── 4. 통합 한자 DB (자원오행·획수·성별·훈음·뜻) ───────────────
// oh: 0=목(木) 1=화(火) 2=토(土) 3=금(金) 4=수(水)
// gender: M=남, F=여, N=중성
const HANJA_DB = [
  // ── 木 (목) ──────────────────────────────────────────────
  {char:'林',kor:'림',stroke:8,oh:0,meaning:'수풀, 무성함',gender:'N'},
  {char:'樹',kor:'수',stroke:16,oh:0,meaning:'나무, 심다',gender:'M'},
  {char:'植',kor:'식',stroke:12,oh:0,meaning:'심다, 기르다',gender:'M'},
  {char:'根',kor:'근',stroke:10,oh:0,meaning:'뿌리, 근본',gender:'M'},
  {char:'桂',kor:'계',stroke:10,oh:0,meaning:'계수나무, 향기',gender:'F'},
  {char:'楠',kor:'남',stroke:13,oh:0,meaning:'녹나무, 강인함',gender:'M'},
  {char:'棟',kor:'동',stroke:12,oh:0,meaning:'마룻대, 기둥',gender:'M'},
  {char:'柳',kor:'류',stroke:9,oh:0,meaning:'버드나무, 유연함',gender:'F'},
  {char:'松',kor:'송',stroke:8,oh:0,meaning:'소나무, 절개',gender:'M'},
  {char:'竹',kor:'죽',stroke:6,oh:0,meaning:'대나무, 곧음',gender:'M'},
  {char:'杰',kor:'걸',stroke:8,oh:0,meaning:'뛰어난 인재',gender:'M'},
  {char:'東',kor:'동',stroke:8,oh:0,meaning:'동쪽, 봄기운',gender:'M'},
  {char:'春',kor:'춘',stroke:9,oh:0,meaning:'봄, 생명력',gender:'N'},
  {char:'茂',kor:'무',stroke:8,oh:0,meaning:'무성하다, 번성',gender:'M'},
  {char:'榮',kor:'영',stroke:14,oh:0,meaning:'영화, 번성함',gender:'N'},
  {char:'秀',kor:'수',stroke:7,oh:0,meaning:'빼어남, 우수',gender:'N'},
  {char:'彬',kor:'빈',stroke:11,oh:0,meaning:'빛나고 아름다움',gender:'M'},
  {char:'芳',kor:'방',stroke:7,oh:0,meaning:'꽃 향기, 아름다움',gender:'F'},
  {char:'蓮',kor:'련',stroke:13,oh:0,meaning:'연꽃, 청순함',gender:'F'},
  {char:'菊',kor:'국',stroke:11,oh:0,meaning:'국화, 절개',gender:'F'},
  {char:'梅',kor:'매',stroke:11,oh:0,meaning:'매화, 굳은 절개',gender:'F'},
  {char:'桃',kor:'도',stroke:10,oh:0,meaning:'복숭아, 아름다움',gender:'F'},
  {char:'枝',kor:'지',stroke:8,oh:0,meaning:'가지, 뻗어나감',gender:'F'},
  {char:'葉',kor:'엽',stroke:12,oh:0,meaning:'잎, 세대',gender:'N'},
  {char:'森',kor:'삼',stroke:12,oh:0,meaning:'울창한 숲',gender:'M'},
  {char:'楓',kor:'풍',stroke:13,oh:0,meaning:'단풍나무',gender:'N'},
  {char:'朴',kor:'박',stroke:6,oh:0,meaning:'순박함, 통나무',gender:'N'},
  {char:'椿',kor:'춘',stroke:13,oh:0,meaning:'참죽나무, 장수',gender:'M'},
  {char:'材',kor:'재',stroke:7,oh:0,meaning:'재목, 재능',gender:'M'},
  {char:'樂',kor:'락',stroke:15,oh:0,meaning:'즐거움, 음악',gender:'N'},
  {char:'橋',kor:'교',stroke:16,oh:0,meaning:'다리, 이어줌',gender:'N'},
  {char:'苑',kor:'원',stroke:8,oh:0,meaning:'동산, 정원',gender:'F'},
  {char:'芽',kor:'아',stroke:7,oh:0,meaning:'싹, 새싹',gender:'F'},
  {char:'菁',kor:'청',stroke:11,oh:0,meaning:'무성함, 청초',gender:'N'},
  {char:'桑',kor:'상',stroke:10,oh:0,meaning:'뽕나무',gender:'N'},
  {char:'栗',kor:'율',stroke:10,oh:0,meaning:'밤나무',gender:'N'},
  {char:'槿',kor:'근',stroke:15,oh:0,meaning:'무궁화',gender:'N'},
  {char:'梓',kor:'재',stroke:11,oh:0,meaning:'가래나무, 목판',gender:'N'},
  {char:'桓',kor:'환',stroke:10,oh:0,meaning:'굳셈, 으뜸',gender:'M'},
  {char:'檀',kor:'단',stroke:17,oh:0,meaning:'박달나무',gender:'M'},
  // ── 火 (화) ──────────────────────────────────────────────
  {char:'明',kor:'명',stroke:8,oh:1,meaning:'밝다, 총명함',gender:'N'},
  {char:'煜',kor:'욱',stroke:13,oh:1,meaning:'불빛, 빛남',gender:'M'},
  {char:'熙',kor:'희',stroke:13,oh:1,meaning:'빛나다, 화평함',gender:'N'},
  {char:'燦',kor:'찬',stroke:17,oh:1,meaning:'눈부시게 빛남',gender:'M'},
  {char:'炫',kor:'현',stroke:9,oh:1,meaning:'빛나다, 눈부심',gender:'M'},
  {char:'南',kor:'남',stroke:9,oh:1,meaning:'남쪽, 따뜻함',gender:'N'},
  {char:'光',kor:'광',stroke:6,oh:1,meaning:'빛, 영광',gender:'M'},
  {char:'炳',kor:'병',stroke:9,oh:1,meaning:'밝게 빛나다',gender:'M'},
  {char:'輝',kor:'휘',stroke:15,oh:1,meaning:'빛나다, 찬란함',gender:'M'},
  {char:'照',kor:'조',stroke:13,oh:1,meaning:'비추다, 밝히다',gender:'N'},
  {char:'赫',kor:'혁',stroke:14,oh:1,meaning:'빛나다, 위엄',gender:'M'},
  {char:'星',kor:'성',stroke:9,oh:1,meaning:'별, 빛남',gender:'N'},
  {char:'暉',kor:'휘',stroke:13,oh:1,meaning:'햇빛, 빛나다',gender:'N'},
  {char:'昊',kor:'호',stroke:8,oh:1,meaning:'하늘, 넓고 큰',gender:'M'},
  {char:'燁',kor:'엽',stroke:16,oh:1,meaning:'불빛이 빛남',gender:'M'},
  {char:'昱',kor:'욱',stroke:9,oh:1,meaning:'밝게 빛남',gender:'M'},
  {char:'炬',kor:'거',stroke:9,oh:1,meaning:'횃불, 빛남',gender:'M'},
  {char:'日',kor:'일',stroke:4,oh:1,meaning:'해, 날',gender:'M'},
  {char:'斌',kor:'빈',stroke:12,oh:1,meaning:'빛나고 화려함',gender:'M'},
  {char:'烨',kor:'엽',stroke:11,oh:1,meaning:'화염, 빛남',gender:'M'},
  {char:'夏',kor:'하',stroke:10,oh:1,meaning:'여름, 크고 화려함',gender:'N'},
  {char:'煐',kor:'영',stroke:13,oh:1,meaning:'빛나다',gender:'N'},
  {char:'旭',kor:'욱',stroke:6,oh:1,meaning:'아침 햇빛',gender:'M'},
  {char:'炤',kor:'조',stroke:9,oh:1,meaning:'밝다, 비추다',gender:'N'},
  {char:'暘',kor:'양',stroke:13,oh:1,meaning:'해가 돋음, 맑음',gender:'N'},
  {char:'煥',kor:'환',stroke:13,oh:1,meaning:'빛나다, 환하다',gender:'M'},
  {char:'曜',kor:'요',stroke:18,oh:1,meaning:'빛나다, 요일',gender:'N'},
  {char:'晨',kor:'신',stroke:11,oh:1,meaning:'새벽, 이른 아침',gender:'N'},
  {char:'愛',kor:'애',stroke:13,oh:1,meaning:'사랑, 아낌',gender:'F'},
  {char:'勇',kor:'용',stroke:9,oh:1,meaning:'용감하다, 용맹',gender:'M'},
  // ── 土 (토) ──────────────────────────────────────────────
  {char:'志',kor:'지',stroke:7,oh:2,meaning:'뜻, 지향',gender:'M'},
  {char:'誠',kor:'성',stroke:13,oh:2,meaning:'정성, 진심',gender:'N'},
  {char:'信',kor:'신',stroke:9,oh:2,meaning:'믿음, 신뢰',gender:'M'},
  {char:'仁',kor:'인',stroke:4,oh:2,meaning:'어짊, 인덕',gender:'N'},
  {char:'義',kor:'의',stroke:13,oh:2,meaning:'의리, 옳음',gender:'M'},
  {char:'德',kor:'덕',stroke:15,oh:2,meaning:'덕, 품성',gender:'N'},
  {char:'善',kor:'선',stroke:12,oh:2,meaning:'선함, 착함',gender:'N'},
  {char:'和',kor:'화',stroke:8,oh:2,meaning:'화합, 조화',gender:'N'},
  {char:'泰',kor:'태',stroke:10,oh:2,meaning:'크다, 편안함',gender:'N'},
  {char:'中',kor:'중',stroke:4,oh:2,meaning:'가운데, 중심',gender:'N'},
  {char:'在',kor:'재',stroke:6,oh:2,meaning:'있다, 존재함',gender:'M'},
  {char:'俊',kor:'준',stroke:9,oh:2,meaning:'준수함, 뛰어남',gender:'M'},
  {char:'婷',kor:'정',stroke:11,oh:2,meaning:'아름답고 단아함',gender:'F'},
  {char:'娜',kor:'나',stroke:9,oh:2,meaning:'우아함, 아름다움',gender:'F'},
  {char:'妍',kor:'연',stroke:7,oh:2,meaning:'고움, 예쁨',gender:'F'},
  {char:'嘉',kor:'가',stroke:14,oh:2,meaning:'아름다움, 착함',gender:'N'},
  {char:'恩',kor:'은',stroke:10,oh:2,meaning:'은혜, 사랑',gender:'F'},
  {char:'雅',kor:'아',stroke:12,oh:2,meaning:'우아함, 고상함',gender:'F'},
  {char:'宇',kor:'우',stroke:6,oh:2,meaning:'하늘, 우주',gender:'M'},
  {char:'宙',kor:'주',stroke:8,oh:2,meaning:'우주, 크다',gender:'M'},
  {char:'民',kor:'민',stroke:5,oh:2,meaning:'백성, 사람들',gender:'N'},
  {char:'雄',kor:'웅',stroke:12,oh:2,meaning:'수컷, 웅장함',gender:'M'},
  {char:'圭',kor:'규',stroke:6,oh:2,meaning:'옥기, 규범',gender:'N'},
  {char:'基',kor:'기',stroke:11,oh:2,meaning:'터, 기초, 기반',gender:'M'},
  {char:'堅',kor:'견',stroke:11,oh:2,meaning:'굳다, 단단하다',gender:'M'},
  {char:'均',kor:'균',stroke:7,oh:2,meaning:'고르다, 균등함',gender:'N'},
  {char:'城',kor:'성',stroke:9,oh:2,meaning:'성, 성벽',gender:'M'},
  {char:'域',kor:'역',stroke:11,oh:2,meaning:'경계, 지역',gender:'N'},
  {char:'壽',kor:'수',stroke:14,oh:2,meaning:'장수, 오래 삶',gender:'N'},
  {char:'坦',kor:'탄',stroke:8,oh:2,meaning:'평탄하다',gender:'N'},
  {char:'岳',kor:'악',stroke:8,oh:2,meaning:'높은 산',gender:'M'},
  {char:'峰',kor:'봉',stroke:10,oh:2,meaning:'산봉우리',gender:'M'},
  {char:'崇',kor:'숭',stroke:11,oh:2,meaning:'높다, 높이다',gender:'M'},
  // ── 金 (금) ──────────────────────────────────────────────
  {char:'錦',kor:'금',stroke:16,oh:3,meaning:'비단, 화려함',gender:'N'},
  {char:'銀',kor:'은',stroke:14,oh:3,meaning:'은, 귀함',gender:'F'},
  {char:'鎭',kor:'진',stroke:18,oh:3,meaning:'진압, 안정',gender:'M'},
  {char:'晶',kor:'정',stroke:12,oh:3,meaning:'수정, 맑음',gender:'F'},
  {char:'玲',kor:'령',stroke:9,oh:3,meaning:'구슬소리, 영롱함',gender:'F'},
  {char:'玉',kor:'옥',stroke:5,oh:3,meaning:'옥, 귀함',gender:'F'},
  {char:'珍',kor:'진',stroke:9,oh:3,meaning:'보배, 귀중함',gender:'F'},
  {char:'瑛',kor:'영',stroke:12,oh:3,meaning:'옥빛, 맑음',gender:'F'},
  {char:'瑞',kor:'서',stroke:13,oh:3,meaning:'상서로움',gender:'N'},
  {char:'珠',kor:'주',stroke:10,oh:3,meaning:'구슬, 영롱함',gender:'F'},
  {char:'鑫',kor:'흠',stroke:24,oh:3,meaning:'금이 풍성함, 재물',gender:'M'},
  {char:'琮',kor:'종',stroke:12,oh:3,meaning:'옥기, 고귀함',gender:'N'},
  {char:'璃',kor:'리',stroke:15,oh:3,meaning:'유리, 맑고 투명',gender:'F'},
  {char:'珀',kor:'박',stroke:9,oh:3,meaning:'호박, 빛남',gender:'N'},
  {char:'鉉',kor:'현',stroke:13,oh:3,meaning:'솥귀, 정승',gender:'M'},
  {char:'鈺',kor:'옥',stroke:13,oh:3,meaning:'보배로운 쇠',gender:'F'},
  {char:'錫',kor:'석',stroke:16,oh:3,meaning:'주석, 하사하다',gender:'M'},
  {char:'銘',kor:'명',stroke:14,oh:3,meaning:'새기다, 명심하다',gender:'N'},
  {char:'鎬',kor:'호',stroke:18,oh:3,meaning:'호경, 쇠 이름',gender:'M'},
  {char:'鏞',kor:'용',stroke:19,oh:3,meaning:'큰 종',gender:'M'},
  {char:'鋒',kor:'봉',stroke:15,oh:3,meaning:'날카로운 끝, 선봉',gender:'M'},
  {char:'珪',kor:'규',stroke:9,oh:3,meaning:'규(옥기), 고귀함',gender:'N'},
  {char:'瑀',kor:'우',stroke:13,oh:3,meaning:'옥과 같은 돌',gender:'N'},
  {char:'璟',kor:'경',stroke:17,oh:3,meaning:'옥의 광채',gender:'N'},
  {char:'珩',kor:'형',stroke:10,oh:3,meaning:'패옥, 고귀함',gender:'N'},
  // ── 水 (수) ──────────────────────────────────────────────
  {char:'澤',kor:'택',stroke:16,oh:4,meaning:'연못, 은혜',gender:'M'},
  {char:'淵',kor:'연',stroke:11,oh:4,meaning:'깊은 연못, 지혜',gender:'M'},
  {char:'洪',kor:'홍',stroke:9,oh:4,meaning:'넓고 큰 물',gender:'M'},
  {char:'浩',kor:'호',stroke:10,oh:4,meaning:'넓다, 크다',gender:'M'},
  {char:'清',kor:'청',stroke:11,oh:4,meaning:'맑다, 깨끗함',gender:'N'},
  {char:'純',kor:'순',stroke:10,oh:4,meaning:'순수함, 깨끗함',gender:'F'},
  {char:'智',kor:'지',stroke:12,oh:4,meaning:'지혜, 슬기',gender:'N'},
  {char:'謙',kor:'겸',stroke:17,oh:4,meaning:'겸손, 겸허',gender:'N'},
  {char:'潤',kor:'윤',stroke:15,oh:4,meaning:'윤택하다',gender:'N'},
  {char:'源',kor:'원',stroke:13,oh:4,meaning:'근원, 샘',gender:'M'},
  {char:'賢',kor:'현',stroke:15,oh:4,meaning:'현명함, 어짊',gender:'N'},
  {char:'準',kor:'준',stroke:13,oh:4,meaning:'기준, 표준',gender:'M'},
  {char:'浚',kor:'준',stroke:10,oh:4,meaning:'깊은 물, 심오함',gender:'M'},
  {char:'泓',kor:'홍',stroke:8,oh:4,meaning:'깊고 맑은 물',gender:'N'},
  {char:'瀚',kor:'한',stroke:20,oh:4,meaning:'넓은 물, 광대함',gender:'M'},
  {char:'慧',kor:'혜',stroke:15,oh:4,meaning:'슬기, 총명함',gender:'F'},
  {char:'淑',kor:'숙',stroke:11,oh:4,meaning:'맑다, 착하다',gender:'F'},
  {char:'海',kor:'해',stroke:10,oh:4,meaning:'바다',gender:'M'},
  {char:'江',kor:'강',stroke:6,oh:4,meaning:'강, 큰 강',gender:'M'},
  {char:'泉',kor:'천',stroke:9,oh:4,meaning:'샘, 샘물',gender:'N'},
  {char:'溪',kor:'계',stroke:13,oh:4,meaning:'시내, 계곡 물',gender:'F'},
  {char:'涵',kor:'함',stroke:11,oh:4,meaning:'포용하다, 담다',gender:'N'},
  {char:'湖',kor:'호',stroke:12,oh:4,meaning:'호수',gender:'N'},
  {char:'永',kor:'영',stroke:5,oh:4,meaning:'길다, 영원하다',gender:'N'},
  {char:'泰',kor:'태',stroke:10,oh:4,meaning:'크다, 태평',gender:'N'},
  {char:'濬',kor:'준',stroke:17,oh:4,meaning:'깊다, 깊이 파다',gender:'M'},
  {char:'洛',kor:'낙',stroke:9,oh:4,meaning:'낙수(강 이름)',gender:'N'},
  {char:'沛',kor:'패',stroke:7,oh:4,meaning:'비가 많음, 풍성함',gender:'M'},
  {char:'滄',kor:'창',stroke:13,oh:4,meaning:'큰 바다, 푸름',gender:'M'},
  {char:'津',kor:'진',stroke:9,oh:4,meaning:'나루터',gender:'N'},
];

// ── 5. 수리격 계산 유틸 ────────────────────────────────────────
function normStroke(n) {
  if (n <= 0) return 81;
  return ((n - 1) % 81) + 1;
}

/**
 * 4격 계산
 * @param {number} s  성씨 획수
 * @param {number} n1 이름 첫째 글자 획수
 * @param {number} n2 이름 둘째 글자 획수 (한 글자 이름이면 0)
 */
function getSuriGeok(s, n1, n2 = 0) {
  // 한 글자 이름 처리
  if (n2 === 0) {
    return {
      won:   normStroke(s + n1),   // 원격: 성+이름1
      hyeong:normStroke(n1),       // 형격: 이름만
      i:     normStroke(s + n1),   // 이격: 성+이름(끝)
      jeong: normStroke(s + n1),   // 정격: 전체
    };
  }
  return {
    won:   normStroke(s + n1),      // 원격: 성+이름1
    hyeong:normStroke(n1 + n2),     // 형격: 이름1+이름2
    i:     normStroke(s + n2),      // 이격: 성+이름2
    jeong: normStroke(s + n1 + n2), // 정격: 전체
  };
}

// luck → 점수
function luckScore(luck) {
  return { great:5, good:4, neutral:3, bad:1, terrible:0 }[luck] || 2;
}

// 대흉수 포함 여부
function hasTerrible(geok) {
  return Object.values(geok).some(v => SURI_DB[v]?.luck === 'terrible');
}

// ── 내보내기 (브라우저·Node·번들 공통) ─────────────────────────
(function _export() {
  const exports = {
    EUM_OHAENG_MAP, CHOSUNG_LIST, HANJA_DB, SURI_DB, SURNAME_DB,
    getChosung, getEumOh, getSurnameStroke, getSuriGeok, normStroke, luckScore, hasTerrible,
  };
  if (typeof globalThis !== 'undefined') Object.assign(globalThis, exports);
  if (typeof module   !== 'undefined')   module.exports = exports;
})();
