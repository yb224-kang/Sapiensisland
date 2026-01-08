/**
 * 중앙화된 Mock 데이터
 * 모든 Admin 페이지에서 공통으로 사용하는 데이터를 관리합니다.
 * 
 * 데이터 흐름:
 * 1. 예약 신청 (reservations) → status: pending
 * 2. 예약 확정 (reservations) → status: confirmed
 * 3. 강연 완료 (reservations) → status: completed
 * 4. 정산 등록 (settlements) → 완료된 예약에 대해 정산 정보 생성
 * 5. 정산 완료 (settlements) → settlementStatus: completed
 */

// ============================================
// 타입 정의
// ============================================

export interface Reservation {
  id: number;
  reservationDate: string;
  reservationTime: string;
  expert: string;
  expertField: string;
  type: '강연' | '방송' | '촬영' | '자문' | '출연' | '인터뷰' | '상담' | '추천사';
  locationType: 'online' | 'offline';
  location: string;
  region: string;
  agency: string;
  client: string;
  topic: string;
  audience: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

export interface Settlement {
  id: number;
  reservationId: number;
  revenue: number;
  cost: number;
  profit: number;
  profitRate: number;
  commissionRate: number;
  commissionAmount: number;
  settlementAmount: number;
  settlementStatus: 'pending' | 'completed';
  settlementDate?: string;
  paymentScheduledDate?: string;
  memo?: string;
}

export interface Expert {
  id: number;
  name: string;
  field: string;
  title: string;
  imageUrl?: string;
  bio?: string;
  specialties: string[];
  career: string[];
  education: string[];
  isActive: boolean;
}

export interface MonthlyStats {
  month: string;
  bookings: number;
  revenue: number;
  profit: number;
  cost: number;
  settlement: number;
  completed: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  expertDetails: {
    expert: string;
    bookings: number;
    revenue: number;
  }[];
}

export interface Inquiry {
  id: number;
  title: string;
  message: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: 'pending' | 'replied' | 'resolved';
  createdAt: string;
  repliedAt?: string;
  reply?: string;
  repliedBy?: string;
}

// ============================================
// 예약 데이터 (Reservations)
// ============================================

export const reservations: Reservation[] = [
  {
    id: 1,
    reservationDate: "2024-12-15",
    reservationTime: "14:00",
    expert: "김경일",
    expertField: "심리학",
    type: '강연',
    locationType: "offline",
    location: "삼성전자 본사 대강당",
    region: "경기도",
    agency: "삼성전자",
    client: "삼성전자 HR팀",
    topic: "조직 심리와 팀워크",
    audience: "전 직원",
    contactName: "김담당",
    contactPhone: "010-1234-5678",
    contactEmail: "kim@samsung.com",
    fee: 2500000,
    status: "completed",
    createdAt: "2024-11-20 10:30",
    confirmedAt: "2024-11-21 14:20",
    completedAt: "2024-12-15 16:00"
  },
  {
    id: 2,
    reservationDate: "2024-12-18",
    reservationTime: "10:00",
    expert: "유영만",
    expertField: "교육학",
    type: '자문',
    locationType: "online",
    location: "Zoom 온라인",
    region: "서울특별시",
    agency: "현대자동차",
    client: "현대자동차 인재개발원",
    topic: "미래 인재 육성 전략",
    audience: "임원진",
    contactName: "이과장",
    contactPhone: "010-2345-6789",
    contactEmail: "lee@hyundai.com",
    fee: 3000000,
    status: "confirmed",
    createdAt: "2024-11-25 09:15",
    confirmedAt: "2024-11-26 11:30"
  },
  {
    id: 3,
    reservationDate: "2024-12-20",
    reservationTime: "15:00",
    expert: "정재한",
    expertField: "경영전략",
    type: '강연',
    locationType: "offline",
    location: "LG트윈타워 컨퍼런스홀",
    region: "서울특별시",
    agency: "LG전자",
    client: "LG전자 경영전략팀",
    topic: "글로벌 경영 전략과 혁신",
    audience: "경영진",
    contactName: "박부장",
    contactPhone: "010-3456-7890",
    contactEmail: "park@lg.com",
    fee: 2800000,
    status: "confirmed",
    createdAt: "2024-12-01 13:45",
    confirmedAt: "2024-12-02 16:20"
  },
  {
    id: 4,
    reservationDate: "2024-12-22",
    reservationTime: "09:00",
    expert: "김태훈",
    expertField: "심리학",
    type: '강연',
    locationType: "offline",
    location: "SK하이닉스 연수원",
    region: "경기도",
    agency: "SK하이닉스",
    client: "SK하이닉스 교육팀",
    topic: "조직 내 소통과 갈등 관리",
    audience: "팀장급",
    contactName: "최차장",
    contactPhone: "010-4567-8901",
    contactEmail: "choi@skhynix.com",
    fee: 2200000,
    status: "pending",
    createdAt: "2024-12-10 11:20"
  },
  {
    id: 5,
    reservationDate: "2024-11-30",
    reservationTime: "13:00",
    expert: "김미경",
    expertField: "교육",
    type: '강연',
    locationType: "online",
    location: "MS Teams",
    region: "서울특별시",
    agency: "네이버",
    client: "네이버 인재육성팀",
    topic: "리더십과 동기부여",
    audience: "신입사원",
    contactName: "강대리",
    contactPhone: "010-5678-9012",
    contactEmail: "kang@naver.com",
    fee: 2000000,
    status: "completed",
    createdAt: "2024-11-01 14:30",
    confirmedAt: "2024-11-02 09:45",
    completedAt: "2024-11-30 15:00"
  },
  {
    id: 6,
    reservationDate: "2024-11-28",
    reservationTime: "16:00",
    expert: "최재붕",
    expertField: "미디어",
    type: '방송',
    locationType: "offline",
    location: "카카오 판교오피스",
    region: "경기도",
    agency: "카카오",
    client: "카카오 마케팅팀",
    topic: "디지털 전환과 미디어 트렌드",
    audience: "전체 직원",
    contactName: "윤팀장",
    contactPhone: "010-6789-0123",
    contactEmail: "yoon@kakao.com",
    fee: 2700000,
    status: "completed",
    createdAt: "2024-10-28 10:15",
    confirmedAt: "2024-10-29 14:30",
    completedAt: "2024-11-28 18:00"
  },
  {
    id: 7,
    reservationDate: "2024-12-05",
    reservationTime: "11:00",
    expert: "김경일",
    expertField: "심리학",
    type: '강연',
    locationType: "offline",
    location: "LG전자 연구소",
    region: "서울특별시",
    agency: "LG전자",
    client: "LG전자 R&D센터",
    topic: "창의성과 혁신적 사고",
    audience: "연구원",
    contactName: "서연구원",
    contactPhone: "010-7890-1234",
    contactEmail: "seo@lg.com",
    fee: 2400000,
    status: "completed",
    createdAt: "2024-11-05 09:30",
    confirmedAt: "2024-11-06 13:15",
    completedAt: "2024-12-05 13:00"
  },
  {
    id: 8,
    reservationDate: "2024-11-20",
    reservationTime: "14:30",
    expert: "유영만",
    expertField: "교육학",
    type: '강연',
    locationType: "online",
    location: "Zoom 온라인",
    region: "서울특별시",
    agency: "삼성전자",
    client: "삼성전자 교육센터",
    topic: "학습 조직 구축 전략",
    audience: "관리자급",
    contactName: "정부장",
    contactPhone: "010-8901-2345",
    contactEmail: "jung@samsung.com",
    fee: 3200000,
    status: "completed",
    createdAt: "2024-10-20 15:45",
    confirmedAt: "2024-10-21 10:30",
    completedAt: "2024-11-20 16:30"
  },
  {
    id: 9,
    reservationDate: "2024-12-25",
    reservationTime: "10:30",
    expert: "정재한",
    expertField: "경영전략",
    type: '강연',
    locationType: "offline",
    location: "포스코센터",
    region: "서울특별시",
    agency: "포스코",
    client: "포스코 기획팀",
    topic: "지속 가능한 경영 전략",
    audience: "임원진",
    contactName: "임상무",
    contactPhone: "010-9012-3456",
    contactEmail: "lim@posco.com",
    fee: 3500000,
    status: "pending",
    createdAt: "2024-12-12 16:20"
  },
  {
    id: 10,
    reservationDate: "2024-11-10",
    reservationTime: "14:00",
    expert: "최재붕",
    expertField: "미디어",
    type: '강연',
    locationType: "offline",
    location: "배달의민족 본사",
    region: "서울특별시",
    agency: "우아한형제들",
    client: "우아한형제들 마케팅팀",
    topic: "모바일 시대의 마케팅 전략",
    audience: "마케팅팀",
    contactName: "송팀장",
    contactPhone: "010-2222-3333",
    contactEmail: "song@woowa.com",
    fee: 2600000,
    status: "completed",
    createdAt: "2024-10-10 12:25",
    confirmedAt: "2024-10-11 15:40",
    completedAt: "2024-11-10 15:30"
  },
  // 부산광역시
  {
    id: 11,
    reservationDate: "2024-12-05",
    reservationTime: "14:00",
    expert: "김경일",
    expertField: "심리학",
    type: '강연',
    locationType: "offline",
    location: "부산 벡스코",
    region: "부산광역시",
    agency: "부산시청",
    client: "부산시청 교육과",
    topic: "공직자 리더십과 조직문화",
    audience: "공무원",
    contactName: "박과장",
    contactPhone: "051-1234-5678",
    contactEmail: "park@busan.go.kr",
    fee: 1800000,
    status: "completed",
    createdAt: "2024-11-01 09:30",
    confirmedAt: "2024-11-02 14:20",
    completedAt: "2024-12-05 16:00"
  },
  // 대구광역시
  {
    id: 12,
    reservationDate: "2024-12-08",
    reservationTime: "10:00",
    expert: "유영만",
    expertField: "교육학",
    type: '자문',
    locationType: "offline",
    location: "대구 엑스코",
    region: "대구광역시",
    agency: "대구교육청",
    client: "대구교육청 인재육성팀",
    topic: "교육 혁신과 미래 인재",
    audience: "교사",
    contactName: "김선생",
    contactPhone: "053-2345-6789",
    contactEmail: "kim@dge.go.kr",
    fee: 1500000,
    status: "completed",
    createdAt: "2024-11-10 11:00",
    confirmedAt: "2024-11-11 15:30",
    completedAt: "2024-12-08 12:00"
  },
  // 인천광역시
  {
    id: 13,
    reservationDate: "2024-12-12",
    reservationTime: "15:00",
    expert: "정재한",
    expertField: "경영전략",
    type: '강연',
    locationType: "offline",
    location: "인천 송도 컨벤시아",
    region: "인천광역시",
    agency: "인천항만공사",
    client: "인천항만공사 전략기획팀",
    topic: "글로벌 물류 전략",
    audience: "임직원",
    contactName: "이부장",
    contactPhone: "032-3456-7890",
    contactEmail: "lee@icpa.or.kr",
    fee: 2000000,
    status: "confirmed",
    createdAt: "2024-11-15 13:45",
    confirmedAt: "2024-11-16 10:20"
  },
  // 광주광역시
  {
    id: 14,
    reservationDate: "2024-12-16",
    reservationTime: "13:00",
    expert: "김미경",
    expertField: "교육",
    type: '강연',
    locationType: "offline",
    location: "광주 김대중컨벤션센터",
    region: "광주광역시",
    agency: "광주문화재단",
    client: "광주문화재단 교육팀",
    topic: "자기계발과 동기부여",
    audience: "시민",
    contactName: "최팀장",
    contactPhone: "062-4567-8901",
    contactEmail: "choi@gjcf.or.kr",
    fee: 1300000,
    status: "confirmed",
    createdAt: "2024-11-20 09:15",
    confirmedAt: "2024-11-21 11:30"
  },
  // 대전광역시
  {
    id: 15,
    reservationDate: "2024-12-19",
    reservationTime: "11:00",
    expert: "김태훈",
    expertField: "심리학",
    type: '자문',
    locationType: "offline",
    location: "대전 대덕연구단지",
    region: "대전광역시",
    agency: "KAIST",
    client: "KAIST 학생지원팀",
    topic: "학생 상담과 심리 지원",
    audience: "교직원",
    contactName: "박교수",
    contactPhone: "042-5678-9012",
    contactEmail: "park@kaist.ac.kr",
    fee: 1400000,
    status: "pending",
    createdAt: "2024-12-01 14:20"
  },
  // 울산광역시
  {
    id: 16,
    reservationDate: "2024-12-23",
    reservationTime: "14:00",
    expert: "송길영",
    expertField: "데이터분석",
    type: '강연',
    locationType: "offline",
    location: "울산 현대중공업",
    region: "울산광역시",
    agency: "현대중공업",
    client: "현대중공업 기획팀",
    topic: "빅데이터와 산업 혁신",
    audience: "임직원",
    contactName: "강차장",
    contactPhone: "052-6789-0123",
    contactEmail: "kang@hhi.co.kr",
    fee: 1900000,
    status: "confirmed",
    createdAt: "2024-12-05 10:30",
    confirmedAt: "2024-12-06 15:40"
  },
  // 세종특별자치시
  {
    id: 17,
    reservationDate: "2024-11-28",
    reservationTime: "10:00",
    expert: "김난도",
    expertField: "소비트렌드",
    type: '강연',
    locationType: "offline",
    location: "세종시청 대강당",
    region: "세종특별자치시",
    agency: "세종시청",
    client: "세종시청 정책기획단",
    topic: "2025 트렌드와 정책 방향",
    audience: "공무원",
    contactName: "윤과장",
    contactPhone: "044-1234-5678",
    contactEmail: "yun@sejong.go.kr",
    fee: 1600000,
    status: "completed",
    createdAt: "2024-10-28 11:00",
    confirmedAt: "2024-10-29 13:20",
    completedAt: "2024-11-28 12:00"
  },
  // 경기도
  {
    id: 18,
    reservationDate: "2024-12-10",
    reservationTime: "15:00",
    expert: "장영준",
    expertField: "경제",
    type: '강연',
    locationType: "offline",
    location: "수원 경기도청",
    region: "경기도",
    agency: "경기도청",
    client: "경기도청 경제정책과",
    topic: "지역경제 활성화 전략",
    audience: "공무원",
    contactName: "정부장",
    contactPhone: "031-2345-6789",
    contactEmail: "jung@gg.go.kr",
    fee: 1700000,
    status: "confirmed",
    createdAt: "2024-11-25 14:30",
    confirmedAt: "2024-11-26 16:50"
  },
  // 강원특별자치도
  {
    id: 19,
    reservationDate: "2024-12-14",
    reservationTime: "13:00",
    expert: "최재천",
    expertField: "생물학",
    type: '강연',
    locationType: "offline",
    location: "춘천 강원도청",
    region: "강원특별자치도",
    agency: "강원도청",
    client: "강원도청 환경과",
    topic: "생태환경 보전과 지속가능성",
    audience: "공무원",
    contactName: "한과장",
    contactPhone: "033-3456-7890",
    contactEmail: "han@gwd.go.kr",
    fee: 1500000,
    status: "confirmed",
    createdAt: "2024-11-28 09:40",
    confirmedAt: "2024-11-29 11:20"
  },
  // 충청북도
  {
    id: 20,
    reservationDate: "2024-12-17",
    reservationTime: "14:00",
    expert: "김상욱",
    expertField: "물리학",
    type: '강연',
    locationType: "offline",
    location: "청주 충북도청",
    region: "충청북도",
    agency: "충청북도청",
    client: "충청북도청 교육체육국",
    topic: "과학으로 보는 세상",
    audience: "교사",
    contactName: "신선생",
    contactPhone: "043-4567-8901",
    contactEmail: "shin@cb21.go.kr",
    fee: 1200000,
    status: "pending",
    createdAt: "2024-12-03 15:10"
  },
  // 충청남도
  {
    id: 21,
    reservationDate: "2024-12-21",
    reservationTime: "10:00",
    expert: "문재인",
    expertField: "정치",
    type: '강연',
    locationType: "offline",
    location: "홍성 충남도청",
    region: "충청남도",
    agency: "충청남도청",
    client: "충청남도청 기획조정실",
    topic: "지방자치와 민주주의",
    audience: "공무원",
    contactName: "오국장",
    contactPhone: "041-5678-9012",
    contactEmail: "oh@chungnam.go.kr",
    fee: 2500000,
    status: "confirmed",
    createdAt: "2024-12-07 10:20",
    confirmedAt: "2024-12-08 14:30"
  },
  // 전북특별자치도
  {
    id: 22,
    reservationDate: "2024-12-11",
    reservationTime: "15:00",
    expert: "유현준",
    expertField: "건축",
    type: '강연',
    locationType: "offline",
    location: "전주 전북도청",
    region: "전북특별자치도",
    agency: "전북도청",
    client: "전북도청 도시계획과",
    topic: "도시재생과 공간 디자인",
    audience: "공무원",
    contactName: "류과장",
    contactPhone: "063-6789-0123",
    contactEmail: "ryu@jeonbuk.go.kr",
    fee: 1800000,
    status: "completed",
    createdAt: "2024-11-05 13:30",
    confirmedAt: "2024-11-06 15:20",
    completedAt: "2024-12-11 17:00"
  },
  // 전라남도
  {
    id: 23,
    reservationDate: "2024-12-25",
    reservationTime: "11:00",
    expert: "홍경한",
    expertField: "미래학",
    type: '자문',
    locationType: "offline",
    location: "무안 전남도청",
    region: "전라남도",
    agency: "전남도청",
    client: "전남도청 미래전략과",
    topic: "지역 미래 전략 수립",
    audience: "정책팀",
    contactName: "고팀장",
    contactPhone: "061-7890-1234",
    contactEmail: "go@jeonnam.go.kr",
    fee: 1600000,
    status: "confirmed",
    createdAt: "2024-12-10 11:50",
    confirmedAt: "2024-12-11 13:40"
  },
  // 경상북도
  {
    id: 24,
    reservationDate: "2024-12-13",
    reservationTime: "14:00",
    expert: "설민석",
    expertField: "역사",
    type: '강연',
    locationType: "offline",
    location: "안동 경북도청",
    region: "경상북도",
    agency: "경북도청",
    client: "경북도청 문화관광과",
    topic: "한국사와 문화유산",
    audience: "시민",
    contactName: "백과장",
    contactPhone: "054-8901-2345",
    contactEmail: "baek@gb.go.kr",
    fee: 1400000,
    status: "completed",
    createdAt: "2024-11-18 10:20",
    confirmedAt: "2024-11-19 12:30",
    completedAt: "2024-12-13 16:00"
  },
  // 경상남도
  {
    id: 25,
    reservationDate: "2024-12-27",
    reservationTime: "13:00",
    expert: "이어령",
    expertField: "문학",
    type: '강연',
    locationType: "offline",
    location: "창원 경남도청",
    region: "경상남도",
    agency: "경남도청",
    client: "경남도청 문화예술과",
    topic: "문화창조와 지역발전",
    audience: "문화예술인",
    contactName: "조국장",
    contactPhone: "055-9012-3456",
    contactEmail: "jo@gyeongnam.go.kr",
    fee: 2000000,
    status: "pending",
    createdAt: "2024-12-12 14:40"
  },
  // 제주특별자치도
  {
    id: 26,
    reservationDate: "2024-12-09",
    reservationTime: "10:00",
    expert: "안철수",
    expertField: "IT",
    type: '강연',
    locationType: "offline",
    location: "제주 ICC",
    region: "제주특별자치도",
    agency: "제주도청",
    client: "제주도청 디지털정책과",
    topic: "디지털 혁신과 스마트시티",
    audience: "공무원",
    contactName: "현과장",
    contactPhone: "064-0123-4567",
    contactEmail: "hyun@jeju.go.kr",
    fee: 2200000,
    status: "completed",
    createdAt: "2024-11-12 09:30",
    confirmedAt: "2024-11-13 11:40",
    completedAt: "2024-12-09 12:00"
  }
];

// ============================================
// 정산 데이터 (Settlements)
// ============================================

export const settlements: Settlement[] = [
  {
    id: 1,
    reservationId: 1,
    revenue: 2500000,
    cost: 500000,
    profit: 2000000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 500000,
    settlementAmount: 2000000,
    settlementStatus: "completed",
    settlementDate: "2024-12-16",
    paymentScheduledDate: "2024-12-25",
    memo: "정산 완료"
  },
  {
    id: 2,
    reservationId: 5,
    revenue: 2000000,
    cost: 400000,
    profit: 1600000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 400000,
    settlementAmount: 1600000,
    settlementStatus: "completed",
    settlementDate: "2024-12-01",
    paymentScheduledDate: "2024-12-10",
    memo: "정산 완료"
  },
  {
    id: 3,
    reservationId: 6,
    revenue: 2700000,
    cost: 540000,
    profit: 2160000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 540000,
    settlementAmount: 2160000,
    settlementStatus: "completed",
    settlementDate: "2024-11-29",
    paymentScheduledDate: "2024-12-08",
    memo: "정산 완료"
  },
  {
    id: 4,
    reservationId: 7,
    revenue: 2400000,
    cost: 480000,
    profit: 1920000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 480000,
    settlementAmount: 1920000,
    settlementStatus: "pending",
    paymentScheduledDate: "2024-12-20",
    memo: "정산 대기중"
  },
  {
    id: 5,
    reservationId: 8,
    revenue: 3200000,
    cost: 640000,
    profit: 2560000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 640000,
    settlementAmount: 2560000,
    settlementStatus: "completed",
    settlementDate: "2024-11-21",
    paymentScheduledDate: "2024-11-30",
    memo: "정산 완료"
  },
  {
    id: 6,
    reservationId: 10,
    revenue: 2100000,
    cost: 420000,
    profit: 1680000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 420000,
    settlementAmount: 1680000,
    settlementStatus: "completed",
    settlementDate: "2024-11-16",
    paymentScheduledDate: "2024-11-25",
    memo: "정산 완료"
  },
  {
    id: 7,
    reservationId: 12,
    revenue: 2600000,
    cost: 520000,
    profit: 2080000,
    profitRate: 80,
    commissionRate: 20,
    commissionAmount: 520000,
    settlementAmount: 2080000,
    settlementStatus: "completed",
    settlementDate: "2024-11-11",
    paymentScheduledDate: "2024-11-20",
    memo: "정산 완료"
  }
];

// ============================================
// 월별 통계 데이터 (Monthly Stats)
// ============================================

export const monthlyStats: MonthlyStats[] = [
  {
    month: "1월",
    bookings: 85,
    revenue: 21250,
    profit: 17000,
    cost: 4250,
    settlement: 17000,
    completed: 75,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 20, revenue: 5000 },
      { expert: "유영만", bookings: 18, revenue: 5400 },
      { expert: "정재한", bookings: 17, revenue: 4760 },
      { expert: "김태훈", bookings: 15, revenue: 3300 },
      { expert: "김미경", bookings: 10, revenue: 2000 },
      { expert: "최재붕", bookings: 5, revenue: 1350 }
    ]
  },
  {
    month: "2월",
    bookings: 78,
    revenue: 19500,
    profit: 15600,
    cost: 3900,
    settlement: 15600,
    completed: 70,
    confirmed: 6,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 18, revenue: 4500 },
      { expert: "유영만", bookings: 16, revenue: 4800 },
      { expert: "정재한", bookings: 15, revenue: 4200 },
      { expert: "김태훈", bookings: 14, revenue: 3080 },
      { expert: "김미경", bookings: 10, revenue: 2000 },
      { expert: "최재붕", bookings: 5, revenue: 1350 }
    ]
  },
  {
    month: "3월",
    bookings: 92,
    revenue: 23000,
    profit: 18400,
    cost: 4600,
    settlement: 18400,
    completed: 82,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 22, revenue: 5500 },
      { expert: "유영만", bookings: 20, revenue: 6000 },
      { expert: "정재한", bookings: 18, revenue: 5040 },
      { expert: "김태훈", bookings: 16, revenue: 3520 },
      { expert: "김미경", bookings: 11, revenue: 2200 },
      { expert: "최재붕", bookings: 5, revenue: 1350 }
    ]
  },
  {
    month: "4월",
    bookings: 88,
    revenue: 22000,
    profit: 17600,
    cost: 4400,
    settlement: 17600,
    completed: 78,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 21, revenue: 5250 },
      { expert: "유영만", bookings: 19, revenue: 5700 },
      { expert: "정재한", bookings: 17, revenue: 4760 },
      { expert: "김태훈", bookings: 15, revenue: 3300 },
      { expert: "김미경", bookings: 11, revenue: 2200 },
      { expert: "최재붕", bookings: 5, revenue: 1350 }
    ]
  },
  {
    month: "5월",
    bookings: 95,
    revenue: 23750,
    profit: 19000,
    cost: 4750,
    settlement: 19000,
    completed: 85,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 23, revenue: 5750 },
      { expert: "유영만", bookings: 21, revenue: 6300 },
      { expert: "정재한", bookings: 19, revenue: 5320 },
      { expert: "김태훈", bookings: 16, revenue: 3520 },
      { expert: "김미경", bookings: 11, revenue: 2200 },
      { expert: "최재붕", bookings: 5, revenue: 1350 }
    ]
  },
  {
    month: "6월",
    bookings: 102,
    revenue: 25500,
    profit: 20400,
    cost: 5100,
    settlement: 20400,
    completed: 92,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 25, revenue: 6250 },
      { expert: "유영만", bookings: 22, revenue: 6600 },
      { expert: "정재한", bookings: 20, revenue: 5600 },
      { expert: "김태훈", bookings: 17, revenue: 3740 },
      { expert: "김미경", bookings: 12, revenue: 2400 },
      { expert: "최재붕", bookings: 6, revenue: 1620 }
    ]
  },
  {
    month: "7월",
    bookings: 76,
    revenue: 19000,
    profit: 15200,
    cost: 3800,
    settlement: 15200,
    completed: 68,
    confirmed: 6,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 18, revenue: 4500 },
      { expert: "유영만", bookings: 16, revenue: 4800 },
      { expert: "정재한", bookings: 15, revenue: 4200 },
      { expert: "김태훈", bookings: 13, revenue: 2860 },
      { expert: "김미경", bookings: 9, revenue: 1800 },
      { expert: "최재붕", bookings: 5, revenue: 1350 }
    ]
  },
  {
    month: "8월",
    bookings: 70,
    revenue: 17500,
    profit: 14000,
    cost: 3500,
    settlement: 14000,
    completed: 62,
    confirmed: 6,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 17, revenue: 4250 },
      { expert: "유영만", bookings: 15, revenue: 4500 },
      { expert: "정재한", bookings: 14, revenue: 3920 },
      { expert: "김태훈", bookings: 12, revenue: 2640 },
      { expert: "김미경", bookings: 8, revenue: 1600 },
      { expert: "최재붕", bookings: 4, revenue: 1080 }
    ]
  },
  {
    month: "9월",
    bookings: 98,
    revenue: 24500,
    profit: 19600,
    cost: 4900,
    settlement: 19600,
    completed: 88,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 24, revenue: 6000 },
      { expert: "유영만", bookings: 21, revenue: 6300 },
      { expert: "정재한", bookings: 19, revenue: 5320 },
      { expert: "김태훈", bookings: 16, revenue: 3520 },
      { expert: "김미경", bookings: 12, revenue: 2400 },
      { expert: "최재붕", bookings: 6, revenue: 1620 }
    ]
  },
  {
    month: "10월",
    bookings: 105,
    revenue: 26250,
    profit: 21000,
    cost: 5250,
    settlement: 21000,
    completed: 95,
    confirmed: 8,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 26, revenue: 6500 },
      { expert: "유영만", bookings: 23, revenue: 6900 },
      { expert: "정재한", bookings: 21, revenue: 5880 },
      { expert: "김태훈", bookings: 17, revenue: 3740 },
      { expert: "김미경", bookings: 12, revenue: 2400 },
      { expert: "최재붕", bookings: 6, revenue: 1620 }
    ]
  },
  {
    month: "11월",
    bookings: 112,
    revenue: 28000,
    profit: 22400,
    cost: 5600,
    settlement: 22400,
    completed: 100,
    confirmed: 10,
    pending: 2,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 28, revenue: 7000 },
      { expert: "유영만", bookings: 24, revenue: 7200 },
      { expert: "정재한", bookings: 22, revenue: 6160 },
      { expert: "김태훈", bookings: 18, revenue: 3960 },
      { expert: "김미경", bookings: 13, revenue: 2600 },
      { expert: "최재붕", bookings: 7, revenue: 1890 }
    ]
  },
  {
    month: "12월",
    bookings: 118,
    revenue: 29500,
    profit: 23600,
    cost: 5900,
    settlement: 23600,
    completed: 105,
    confirmed: 10,
    pending: 3,
    cancelled: 0,
    expertDetails: [
      { expert: "김경일", bookings: 29, revenue: 7250 },
      { expert: "유영만", bookings: 25, revenue: 7500 },
      { expert: "정재한", bookings: 23, revenue: 6440 },
      { expert: "김태훈", bookings: 19, revenue: 4180 },
      { expert: "김미경", bookings: 14, revenue: 2800 },
      { expert: "최재붕", bookings: 8, revenue: 2160 }
    ]
  }
];

