// 예약 관련 React Query hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getReservations,
  getReservation,
  createReservation,
  confirmReservation,
  completeReservation,
  cancelReservation,
  deleteReservation,
  type GetReservationsParams,
} from '../api/reservations';
import type { CreateReservationDTO } from '../api/types';

/**
 * 예약 목록 조회 훅
 */
export const useReservationsQuery = (params?: GetReservationsParams) => {
  return useQuery({
    queryKey: ['reservations', params],
    queryFn: () => getReservations(params),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * 예약 상세 조회 훅
 */
export const useReservationQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['reservations', id],
    queryFn: () => getReservation(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/**
 * 예약 생성 훅
 */
export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationDTO) => createReservation(data),
    onSuccess: () => {
      // 예약 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      // 대시보드 통계 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 예약 확정 훅
 */
export const useConfirmReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => confirmReservation(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservations', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 예약 완료 훅
 */
export const useCompleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => completeReservation(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservations', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 예약 취소 훅
 */
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cancelReason }: { id: number; cancelReason?: string }) =>
      cancelReservation(id, cancelReason),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservations', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 예약 삭제 훅
 */
export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

