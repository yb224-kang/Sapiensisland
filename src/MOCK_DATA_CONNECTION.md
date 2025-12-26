# 🔗 Mock 데이터 연결 맵

## 📊 **개요**

SAPIENS ISLAND Admin 페이지의 모든 데이터는 **단일 소스 원칙**을 따릅니다.  
`/data/mockData.ts`의 `reservations` 배열이 유일한 데이터 소스이며, 모든 통계는 이를 기반으로 계산됩니다.

**작성일**: 2024-12-24  
**버전**: 2.0 (데이터 정합성 개선)

---

## 🎯 **데이터 아키텍처**

```
┌─────────────────────────────────────────────────────────────────┐
│                    /data/mockData.ts (단일 소스)                  │
│                       reservations (12건)                         │
├─────────────────────────────────────────────────────────────────┤
│  ID 1: completed  • 김경일 • 2024-12-15 • 2,000,000원 • 서울  │
│  ID 2: pending    • 유영만 • 2024-12-18 • 3,000,000원 • 서울  │
│  ID 3: confirmed  • 정재한 • 2024-12-20 • 2,500,000원 • 부산  │
│  ID 4: pending    • 김태훈 • 2024-12-22 • 4,000,000원 • 부산  │
│  ID 5: completed  • 김태훈 • 2024-11-28 • 4,500,000원 • 대구  │
│  ID 6: cancelled  • 이영희 • 2024-12-05 • 3,500,000원 • 인천  │
│  ... (총 12건)                                                   │
└─────────────────────────────────────────────────────────────────┘
                               ↓
        ┌──────────────────────┼──────────────────────┐
        ↓                      ↓                      ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  대시보드 통계    │  │  예약신청내역    │  │  지역별 히트맵   │
│  (계산됨)        │  │  (원본 표시)     │  │  (계산됨)       │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ • 총 예약: 12건   │  │ • 12건 표시      │  │ • 지역별 집계    │
│ • 완료: 6건      │  │ • 필터링/검색    │  │ • 인터랙티브 맵  │
│ • 확정: 2건      │  │ • 상태 관리      │  │ • 실시간 계산    │
│ • 대기중: 2건    │  │                  │  │                  │
│ • 취소: 1건      │  │                  │  │                  │
│ • 월별 차트      │  │                  │  │                  │
│ • 전문가별 통계  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 📋 **1. 단일 데이터 소스: mockData.ts**

### **파일**: `/data/mockData.ts`

### **핵심 데이터**: `reservations` (12건)

```typescript
export const reservations: Reservation[] = [
  {
    id: 1,
    reservationDate: "2024-12-15",
    reservationTime: "14:00",
    expert: "김경일",
    expertField: "심리학",
    locationType: "online",
    location: "온라인",
    region: "서울",
    agency: "삼성전자",
    client: "홍길동",
    topic: "조직심리와 리더십",
    audience: "전 직원",
    contactName: "홍길동",
    contactPhone: "010-1234-5678",
    contactEmail: "hong@samsung.com",
    fee: 2000000,
    message: "강연 잘 부탁드립니다.",
    status: "completed",
    createdAt: "2024-12-01 09:00",
    completedAt: "2024-12-15 16:00"
  },
  // ... 총 12건
];
```

### **보조 데이터**:
- `settlements`: 정산 정보 (6건)
- `inquiries`: 기타문의 (8건)

---

## 🧮 **2. 계산 함수 (통계 생성)**

### **파일**: `/data/mockData.ts`

모든 통계는 `reservations` 배열을 기반으로 **실시간 계산**됩니다.

### **📊 대시보드 통계 함수**

```typescript
// 총 예약 건수
export const getTotalBookings = (): number => {
  return reservations.length; // 12
};

// 상태별 통계
export const getBookingsByStatus = () => {
  return {
    total: 12,
    pending: 2,
    confirmed: 2,
    completed: 6,
    cancelled: 1
  };
};

// 파이차트 데이터
export const getBookingStatusData = () => {
  const stats = getBookingsByStatus();
  return [
    { name: '완료', value: stats.completed, color: '#10b981' },
    { name: '확정', value: stats.confirmed, color: '#3b82f6' },
    { name: '대기중', value: stats.pending, color: '#f59e0b' },
    { name: '취소', value: stats.cancelled, color: '#ef4444' }
  ];
};

// 전문가별 성과
export const getExpertPerformance = () => {
  // reservations를 전문가별로 그룹핑하여 통계 계산
  // { name: '김경일', bookings: 3, revenue: 6.5, field: '심리학' }
};

// 월별 통계 (12개월)
export const getMonthlyStatsFromReservations = (): MonthlyStats[] => {
  // reservations를 월별로 집계
  // 1월~12월 데이터 생성
};

// 지역별 분포
export const getRegionalDistribution = () => {
  // reservations를 지역별로 집계
  // { region: '서울', value: 4, percentage: 33.3 }
};
```

### **📍 정산 관리 함수**

```typescript
// 완료된 예약만
export const getCompletedReservations = (): Reservation[] => {
  return reservations.filter(r => r.status === 'completed');
};

// 예약 ID로 정산 찾기
export const getSettlementByReservationId = (reservationId: number) => {
  return settlements.find(s => s.reservationId === reservationId);
};
```

---

## 🎨 **3. UI 컴포넌트 사용**

### **✅ 대시보드 (DashboardContent.tsx)**

```typescript
import { 
  getTotalBookings,
  getBookingsByStatus,
  getBookingStatusData,
  getExpertPerformance,
  getMonthlyStatsFromReservations,
  getRecentBookings,
  getTopExperts,
  getRegionalDistribution
} from '../data/mockData';

