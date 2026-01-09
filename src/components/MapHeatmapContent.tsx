import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Calendar } from 'lucide-react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import koreaMapImage from 'figma:asset/895ce7efbabc55f41f2769cea57b34c139574740.png';
import KoreaMapInteractive from './KoreaMapInteractive';
import { useReservationsQuery } from '../hooks/useReservationQueries';
import type { Reservation } from '../data/mockData';

interface MapHeatmapContentProps {
  selectedExpert: string;
  dateRange: string;
}

// 지역명 매핑 (mockData의 짧은 지역명 → 전체 지역명)
const REGION_FULL_NAMES: Record<string, string> = {
  '서울': '서울특별시',
  '부산': '부산광역시',
  '대구': '대구광역시',
  '인천': '인천광역시',
  '광주': '광주광역시',
  '대전': '대전광역시',
  '울산': '울산광역시',
  '세종': '세종특별자치시',
  '경기': '경기도',
  '강원': '강원특별자치도',
  '충북': '충청북도',
  '충남': '충청남도',
  '전북': '전북특별자치도',
  '전남': '전라남도',
  '경북': '경상북도',
  '경남': '경상남도',
  '제주': '제주특별자치도'
};

// 지역명 단축 (역방향)
const REGION_SHORT_NAMES: Record<string, string> = {
  '서울특별시': '서울',
  '부산��역시': '부산',
  '대구광역시': '대구',
  '인천광역시': '인천',
  '광주광역시': '광주',
  '대전광역시': '대전',
  '울산광역시': '울산',
  '세종특별자치시': '세종',
  '경기도': '경기',
  '강원특별자치도': '강원',
  '충청북도': '충북',
  '충청남도': '충남',
  '전북특별자치도': '전북',
  '전라남도': '전남',
  '경상북도': '경북',
  '경상남도': '경남',
  '제주특별자치도': '제주'
};

