# 📊 중앙화된 Mock 데이터 시스템

## 🎯 개요

**단일 소스 원칙 (Single Source of Truth)**을 적용하여 모든 Admin 페이지가 동일한 데이터를 사용합니다.

`/data/mockData.ts`의 `reservations` 배열이 유일한 데이터 소스이며, 모든 통계는 이를 기반으로 **실시간 계산**됩니다.

**최종 업데이트**: 2024-12-24 (데이터 정합성 개선)

---

## 🏗️ 구조

```
/data/mockData.ts
├─ reservations[]      # 예약 데이터 (12건) ⭐ 단일 소스
├─ settlements[]       # 정산 데이터 (6건)
├─ inquiries[]         # 기타문의 (8건)
│
├─ 📊 통계 계산 함수 (9개)
│  ├─ getTotalBookings()                    # 총 예약 건수
│  ├─ getBookingsByStatus()                 # 상태별 통계
│  ├─ getBookingStatusData()                # 파이차트 데이터
│  ├─ getExpertPerformance()                # 전문가별 성과
│  ├─ getMonthlyStatsFromReservations()     # 월별 통계
│  ├─ getRegionalDistribution()             # 지역별 분포
│  ├─ getRecentBookings()                   # 최근 예약
│  ├─ getTopExperts()                       # 상위 전문가
│  └─ getTotalRevenue()                     # 총 매출
│
└─ 🔧 헬퍼 함수 (5개)
   ├─ getCompletedReservations()            # 완료된 예약만
   ├─ getSettlementByReservationId()        # 예약별 정산
   ├─ getReservationCountByStatus()         # 상태별 개수
   ├─ getTotalSettlementAmount()            # 총 정산액
   └─ getInquiryCountByStatus()             # 문의 상태별 개수
```

---

## ✅ 연동된 컴포넌트

### 1️⃣ **AdminPage.tsx** (예약 신청 내역 관리)
```typescript
import { reservations } from '../data/mockData';
```
- **데이터**: 원본 12건
- **기능**: 목록 표시, 필터링, 상태 변경

### 2️⃣ **DashboardContent.tsx** (대시보드)
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
```
- **데이터**: reservations 기반 계산 (12건)
- **기능**: 통계 차트, KPI 카드, 월별 트렌드

### 3️⃣ **MapHeatmapContent.tsx** (지역별 예약 현황)
```typescript
import { reservations, getRegionalDistribution } from '../data/mockData';
```
- **데이터**: reservations 기반 실시간 집계
- **기능**: 인터랙티브 지도, 지역별 통계

### 4️⃣ **SettlementContent.tsx** (정산 관리)
```typescript
import { 
  getCompletedReservations,
  getSettlementByReservationId,
  settlements
} from '../data/mockData';
```
- **데이터**: 완료된 예약 (6건) + 정산 정보
- **기능**: 정산 등록, 자동 계산, 상태 관리

### 5️⃣ **InquiryContent.tsx** (기타문의 관리)
```typescript
import { inquiries, getInquiryCountByStatus } from '../data/mockData';
```
- **데이터**: inquiries (8건)
- **기능**: 문의 목록, 답변 관리

---

## 📋 데이터 구조

### Reservation (예약) - **⭐ 단일 소스**
```typescript
{
  id: number;
  reservationDate: string;        // "2024-12-15"
  reservationTime: string;        // "14:00"
  expert: string;                 // "김경일"
  expertField: string;            // "심리학"
  locationType: 'online' | 'offline';
  location: string;
  region: string;                 // "서울" (짧은 이름)
  agency: string;                 // "삼성전자"
  client: string;
  topic: string;
  audience: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;                    // 2000000
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}
```

### Settlement (정산)
```typescript
{
  id: number;
  reservationId: number;          // 연결된 예약 ID
  revenue: number;                // 강연료 (매출)
  cost: number;                   // 비용
  profit: number;                 // 순수익 = revenue - cost
  profitRate: number;             // 전문가 비율 (60)
  commissionRate: number;         // 회사 비율 (40)
  commissionAmount: number;       // 회사 수익
  settlementAmount: number;       // 전문가 정산금액
  settlementStatus: 'pending' | 'completed';
  settlementDate?: string;        // 정산 완료일
  paymentScheduledDate?: string;  // 지급 예정일
  memo?: string;
}
```

### Inquiry (기타문의)
```typescript
{
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: 'pending' | 'replied';
  createdAt: string;
  repliedAt?: string;
  reply?: string;
  repliedBy?: string;
}
```

### MonthlyStats (월별 통계) - **계산됨**
```typescript
{
  month: string;                  // "1월", "2월", ...
  bookings: number;               // 총 예약
  revenue: number;                // 매출 (백만원)
  cost: number;                   // 비용 (백만원)
  profit: number;                 // 수익 (백만원)
  settlement: number;             // 정산 (백만원)
  completed: number;              // 완료
  confirmed: number;              // 확정
  pending: number;                // 대기중
  cancelled: number;              // 취소
  expertDetails: {
    expert: string;
    bookings: number;
    revenue: number;
  }[];
}
```

---

## 🧮 통계 계산 함수

### 📊 **대시보드용**

#### `getTotalBookings(): number`
```typescript
// 총 예약 건수
return reservations.length; // 12
```

#### `getBookingsByStatus()`
```typescript
// 상태별 통계
return {
  total: 12,
  pending: 2,
  confirmed: 2,
  completed: 6,
  cancelled: 1
};
```

#### `getBookingStatusData()`
```typescript
// 파이차트 데이터
return [
  { name: '완료', value: 6, color: '#10b981' },
  { name: '확정', value: 2, color: '#3b82f6' },
  { name: '대기중', value: 2, color: '#f59e0b' },
  { name: '취소', value: 1, color: '#ef4444' }
];
```

#### `getExpertPerformance()`
```typescript
// 전문가별 성과 (예약 건수, 매출 순위)
// reservations를 전문가별로 그룹핑하여 계산
```

#### `getMonthlyStatsFromReservations(): MonthlyStats[]`
```typescript
// 월별 통계 (1월~12월)
// reservations를 월별로 집계하여 자동 생성
```

#### `getRegionalDistribution()`
```typescript
// 지역별 분포
// { region: '서울', value: 4, percentage: 33.3 }
```

#### `getRecentBookings(limit: number = 8)`
```typescript
// 최근 예약 목록 (날짜순 정렬)
```

#### `getTopExperts(limit: number = 5)`
```typescript
// 상위 전문가 목록 (예약 건수 기준)
```

#### `getTotalRevenue(): number`
```typescript
// 총 매출액 계산
return reservations.reduce((sum, r) => sum + r.fee, 0);
```

#### `getAverageBookingAmount(): number`
```typescript
// 평균 예약 금액
return getTotalRevenue() / reservations.length;
```

---

## 🔧 헬퍼 함수

### 📍 **정산 관리용**

#### `getCompletedReservations(): Reservation[]`
```typescript
// 완료된 예약만 반환
return reservations.filter(r => r.status === 'completed');
```

#### `getSettlementByReservationId(id: number): Settlement | undefined`
```typescript
// 예약 ID로 정산 정보 조회
return settlements.find(s => s.reservationId === id);
```

#### `getTotalSettlementAmount(): number`
```typescript
// 총 정산 금액
return settlements
  .filter(s => s.settlementStatus === 'completed')
  .reduce((sum, s) => sum + s.settlementAmount, 0);
