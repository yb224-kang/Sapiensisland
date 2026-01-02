import { Building, Briefcase, Users, BookOpen, Award, Handshake, Sparkles, FileText } from 'lucide-react';

export interface HistoryItem {
  category: string;
  items: string[];
  icon: any;
}

export interface QuarterData {
  id: number;
  period: string;
  year: string;
  quarter: string;
  content: HistoryItem[];
  createdAt: string;
}

export const historyData: QuarterData[] = [
  {
    id: 1,
    period: "2022. 8월",
    year: "2022",
    quarter: "8월",
    createdAt: "2022-08-01",
    content: [
      {
        category: "회사 설립",
        items: ["사피엔스 설립"],
        icon: Building
      }
    ]
  },
  {
    id: 2,
    period: "2022. 4분기",
    year: "2022",
    quarter: "4분기",
    createdAt: "2022-10-01",
    content: [
      {
        category: "B2B 자문계약 체결",
        items: [
          "LG이노텍 승급 집합교육 1차",
          "카카오모빌리티 프로그램 자문"
        ],
        icon: Briefcase
      },
      {
        category: "지혜전문가 계약 체결",
        items: [
          "신강현 교수, 김태훈 교수, 이윤형 교수",
          "리사손 교수, 박래선 세무사"
        ],
        icon: Users
      }
    ]
  },
  {
    id: 3,
    period: "2023. 1분기",
    year: "2023",
    quarter: "1분기",
    createdAt: "2023-01-01",
    content: [
      {
        category: "B2B 자문",
        items: ["CJ ENM 어쩌다어른 17회, 18회"],
        icon: Briefcase
      },
      {
        category: "B2B 자문 계약",
        items: ["LG그룹 (생산직 멀티 TASK 주제화)"],
        icon: Briefcase
      },
      {
        category: "파트너 협업 계약",
        items: ["비이커스튜디오, 웰키아이앤씨"],
        icon: Handshake
      }
    ]
  },
  {
    id: 4,
    period: "2023. 2분기",
    year: "2023",
    quarter: "2분기",
    createdAt: "2023-04-01",
    content: [
      {
        category: "B2B 자문계약 체결",
        items: ["에디슨, (주)신풍, 경륜서울관광고"],
        icon: Briefcase
      },
      {
        category: "지식전문가 계약 체결",
        items: ["한민박사, 조수현 교수"],
        icon: Users
      },
      {
        category: "출판 파트너 계약",
        items: ["저녁독, 투비씨"],
        icon: BookOpen
      },
      {
        category: "자회사 설립",
        items: ["한국학습코리아연구소 설립"],
        icon: Building
      }
    ]
  },
  {
    id: 5,
    period: "2023. 3분기 ~ 4분기",
    year: "2023",
    quarter: "3~4분기",
    createdAt: "2023-07-01",
    content: [
      {
        category: "B2B 자문 계약",
        items: ["(주)교원구몬"],
        icon: Briefcase
      },
      {
        category: "방송 출연 계약",
        items: [
          "CJ ENM 어쩌다어른 MC",
          "3PRO TV 지혜의밤 MC"
        ],
        icon: Award
      },
      {
        category: "지혜전문가 계약 체결",
        items: ["유영곤 교수, 류한욱 원장"],
        icon: Users
      }
    ]
  },
  {
    id: 6,
    period: "2024. 1분기",
    year: "2024",
    quarter: "1분기",
    createdAt: "2024-01-01",
    content: [
      {
        category: "앱 서비스 BETA 출시",
        items: ["HATI, INSIQ"],
        icon: Sparkles
      }
    ]
  },
  {
    id: 7,
    period: "2024. 2분기",
    year: "2024",
    quarter: "2분기",
    createdAt: "2024-04-01",
    content: [
      {
        category: "B2B 자문 계약",
        items: ["LG이노텍 승급자 집합 교육 2차"],
        icon: Briefcase
      },
      {
        category: "파트너 계약",
        items: ["강연 AGENCY 협약 (공연전설, 비전행복교육원, 청년PNF)"],
        icon: Handshake
      },
      {
        category: "지적재산권(LI) 인증로고",
        items: ["지혜전문가 출판"],
        icon: Award
      },
      {
        category: "출판",
        items: ["김태훈, 이윤형 공동저자 \"깊은 생각의 비밀\""],
        icon: BookOpen
      }
    ]
  },
  {
    id: 8,
    period: "2024. 3분기",
    year: "2024",
    quarter: "3분기",
    createdAt: "2024-07-01",
    content: [
      {
        category: "업무협약식 (독점)",
        items: ["컬럼러 이기범 교수 (HEXACO 창시자)"],
        icon: Handshake
      }
    ]
  },
  {
    id: 9,
    period: "2024. 4분기",
    year: "2024",
    quarter: "4분기",
    createdAt: "2024-10-01",
    content: [
      {
        category: "파트너 계약",
        items: [
          "뉴로세이저 뇌 해석 서비스 파트너",
          "마음오름 (명상파트너)"
        ],
        icon: Handshake
      },
      {
        category: "지식전문가 출판",
        items: ["김태훈 교수 \"창의적으로 일하는 법\" (가제)"],
        icon: BookOpen
      },
      {
        category: "지혜전문가 계약 체결",
        items: [
          "이종운 교수, 이영선(KBS기자), 김소연 대표",
          "박지은 대표, 심동섭 교수, 류한욱 외래교수",
          "이건수 성우, 이종현 교수"
        ],
        icon: Users
      },
      {
        category: "특허 출원",
        items: ["성격유형화, 언어분석 시스템"],
        icon: FileText
      }
    ]
  },
  {
    id: 10,
    period: "2025. 1분기",
    year: "2025",
    quarter: "1분기",
    createdAt: "2025-01-01",
    content: [
      {
        category: "파트너 계약",
        items: ["주식회사 스튜디오시스타"],
        icon: Handshake
      },
      {
        category: "B2B 자문 계약",
        items: ["LG이노텍 MVP 과정 개발 자문"],
        icon: Briefcase
      },
      {
        category: "지혜전문가 계약 체결",
        items: ["장성현 대표, 정재현 대표, 김정아 이사, 윤승주 교수"],
        icon: Users
      },
      {
        category: "지혜전문가 출판",
        items: ["김태훈 \"퍼링싱킹\""],
        icon: BookOpen
      }
    ]
  },
  {
    id: 11,
    period: "2025. 2분기",
    year: "2025",
    quarter: "2분기",
    createdAt: "2025-04-01",
    content: [
      {
        category: "B2B 자문 계약",
        items: ["LG이노텍 EnDP 사전 학습 개발"],
        icon: Briefcase
      },
      {
        category: "지혜전문가 계약 체결",
        items: ["한준호 변호사, 구정연 교수"],
        icon: Users
      },
      {
        category: "지혜전문가 출판",
        items: ["김경일, 류한욱 공동저자 \"적절한 좌절\""],
        icon: BookOpen
      }
    ]
  }
];

