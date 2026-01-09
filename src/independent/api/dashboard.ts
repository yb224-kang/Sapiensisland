// 대시보드 API 클라이언트

import { apiClient } from './client';
import type { DashboardStats, MonthlyStats } from './types';

// Mock 데이터 사용 여부
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/**
 * 대시보드 통계 조회
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalReservations: 0,
          reservationsByStatus: {
            pending: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
          },
          totalRevenue: 0,
          totalSettlements: 0,
          pendingInquiries: 0,
        });
      }, 300);
    });
  }

  return apiClient.get<DashboardStats>('/dashboard/stats');
};

/**
 * 월별 통계 조회
 */
export const getMonthlyStats = async (): Promise<MonthlyStats[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  }

  return apiClient.get<MonthlyStats[]>('/dashboard/monthly');
};

