// 예약 API 클라이언트

import { apiClient } from './client';
import type {
  Reservation,
  CreateReservationDTO,
  ApiResponse,
  Pagination,
} from './types';

// Mock 데이터 사용 여부 (환경 변수로 제어)
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

// Mock 데이터 import (필요시)
// import { reservations as mockReservations } from '../../apps/web/src/data/mockData';

/**
 * 예약 목록 조회
 */
export interface GetReservationsParams {
  page?: number;
  limit?: number;
  status?: 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  search?: string;
}

export interface GetReservationsResponse {
  reservations: Reservation[];
  pagination: Pagination;
}

export const getReservations = async (
  params?: GetReservationsParams
): Promise<GetReservationsResponse> => {
  if (USE_MOCK) {
    // Mock 모드: 빈 배열 반환 (실제 Mock 데이터는 필요시 구현)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          reservations: [],
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

  // 실제 API 호출
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const endpoint = `/reservations${queryString ? `?${queryString}` : ''}`;

  return apiClient.get<GetReservationsResponse>(endpoint);
};

/**
 * 예약 상세 조회
 */
export const getReservation = async (id: number): Promise<Reservation> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: getReservation not implemented');
  }

  return apiClient.get<Reservation>(`/reservations/${id}`);
};

/**
 * 예약 생성
 */
export const createReservation = async (
  data: CreateReservationDTO
): Promise<Reservation> => {
  if (USE_MOCK) {
    // Mock 모드: 임시 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...data,
          status: 'pending',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        } as Reservation);
      }, 300);
    });
  }

  return apiClient.post<Reservation>('/reservations', data);
};

/**
 * 예약 확정
 */
export const confirmReservation = async (id: number): Promise<Reservation> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: confirmReservation not implemented');
  }

  return apiClient.post<Reservation>(`/reservations/${id}/confirm`, {});
};

/**
 * 예약 완료
 */
export const completeReservation = async (id: number): Promise<Reservation> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: completeReservation not implemented');
  }

  return apiClient.post<Reservation>(`/reservations/${id}/complete`, {});
};

/**
 * 예약 취소
 */
export const cancelReservation = async (
  id: number,
  cancelReason?: string
): Promise<Reservation> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: cancelReservation not implemented');
  }

  return apiClient.post<Reservation>(`/reservations/${id}/cancel`, {
    cancelReason,
  });
};

/**
 * 예약 삭제
 */
export const deleteReservation = async (id: number): Promise<void> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: deleteReservation not implemented');
  }

  await apiClient.delete<{ message: string }>(`/reservations/${id}`);
};

