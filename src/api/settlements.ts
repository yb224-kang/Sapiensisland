/**
 * Settlement API
 * 정산 관련 API 함수
 * 
 * 백엔드 개발자 가이드:
 * 1. 실제 API 엔드포인트에 맞게 URL 수정
 * 2. 정산 계산 로직이 백엔드에 있는 경우 프론트엔드 계산 제거
 * 3. Mock과 실제 API 전환은 useMock 플래그로 제어
 */

import { apiClient, type PaginatedResponse, type PaginationParams } from './client';
import { 
  settlements as mockSettlements,
  reservations as mockReservations,
  type Settlement 
} from '../data/mockData';

// ============================================
// Mock 사용 여부
// ============================================

const USE_MOCK = true;

// ============================================
// API 함수
// ============================================

/**
 * 정산 목록 조회
 * GET /settlements
 */
export async function fetchSettlements(
  params?: PaginationParams & {
    status?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<PaginatedResponse<Settlement>> {
  if (USE_MOCK) {
    await delay(500);
    
    let filtered = [...mockSettlements];
    
    // 필터링
    if (params?.status) {
      filtered = filtered.filter(s => s.settlementStatus === params.status);
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
  
  return apiClient.get<PaginatedResponse<Settlement>>('/settlements', params);
}

/**
 * 정산 상세 조회
 * GET /settlements/:id
 */
export async function fetchSettlement(id: number): Promise<Settlement> {
  if (USE_MOCK) {
    await delay(300);
    const settlement = mockSettlements.find(s => s.id === id);
    if (!settlement) {
      throw new Error('정산 정보를 찾을 수 없습니다.');
    }
    return settlement;
  }
  
  return apiClient.get<Settlement>(`/settlements/${id}`);
}

/**
 * 예약 ID로 정산 조회
 * GET /settlements/by-reservation/:reservationId
 */
export async function fetchSettlementByReservation(
  reservationId: number
): Promise<Settlement | null> {
  if (USE_MOCK) {
    await delay(300);
    const settlement = mockSettlements.find(s => s.reservationId === reservationId);
    return settlement || null;
  }
  
  return apiClient.get<Settlement | null>(`/settlements/by-reservation/${reservationId}`);
}

/**
 * 정산 생성
 * POST /settlements
 */
export async function createSettlement(
  data: Omit<Settlement, 'id'>
): Promise<Settlement> {
  if (USE_MOCK) {
    await delay(500);
    const newSettlement: Settlement = {
      ...data,
      id: Math.max(...mockSettlements.map(s => s.id), 0) + 1
    };
    return newSettlement;
  }
  
  return apiClient.post<Settlement>('/settlements', data);
}

/**
 * 정산 자동 계산
 * POST /settlements/calculate
 * 
 * 예약 정보를 기반으로 정산 금액을 자동 계산
 */
export async function calculateSettlement(data: {
  reservationId: number;
  revenue: number;
  cost: number;
  profitRate: number;
}): Promise<{
  revenue: number;
  cost: number;
  profit: number;
  profitRate: number;
  commissionRate: number;
  commissionAmount: number;
  settlementAmount: number;
}> {
  if (USE_MOCK) {
    await delay(300);
    
    const { revenue, cost, profitRate } = data;
    const profit = revenue - cost;
    const commissionRate = 100 - profitRate;
    const commissionAmount = Math.round(profit * (commissionRate / 100));
    const settlementAmount = Math.round(profit * (profitRate / 100));
    
    return {
      revenue,
      cost,
      profit,
      profitRate,
      commissionRate,
      commissionAmount,
      settlementAmount
    };
  }
  
  return apiClient.post('/settlements/calculate', data);
}

/**
 * 정산 수정
 * PUT /settlements/:id
 */
export async function updateSettlement(
  id: number,
  data: Partial<Settlement>
): Promise<Settlement> {
  if (USE_MOCK) {
    await delay(500);
    const settlement = mockSettlements.find(s => s.id === id);
    if (!settlement) {
      throw new Error('정산 정보를 찾을 수 없습니다.');
    }
    return { ...settlement, ...data };
  }
  
  return apiClient.put<Settlement>(`/settlements/${id}`, data);
}

/**
 * 정산 완료
 * POST /settlements/:id/complete
 */
export async function completeSettlement(id: number): Promise<Settlement> {
  if (USE_MOCK) {
    await delay(500);
    return updateSettlement(id, {
      settlementStatus: 'completed',
      settlementDate: new Date().toISOString().split('T')[0]
    });
  }
  
  return apiClient.post<Settlement>(`/settlements/${id}/complete`);
}

/**
 * 정산 삭제
 * DELETE /settlements/:id
 */
export async function deleteSettlement(id: number): Promise<void> {
  if (USE_MOCK) {
    await delay(300);
    return;
  }
  
  return apiClient.delete<void>(`/settlements/${id}`);
}

/**
 * 미정산 예약 목록 조회
 * GET /settlements/unsettled-reservations
 */
export async function fetchUnsettledReservations(): Promise<{
  id: number;
  reservationDate: string;
  expert: string;
  client: string;
  fee: number;
  completedAt: string;
}[]> {
  if (USE_MOCK) {
    await delay(500);
    
    // 완료된 예약 중 정산되지 않은 것만
    const completed = mockReservations.filter(r => r.status === 'completed');
    const settledIds = mockSettlements.map(s => s.reservationId);
    const unsettled = completed.filter(r => !settledIds.includes(r.id));
    
    return unsettled.map(r => ({
      id: r.id,
      reservationDate: r.reservationDate,
      expert: r.expert,
      client: r.client,
      fee: r.fee,
      completedAt: r.completedAt || ''
    }));
  }
  
  return apiClient.get('/settlements/unsettled-reservations');
}

/**
 * 정산 통계 조회
 * GET /settlements/stats
 */
export async function fetchSettlementStats(): Promise<{
  total: number;
  pending: number;
  completed: number;
  totalAmount: number;
  pendingAmount: number;
  completedAmount: number;
}> {
  if (USE_MOCK) {
    await delay(300);
    
    const pending = mockSettlements.filter(s => s.settlementStatus === 'pending');
    const completed = mockSettlements.filter(s => s.settlementStatus === 'completed');
    
    return {
      total: mockSettlements.length,
      pending: pending.length,
      completed: completed.length,
      totalAmount: mockSettlements.reduce((sum, s) => sum + s.settlementAmount, 0),
      pendingAmount: pending.reduce((sum, s) => sum + s.settlementAmount, 0),
      completedAmount: completed.reduce((sum, s) => sum + s.settlementAmount, 0)
    };
  }
  
  return apiClient.get('/settlements/stats');
}

// ============================================
// 헬퍼 함수
// ============================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
