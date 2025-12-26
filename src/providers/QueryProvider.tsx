/**
 * React Query Provider
 * 전역 Query Client 설정
 * 
 * 설정 가이드:
 * 1. App.tsx에서 <QueryProvider>로 앱 전체를 감싸기
 * 2. 개발 환경에서는 DevTools 활성화
 * 3. 캐싱 전략은 프로젝트 요구사항에 맞게 조정
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

// ============================================
// Query Client 설정
// ============================================

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 쿼리 기본 설정
        staleTime: 1000 * 60 * 5, // 5분 (데이터가 fresh로 간주되는 시간)
        gcTime: 1000 * 60 * 30, // 30분 (캐시 유지 시간, 이전 cacheTime)
        retry: 1, // 실패 시 재시도 횟수
        refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 갱신 비활성화
        refetchOnReconnect: true, // 재연결 시 자동 갱신
        refetchOnMount: true, // 컴포넌트 마운트 시 자동 갱신
      },
      mutations: {
        // 뮤테이션 기본 설정
        retry: 0, // 뮤테이션은 재시도 안 함
      },
    },
  });
}

// ============================================
// Provider 컴포넌트
// ============================================

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // useState로 QueryClient 생성 (리렌더링 시 재생성 방지)
  const [queryClient] = useState(() => createQueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 DevTools 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

// ============================================
// Export
// ============================================

export { QueryClient };
