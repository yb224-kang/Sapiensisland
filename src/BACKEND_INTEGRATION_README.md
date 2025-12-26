# 🚀 백엔드 연동 완료 가이드

Admin 페이지의 백엔드 API 연동을 위한 인프라가 완전히 구축되었습니다!

**최종 업데이트**: 2024-12-24 (데이터 정합성 개선 완료)

---

## ✅ 완료된 작업

### 1️⃣ **단일 소스 데이터 시스템** (`/data/mockData.ts`)
- ✅ 모든 Mock 데이터를 한 곳에서 관리 (reservations 12건)
- ✅ TypeScript 타입 정의
- ✅ 통계 계산 헬퍼 함수 제공
- ✅ 데이터 정합성 보장 (하드코딩 제거)
- ✅ 모든 페이지가 동일한 데이터 소스 사용

### 2️⃣ **통계 계산 함수** (`/data/mockData.ts`)
- ✅ `getTotalBookings()` - 총 예약 건수
- ✅ `getBookingsByStatus()` - 상태별 통계
- ✅ `getExpertPerformance()` - 전문가별 성과
- ✅ `getMonthlyStatsFromReservations()` - 월별 통계
- ✅ `getRegionalDistribution()` - 지역별 분포
- ✅ `getRecentBookings()` - 최근 예약 목록
- ✅ `getTopExperts()` - 상위 전문가

### 3️⃣ **Context API** (`/contexts/ReservationContext.tsx`)
- ✅ 전역 상태 관리
- ✅ CRUD 함수 제공
- ✅ 통계 및 필터링 기능
- ✅ 커스텀 훅 제공

### 4️⃣ **API 클라이언트** (`/api/`)
- ✅ HTTP 클라이언트 구현 (`client.ts`)
- ✅ 예약 API 함수 (`reservations.ts`)
- ✅ 정산 API 함수 (`settlements.ts`)
- ✅ Mock/실제 API 전환 기능

### 5️⃣ **React Query 훅** (`/hooks/`)
- ✅ 예약 쿼리 훅 (`useReservationQueries.ts`)
- ✅ 정산 쿼리 훅 (`useSettlementQueries.ts`)
- ✅ 자동 캐싱 및 갱신
- ✅ Loading/Error 상태 관리

### 6️⃣ **Provider 설정** (`/providers/`)
- ✅ Query Provider (`QueryProvider.tsx`)
- ✅ 통합 Provider (`AppProviders.tsx`)
- ✅ DevTools 설정

### 7️⃣ **문서화**
- ✅ API 연동 가이드 (`API_INTEGRATION_GUIDE.md`)
- ✅ 사용 예시 (`USAGE_EXAMPLES.md`)
- ✅ 데이터 연결 맵 (`MOCK_DATA_CONNECTION.md`) - **NEW**
- ✅ 데이터 README (`/data/README.md`)

---

## 📁 프로젝트 구조

```
프로젝트
├─ 📂 /api                        # API 함수
│  ├─ client.ts                  # HTTP 클라이언트
│  ├─ reservations.ts            # 예약 API (USE_MOCK 플래그)
│  └─ settlements.ts             # 정산 API (USE_MOCK 플래그)
│
├─ 📂 /hooks                      # React Query 훅
│  ├─ useReservationQueries.ts   # 예약 쿼리
│  └─ useSettlementQueries.ts    # 정산 쿼리
│
├─ 📂 /contexts                   # Context API
│  └─ ReservationContext.tsx     # 전역 상태 관리
│
├─ 📂 /providers                  # Provider 통합
│  ├─ QueryProvider.tsx          # React Query 설정
│  └─ AppProviders.tsx           # 통합 Provider
│
├─ 📂 /data                       # Mock 데이터 (단일 소스)
│  ├─ mockData.ts                # ✅ reservations (12건) + 계산 함수
│  └─ README.md                  # 데이터 문서
│
├─ 📂 /pages                      # 페이지 컴포넌트
│  └─ AdminPage.tsx              # ✅ mockData 사용 (12건)
│
├─ 📂 /components                 # 컴포넌트
│  ├─ SettlementContent.tsx      # ✅ mockData 헬퍼 함수 사용
│  ├─ DashboardContent.tsx       # ✅ mockData 계산 함수 사용 (12건)
│  └─ MapHeatmapContent.tsx      # ✅ mockData 기반 집계 (12건)
│
└─ 📄 문서
   ├─ API_INTEGRATION_GUIDE.md   # 백엔드 API 연동 가이드
   ├─ USAGE_EXAMPLES.md          # 코드 사용 예시
   ├─ MOCK_DATA_CONNECTION.md    # ✅ 데이터 정합성 가이드 (NEW)
   └─ BACKEND_INTEGRATION_README.md  # 이 문서
```