```

### 📋 **기타**

#### `getReservationCountByStatus(status: string): number`
```typescript
// 상태별 예약 개수
return reservations.filter(r => r.status === status).length;
```

#### `getInquiryCountByStatus(status: string): number`
```typescript
// 상태별 문의 개수
return inquiries.filter(i => i.status === status).length;
```

---

## 🔄 데이터 흐름

```
1. 예약 신청
   └─> reservations[] 추가 (status: 'pending')
   └─> 모든 통계 자동 업데이트 ✅

2. 예약 확정
   └─> status 변경: 'confirmed'
   └─> confirmedAt 기록
   └─> 대시보드 통계 자동 반영 ✅

3. 강연 완료
   └─> status 변경: 'completed'
   └─> completedAt 기록
   └─> 정산 가능 상태로 변경 ✅

4. 정산 등록
   └─> settlements[] 추가
   └─> reservationId로 연결
   └─> settlementStatus: 'pending'

5. 정산 완료
   └─> settlementStatus: 'completed'
   └─> settlementDate 기록
```

---

## 📊 현재 데이터 현황

### 예약 데이터 (총 12건)

**상태별 분포**:
- ✅ **완료 (completed)**: 6건 (50.0%)
- 🔵 **확정 (confirmed)**: 2건 (16.7%)
- 🟡 **대기중 (pending)**: 2건 (16.7%)
- 🔴 **취소 (cancelled)**: 1건 (8.3%)
- 📋 **기타**: 1건 (8.3%)

**지역별 분포** (예시):
- 서울: 4건
- 부산: 3건
- 대구: 2건
- 기타: 3건

### 정산 데이터 (총 6건)
- ✅ **정산완료 (completed)**: 3건
- 🟡 **정산대기 (pending)**: 3건

### 문의 데이터 (총 8건)
- 🟡 **답변대기 (pending)**: 4건
- ✅ **답변완료 (replied)**: 4건

---

## 💡 사용 예시

### 1. 예약 목록 조회
```typescript
import { reservations } from '../data/mockData';

// 모든 예약
const allReservations = reservations;

// 상태별 필터링
const pending = reservations.filter(r => r.status === 'pending');
const completed = reservations.filter(r => r.status === 'completed');
```

### 2. 대시보드 통계
```typescript
import { 
  getTotalBookings,
  getBookingsByStatus,
  getMonthlyStatsFromReservations
} from '../data/mockData';

