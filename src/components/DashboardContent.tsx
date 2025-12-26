import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  X,
  ChevronDown,
  Map
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Treemap,
  ComposedChart
} from 'recharts';
import MapHeatmapContent from './MapHeatmapContent';
import { 
  getTotalBookings,
  getBookingsByStatus,
  getBookingStatusData,
  getExpertPerformance,
  getMonthlyStatsFromReservations,
  getRecentBookings,
  getTopExperts,
  getRegionalDistribution,
  getTotalRevenue,
  getAverageBookingAmount
} from '../data/mockData';

// 계산된 데이터 사용
const allMonthlyBookingsData = getMonthlyStatsFromReservations();
const expertPerformanceData = getExpertPerformance();
const bookingStatusData = getBookingStatusData();
const allRecentBookings = getRecentBookings();
const topExperts = getTopExperts();
const regionalData = getRegionalDistribution();

// Treemap 데이터 생성
const totalBookings = regionalData.reduce((sum, item) => sum + item.value, 0);
const avgBookings = Math.round(totalBookings / regionalData.length);

const treemapData = regionalData.map(item => {
  const diffFromAvg = ((item.value - avgBookings) / avgBookings) * 100;
  const roundedDiff = diffFromAvg.toFixed(1);
  
  // 주식 시장 색상 시스템
  let color;
  if (diffFromAvg > 50) {
    color = '#16a34a'; // 강한 초록
  } else if (diffFromAvg > 20) {
    color = '#22c55e'; // 초록
  } else if (diffFromAvg > 0) {
    color = '#4ade80'; // 연한 초록
  } else if (diffFromAvg > -20) {
    color = '#f87171'; // 연한 빨강
  } else if (diffFromAvg > -50) {
    color = '#ef4444'; // 빨강
  } else {
    color = '#dc2626'; // 강한 빨강
  }
  
  return {
    name: item.region,
    value: item.value,
    percentage: item.percentage,
    fill: color,
    diff: roundedDiff,
    diffFromAvg
  };
});