---

## 🎯 데이터 정합성 개선 (2024-12-24)

### ❌ Before (문제점)

```
mockData.ts:     reservations 12건
DashboardContent: 하드코딩 811건
MapHeatmap:      가짜 데이터 1,400건
→ 데이터 불일치! 대시보드 숫자 ≠ 실제 예약 건수
```

### ✅ After (개선 완료)

```
mockData.ts:      reservations 12건 (단일 소스)
                         ↓
DashboardContent: getTotalBookings() → 12건
MapHeatmap:       getRegionalDistribution() → 12건 기반
AdminPage:        reservations → 12건
→ 완벽한 데이터 동기화! 모든 페이지가 동일한 숫자 표시
```

---

## 📊 데이터 흐름

### 현재 구조 (Mock 데이터 - 단일 소스)

```
┌───────────────────────────────────────┐
│  /data/mockData.ts (단일 소스)         │
│  • reservations (12건)                │
│  • settlements (6건)                  │
│  • inquiries (8건)                    │
│                                       │
│  📊 계산 함수:                         │
│  • getTotalBookings()                 │
│  • getBookingsByStatus()              │
│  • getExpertPerformance()             │
│  • getMonthlyStatsFromReservations()  │
│  • getRegionalDistribution()          │
└───────────┬───────────────────────────┘
            │
    ┌───────┼───────┬──────────┬────────┐
    ↓       ↓       ↓          ↓        ↓
┌───────┐ ┌────┐ ┌─────┐  ┌──────┐  ┌─────┐
│Admin  │ │Settle│ │Dash │  │MapHeat│ │Inquiry│
│Page   │ │ment │ │board│  │map    │ │Content│
│       │ │     │ │     │  │       │ │       │
│12건   │ │6건  │ │12건 │  │12건   │ │8건    │
└───────┘ └─────┘ └─────┘  └───────┘ └───────┘
  (원본)   (완료만) (계산)    (계산)    (원본)
```

### 향후 구조 (실제 API)

```
┌─────────────┐
│  Backend    │  ← 실제 데이터베이스
│  API Server │  • 집계 쿼리 (GROUP BY)
│             │  • 통계 API (/api/stats)
└──────┬──────┘
       │ HTTP
┌──────▼───────┐
│ /api/client  │  ← HTTP 클라이언트
└──────┬───────┘
       │
┌──────▼───────┐
│ React Query  │  ← 캐싱 & 상태 관리
└──────┬───────┘
       │
   ┌───┴───┬────────┬──────────┬────────┐
   │       │        │          │        │
┌──▼─┐  ┌─▼──┐  ┌─▼──┐   ┌───▼────┐ ┌──▼──┐
│Admin│ │Settle│ │Dash│   │MapHeat │ │Inquiry│
│Page │ │ment  │ │board│  │map     │ │Content│
└─────┘ └──────┘ └────┘   └────────┘ └───────┘
```

---

## 🎯 백엔드 개발자를 위한 빠른 시작

### Step 1: 환경 변수 설정

`.env` 파일 생성:

```env
REACT_APP_API_URL=http://localhost:3001/api
NODE_ENV=development
```

### Step 2: Mock → 실제 API 전환

**`/api/reservations.ts`**:
```typescript
const USE_MOCK = false; // ⬅️ false로 변경
```

**`/api/settlements.ts`**:
```typescript
const USE_MOCK = false; // ⬅️ false로 변경
```

### Step 3: App.tsx에 Provider 추가

```typescript
import { AppProviders } from './providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        {/* 기존 라우터 */}
      </BrowserRouter>
    </AppProviders>
  );
}
```

