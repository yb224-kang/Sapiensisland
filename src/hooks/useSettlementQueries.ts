/**
 * Settlement React Query Hooks
 * 정산 데이터를 위한 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchSettlements,
  fetchSettlement,
  fetchSettlementByReservation,
  createSettlement,
  calculateSettlement,
  updateSettlement,
  completeSettlement,
  deleteSettlement,
  fetchUnsettledReservations,
  fetchSettlementStats
} from '../api/settlements';
import type { Settlement } from '../data/mockData';
import type { PaginationParams } from '../api/client';

// ============================================
// Query Keys
// ============================================

export const settlementKeys = {
  all: ['settlements'] as const,
  lists: () => [...settlementKeys.all, 'list'] as const,
  list: (params?: any) => [...settlementKeys.lists(), params] as const,
  details: () => [...settlementKeys.all, 'detail'] as const,
  detail: (id: number) => [...settlementKeys.details(), id] as const,
  byReservation: (reservationId: number) => [...settlementKeys.all, 'by-reservation', reservationId] as const,
  unsettled: () => [...settlementKeys.all, 'unsettled'] as const,
  stats: () => [...settlementKeys.all, 'stats'] as const,
};

// ============================================
// Query Hooks
// ============================================

/**
 * 정산 목록 조회
 */
export function useSettlementsQuery(
  params?: PaginationParams & {
    status?: string;
    startDate?: string;
    endDate?: string;
  }
) {
  return useQuery({
    queryKey: settlementKeys.list(params),
    queryFn: () => fetchSettlements(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * 정산 상세 조회
 */
export function useSettlementQuery(id: number) {
  return useQuery({
    queryKey: settlementKeys.detail(id),
    queryFn: () => fetchSettlement(id),
    enabled: !!id,
  });
}

/**
 * 예약 ID로 정산 조회
 */
export function useSettlementByReservationQuery(reservationId: number) {
  return useQuery({
    queryKey: settlementKeys.byReservation(reservationId),
    queryFn: () => fetchSettlementByReservation(reservationId),
    enabled: !!reservationId,
  });
}

/**
 * 미정산 예약 목록
 */
export function useUnsettledReservationsQuery() {
  return useQuery({
    queryKey: settlementKeys.unsettled(),
    queryFn: fetchUnsettledReservations,
    staleTime: 1000 * 60 * 2,
  });
}

/**
 * 정산 통계
 */
export function useSettlementStatsQuery() {
  return useQuery({
    queryKey: settlementKeys.stats(),
    queryFn: fetchSettlementStats,
    staleTime: 1000 * 60 * 2,
  });
}

// ============================================
// Mutation Hooks
// ============================================

/**
 * 정산 생성
 */
export function useCreateSettlement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSettlement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settlementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: settlementKeys.unsettled() });
      queryClient.invalidateQueries({ queryKey: settlementKeys.stats() });
    },
  });
}

/**
 * 정산 자동 계산
 */
export function useCalculateSettlement() {
  return useMutation({
    mutationFn: calculateSettlement,
  });
}

/**
 * 정산 수정
 */
export function useUpdateSettlement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Settlement> }) =>
      updateSettlement(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: settlementKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: settlementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: settlementKeys.stats() });
    },
  });
}

/**
 * 정산 완료
 */
export function useCompleteSettlement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: completeSettlement,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: settlementKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: settlementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: settlementKeys.stats() });
    },
  });
}

/**
 * 정산 삭제
 */
export function useDeleteSettlement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteSettlement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settlementKeys.lists() });
      queryClient.invalidateQueries({ queryKey: settlementKeys.unsettled() });
      queryClient.invalidateQueries({ queryKey: settlementKeys.stats() });
    },
  });
}

// ============================================
// 복합 Hooks
// ============================================

/**
 * 상태별 정산 목록
 */
export function useSettlementsByStatus(status: string) {
  return useSettlementsQuery({ status });
}

/**
 * 정산 생성 + 자동 계산 워크플로우
 */
export function useCreateSettlementWithCalculation() {
  const calculateMutation = useCalculateSettlement();
  const createMutation = useCreateSettlement();
  
  return {
    calculate: calculateMutation.mutate,
    create: createMutation.mutate,
    isCalculating: calculateMutation.isPending,
    isCreating: createMutation.isPending,
    isLoading: calculateMutation.isPending || createMutation.isPending,
    error: calculateMutation.error || createMutation.error,
  };
}
