/**
 * Reservation API
 * 예약 관련 API 함수
 * 
 * 백엔드 개발자 가이드:
 * 1. 실제 API 엔드포인트에 맞게 URL 수정
 * 2. 요청/응답 데이터 형식 확인
 * 3. Mock 데이터와 실제 API 전환은 useMock 플래그로 제어
 */

import { apiClient, type PaginatedResponse, type PaginationParams } from './client';
import { 
  reservations as mockReservations,
  type Reservation 
} from '../data/mockData';

// ============================================
// Mock 사용 여부 (개발 단계에서 전환)
// ============================================

const USE_MOCK = true; // 실제 API 준비되면 false로 변경

// ============================================
// API 함수
// ============================================

/**
 * 예약 목록 조회
 * GET /reservations
 */
export async function fetchReservations(
  params?: PaginationParams & {
    status?: string;
    expert?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<PaginatedResponse<Reservation>> {
  if (USE_MOCK) {
    // Mock 데이터 반환
    await delay(500); // 네트워크 지연 시뮬레이션
    
    let filtered = [...mockReservations];
    
    // 필터링
    if (params?.status) {
      filtered = filtered.filter(r => r.status === params.status);
    }
    if (params?.expert) {
      filtered = filtered.filter(r => r.expert === params.expert);
    }
    if (params?.startDate) {
      filtered = filtered.filter(r => r.reservationDate >= params.startDate!);
    }
    if (params?.endDate) {
      filtered = filtered.filter(r => r.reservationDate <= params.endDate!);
    }
    
    // 페이징
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      data: filtered.slice(start, end),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }
  
  // 실제 API 호출
  return apiClient.get<PaginatedResponse<Reservation>>('/reservations', params);
}

/**
 * 예약 상세 조회
 * GET /reservations/:id
 */
export async function fetchReservation(id: number): Promise<Reservation> {
  if (USE_MOCK) {
    await delay(300);
    const reservation = mockReservations.find(r => r.id === id);
    if (!reservation) {
      throw new Error('예약을 찾을 수 없습니다.');
    }
    return reservation;
  }
  
  return apiClient.get<Reservation>(`/reservations/${id}`);
}

/**
 * 예약 생성
 * POST /reservations
 */
export async function createReservation(
  data: Omit<Reservation, 'id' | 'createdAt'>
): Promise<Reservation> {
  if (USE_MOCK) {
    await delay(500);
    const newReservation: Reservation = {
      ...data,
      id: Math.max(...mockReservations.map(r => r.id), 0) + 1,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    return newReservation;
  }
  
  return apiClient.post<Reservation>('/reservations', data);
}

/**
 * 예약 수정
 * PUT /reservations/:id
 */
export async function updateReservation(
  id: number,
  data: Partial<Reservation>
): Promise<Reservation> {
  if (USE_MOCK) {
    await delay(500);
    const reservation = mockReservations.find(r => r.id === id);
    if (!reservation) {
      throw new Error('예약을 찾을 수 없습니다.');
    }
    return { ...reservation, ...data };
  }
  
  return apiClient.put<Reservation>(`/reservations/${id}`, data);
}

/**
 * 예약 삭제
 * DELETE /reservations/:id
 */
export async function deleteReservation(id: number): Promise<void> {
  if (USE_MOCK) {
    await delay(300);
    return;
  }
  
  return apiClient.delete<void>(`/reservations/${id}`);
}

/**
 * 예약 확정
 * POST /reservations/:id/confirm
 */
export async function confirmReservation(id: number): Promise<Reservation> {
  if (USE_MOCK) {
    await delay(500);
    return updateReservation(id, {
      status: 'confirmed',
      confirmedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
  }
  
  return apiClient.post<Reservation>(`/reservations/${id}/confirm`);
}

/**
 * 예약 완료
 * POST /reservations/:id/complete
 */
export async function completeReservation(id: number): Promise<Reservation> {
  if (USE_MOCK) {
    await delay(500);
    return updateReservation(id, {
      status: 'completed',
      completedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
  }
  
  return apiClient.post<Reservation>(`/reservations/${id}/complete`);
}

/**
 * 예약 취소
 * POST /reservations/:id/cancel
 */
export async function cancelReservation(
  id: number,
  reason: string
): Promise<Reservation> {
  if (USE_MOCK) {
    await delay(500);
    return updateReservation(id, {
      status: 'cancelled',
      cancelledAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      cancelReason: reason
    });
  }
  
  return apiClient.post<Reservation>(`/reservations/${id}/cancel`, { reason });
}

/**
 * 예약 통계 조회
 * GET /reservations/stats
 */
export async function fetchReservationStats(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}> {
  if (USE_MOCK) {
    await delay(300);
    return {
      total: mockReservations.length,
      pending: mockReservations.filter(r => r.status === 'pending').length,
      confirmed: mockReservations.filter(r => r.status === 'confirmed').length,
      completed: mockReservations.filter(r => r.status === 'completed').length,
      cancelled: mockReservations.filter(r => r.status === 'cancelled').length
    };
  }
  
  return apiClient.get('/reservations/stats');
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 지연 시뮬레이션 (Mock용)
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