// ============================================
// 기타문의 데이터 (Inquiries)
// ============================================

export const inquiries: Inquiry[] = [
  {
    id: 1,
    title: "홈페이지 회원가입 문의",
    message: "홈페이지 회원가입 기능이 있나요? 회원가입을 하고 싶은데 메뉴를 찾을 수 없습니다.",
    contactName: "김철수",
    contactPhone: "010-1234-5678",
    contactEmail: "kim@example.com",
    status: "replied",
    createdAt: "2024-12-20 09:30",
    repliedAt: "2024-12-20 14:20",
    reply: "안녕하세요. 현재 홈페이지는 회원가입 없이 강연문의하기 기능을 사용하실 수 있습니다. 추가 문의사항이 있으시면 언제든 연락주세요.",
    repliedBy: "관리자"
  },
  {
    id: 2,
    title: "전문가 섭외 절차 문의",
    message: "강연 전문가를 섭외하려면 어떤 절차로 진행되나요? 예산과 일정을 먼저 알려드려야 하나요?",
    contactName: "이영희",
    contactPhone: "010-9876-5432",
    contactEmail: "lee@example.com",
    status: "replied",
    createdAt: "2024-12-21 10:15",
    repliedAt: "2024-12-21 15:30",
    reply: "안녕하세요. 강연문의하기 페이지에서 희망하시는 전문가, 일정, 예산 등을 입력해주시면 담당자가 확인 후 연락드립니다. 감사합니다.",
    repliedBy: "관리자"
  },
  {
    id: 3,
    title: "강연 취소 정책 문의",
    message: "강연 예약 후 부득이하게 취소해야 할 경우 취소 정책이 어떻게 되나요? 위약금이 발생하나요?",
    contactName: "박민수",
    contactPhone: "010-5555-6666",
    contactEmail: "park@example.com",
    status: "resolved",
    createdAt: "2024-12-18 14:20",
    repliedAt: "2024-12-18 16:45",
    reply: "안녕하세요. 취소 정책은 강연 일정 기준으로 7일 전까지는 무료 취소 가능하며, 7일 이내 취소 시에는 약정에 따라 위약금이 발생할 수 있습니다. 자세한 내용은 계약서를 참고해주세요.",
    repliedBy: "관리자"
  },
  {
    id: 4,
    title: "제휴 문의",
    message: "강연 플랫폼 운영 중인 회사입니다. 제휴 가능 여부와 절차에 대해 문의드립니다.",
    contactName: "최지훈",
    contactPhone: "010-7777-8888",
    contactEmail: "choi@example.com",
    status: "pending",
    createdAt: "2024-12-23 11:00"
  },
  {
    id: 5,
    title: "온라인 강연 진행 방법 문의",
    message: "온라인으로 강연을 진행하고 싶은데 어떤 플랫폼을 사용하나요? Zoom을 사용하나요?",
    contactName: "정수민",
    contactPhone: "010-2222-3333",
    contactEmail: "jung@example.com",
    status: "pending",
    createdAt: "2024-12-23 16:30"
  },
  {
    id: 6,
    title: "전문가 프로필 업데이 요청",
    message: "등록된 전문가 프로필 정보 중 일부가 오래된 것 같습니다. 업데이트 부탁드립니다.",
    contactName: "강태영",
    contactPhone: "010-4444-5555",
    contactEmail: "kang@example.com",
    status: "replied",
    createdAt: "2024-12-19 13:45",
    repliedAt: "2024-12-19 17:20",
    reply: "안녕하세요. 전문가 프로필은 정기적으로 업데이트하고 있습니다. 구체적으로 어떤 정보가 오래되었는지 알려주시면 빠르게 확인하겠습니다.",
    repliedBy: "관리자"
  },
  {
    id: 7,
    title: "대량 강연 할인 문의",
    message: "연간 10회 이상 강연을 진행할 예정입니다. 대량 계약 시 할인 혜택이 있나요?",
    contactName: "윤서현",
    contactPhone: "010-6666-7777",
    contactEmail: "yoon@example.com",
    status: "pending",
    createdAt: "2024-12-24 10:00"
  },
  {
    id: 8,
    title: "강연 자료 요청",
    message: "강연 후 발표 자료를 받을 수 있나요? 참석자들에게 공유하고 싶습니다.",
    contactName: "임하늘",
    contactPhone: "010-8888-9999",
    contactEmail: "lim@example.com",
    status: "replied",
    createdAt: "2024-12-17 15:20",
    repliedAt: "2024-12-17 18:00",
    reply: "안녕하세요. 강연 자료 제공 여부는 전문가와 협의 후 결정됩니다. 강연문의 시 자료 제공 요청 사항을 기재해주시면 확인 후 안내드리겠습니다.",
    repliedBy: "관리자"
  }
];

