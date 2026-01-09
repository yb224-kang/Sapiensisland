// 정산 API 클라이언트

import { apiClient } from './client';
import type {
  Settlement,
  CreateSettlementDTO,
  Reservation,
  Pagination,
} from './types';

// Mock 데이터 사용 여부
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/**
 * 정산 목록 조회
 */
export interface GetSettlementsParams {
  page?: number;
  limit?: number;
  status?: 'all' | 'pending' | 'completed';
}

export interface GetSettlementsResponse {
  settlements: Settlement[];
  pagination: Pagination;
}

export const getSettlements = async (
  params?: GetSettlementsParams
): Promise<GetSettlementsResponse> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          settlements: [],
          pagination: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            total: 0,
            totalPages: 0,
          },
        });
      }, 300);
    });
  }

  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const endpoint = `/settlements${queryString ? `?${queryString}` : ''}`;

  return apiClient.get<GetSettlementsResponse>(endpoint);
};

/**
 * 정산 상세 조회
 */
export const getSettlement = async (id: number): Promise<Settlement> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: getSettlement not implemented');
  }

  return apiClient.get<Settlement>(`/settlements/${id}`);
};

/**
 * 정산 생성
 */
export const createSettlement = async (
  data: CreateSettlementDTO
): Promise<Settlement> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: createSettlement not implemented');
  }

  return apiClient.post<Settlement>('/settlements', data);
};

/**
 * 정산 상태 변경
 */
export const updateSettlementStatus = async (
  id: number,
  status: 'pending' | 'completed',
  settlementDate?: string
): Promise<Settlement> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: updateSettlementStatus not implemented');
  }

  return apiClient.patch<Settlement>(`/settlements/${id}/status`, {
    status,
    settlementDate,
  });
};

/**
 * 정산되지 않은 완료된 예약 조회
 */
export const getUnsettledReservations = async (): Promise<Reservation[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  }

  return apiClient.get<Reservation[]>('/settlements/unsettled/reservations');
};

