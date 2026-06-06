/**
 * 자원오행(字源五行) 한자 데이터베이스
 * 
 * 자원오행: 한자의 자형(字形)·자의(字義)의 근원에 따라 목·화·토·금·수로 분류
 * 
 * 각 항목 구조:
 *   char   : 한자
 *   kor    : 훈(訓) + 음(音)
 *   stroke : 획수
 *   radical: 부수
 *   meaning: 뜻 설명
 */

const JAWO_OHAENG_DB = {

  /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *  木 (목) — 나무, 초목, 생장, 봄
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  木: [
    { char: "木", kor: "나무 목",   stroke: 4,  radical: "木", meaning: "나무" },
    { char: "林", kor: "수풀 림",   stroke: 8,  radical: "木", meaning: "수풀, 나무가 많은 곳" },
    { char: "森", kor: "빽빽할 삼", stroke: 12, radical: "木", meaning: "나무가 빽빽한 숲" },
    { char: "根", kor: "뿌리 근",   stroke: 10, radical: "木", meaning: "뿌리, 근본" },
    { char: "枝", kor: "가지 지",   stroke: 8,  radical: "木", meaning: "나뭇가지" },
    { char: "葉", kor: "잎 엽",     stroke: 12, radical: "艸", meaning: "잎사귀" },
    { char: "花", kor: "꽃 화",     stroke: 7,  radical: "艸", meaning: "꽃" },
    { char: "草", kor: "풀 초",     stroke: 9,  radical: "艸", meaning: "풀, 초목" },
    { char: "芽", kor: "싹 아",     stroke: 7,  radical: "艸", meaning: "싹, 새싹" },
    { char: "苗", kor: "모 묘",     stroke: 8,  radical: "艸", meaning: "모, 어린 식물" },
    { char: "松", kor: "소나무 송", stroke: 8,  radical: "木", meaning: "소나무" },
    { char: "柏", kor: "측백 백",   stroke: 9,  radical: "木", meaning: "측백나무, 잣나무" },
    { char: "桃", kor: "복숭아 도", stroke: 10, radical: "木", meaning: "복숭아나무" },
    { char: "梅", kor: "매화 매",   stroke: 11, radical: "木", meaning: "매화나무" },
    { char: "杏", kor: "살구 행",   stroke: 7,  radical: "木", meaning: "살구나무" },
    { char: "榮", kor: "영화 영",   stroke: 14, radical: "木", meaning: "영화, 꽃이 핌, 번성함" },
    { char: "樹", kor: "나무 수",   stroke: 16, radical: "木", meaning: "나무, 수목" },
    { char: "棟", kor: "마룻대 동", stroke: 12, radical: "木", meaning: "대들보, 으뜸" },
    { char: "楠", kor: "녹나무 남", stroke: 13, radical: "木", meaning: "녹나무, 남방의 나무" },
    { char: "梓", kor: "가래 재",   stroke: 11, radical: "木", meaning: "가래나무, 목판" },
    { char: "桓", kor: "굳셀 환",   stroke: 10, radical: "木", meaning: "굳셈, 으뜸 나무" },
    { char: "椿", kor: "참죽나무 춘", stroke: 13, radical: "木", meaning: "참죽나무, 장수" },
    { char: "楓", kor: "단풍 풍",   stroke: 13, radical: "木", meaning: "단풍나무" },
    { char: "柳", kor: "버들 류",   stroke: 9,  radical: "木", meaning: "버드나무" },
    { char: "栗", kor: "밤 율",     stroke: 10, radical: "木", meaning: "밤나무" },
    { char: "桑", kor: "뽕나무 상", stroke: 10, radical: "木", meaning: "뽕나무" },
    { char: "茂", kor: "무성할 무", stroke: 8,  radical: "艸", meaning: "초목이 무성함" },
    { char: "芳", kor: "꽃다울 방", stroke: 7,  radical: "艸", meaning: "꽃이 향기로움, 아름다움" },
    { char: "莉", kor: "말리 리",   stroke: 10, radical: "艸", meaning: "말리꽃, 자스민" },
    { char: "蓮", kor: "연꽃 련",   stroke: 13, radical: "艸", meaning: "연꽃" },
    { char: "菊", kor: "국화 국",   stroke: 11, radical: "艸", meaning: "국화" },
    { char: "蘭", kor: "난초 란",   stroke: 20, radical: "艸", meaning: "난초" },
    { char: "薇", kor: "장미 미",   stroke: 16, radical: "艸", meaning: "장미, 고비" },
    { char: "桂", kor: "계수 계",   stroke: 10, radical: "木", meaning: "계수나무" },
    { char: "楨", kor: "정정할 정", stroke: 13, radical: "木", meaning: "굳센 나무, 정(楨)목" },
    { char: "梧", kor: "오동 오",   stroke: 11, radical: "木", meaning: "오동나무" },
    { char: "檀", kor: "박달 단",   stroke: 17, radical: "木", meaning: "박달나무, 단목" },
    { char: "槿", kor: "무궁화 근", stroke: 15, radical: "木", meaning: "무궁화" },
    { char: "杰", kor: "뛰어날 걸", stroke: 8,  radical: "木", meaning: "뛰어난 인물, 재목" },
    { char: "材", kor: "재목 재",   stroke: 7,  radical: "木", meaning: "재목, 재능" },
    { char: "植", kor: "심을 식",   stroke: 12, radical: "木", meaning: "심다, 식물" },
    { char: "培", kor: "북돋울 배", stroke: 11, radical: "土", meaning: "북돋우다, 기르다 (초목 성장)" },
    { char: "秀", kor: "빼어날 수", stroke: 7,  radical: "禾", meaning: "빼어남, 이삭이 패다" },
    { char: "禾", kor: "벼 화",     stroke: 5,  radical: "禾", meaning: "벼, 곡식" },
    { char: "穗", kor: "이삭 수",   stroke: 17, radical: "禾", meaning: "이삭" },
    { char: "竹", kor: "대나무 죽", stroke: 6,  radical: "竹", meaning: "대나무" },
    { char: "筠", kor: "대껍질 균", stroke: 13, radical: "竹", meaning: "대나무 껍질, 고른 대" },
    { char: "篠", kor: "가는대 소", stroke: 16, radical: "竹", meaning: "가는 대나무" },
    { char: "菁", kor: "부추꽃 청", stroke: 11, radical: "艸", meaning: "무성함, 부추꽃" },
    { char: "苑", kor: "동산 원",   stroke: 8,  radical: "艸", meaning: "동산, 정원" },
  ],

  /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *  火 (화) — 불, 태양, 열, 밝음, 여름
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  火: [
    { char: "火", kor: "불 화",     stroke: 4,  radical: "火", meaning: "불" },
    { char: "炎", kor: "불꽃 염",   stroke: 8,  radical: "火", meaning: "불꽃, 타오름" },
    { char: "燦", kor: "빛날 찬",   stroke: 17, radical: "火", meaning: "찬란하게 빛남" },
    { char: "燈", kor: "등불 등",   stroke: 16, radical: "火", meaning: "등불, 빛" },
    { char: "煥", kor: "빛날 환",   stroke: 13, radical: "火", meaning: "빛나다, 환하다" },
    { char: "炫", kor: "빛날 현",   stroke: 9,  radical: "火", meaning: "빛나다, 밝다" },
    { char: "熙", kor: "빛날 희",   stroke: 13, radical: "火", meaning: "빛나다, 화창하다" },
    { char: "煜", kor: "빛날 욱",   stroke: 13, radical: "火", meaning: "빛나다" },
    { char: "烈", kor: "세찰 렬",   stroke: 10, radical: "火", meaning: "세참, 맹렬함" },
    { char: "熱", kor: "더울 열",   stroke: 15, radical: "火", meaning: "더위, 열" },
    { char: "光", kor: "빛 광",     stroke: 6,  radical: "儿", meaning: "빛, 광명" },
    { char: "明", kor: "밝을 명",   stroke: 8,  radical: "日", meaning: "밝다, 밝음" },
    { char: "晴", kor: "맑을 청",   stroke: 12, radical: "日", meaning: "날씨가 맑다" },
    { char: "暉", kor: "빛날 휘",   stroke: 13, radical: "日", meaning: "햇빛, 빛남" },
    { char: "昊", kor: "넓은하늘 호", stroke: 8, radical: "日", meaning: "넓은 하늘, 여름 하늘" },
    { char: "旭", kor: "아침 햇빛 욱", stroke: 6, radical: "日", meaning: "아침 햇빛, 해돋이" },
    { char: "昱", kor: "빛날 욱",   stroke: 9,  radical: "日", meaning: "해가 빛남" },
    { char: "晨", kor: "새벽 신",   stroke: 11, radical: "日", meaning: "새벽, 이른 아침" },
    { char: "曦", kor: "햇빛 희",   stroke: 20, radical: "日", meaning: "햇빛, 아침 햇살" },
    { char: "炳", kor: "빛날 병",   stroke: 9,  radical: "火", meaning: "밝게 빛남" },
    { char: "燁", kor: "불꽃 엽",   stroke: 16, radical: "火", meaning: "불꽃이 이글거림" },
    { char: "焄", kor: "향기 훈",   stroke: 11, radical: "火", meaning: "향기, 그을음" },
    { char: "熹", kor: "빛날 희",   stroke: 16, radical: "火", meaning: "빛나다, 따뜻하다" },
    { char: "日", kor: "날 일",     stroke: 4,  radical: "日", meaning: "해, 날" },
    { char: "星", kor: "별 성",     stroke: 9,  radical: "日", meaning: "별, 성신" },
    { char: "曜", kor: "빛날 요",   stroke: 18, radical: "日", meaning: "빛나다, 요일" },
    { char: "暘", kor: "해돋을 양", stroke: 13, radical: "日", meaning: "해가 돋음, 맑음" },
    { char: "昺", kor: "밝을 병",   stroke: 9,  radical: "日", meaning: "밝음, 빛남" },
    { char: "焰", kor: "불꽃 염",   stroke: 12, radical: "火", meaning: "불꽃, 화염" },
    { char: "炡", kor: "빛 정",     stroke: 9,  radical: "火", meaning: "불빛" },
    { char: "熔", kor: "녹일 용",   stroke: 14, radical: "火", meaning: "녹이다" },
    { char: "燮", kor: "화할 섭",   stroke: 17, radical: "火", meaning: "조화, 불길이 번짐" },
    { char: "赫", kor: "빛날 혁",   stroke: 14, radical: "赤", meaning: "빛남, 붉게 빛남" },
    { char: "炤", kor: "밝을 조",   stroke: 9,  radical: "火", meaning: "밝다, 비추다" },
    { char: "照", kor: "비출 조",   stroke: 13, radical: "火", meaning: "비추다, 밝히다" },
    { char: "熙", kor: "빛날 희",   stroke: 13, radical: "火", meaning: "화창함, 빛남" },
    { char: "煐", kor: "빛날 영",   stroke: 13, radical: "火", meaning: "빛나다" },
    { char: "燦", kor: "빛날 찬",   stroke: 17, radical: "火", meaning: "찬란함" },
    { char: "灿", kor: "빛날 찬",   stroke: 7,  radical: "火", meaning: "찬란함 (간체)" },
    { char: "炬", kor: "횃불 거",   stroke: 9,  radical: "火", meaning: "횃불" },
  ],

  /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *  土 (토) — 흙, 땅, 대지, 중앙, 환절기
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  土: [
    { char: "土", kor: "흙 토",     stroke: 3,  radical: "土", meaning: "흙, 땅" },
    { char: "地", kor: "땅 지",     stroke: 6,  radical: "土", meaning: "땅, 대지" },
    { char: "坤", kor: "땅 곤",     stroke: 8,  radical: "土", meaning: "땅, 여성적 힘" },
    { char: "埈", kor: "높을 준",   stroke: 10, radical: "土", meaning: "땅이 높다" },
    { char: "培", kor: "북돋울 배", stroke: 11, radical: "土", meaning: "땅을 북돋우다" },
    { char: "堅", kor: "굳을 견",   stroke: 11, radical: "土", meaning: "굳다, 단단하다" },
    { char: "基", kor: "터 기",     stroke: 11, radical: "土", meaning: "터, 기초, 기반" },
    { char: "城", kor: "성 성",     stroke: 9,  radical: "土", meaning: "성, 성벽" },
    { char: "垣", kor: "담 원",     stroke: 9,  radical: "土", meaning: "담, 낮은 담" },
    { char: "坦", kor: "평탄할 탄", stroke: 8,  radical: "土", meaning: "평탄하다" },
    { char: "域", kor: "지경 역",   stroke: 11, radical: "土", meaning: "경계, 지역" },
    { char: "均", kor: "고를 균",   stroke: 7,  radical: "土", meaning: "고르다, 균등함" },
    { char: "堯", kor: "요임금 요", stroke: 12, radical: "土", meaning: "높다, 요(堯)임금" },
    { char: "堤", kor: "둑 제",     stroke: 12, radical: "土", meaning: "둑, 제방" },
    { char: "埼", kor: "갑 기",     stroke: 11, radical: "土", meaning: "육지가 바다로 뻗은 곳" },
    { char: "塤", kor: "훈 훈",     stroke: 13, radical: "土", meaning: "질그릇 악기" },
    { char: "壽", kor: "목숨 수",   stroke: 14, radical: "士", meaning: "장수, 오래 삶" },
    { char: "壤", kor: "흙 양",     stroke: 20, radical: "土", meaning: "기름진 흙, 대지" },
    { char: "垠", kor: "언덕 은",   stroke: 9,  radical: "土", meaning: "언덕 끝, 경계" },
    { char: "坡", kor: "언덕 파",   stroke: 8,  radical: "土", meaning: "비탈, 언덕" },
    { char: "峰", kor: "봉우리 봉", stroke: 10, radical: "山", meaning: "산봉우리" },
    { char: "山", kor: "뫼 산",     stroke: 3,  radical: "山", meaning: "산" },
    { char: "岳", kor: "큰산 악",   stroke: 8,  radical: "山", meaning: "높은 산" },
    { char: "嶺", kor: "고개 령",   stroke: 17, radical: "山", meaning: "고개, 산마루" },
    { char: "崇", kor: "높을 숭",   stroke: 11, radical: "山", meaning: "높다, 높이다" },
    { char: "丘", kor: "언덕 구",   stroke: 5,  radical: "一", meaning: "언덕" },
    { char: "阜", kor: "언덕 부",   stroke: 8,  radical: "阜", meaning: "언덕, 흙산" },
    { char: "陵", kor: "능 릉",     stroke: 11, radical: "阜", meaning: "큰 언덕, 왕릉" },
    { char: "原", kor: "근원 원",   stroke: 10, radical: "厂", meaning: "근원, 들판" },
    { char: "坰", kor: "들 경",     stroke: 9,  radical: "土", meaning: "먼 들판" },
    { char: "堦", kor: "섬돌 계",   stroke: 12, radical: "土", meaning: "섬돌, 계단" },
    { char: "塊", kor: "흙덩이 괴", stroke: 13, radical: "土", meaning: "흙덩이" },
    { char: "壁", kor: "벽 벽",     stroke: 16, radical: "土", meaning: "벽, 담벽" },
    { char: "封", kor: "봉할 봉",   stroke: 9,  radical: "土", meaning: "봉하다, 영지" },
    { char: "埴", kor: "찰흙 식",   stroke: 11, radical: "土", meaning: "점토, 찰흙" },
  ],

  /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *  金 (금) — 금속, 쇠, 단단함, 가을
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  金: [
    { char: "金", kor: "쇠 금",     stroke: 8,  radical: "金", meaning: "금, 쇠, 금속" },
    { char: "銀", kor: "은 은",     stroke: 14, radical: "金", meaning: "은" },
    { char: "鐵", kor: "쇠 철",     stroke: 21, radical: "金", meaning: "철, 쇠" },
    { char: "鋼", kor: "강철 강",   stroke: 16, radical: "金", meaning: "강철" },
    { char: "銅", kor: "구리 동",   stroke: 14, radical: "金", meaning: "구리" },
    { char: "鑄", kor: "부을 주",   stroke: 22, radical: "金", meaning: "쇠를 녹여 붓다" },
    { char: "鍊", kor: "쇠불릴 련", stroke: 17, radical: "金", meaning: "쇠를 단련함" },
    { char: "錦", kor: "비단 금",   stroke: 16, radical: "金", meaning: "비단, 수놓은 직물" },
    { char: "鉉", kor: "솥귀 현",   stroke: 13, radical: "金", meaning: "솥의 귀, 정승" },
    { char: "鈺", kor: "보배 옥",   stroke: 13, radical: "金", meaning: "보배로운 쇠" },
    { char: "鎬", kor: "호경 호",   stroke: 18, radical: "金", meaning: "호경(지명), 쇠 이름" },
    { char: "鎭", kor: "진압할 진", stroke: 18, radical: "金", meaning: "진압하다, 진(鎭)" },
    { char: "錫", kor: "주석 석",   stroke: 16, radical: "金", meaning: "주석, 하사하다" },
    { char: "鏞", kor: "큰종 용",   stroke: 19, radical: "金", meaning: "큰 종" },
    { char: "鑫", kor: "금성할 흠", stroke: 24, radical: "金", meaning: "금이 많음, 번성" },
    { char: "銓", kor: "저울 전",   stroke: 14, radical: "金", meaning: "저울, 인재 선발" },
    { char: "鋒", kor: "날카로울 봉", stroke: 15, radical: "金", meaning: "날카로운 끝, 선봉" },
    { char: "劍", kor: "칼 검",     stroke: 15, radical: "刀", meaning: "칼, 검" },
    { char: "鎌", kor: "낫 겸",     stroke: 17, radical: "金", meaning: "낫" },
    { char: "鑰", kor: "열쇠 약",   stroke: 25, radical: "金", meaning: "열쇠" },
    { char: "銘", kor: "새길 명",   stroke: 14, radical: "金", meaning: "새기다, 명심하다" },
    { char: "鎔", kor: "녹일 용",   stroke: 18, radical: "金", meaning: "녹이다, 주조하다" },
    { char: "鈞", kor: "고를 균",   stroke: 12, radical: "金", meaning: "균등하다, 도자기 물레" },
    { char: "鉀", kor: "칼륨 갑",   stroke: 12, radical: "金", meaning: "칼륨" },
    { char: "釗", kor: "힘쓸 초",   stroke: 8,  radical: "金", meaning: "힘쓰다, 격려" },
    { char: "釣", kor: "낚을 조",   stroke: 11, radical: "金", meaning: "낚시, 구하다" },
    { char: "鏡", kor: "거울 경",   stroke: 19, radical: "金", meaning: "거울" },
    { char: "鐘", kor: "쇠북 종",   stroke: 20, radical: "金", meaning: "종, 쇠북" },
    { char: "鑛", kor: "광석 광",   stroke: 23, radical: "金", meaning: "광석, 광산" },
    { char: "銀", kor: "은 은",     stroke: 14, radical: "金", meaning: "은" },
    { char: "鈿", kor: "비녀 전",   stroke: 13, radical: "金", meaning: "비녀, 금박 장식" },
  ],

  /** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *  水 (수) — 물, 흐름, 지혜, 겨울
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  水: [
    { char: "水", kor: "물 수",     stroke: 4,  radical: "水", meaning: "물" },
    { char: "江", kor: "강 강",     stroke: 6,  radical: "水", meaning: "강, 큰 강" },
    { char: "河", kor: "물 하",     stroke: 8,  radical: "水", meaning: "강, 황하" },
    { char: "海", kor: "바다 해",   stroke: 10, radical: "水", meaning: "바다" },
    { char: "湖", kor: "호수 호",   stroke: 12, radical: "水", meaning: "호수" },
    { char: "泉", kor: "샘 천",     stroke: 9,  radical: "水", meaning: "샘, 샘물" },
    { char: "溪", kor: "시냇물 계", stroke: 13, radical: "水", meaning: "시내, 계곡 물" },
    { char: "川", kor: "내 천",     stroke: 3,  radical: "川", meaning: "내, 시냇물" },
    { char: "澤", kor: "못 택",     stroke: 16, radical: "水", meaning: "연못, 은택" },
    { char: "潤", kor: "윤택할 윤", stroke: 15, radical: "水", meaning: "윤택하다, 적시다" },
    { char: "洙", kor: "물이름 수", stroke: 9,  radical: "水", meaning: "물 이름, 강 이름" },
    { char: "浩", kor: "클 호",     stroke: 10, radical: "水", meaning: "물이 넓고 큼" },
    { char: "淸", kor: "맑을 청",   stroke: 11, radical: "水", meaning: "맑다, 깨끗하다" },
    { char: "洋", kor: "바다 양",   stroke: 9,  radical: "水", meaning: "큰 바다, 서양" },
    { char: "波", kor: "물결 파",   stroke: 8,  radical: "水", meaning: "물결, 파도" },
    { char: "濤", kor: "큰 물결 도", stroke: 17, radical: "水", meaning: "큰 파도" },
    { char: "渡", kor: "건널 도",   stroke: 12, radical: "水", meaning: "건너다, 도강" },
    { char: "源", kor: "근원 원",   stroke: 13, radical: "水", meaning: "근원, 수원" },
    { char: "流", kor: "흐를 류",   stroke: 10, radical: "水", meaning: "흐르다" },
    { char: "涵", kor: "젖을 함",   stroke: 11, radical: "水", meaning: "물에 잠기다, 포용하다" },
    { char: "洪", kor: "넓을 홍",   stroke: 9,  radical: "Water", meaning: "넓다, 큰물" },
    { char: "漢", kor: "한나라 한", stroke: 14, radical: "水", meaning: "한수, 한나라" },
    { char: "淵", kor: "못 연",     stroke: 12, radical: "水", meaning: "깊은 못" },
    { char: "沛", kor: "비 많을 패", stroke: 7, radical: "水", meaning: "비가 많음, 풍성함" },
    { char: "滄", kor: "큰 바다 창", stroke: 13, radical: "水", meaning: "큰 바다, 푸름" },
    { char: "瀚", kor: "넓을 한",   stroke: 20, radical: "水", meaning: "광대하다, 사막" },
    { char: "汐", kor: "저녁 조수 석", stroke: 6, radical: "Water", meaning: "저녁 조수" },
    { char: "津", kor: "나루 진",   stroke: 9,  radical: "Water", meaning: "나루터, 진액" },
    { char: "浚", kor: "깊을 준",   stroke: 10, radical: "Water", meaning: "깊다, 준설" },
    { char: "淑", kor: "맑을 숙",   stroke: 11, radical: "Water", meaning: "맑다, 착하다" },
    { char: "泓", kor: "물 깊을 홍", stroke: 8, radical: "Water", meaning: "물이 깊고 맑음" },
    { char: "濬", kor: "깊을 준",   stroke: 17, radical: "Water", meaning: "깊다, 깊이 파다" },
    { char: "洛", kor: "낙수 락",   stroke: 9,  radical: "Water", meaning: "낙수(강 이름)" },
    { char: "汪", kor: "넓을 왕",   stroke: 7,  radical: "Water", meaning: "물이 넓음" },
    { char: "沁", kor: "스밀 심",   stroke: 7,  radical: "Water", meaning: "스미다, 젖다" },
    { char: "沚", kor: "물가 지",   stroke: 7,  radical: "Water", meaning: "물가의 작은 섬" },
    { char: "泰", kor: "클 태",     stroke: 10, radical: "水", meaning: "크다, 태평" },
    { char: "永", kor: "길 영",     stroke: 5,  radical: "水", meaning: "길다, 영원하다" },
    { char: "汝", kor: "너 여",     stroke: 6,  radical: "Water", meaning: "너, 여수(강 이름)" },
    { char: "沿", kor: "물따라 연", stroke: 8,  radical: "Water", meaning: "따라가다, 연안" },
  ],

};

/** ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  유틸리티 함수
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**
 * 특정 오행의 한자 목록 반환
 * @param {"木"|"火"|"土"|"金"|"水"} ohaeng
 * @returns {Array}
 */
function getByOhaeng(ohaeng) {
  return JAWO_OHAENG_DB[ohaeng] ?? [];
}

/**
 * 한자로 오행 검색
 * @param {string} char - 한자 한 글자
 * @returns {{ ohaeng: string, info: object }|null}
 */
function findChar(char) {
  for (const [ohaeng, list] of Object.entries(JAWO_OHAENG_DB)) {
    const info = list.find(item => item.char === char);
    if (info) return { ohaeng, info };
  }
  return null;
}

/**
 * 획수 범위로 한자 검색 (전 오행)
 * @param {number} min
 * @param {number} max
 * @returns {Array<{ ohaeng: string, ...item }>}
 */
function findByStrokeRange(min, max) {
  const result = [];
  for (const [ohaeng, list] of Object.entries(JAWO_OHAENG_DB)) {
    list.forEach(item => {
      if (item.stroke >= min && item.stroke <= max) {
        result.push({ ohaeng, ...item });
      }
    });
  }
  return result;
}

/**
 * 훈음(kor) 키워드로 검색
 * @param {string} keyword
 * @returns {Array<{ ohaeng: string, ...item }>}
 */
function searchByKor(keyword) {
  const result = [];
  for (const [ohaeng, list] of Object.entries(JAWO_OHAENG_DB)) {
    list.forEach(item => {
      if (item.kor.includes(keyword) || item.meaning.includes(keyword)) {
        result.push({ ohaeng, ...item });
      }
    });
  }
  return result;
}

/**
 * 전체 통계 반환
 * @returns {object}
 */
function getStats() {
  const stats = {};
  let total = 0;
  for (const [ohaeng, list] of Object.entries(JAWO_OHAENG_DB)) {
    stats[ohaeng] = list.length;
    total += list.length;
  }
  stats["합계"] = total;
  return stats;
}

// ── CommonJS / ESM 양쪽 호환 내보내기 ──
if (typeof module !== "undefined" && module.exports) {
  // CommonJS (Node.js)
  module.exports = {
    JAWO_OHAENG_DB,
    getByOhaeng,
    findChar,
    findByStrokeRange,
    searchByKor,
    getStats,
  };
} else if (typeof window !== "undefined") {
  // 브라우저 글로벌
  window.JAWO_OHAENG_DB    = JAWO_OHAENG_DB;
  window.getByOhaeng        = getByOhaeng;
  window.findChar           = findChar;
  window.findByStrokeRange  = findByStrokeRange;
  window.searchByKor        = searchByKor;
  window.getStats           = getStats;
}

/* ── 사용 예시 (주석) ────────────────────────────────
 *
 *  // 목(木) 오행 전체 보기
 *  console.log(getByOhaeng("木"));
 *
 *  // 한자 '江' 의 오행 확인
 *  console.log(findChar("江"));
 *  // → { ohaeng: "水", info: { char: "江", kor: "강 강", stroke: 6, ... } }
 *
 *  // 획수 8~10 사이 한자 검색
 *  console.log(findByStrokeRange(8, 10));
 *
 *  // "빛"이 들어간 한자 검색
 *  console.log(searchByKor("빛"));
 *
 *  // 오행별 한자 수 통계
 *  console.log(getStats());
 *  // → { 木: 50, 火: 40, 土: 35, 金: 31, 水: 40, 합계: 196 }
 *
 * ─────────────────────────────────────────────────── */
