// 문의 관련 React Query hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInquiries,
  getInquiry,
  createInquiry,
  replyInquiry,
  updateInquiryStatus,
  type GetInquiriesParams,
} from '../api/inquiries';
import type { CreateInquiryDTO } from '../api/types';

/**
 * 문의 목록 조회 훅
 */
export const useInquiriesQuery = (params?: GetInquiriesParams) => {
  return useQuery({
    queryKey: ['inquiries', params],
    queryFn: () => getInquiries(params),
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * 문의 상세 조회 훅
 */
export const useInquiryQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['inquiries', id],
    queryFn: () => getInquiry(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/**
 * 문의 생성 훅
 */
export const useCreateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInquiryDTO) => createInquiry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 문의 답변 훅
 */
export const useReplyInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      reply,
      repliedBy,
    }: {
      id: number;
      reply: string;
      repliedBy: string;
    }) => replyInquiry(id, reply, repliedBy),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiries', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

/**
 * 문의 상태 변경 훅
 */
export const useUpdateInquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: 'pending' | 'replied' | 'resolved';
    }) => updateInquiryStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiries', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

