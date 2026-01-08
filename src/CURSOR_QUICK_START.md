# 🚀 Cursor 빠른 시작 가이드

> **지금 바로 Cursor로 `/api`와 `/hooks` 폴더를 자동 생성하세요!**

**작성일**: 2026-01-06  
**소요 시간**: 5분  
**현재 상태**: `/api`와 `/hooks` 폴더가 삭제된 상태 (정상)

---

## ✅ 현재 상태

```
✅ /api/ 폴더 삭제 완료
✅ /hooks/ 폴더 삭제 완료
✅ /data/mockData.ts 보존됨 (중요!)
✅ /docs/ 문서 준비 완료
```

---

## 🎯 지금 할 일

### **Step 1: Cursor 열기**

```bash
# 현재 디렉토리에서 Cursor 실행
cursor .
```

---

### **Step 2: 아래 프롬프트를 Cursor에 복사**

````markdown
docs/FRONTEND_CODE_GENERATION.md를 읽고 프론트엔드 API 호출 코드를 생성해주세요.

## 요구사항

### 기술 스택
- TypeScript
- Vite + React
- React Query v5
- 환경변수: import.meta.env.VITE_API_URL

### 생성할 파일
1. `/api/types.ts` - API 타입 정의
2. `/api/client.ts` - HTTP 클라이언트
3. `/api/reservations.ts` - 예약 API (USE_MOCK 플래그 포함)
4. `/api/settlements.ts` - 정산 API (USE_MOCK 플래그 포함)
5. `/api/inquiries.ts` - 문의 API (USE_MOCK 플래그 포함)
6. `/api/dashboard.ts` - 대시보드 API (USE_MOCK 플래그 포함)
7. `/hooks/useReservationQueries.ts` - 예약 React Query 훅
8. `/hooks/useSettlementQueries.ts` - 정산 React Query 훅
9. `/hooks/useInquiryQueries.ts` - 문의 React Query 훅
10. `/hooks/useDashboardQueries.ts` - 대시보드 React Query 훅

### 중요 요구사항

#### 1. USE_MOCK 플래그
각 API 파일에 다음과 같은 플래그를 포함하세요:

```typescript
const USE_MOCK = true; // false로 변경하면 실제 API 호출
```

#### 2. Mock 데이터
- Mock 데이터는 `/data/mockData.ts`에서 import
- USE_MOCK이 true일 때만 사용
- 실제 API 응답 형식과 동일하게 변환

#### 3. 에러 처리
- 모든 API 호출에 try-catch 포함
- 에러 타입 정의
- 사용자 친화적 에러 메시지

#### 4. TypeScript
- 모든 타입을 `/api/types.ts`에 정의
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

#### /api/client.ts
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

#### /api/reservations.ts
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

// getReservation, createReservation, updateReservation, deleteReservation 등
// 모든 CRUD 함수를 동일한 패턴으로 구현해주세요.
```

#### /hooks/useReservationQueries.ts
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getReservations, 
  createReservation, 
  updateReservation, 
  deleteReservation,
  confirmReservation,
  completeReservation,
  cancelReservation
} from '../api/reservations';
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

// useUpdateReservation, useDeleteReservation, useConfirmReservation 등
// 모든 mutation 훅을 동일한 패턴으로 구현해주세요.
```

### 참고사항
1. Mock 데이터는 `/data/mockData.ts`에 이미 정의되어 있음
2. 모든 타입은 docs/API_SPECIFICATION.md의 "데이터 타입 정의" 섹션 참고
3. 페이지네이션, 필터링, 정렬은 API 명세에 정의된 대로 구현
4. 모든 API 함수에 JSDoc 주석 추가
5. settlements, inquiries, dashboard API도 동일한 패턴으로 구현

이제 모든 파일을 생성해주세요!
````

---

### **Step 3: 생성 확인**

```bash
# 생성된 파일 확인
ls -la api/
# 예상: client.ts, types.ts, reservations.ts, settlements.ts, inquiries.ts, dashboard.ts

ls -la hooks/
# 예상: useReservationQueries.ts, useSettlementQueries.ts, useInquiryQueries.ts, useDashboardQueries.ts
```