// Custom Treemap Content
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, value, fill, diff } = props;
  
  const canShowText = width > 60 && height > 40;
  const canShowDiff = width > 80 && height > 60;
  
  const textColor = '#ffffff';
  const diffNum = parseFloat(diff);
  const diffText = diffNum > 0 ? `+${diff}%` : `${diff}%`;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="#000000"
        strokeWidth={0.5}
        opacity={0.95}
      />
      {canShowText && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - (canShowDiff ? 6 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize={width > 120 ? '1.125rem' : '0.9375rem'}
            fontWeight={700}
            fontFamily="Pretendard Variable, sans-serif"
            stroke="none"
            paintOrder="fill"
            style={{ 
              letterSpacing: '-0.02em',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            {name}
          </text>
          {canShowDiff && (
            <text
              x={x + width / 2}
              y={y + height / 2 + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={textColor}
              fontSize={width > 120 ? '0.8125rem' : '0.75rem'}
              fontWeight={600}
              fontFamily="Pretendard Variable, sans-serif"
              stroke="none"
              paintOrder="fill"
              opacity={0.9}
              style={{ 
                letterSpacing: '0.01em',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              {diffText}
            </text>
          )}
        </>
      )}
    </g>
  );
};

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// KPI Card Component
interface KPICardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  iconColor: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subMetrics?: { label: string; value: number; suffix?: string; prefix?: string }[];
  onClick?: () => void;
}

function KPICard({ title, value, change, icon, iconColor, prefix = '', suffix = '', decimals = 0, subMetrics, onClick }: KPICardProps) {
  const isPositive = change >= 0;
  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.floor(value);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0.625rem 1.875rem rgba(0, 0, 80, 0.15)' }}
      className={`bg-white rounded-xl p-4 border border-gray-200 shadow-sm transition-all duration-300 ${subMetrics ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (subMetrics) setShowDetails(!showDetails);
        if (onClick) onClick();
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${iconColor} bg-opacity-10 flex items-center justify-center`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[0.625rem] ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <h3 
        className="text-gray-500 text-xs space-golden-xs"
        style={{ 
          fontFamily: 'Pretendard Variable, sans-serif', 
          fontWeight: 500,
          letterSpacing: 'var(--letter-spacing-wide)',
          lineHeight: 'var(--line-height-normal)'
        }}
      >
        {title}
      </h3>
      
      <div 
        className="text-[#1e1e1e] kpi-number"
        style={{ 
          fontFamily: 'Pretendard Variable, sans-serif', 
          fontWeight: 700, 
          fontSize: '1.75rem', 
          lineHeight: 'var(--line-height-tight)',
          letterSpacing: 'var(--letter-spacing-tight)'
        }}
      >
        <AnimatedCounter end={decimals > 0 ? parseFloat(displayValue) : value} prefix={prefix} suffix={suffix} />
      </div>

      {/* Sub Metrics */}
      {subMetrics && (
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="border-t border-gray-200 pt-3 space-y-2 overflow-hidden"
            >
              {subMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span 
                    className="text-gray-600 text-xs"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    {metric.label}
                  </span>
                  <span 
                    className="text-gray-900 text-xs"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    {metric.prefix || ''}{metric.value.toLocaleString()}{metric.suffix || ''}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {subMetrics && (
        <div className="mt-3 text-center">
          <span 
            className="text-[0.625rem] text-gray-400"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
          >
            {showDetails ? '클릭하여 닫기 ▲' : '클릭하여 상세보기 ▼'}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Detail Modal Component
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  type: 'month' | 'expert' | 'status';
}

function DetailModal({ isOpen, onClose, title, data, type }: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h3 
              className="text-lg text-[#1e1e1e]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
          <div className="space-y-6">
            {type === 'month' && data?.expertDetails && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h4 className="text-sm mb-3 text-blue-900" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    📊 월별 상세 현황
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">총 예약:</span>
                      <span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>{data.bookings}건</span>
                    </div>
                    <div>
                      <span className="text-gray-500">총 매출:</span>
                      <span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>₩{data.revenue}M</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>전문가</th>
                        <th className="px-4 py-3 text-right text-xs text-gray-700" style={{ fontWeight: 600 }}>예약 건수</th>
                        <th className="px-4 py-3 text-right text-xs text-gray-700" style={{ fontWeight: 600 }}>매출</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.expertDetails.map((expert: any, index: number) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs text-gray-900" style={{ fontWeight: 500 }}>{expert.expert}</td>
                          <td className="px-4 py-3 text-xs text-gray-900 text-right" style={{ fontWeight: 600 }}>{expert.bookings}건</td>
                          <td className="px-4 py-3 text-xs text-gray-900 text-right" style={{ fontWeight: 600 }}>₩{expert.revenue}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {type === 'expert' && (
              <>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                  <h4 className="text-sm mb-3 text-purple-900" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    👨‍🏫 전문가 정보
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">이름:</span>
                      <span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>{data.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">분야:</span>
                      <span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>{data.field}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">총 예약:</span>
                      <span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>{data.bookings}건</span>
                    </div>
                    <div>
                      <span className="text-gray-500">총 매출:</span>
                      <span className="ml-2 text-gray-900" style={{ fontWeight: 600 }}>₩{data.revenue}M</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm mb-3 text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    월별 예약 추이
                  </h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={allMonthlyBookingsData.map(month => {
                      const expertData = month.expertDetails.find(e => e.expert === data.name);
                      return {
                        month: month.month,
                        bookings: expertData?.bookings || 0
                      };
                    })}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.625rem' }} />
                      <YAxis style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.625rem' }} />
                      <Tooltip contentStyle={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.75rem', borderRadius: '0.5rem' }} />
                      <Bar dataKey="bookings" fill="#000050" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

            {type === 'status' && (
              <div className="space-y-3">
                <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm mb-3 text-gray-900" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    상태별 통계
                  </h4>
                  <div className="space-y-2">
                    {bookingStatusData.map((status) => (
                      <div key={status.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                          <span className="text-xs text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}>
                            {status.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-900" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                            {status.value}건
                          </div>
                          <div className="text-[0.625rem] text-gray-500" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}>
                            {((status.value / bookingStatusData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              닫기
            </button>
          </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function DashboardContent() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('12months');
  const [customDateMode, setCustomDateMode] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [detailModal, setDetailModal] = useState<{isOpen: boolean; title: string; data: any; type: 'month' | 'expert' | 'status'}>({
    isOpen: false,
    title: '',
    data: null,
    type: 'month'
  });

  // 계산된 통계
  const totalBookings = getTotalBookings();
  const bookingStats = getBookingsByStatus();
  const totalRevenue = getTotalRevenue() / 1000000; // 백만원 단위
  const avgAmount = getAverageBookingAmount() / 1000000; // 백만원 단위
  
  // 이번 달 데이터 (12월)
  const currentMonthData = allMonthlyBookingsData[11]; // 12월 데이터

  const experts = ['all', '김경일', '유영만', '정재한', '김태훈', '김미경', '최재붕'];
  const dateRanges = [
    { value: '1month', label: '최근 1개월' },
    { value: '3months', label: '최근 3개월' },
    { value: '6months', label: '최근 6개월' },
    { value: '12months', label: '최근 12개월' },
    { value: 'custom', label: '직접 선택' }
  ];

  // Filter data based on selections
  const filteredMonthlyData = allMonthlyBookingsData.filter((_, index) => {
    if (dateRange === '1month') return index >= 11;
    if (dateRange === '3months') return index >= 9;
    if (dateRange === '6months') return index >= 6;
    return true;
  }).map(month => {
    if (selectedExpert === 'all') return month;
    const expertData = month.expertDetails.find(e => e.expert === selectedExpert);
    return {
      ...month,
      bookings: expertData?.bookings || 0,
      revenue: expertData?.revenue || 0
    };
  });

  const filteredExpertData = selectedExpert === 'all' 
    ? expertPerformanceData 
    : expertPerformanceData.filter(e => e.name === selectedExpert);

  const filteredRecentBookings = selectedExpert === 'all'
    ? allRecentBookings.slice(0, 5)
    : allRecentBookings.filter(b => b.expert === selectedExpert).slice(0, 5);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 1500);
  };

  const handleChartClick = (data: any, type: 'month' | 'expert' | 'status') => {
    let title = '';
    let modalData = data;

    if (type === 'month') {
      title = `${data.month} 상세 데이터`;
    } else if (type === 'expert') {
      title = `${data.name} 전문가 상세 정보`;
    } else {
      title = '예약 상태 분포 상세';
    }

    setDetailModal({
      isOpen: true,
      title,
      data: modalData,
      type
    });
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-xs mb-2 text-blue-900" style={{ fontWeight: 600 }}>📊 대시보드 개요</h4>
        <p className="text-[0.625rem] text-blue-800" style={{ fontWeight: 400 }}>
          실시간 예약 현황과 주요 지표를 한눈에 확인하세요. 차트를 클릭하면 상세 데이터를 볼 수 있습니다.
        </p>
      </div>

      {/* Header with Filters and Refresh */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs ${
                showFilters 
                  ? 'bg-[#000050] text-white border-[#000050]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#000050]'
              }`}
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              <Filter className="w-4 h-4" />
              필터
            </button>

            {(selectedExpert !== 'all' || dateRange !== '12months') && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs text-gray-500" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}>
                  필터 적용 중:
                </span>
                {selectedExpert !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    {selectedExpert}
                  </span>
                )}
                {dateRange !== '12months' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    {customDateMode && startDate && endDate 
                      ? `${startDate} ~ ${endDate}` 
                      : dateRanges.find(d => d.value === dateRange)?.label
                    }
                  </span>
                )}
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[0.625rem] text-gray-500" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}>
                마지막 업데이트
              </p>
              <p className="text-xs text-gray-900" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                {lastUpdate.toLocaleTimeString('ko-KR')}
              </p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-all text-xs disabled:opacity-50"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              새로고침
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expert Filter */}
                <div>
                  <label className="block text-xs text-gray-700 mb-2" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    전문가 선택
                  </label>
                  <div className="relative">
                    <select
                      value={selectedExpert}
                      onChange={(e) => setSelectedExpert(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-xs appearance-none pr-8 focus:outline-none focus:border-[#000050] transition-colors"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                    >
                      <option value="all">전체 전문가</option>
                      {experts.filter(e => e !== 'all').map(expert => (
                        <option key={expert} value={expert}>{expert}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-xs text-gray-700 mb-2" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                    기간 선택
                  </label>
                  <div className="relative">
                    <select
                      value={dateRange}
                      onChange={(e) => {
                        setDateRange(e.target.value);
                        if (e.target.value === 'custom') {
                          setCustomDateMode(true);
                        } else {
                          setCustomDateMode(false);
                        }
                      }}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-xs appearance-none pr-8 focus:outline-none focus:border-[#000050] transition-colors"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                    >
                      {dateRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Custom Date Range */}
                {customDateMode && (
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-700 mb-2" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                          시작 날짜
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#000050] transition-colors"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-700 mb-2" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                          종료 날짜
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#000050] transition-colors"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              {(selectedExpert !== 'all' || dateRange !== '12months') && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedExpert('all');
                      setDateRange('12months');
                      setCustomDateMode(false);
                      setStartDate('');
                      setEndDate('');
                    }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    필터 초기화
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          title="총 예약 건수"
          value={totalBookings}
          change={12.9}
          icon={<Calendar className="w-5 h-5" />}
          iconColor="text-blue-600"
          suffix="건"
          subMetrics={[
            { label: '완료', value: bookingStats.completed, suffix: '건' },
            { label: '확정', value: bookingStats.confirmed, suffix: '건' },
            { label: '대기중', value: bookingStats.pending, suffix: '건' },
            { label: '취소', value: bookingStats.cancelled, suffix: '건' }
          ]}
        />
        <KPICard
          title="이번 달 매출"
          value={currentMonthData.revenue}
          change={23.1}
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="text-green-600"
          prefix="₩"
          suffix="M"
          subMetrics={[
            { label: '수익', value: currentMonthData.profit, suffix: 'M', prefix: '₩' },
            { label: '비용', value: currentMonthData.cost, suffix: 'M', prefix: '₩' },
            { label: '정산', value: currentMonthData.settlement, suffix: 'M', prefix: '₩' }
          ]}
        />
        <KPICard
          title="정산"
          value={45}
          change={15.2}
          icon={<Star className="w-5 h-5" />}
          iconColor="text-yellow-600"
          suffix="건"
          subMetrics={[
            { label: '정산완료', value: 28, suffix: '건' },
            { label: '정산예정', value: 17, suffix: '건' }
          ]}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Bookings Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 
                className="text-[#1e1e1e] space-golden-xs rhythm-snug"
                style={{ 
                  fontFamily: 'Pretendard Variable, sans-serif', 
                  fontWeight: 700, 
                  fontSize: '1.125rem',
                  letterSpacing: 'var(--letter-spacing-snug)'
                }}
              >
                월별 예약 트렌드
              </h3>
              <p 
                className="text-gray-500 text-xs"
                style={{ 
                  fontFamily: 'Pretendard Variable, sans-serif', 
                  fontWeight: 400,
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-normal)'
                }}
              >
                {dateRanges.find(d => d.value === dateRange)?.label} • 차트 클릭 시 상세보기
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm tabular-nums" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}>
                +18.3%
              </span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart 
              data={filteredMonthlyData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.75rem', fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                domain={[0, 'auto']}
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.75rem', fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  fontFamily: 'Pretendard Variable, sans-serif',
                  fontSize: '0.75rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              {/* 스택 막대 그래프 */}
              <Bar 
                dataKey="completed" 
                stackId="status"
                fill="#10b981" 
                radius={[0, 0, 0, 0]}
                name="완료"
                cursor="pointer"
                onClick={(data) => handleChartClick(data, 'month')}
                barSize={30}
              />
              <Bar 
                dataKey="confirmed" 
                stackId="status"
                fill="#3b82f6" 
                radius={[0, 0, 0, 0]}
                name="확정"
                cursor="pointer"
                onClick={(data) => handleChartClick(data, 'month')}
                barSize={30}
              />
              <Bar 
                dataKey="pending" 
                stackId="status"
                fill="#f59e0b" 
                radius={[0, 0, 0, 0]}
                name="대기중"
                cursor="pointer"
                onClick={(data) => handleChartClick(data, 'month')}
                barSize={30}
              />
              <Bar 
                dataKey="cancelled" 
                stackId="status"
                fill="#ef4444" 
                radius={[4, 4, 0, 0]}
                name="취소"
                cursor="pointer"
                onClick={(data) => handleChartClick(data, 'month')}
                barSize={30}
              />
              {/* 총 예약 라인 */}
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#000050" 
                strokeWidth={2}
                dot={{ fill: '#000050', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                name="총 예약"
                cursor="pointer"
              />
            </ComposedChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-0.75 rounded-full bg-[#000050]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                총 예약
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-[#10b981]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                완료
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-[#3b82f6]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                확정
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-[#f59e0b]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                대기중
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-[#ef4444]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                취소
              </span>
            </div>
          </div>
        </motion.div>

        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 
                className="text-[#1e1e1e] space-golden-xs rhythm-snug"
                style={{ 
                  fontFamily: 'Pretendard Variable, sans-serif', 
                  fontWeight: 700, 
                  fontSize: '1.125rem',
                  letterSpacing: 'var(--letter-spacing-snug)'
                }}
              >
                월별 매출 추이
              </h3>
              <p 
                className="text-gray-500 text-xs"
                style={{ 
                  fontFamily: 'Pretendard Variable, sans-serif', 
                  fontWeight: 400,
                  letterSpacing: 'var(--letter-spacing-wide)',
                  lineHeight: 'var(--line-height-normal)'
                }}
              >
                {dateRanges.find(d => d.value === dateRange)?.label} • 차트 클릭 시 상세보기 (단위: 백만원)
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm tabular-nums" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}>
                +23.1%
              </span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart 
              data={filteredMonthlyData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.75rem', fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                domain={[0, 'auto']}
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.75rem', fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  fontFamily: 'Pretendard Variable, sans-serif',
                  fontSize: '0.75rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              {/* 스 막대 그래프 */}
              <Bar 
                dataKey="profit" 
                stackId="revenue"
                fill="#10b981" 
                radius={[0, 0, 0, 0]}
                name="수익"
                cursor="pointer"
                onClick={(data) => handleChartClick(data, 'month')}
                barSize={30}
              />
              <Bar 
                dataKey="cost" 
                stackId="revenue"
                fill="#ef4444" 
                radius={[4, 4, 0, 0]}
                name="비용"
                cursor="pointer"
                onClick={(data) => handleChartClick(data, 'month')}
                barSize={30}
              />
              {/* 라인 */}
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#000050" 
                strokeWidth={2}
                dot={{ fill: '#000050', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                name="매출"
                cursor="pointer"
              />
              <Line 
                type="monotone" 
                dataKey="settlement" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                name="정산"
                cursor="pointer"
              />
            </ComposedChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-0.75 rounded-full bg-[#000050]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                매출
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-0.75 rounded-full bg-[#f59e0b]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                정산
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-[#10b981]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                수익
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded bg-[#ef4444]" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                비용
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Regional Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <MapHeatmapContent 
          selectedExpert={selectedExpert}
          dateRange={dateRange}
        />
      </motion.div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ ...detailModal, isOpen: false })}
        title={detailModal.title}
        data={detailModal.data}
        type={detailModal.type}
      />
    </div>
  );
}