// ============================================
// Helper Functions
// ============================================

/**
 * 상태별 예약 개수 가져오기
 */
export const getReservationCountByStatus = (status: Reservation['status']): number => {
  return reservations.filter(r => r.status === status).length;
};

/**
 * 완료된 예약만 가져오기
 */
export const getCompletedReservations = (): Reservation[] => {
  return reservations.filter(r => r.status === 'completed');
};

/**
 * 예약 ID로 정산 정보 가져오기
 */
export const getSettlementByReservationId = (reservationId: number): Settlement | undefined => {
  return settlements.find(s => s.reservationId === reservationId);
};

/**
 * 총 정산 금액
 */
export const getTotalSettlementAmount = (): number => {
  return settlements
    .filter(s => s.settlementStatus === 'completed')
    .reduce((sum, s) => sum + s.settlementAmount, 0);
};

/**
 * 상태별 문의 개수 가져오기
 */
export const getInquiryCountByStatus = (status: Inquiry['status']): number => {
  return inquiries.filter(i => i.status === status).length;
};

// ============================================
// Dashboard 통계 계산 함수
// ============================================

/**
 * 총 예약 건수
 */
export const getTotalBookings = (): number => {
  return reservations.length;
};

/**
 * 상태별 예약 통계
 */
export const getBookingsByStatus = () => {
  return {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
  };
};

