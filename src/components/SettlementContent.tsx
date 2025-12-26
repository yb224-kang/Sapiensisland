import { useState } from 'react';
import { X, TrendingUp, AlertCircle, Calendar, DollarSign, Percent, Calculator } from 'lucide-react';
import { 
  reservations as mockReservations, 
  settlements as mockSettlements,
  getCompletedReservations,
  getSettlementByReservationId,
  type Reservation,
  type Settlement
} from '../data/mockData';

export default function SettlementContent() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'unsettled' | 'completed'>('all');
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [editingSettlement, setEditingSettlement] = useState<Settlement | null>(null);

  // 폼 상태
  const [formData, setFormData] = useState({
    cost: '',
    profitRate: '60',
    paymentScheduledDate: '',
    memo: ''
  });

  // 중앙 Mock 데이터 사용
  const completedReservations = getCompletedReservations();
  const settlements = mockSettlements;

  // 정산 정보 가져오기
  const getSettlement = (reservationId: number) => {
    return getSettlementByReservationId(reservationId);
  };

  // 필터링된 예약 목록
  const filteredReservations = completedReservations.filter(reservation => {
    const settlement = getSettlement(reservation.id);
    
    if (filterStatus === 'unsettled') {
      return !settlement; // 정산 미등록
    } else if (filterStatus === 'completed') {
      return settlement?.settlementStatus === 'completed'; // 정산 완료
    }
    return true; // 전체
  });

  // 통계 계산
  const unsettledCount = completedReservations.filter(r => !getSettlement(r.id)).length;
  const settledCount = settlements.filter(s => s.settlementStatus === 'completed').length;
  const pendingCount = settlements.filter(s => s.settlementStatus === 'pending').length;
  
  const unsettledAmount = completedReservations
    .filter(r => !getSettlement(r.id))
    .reduce((sum, r) => sum + r.fee, 0);
  
  const settledAmount = settlements
    .filter(s => s.settlementStatus === 'completed')
    .reduce((sum, s) => sum + s.settlementAmount, 0);

  const thisMonthSettledAmount = settlements
    .filter(s => s.settlementDate && s.settlementDate.startsWith('2024-12'))
    .reduce((sum, s) => sum + s.settlementAmount, 0);

  // 정산 등록/수정 모달 열기
  const openSettlementModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    const settlement = getSettlement(reservation.id);
    
    if (settlement) {
      // 수정 모드
      setEditingSettlement(settlement);
      setFormData({
        cost: settlement.cost.toString(),
        profitRate: settlement.profitRate.toString(),
        paymentScheduledDate: settlement.paymentScheduledDate || '',
        memo: settlement.memo || ''
      });
    } else {
      // 신규 등록 모드
      setEditingSettlement(null);
      setFormData({
        cost: '',
        profitRate: '60',
        paymentScheduledDate: '',
        memo: ''
      });
    }
    
    setIsSettlementModalOpen(true);
  };

  // 모달 닫기
  const closeSettlementModal = () => {
    setIsSettlementModalOpen(false);
    setSelectedReservation(null);
    setEditingSettlement(null);
    setFormData({
      cost: '',
      profitRate: '60',
      paymentScheduledDate: '',
      memo: ''
    });
  };

  // 자동 계산
  const calculateSettlement = () => {
    if (!selectedReservation) return null;
    
    const revenue = selectedReservation.fee;
    const cost = parseFloat(formData.cost) || 0;
    const profitRate = parseFloat(formData.profitRate) || 0;
    
    const profit = revenue - cost;
    const commissionRate = 100 - profitRate;
    const settlementAmount = Math.round(profit * profitRate / 100);
    const commissionAmount = profit - settlementAmount;
    
    return {
      revenue,
      cost,
      profit,
      profitRate,
      commissionRate,
      settlementAmount,
      commissionAmount
    };
  };

  const calculated = calculateSettlement();

  // 정산 저장 (실제로는 API 호출)
  const handleSaveSettlement = () => {
    if (!selectedReservation || !calculated) return;
    
    console.log('정산 저장:', {
      reservationId: selectedReservation.id,
      ...calculated,
      paymentScheduledDate: formData.paymentScheduledDate,
      memo: formData.memo,
      settlementStatus: 'pending'
    });
    
    alert('정산 정보가 저장되었습니다!');
    closeSettlementModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* 안내 패널 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-blue-900" style={{ fontWeight: 600 }}>💰 정산관리 시스템</h4>
        <div className="space-y-1.5 text-[0.625rem] text-blue-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2">
            <span className="text-blue-600">•</span>
            <div><strong style={{ fontWeight: 600 }}>워크플로우:</strong> 예약 완료 → 정산 등록 → 정산 처리</div>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-600">•</span>
            <div><strong style={{ fontWeight: 600 }}>자동 계산:</strong> 순수익, 전문가 정산금액, 회사 수익 자동 계산</div>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-600">•</span>
            <div><strong style={{ fontWeight: 600 }}>관리:</strong> 정산 상태, 지급 예정일 관리</div>
          </div>
        </div>
      </div>

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>
            정산 관리
          </h3>
          <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>
            완료된 강연의 정산 정보를 등록하고 관리합니다. (총 {filteredReservations.length}건)
          </p>
        </div>
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* 미정산 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs text-yellow-900" style={{ fontWeight: 600 }}>
              미정산
            </h4>
            <AlertCircle className="w-4 h-4 text-yellow-600" />
          </div>
          <p className="text-xl text-yellow-900 mb-1 tabular-nums" style={{ fontWeight: 700 }}>
            {unsettledCount}건
          </p>
          <p className="text-xs text-yellow-700 tabular-nums" style={{ fontWeight: 500 }}>
            {unsettledAmount.toLocaleString()}원
          </p>
        </div>

        {/* 정산완료 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs text-green-900" style={{ fontWeight: 600 }}>
              정산완료
            </h4>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xl text-green-900 mb-1 tabular-nums" style={{ fontWeight: 700 }}>
            {settledCount}건
          </p>
          <p className="text-xs text-green-700 tabular-nums" style={{ fontWeight: 500 }}>
            {settledAmount.toLocaleString()}원
          </p>
        </div>

        {/* 이번달 정산 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs text-blue-900" style={{ fontWeight: 600 }}>
              이번달 정산
            </h4>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl text-blue-900 mb-1 tabular-nums" style={{ fontWeight: 700 }}>
            {settlements.filter(s => s.settlementDate && s.settlementDate.startsWith('2024-12')).length}건
          </p>
          <p className="text-xs text-blue-700 tabular-nums" style={{ fontWeight: 500 }}>
            {thisMonthSettledAmount.toLocaleString()}원
          </p>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
            filterStatus === 'all' ? 'bg-[#000050] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ fontWeight: filterStatus === 'all' ? 600 : 400 }}
        >
          전체 {completedReservations.length}
        </button>
        <button
          onClick={() => setFilterStatus('unsettled')}
          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
            filterStatus === 'unsettled' ? 'bg-[#000050] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ fontWeight: filterStatus === 'unsettled' ? 600 : 400 }}
        >
          미정산 {unsettledCount}
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
            filterStatus === 'completed' ? 'bg-[#000050] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ fontWeight: filterStatus === 'completed' ? 600 : 400 }}
        >
          정산완료 {settledCount}
        </button>
      </div>

      {/* 완료된 예약 목록 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>강연일</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>전문가</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>주최사</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>강연주제</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>강연료</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>정산상태</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => {
              const settlement = getSettlement(reservation.id);
              
              return (
                <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-900" style={{ fontWeight: 500 }}>
                    {reservation.reservationDate}
                    <br />
                    <span className="text-gray-500">{reservation.reservationTime}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-xs text-gray-900" style={{ fontWeight: 500 }}>{reservation.expert}</div>
                    <div className="text-[0.625rem] text-gray-500">{reservation.expertField}</div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>
                    {reservation.client}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>
                    {reservation.topic}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-900 tabular-nums" style={{ fontWeight: 600 }}>
                    {reservation.fee.toLocaleString()}원
                  </td>
                  <td className="px-3 py-2">
                    {settlement ? (
                      <div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] ${
                          settlement.settlementStatus === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`} style={{ fontWeight: 500 }}>
                          {settlement.settlementStatus === 'completed' ? '정산완료' : '정산대기'}
                        </span>
                        {settlement.settlementStatus === 'completed' && settlement.settlementDate && (
                          <div className="text-[0.625rem] text-gray-500 mt-1">
                            {settlement.settlementDate}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] bg-gray-100 text-gray-800" style={{ fontWeight: 500 }}>
                        미등록
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <button 
                      onClick={() => openSettlementModal(reservation)}
                      className="text-xs text-[#000050] hover:underline" 
                      style={{ fontWeight: 500 }}
                    >
                      {settlement ? '정산 수정' : '정산 등록'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm" style={{ fontWeight: 400 }}>표시할 데이터가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 정산 등록/수정 모달 */}
      {isSettlementModalOpen && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>
                {editingSettlement ? '정산 수정' : '정산 등록'}
              </h3>
              <button 
                onClick={closeSettlementModal}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6">
              {/* 예약 정보 (읽기 전용) */}
              <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5 mb-6">
                <h4 className="text-sm text-gray-700 mb-4 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <Calendar className="w-4 h-4" />
                  예약 정보
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600" style={{ fontWeight: 400 }}>전문가</span>
                    <p className="text-gray-900 mt-1.5" style={{ fontWeight: 500 }}>
                      {selectedReservation.expert} ({selectedReservation.expertField})
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600" style={{ fontWeight: 400 }}>강연일</span>
                    <p className="text-gray-900 mt-1.5" style={{ fontWeight: 500 }}>
                      {selectedReservation.reservationDate} {selectedReservation.reservationTime}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600" style={{ fontWeight: 400 }}>주최사</span>
                    <p className="text-gray-900 mt-1.5" style={{ fontWeight: 500 }}>
                      {selectedReservation.client}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600" style={{ fontWeight: 400 }}>장소</span>
                    <p className="text-gray-900 mt-1.5" style={{ fontWeight: 500 }}>
                      {selectedReservation.locationType === 'online' ? '온라인' : '오프라인'} ({selectedReservation.location})
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600" style={{ fontWeight: 400 }}>강연주제</span>
                    <p className="text-gray-900 mt-1.5" style={{ fontWeight: 500 }}>
                      {selectedReservation.topic}
                    </p>
                  </div>
                </div>
              </div>

              {/* 정산 정보 입력 */}
              <div className="space-y-6">
                <h4 className="text-sm text-[#1e1e1e] flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <Calculator className="w-5 h-5 text-[#000050]" />
                  정산 정보
                </h4>

                {/* 강연료 (매출) */}
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    강연료 (매출)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedReservation.fee.toLocaleString()}
                      disabled
                      className="w-full h-11 px-4 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                      style={{ fontWeight: 500 }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      원 (예약에서 자동 입력)
                    </span>
                  </div>
                </div>

                {/* 비용 */}
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    비용 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      placeholder="0"
                      className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                      style={{ fontWeight: 500 }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">원</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">강연 진행에 소요된 비용을 입력하세요.</p>
                </div>

                {/* 순수익 (자동 계산) */}
                {calculated && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>순수익 (매출 - 비용)</span>
                      <span className="text-xl text-[#000050] tabular-nums" style={{ fontWeight: 700 }}>
                        {calculated.profit.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                )}

                {/* 전문가 정산 비율 */}
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    전문가 정산 비율 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={formData.profitRate}
                        onChange={(e) => setFormData({ ...formData, profitRate: e.target.value })}
                        min="0"
                        max="100"
                        placeholder="60"
                        className="w-full h-11 px-4 pr-12 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                        style={{ fontWeight: 500 }}
                      />
                      <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-600" style={{ fontWeight: 400 }}>
                      (회사: {calculated ? calculated.commissionRate : 0}%)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">전문가에게 지급할 비율을 입력하세요. (예: 60)</p>
                </div>

                {/* 정산 금액 (자동 계산) */}
                {calculated && (
                  <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                    <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                      💰 정산 금액
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 전문가 정산금액 */}
                      <div className="bg-white border border-blue-200 rounded-lg p-4">
                        <span className="text-xs text-gray-600 block mb-2" style={{ fontWeight: 500 }}>
                          전문가 정산금액
                        </span>
                        <div className="text-2xl text-[#000050] tabular-nums" style={{ fontWeight: 700 }}>
                          {calculated.settlementAmount.toLocaleString()}<span className="text-sm ml-1">원</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">순수익의 {calculated.profitRate}%</p>
                      </div>

                      {/* 회사 수익 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <span className="text-xs text-gray-600 block mb-2" style={{ fontWeight: 500 }}>
                          회사 수익
                        </span>
                        <div className="text-2xl text-gray-900 tabular-nums" style={{ fontWeight: 700 }}>
                          {calculated.commissionAmount.toLocaleString()}<span className="text-sm ml-1">원</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">순수익의 {calculated.commissionRate}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 지급 예정일 */}
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    지급 예정일
                  </label>
                  <input
                    type="date"
                    value={formData.paymentScheduledDate}
                    onChange={(e) => setFormData({ ...formData, paymentScheduledDate: e.target.value })}
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                  />
                </div>

                {/* 메모 */}
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    메모 (선택)
                  </label>
                  <textarea
                    value={formData.memo}
                    onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                    placeholder="정산 관련 메모를 입력하세요."
                    rows={3}
                    className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200 resize-none"
                    style={{ fontWeight: 400 }}
                  />
                </div>
              </div>

              {/* 계산 요약 */}
              {calculated && (
                <div className="mt-6 bg-gradient-to-br from-[#000050] to-[#000070] rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5" />
                    <h4 className="text-sm" style={{ fontWeight: 600 }}>정산 요약</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span style={{ fontWeight: 400 }}>강연료 (매출)</span>
                      <span className="tabular-nums" style={{ fontWeight: 600 }}>
                        {calculated.revenue.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ fontWeight: 400 }}>비용</span>
                      <span className="tabular-nums" style={{ fontWeight: 600 }}>
                        - {calculated.cost.toLocaleString()}원
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between">
                      <span style={{ fontWeight: 500 }}>순수익</span>
                      <span className="tabular-nums text-base" style={{ fontWeight: 700 }}>
                        {calculated.profit.toLocaleString()}원
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-3 mt-2">
                      <div className="flex justify-between mb-2">
                        <span style={{ fontWeight: 400 }}>전문가 ({calculated.profitRate}%)</span>
                        <span className="tabular-nums" style={{ fontWeight: 600 }}>
                          {calculated.settlementAmount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ fontWeight: 400 }}>회사 ({calculated.commissionRate}%)</span>
                        <span className="tabular-nums" style={{ fontWeight: 600 }}>
                          {calculated.commissionAmount.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 버튼 */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeSettlementModal}
                  className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  취소
                </button>
                <button
                  onClick={handleSaveSettlement}
                  disabled={!formData.cost || !calculated}
                  className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ fontWeight: 600 }}
                >
                  {editingSettlement ? '정산 수정하기' : '정산 등록하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}