# 💡 사용 예시 가이드

각 기능별 코드 사용 예시입니다.

---

## 📋 목차

1. [Context API 사용](#1-context-api-사용)
2. [React Query 사용](#2-react-query-사용)
3. [조합 사용](#3-조합-사용)
4. [실전 시나리오](#4-실전-시나리오)

---

## 1️⃣ Context API 사용

### 기본 사용법

```typescript
import { useReservations } from '../contexts/ReservationContext';

function ReservationList() {
  const { 
    reservations, 
    filterStatus, 
    setFilterStatus 
  } = useReservations();
  
  return (
    <div>
      <select 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">전체</option>
        <option value="pending">대기중</option>
        <option value="confirmed">확정</option>
        <option value="completed">완료</option>
      </select>
      
      {reservations.map(r => (
        <div key={r.id}>{r.topic}</div>
      ))}
    </div>
  );
}
```

### 예약 생성

```typescript
import { useReservations } from '../contexts/ReservationContext';

function CreateReservationForm() {
  const { addReservation } = useReservations();
  
  const handleSubmit = (formData) => {
    addReservation({
      reservationDate: formData.date,
      reservationTime: formData.time,
      expert: formData.expert,
      // ... 나머지 필드
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 예약 상태 변경

```typescript
import { useReservations } from '../contexts/ReservationContext';

function ReservationActions({ reservationId }) {
  const { 
    confirmReservation, 
    completeReservation, 
    cancelReservation 
  } = useReservations();
  
  return (
    <div>
      <button onClick={() => confirmReservation(reservationId)}>
        확정
      </button>
      <button onClick={() => completeReservation(reservationId)}>
        완료
      </button>
      <button onClick={() => cancelReservation(reservationId, '고객 요청')}>
        취소
      </button>
    </div>
  );
}
```

### 통계 조회

```typescript
import { useReservationStats } from '../contexts/ReservationContext';

function DashboardStats() {
  const stats = useReservationStats();
  
  return (
    <div>
      <div>대기중: {stats.pending}</div>
      <div>확정: {stats.confirmed}</div>
      <div>완료: {stats.completed}</div>
      <div>취소: {stats.cancelled}</div>
      <div>미정산: {stats.unsettled}</div>
      <div>총 정산액: {stats.totalSettled.toLocaleString()}원</div>
    </div>
  );
}
```

---

## 2️⃣ React Query 사용

### 목록 조회

```typescript
import { useReservationsQuery } from '../hooks/useReservationQueries';

function ReservationList() {
  const { data, isLoading, error } = useReservationsQuery({
    status: 'pending',
    page: 1,
    limit: 10
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data.map(reservation => (
        <div key={reservation.id}>
          <h3>{reservation.topic}</h3>
          <p>{reservation.expert} - {reservation.client}</p>
        </div>
      ))}
      
      <Pagination 
        currentPage={data?.page}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
```

### 상세 조회

```typescript
import { useReservationQuery } from '../hooks/useReservationQueries';

function ReservationDetail({ id }) {
  const { data: reservation, isLoading } = useReservationQuery(id);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{reservation.topic}</h2>
      <p>전문가: {reservation.expert}</p>
      <p>날짜: {reservation.reservationDate}</p>
      <p>상태: {reservation.status}</p>
    </div>
  );
}
```

### 생성 Mutation

```typescript
import { useCreateReservation } from '../hooks/useReservationQueries';
import { toast } from 'sonner@2.0.3';

function CreateReservationForm() {
  const mutation = useCreateReservation();
  
  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync(formData);
      toast.success('예약이 생성되었습니다!');
    } catch (error) {
      toast.error('예약 생성에 실패했습니다.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
      <button 
        type="submit" 
        disabled={mutation.isPending}
      >
        {mutation.isPending ? '저장 중...' : '예약 생성'}
      </button>
    </form>
  );
}
```

### 수정 Mutation

```typescript
import { useUpdateReservation } from '../hooks/useReservationQueries';

function EditReservationForm({ reservationId }) {
  const mutation = useUpdateReservation();
  
  const handleUpdate = (updates) => {
    mutation.mutate(
      { id: reservationId, data: updates },
      {
        onSuccess: () => {
          toast.success('수정되었습니다!');
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  };
  
  return <form>...</form>;
}
```

### 상태 변경 Mutation

```typescript
import { 
  useConfirmReservation,
  useCompleteReservation,
  useCancelReservation
} from '../hooks/useReservationQueries';

function ReservationActions({ reservationId }) {
  const confirmMutation = useConfirmReservation();
  const completeMutation = useCompleteReservation();
  const cancelMutation = useCancelReservation();
  
  return (
    <div>
      <button
        onClick={() => confirmMutation.mutate(reservationId)}
        disabled={confirmMutation.isPending}
      >
        확정
      </button>
      
      <button
        onClick={() => completeMutation.mutate(reservationId)}
        disabled={completeMutation.isPending}
      >
        완료
      </button>
      
      <button
        onClick={() => cancelMutation.mutate({
          id: reservationId,
          reason: '고객 요청'
        })}
        disabled={cancelMutation.isPending}
      >
        취소
      </button>
    </div>
  );
}
```

### 정산 자동 계산 + 생성

```typescript
import { 
  useCalculateSettlement,
  useCreateSettlement
} from '../hooks/useSettlementQueries';

function CreateSettlementForm({ reservation }) {
  const calculateMutation = useCalculateSettlement();
  const createMutation = useCreateSettlement();
  
  const [calculatedData, setCalculatedData] = useState(null);
  
  // 1단계: 자동 계산
  const handleCalculate = async () => {
    const result = await calculateMutation.mutateAsync({
      reservationId: reservation.id,
      revenue: reservation.fee,
      cost: 500000, // 비용
      profitRate: 60 // 전문가 비율
    });
    
    setCalculatedData(result);
  };
  
  // 2단계: 정산 생성
  const handleCreate = async () => {
    await createMutation.mutateAsync({
      reservationId: reservation.id,
      ...calculatedData,
      settlementStatus: 'pending',
      paymentScheduledDate: '2024-12-31'
    });
    
    toast.success('정산이 등록되었습니다!');
  };
  
  return (
    <div>
      <button onClick={handleCalculate}>
        {calculateMutation.isPending ? '계산 중...' : '자동 계산'}
      </button>
      
      {calculatedData && (
        <div>
          <p>순수익: {calculatedData.profit.toLocaleString()}원</p>
          <p>회사 수익: {calculatedData.commissionAmount.toLocaleString()}원</p>
          <p>정산 금액: {calculatedData.settlementAmount.toLocaleString()}원</p>
          
          <button onClick={handleCreate}>
            {createMutation.isPending ? '저장 중...' : '정산 등록'}
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## 3️⃣ 조합 사용

### Context + React Query

```typescript
import { useReservations } from '../contexts/ReservationContext';
import { useReservationsQuery } from '../hooks/useReservationQueries';

function SmartReservationList() {
  // Context에서 필터 상태 가져오기
  const { filterStatus } = useReservations();
  
  // React Query로 데이터 페칭
  const { data, isLoading } = useReservationsQuery({ 
    status: filterStatus 
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.data.map(r => (
        <ReservationCard key={r.id} reservation={r} />
      ))}
    </div>
  );
}
```

### 낙관적 업데이트 (Optimistic Update)

```typescript
import { useUpdateReservation } from '../hooks/useReservationQueries';
import { useQueryClient } from '@tanstack/react-query';

function QuickStatusChange({ reservationId }) {
  const queryClient = useQueryClient();
  const mutation = useUpdateReservation();
  
  const handleStatusChange = (newStatus) => {
    mutation.mutate(
      { 
        id: reservationId, 
        data: { status: newStatus } 
      },
      {
        // 낙관적 업데이트: API 응답 전에 UI 먼저 업데이트
        onMutate: async ({ id, data }) => {
          // 진행 중인 쿼리 취소
          await queryClient.cancelQueries({ 
            queryKey: ['reservations', 'detail', id] 
          });
          
          // 이전 데이터 백업
          const previous = queryClient.getQueryData(['reservations', 'detail', id]);
          
          // 즉시 UI 업데이트
          queryClient.setQueryData(['reservations', 'detail', id], (old) => ({
            ...old,
            ...data
          }));
          
          return { previous };
        },
        
        // 에러 시 롤백
        onError: (err, variables, context) => {
          if (context?.previous) {
            queryClient.setQueryData(
              ['reservations', 'detail', variables.id],
              context.previous
            );
          }
          toast.error('업데이트 실패');
        },
        
        // 성공 시 갱신
        onSettled: () => {
          queryClient.invalidateQueries({ 
            queryKey: ['reservations'] 
          });
        }
      }
    );
  };
  
  return (
    <select onChange={(e) => handleStatusChange(e.target.value)}>
      <option value="pending">대기중</option>
      <option value="confirmed">확정</option>
      <option value="completed">완료</option>
    </select>
  );
}
```

---

## 4️⃣ 실전 시나리오

### 시나리오 1: 예약 → 확정 → 완료 → 정산

```typescript
function ReservationWorkflow({ reservationId }) {
  const reservation = useReservationQuery(reservationId);
  const settlement = useSettlementByReservationQuery(reservationId);
  
  const confirmMutation = useConfirmReservation();
  const completeMutation = useCompleteReservation();
  const createSettlementMutation = useCreateSettlement();
  const completeSettlementMutation = useCompleteSettlement();
  
  // 1. 예약 확정
  const handleConfirm = () => {
    confirmMutation.mutate(reservationId, {
      onSuccess: () => toast.success('예약이 확정되었습니다!')
    });
  };
  
  // 2. 강연 완료
  const handleComplete = () => {
    completeMutation.mutate(reservationId, {
      onSuccess: () => toast.success('강연이 완료되었습니다!')
    });
  };
  
  // 3. 정산 등록
  const handleCreateSettlement = async () => {
    const calculated = await calculateSettlement({
      reservationId,
      revenue: reservation.data.fee,
      cost: 500000,
      profitRate: 60
    });
    
    createSettlementMutation.mutate(
      {
        reservationId,
        ...calculated,
        settlementStatus: 'pending'
      },
      {
        onSuccess: () => toast.success('정산이 등록되었습니다!')
      }
    );
  };
  
  // 4. 정산 완료
  const handleCompleteSettlement = () => {
    completeSettlementMutation.mutate(settlement.data.id, {
      onSuccess: () => toast.success('정산이 완료되었습니다!')
    });
  };
  
  return (
    <div>
      {/* 상태에 따라 버튼 표시 */}
      {reservation.data?.status === 'pending' && (
        <button onClick={handleConfirm}>예약 확정</button>
      )}
      
      {reservation.data?.status === 'confirmed' && (
        <button onClick={handleComplete}>강연 완료</button>
      )}
      
      {reservation.data?.status === 'completed' && !settlement.data && (
        <button onClick={handleCreateSettlement}>정산 등록</button>
      )}
      
      {settlement.data?.settlementStatus === 'pending' && (
        <button onClick={handleCompleteSettlement}>정산 완료</button>
      )}
    </div>
  );
}
```

### 시나리오 2: 대시보드 실시간 통계

```typescript
import { useReservationStatsQuery } from '../hooks/useReservationQueries';
import { useSettlementStatsQuery } from '../hooks/useSettlementQueries';

function Dashboard() {
  // 자동 갱신: 5분마다
  const reservationStats = useReservationStatsQuery();
  const settlementStats = useSettlementStatsQuery();
  
  // 수동 갱신
  const handleRefresh = () => {
    reservationStats.refetch();
    settlementStats.refetch();
  };
  
  return (
    <div>
      <button onClick={handleRefresh}>
        새로고침 {reservationStats.isFetching && '...'}
      </button>
      
      <div className="stats-grid">
        <StatCard
          title="전체 예약"
          value={reservationStats.data?.total}
          loading={reservationStats.isLoading}
        />
        <StatCard
          title="대기중"
          value={reservationStats.data?.pending}
        />
        <StatCard
          title="완료"
          value={reservationStats.data?.completed}
        />
        <StatCard
          title="정산 완료"
          value={settlementStats.data?.completed}
        />
        <StatCard
          title="총 정산액"
          value={`${settlementStats.data?.completedAmount.toLocaleString()}원`}
        />
      </div>
    </div>
  );
}
```

### 시나리오 3: 검색 + 필터링 + 페이징

```typescript
import { useState } from 'react';
import { useReservationsQuery } from '../hooks/useReservationQueries';

function AdvancedReservationList() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('all');
  const [expert, setExpert] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  const { data, isLoading } = useReservationsQuery({
    page,
    limit: 20,
    status: status !== 'all' ? status : undefined,
    expert: expert || undefined,
    startDate: dateRange.start || undefined,
    endDate: dateRange.end || undefined
  });
  
  return (
    <div>
      {/* 필터 */}
      <div className="filters">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">전체</option>
          <option value="pending">대기중</option>
          <option value="confirmed">확정</option>
          <option value="completed">완료</option>
        </select>
        
        <input
          type="text"
          placeholder="전문가 검색"
          value={expert}
          onChange={(e) => setExpert(e.target.value)}
        />
        
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
        />
      </div>
      
      {/* 목록 */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data?.data.map(reservation => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
          
          {/* 페이징 */}
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
```

---

## 🎯 Best Practices

### 1. Loading 상태 처리

```typescript
function ReservationList() {
  const { data, isLoading, isFetching } = useReservationsQuery();
  
  return (
    <div>
      {/* 초기 로딩 */}
      {isLoading && <Skeleton />}
      
      {/* 백그라운드 갱신 표시 */}
      {isFetching && !isLoading && (
        <div className="refresh-indicator">갱신 중...</div>
      )}
      
      {/* 데이터 */}
      {data?.data.map(...)}
    </div>
  );
}
```

### 2. 에러 처리

```typescript
function ReservationList() {
  const { data, error, isError } = useReservationsQuery();
  
  if (isError) {
    return (
      <div className="error-container">
        <p>데이터를 불러올 수 없습니다.</p>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  }
  
  return <div>...</div>;
}
```

### 3. 의존성 쿼리

```typescript
function ReservationWithSettlement({ reservationId }) {
  // 예약 먼저 조회
  const { data: reservation } = useReservationQuery(reservationId);
  
  // 예약이 완료된 경우에만 정산 조회
  const { data: settlement } = useSettlementByReservationQuery(
    reservationId,
    {
      enabled: reservation?.status === 'completed'
    }
  );
  
  return <div>...</div>;
}
```

---

## 📚 더 알아보기

- [React Query 공식 문서](https://tanstack.com/query/latest)
- [Context API 가이드](https://react.dev/reference/react/useContext)
- [API 연동 가이드](./API_INTEGRATION_GUIDE.md)

---

**Happy Coding! 🎉**
