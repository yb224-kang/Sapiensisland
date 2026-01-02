import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, FileText, DollarSign, Settings, BarChart3, X, MessageCircle, Clock, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminFormModal from '../components/AdminFormModal';
import SettlementContent from '../components/SettlementContent';
import DashboardContent from '../components/DashboardContent';
import InquiryContent from '../components/InquiryContent';
import PartnersContent from '../components/PartnersContentAdmin';
import { reservations as mockReservations } from '../data/mockData';
import { historyData, categoryEmojiMap } from '../data/historyData';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: '대시보드', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'reservations', label: '예약 신청 내역 관리', icon: <Calendar className="w-4 h-4" /> },
  { id: 'experts', label: '지혜 전문가 관리', icon: <Users className="w-4 h-4" /> },
  { id: 'contents', label: '콘텐츠 관리', icon: <FileText className="w-4 h-4" /> },
  { id: 'history', label: '연혁 관리', icon: <Clock className="w-4 h-4" /> },
  { id: 'partners', label: '파트너사 로고 관리', icon: <Building2 className="w-4 h-4" /> },
  { id: 'settlement', label: '정산 관리', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'inquiries', label: '기타문의 관리', icon: <MessageCircle className="w-4 h-4" /> },
  { id: 'admins', label: 'ADMIN 관리', icon: <Settings className="w-4 h-4" /> },
];

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'reservations':
        return <ReservationsContent />;
      case 'experts':
        return <ExpertsContent />;
      case 'contents':
        return <ContentsContent />;
      case 'history':
        return <HistoryContent />;
      case 'partners':
        return <PartnersContent />;
      case 'settlement':
        return <SettlementContent />;
      case 'inquiries':
        return <InquiryContent />;
      case 'admins':
        return <AdminsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Pretendard Variable, sans-serif' }}>
      {/* Sidebar */}
      <aside
        className={`bg-[#000050] text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } flex flex-col fixed h-full z-50`}
      >
        {/* Header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-sm tracking-tight" style={{ fontWeight: 600 }}>
              ADMIN
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-auto"
            aria-label={isSidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setSelectedMenu(item.id)}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-xs ${
                    selectedMenu === item.id
                      ? 'bg-white text-[#000050]'
                      : 'text-white hover:bg-white/10'
                  }`}
                  style={{ fontWeight: selectedMenu === item.id ? 600 : 400 }}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="text-left truncate">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {isSidebarOpen && (
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.625rem] text-white/70" style={{ fontWeight: 400 }}>
                © SAPIENS ISLAND
              </p>
              <Link 
                to="/" 
                className="text-[0.625rem] text-white/70 hover:text-white transition-colors"
                style={{ fontWeight: 400 }}
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <h2 className="text-sm tracking-tight text-[#1e1e1e]" style={{ fontWeight: 600 }}>
              {menuItems.find(item => item.id === selectedMenu)?.label}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600" style={{ fontWeight: 400 }}>
                관리자
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Content Components
function ReservationsContent() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 중앙 Mock 데이터 사용
  const reservations = mockReservations;

  const statuses = [
    { value: 'all', label: '전체' },
    { value: 'pending', label: '대기중' },
    { value: 'confirmed', label: '확정' },
    { value: 'completed', label: '완료' },
    { value: 'cancelled', label: '취소' }
  ];

  const filteredReservations = filterStatus === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === filterStatus);

  // Calendar helpers
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getReservationsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.filter(r => r.reservationDate === dateStr);
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* 안내 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-green-900" style={{ fontWeight: 600 }}>📅 예약신청 데이터 구조</h4>
        <div className="space-y-1.5 text-[0.625rem] text-green-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2">
            <span className="text-green-600">•</span>
            <div><strong style={{ fontWeight: 600 }}>예약 기본:</strong> 전문가, 날짜/시간, 장소(온라인/오프라인)</div>
          </div>
          <div className="flex gap-2">
            <span className="text-green-600">•</span>
            <div><strong style={{ fontWeight: 600 }}>강연 정보:</strong> 요청사, 주최사, 강연주제, 강연대상, 강연료</div>
          </div>
          <div className="flex gap-2">
            <span className="text-green-600">•</span>
            <div><strong style={{ fontWeight: 600 }}>담당자:</strong> 성함, 전화번호, 이메일, 기타 문의내용</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>
              예약신청 내역
            </h3>
            <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>
              고객의 예약 신청 내역을 확인하고 관리할 수 있습니다. (총 {filteredReservations.length}건)
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                viewMode === 'list' ? 'bg-white text-[#000050] shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontWeight: viewMode === 'list' ? 600 : 400 }}
            >
              목록형
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-[#000050] shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontWeight: viewMode === 'calendar' ? 600 : 400 }}
            >
              달력형
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {statuses.map(status => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
                filterStatus === status.value ? 'bg-[#000050] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{ fontWeight: filterStatus === status.value ? 600 : 400 }}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>신청일시</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>예약일시</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>전문가</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>주최사</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>담당자</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>장소</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>상태</th>
                <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{item.createdAt}</td>
                  <td className="px-3 py-2 text-xs text-gray-900" style={{ fontWeight: 500 }}>
                    {item.reservationDate}<br/><span className="text-gray-500">{item.reservationTime}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-xs text-gray-900" style={{ fontWeight: 500 }}>{item.expert}</div>
                    <div className="text-[0.625rem] text-gray-500">{item.expertField}</div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{item.client}</td>
                  <td className="px-3 py-2">
                    <div className="text-xs text-gray-900" style={{ fontWeight: 500 }}>{item.contactName}</div>
                    <div className="text-[0.625rem] text-gray-500">{item.contactPhone}</div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] ${
                      item.locationType === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`} style={{ fontWeight: 500 }}>
                      {item.locationType === 'online' ? '온라인' : '오프라인'}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] ${
                      item.status === 'completed' ? 'bg-blue-100 text-blue-800' : item.status === 'confirmed' ? 'bg-green-100 text-green-800' : item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`} style={{ fontWeight: 500 }}>
                      {item.status === 'completed' ? '완료' : item.status === 'confirmed' ? '확정' : item.status === 'pending' ? '대기중' : '취소'}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={() => { setSelectedReservation(item); setIsDetailModalOpen(true); }} className="text-xs text-[#000050] hover:underline" style={{ fontWeight: 500 }}>
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="text-sm text-gray-900" style={{ fontWeight: 700 }}>
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h4>
            <div className="flex gap-2">
              <button onClick={goToPrevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <div key={day} className={`text-center py-2 text-xs ${index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'}`} style={{ fontWeight: 600 }}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {generateCalendarDays().map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="border border-gray-100 bg-gray-50/50 min-h-[80px]" />;
                }

                const dayReservations = getReservationsForDate(day);
                const isToday = day.toDateString() === new Date().toDateString();

                return (
                  <div key={day.toISOString()} className={`border border-gray-100 p-2 min-h-[80px] hover:bg-gray-50 transition-colors ${isToday ? 'bg-blue-50' : ''}`}>
                    <div className={`text-xs mb-1 ${isToday ? 'text-blue-600 font-bold' : 'text-gray-700'}`} style={{ fontWeight: isToday ? 700 : 500 }}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayReservations.slice(0, 2).map((res) => (
                        <button
                          key={res.id}
                          onClick={() => { setSelectedReservation(res); setIsDetailModalOpen(true); }}
                          className={`w-full text-left px-1.5 py-1 rounded text-[0.625rem] truncate ${
                            res.status === 'completed' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : res.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : res.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {res.reservationTime} {res.expert}
                        </button>
                      ))}
                      {dayReservations.length > 2 && (
                        <div className="text-[0.625rem] text-gray-500 text-center">+{dayReservations.length - 2}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsDetailModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>예약 상세 정보</h3>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  selectedReservation.status === 'completed' ? 'bg-blue-100 text-blue-800' : selectedReservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : selectedReservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`} style={{ fontWeight: 600 }}>
                  {selectedReservation.status === 'completed' ? '완료' : selectedReservation.status === 'confirmed' ? '확정' : selectedReservation.status === 'pending' ? '대기중' : '취소'}
                </span>
                <button 
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">

            <div className="space-y-6">
              <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  📅 예약 기본 정보
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">전문가:</span><span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>{selectedReservation.expert}</span><span className="ml-1 text-gray-500">({selectedReservation.expertField})</span></div>
                  <div><span className="text-gray-500">예약일시:</span><span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>{selectedReservation.reservationDate} {selectedReservation.reservationTime}</span></div>
                  <div><span className="text-gray-500">장소 유형:</span><span className={`ml-2 px-2 py-0.5 rounded-full text-[0.625rem] ${selectedReservation.locationType === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`} style={{ fontWeight: 500 }}>{selectedReservation.locationType === 'online' ? '온라인' : '오프라인'}</span></div>
                  <div><span className="text-gray-500">장소:</span><span className="ml-2 text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.location}</span></div>
                </div>
              </div>

              <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  🎤 강연 정보
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex"><span className="text-gray-500 w-24">요청사:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.agency}</span></div>
                  <div className="flex"><span className="text-gray-500 w-24">주최사:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.client}</span></div>
                  <div className="flex"><span className="text-gray-500 w-24">강연 주제:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.topic}</span></div>
                  <div className="flex"><span className="text-gray-500 w-24">강연 대상:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.audience}</span></div>
                  <div className="flex"><span className="text-gray-500 w-24">강연료:</span><span className="text-gray-900" style={{ fontWeight: 600 }}>{selectedReservation.fee?.toLocaleString()}원</span></div>
                </div>
              </div>

              <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  👤 담당자 정보
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex"><span className="text-gray-500 w-24">성함:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.contactName}</span></div>
                  <div className="flex"><span className="text-gray-500 w-24">전화번호:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.contactPhone}</span></div>
                  <div className="flex"><span className="text-gray-500 w-24">이메일:</span><span className="text-gray-900" style={{ fontWeight: 500 }}>{selectedReservation.contactEmail}</span></div>
                </div>
              </div>

              {selectedReservation.message && (
                <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm mb-3 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                    💬 기타 문의내용
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line" style={{ fontWeight: 400 }}>{selectedReservation.message}</p>
                </div>
              )}

              <div className="text-xs text-gray-500 text-right">신청일시: {selectedReservation.createdAt}</div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setIsDetailModalOpen(false)} 
                className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors" 
                style={{ fontWeight: 500 }}
              >
                닫기
              </button>
              <button 
                className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30" 
                style={{ fontWeight: 600 }}
              >
                예약 확정하기
              </button>
              <button 
                className="flex-1 h-12 px-6 text-sm text-white bg-red-600 rounded-xl hover:bg-red-700 active:scale-98 transition-all duration-200 shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30" 
                style={{ fontWeight: 600 }}
              >
                예약 취소하기
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExpertsContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [filterField, setFilterField] = useState<string>('all');

  // Mock Experts data - 실제로는 professors.ts 데이터 구조 사용
  const experts = [
    {
      id: 1,
      professorId: "SP0001",
      name: "김경일",
      title: "아주대학교 심리학과 교수",
      field: "심리학",
      image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP001.png",
      education: "- 고려대학교 심리학과 학사 및 석사\n- Univ.of Texas-Austin 심리학 박사",
      expertise: "- [소통] 마음의 지혜 : 행복과 회복탄력성\n- [조직관리와 커뮤니케이션] 접근과 ���피의 소통?과 지혜",
      shortBio: "Univ.of Texas-Austin 심리학 박사\n마음의 지혜와 행복, 창의와 혁신"
    },
    {
      id: 2,
      professorId: "SP0002",
      name: "김태훈",
      title: "경남대학교 심리학과 교수",
      field: "심리학",
      image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP002.png",
      education: "- 고려대학교 심리학과 학사 및 석사\n- The Ohio State Univ. 심리학 박사",
      expertise: "- 창의적으로 일하는 방법\n- [인간의 배움행동 바로 알기] 메타인지를 알면 지혜가 보인다",
      shortBio: "The Ohio State Univ. 심리학 박사\n창의적 사고와 메타인지 전문가"
    },
    {
      id: 6,
      professorId: "SP0006",
      name: "정재한",
      title: "네모파트너즈 전 대표이사",
      field: "경영전략",
      image: "https://raw.githubusercontent.com/yb224-kang/SAPIENS/refs/heads/main/professors/SP006.png",
      education: "- 고려대학교 경영학과\n- University of Pennsylvania Wharton MBA",
      expertise: "- 경영전략, 전략 강의, 비즈니스 코칭\n- [전략 강의] 기업체 및 학교",
      shortBio: "Wharton MBA\n경영전략 및 비즈니스 컨설팅"
    }
  ];

  const fields = ['all', '심리학', '교육학', '경영전략', '미디어', '교육'];
  const filteredExperts = filterField === 'all' 
    ? experts 
    : experts.filter(e => e.field === filterField);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* 등록 로직 안내 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-purple-900" style={{ fontWeight: 600 }}>👨‍🏫 지혜전문가 등록 방식</h4>
        <div className="space-y-1.5 text-[0.625rem] text-purple-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2">
            <span className="text-purple-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>기본 정보:</strong> 교수ID(SP0001), 이름, 직함, 전문분야, 프로필 이미지
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-purple-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>상세 정보:</strong> 학력, 주요 강연/전문분야, 짧은 소개(shortBio)
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-purple-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>홈페이지 표시:</strong> 플립 카드(앞면: 사진/이름/분야, 뒷면: 학력/전문분야)
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>
            지혜전문가 관리
          </h3>
          <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>
            등록된 지혜전문가 정보를 관리할 수 있습니다. (총 {filteredExperts.length}명)
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 text-xs bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors whitespace-nowrap" 
          style={{ fontWeight: 500 }}
        >
          + 전문가 등록
        </button>
      </div>

      {/* 전문분야 필터 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {fields.map(field => (
          <button
            key={field}
            onClick={() => setFilterField(field)}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
              filterField === field
                ? 'bg-[#000050] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ fontWeight: filterField === field ? 600 : 400 }}
          >
            {field === 'all' ? '전체' : field}
          </button>
        ))}
      </div>

      {/* 전문가 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredExperts.map((expert) => (
          <div key={expert.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              {/* Profile Image */}
              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
                <img 
                  src={expert.image} 
                  alt={expert.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) sepia(20%) hue-rotate(200deg) saturate(150%)' }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-xs text-gray-900 truncate" style={{ fontWeight: 600 }}>
                    {expert.name}
                  </h4>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[0.625rem] whitespace-nowrap" style={{ fontWeight: 500 }}>
                    {expert.professorId}
                  </span>
                </div>
                <p className="text-[0.625rem] text-gray-600 mb-1 line-clamp-1" style={{ fontWeight: 400 }}>
                  {expert.title}
                </p>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[0.625rem]" style={{ fontWeight: 600 }}>
                    {expert.field}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => {
                      setSelectedExpert(expert);
                      setIsEditModalOpen(true);
                    }}
                    className="px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50" 
                    style={{ fontWeight: 500 }}
                  >
                    상세/수정
                  </button>
                  <button className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50" style={{ fontWeight: 500 }}>
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Expert Modal */}
      {isAddModalOpen && (
        <ExpertFormModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="지혜전문가 등록"
          mode="add"
        />
      )}

      {/* Edit Expert Modal */}
      {isEditModalOpen && selectedExpert && (
        <ExpertFormModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedExpert(null);
          }}
          title="지혜전문가 상세/수정"
          mode="edit"
          expert={selectedExpert}
        />
      )}
    </div>
  );
}

