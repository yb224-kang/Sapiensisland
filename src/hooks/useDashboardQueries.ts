import { useQuery } from '@tanstack/react-query';

// 예약 상태별 통계 타입
export interface ReservationsByStatus {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

// 대시보드 통계 데이터 타입
export interface DashboardStats {
  totalReservations: number;
  completedReservations: number;
  pendingReservations: number;
  totalRevenue: number;
  averageRating: number;
  activeExperts: number;
  reservationsByStatus: ReservationsByStatus;
  totalSettlements: number;
  pendingInquiries: number;
}

// 월별 통계 데이터 타입
export interface MonthlyStats {
  month: string;
  reservations: number;
  bookings: number; // reservations의 별칭
  revenue: number;
  completedReservations: number;
  profit: number;
  cost: number;
  settlement: number;
}

// Mock 데이터 생성 함수
const generateMockStats = (): DashboardStats => {
  return {
    totalReservations: 156,
    completedReservations: 123,
    pendingReservations: 33,
    totalRevenue: 45600000,
    averageRating: 4.8,
    activeExperts: 24,
    reservationsByStatus: {
      pending: 33,
      confirmed: 50,
      completed: 123,
      cancelled: 10,
    },
    totalSettlements: 10000000,
    pendingInquiries: 5,
  };
};

const generateMockMonthlyStats = (): MonthlyStats[] => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월'];
  return months.map((month) => {
    const reservations = Math.floor(Math.random() * 30) + 10;
    const revenue = Math.floor(Math.random() * 10) + 5; // 백만원 단위 (5M ~ 15M)
    const cost = Math.floor(Math.random() * 3) + 1; // 백만원 단위 (1M ~ 4M)
    const settlement = Math.floor(Math.random() * 2) + 0.5; // 백만원 단위 (0.5M ~ 2.5M)
    const profit = revenue - cost - settlement;
    
    return {
      month,
      reservations,
      bookings: reservations, // reservations의 별칭
      revenue,
      completedReservations: Math.floor(Math.random() * 25) + 5,
      profit,
      cost,
      settlement,
    };
  });
};

// 대시보드 통계 조회 Hook
export function useDashboardStatsQuery() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // TODO: 백엔드 API 연동
      // const response = await fetch('/api/admin/dashboard/stats');
      // return response.json();
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300)); // 로딩 시뮬레이션
      return generateMockStats();
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 월별 통계 조회 Hook
export function useMonthlyStatsQuery() {
  return useQuery<MonthlyStats[]>({
    queryKey: ['monthlyStats'],
    queryFn: async () => {
      // TODO: 백엔드 API 연동
      // const response = await fetch('/api/admin/dashboard/monthly-stats');
      // return response.json();
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300)); // 로딩 시뮬레이션
      return generateMockMonthlyStats();
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
}
