// 정산 관련 React Query hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSettlements,
  getSettlement,
  createSettlement,
  updateSettlementStatus,
  getUnsettledReservations,
  type GetSettlementsParams,
} from '../api/settlements';
import type { CreateSettlementDTO } from '../api/types';

/**
 * 정산 목록 조회 훅
 */
export const useSettlementsQuery = (params?: GetSettlementsParams) => {
  return useQuery({
    queryKey: ['settlements', params],
    queryFn: () => getSettlements(params),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * 정산 상세 조회 훅
 */
export const useSettlementQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['settlements', id],
    queryFn: () => getSettlement(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/**
 * 정산 생성 훅
 */
export const useCreateSettlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSettlementDTO) => createSettlement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settlements'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 정산 상태 변경 훅
 */
export const useUpdateSettlementStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      settlementDate,
    }: {
      id: number;
      status: 'pending' | 'completed';
      settlementDate?: string;
    }) => updateSettlementStatus(id, status, settlementDate),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['settlements'] });
      queryClient.invalidateQueries({ queryKey: ['settlements', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 정산되지 않은 완료된 예약 조회 훅
 */
export const useUnsettledReservationsQuery = () => {
  return useQuery({
    queryKey: ['settlements', 'unsettled', 'reservations'],
    queryFn: () => getUnsettledReservations(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

