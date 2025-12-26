/**
 * Reservation React Query Hooks
 * 예약 데이터를 위한 React Query 훅
 * 
 * React Query 장점:
 * - 자동 캐싱 및 갱신
 * - Loading/Error 상태 자동 관리
 * - 낙관적 업데이트 (Optimistic Update)
 * - 백그라운드 데이터 동기화
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchReservations,
  fetchReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  confirmReservation,
  completeReservation,
  cancelReservation,
  fetchReservationStats
} from '../api/reservations';
import type { Reservation } from '../data/mockData';
import type { PaginationParams } from '../api/client';

// ============================================
// Query Keys
// ============================================

export const reservationKeys = {
  all: ['reservations'] as const,
  lists: () => [...reservationKeys.all, 'list'] as const,
  list: (params?: any) => [...reservationKeys.lists(), params] as const,
  details: () => [...reservationKeys.all, 'detail'] as const,
  detail: (id: number) => [...reservationKeys.details(), id] as const,
  stats: () => [...reservationKeys.all, 'stats'] as const,
};

// ============================================
// Query Hooks
// ============================================

/**
 * 예약 목록 조회
 * @example
 * const { data, isLoading, error } = useReservationsQuery({ status: 'pending' });
 */
export function useReservationsQuery(
  params?: PaginationParams & {
    status?: string;
    expert?: string;
    startDate?: string;
    endDate?: string;
  }
) {
  return useQuery({
    queryKey: reservationKeys.list(params),
    queryFn: () => fetchReservations(params),
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
  });
}

/**
 * 예약 상세 조회
 * @example
 * const { data: reservation } = useReservationQuery(1);
 */
export function useReservationQuery(id: number) {
  return useQuery({
    queryKey: reservationKeys.detail(id),
    queryFn: () => fetchReservation(id),
    enabled: !!id, // id가 있을 때만 실행
  });
}

/**
 * 예약 통계 조회
 * @example
 * const { data: stats } = useReservationStatsQuery();
 */
export function useReservationStatsQuery() {
  return useQuery({
    queryKey: reservationKeys.stats(),
    queryFn: fetchReservationStats,
    staleTime: 1000 * 60 * 2, // 2분
  });
}

// ============================================
// Mutation Hooks
// ============================================

/**
 * 예약 생성
 * @example
 * const mutation = useCreateReservation();
 * mutation.mutate(reservationData);
 */
export function useCreateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      // 목록 갱신
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.stats() });
    },
  });
}

/**
 * 예약 수정
 * @example
 * const mutation = useUpdateReservation();
 * mutation.mutate({ id: 1, data: { status: 'confirmed' } });
 */
export function useUpdateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Reservation> }) =>
      updateReservation(id, data),
    onSuccess: (_, variables) => {
      // 해당 예약 상세 갱신
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(variables.id) });
      // 목록 갱신
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.stats() });
    },
  });
}

/**
 * 예약 삭제
 * @example
 * const mutation = useDeleteReservation();
 * mutation.mutate(1);
 */
export function useDeleteReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.stats() });
    },
  });
}

/**
 * 예약 확정
 * @example
 * const mutation = useConfirmReservation();
 * mutation.mutate(1);
 */
export function useConfirmReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: confirmReservation,
    onMutate: async (id) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: reservationKeys.detail(id) });
      
      const previousData = queryClient.getQueryData(reservationKeys.detail(id));
      
      queryClient.setQueryData(reservationKeys.detail(id), (old: any) => ({
        ...old,
        status: 'confirmed',
        confirmedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      }));
      
      return { previousData };
    },
    onError: (err, id, context) => {
      // 에러 시 롤백
      if (context?.previousData) {
        queryClient.setQueryData(reservationKeys.detail(id), context.previousData);
      }
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.stats() });
    },
  });
}

/**
 * 예약 완료
 * @example
 * const mutation = useCompleteReservation();
 * mutation.mutate(1);
 */
export function useCompleteReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: completeReservation,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.stats() });
    },
  });
}

/**
 * 예약 취소
 * @example
 * const mutation = useCancelReservation();
 * mutation.mutate({ id: 1, reason: '고객 요청' });
 */
export function useCancelReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      cancelReservation(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: reservationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.stats() });
    },
  });
}

// ============================================
// 복합 Hooks (편의성)
// ============================================

/**
 * 상태별 예약 목록
 */
export function useReservationsByStatus(status: string) {
  return useReservationsQuery({ status });
}

/**
 * 날짜 범위별 예약 목록
 */
export function useReservationsByDateRange(startDate: string, endDate: string) {
  return useReservationsQuery({ startDate, endDate });
}

/**
 * 전문가별 예약 목록
 */
export function useReservationsByExpert(expert: string) {
  return useReservationsQuery({ expert });
}