/**
 * 상태별 파이차트 데이터
 */
export const getBookingStatusData = () => {
  const stats = getBookingsByStatus();
  return [
    { name: '완료', value: stats.completed, color: '#10b981' },
    { name: '확정', value: stats.confirmed, color: '#3b82f6' },
    { name: '대기중', value: stats.pending, color: '#f59e0b' },
    { name: '취소', value: stats.cancelled, color: '#ef4444' }
  ];
};

/**
 * 전문가별 성과 통계
 */
export const getExpertPerformance = () => {
  const expertMap = new Map<string, { bookings: number; revenue: number; field: string }>();
  
  reservations.forEach(r => {
    const current = expertMap.get(r.expert) || { bookings: 0, revenue: 0, field: r.expertField };
    expertMap.set(r.expert, {
      bookings: current.bookings + 1,
      revenue: current.revenue + (r.fee / 1000000), // 백만원 단위
      field: r.expertField
    });
  });

  return Array.from(expertMap.entries())
    .map(([name, data]) => ({
      name,
      bookings: data.bookings,
      revenue: data.revenue,
      field: data.field
    }))
    .sort((a, b) => b.bookings - a.bookings);
};

/**
 * 월별 통계 (reservations 기반 계산)
 */
export const getMonthlyStatsFromReservations = (): MonthlyStats[] => {
  const monthMap = new Map<string, {
    bookings: number;
    revenue: number;
    cost: number;
    profit: number;
    settlement: number;
    completed: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    expertDetails: Map<string, { bookings: number; revenue: number }>;
  }>();

  // 1월부터 12월까지 초기화
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  months.forEach(month => {
    monthMap.set(month, {
      bookings: 0,
      revenue: 0,
      cost: 0,
      profit: 0,
      settlement: 0,
      completed: 0,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      expertDetails: new Map()
    });
  });

  // 예약 데이터를 월별로 집계
  reservations.forEach(r => {
    const date = new Date(r.reservationDate);
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const monthData = monthMap.get(monthName)!;

    // 기본 통계
    monthData.bookings++;
    const revenueInM = r.fee / 1000000; // 백만원 단위
    monthData.revenue += revenueInM;
    
    // 수수료율 20% 가정
    const cost = revenueInM * 0.2;
    const profit = revenueInM * 0.8;
    monthData.cost += cost;
    monthData.profit += profit;
    
    // 완료된 건은 정산 가능
    if (r.status === 'completed') {
      monthData.settlement += profit;
    }

    // 상태별 카운트
    if (r.status === 'completed') monthData.completed++;
    if (r.status === 'confirmed') monthData.confirmed++;
    if (r.status === 'pending') monthData.pending++;
    if (r.status === 'cancelled') monthData.cancelled++;

    // 전문가별 상세
    const expertData = monthData.expertDetails.get(r.expert) || { bookings: 0, revenue: 0 };
    monthData.expertDetails.set(r.expert, {
      bookings: expertData.bookings + 1,
      revenue: expertData.revenue + revenueInM
    });
  });

  // Map을 배열로 변환
  return months.map(month => {
    const data = monthMap.get(month)!;
    return {
      month,
      bookings: data.bookings,
      revenue: Math.round(data.revenue * 10) / 10,
      cost: Math.round(data.cost * 10) / 10,
      profit: Math.round(data.profit * 10) / 10,
      settlement: Math.round(data.settlement * 10) / 10,
      completed: data.completed,
      confirmed: data.confirmed,
      pending: data.pending,
      cancelled: data.cancelled,
      expertDetails: Array.from(data.expertDetails.entries()).map(([expert, details]) => ({
        expert,
        bookings: details.bookings,
        revenue: Math.round(details.revenue * 10) / 10
      }))
    };
  });
};

