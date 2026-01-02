/**
 * Reservation Context
 * 예약 데이터 전역 상태 관리
 * 
 * 기능:
 * - 예약 데이터 CRUD
 * - 정산 데이터 CRUD
 * - 필터링 및 검색
 * - 통계 계산
 */

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import {
  reservations as initialReservations,
  settlements as initialSettlements,
  monthlyStats as initialMonthlyStats,
  type Reservation,
  type Settlement,
  type MonthlyStats
} from '../data/mockData';

// ============================================
// Context 타입 정의
// ============================================

interface ReservationContextType {
  // 데이터
  reservations: Reservation[];
  settlements: Settlement[];
  monthlyStats: MonthlyStats[];
  
  // 예약 관리
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  updateReservation: (id: number, updates: Partial<Reservation>) => void;
  deleteReservation: (id: number) => void;
  confirmReservation: (id: number) => void;
  completeReservation: (id: number) => void;
  cancelReservation: (id: number, reason: string) => void;
  
  // 정산 관리
  addSettlement: (settlement: Omit<Settlement, 'id'>) => void;
  updateSettlement: (id: number, updates: Partial<Settlement>) => void;
  completeSettlement: (id: number) => void;
  
  // 조회 함수
  getReservation: (id: number) => Reservation | undefined;
  getSettlement: (reservationId: number) => Settlement | undefined;
  getCompletedReservationsList: () => Reservation[];
  getReservationsByStatus: (status: Reservation['status']) => Reservation[];
  
  // 통계
  getStatusCount: (status: Reservation['status']) => number;
  getRegionStats: () => Record<string, number>;
  getUnsettledCount: () => number;
  getTotalSettled: () => number;
  
  // 필터 상태
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// ============================================
// Context 생성
// ============================================

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

// ============================================
// Provider 컴포넌트
// ============================================

interface ReservationProviderProps {
  children: ReactNode;
}

export function ReservationProvider({ children }: ReservationProviderProps) {
  // 상태
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [settlements, setSettlements] = useState<Settlement[]>(initialSettlements);
  const [monthlyStats] = useState<MonthlyStats[]>(initialMonthlyStats);
  
  // 필터 상태
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // ============================================
  // 예약 관리 함수
  // ============================================
  
  const addReservation = useCallback((reservation: Omit<Reservation, 'id'>) => {
    const newId = Math.max(...reservations.map(r => r.id), 0) + 1;
    const newReservation: Reservation = {
      ...reservation,
      id: newId
    };
    setReservations(prev => [...prev, newReservation]);
  }, [reservations]);
  
  const updateReservation = useCallback((id: number, updates: Partial<Reservation>) => {
    setReservations(prev =>
      prev.map(r => r.id === id ? { ...r, ...updates } : r)
    );
  }, []);
  
  const deleteReservation = useCallback((id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    // 관련 정산 정보도 삭제
    setSettlements(prev => prev.filter(s => s.reservationId !== id));
  }, []);
  
  const confirmReservation = useCallback((id: number) => {
    updateReservation(id, {
      status: 'confirmed',
      confirmedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
  }, [updateReservation]);
  
  const completeReservation = useCallback((id: number) => {
    updateReservation(id, {
      status: 'completed',
      completedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
  }, [updateReservation]);
  
  const cancelReservation = useCallback((id: number, reason: string) => {
    updateReservation(id, {
      status: 'cancelled',
      cancelledAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      cancelReason: reason
    });
  }, [updateReservation]);
  
  // ============================================
  // 정산 관리 함수
  // ============================================
  
  const addSettlement = useCallback((settlement: Omit<Settlement, 'id'>) => {
    const newId = Math.max(...settlements.map(s => s.id), 0) + 1;
    const newSettlement: Settlement = {
      ...settlement,
      id: newId
    };
    setSettlements(prev => [...prev, newSettlement]);
  }, [settlements]);
  
  const updateSettlement = useCallback((id: number, updates: Partial<Settlement>) => {
    setSettlements(prev =>
      prev.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  }, []);
  
  const completeSettlement = useCallback((id: number) => {
    updateSettlement(id, {
      settlementStatus: 'completed',
      settlementDate: new Date().toISOString().split('T')[0]
    });
  }, [updateSettlement]);
  
  // ============================================
  // 조회 함수
  // ============================================
  
  const getReservation = useCallback((id: number) => {
    return reservations.find(r => r.id === id);
  }, [reservations]);
  
  const getSettlement = useCallback((reservationId: number) => {
    return settlements.find(s => s.reservationId === reservationId);
  }, [settlements]);
  
  const getCompletedReservationsList = useCallback(() => {
    return reservations.filter(r => r.status === 'completed');
  }, [reservations]);
  
  const getReservationsByStatus = useCallback((status: Reservation['status']) => {
    return reservations.filter(r => r.status === status);
  }, [reservations]);
  
  // ============================================
  // 통계 함수
  // ============================================
  
  const getStatusCount = useCallback((status: Reservation['status']) => {
    return reservations.filter(r => r.status === status).length;
  }, [reservations]);
  
  const getRegionStats = useCallback(() => {
    return reservations.reduce((acc, reservation) => {
      const region = reservation.region;
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [reservations]);
  
  const getUnsettledCount = useCallback(() => {
    const completed = getCompletedReservationsList();
    return completed.filter(r => !getSettlement(r.id)).length;
  }, [getCompletedReservationsList, getSettlement]);
  
  const getTotalSettled = useCallback(() => {
    return settlements
      .filter(s => s.settlementStatus === 'completed')
      .reduce((sum, s) => sum + s.settlementAmount, 0);
  }, [settlements]);
  
  // ============================================
  // Context Value
  // ============================================
  
  const value: ReservationContextType = {
    // 데이터
    reservations,
    settlements,
    monthlyStats,
    
    // 예약 관리
    addReservation,
    updateReservation,
    deleteReservation,
    confirmReservation,
    completeReservation,
    cancelReservation,
    
    // 정산 관리
    addSettlement,
    updateSettlement,
    completeSettlement,
    
    // 조회 함수
    getReservation,
    getSettlement,
    getCompletedReservationsList,
    getReservationsByStatus,
    
    // 통계
    getStatusCount,
    getRegionStats,
    getUnsettledCount,
    getTotalSettled,
    
    // 필터
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm
  };
  
  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

// ============================================
// Custom Hook
// ============================================

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
}

// ============================================
// 개별 Hook (편의성)
// ============================================

export function useReservationList() {
  const { reservations, filterStatus, searchTerm } = useReservations();
  
  let filtered = reservations;
  
  // 상태 필터
  if (filterStatus !== 'all') {
    filtered = filtered.filter(r => r.status === filterStatus);
  }
  
  // 검색 필터
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(r =>
      r.expert.toLowerCase().includes(term) ||
      r.client.toLowerCase().includes(term) ||
      r.topic.toLowerCase().includes(term)
    );
  }
  
  return filtered;
}

export function useReservationStats() {
  const { 
    getStatusCount, 
    getRegionStats, 
    getUnsettledCount, 
    getTotalSettled 
  } = useReservations();
  
  return {
    pending: getStatusCount('pending'),
    confirmed: getStatusCount('confirmed'),
    completed: getStatusCount('completed'),
    cancelled: getStatusCount('cancelled'),
    regionStats: getRegionStats(),
    unsettled: getUnsettledCount(),
    totalSettled: getTotalSettled()
  };
}