// Custom Treemap Content - 지역별 고유 색상
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, value, fill } = props;
  
  const canShowText = width > 60 && height > 40;
  const canShowValue = width > 80 && height > 60;
  
  const textColor = '#ffffff';
  
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
            y={y + height / 2 - (canShowValue ? 6 : 0)}
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
          {canShowValue && (
            <text
              x={x + width / 2}
              y={y + height / 2 + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={textColor}
              fontSize={width > 120 ? '0.9375rem' : '0.8125rem'}
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
              {value}건
            </text>
          )}
        </>
      )}
    </g>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700">
        <p className="text-xs mb-1" style={{ fontWeight: 700 }}>{data.name}</p>
        <p className="text-xs text-gray-300" style={{ fontWeight: 500 }}>
          예약: {data.value}건 ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function MapHeatmapContent({ selectedExpert, dateRange }: MapHeatmapContentProps) {
  // ✅ Hooks 추가
  const { data: reservationsData } = useReservationsQuery();
  const reservations = reservationsData?.reservations || [];
  
  // 상위 필터 값을 그대로 사용
  // 지역별 예약 건수 집계
  const regionStats = Object.entries(
    reservations.reduce((acc, reservation) => {
      // dateRange는 현재 Mock 데이터에서 간단하게 처리 (실제로는 백엔드에서 필터링)
      const expert = selectedExpert === 'all' || reservation.expert === selectedExpert;
      
      if (expert) {
        acc[reservation.region] = (acc[reservation.region] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);

  const totalReservations = regionStats.reduce((sum, [, count]) => sum + count, 0);
  const topRegion = regionStats[0];
  const maxCount = Math.max(...regionStats.map(([, c]) => c));
  const avgReservations = Math.round(totalReservations / regionStats.length);
  
  // 지역별 고유 색상 매핑
  const REGION_COLORS: Record<string, string> = {
    '서울특별시': '#0ea5e9',      // 밝은 파란색
    '경기도': '#1e3a8a',          // 진한 파란색
    '부산광역시': '#14b8a6',      // 청록색
    '강원특별자치도': '#f97316',  // 오렌지
    '경상남도': '#22c55e',        // 녹색
    '충청남도': '#a855f7',        // 자주색
    '충청북도': '#ec4899',        // 분홍
    '경상북도': '#6b7280',        // 회색
    '대구광역시': '#166534',      // 진한 녹색
    '인천광역시': '#7c3aed',      // 보라색
    '대전광역시': '#f472b6',      // 연한 분홍
    '전북특별자치도': '#eab308',  // 노란색
    '전라남도': '#9ca3af',        // 연한 회색
    '제주특별자치도': '#06b6d4',  // 청록
    '울산광역시': '#bfdbfe',      // 연한 파란색
    '광주광역시': '#fbbf24',      // 연한 노란색
    '세종특별자치시': '#fb923c',  // 연한 오렌지
  };

  // Treemap 데이터 생성 - 지역별 고유 색상
  const treemapData = regionStats.map(([region, count]) => {
    const percentage = ((count / totalReservations) * 100).toFixed(1);
    
    return {
      name: REGION_SHORT_NAMES[region] || region,
      value: count,
      percentage,
      fill: REGION_COLORS[region] || '#94a3b8' // 기본 회색
    };
  });

  return (
    <div className="space-y-6">
      {/* 지역별 히트맵 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 지역별 예약현황 (1) - 인터랙티브 지도 (왼쪽, 2/3 너비) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <KoreaMapInteractive 
            regionStats={regionStats}
            totalReservations={totalReservations}
            avgReservations={avgReservations}
          />
        </motion.div>

        {/* Stats Panel - 통계 카드 3개 (오른쪽, 1/3 너비, 세로 배치) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Top Region Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#000050] to-[#000070] rounded-xl p-4 text-white shadow-lg flex-shrink-0"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5" />
              <h4 className="text-xs" style={{ fontWeight: 600 }}>최다 예약 지역</h4>
            </div>
            {topRegion && (
              <>
                <p className="text-2xl mb-1 tabular-nums" style={{ fontWeight: 700, letterSpacing: 'var(--letter-spacing-tight)' }}>
                  {REGION_SHORT_NAMES[topRegion[0]] || topRegion[0]}
                </p>
                <p className="text-sm text-white/80 tabular-nums" style={{ fontWeight: 500 }}>
                  {topRegion[1].toLocaleString()}건
                </p>
              </>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex-shrink-0"
          >
            <h4 className="text-xs text-gray-700 mb-3 flex items-center gap-2" style={{ fontWeight: 600 }}>
              <Calendar className="w-4 h-4" />
              통계 요약
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600" style={{ fontWeight: 400 }}>활성 지역</span>
                <span className="text-xs text-gray-900 tabular-nums" style={{ fontWeight: 600 }}>
                  {regionStats.length}개
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600" style={{ fontWeight: 400 }}>평균 예약/지역</span>
                <span className="text-xs text-gray-900 tabular-nums" style={{ fontWeight: 600 }}>
                  {avgReservations}건
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600" style={{ fontWeight: 400 }}>수도권 비중</span>
                <span className="text-xs text-gray-900 tabular-nums" style={{ fontWeight: 600 }}>
                  {((regionStats.filter(([region]) => ['서울특별시', '경기도', '인천광역시'].includes(region)).reduce((sum, [, count]) => sum + count, 0) / totalReservations) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Regional Ranking - 남은 공간을 모두 차지 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0"
          >
            <h4 className="text-xs text-gray-700 mb-3 flex items-center gap-2 flex-shrink-0" style={{ fontWeight: 600 }}>
              <MapPin className="w-4 h-4" />
              지역별 순위 (Top 10)
            </h4>
            <div className="space-y-2 overflow-y-auto flex-1">
              {regionStats.slice(0, 10).map(([region, count], index) => {
                const percentage = (count / totalReservations) * 100;
                const intensity = count / maxCount;
                
                // 색상 매칭
                let barColor;
                if (intensity > 0.8) barColor = '#ef4444';
                else if (intensity > 0.6) barColor = '#f97316';
                else if (intensity > 0.4) barColor = '#eab308';
                else if (intensity > 0.2) barColor = '#10b981';
                else barColor = '#06b6d4';
                
                return (
                  <div key={region} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.625rem] ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-50 text-blue-700'
                    }`} style={{ fontWeight: 700 }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-900" style={{ fontWeight: 600 }}>
                          {REGION_SHORT_NAMES[region] || region}
                        </span>
                        <span className="text-xs text-gray-600 tabular-nums" style={{ fontWeight: 500 }}>
                          {count}건
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: barColor }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 지역별 트리맵 차트 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="mb-6">
          <h3 
            className="text-[#1e1e1e]"
            style={{ 
              fontFamily: 'Pretendard Variable, sans-serif', 
              fontWeight: 700, 
              fontSize: '1.125rem',
              letterSpacing: 'var(--letter-spacing-snug)'
            }}
          >
            지역별 분포
          </h3>
          <p 
            className="text-gray-500 text-xs mt-1"
            style={{ 
              fontFamily: 'Pretendard Variable, sans-serif', 
              fontWeight: 400,
              letterSpacing: 'var(--letter-spacing-wide)',
              lineHeight: 'var(--line-height-normal)'
            }}
          >
            전국 17개 시·도 예약 분포 (평균 대비 상승/하락)
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <Treemap
            data={treemapData}
            dataKey="value"
            aspectRatio={4 / 3}
            stroke="#fff"
            content={<CustomTreemapContent />}
            isAnimationActive={false}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}