// API 공통 타입 정의

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 예약 타입
export interface Reservation {
  id: number;
  reservationDate: string; // "YYYY-MM-DD"
  reservationTime: string; // "HH:mm"
  expert: string;
  expertField: string;
  locationType: "online" | "offline";
  location?: string;
  region?: string;
  agency: string;
  client: string;
  topic: string;
  audience?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string; // "YYYY-MM-DD HH:mm"
  confirmedAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  cancelReason?: string | null;
}

// 예약 생성 DTO
export interface CreateReservationDTO {
  reservationDate: string;
  reservationTime: string;
  expert: string;
  expertField: string;
  locationType: "online" | "offline";
  location?: string;
  region?: string;
  agency: string;
  client: string;
  topic: string;
  audience?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;
  message?: string;
}

// 정산 타입
export interface Settlement {
  id: number;
  reservationId: number;
  revenue: number;
  cost: number;
  profit: number;
  profitRate: number;
  commissionRate: number;
  commissionAmount: number;
  settlementAmount: number;
  settlementStatus: "pending" | "completed";
  settlementDate?: string | null;
  paymentScheduledDate?: string | null;
  memo?: string | null;
  reservation?: Reservation;
}

// 정산 생성 DTO
export interface CreateSettlementDTO {
  reservationId: number;
  revenue?: number;
  cost?: number;
  commissionRate?: number;
  settlementDate?: string;
  paymentScheduledDate?: string;
  memo?: string;
}

// 문의 타입
export interface Inquiry {
  id: number;
  title: string;
  message: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: "pending" | "replied" | "resolved";
  createdAt: string; // "YYYY-MM-DD HH:mm"
  repliedAt?: string | null;
  reply?: string | null;
  repliedBy?: string | null;
}

// 문의 생성 DTO
export interface CreateInquiryDTO {
  title: string;
  message: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

// 대시보드 통계 타입
export interface DashboardStats {
  totalReservations: number;
  reservationsByStatus: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  totalRevenue: number;
  totalSettlements: number;
  pendingInquiries: number;
}

// 월별 통계 타입
export interface MonthlyStats {
  month: string; // "1월", "2월", ...
  bookings: number;
  revenue: number; // 백만원 단위
  profit: number; // 백만원 단위
  cost: number; // 백만원 단위
  settlement: number; // 백만원 단위
  completed: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  expertDetails: Array<{
    expert: string;
    bookings: number;
    revenue: number; // 백만원 단위
  }>;
}

// API 에러 타입
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

