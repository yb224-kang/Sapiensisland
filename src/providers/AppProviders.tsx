/**
 * App Providers
 * 모든 Provider를 통합 관리
 * 
 * 사용법:
 * App.tsx에서 <AppProviders>로 앱 전체를 감싸기
 */

import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}