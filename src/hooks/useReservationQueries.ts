import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Reservation } from '../data/mockData';

// API 응답 타입
export interface ReservationsResponse {
  reservations: Reservation[];
  total: number;
  page: number;
  limit: number;
}

// 쿼리 파라미터 타입
export interface ReservationsQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  expertId?: number;
  startDate?: string;
  endDate?: string;
}

// Mock 예약 데이터 생성
const generateMockReservations = (count: number = 10): Reservation[] => {
  const mockReservations: Reservation[] = [];
  const statuses: Array<'pending' | 'confirmed' | 'completed' | 'cancelled'> = ['pending', 'confirmed', 'completed', 'cancelled'];
  const expertNames = ['김민수', '이영희', '박철수', '정미경', '최대호'];
  const agencies = ['삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '네이버'];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));
    
    mockReservations.push({
      id: i + 1,
      expertId: Math.floor(Math.random() * 5) + 1,
      expertName: expertNames[Math.floor(Math.random() * expertNames.length)],
      date: date.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 8) + 10}:00`,
      location: Math.random() > 0.5 ? '온라인' : '서울시 강남구',
      region: '서울',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      agency: agencies[Math.floor(Math.random() * agencies.length)],
      client: `담당자${i + 1}`,
      topic: `강연 주제 ${i + 1}`,
      audience: `일반 직원 ${Math.floor(Math.random() * 100) + 20}명`,
      contactName: `담당자${i + 1}`,
      contactPhone: '010-1234-5678',
      contactEmail: `contact${i + 1}@example.com`,
      fee: Math.floor(Math.random() * 3000000) + 1000000,
      message: i % 3 === 0 ? `추가 요청사항 ${i + 1}` : undefined,
    });
  }
  
  return mockReservations;
};

// 예약 목록 조회 Hook
export function useReservationsQuery(params: ReservationsQueryParams = {}) {
  return useQuery<ReservationsResponse>({
    queryKey: ['reservations', params],
    queryFn: async () => {
      // TODO: 백엔드 API 연동
      // const queryString = new URLSearchParams(params as any).toString();
      // const response = await fetch(`/api/reservations?${queryString}`);
      // return response.json();
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300)); // 로딩 시뮬레이션
      
      const allReservations = generateMockReservations(50);
      const { page = 1, limit = 10, status, expertId } = params;
      
      // 필터링
      let filtered = allReservations;
      if (status && status !== 'all') {
        filtered = filtered.filter(r => r.status === status);
      }
      if (expertId) {
        filtered = filtered.filter(r => r.expertId === expertId);
      }
      
      // 페이지네이션
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedReservations = filtered.slice(startIndex, endIndex);
      
      return {
        reservations: paginatedReservations,
        total: filtered.length,
        page,
        limit,
      };
    },
    staleTime: 1000 * 60, // 1분
  });
}

// 예약 생성 Hook
export function useCreateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reservationData: Partial<Reservation>) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch('/api/reservations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(reservationData),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, id: Math.floor(Math.random() * 1000) + 100 };
    },
    onSuccess: () => {
      // 예약 목록 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}

// 예약 수정 Hook
export function useUpdateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Reservation> }) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch(`/api/reservations/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}

// 예약 삭제 Hook
export function useDeleteReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch(`/api/reservations/${id}`, {
      //   method: 'DELETE',
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}
