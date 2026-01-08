import { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'motion/react';

interface RegionData {
  name: string;
  shortName: string;
  count: number;
  percentage: string;
}

interface KoreaMapInteractiveProps {
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

// TopoJSON 지역명 → 우리 데이터 매핑
const TOPO_TO_DATA_MAPPING: Record<string, string> = {
  '서울특별시': '서울특별시',
  '부산광역시': '부산광역시',
  '대구광역시': '대구광역시',
  '인천광역시': '인천광역시',
  '광주광역시': '광주광역시',
  '대전광역시': '대전광역시',
  '울산광역시': '울산광역시',
  '세종특별자치시': '세종특별자치시',
  '경기도': '경기도',
  '강원도': '강원특별자치도',
  '강원특별자치도': '강원특별자치도',
  '충청북도': '충청북도',
  '충청남도': '충청남도',
  '전라북도': '전북특별자치도',
  '전북특별자치도': '전북특별자치도',
  '전라남도': '전라남도',
  '경상북도': '경상북도',
  '경상남도': '경상남도',
  '제주특별자치도': '제주특별자치도'
};

// 한국 TopoJSON URL (공개 데이터)
const KOREA_TOPO_JSON = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json";

export default function KoreaMapInteractive({ regionStats, totalReservations, avgReservations }: KoreaMapInteractiveProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // 최소/최대 예약 건수 계산
  const minReservations = Math.min(...regionStats.map(([, count]) => count));
  const maxReservations = Math.max(...regionStats.map(([, count]) => count));

  // 지역 데이터 Map으로 변환 (빠른 조회)
  const regionDataMap = new Map<string, RegionData>();
  regionStats.forEach(([region, count]) => {
    const shortName = REGION_SHORT_NAMES[region] || region;
    const percentage = ((count / totalReservations) * 100).toFixed(1);
    
    regionDataMap.set(region, {
      name: region,
      shortName,
      count,
      percentage
    });
  });

  // 색상 계산 - 그라데이션 (연한 파란색 → 진한 파란색)
  const getColor = (count: number | undefined) => {
    // 예약 없음 → 회색
    if (count === undefined || count === 0) return '#e5e7eb';
    
    // 정규화 (0 ~ 1)
    const ratio = minReservations === maxReservations ? 0.5 : (count - minReservations) / (maxReservations - minReservations);
    
    // 5단계 그라데이션
    if (ratio >= 0.8) return '#1e3a8a'; // 가장 진한 파란색
    if (ratio >= 0.6) return '#2563eb'; // 진한 파란색
    if (ratio >= 0.4) return '#3b82f6'; // 중간 파란색
    if (ratio >= 0.2) return '#60a5fa'; // 연한 파란색
    return '#93c5fd'; // 가장 연한 파란색
  };

  // 지역 데이터 가져오기
  const getRegionData = (geoName: string): RegionData | undefined => {
    const mappedName = TOPO_TO_DATA_MAPPING[geoName];
    return mappedName ? regionDataMap.get(mappedName) : undefined;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <h3 
          className="text-[#1e1e1e]"
          style={{ 
            fontFamily: 'Pretendard Variable, sans-serif', 
            fontWeight: 700, 
            fontSize: '1.125rem',
            letterSpacing: 'var(--letter-spacing-snug)'
          }}
        >
          지역별 예약현황
        </h3>
        <p 
          className="text-gray-500 text-xs mt-1"
          style={{ 
            fontFamily: 'Pretendard Variable, sans-serif', 
            fontWeight: 400 
          }}
        >
          색상이 진할수록 예약이 많은 지역입니다
        </p>
      </div>

      {/* 지도 컨테이너 */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100" style={{ height: '600px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 5970,
            center: [127.8, 35.8]
          }}
          width={800}
          height={600}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup center={[127.8, 35.8]} zoom={1}>
            <Geographies geography={KOREA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoName = geo.properties.name || geo.properties.CTP_KOR_NM || '';
                  const regionData = getRegionData(geoName);
                  const fillColor = getColor(regionData?.count);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { 
                          fill: fillColor, 
                          opacity: 0.8,
                          outline: 'none',
                          cursor: 'pointer'
                        },
                        pressed: { outline: 'none' }
                      }}
                      onMouseEnter={() => setHoveredRegion(geoName)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* 호버 툴팁 */}
        {hoveredRegion && getRegionData(hoveredRegion) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 z-10"
            style={{ maxWidth: '250px' }}
          >
            <p 
              className="text-sm mb-1"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
            >
              {getRegionData(hoveredRegion)?.name}
            </p>
            <p 
              className="text-xs text-gray-300"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              예약: {getRegionData(hoveredRegion)?.count}건 ({getRegionData(hoveredRegion)?.percentage}%)
            </p>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-[0.625rem] text-gray-400 tabular-nums">
                평균 대비: {(((getRegionData(hoveredRegion)!.count - avgReservations) / avgReservations) * 100).toFixed(1)}%
              </p>
            </div>
          </motion.div>
        )}

        {/* 컨트롤 안내 */}
        <div 
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200"
          style={{ maxWidth: '200px' }}
        >
          <p 
            className="text-[0.625rem] text-gray-600"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
          >
            🖱️ 마우스 호버로 상세 정보 보기
          </p>
        </div>
      </div>

      {/* 범례 */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <p 
              className="text-xs text-gray-700 mb-2"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              📊 데이터 범례 (예약 건수 기준)
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e5e7eb' }} />
                <span className="text-[0.625rem] text-gray-600">없음</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#93c5fd' }} />
                <span className="text-[0.625rem] text-gray-600 tabular-nums">{minReservations}건</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2563eb' }} />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1e3a8a' }} />
                <span className="text-[0.625rem] text-gray-600 tabular-nums">{maxReservations}건</span>
              </div>
            </div>
          </div>
          <p 
            className="text-[0.625rem] text-gray-500"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
          >
            총 {totalReservations}건 | 평균 {avgReservations.toFixed(0)}건
          </p>
        </div>
      </div>
    </div>
  );
}