---

### **Step 4: 테스트**

```bash
# 개발 서버 실행
npm run dev

# TypeScript 컴파일 확인
npm run build
```

---

## 📋 생성될 파일 목록

### **/api/ 폴더**

```
✅ /api/types.ts              - 모든 타입 정의
✅ /api/client.ts             - HTTP 클라이언트
✅ /api/reservations.ts       - 예약 API (USE_MOCK=true)
✅ /api/settlements.ts        - 정산 API (USE_MOCK=true)
✅ /api/inquiries.ts          - 문의 API (USE_MOCK=true)
✅ /api/dashboard.ts          - 대시보드 API (USE_MOCK=true)
```

### **/hooks/ 폴더**

```
✅ /hooks/useReservationQueries.ts   - 예약 React Query 훅
✅ /hooks/useSettlementQueries.ts    - 정산 React Query 훅
✅ /hooks/useInquiryQueries.ts       - 문의 React Query 훅
✅ /hooks/useDashboardQueries.ts     - 대시보드 React Query 훅
```

---

## 🔍 생성 후 확인 사항

### **1. TypeScript 에러 확인**

```typescript
// 에러가 없어야 함
npm run build
```

### **2. Mock 데이터 작동 확인**

```typescript
// 컴포넌트에서 테스트
import { useReservationsQuery } from './hooks/useReservationQueries';

function TestComponent() {
  const { data, isLoading } = useReservationsQuery();
  console.log(data); // mockData.ts의 데이터가 나와야 함
}
```

### **3. USE_MOCK 플래그 확인**

```typescript
// /api/reservations.ts
const USE_MOCK = true; // ✅ 이게 있어야 함
```

---

## 🚨 문제 해결

### **문제 1: Cursor가 파일을 생성하지 않음**

```
해결:
1. docs/FRONTEND_CODE_GENERATION.md 파일이 있는지 확인
2. docs/API_SPECIFICATION.md 파일이 있는지 확인
3. 프롬프트를 다시 복사하여 붙여넣기
```

### **문제 2: TypeScript 에러 발생**

```
해결:
1. /api/types.ts에 모든 타입이 정의되었는지 확인
2. import 경로가 정확한지 확인
3. npm install @tanstack/react-query 확인
```

### **문제 3: Mock 데이터가 작동하지 않음**

```
해결:
1. /data/mockData.ts 파일이 있는지 확인
2. USE_MOCK = true인지 확인
3. import 경로 확인: import { reservations } from '../data/mockData'
```

---

## 💡 추가 팁

### **일부만 재생성하고 싶을 때**

```
"docs/API_SPECIFICATION.md를 보고 /api/reservations.ts만 재생성해주세요.
USE_MOCK 플래그와 Mock 데이터 처리를 포함해야 합니다."
```

### **새로운 API 추가**

```
"docs/API_SPECIFICATION.md를 보고 /api/partners.ts와 
/hooks/usePartnerQueries.ts를 생성해주세요."
```

---

## 🎯 완료 체크리스트

- [ ] Cursor 프롬프트 복사 완료
- [ ] Cursor에 붙여넣기 완료
- [ ] `/api/` 폴더에 6개 파일 생성됨
- [ ] `/hooks/` 폴더에 4개 파일 생성됨
- [ ] `npm run build` 성공
- [ ] Mock 데이터 정상 작동
- [ ] Git 커밋 완료

---

## 🎉 완료!

이제 5분 만에 완벽한 API 코드가 생성되었습니다!

**다음 단계:**
1. ✅ 컴포넌트에서 훅 사용
2. ✅ Mock 데이터로 개발
3. ✅ 백엔드 준비되면 `USE_MOCK = false`
4. ✅ 배포!

---

**이 파일은 생성 후 삭제해도 됩니다.**  
모든 정보는 `docs/FRONTEND_CODE_GENERATION.md`에 있습니다.

---

**Happy Coding! 🚀**
