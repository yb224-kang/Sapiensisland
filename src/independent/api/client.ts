// API 클라이언트 기본 설정

import { ApiError, ApiResponse } from './types';

// API Base URL 설정
const getApiBaseUrl = () => {
  try {
    return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  } catch {
    return 'http://localhost:3001/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

// API 클라이언트 클래스
class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          `HTTP_${response.status}`,
          data.error || `HTTP Error: ${response.statusText}`
        );
      }

      if (!data.success) {
        throw new ApiError(
          'API_ERROR',
          data.error || 'API 요청이 실패했습니다.'
        );
      }

      return data.data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError('NETWORK_ERROR', '네트워크 오류가 발생했습니다.');
      }
      throw new ApiError('UNKNOWN_ERROR', '알 수 없는 오류가 발생했습니다.');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