/**
 * 최근 예약 목록 (날짜순 정렬)
 */
export const getRecentBookings = (limit: number = 8) => {
  return [...reservations]
    .sort((a, b) => new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime())
    .slice(0, limit);
};

/**
 * 월별 신청건수 & 확정률 통계
 */
export const getMonthlyApplicationStats = (
  year?: string,
  startMonth?: number,
  endMonth?: number,
  status?: string
) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthMap = new Map<string, { applied: number; confirmed: number }>();

  // 1월부터 12월까지 초기화
  months.forEach(month => {
    monthMap.set(month, { applied: 0, confirmed: 0 });
  });

  // 예약 데이터를 월별로 집계
  reservations.forEach(r => {
    const date = new Date(r.reservationDate);
    const reservationYear = date.getFullYear().toString();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    
    // 연도 필터링
    if (year && reservationYear !== year) {
      return;
    }
    
    // 상태 필터링
    if (status && status !== 'all' && r.status !== status) {
      return;
    }

    const monthData = monthMap.get(monthName)!;

    // 전체 신청 건수 (cancelled 제외)
    if (r.status !== 'cancelled') {
      monthData.applied++;
    }

    // 확정 건수 (confirmed + completed)
    if (r.status === 'confirmed' || r.status === 'completed') {
      monthData.confirmed++;
    }
  });

  // 배열로 변환하고 확정률 계산
  let result = months.map((month, index) => {
    const data = monthMap.get(month)!;
    const confirmRate = data.applied > 0 ? Math.round((data.confirmed / data.applied) * 100) : 0;

    return {
      month,
      monthIndex: index + 1,
      applied: data.applied,
      confirmed: data.confirmed,
      confirmRate
    };
  });

  // 월 범위 필터링
  if (startMonth !== undefined && endMonth !== undefined) {
    result = result.filter(item => {
      if (startMonth <= endMonth) {
        return item.monthIndex >= startMonth && item.monthIndex <= endMonth;
      } else {
        // 연도를 넘어가는 경우 (예: 11월 ~ 2월)
        return item.monthIndex >= startMonth || item.monthIndex <= endMonth;
      }
    });
  }

  return result;
};

