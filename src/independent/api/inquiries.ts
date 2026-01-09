// 문의 API 클라이언트

import { apiClient } from './client';
import type { Inquiry, CreateInquiryDTO, Pagination } from './types';

// Mock 데이터 사용 여부
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/**
 * 문의 목록 조회
 */
export interface GetInquiriesParams {
  page?: number;
  limit?: number;
  status?: 'all' | 'pending' | 'replied' | 'resolved';
}

export interface GetInquiriesResponse {
  inquiries: Inquiry[];
  pagination: Pagination;
}

export const getInquiries = async (
  params?: GetInquiriesParams
): Promise<GetInquiriesResponse> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          inquiries: [],
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
  const endpoint = `/inquiries${queryString ? `?${queryString}` : ''}`;

  return apiClient.get<GetInquiriesResponse>(endpoint);
};

/**
 * 문의 상세 조회
 */
export const getInquiry = async (id: number): Promise<Inquiry> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: getInquiry not implemented');
  }

  return apiClient.get<Inquiry>(`/inquiries/${id}`);
};

/**
 * 문의 생성
 */
export const createInquiry = async (data: CreateInquiryDTO): Promise<Inquiry> => {
  if (USE_MOCK) {
    // Mock 모드: 임시 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...data,
          status: 'pending',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        } as Inquiry);
      }, 300);
    });
  }

  return apiClient.post<Inquiry>('/inquiries', data);
};

/**
 * 문의 답변
 */
export const replyInquiry = async (
  id: number,
  reply: string,
  repliedBy: string
): Promise<Inquiry> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: replyInquiry not implemented');
  }

  return apiClient.post<Inquiry>(`/inquiries/${id}/reply`, {
    reply,
    repliedBy,
  });
};

/**
 * 문의 상태 변경
 */
export const updateInquiryStatus = async (
  id: number,
  status: 'pending' | 'replied' | 'resolved'
): Promise<Inquiry> => {
  if (USE_MOCK) {
    throw new Error('Mock mode: updateInquiryStatus not implemented');
  }

  return apiClient.patch<Inquiry>(`/inquiries/${id}/status`, { status });
};