### Step 4: API 엔드포인트 구현

필요한 엔드포인트 목록은 [`API_INTEGRATION_GUIDE.md`](./API_INTEGRATION_GUIDE.md)를 참조하세요.

---

## 🔧 3단계 개선 완료 상태

### ✅ 1단계: Context API

```typescript
// 사용 예시
import { useReservations } from '../contexts/ReservationContext';

function MyComponent() {
  const { reservations, addReservation, updateReservation } = useReservations();
  
  return <div>...</div>;
}
```

**장점:**
- 전역 상태 관리
- Props Drilling 방지
- 간단한 CRUD 함수 제공

### ✅ 2단계: React Query (API 연동)

```typescript
// 사용 예시
import { useReservationsQuery, useCreateReservation } from '../hooks/useReservationQueries';

function MyComponent() {
  const { data, isLoading } = useReservationsQuery();
  const mutation = useCreateReservation();
  
  return <div>...</div>;
}
```

**장점:**
- 자동 캐싱 및 갱신
- Loading/Error 상태 자동 관리
- 낙관적 업데이트 (Optimistic Update)
- 백그라운드 동기화
- DevTools로 디버깅

### ✅ 3단계: Mock ↔ 실제 API 전환

```typescript
// /api/reservations.ts
const USE_MOCK = true;  // Mock 데이터 사용
const USE_MOCK = false; // 실제 API 사용
```

**장점:**
- 프론트엔드 단독 개발 가능
- 백엔드 준비되면 즉시 전환
- 동일한 코드로 두 환경 지원

---

## 📖 문서 가이드

### 1. **API 연동 가이드** ([`API_INTEGRATION_GUIDE.md`](./API_INTEGRATION_GUIDE.md))
   - API 엔드포인트 명세
   - 요청/응답 형식
   - 인증 설정
   - 에러 처리
   - 테스트 방법

### 2. **사용 예시** ([`USAGE_EXAMPLES.md`](./USAGE_EXAMPLES.md))
   - Context API 예시
   - React Query 예시
   - 실전 시나리오
   - Best Practices

### 3. **데이터 가이드** ([`/data/README.md`](./data/README.md))
   - Mock 데이터 구조
   - 타입 정의
   - 헬퍼 함수
   - 데이터 흐름

---

## 🎨 주요 기능

### 1. 자동 캐싱

```typescript
// 5분간 캐시 유지, 자동 갱신
const { data } = useReservationsQuery();
```

### 2. 낙관적 업데이트

```typescript
// API 응답 전에 UI 먼저 업데이트
const mutation = useUpdateReservation();
mutation.mutate({ id: 1, data: { status: 'confirmed' } });
// ↑ 즉시 UI 업데이트, 에러 시 자동 롤백
```

### 3. 자동 재시도

```typescript
// 네트워크 오류 시 자동 재시도
retry: 1, // 1번 재시도
```

### 4. DevTools

```typescript
// 개발 환경에서 자동 활성화
// 브라우저 우측 하단에 아이콘 표시
```

---

## 🔐 보안 설정

### 인증 토큰

`/api/client.ts`에서 자동으로 헤더에 추가:

```typescript
const token = localStorage.getItem('auth_token');
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}
```

### 백엔드에서 구현 필요:

1. **로그인 API**
   ```
   POST /api/auth/login
   → { token, user }
   ```

2. **토큰 검증**
   - 모든 Admin API 요청 시 검증
   - 권한 확인

3. **토큰 갱신**
   ```
   POST /api/auth/refresh
   → { token }
   ```

---

## 🧪 테스트 시나리오

### 시나리오 1: Mock 데이터로 테스트

```typescript
// /api/reservations.ts
const USE_MOCK = true;
```

✅ 백엔드 없이 전체 기능 테스트 가능

### 시나리오 2: 로컬 백엔드 연동

```env
REACT_APP_API_URL=http://localhost:3001/api
```

```typescript
const USE_MOCK = false;
```

✅ 실제 API와 연동하여 테스트

### 시나리오 3: 개발 서버 연동

```env
REACT_APP_API_URL=https://dev-api.sapiens.com/api
```

✅ 개발 서버와 연동