/**
 * 상위 전문가 목록
 */
export const getTopExperts = (limit: number = 5) => {
  const expertStats = getExpertPerformance();
  
  return expertStats.slice(0, limit).map((expert, index) => ({
    rank: index + 1,
    name: expert.name,
    field: expert.field,
    bookings: expert.bookings,
    rating: 4.8 // Mock rating
  }));
};

/**
 * 지역별 분포 통계
 */
export const getRegionalDistribution = () => {
  const regionMap = new Map<string, number>();
  
  reservations.forEach(r => {
    const count = regionMap.get(r.region) || 0;
    regionMap.set(r.region, count + 1);
  });

  const total = reservations.length;
  
  // 지역별 고유 색상 매핑
  const colorMap: Record<string, string> = {
    '서울특별시': '#0ea5e9',      // 밝은 파란색
    '경기도': '#1e3a8a',          // 진한 파란색
    '부산광역시': '#14b8a6',      // 청록색
    '강원특별자치도': '#f97316',  // 오렌지
    '경상남도': '#22c55e',        // 녹색
    '충청남도': '#a855f7',        // 자주색
    '충청북도': '#ec4899',        // 분홍
    '경상북도': '#6b7280',        // 회색
    '대구광역시': '#166534',      // 진한 녹색
    '인천광역시': '#7c3aed',      // 보라색
    '대전광역시': '#f472b6',      // 연한 분홍
    '전북특별자치도': '#eab308',  // 노란색
    '전라남도': '#9ca3af',        // 연한 회색
    '제주특별자치도': '#06b6d4',  // 청록
    '울산광역시': '#bfdbfe',      // 연한 파란색
    '광주광역시': '#fbbf24',      // 연한 노란색
    '세종특별자치시': '#fb923c',  // 연한 오렌지
  };
  
  return Array.from(regionMap.entries())
    .map(([region, value]) => ({
      region,
      value,
      percentage: total > 0 ? Math.round((value / total) * 1000) / 10 : 0,
      color: colorMap[region] || '#94a3b8' // 기본 회색
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * 총 매출액 계산
 */
export const getTotalRevenue = (): number => {
  return reservations.reduce((sum, r) => sum + r.fee, 0);
};

/**
 * 평균 예약 금액
 */
export const getAverageBookingAmount = (): number => {
  if (reservations.length === 0) return 0;
  return getTotalRevenue() / reservations.length;
};

/**
 * 타입별 파이차트 데이터
 */
export const getBookingTypeData = () => {
  const typeMap = new Map<string, number>();
  
  reservations.forEach(r => {
    const count = typeMap.get(r.type) || 0;
    typeMap.set(r.type, count + 1);
  });
  
  // 색상 매핑
  const colorMap: Record<string, string> = {
    '강연': '#3b82f6',    // 파란색
    '방송': '#8b5cf6',    // 보라색
    '촬영': '#ec4899',    // 핑크색
    '자문': '#10b981',    // 초록색
    '출연': '#f59e0b',    // 노란색
    '인터뷰': '#ef4444',  // 빨간색
    '상담': '#06b6d4',    // 하늘색
    '추천사': '#84cc16'   // 라임색
  };
  
  return Array.from(typeMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      color: colorMap[name] || '#6b7280'
    }))
    .sort((a, b) => b.value - a.value);
};