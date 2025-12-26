import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'motion/react';

interface RegionData {
  name: string;
  shortName: string;
  count: number;
  percentage: string;
  coordinates: [number, number]; // [lng, lat]
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

// 지역별 실제 좌표 (위도/경도)
const REGION_COORDINATES: Record<string, [number, number]> = {
  '서울': [126.9780, 37.5665],
  '경기': [127.2551, 37.4138],
  '인천': [126.7052, 37.4563],
  '강원': [128.2093, 37.8228],
  '충북': [127.4893, 36.6357],
  '충남': [126.8000, 36.5184],
  '세종': [127.2890, 36.4800],
  '대전': [127.3845, 36.3504],
  '경북': [128.8889, 36.4919],
  '대구': [128.6014, 35.8714],
  '전북': [127.1530, 35.7175],
  '광주': [126.8526, 35.1595],
  '전남': [126.9910, 34.8679],
  '경남': [128.2132, 35.4606],
  '울산': [129.3114, 35.5384],
  '부산': [129.0756, 35.1796],
  '제주': [126.5312, 33.4996]
};

// 한국 TopoJSON URL (공개 데이터)
const KOREA_TOPO_JSON = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json";

export default function KoreaMapInteractive({ regionStats, totalReservations, avgReservations }: KoreaMapInteractiveProps) {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [viewMode, setViewMode] = useState<'bubble' | 'heatmap'>('heatmap');

  // 지역 데이터 가공
  const regionData: RegionData[] = regionStats.map(([region, count]) => {
    const shortName = REGION_SHORT_NAMES[region] || region;
    const percentage = ((count / totalReservations) * 100).toFixed(1);
    const coordinates = REGION_COORDINATES[shortName] || [127.5, 36.5];
    
    return {
      name: region,
      shortName,
      count,
      percentage,
      coordinates
    };
  });

  // 최대값 계산
  const maxCount = Math.max(...regionData.map(r => r.count));

  // 색상 계산
  const getColor = (count: number) => {
    const diffFromAvg = ((count - avgReservations) / avgReservations) * 100;
    if (diffFromAvg > 50) return '#16a34a'; // 진한 초록
    if (diffFromAvg > 20) return '#22c55e'; // 초록
    if (diffFromAvg > 0) return '#4ade80'; // 연한 초록
    if (diffFromAvg > -20) return '#f87171'; // 연한 빨강
    if (diffFromAvg > -50) return '#ef4444'; // 빨강
    return '#dc2626'; // 진한 빨강
  };

  // 버블 크기 계산
  const getBubbleSize = (count: number) => {
    const ratio = count / maxCount;
    return Math.sqrt(ratio) * 20 + 5; // 5px ~ 25px
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
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
        </div>

        {/* 뷰 모드 토글 */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('bubble')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              viewMode === 'bubble'
                ? 'bg-[#000050] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
          >
            버블
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              viewMode === 'heatmap'
                ? 'bg-[#000050] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
          >
            히트맵
          </button>
        </div>
      </div>

      {/* 지도 컨테이너 */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100" style={{ height: '600px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4975,
            center: [127.8, 35.8]
          }}
          width={800}
          height={600}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup center={[127.8, 35.8]} zoom={1}>
            {/* 배경 (한국 영역) */}
            <Geographies geography={KOREA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#e5e7eb"
                    stroke="#9ca3af"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>

            {/* 마커 (버블 또는 히트맵) */}
            {regionData.map((region, index) => {
              const size = getBubbleSize(region.count);
              const color = getColor(region.count);

              return (
                <Marker
                  key={`${region.name}-${index}`}
                  coordinates={region.coordinates}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  {viewMode === 'bubble' ? (
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <circle
                        r={size}
                        fill={color}
                        stroke="white"
                        strokeWidth={2}
                        fillOpacity={0.8}
                        style={{ cursor: 'pointer' }}
                      />
                      <text
                        textAnchor="middle"
                        y={size + 15}
                        style={{
                          fontFamily: 'Pretendard Variable, sans-serif',
                          fontSize: '10px',
                          fontWeight: 600,
                          fill: '#1e1e1e'
                        }}
                      >
                        {region.shortName}
                      </text>
                    </motion.g>
                  ) : (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <circle
                        r={size * 2}
                        fill={color}
                        fillOpacity={0.3}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle
                        r={size}
                        fill={color}
                        fillOpacity={0.6}
                        style={{ cursor: 'pointer' }}
                      />
                      <text
                        textAnchor="middle"
                        y={size * 2 + 15}
                        style={{
                          fontFamily: 'Pretendard Variable, sans-serif',
                          fontSize: '10px',
                          fontWeight: 600,
                          fill: '#1e1e1e'
                        }}
                      >
                        {region.shortName}
                      </text>
                    </motion.g>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* 호버 툴팁 */}
        {hoveredRegion && (
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
              {hoveredRegion.name}
            </p>
            <p 
              className="text-xs text-gray-300"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              예약: {hoveredRegion.count}건 ({hoveredRegion.percentage}%)
            </p>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-[0.625rem] text-gray-400">
                평균 대비: {(((hoveredRegion.count - avgReservations) / avgReservations) * 100).toFixed(1)}%
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
              📊 데이터 범례
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                <span className="text-[0.625rem] text-gray-600">평균 이상</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                <span className="text-[0.625rem] text-gray-600">평균 이하</span>
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