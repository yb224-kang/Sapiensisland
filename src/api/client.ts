/**
 * API Client
 * 백엔드 API와 통신하는 기본 클라이언트
 * 
 * 백엔드 개발자 가이드:
 * 1. API_BASE_URL을 실제 백엔드 URL로 변경
 * 2. 인증 토큰 로직 추가 (필요시)
 * 3. 에러 핸들링 커스터마이징
 */

// ============================================
// 환경 설정
// ============================================

const getApiBaseUrl = () => {
  try {
    return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  } catch {
    return 'http://localhost:3001/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

// ============================================
// API Client 클래스
// ============================================

class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  /**
   * GET 요청
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Query parameters 추가
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * POST 요청
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * PUT 요청
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * PATCH 요청
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * DELETE 요청
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * 헤더 생성
   * 백엔드 개발자: 여기에 인증 토큰 추가
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // 인증 토큰 추가 (예시)
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
  
  /**
   * 응답 처리
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    // 성공 응답
    if (response.ok) {
      // 204 No Content인 경우
      if (response.status === 204) {
        return {} as T;
      }
      
      const data = await response.json();
      return data;
    }
    
    // 에러 응답
    const error = await this.parseError(response);
    throw error;
  }
  
  /**
   * 에러 파싱
   */
  private async parseError(response: Response): Promise<Error> {
    try {
      const errorData = await response.json();
      return new Error(errorData.message || '요청 처리 중 오류가 발생했습니다.');
    } catch {
      return new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }
  }
}

// ============================================
// Export
// ============================================

export const apiClient = new ApiClient(API_BASE_URL);

// ============================================
// 타입 정의
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}