### 시나리오 4: 프로덕션 배포

```env
REACT_APP_API_URL=https://api.sapiens.com/api
NODE_ENV=production
```

✅ 프로덕션 환경

---

## ✅ 배포 체크리스트

### 환경 변수
- [ ] `REACT_APP_API_URL` 설정
- [ ] `NODE_ENV=production` 설정

### API 전환
- [ ] `USE_MOCK = false` 설정
- [ ] 모든 엔드포인트 URL 확인

### 보안
- [ ] HTTPS 사용
- [ ] CORS 설정
- [ ] 인증 토큰 구현
- [ ] 민감 정보 제거

### 성능
- [ ] React Query 캐시 최적화
- [ ] 페이징 크기 조정
- [ ] 이미지 최적화

### 에러 처리
- [ ] 전역 에러 핸들러
- [ ] 사용자 메시지
- [ ] 로그 수집 (Sentry 등)

---

## 📊 API 엔드포인트 요약

### 예약 (Reservations)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/reservations` | 목록 조회 |
| GET | `/reservations/:id` | 상세 조회 |
| POST | `/reservations` | 생성 |
| PUT | `/reservations/:id` | 수정 |
| DELETE | `/reservations/:id` | 삭제 |
| POST | `/reservations/:id/confirm` | 확정 |
| POST | `/reservations/:id/complete` | 완료 |
| POST | `/reservations/:id/cancel` | 취소 |
| GET | `/reservations/stats` | 통계 |

### 정산 (Settlements)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/settlements` | 목록 조회 |
| GET | `/settlements/:id` | 상세 조회 |
| GET | `/settlements/by-reservation/:id` | 예약별 조회 |
| POST | `/settlements` | 생성 |
| POST | `/settlements/calculate` | 자동 계산 |
| PUT | `/settlements/:id` | 수정 |
| POST | `/settlements/:id/complete` | 완료 |
| DELETE | `/settlements/:id` | 삭제 |
| GET | `/settlements/unsettled-reservations` | 미정산 목록 |
| GET | `/settlements/stats` | 통계 |

---

## 🎓 학습 자료

### React Query
- [공식 문서](https://tanstack.com/query/latest)
- [Quick Start](https://tanstack.com/query/latest/docs/react/quick-start)
- [Examples](https://tanstack.com/query/latest/docs/react/examples/react/simple)

### Context API
- [React 공식 문서](https://react.dev/reference/react/useContext)
- [Context Best Practices](https://react.dev/learn/passing-data-deeply-with-context)

### TypeScript
- [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## 💡 팁

### 1. DevTools 활용

React Query DevTools를 열어서:
- 쿼리 상태 확인
- 캐시 데이터 확인
- 네트워크 요청 추적

### 2. 에러 디버깅

1. 브라우저 콘솔 확인
2. Network 탭에서 API 요청/응답 확인
3. React Query DevTools에서 쿼리 상태 확인
4. Mock 데이터와 실제 API 응답 형식 비교

### 3. 성능 최적화

```typescript
// staleTime: 데이터가 fresh로 간주되는 시간
// gcTime: 캐시 유지 시간
useQuery({
  queryKey: ['reservations'],
  queryFn: fetchReservations,
  staleTime: 1000 * 60 * 5,  // 5분
  gcTime: 1000 * 60 * 30,    // 30분
});
```

---

## 🤝 기여 가이드

백엔드 API 연동 후:

1. `USE_MOCK = false` 확인
2. 실제 데이터로 테스트
3. 문제 발견 시 이슈 등록
4. 문서 업데이트

---

## 📞 지원

문제가 발생하면:

1. [`API_INTEGRATION_GUIDE.md`](./API_INTEGRATION_GUIDE.md) 참조
2. [`USAGE_EXAMPLES.md`](./USAGE_EXAMPLES.md) 코드 예시 확인
3. React Query DevTools로 디버깅
4. 개발팀에 문의

---

## 🎉 완료!

백엔드 API 연동을 위한 모든 인프라가 준비되었습니다!

**다음 단계:**
1. 백엔드 API 개발
2. `USE_MOCK = false` 전환
3. 통합 테스트
4. 배포

**Happy Coding! 🚀**