// 카테고리별 아이콘 매핑
export const categoryIconMap: Record<string, any> = {
  "회사 설립": Building,
  "B2B 자문 계약": Briefcase,
  "B2B 자문계약 체결": Briefcase,
  "B2B 자문": Briefcase,
  "파트너 계약": Handshake,
  "파트너 협업 계약": Handshake,
  "지혜전문가 계약 체결": Users,
  "지식전문가 계약 체결": Users,
  "지혜전문가 출판": BookOpen,
  "출판": BookOpen,
  "출판 파트너 계약": BookOpen,
  "업무협약식 (독점)": Handshake,
  "업무협약식": Handshake,
  "특허 출원": FileText,
  "앱 서비스 BETA 출시": Sparkles,
  "앱 서비스 출시": Sparkles,
  "방송 출연 계약": Award,
  "지적재산권(LI) 인증로고": Award,
  "자회사 설립": Building,
};

// 카테고리별 이모지 매핑 (Admin용)
export const categoryEmojiMap: Record<string, string> = {
  "회사 설립": "🏢",
  "B2B 자문 계약": "💼",
  "B2B 자문계약 체결": "💼",
  "B2B 자문": "💼",
  "파트너 계약": "🤝",
  "파트너 협업 계약": "🤝",
  "지혜전문가 계약 체결": "👥",
  "지식전문가 계약 체결": "👥",
  "지혜전문가 출판": "📚",
  "출판": "📚",
  "출판 파트너 계약": "📚",
  "업무협약식 (독점)": "🤝",
  "업무협약식": "🤝",
  "특허 출원": "📄",
  "앱 서비스 BETA 출시": "✨",
  "앱 서비스 출시": "✨",
  "방송 출연 계약": "🏆",
  "지적재산권(LI) 인증로고": "🏆",
  "자회사 설립": "🏢",
};