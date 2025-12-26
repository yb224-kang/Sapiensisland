import { useState } from 'react';
import { motion } from 'motion/react';
import koreaMapImage from 'figma:asset/895ce7efbabc55f41f2769cea57b34c139574740.png';

// 지역 데이터 타입
interface RegionData {
  name: string;
  shortName: string;
  count: number;
  percentage: string;
  color: string;
}

interface KoreaMapHeatmapProps {
  regionStats: [string, number][];
  totalReservations: number;
  avgReservations: number;
}

// 지역명 단축
const REGION_SHORT_NAMES: Record<string, string> = {
  '서울특별시': '서울',
  '부산광역시': '부산',
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

// 지역별 좌표 (백분율 기준 - 지도 이미지 내 위치)
const REGION_POSITIONS: Record<string, { top: string; left: string }> = {
  '서울': { top: '17%', left: '38%' },
  '경기': { top: '19%', left: '44%' },
  '인천': { top: '22%', left: '28%' },
  '강원': { top: '25%', left: '71%' },
  '충북': { top: '38%', left: '47%' },
  '충남': { top: '43%', left: '31%' },
  '세종': { top: '38%', left: '42%' },
  '대전': { top: '42%', left: '41%' },
  '경북': { top: '42%', left: '63%' },
  '대구': { top: '51%', left: '69%' },
  '전북': { top: '52%', left: '36%' },
  '광주': { top: '58%', left: '27%' },
  '전남': { top: '68%', left: '36%' },
  '경남': { top: '62%', left: '57%' },
  '울산': { top: '58%', left: '78%' },
  '부산': { top: '69%', left: '73%' },
  '제주': { top: '88%', left: '28%' }
};

export default function KoreaMapHeatmap({ regionStats, totalReservations, avgReservations }: KoreaMapHeatmapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // 지역 데이터 가공
  const regionData: RegionData[] = regionStats.map(([region, count]) => {
    const shortName = REGION_SHORT_NAMES[region] || region;
    const percentage = ((count / totalReservations) * 100).toFixed(1);
    
    // 평균 대비 차이 계산
    const diffFromAvg = ((count - avgReservations) / avgReservations) * 100;
    
    // 주식 시장 색상 시스템 (빨강/초록)
    let color;
    if (diffFromAvg > 50) {
      color = '#16a34a';
    } else if (diffFromAvg > 20) {
      color = '#22c55e';
    } else if (diffFromAvg > 0) {
      color = '#4ade80';
    } else if (diffFromAvg > -20) {
      color = '#f87171';
    } else if (diffFromAvg > -50) {
      color = '#ef4444';
    } else {
      color = '#dc2626';
    }
    
    return {
      name: region,
      shortName,
      count,
      percentage,
      color
    };
  });

  // 최대값 계산 (버블 크기 조정용)
  const maxCount = Math.max(...regionData.map(r => r.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 
          className="text-[#1e1e1e] space-golden-xs rhythm-snug"
          style={{ 
            fontFamily: 'Pretendard Variable, sans-serif', 
            fontWeight: 700, 
            fontSize: '1.125rem',
            letterSpacing: 'var(--letter-spacing-snug)'
          }}
        >
          🗺️ 지도 기반 히트맵
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
          버블 크기와 색상은 지역별 예약 건수를 나타냅니다
        </p>
      </div>

      <div className="p-6" style={{ background: '#1a1a2e' }}>
        <div className="relative mx-auto" style={{ maxWidth: '500px', aspectRatio: '9/12' }}>
          {/* 한국 지도 이미지 */}
          <img 
            src={koreaMapImage} 
            alt="대한민국 지도" 
            className="w-full h-full object-contain opacity-30"
            style={{ filter: 'brightness(2) contrast(0.8)' }}
          />
          
          {/* 지역별 버블 */}
          {regionData.map((region) => {
            const position = REGION_POSITIONS[region.shortName];
            if (!position) return null;

            // 버블 크기 계산 (최소 24px, 최대 80px)
            const bubbleSize = 24 + (region.count / maxCount) * 56;
            const isHovered = hoveredRegion === region.shortName;

            return (
              <motion.div
                key={region.shortName}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
                className="absolute flex items-center justify-center cursor-pointer"
                style={{
                  top: position.top,
                  left: position.left,
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize}px`,
                  marginLeft: `-${bubbleSize / 2}px`,
                  marginTop: `-${bubbleSize / 2}px`,
                }}
                onMouseEnter={() => setHoveredRegion(region.shortName)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* 버블 */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: region.color,
                    opacity: isHovered ? 1 : 0.85,
                    boxShadow: isHovered
                      ? `0 0 20px ${region.color}, 0 0 40px ${region.color}40`
                      : `0 0 10px ${region.color}60`,
                  }}
                />

                {/* 지역명 */}
                <span
                  className="relative text-white text-center z-10 transition-all duration-300"
                  style={{
                    fontFamily: 'Pretendard Variable, sans-serif',
                    fontWeight: 700,
                    fontSize: bubbleSize > 50 ? '0.875rem' : '0.625rem',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {region.shortName}
                </span>

                {/* 호버 시 상세 정보 */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700 whitespace-nowrap z-50"
                  >
                    <p className="text-xs mb-1" style={{ fontWeight: 700 }}>
                      {region.name}
                    </p>
                    <p className="text-xs text-gray-300" style={{ fontWeight: 500 }}>
                      예약: {region.count}건 ({region.percentage}%)
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 범례 */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-700 mb-3" style={{ fontWeight: 600 }}>
          📍 인터랙티브 지도
        </p>
        <p className="text-[0.625rem] text-gray-500" style={{ fontWeight: 400 }}>
          각 지역에 마우스를 올려보세요. 버블 크기가 클수록 예약 건수가 많으며, 색상은 평균 대비 상대적 비중을 나타냅니다.
        </p>
      </div>
    </motion.div>
  );
}