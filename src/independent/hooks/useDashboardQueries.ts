// 대시보드 관련 React Query hooks

import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getMonthlyStats } from '../api/dashboard';

/**
 * 대시보드 통계 조회 훅
 */
export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => getDashboardStats(),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * 월별 통계 조회 훅
 */
export const useMonthlyStatsQuery = () => {
  return useQuery({
    queryKey: ['dashboard', 'monthly'],
    queryFn: () => getMonthlyStats(),
    staleTime: 1000 * 60 * 10, // 10분 (월별 통계는 자주 변경되지 않음)
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

