# 🚀 백엔드 API 연동 가이드

백엔드 개발자를 위한 완전한 API 연동 가이드입니다.

---

## 📋 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [빠른 시작](#빠른-시작)
3. [API 엔드포인트 명세](#api-엔드포인트-명세)
4. [데이터 모델](#데이터-모델)
5. [인증 설정](#인증-설정)
6. [에러 처리](#에러-처리)
7. [테스트 방법](#테스트-방법)
8. [배포 체크리스트](#배포-체크리스트)

---

## 🏗️ 프로젝트 구조

```
프로젝트
├─ /api                      # API 함수
│  ├─ client.ts             # 기본 HTTP 클라이언트
│  ├─ reservations.ts       # 예약 API
│  └─ settlements.ts        # 정산 API
│
├─ /hooks                    # React Query 훅
│  ├─ useReservationQueries.ts
│  └─ useSettlementQueries.ts
│
├─ /contexts                 # Context API
│  └─ ReservationContext.tsx
│
├─ /providers               # Provider 통합
│  ├─ QueryProvider.tsx
│  └─ AppProviders.tsx
│
└─ /data                    # Mock 데이터
   └─ mockData.ts
```

---

## ⚡ 빠른 시작

### 1단계: 환경 변수 설정

`.env` 파일 생성:

```env
# 백엔드 API URL
REACT_APP_API_URL=http://localhost:3001/api

# 개발/프로덕션 모드
NODE_ENV=development
```

### 2단계: Mock → 실제 API 전환

**`/api/reservations.ts`** 파일에서:

```typescript
// Mock 사용 여부 (개발 단계에서 전환)
const USE_MOCK = false; // ⬅️ false로 변경
```

**`/api/settlements.ts`** 파일에서도 동일하게 변경:

```typescript
const USE_MOCK = false; // ⬅️ false로 변경
```

### 3단계: App.tsx에 Provider 추가

```typescript
import { AppProviders } from './providers/AppProviders';

function App() {
  return (
    <AppProviders>
      {/* 기존 라우터 코드 */}
    </AppProviders>
  );
}
```

### 4단계: 컴포넌트에서 사용

```typescript
import { useReservationsQuery } from '../hooks/useReservationQueries';

function ReservationList() {
  const { data, isLoading, error } = useReservationsQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data.map(reservation => (
        <div key={reservation.id}>{reservation.topic}</div>
      ))}
    </div>
  );
}
```

---

## 🌐 API 엔드포인트 명세

### 📌 예약 API (Reservations)

#### 1. 예약 목록 조회

```
GET /api/reservations
```

**Query Parameters:**
```typescript
{
  page?: number;           // 페이지 번호 (기본: 1)
  limit?: number;          // 페이지 크기 (기본: 10)
  status?: string;         // 상태 필터 (pending|confirmed|completed|cancelled)
  expert?: string;         // 전문가 필터
  startDate?: string;      // 시작일 (YYYY-MM-DD)
  endDate?: string;        // 종료일 (YYYY-MM-DD)
  sortBy?: string;         // 정렬 기준
  sortOrder?: 'asc'|'desc'; // 정렬 순서
}
```

**Response:**
```typescript
{
  data: Reservation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

#### 2. 예약 상세 조회

```
GET /api/reservations/:id
```

**Response:**
```typescript
{
  id: number;
  reservationDate: string;
  reservationTime: string;
  expert: string;
  expertField: string;
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
```

#### 3. 예약 생성

```
POST /api/reservations
```

**Request Body:**
```typescript
{
  reservationDate: string;      // "2024-12-25"
  reservationTime: string;      // "14:00"
  expert: string;               // "김경일"
  expertField: string;          // "심리학"
  locationType: 'online' | 'offline';
  location: string;
  region: string;               // "서울특별시"
  agency: string;
  client: string;
  topic: string;
  audience: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;
  message?: string;
  status: 'pending';            // 초기 상태는 항상 pending
}
```

**Response:** 생성된 Reservation 객체

#### 4. 예약 수정

```
PUT /api/reservations/:id
```

**Request Body:** Partial<Reservation>

#### 5. 예약 삭제

```
DELETE /api/reservations/:id
```

**Response:** 204 No Content

#### 6. 예약 확정

```
POST /api/reservations/:id/confirm
```

**Response:** 업데이트된 Reservation (status: 'confirmed')

#### 7. 예약 완료

```
POST /api/reservations/:id/complete
```

**Response:** 업데이트된 Reservation (status: 'completed')

#### 8. 예약 취소

```
POST /api/reservations/:id/cancel
```

**Request Body:**
```typescript
{
  reason: string; // 취소 사유
}
```

**Response:** 업데이트된 Reservation (status: 'cancelled')

#### 9. 예약 통계

```
GET /api/reservations/stats
```

**Response:**
```typescript
{
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}
```

---

### 💰 정산 API (Settlements)

#### 1. 정산 목록 조회

```
GET /api/settlements
```

**Query Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  status?: string;          // pending|completed
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc'|'desc';
}
```

**Response:**
```typescript
{
  data: Settlement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

#### 2. 정산 상세 조회

```
GET /api/settlements/:id
```

**Response:**
```typescript
{
  id: number;
  reservationId: number;
  revenue: number;              // 강연료 (매출)
  cost: number;                 // 비용
  profit: number;               // 순수익 = revenue - cost
  profitRate: number;           // 전문가 비율 (60)
  commissionRate: number;       // 회사 비율 (40)
  commissionAmount: number;     // 회사 수익
  settlementAmount: number;     // 전문가 정산금액
  settlementStatus: 'pending' | 'completed';
  settlementDate?: string;      // 정산 완료일
  paymentScheduledDate?: string; // 지급 예정일
  memo?: string;
}
```

#### 3. 예약 ID로 정산 조회

```
GET /api/settlements/by-reservation/:reservationId
```

**Response:** Settlement 또는 null

#### 4. 정산 생성

```
POST /api/settlements
```

**Request Body:**
```typescript
{
  reservationId: number;
  revenue: number;
  cost: number;
  profit: number;
  profitRate: number;
  commissionRate: number;
  commissionAmount: number;
  settlementAmount: number;
  settlementStatus: 'pending';
  paymentScheduledDate?: string;
  memo?: string;
}
```

#### 5. 정산 자동 계산

```
POST /api/settlements/calculate
```

**Request Body:**
```typescript
{
  reservationId: number;
  revenue: number;        // 강연료
  cost: number;          // 비용
  profitRate: number;    // 전문가 비율 (60)
}
```

**Response:**
```typescript
{
  revenue: number;
  cost: number;
  profit: number;
  profitRate: number;
  commissionRate: number;
  commissionAmount: number;
  settlementAmount: number;
}
```

**계산 로직:**
```typescript
profit = revenue - cost;
commissionRate = 100 - profitRate;
commissionAmount = profit * (commissionRate / 100);
settlementAmount = profit * (profitRate / 100);
```

#### 6. 정산 수정

```
PUT /api/settlements/:id
```

**Request Body:** Partial<Settlement>

#### 7. 정산 완료

```
POST /api/settlements/:id/complete
```

**Response:** 업데이트된 Settlement (settlementStatus: 'completed')

#### 8. 정산 삭제

```
DELETE /api/settlements/:id
```

#### 9. 미정산 예약 목록

```
GET /api/settlements/unsettled-reservations
```

**Response:**
```typescript
[
  {
    id: number;
    reservationDate: string;
    expert: string;
    client: string;
    fee: number;
    completedAt: string;
  }
]
```

#### 10. 정산 통계

```
GET /api/settlements/stats
```

**Response:**
```typescript
{
  total: number;
  pending: number;
  completed: number;
  totalAmount: number;
  pendingAmount: number;
  completedAmount: number;
}
```

---

## 📊 데이터 모델

### Reservation (예약)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | ✅ | 예약 ID (자동생성) |
| reservationDate | string | ✅ | 예약일 (YYYY-MM-DD) |
| reservationTime | string | ✅ | 예약시간 (HH:mm) |
| expert | string | ✅ | 전문가 이름 |
| expertField | string | ✅ | 전문 분야 |
| locationType | enum | ✅ | 장소 타입 (online/offline) |
| location | string | ✅ | 장소/URL |
| region | string | ✅ | 지역 |
| agency | string | ✅ | 에이전시 |
| client | string | ✅ | 고객사 |
| topic | string | ✅ | 주제 |
| audience | string | ✅ | 청중 정보 |
| contactName | string | ✅ | 담당자 이름 |
| contactPhone | string | ✅ | 담당자 전화 |
| contactEmail | string | ✅ | 담당자 이메일 |
| fee | number | ✅ | 강연료 (원) |
| message | string | ❌ | 요청사항 |
| status | enum | ✅ | 상태 (pending/confirmed/completed/cancelled) |
| createdAt | string | ✅ | 생성일시 |
| confirmedAt | string | ❌ | 확정일시 |
| completedAt | string | ❌ | 완료일시 |
| cancelledAt | string | ❌ | 취소일시 |
| cancelReason | string | ❌ | 취소 사유 |

### Settlement (정산)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | ✅ | 정산 ID (자동생성) |
| reservationId | number | ✅ | 예약 ID (외래키) |
| revenue | number | ✅ | 강연료 (매출) |
| cost | number | ✅ | 비용 |
| profit | number | ✅ | 순수익 |
| profitRate | number | ✅ | 전문가 비율 |
| commissionRate | number | ✅ | 회사 비율 |
| commissionAmount | number | ✅ | 회사 수익 |
| settlementAmount | number | ✅ | 전문가 정산금액 |
| settlementStatus | enum | ✅ | 정산 상태 (pending/completed) |
| settlementDate | string | ❌ | 정산 완료일 |
| paymentScheduledDate | string | ❌ | 지급 예정일 |
| memo | string | ❌ | 메모 |

---

## 🔐 인증 설정

### 현재 구현 (토큰 기반)

`/api/client.ts`에서:

```typescript
private getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // 인증 토큰 추가
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}
```

### 백엔드 구현 필요사항

1. **로그인 API**
   ```
   POST /api/auth/login
   
   Request:
   {
     email: string;
     password: string;
   }
   
   Response:
   {
     token: string;
     user: {
       id: number;
       name: string;
       email: string;
       role: string;
     }
   }
   ```

2. **토큰 검증**
   - 모든 API 요청 시 `Authorization` 헤더 확인
   - JWT 토큰 검증
   - 권한 확인 (Admin만 접근 가능)

3. **토큰 갱신**
   ```
   POST /api/auth/refresh
   
   Request:
   {
     refreshToken: string;
   }
   
   Response:
   {
     token: string;
   }
   ```

---

## ⚠️ 에러 처리

### 에러 응답 형식

모든 에러는 다음 형식으로 반환:

```typescript
{
  message: string;      // 사용자에게 보여줄 메시지
  code?: string;        // 에러 코드 (선택)
  status: number;       // HTTP 상태 코드
  details?: any;        // 추가 정보 (선택)
}
```

### HTTP 상태 코드

| 코드 | 의미 | 사용 예시 |
|------|------|-----------|
| 200 | OK | 성공적인 GET, PUT |
| 201 | Created | 성공적인 POST (생성) |
| 204 | No Content | 성공적인 DELETE |
| 400 | Bad Request | 잘못된 요청 데이터 |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 409 | Conflict | 중복된 데이터 |
| 500 | Internal Server Error | 서버 오류 |

### 프론트엔드 에러 처리

React Query가 자동으로 에러를 처리합니다:

```typescript
const { data, error, isError } = useReservationsQuery();

if (isError) {
  console.error(error.message);
  // 사용자에게 토스트 메시지 표시
}
```

---

## 🧪 테스트 방법

### 1. Mock 데이터로 테스트

```typescript
// /api/reservations.ts
const USE_MOCK = true; // Mock 사용
```

프론트엔드만으로 전체 기능 테스트 가능

### 2. 로컬 백엔드 연동

```env
REACT_APP_API_URL=http://localhost:3001/api
```

```typescript
const USE_MOCK = false; // 실제 API 사용
```

### 3. React Query DevTools 사용

개발 환경에서 자동으로 활성화됨:
- 브라우저 우측 하단에 아이콘 표시
- 쿼리 상태, 캐시 확인 가능
- 네트워크 요청 추적

### 4. API 테스트 도구

**Postman/Insomnia 컬렉션 예시:**

```json
{
  "name": "Sapiens Admin API",
  "requests": [
    {
      "name": "Get Reservations",
      "method": "GET",
      "url": "{{baseUrl}}/reservations",
      "headers": {
        "Authorization": "Bearer {{token}}"
      }
    },
    {
      "name": "Create Reservation",
      "method": "POST",
      "url": "{{baseUrl}}/reservations",
      "body": {
        "reservationDate": "2024-12-25",
        "expert": "김경일",
        ...
      }
    }
  ]
}
```

---

## ✅ 배포 체크리스트

### 환경 변수 확인

- [ ] `REACT_APP_API_URL` 프로덕션 URL로 설정
- [ ] `NODE_ENV=production` 설정
- [ ] API 키/시크릿 환경 변수로 관리

### API 전환 확인

- [ ] `/api/reservations.ts`에서 `USE_MOCK = false`
- [ ] `/api/settlements.ts`에서 `USE_MOCK = false`
- [ ] 모든 엔드포인트 URL 확인

### 보안 확인

- [ ] HTTPS 사용
- [ ] CORS 설정 확인
- [ ] 인증 토큰 암호화
- [ ] 민감한 데이터 로깅 제거

### 성능 확인

- [ ] React Query 캐시 전략 최적화
- [ ] API 응답 시간 확인
- [ ] 페이징 크기 조정
- [ ] 이미지 최적화

### 에러 처리 확인

- [ ] 전역 에러 핸들러 설정
- [ ] 사용자 친화적 에러 메시지
- [ ] 로그 수집 설정 (Sentry 등)

---

## 📞 문의

API 연동 중 문제가 발생하면:

1. **Mock 데이터 비교**: Mock 응답과 실제 API 응답 형식 비교
2. **네트워크 탭 확인**: 브라우저 개발자 도구에서 요청/응답 확인
3. **React Query DevTools**: 쿼리 상태 확인
4. **콘솔 로그**: 에러 메시지 확인

---

**Happy Coding! 🚀**