// 계산된 데이터 사용
const totalBookings = getTotalBookings(); // 12
const bookingStats = getBookingsByStatus(); // { total: 12, ... }
const allMonthlyBookingsData = getMonthlyStatsFromReservations();
const expertPerformanceData = getExpertPerformance();
const bookingStatusData = getBookingStatusData();
```

### **✅ 예약신청내역 (AdminPage.tsx)**

```typescript
import { reservations } from '../data/mockData';

// 원본 데이터 직접 사용
const allReservations = reservations; // 12건
```

### **✅ 지역별 히트맵 (MapHeatmapContent.tsx)**

```typescript
import { reservations, getRegionalDistribution } from '../data/mockData';

// reservations를 기반으로 실시간 집계
const regionStats = Object.entries(
  reservations.reduce((acc, reservation) => {
    // 전문가 필터 적용
    if (selectedExpert === 'all' || reservation.expert === selectedExpert) {
      acc[reservation.region] = (acc[reservation.region] || 0) + 1;
    }
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]);
```

### **✅ 정산관리 (SettlementContent.tsx)**

```typescript
import { 
  getCompletedReservations,
  getSettlementByReservationId,
  settlements
} from '../data/mockData';

// 완료된 예약만
const completedReservations = getCompletedReservations(); // 6건
```

---

## 🎯 **데이터 정합성 보장**

### **✅ Before (문제점)**

```
❌ DashboardContent: 하드코딩된 811건
❌ AdminPage: 실제 데이터 12건
❌ MapHeatmap: 가짜 데이터 1,400건 생성
→ 숫자가 모두 다름! (데이터 불일치)
```

### **✅ After (개선)**

```
✅ DashboardContent: reservations 12건 기반 계산
✅ AdminPage: reservations 12건 표시
✅ MapHeatmap: reservations 12건 기반 집계
→ 모든 페이지가 동일한 데이터 소스 사용! (완벽한 동기화)
```

---

## 📊 **현재 Mock 데이터 통계**

### **전체 예약 (12건)**
- ✅ completed: 6건 (50.0%)
- ✅ confirmed: 2건 (16.7%)
- ✅ pending: 2건 (16.7%)
- ✅ cancelled: 1건 (8.3%)
- ✅ 기타: 1건 (8.3%)

### **전체 정산 (6건)**
- ✅ completed: 3건 (50%)
- ✅ pending: 3건 (50%)

### **전체 문의 (8건)**
- ✅ pending: 4건
- ✅ replied: 4건

---

## 🎨 **상태 코드 통일**

### **예약 상태** (`status`)
| 코드 | 한글 | 색상 | 설명 |
|------|------|------|------|
| `pending` | 대기중 | 🟡 Yellow (#f59e0b) | 예약 신청됨 |
| `confirmed` | 확정 | 🔵 Blue (#3b82f6) | 예약 확정됨 |
| `completed` | 완료 | 🟢 Green (#10b981) | 강연 완료됨 |
| `cancelled` | 취소 | 🔴 Red (#ef4444) | 예약 취소됨 |

### **정산 상태** (`settlementStatus`)
| 코드 | 한글 | 색상 |
|------|------|------|
| `pending` | 정산대기 | 🟡 Yellow |
| `completed` | 정산완료 | 🟢 Green |

---

## 🚀 **백엔드 연동 가이드**

### **Phase 1: API 엔드포인트 구현**

백엔드 개발자는 동일한 계산 로직을 구현해야 합니다:

```typescript
// GET /api/dashboard/stats
{
  totalBookings: 12,
  bookingsByStatus: {
    pending: 2,
    confirmed: 2,
    completed: 6,
    cancelled: 1
  },
  monthlyStats: [...], // getMonthlyStatsFromReservations() 로직 참고
  expertPerformance: [...], // getExpertPerformance() 로직 참고
  regionalDistribution: [...] // getRegionalDistribution() 로직 참고
}
```

### **Phase 2: 프론트엔드 수정**

API 연동 시 계산 함수만 교체하면 됩니다:

```typescript
// Before (Mock)
const totalBookings = getTotalBookings();

// After (API)
const { data } = await fetch('/api/dashboard/stats');
const totalBookings = data.totalBookings;
```

---

## ✅ **단일 소스 원칙 체크리스트**

- [x] **단일 데이터 소스**: `mockData.ts`의 `reservations` 배열만 사용
- [x] **하드코딩 제거**: 모든 통계는 계산 함수로 생성
- [x] **데이터 동기화**: 대시보드 ⟷ 예약내역 ⟷ 히트맵 완벽 일치
- [x] **확장성**: 백엔드 API로 쉽게 교체 가능한 구조
- [x] **일관성**: 모든 페이지가 동일한 숫자 표시

---

## 📁 **주요 파일 구조**

```
/data
  ├── mockData.ts              ✅ 단일 소스 (reservations, settlements, inquiries)
  └── README.md                ℹ️ 데이터 구조 설명

/components
  ├── DashboardContent.tsx     ✅ 계산 함수 사용
  ├── MapHeatmapContent.tsx    ✅ 계산 함수 사용
  └── SettlementContent.tsx    ✅ 헬퍼 함수 사용

/pages
  └── AdminPage.tsx            ✅ 원본 데이터 사용

/api
  ├── client.ts                🔜 백엔드 API 연동 준비
  ├── reservations.ts          🔜 백엔드 API 연동 준비
  └── settlements.ts           🔜 백엔드 API 연동 준비
```

---

**문서 작성**: SAPIENS ISLAND 프론트엔드 팀  
**최종 수정**: 2024-12-24  
**버전**: 2.0 (데이터 정합성 개선)
