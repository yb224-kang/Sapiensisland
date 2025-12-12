// 교수 프로필 데이터 타입 정의
export interface Professor {
  id: number;              // 내부 정렬용 ID (1, 2, 3...)
  professorId: string;     // 실제 교수 ID (SP0001, SP0002...)
  name: string;            // 이름
  title: string;           // 직함/소속
  field: string;           // 전문 분야 (필터링/그룹핑용)
  image: string;           // 이미지 경로
  education: string;       // 학력 (상세, 줄바꿈 포함)
  expertise: string;       // 주요 강연/내용 (상세, 줄바꿈 포함)
  shortBio: string;        // 카드 호버시 표시할 짧은 소개 (2-3줄)
}

// 교수진 데이터
export const professors: Professor[] = [
  {
    id: 1,
    professorId: "SP0001",
    name: "김경일",
    title: "아주대학교 심리학과 교수",
    field: "심리학",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP001.png",
    education: "- 고려대학교 심리학과 학사 및 석사\n- Univ.of Texas-Austin 심리학 박사",
    expertise: "- [소통] 마음의 지혜 : 행복과 회복탄력성\n- [조직관리와 커뮤니케이션] 접근과 회피의 소통?과 지혜\n- [창의와 혁신] 생각의 비밀코드를 풀어내라\n- [리더십] 아프지말고 따르게 하라\n- [인간의 배움 행동 바로 알기] 메타인지를 알면 지혜가 보인다.\n- [삶의 질과 행복] 동기를 알면 행복이 보인다",
    shortBio: "Univ.of Texas-Austin 심리학 박사\n마음의 지혜와 행복, 창의와 혁신"
  },
  {
    id: 2,
    professorId: "SP0002",
    name: "김태훈",
    title: "경남대학교 심리학과 교수",
    field: "심리학",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP002.png",
    education: "- 고려대학교 심리학과 학사 및 석사\n- The Ohio State Univ. 심리학 박사",
    expertise: "- 창의적으로 일하는 방법\n- [인간의 배움행동 바로 알기] 메타인지를 알면 지혜가 보인다\n- 스마트하게 생각하기\n- [리더십] 아프지말고 따르게 하라\n- [심층 면접 방법] 면접-무엇을 보아야 하는가?\n- [수면] 잠은 타협의 대상이 아니다\n- KBS <역사저널그날>, tvn<어쩌다 어른>, <놀라운 증명>\n- JTBC <아는 형님>외 다수",
    shortBio: "The Ohio State Univ. 심리학 박사\n창의적 사고와 메타인지 전문가"
  },
  {
    id: 3,
    professorId: "SP0003",
    name: "이윤형",
    title: "영남대학교 심리학과 교수",
    field: "심리학",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP003.png",
    education: "- 고려대학교 심리학과 학사 및 석사\n- Univ. of North Carolina at Chapel Hill 심리학 박사",
    expertise: "- 나의 조직을 리드하는 관계와 상황의 힘\n- [리더십] 리더의 생각, 리더의 언어\n- [스스로 하는 습관 만들기] 탁월함은 습관으로부터\n- 마음의 과학으로 설명하는 학습원리",
    shortBio: "UNC Chapel Hill 심리학 박사\n리더십과 조직관리 전문가"
  },
  {
    id: 4,
    professorId: "SP0004",
    name: "한민",
    title: "문화심리학자",
    field: "심리학",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP004.png",
    education: "- 고려대학교 심리학과 학사 및 석사\n- 고려대학교 심리학 박사",
    expertise: "- 조직관리와 커뮤니케이션의 중요성\n- 한국 문화와 심리학을 쉽게 이해하기\n- 한국과 일본의 문화심리의 차이점 이해하기\n- 삶에 있어 행복해지는 법 (행복과 삶을 이해하다)",
    shortBio: "고려대학교 심리학 박사\n문화심리와 조직 커뮤니케이션"
  },
  {
    id: 5,
    professorId: "SP0005",
    name: "유영만",
    title: "한양대학교 교육공학과 교수",
    field: "교육학",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP005.png",
    education: "- 한양대학교 교육공학과 학사 및 석사\n- Florida State Univ. 교육공학박사",
    expertise: "- [리더십] 난국을 돌파하는 공감과 소통의 리더십\n- [인간지성] 지식으로 지시하지말고 지혜로 지휘하라\n- [스트레스 관리] 체인지의 지혜로 스트레스를 체인지하라!\n- [커뮤니케이션] 언어를 디자인하라/ 지식생태학자 유영만의 소통과 관계 혁명 전략\n- [성공과 행복] 몸이 부실하면 인생도 부도가 난다/ 한계는 한 게 없는 사람의 핑계다",
    shortBio: "Florida State Univ. 교육공학박사\n지식생태학과 소통의 리더십"
  },
  {
    id: 6,
    professorId: "SP0006",
    name: "정재한",
    title: "네모파트너즈 전 대표이사",
    field: "경영전략",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP006.png",
    education: "- 고려대학교 경영학과\n- University of Pennsylvania Wharton MBA\n- 한국 해양대학교 해양물류 박사과정 수료",
    expertise: "- 경영전략, 전략 강의, 비즈니스 코칭\n- [전략 강의] 기업체 및 학교\n- 글로벌 비즈니스 무역/물류 이해 및 트렌드\n- 기업 성장을 위한 사업 구조조정과 포트폴리오 전략 수립\n- HR 관리 방안 및 R&D 조직변화 관리의 지향점\n- MBA 대상 전략적 Problem Solving 과정 및 특강\n- [컨설팅 프로젝트] 비전, 성장, 신규사업, 마케팅 전략 등\n- 전기, 전자, 반도체/ 자동차, 이차전지/ 제조/ 바이오\n- 미디어, 엔터테인먼트/ IT, 게임/ 통신, 우주항공",
    shortBio: "Wharton MBA\n경영전략 및 비즈니스 컨설팅"
  },
  {
    id: 7,
    professorId: "SP0007",
    name: "이영현",
    title: "참컴 부사장",
    field: "미디어",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP007.png",
    education: "- 고려대학교 국어국문학 학사\n- 중앙대학교 신문방송대학원 석사",
    expertise: "- 미디어 컨설팅 회사 참컴 부사장/ 참컴 USA 법인장\n- KBS 사회부, 경제부, 정치부, 시사지혁? '창' 기자\n- 뉴스라인, 아침뉴스타임 앵커\n- 9시 뉴스 편집부장\n- LA 특파원\n- 언론 대응의 이해하기\n- 인터뷰 잘하는 법\n- 질문의 방법 : 직접화법, 간접화법",
    shortBio: "전 KBS 앵커 및 특파원\n미디어 커뮤니케이션 전문가"
  },
  {
    id: 8,
    professorId: "SP0008",
    name: "김정아",
    title: "네모파트너즈 이사",
    field: "교육",
    image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP008.png",
    education: "- 이화여자대학교 교육공학학사 및 석사\n- Drexel University Business 수료\n- 숙명여대 TESOL 졸업",
    expertise: "- [해외취업 & 외국계 기업 취업] 프로그램\n- [커뮤니케이션]\n - (국내 유학생 대상)외국인 유학생 한국 취업 기초 다지기\n - (외국인 대상) 한국 직장 내 기본 예절 및 비즈니스 매너\n - 대기업 신입사원 오리엔테이션\n- [학부모 인성 교실] 학습 인성과 부모의 비전\n- [대학생 및 상인 인성 지도사] 인성 핵심 덕목과 역량의 이해",
    shortBio: "이화여대 교육공학 석사\n취업/인성 교육 전문가"
  }
];

// 전문 분야별 필터링 함수
export const getProfessorsByField = (field: string): Professor[] => {
  return professors.filter(prof => prof.field === field);
};

// ID로 교수 찾기
export const getProfessorById = (id: number): Professor | undefined => {
  return professors.find(prof => prof.id === id);
};

// 교수 ID로 찾기
export const getProfessorByProfessorId = (professorId: string): Professor | undefined => {
  return professors.find(prof => prof.professorId === professorId);
};

// 전문 분야 목록 가져오기
export const getUniqueFields = (): string[] => {
  return Array.from(new Set(professors.map(prof => prof.field)));
};
