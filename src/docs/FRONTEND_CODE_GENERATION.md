# 🎨 프론트엔드 API 코드 자동 생성 가이드

> **Cursor AI로 API 호출 코드를 5분 만에 자동 생성!**  
> Figma는 디자인만, Cursor는 API 로직을 담당합니다.

**최종 업데이트**: 2026-01-06  
**대상**: 프론트엔드 개발자  
**목적**: Cursor AI로 `frontend/api` 폴더의 모든 코드를 자동 생성

---

## 📋 목차

1. [왜 Cursor 자동 생성인가?](#왜-cursor-자동-생성인가)
2. [Cursor 프롬프트](#cursor-프롬프트)
3. [생성되는 파일](#생성되는-파일)
4. [사용 방법](#사용-방법)
5. [Mock ↔ Real API 전환](#mock--real-api-전환)

---

## 왜 Cursor 자동 생성인가?

### **수동 작성 방식** ❌

```
프론트엔드 개발자가 손으로 작성:
- /api/client.ts           (30분)
- /api/types.ts            (30분)
- /api/reservations.ts     (1시간)
- /api/settlements.ts      (1시간)
- /hooks/useReservationQueries.ts  (1시간)
= 총 4시간 😫
```

### **Cursor 자동 생성** ✅

```
1. Cursor 프롬프트 복사
2. Cursor에 붙여넣기
3. 자동 생성 완료!
= 5분 🚀
```

---

## Cursor 프롬프트

### **전체 프롬프트 (복사하여 Cursor에 붙여넣기)**

````markdown
docs/API_SPECIFICATION.md를 읽고 프론트엔드 API 호출 코드를 생성해주세요.

## 요구사항

### 기술 스택
- TypeScript
- Vite + React
- React Query v5
- 환경변수: import.meta.env.VITE_API_URL

### 생성할 파일
1. `frontend/api/types.ts` - API 타입 정의
2. `frontend/api/client.ts` - HTTP 클라이언트
3. `frontend/api/reservations.ts` - 예약 API (USE_MOCK 플래그 포함)
4. `frontend/api/settlements.ts` - 정산 API (USE_MOCK 플래그 포함)
5. `frontend/api/inquiries.ts` - 문의 API (USE_MOCK 플래그 포함)
6. `frontend/api/dashboard.ts` - 대시보드 API (USE_MOCK 플래그 포함)
7. `frontend/hooks/useReservationQueries.ts` - 예약 React Query 훅
8. `frontend/hooks/useSettlementQueries.ts` - 정산 React Query 훅
9. `frontend/hooks/useInquiryQueries.ts` - 문의 React Query 훅
10. `frontend/hooks/useDashboardQueries.ts` - 대시보드 React Query 훅

### 중요 요구사항

#### 1. USE_MOCK 플래그
각 API 파일에 다음과 같은 플래그를 포함하세요:

```typescript
const USE_MOCK = true; // false로 변경하면 실제 API 호출
```

#### 2. Mock 데이터
- Mock 데이터는 `frontend/data/mockData.ts`에서 import
- USE_MOCK이 true일 때만 사용
- 실제 API 응답 형식과 동일하게 변환

#### 3. 에러 처리
- 모든 API 호출에 try-catch 포함
- 에러 타입 정의
- 사용자 친화적 에러 메시지

#### 4. TypeScript
- 모든 타입을 `frontend/api/types.ts`에 정의
- docs/API_SPECIFICATION.md의 타입 정의 참고
- strict mode 호환

#### 5. React Query
- queryKey 일관성 유지
- staleTime: 5분
- retry: 1회
- refetchOnWindowFocus: false

#### 6. 공통 응답 형식
모든 API는 다음 형식을 따릅니다:

```typescript
// 성공
{
  success: true,
  data: { /* 실제 데이터 */ }
}

// 에러
{
  success: false,
  error: {
    code: string,
    message: string
  }
}
```

### 예시 코드 구조

#### frontend/api/client.ts
```typescript
import { ApiError } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP_${response.status}`,
          `HTTP Error: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('NETWORK_ERROR', '네트워크 오류가 발생했습니다.');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
```

#### frontend/api/reservations.ts
```typescript
import { apiClient } from './client';
import type { Reservation, CreateReservationDTO, ApiResponse } from './types';
import { reservations } from '../data/mockData';

const USE_MOCK = true;

/**
 * 예약 목록 조회
 */
export const getReservations = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<Reservation[]> => {
  if (USE_MOCK) {
    // Mock 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredData = [...reservations];
        
        // 상태 필터
        if (params?.status && params.status !== 'all') {
          filteredData = filteredData.filter(r => r.status === params.status);
        }
        
        // 검색
        if (params?.search) {
          const search = params.search.toLowerCase();
          filteredData = filteredData.filter(r =>
            r.expert.toLowerCase().includes(search) ||
            r.agency.toLowerCase().includes(search) ||
            r.contactName.toLowerCase().includes(search)
          );
        }
        
        // 페이지네이션
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;
        
        resolve(filteredData.slice(start, end));
      }, 500); // 네트워크 지연 시뮬레이션
    });
  }

  // 실제 API 호출
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);

  const response = await apiClient.get<ApiResponse<{ reservations: Reservation[] }>>(
    `/reservations?${queryParams.toString()}`
  );
  
  if (!response.success || !response.data) {
    throw new Error(response.error?.message || '예약 목록 조회 실패');
  }
  
  return response.data.reservations;
};

// 다른 함수들도 동일한 패턴으로 구현...
```

#### frontend/hooks/useReservationQueries.ts
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReservations, createReservation, updateReservation, deleteReservation } from '../api/reservations';
import type { CreateReservationDTO } from '../api/types';

export const useReservationsQuery = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['reservations', params],
    queryFn: () => getReservations(params),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateReservationDTO) => createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

// 다른 훅들도 동일한 패턴으로 구현...
```

### 참고사항
1. Mock 데이터는 `frontend/data/mockData.ts`에 이미 정의되어 있음
2. 모든 타입은 docs/API_SPECIFICATION.md의 "데이터 타입 정의" 섹션 참고
3. 페이지네이션, 필터링, 정렬은 API 명세에 정의된 대로 구현
4. JWT 인증이 필요한 API는 localStorage에서 토큰 가져오기

이제 모든 파일을 생성해주세요!
````

---

## 생성되는 파일

### **API 파일** (`frontend/api/`)

```
frontend/api/
├─ types.ts              # 모든 타입 정의
├─ client.ts             # HTTP 클라이언트
├─ reservations.ts       # 예약 API
├─ settlements.ts        # 정산 API
├─ inquiries.ts          # 문의 API
└─ dashboard.ts          # 대시보드 API
```

### **React Query 훅** (`frontend/hooks/`)

```
frontend/hooks/
├─ useReservationQueries.ts   # 예약 훅
├─ useSettlementQueries.ts    # 정산 훅
├─ useInquiryQueries.ts       # 문의 훅
└─ useDashboardQueries.ts     # 대시보드 훅
```

---

## 사용 방법

### **Step 1: 백업 (선택)**

```bash
# 기존 api 폴더 백업
mv frontend/api frontend/api_backup
mv frontend/hooks frontend/hooks_backup
```

### **Step 2: Cursor 실행**

1. Cursor 열기
2. 위의 **전체 프롬프트** 복사
3. Cursor에 붙여넣기
4. 자동 생성 완료!

### **Step 3: 생성 확인**

```bash
# 생성된 파일 확인
ls -la frontend/api/
# client.ts, types.ts, reservations.ts, settlements.ts, inquiries.ts, dashboard.ts

ls -la frontend/hooks/
# useReservationQueries.ts, useSettlementQueries.ts, useInquiryQueries.ts, useDashboardQueries.ts
```

### **Step 4: 컴포넌트에서 사용**

```typescript
// 예시: 예약 목록 조회
import { useReservationsQuery } from '../hooks/useReservationQueries';

function ReservationsPage() {
  const { data, isLoading, error } = useReservationsQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(reservation => (
        <div key={reservation.id}>
          {reservation.expert} - {reservation.agency}
        </div>
      ))}
    </div>
  );
}
```

---

## Mock ↔ Real API 전환

### **Mock 모드 (개발)** 📊

```typescript
// frontend/api/reservations.ts
const USE_MOCK = true;  // ← Mock 데이터 사용

// 백엔드 없이 개발 가능!
npm run dev
```

### **Real API 모드 (운영)** 🔗

```typescript
// frontend/api/reservations.ts
const USE_MOCK = false;  // ← 실제 API 호출

// .env
VITE_API_URL=https://api.sapiens-island.com/api

// 실제 API 연동!
npm run dev
```

---

## 🎯 체크리스트

### **생성 완료**

- [ ] `frontend/api/types.ts` 생성됨
- [ ] `frontend/api/client.ts` 생성됨
- [ ] `frontend/api/reservations.ts` 생성됨 (USE_MOCK 포함)
- [ ] `frontend/api/settlements.ts` 생성됨 (USE_MOCK 포함)
- [ ] `frontend/api/inquiries.ts` 생성됨 (USE_MOCK 포함)
- [ ] `frontend/api/dashboard.ts` 생성됨 (USE_MOCK 포함)
- [ ] `frontend/hooks/useReservationQueries.ts` 생성됨
- [ ] `frontend/hooks/useSettlementQueries.ts` 생성됨
- [ ] `frontend/hooks/useInquiryQueries.ts` 생성됨
- [ ] `frontend/hooks/useDashboardQueries.ts` 생성됨

### **테스트**

- [ ] TypeScript 컴파일 성공 (`npm run build`)
- [ ] Mock 데이터 정상 작동
- [ ] 컴포넌트에서 훅 사용 가능

---

## 💡 추가 팁

### **일부 파일만 재생성**

```
docs/API_SPECIFICATION.md를 보고 frontend/api/reservations.ts만 재생성해주세요.
USE_MOCK 플래그와 Mock 데이터 처리 로직을 포함해야 합니다.
```

### **새로운 API 추가**

```
docs/API_SPECIFICATION.md에 새로운 "파트너사" API가 추가되었습니다.
frontend/api/partners.ts 파일과 frontend/hooks/usePartnerQueries.ts를 생성해주세요.
```

### **에러 발생 시**

```bash
# 전체 삭제 후 재생성
rm -rf frontend/api frontend/hooks
mkdir frontend/api frontend/hooks

# Cursor 프롬프트 다시 실행
```

---

## 🎉 완료!

이제 프론트엔드 개발자는:
- ✅ **Figma**: UI/컴포넌트만 집중
- ✅ **Cursor**: API 코드 자동 생성 (5분)
- ✅ **디자인에만 집중** 가능!

---

**다음 단계:**
1. 컴포넌트에서 훅 사용
2. Mock 데이터로 개발
3. 백엔드 준비되면 `USE_MOCK = false` 변경
4. 배포!

**Happy Coding! 🚀**

---

**Last Updated**: 2026-01-06  
**Cursor AI 호환**: ✅
