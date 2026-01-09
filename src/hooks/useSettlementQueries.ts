import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Settlement, Reservation } from '../data/mockData';

// API 응답 타입
export interface SettlementsResponse {
  settlements: Settlement[];
  total: number;
}

export interface UnsettledReservationsResponse {
  reservations: Reservation[];
  totalUnsettledAmount: number;
}

// 쿼리 파라미터 타입
export interface SettlementsQueryParams {
  status?: 'all' | 'pending' | 'completed';
  expertId?: number;
  startDate?: string;
  endDate?: string;
}

// Mock 정산 데이터 생성
const generateMockSettlements = (): Settlement[] => {
  const mockSettlements: Settlement[] = [];
  const expertNames = ['김민수', '이영희', '박철수', '정미경', '최대호'];
  const statuses: Array<'pending' | 'completed'> = ['pending', 'completed'];
  
  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    const totalAmount = Math.floor(Math.random() * 5000000) + 1000000;
    const commission = Math.floor(totalAmount * 0.15);
    
    mockSettlements.push({
      id: i + 1,
      expertId: Math.floor(Math.random() * 5) + 1,
      expertName: expertNames[Math.floor(Math.random() * expertNames.length)],
      month: date.toISOString().slice(0, 7),
      totalReservations: Math.floor(Math.random() * 10) + 1,
      totalAmount,
      commission,
      netAmount: totalAmount - commission,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: date.toISOString(),
      paidAt: statuses[i % 2] === 'completed' ? date.toISOString() : undefined,
    });
  }
  
  return mockSettlements;
};

// Mock 미정산 예약 데이터 생성
const generateMockUnsettledReservations = (): Reservation[] => {
  const mockReservations: Reservation[] = [];
  const expertNames = ['김민수', '이영희', '박철수', '정미경', '최대호'];
  const agencies = ['삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '네이버'];
  
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    mockReservations.push({
      id: i + 100,
      expertId: Math.floor(Math.random() * 5) + 1,
      expertName: expertNames[Math.floor(Math.random() * expertNames.length)],
      date: date.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 8) + 10}:00`,
      location: Math.random() > 0.5 ? '온라인' : '서울시 강남구',
      region: '서울',
      status: 'completed',
      agency: agencies[Math.floor(Math.random() * agencies.length)],
      client: `담당자${i + 1}`,
      topic: `강연 주제 ${i + 1}`,
      audience: `일반 직원 ${Math.floor(Math.random() * 100) + 20}명`,
      contactName: `담당자${i + 1}`,
      contactPhone: '010-1234-5678',
      contactEmail: `contact${i + 1}@example.com`,
      fee: Math.floor(Math.random() * 3000000) + 1000000,
    });
  }
  
  return mockReservations;
};

// 정산 목록 조회 Hook
export function useSettlementsQuery(params: SettlementsQueryParams = {}) {
  return useQuery<SettlementsResponse>({
    queryKey: ['settlements', params],
    queryFn: async () => {
      // TODO: 백엔드 API 연동
      // const queryString = new URLSearchParams(params as any).toString();
      // const response = await fetch(`/api/settlements?${queryString}`);
      // return response.json();
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allSettlements = generateMockSettlements();
      const { status } = params;
      
      // 필터링
      let filtered = allSettlements;
      if (status && status !== 'all') {
        filtered = filtered.filter(s => s.status === status);
      }
      
      return {
        settlements: filtered,
        total: filtered.length,
      };
    },
    staleTime: 1000 * 60, // 1분
  });
}

// 미정산 예약 조회 Hook
export function useUnsettledReservationsQuery() {
  return useQuery<UnsettledReservationsResponse>({
    queryKey: ['unsettledReservations'],
    queryFn: async () => {
      // TODO: 백엔드 API 연동
      // const response = await fetch('/api/settlements/unsettled');
      // return response.json();
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const reservations = generateMockUnsettledReservations();
      const totalUnsettledAmount = reservations.reduce((sum, r) => sum + (r.fee || 0), 0);
      
      return {
        reservations,
        totalUnsettledAmount,
      };
    },
    staleTime: 1000 * 60, // 1분
  });
}

// 정산 생성 Hook
export function useCreateSettlement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settlementData: Partial<Settlement>) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch('/api/settlements', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settlementData),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, id: Math.floor(Math.random() * 1000) + 100 };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settlements'] });
      queryClient.invalidateQueries({ queryKey: ['unsettledReservations'] });
    },
  });
}

// 정산 상태 변경 Hook
export function useUpdateSettlementStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'pending' | 'completed' }) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch(`/api/settlements/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status }),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settlements'] });
    },
  });
}