// Expert Form Modal Component
function ExpertFormModal({ isOpen, onClose, title, mode, expert }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>{title}</h3>
          <div className="flex items-center gap-3">
            {mode === 'edit' && expert && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs" style={{ fontWeight: 600 }}>
                {expert.professorId}
              </span>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
        <div className="space-y-6">
          {/* 기본 정보 섹션 */}
          <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
            <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
              📋 기본 정보
            </h4>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    교수 ID <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="SP0001"
                    defaultValue={expert?.professorId}
                  />
                  <p className="text-xs text-gray-500 mt-2">형식: SP0001, SP0002...</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="홍길동"
                    defaultValue={expert?.name}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                  직함/소속 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                  style={{ fontWeight: 500 }}
                  placeholder="OO대학교 OO학과 교수"
                  defaultValue={expert?.title}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    전문분야 <span className="text-red-500">*</span>
                  </label>
                  <select 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    defaultValue={expert?.field}
                  >
                    <option value="">선택하세요</option>
                    <option value="심리학">심리학</option>
                    <option value="교육학">교육학</option>
                    <option value="경영전략">경영전략</option>
                    <option value="미디어">미디어</option>
                    <option value="교육">교육</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">카드 필터링 및 뱃지로 사용</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    프로필 이미지 URL <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="url" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="https://..."
                    defaultValue={expert?.image}
                  />
                  <p className="text-xs text-gray-500 mt-2">카드 앞면에 표시</p>
                </div>
              </div>
            </div>
          </div>

          {/* 상세 정보 섹션 */}
          <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
            <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
              📚 상세 정보 (플립 카드 뒷면)
            </h4>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                  짧은 소개 (Short Bio) <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200 resize-none"
                  style={{ fontWeight: 400 }}
                  placeholder="2-3줄 요약 소개&#10;예: Univ.of Texas-Austin 심리학 박사&#10;마음의 지혜와 행복, 창의와 혁신"
                  rows={3}
                  defaultValue={expert?.shortBio}
                />
                <p className="text-xs text-gray-500 mt-2">플립 카드 뒷면 상단에 표시 (2-3줄)</p>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                  학력 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200 resize-none"
                  style={{ fontWeight: 400 }}
                  placeholder="- OO대학교 OO학과 학사 및 석사&#10;- University of OO 박사"
                  rows={3}
                  defaultValue={expert?.education}
                />
                <p className="text-xs text-gray-500 mt-2">플립 카드 뒷면 '학력' 섹션에 표시</p>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                  주요 강연/전문분야 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200 resize-none"
                  style={{ fontWeight: 400 }}
                  placeholder="- [리더십] 난국을 돌파하는 공감과 소통의 리더십&#10;- [인간지성] 지식으로 지시하지말고 지혜로 지휘하라&#10;- [스트레스 관리] 체인지의 지혜로 스트레스를 체인지하라!"
                  rows={5}
                  defaultValue={expert?.expertise}
                />
                <p className="text-xs text-gray-500 mt-2">플립 카드 뒷면 '주요 분야' 섹션에 표시 (처음 3줄만 표시)</p>
              </div>
            </div>
          </div>

          {/* 미리보기 안내 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-700 mb-1" style={{ fontWeight: 600 }}>
              💡 홈페이지 표시 위치
            </p>
            <ul className="space-y-0.5 text-xs text-gray-600" style={{ fontWeight: 400 }}>
              <li>• <strong>카드 앞면:</strong> 프로필 이미지, 이름, 직함, 전문분야 뱃지</li>
              <li>• <strong>카드 뒷면 (호버):</strong> 이름, 전문분야, Short Bio, 학력, 주요분야(3줄)</li>
              <li>• <strong>홈 섹션:</strong> 2x4 그리드로 처음 8명만 표시</li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            style={{ fontWeight: 500 }}
          >
            취소
          </button>
          <button 
            className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30"
            style={{ fontWeight: 600 }}
          >
            {mode === 'add' ? '전문가 등록하기' : '전문가 수정하기'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

function ContentsContent() {
  const [contentTab, setContentTab] = useState<'pr' | 'youtube'>('pr');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>
            콘텐츠 관리
          </h3>
          <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>
            게시된 콘텐츠를 관리하고 새 콘텐츠를 등록할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        <button
          onClick={() => setContentTab('pr')}
          className={`px-3 py-2 text-xs transition-colors ${
            contentTab === 'pr'
              ? 'border-b-2 border-[#000050] text-[#000050]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontWeight: contentTab === 'pr' ? 600 : 400 }}
        >
          PR 콘텐츠
        </button>
        <button
          onClick={() => setContentTab('youtube')}
          className={`px-3 py-2 text-xs transition-colors ${
            contentTab === 'youtube'
              ? 'border-b-2 border-[#000050] text-[#000050]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontWeight: contentTab === 'youtube' ? 600 : 400 }}
        >
          유튜브 콘텐츠
        </button>
      </div>

      {contentTab === 'pr' ? <PRContentTab /> : <YoutubeContentTab />}
    </div>
  );
}

// PR Content Tab Component
function PRContentTab() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock PR data
  const prContents = [
    {
      id: 1,
      title: "사피엔스아일랜드, '헥사코 모델' 활용 초개인화 플랫폼 개발 착수",
      date: "2024.09.05",
      source: "뉴스웨이",
      articleUrl: "https://www.newsway.co.kr/news/view?ud=2024090515202691903",
      imageUrl: "https://nimage.newsway.co.kr/photo/2024/09/05/20240905000146_0700.jpg"
    },
    {
      id: 2,
      title: "신박해도 아름답지 않으면 눈길 못 끌어… 정보 전달력 떨어지면 소비자에 못 다가가",
      date: "2025.07.22",
      source: "조선일보",
      articleUrl: "https://www.chosun.com/special/special_section/2025/07/22/35PUQEWDGJEO7MPFFRHS2B573Q/",
      imageUrl: "https://www.chosun.com/resizer/v2/THJSEPM7FRHHRN5LJV4J2BSKG4.jpg"
    }
  ];

  return (
    <div>
      {/* 등록 로직 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-blue-900" style={{ fontWeight: 600 }}>📋 PR 콘텐츠 등록 방식</h4>
        <div className="space-y-1.5 text-[0.625rem] text-blue-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2">
            <span className="text-blue-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>관리자 입력:</strong> 기사 URL + 이미지 URL (2개만)
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>자동 처리:</strong> 제목, 언론사, 게시일 (기사 페이지에서 자동 추출)
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>홈페이지 표시:</strong> 이미지 썸네일 카드 → 클릭 시 기사 원문 모달로 표시
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-3">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 text-xs bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors" 
          style={{ fontWeight: 500 }}
        >
          + PR 콘텐츠 등록
        </button>
      </div>

      <div className="space-y-2">
        {prContents.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs text-gray-900 mb-1 line-clamp-2" style={{ fontWeight: 600 }}>
                  {item.title}
                </h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-[0.625rem] text-gray-600" style={{ fontWeight: 400 }}>
                    {item.source}
                  </span>
                  <span className="text-[0.625rem] text-gray-400">•</span>
                  <span className="text-[0.625rem] text-gray-600" style={{ fontWeight: 400 }}>
                    {item.date}
                  </span>
                </div>
                <div className="text-[0.625rem] text-gray-500 truncate mb-2" style={{ fontWeight: 400 }}>
                  <span className="text-gray-700">기사 URL:</span> {item.articleUrl}
                </div>
                <div className="text-[0.625rem] text-gray-500 truncate" style={{ fontWeight: 400 }}>
                  <span className="text-gray-700">이미지 URL:</span> {item.imageUrl}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5">
                <button className="px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50 whitespace-nowrap" style={{ fontWeight: 500 }}>
                  수정
                </button>
                <button className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 whitespace-nowrap" style={{ fontWeight: 500 }}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add PR Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>PR 콘텐츠 등록</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xs text-gray-600 mb-6" style={{ fontWeight: 400 }}>
                기사 URL과 이미지 URL만 입력하면, 제목/언론사/게시일은 자동으로 추출됩니다.
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    기사 URL <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="url" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="https://www.newsway.co.kr/news/view?ud=..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    기사 원문 URL을 입력하세요. 이 URL에서 제목, 언론사, 게시일이 자동 추출됩니다.
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    썸네일 이미지 URL <span className="text-red-500">*</span>
                  </label>
                  <input 
                  type="url" 
                  className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                  style={{ fontWeight: 500 }}
                  placeholder="https://nimage.newsway.co.kr/photo/..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  홈페이지 카드에 표시될 대표 이미지 URL을 입력하세요.
                </p>
              </div>

              {/* 자동 추출 안내 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-700 mb-1" style={{ fontWeight: 600 }}>
                  🤖 자동 처리되는 정보
                </p>
                <ul className="space-y-0.5 text-xs text-gray-600" style={{ fontWeight: 400 }}>
                  <li>• 제목: 기사 페이지에서 자동 추출</li>
                  <li>• 언론사: 기사 URL에서 자동 추출</li>
                  <li>• 게시일: 기사 메타데이터에서 자동 추출</li>
                </ul>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                style={{ fontWeight: 500 }}
              >
                취소
              </button>
              <button 
                className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30"
                style={{ fontWeight: 600 }}
              >
                PR 콘텐츠 등록하기
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// YouTube Content Tab Component
function YoutubeContentTab() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock YouTube data
  const youtubeContents = [
    {
      id: 1,
      videoId: "CEg-OJItD7Y",
      thumbnail: "https://img.youtube.com/vi/CEg-OJItD7Y/maxresdefault.jpg",
      title: "사피엔스아일랜드 소개 영상",
      url: "https://www.youtube.com/watch?v=CEg-OJItD7Y"
    },
    {
      id: 2,
      videoId: "Z6SoJHWOD5U",
      thumbnail: "https://img.youtube.com/vi/Z6SoJHWOD5U/maxresdefault.jpg",
      title: "HATI 플랫폼 데모",
      url: "https://www.youtube.com/watch?v=Z6SoJHWOD5U"
    }
  ];

  return (
    <div>
      {/* 등록 로직 안내 */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-red-900" style={{ fontWeight: 600 }}>📺 유튜브 콘텐츠 등록 방식</h4>
        <div className="space-y-1.5 text-[0.625rem] text-red-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2">
            <span className="text-red-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>관리자 입력:</strong> YouTube URL만 (1개)
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-red-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>자동 처리:</strong> Video ID 추출 + 썸네일 URL 자동 생성
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-red-600">•</span>
            <div>
              <strong style={{ fontWeight: 600 }}>홈페이지 표시:</strong> 썸네일 카드 → 클릭 시 해당 위치에서 YouTube 영상 재생
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-3">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 text-xs bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors" 
          style={{ fontWeight: 500 }}
        >
          + 유튜브 콘텐츠 등록
        </button>
      </div>

      <div className="space-y-2">
        {youtubeContents.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
            <div className="flex gap-3">
              {/* Thumbnail */}
              <div className="w-28 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* YouTube Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600/90 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs text-gray-900 mb-1 line-clamp-1" style={{ fontWeight: 600 }}>
                  {item.title || `YouTube 영상 (ID: ${item.videoId})`}
                </h4>
                <div className="text-[0.625rem] text-gray-500 mb-1" style={{ fontWeight: 400 }}>
                  <span className="text-gray-700">Video ID:</span> {item.videoId}
                </div>
                <div className="text-[0.625rem] text-gray-500 truncate" style={{ fontWeight: 400 }}>
                  <span className="text-gray-700">URL:</span> {item.url}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5">
                <button className="px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50 whitespace-nowrap" style={{ fontWeight: 500 }}>
                  수정
                </button>
                <button className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 whitespace-nowrap" style={{ fontWeight: 500 }}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add YouTube Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>유튜브 콘텐츠 등록</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xs text-gray-600 mb-6" style={{ fontWeight: 400 }}>
                YouTube URL만 입력하면, Video ID와 썸네일이 자동으로 생성됩니다.
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    YouTube URL <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="https://www.youtube.com/watch?v=CEg-OJItD7Y"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    유튜브 영상 URL 또는 Video ID만 입력하세요.<br/>
                    예: <code className="bg-gray-100 px-1 py-0.5 rounded">https://www.youtube.com/watch?v=CEg-OJItD7Y</code> 또는 <code className="bg-gray-100 px-1 py-0.5 rounded">CEg-OJItD7Y</code>
                  </p>
                </div>

                {/* 자동 생성 안내 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-700 mb-1" style={{ fontWeight: 600 }}>
                    🤖 자동 처리되는 정보
                  </p>
                  <ul className="space-y-0.5 text-xs text-gray-600" style={{ fontWeight: 400 }}>
                    <li>• Video ID: URL에서 자동 추출 (예: CEg-OJItD7Y)</li>
                    <li>• 썸네일: https://img.youtube.com/vi/{`{videoId}`}/maxresdefault.jpg 자동 생성</li>
                    <li>• Embed URL: https://www.youtube.com/embed/{`{videoId}`}?autoplay=1 자동 생성</li>
                  </ul>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  style={{ fontWeight: 500 }}
              >
                  취소
                </button>
                <button 
                  className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30"
                  style={{ fontWeight: 600 }}
                >
                  유튜브 콘텐츠 등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function HistoryContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterYear, setFilterYear] = useState<string>('all');

  // historyData를 import하여 사용 (공통 데이터 소스)
  // 관리 페이지용으로 플랫한 구조로 변환
  const historyItems = historyData.flatMap(quarter => 
    quarter.content.map((item, idx) => ({
      id: `${quarter.id}-${idx}`,
      year: quarter.year,
      quarter: quarter.quarter,
      category: item.category,
      content: item.items.join(', '),
      icon: categoryEmojiMap[item.category] || '📌',
      createdAt: quarter.createdAt,
      period: quarter.period
    }))
  );

  const filteredItems = historyItems.filter(item => {
    const yearMatch = filterYear === 'all' || item.year === filterYear;
    return yearMatch;
  });

  const years = Array.from(new Set(historyItems.map(item => item.year))).sort().reverse();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-blue-900" style={{ fontWeight: 600 }}>🕐 회사 연혁 관리</h4>
        <div className="space-y-1.5 text-[0.625rem] text-blue-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2"><span className="text-blue-600">•</span><div><strong style={{ fontWeight: 600 }}>기본 정보:</strong> 연도, 분기, 카테고리, 내용</div></div>
          <div className="flex gap-2"><span className="text-blue-600">•</span><div><strong style={{ fontWeight: 600 }}>추가/수정:</strong> 연혁 항목을 추가하거나 수정할 수 있습니다</div></div>
          <div className="flex gap-2"><span className="text-blue-600">•</span><div><strong style={{ fontWeight: 600 }}>삭제:</strong> 불필요한 연혁 항목을 삭제할 수 있습니다</div></div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>연혁 목록</h3>
            <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>회사의 주요 연혁을 관리할 수 있습니다. (총 {filteredItems.length}개)</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 text-xs bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors whitespace-nowrap" style={{ fontWeight: 500 }}>+ 연혁 추가</button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <label className="text-xs" style={{ fontWeight: 500 }}>연도 필터:</label>
          <select 
            value={filterYear} 
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-2 py-1 text-xs border border-gray-300 rounded-lg"
            style={{ fontWeight: 400 }}
          >
            <option value="all">전체</option>
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-xs" style={{ fontWeight: 600 }}>연도</th>
                <th className="px-3 py-2 text-xs" style={{ fontWeight: 600 }}>분기</th>
                <th className="px-3 py-2 text-xs" style={{ fontWeight: 600 }}>카테고리</th>
                <th className="px-3 py-2 text-xs" style={{ fontWeight: 600 }}>내용</th>
                <th className="px-3 py-2 text-xs" style={{ fontWeight: 600 }}>등록일</th>
                <th className="px-3 py-2 text-xs text-center" style={{ fontWeight: 600 }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-900" style={{ fontWeight: 600 }}>{item.year}</td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{item.quarter}</td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>
                    <span className="mr-1">{item.icon}</span>
                    {item.category}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{item.content}</td>
                  <td className="px-3 py-2 text-xs text-gray-500" style={{ fontWeight: 400 }}>{item.createdAt}</td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => {
                          setSelectedItem(item);
                          setIsEditModalOpen(true);
                        }}
                        className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" 
                        style={{ fontWeight: 500 }}
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('이 연혁 항목을 삭제하시겠습니까?')) {
                            console.log('Delete:', item.id);
                          }
                        }}
                        className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" 
                        style={{ fontWeight: 500 }}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 연혁 추가 모달 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-base" style={{ fontWeight: 600 }}>연혁 추가</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>연도</label>
                <input type="number" className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl" placeholder="2025" style={{ fontWeight: 500 }} />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>분기</label>
                <select className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl" style={{ fontWeight: 500 }}>
                  <option value="">선택</option>
                  <option value="1분기">1분기</option>
                  <option value="2분기">2분기</option>
                  <option value="3분기">3분기</option>
                  <option value="4분기">4분기</option>
                  <option value="3~4분기">3~4분기</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>카테고리</label>
                <select className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl" style={{ fontWeight: 500 }}>
                  <option value="">선택</option>
                  <option value="회사 설립">회사 설립</option>
                  <option value="B2B 자문 계약">B2B 자문 계약</option>
                  <option value="파트너 계약">파트너 계약</option>
                  <option value="지혜전문가 계약 체결">지혜전문가 계약 체결</option>
                  <option value="지혜전문가 출판">지혜전문가 출판</option>
                  <option value="업무협약식">업무협약식</option>
                  <option value="특허 출원">특허 출원</option>
                  <option value="앱 서비스 출시">앱 서비스 출시</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>내용</label>
                <textarea className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl" rows={3} placeholder="연혁 내용을 입력하세요" style={{ fontWeight: 500 }} />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" style={{ fontWeight: 500 }}>취소</button>
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-white bg-[#000050] rounded-lg hover:bg-[#000070] transition-colors" style={{ fontWeight: 500 }}>저장</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 연혁 수정 모달 */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-base" style={{ fontWeight: 600 }}>연혁 수정</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>연도</label>
                <input type="number" className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl" defaultValue={selectedItem.year} style={{ fontWeight: 500 }} />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>분기</label>
                <select className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl" defaultValue={selectedItem.quarter} style={{ fontWeight: 500 }}>
                  <option value="1분기">1분기</option>
                  <option value="2분기">2분기</option>
                  <option value="3분기">3분기</option>
                  <option value="4분기">4분기</option>
                  <option value="3~4분기">3~4분기</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>카테고리</label>
                <select className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl" defaultValue={selectedItem.category} style={{ fontWeight: 500 }}>
                  <option value="회사 설립">회사 설립</option>
                  <option value="B2B 자문 계약">B2B 자문 계약</option>
                  <option value="파트너 계약">파트너 계약</option>
                  <option value="지혜전문가 계약 체결">지혜전문가 계약 체결</option>
                  <option value="지혜전문가 출판">지혜전문가 출판</option>
                  <option value="업무협약식">업무협약식</option>
                  <option value="특허 출원">특허 출원</option>
                  <option value="앱 서비스 출시">앱 서비스 출시</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ fontWeight: 600 }}>내용</label>
                <textarea className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl" rows={3} defaultValue={selectedItem.content} style={{ fontWeight: 500 }} />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" style={{ fontWeight: 500 }}>취소</button>
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-white bg-[#000050] rounded-lg hover:bg-[#000070] transition-colors" style={{ fontWeight: 500 }}>저장</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminsContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const adminUsers = [
    { 
      id: 1, 
      name: "김관리", 
      email: "admin1@sapiens.com", 
      phone: "010-1234-5678", 
      department: "경영지원팀", 
      status: "active", 
      createdAt: "2024-01-15", 
      lastLogin: "2024-12-16 09:30",
      password: "sapiens2024!",
      permissions: {
        reservations: { read: true, write: true },
        experts: { read: true, write: true },
        contents: { read: true, write: true },
        settlement: { read: true, write: true },
        admins: { read: true, write: true }
      }
    },
    { 
      id: 2, 
      name: "이운영", 
      email: "admin2@sapiens.com", 
      phone: "010-2345-6789", 
      department: "서비스운영팀", 
      status: "active", 
      createdAt: "2024-03-20", 
      lastLogin: "2024-12-16 08:15",
      password: "admin1234!",
      permissions: {
        reservations: { read: true, write: true },
        experts: { read: true, write: true },
        contents: { read: true, write: true },
        settlement: { read: true, write: false },
        admins: { read: false, write: false }
      }
    },
    { 
      id: 3, 
      name: "박담당", 
      email: "admin3@sapiens.com", 
      phone: "010-3456-7890", 
      department: "콘텐츠팀", 
      status: "active", 
      createdAt: "2024-06-10", 
      lastLogin: "2024-12-15 17:45",
      password: "content2024!",
      permissions: {
        reservations: { read: true, write: false },
        experts: { read: true, write: false },
        contents: { read: true, write: true },
        settlement: { read: false, write: false },
        admins: { read: false, write: false }
      }
    },
    { 
      id: 4, 
      name: "최퇴사", 
      email: "admin4@sapiens.com", 
      phone: "010-4567-8901", 
      department: "마케팅팀", 
      status: "inactive", 
      createdAt: "2023-11-05", 
      lastLogin: "2024-10-30 14:20",
      password: "marketing123!",
      permissions: {
        reservations: { read: true, write: false },
        experts: { read: false, write: false },
        contents: { read: true, write: false },
        settlement: { read: false, write: false },
        admins: { read: false, write: false }
      }
    }
  ];

  const statuses = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '활성' },
    { value: 'inactive', label: '비활성' }
  ];

  const getPermissionSummary = (permissions: any) => {
    const accessibleMenus = [];
    if (permissions.reservations.read || permissions.reservations.write) accessibleMenus.push('예약');
    if (permissions.experts.read || permissions.experts.write) accessibleMenus.push('전문가');
    if (permissions.contents.read || permissions.contents.write) accessibleMenus.push('콘텐츠');
    if (permissions.settlement.read || permissions.settlement.write) accessibleMenus.push('정산');
    if (permissions.admins.read || permissions.admins.write) accessibleMenus.push('ADMIN');
    return accessibleMenus.length > 0 ? accessibleMenus.join(', ') : '접근권한 없음';
  };

  const filteredAdmins = adminUsers.filter(admin => {
    const statusMatch = filterStatus === 'all' || admin.status === filterStatus;
    return statusMatch;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-orange-900" style={{ fontWeight: 600 }}>⚙️ ADMIN 사용자 관리</h4>
        <div className="space-y-1.5 text-[0.625rem] text-orange-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2"><span className="text-orange-600">•</span><div><strong style={{ fontWeight: 600 }}>기본 정보:</strong> 이름, 이메일, 연락처, 소속부서</div></div>
          <div className="flex gap-2"><span className="text-orange-600">•</span><div><strong style={{ fontWeight: 600 }}>메뉴별 권한:</strong> 각 메뉴별로 읽기/쓰기 권한 개별 설정</div></div>
          <div className="flex gap-2"><span className="text-orange-600">•</span><div><strong style={{ fontWeight: 600 }}>상태 관리:</strong> 활성(로그인 가능) / 비활성(로그인 불가)</div></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>ADMIN 사용자 목록</h3>
            <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>관리자 계정을 추가, 수정, 삭제할 수 있습니다. (총 {filteredAdmins.length}명)</p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 text-xs bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors whitespace-nowrap" style={{ fontWeight: 500 }}>+ ADMIN 추가</button>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="text-xs text-gray-600 self-center" style={{ fontWeight: 500 }}>상태:</span>
          {statuses.map(status => (
            <button key={status.value} onClick={() => setFilterStatus(status.value)} className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${filterStatus === status.value ? 'bg-[#000050] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} style={{ fontWeight: filterStatus === status.value ? 600 : 400 }}>{status.label}</button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>이름</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>소속부서</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>이메일</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>연락처</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>초기 비밀번호</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>접근 가능 메뉴</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>최근 로그인</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>상태</th>
              <th className="px-3 py-2 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2 text-xs text-gray-900" style={{ fontWeight: 600 }}>{admin.name}</td>
                <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{admin.department}</td>
                <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{admin.email}</td>
                <td className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 400 }}>{admin.phone}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded" style={{ fontWeight: 400 }}>
                      {admin.password}
                    </code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(admin.password);
                        alert('비밀번호가 클립보드에 복사되었습니다.');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="비밀번호 복사"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2 text-xs text-gray-700" style={{ fontWeight: 400 }}>{getPermissionSummary(admin.permissions)}</td>
                <td className="px-3 py-2 text-xs text-gray-500" style={{ fontWeight: 400 }}>{admin.lastLogin}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] ${admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`} style={{ fontWeight: 500 }}>
                    {admin.status === 'active' ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-1">
                    <button onClick={() => { setSelectedAdmin(admin); setIsEditModalOpen(true); }} className="px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50" style={{ fontWeight: 500 }}>수정</button>
                    <button className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50" style={{ fontWeight: 500 }}>삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (<AdminFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="ADMIN 사용자 추가" mode="add" />)}
      {isEditModalOpen && selectedAdmin && (<AdminFormModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedAdmin(null); }} title="ADMIN 사용자 수정" mode="edit" admin={selectedAdmin} />)}
    </div>
  );
}
