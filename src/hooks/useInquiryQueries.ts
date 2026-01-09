import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Inquiry } from '../data/mockData';

// API 응답 타입
export interface InquiriesResponse {
  inquiries: Inquiry[];
  total: number;
}

// 쿼리 파라미터 타입
export interface InquiriesQueryParams {
  status?: 'all' | 'pending' | 'in_progress' | 'resolved';
  page?: number;
  limit?: number;
}

// Mock 문의 데이터 생성
const generateMockInquiries = (): Inquiry[] => {
  const mockInquiries: Inquiry[] = [];
  const statuses: Array<'pending' | 'in_progress' | 'resolved'> = ['pending', 'in_progress', 'resolved'];
  const agencies = ['삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '네이버', '카카오', 'SK텔레콤'];
  const subjects = [
    '강연 일정 문의',
    '강연료 협의 요청',
    '강연 주제 변경 요청',
    '강연 장소 변경',
    '추가 강연 문의',
    '강연 취소 문의',
    '강연자 변경 요청',
  ];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    mockInquiries.push({
      id: i + 1,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      content: `문의 내용입니다. 자세한 내용은 전화로 상담 부탁드립니다. (문의 번호: ${i + 1})`,
      agency: agencies[Math.floor(Math.random() * agencies.length)],
      contactName: `담당자${i + 1}`,
      contactPhone: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      contactEmail: `contact${i + 1}@example.com`,
      status,
      createdAt: date.toISOString(),
      updatedAt: status !== 'pending' ? new Date(date.getTime() + 86400000).toISOString() : date.toISOString(),
      reply: status === 'resolved' ? `답변 내용입니다. 문의하신 내용에 대해 안내드립니다. (문의 번호: ${i + 1})` : undefined,
      repliedAt: status === 'resolved' ? new Date(date.getTime() + 86400000).toISOString() : undefined,
    });
  }
  
  return mockInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// 문의 목록 조회 Hook
export function useInquiriesQuery(params: InquiriesQueryParams = {}) {
  return useQuery<InquiriesResponse>({
    queryKey: ['inquiries', params],
    queryFn: async () => {
      // TODO: 백엔드 API 연동
      // const queryString = new URLSearchParams(params as any).toString();
      // const response = await fetch(`/api/inquiries?${queryString}`);
      // return response.json();
      
      // Mock 데이터 반환
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allInquiries = generateMockInquiries();
      const { status, page = 1, limit = 10 } = params;
      
      // 필터링
      let filtered = allInquiries;
      if (status && status !== 'all') {
        filtered = filtered.filter(i => i.status === status);
      }
      
      // 페이지네이션
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedInquiries = filtered.slice(startIndex, endIndex);
      
      return {
        inquiries: paginatedInquiries,
        total: filtered.length,
      };
    },
    staleTime: 1000 * 60, // 1분
  });
}

// 문의 답변 Hook
export function useReplyInquiry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, reply }: { id: number; reply: string }) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch(`/api/inquiries/${id}/reply`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reply }),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// 문의 상태 변경 Hook
export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'pending' | 'in_progress' | 'resolved' }) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch(`/api/inquiries/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status }),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

// 문의 생성 Hook (사용자용)
export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (inquiryData: Partial<Inquiry>) => {
      // TODO: 백엔드 API 연동
      // const response = await fetch('/api/inquiries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(inquiryData),
      // });
      // return response.json();
      
      // Mock 응답
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, id: Math.floor(Math.random() * 1000) + 100 };
    },
  });
}