const totalBookings = getTotalBookings(); // 12
const stats = getBookingsByStatus(); // { total: 12, pending: 2, ... }
const monthlyData = getMonthlyStatsFromReservations(); // 12개월 통계
```

### 3. 정산 정보 조회
```typescript
import { 
  getCompletedReservations, 
  getSettlementByReservationId 
} from '../data/mockData';

// 완료된 예약만
const completedReservations = getCompletedReservations(); // 6건

// 정산 정보 확인
completedReservations.forEach(reservation => {
  const settlement = getSettlementByReservationId(reservation.id);
  
  if (settlement) {
    console.log('정산 등록됨:', settlement.settlementStatus);
  } else {
    console.log('미정산');
  }
});
```

### 4. 지역별 통계
```typescript
import { getRegionalDistribution } from '../data/mockData';

const regionData = getRegionalDistribution();
// [
//   { region: '서울', value: 4, percentage: 33.3 },
//   { region: '부산', value: 3, percentage: 25.0 },
//   ...
// ]
```

---

## 🎨 타입 안정성

모든 타입이 export되어 있어 컴포넌트에서 안전하게 사용할 수 있습니다:

```typescript
import type { 
  Reservation, 
  Settlement, 
  Inquiry, 
  MonthlyStats 
} from '../data/mockData';
```

---

## 🎯 데이터 정합성 보장

### ✅ 단일 소스 원칙

```
reservations (12건) → 모든 통계 자동 계산
├─ 대시보드: 12건
├─ 예약관리: 12건
├─ 히트맵: 12건 기반
└─ 정산관리: 6건 (완료만)

→ 완벽한 데이터 동기화! 🎉
```

### ❌ Before (문제)
```
mockData: 12건
대시보드: 811건 (하드코딩)
히트맵: 1,400건 (가짜 데이터)
→ 데이터 불일치!
```

### ✅ After (개선)
```
mockData: 12건 (단일 소스)
대시보드: getTotalBookings() → 12건
히트맵: getRegionalDistribution() → 12건 기반
→ 완벽한 동기화!
```

---

## 🚀 백엔드 연동 가이드

### **프론트엔드 계산 로직 → 백엔드 SQL**

**프론트 (TypeScript)**:
```typescript
export const getBookingsByStatus = () => {
  return {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
  };
};
```

**백엔드 (SQL)**:
```sql
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
  SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
FROM reservations;
```

**API 응답**:
```json
{
  "total": 12,
  "pending": 2,
  "confirmed": 2,
  "completed": 6,
  "cancelled": 1
}
```

---

## ✅ 장점

### 1. **데이터 정합성**
- 단일 소스로 불일치 방지
- 자동 계산으로 실수 제거
- 모든 페이지 동기화

### 2. **유지보수 용이성**
- 데이터 수정 시 한 곳만 변경
- 통계는 자동으로 업데이트
- 버그 추적 쉬움

### 3. **타입 안정성**
- TypeScript로 타입 보장
- 자동완성 지원
- 컴파일 타임 오류 검출

### 4. **확장성**
- 백엔드 API로 쉽게 전환 가능
- 계산 로직 재사용 가능
- 새로운 통계 추가 용이

### 5. **성능**
- 클라이언트 사이드 계산 (서버 부하 감소)
- 실시간 반응성
- 캐싱 가능

---

## 📝 주의사항

### 1. **데이터 일관성 유지**
- reservationId로 연결 관계 유지
- 상태 전이 규칙 준수 (pending → confirmed → completed)

### 2. **날짜 형식 통일**
- reservationDate: `"YYYY-MM-DD"`
- createdAt: `"YYYY-MM-DD HH:mm"`

### 3. **금액 단위 통일**
- 모든 금액은 원(won) 단위
- 소수점 없이 정수로 관리

### 4. **상태 값 통일**
- Reservation: `'pending' | 'confirmed' | 'completed' | 'cancelled'`
- Settlement: `'pending' | 'completed'`
- Inquiry: `'pending' | 'replied'`

### 5. **지역명 통일**
- 짧은 이름 사용: `"서울"`, `"부산"`, `"대구"` 등
- 전체 이름 변환은 컴포넌트에서 처리

---

## 🔗 관련 문서

1. **[MOCK_DATA_CONNECTION.md](../MOCK_DATA_CONNECTION.md)** - 데이터 연결 맵
2. **[BACKEND_INTEGRATION_README.md](../BACKEND_INTEGRATION_README.md)** - 백엔드 연동 가이드
3. **[API_INTEGRATION_GUIDE.md](../API_INTEGRATION_GUIDE.md)** - API 명세
4. **[IMPLEMENTATION_SUMMARY.md](../IMPLEMENTATION_SUMMARY.md)** - 구현 요약

---

**마지막 업데이트**: 2024-12-24  
**버전**: 2.0 (데이터 정합성 개선 완료)  
**관리자**: SAPIENS ISLAND 프론트엔드 팀
