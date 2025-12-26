import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

interface RegionData {
  name: string;
  shortName: string;
  count: number;
  percentage: string;
  coordinates: [number, number]; // [lng, lat]
}

interface KoreaMapLibreProps {
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

export default function KoreaMapLibre({ regionStats, totalReservations, avgReservations }: KoreaMapLibreProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const deckRef = useRef<MapboxOverlay | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [viewMode, setViewMode] = useState<'heatmap' | 'scatter'>('scatter');

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

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // MapLibre 지도 초기화
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=gMP50lZaCytxW373IFs4`,
      center: [127.5, 36.5], // 한국 중심
      zoom: 6.2,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    mapRef.current = map;

    map.on('load', () => {
      // Deck.gl 레이어 초기화
      initializeDeckLayers();
    });

    // 지도 스타일 커스터마이징 (Sapiens Navy 브랜딩)
    map.on('style.load', () => {
      // 물 색상 변경
      if (map.getLayer('water')) {
        map.setPaintProperty('water', 'fill-color', '#000050');
      }
    });

    return () => {
      if (deckRef.current) {
        deckRef.current.finalize();
        deckRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // viewMode 변경 시 레이어 업데이트
  useEffect(() => {
    if (mapRef.current && mapRef.current.loaded()) {
      initializeDeckLayers();
    }
  }, [viewMode, regionData]);

  const initializeDeckLayers = () => {
    if (!mapRef.current || !mapContainerRef.current) return;

    const map = mapRef.current;

    // 기존 Deck 인스턴스 제거
    if (deckRef.current) {
      try {
        map.removeControl(deckRef.current as any);
      } catch (e) {
        // Control may not exist
      }
      deckRef.current.finalize();
      deckRef.current = null;
    }

    // Deck.gl 데이터 준비
    const deckData = regionData.map(region => ({
      position: region.coordinates,
      count: region.count,
      region: region
    }));

    // 레이어 생성
    const layers = viewMode === 'heatmap' 
      ? [
          new HeatmapLayer({
            id: 'heatmap-layer',
            data: deckData,
            getPosition: (d: any) => d.position,
            getWeight: (d: any) => d.count,
            radiusPixels: 60,
            intensity: 1,
            threshold: 0.03,
            colorRange: [
              [220, 38, 38, 180],    // 빨강 (낮음)
              [239, 68, 68, 200],
              [248, 113, 113, 220],
              [134, 239, 172, 220],
              [34, 197, 94, 240],
              [22, 163, 74, 255]     // 초록 (높음)
            ]
          })
        ]
      : [
          new ScatterplotLayer({
            id: 'scatterplot-layer',
            data: deckData,
            getPosition: (d: any) => d.position,
            getRadius: (d: any) => Math.sqrt(d.count / maxCount) * 30000 + 10000,
            getFillColor: (d: any) => {
              const diffFromAvg = ((d.count - avgReservations) / avgReservations) * 100;
              if (diffFromAvg > 50) return [22, 163, 74, 220];
              if (diffFromAvg > 20) return [34, 197, 94, 200];
              if (diffFromAvg > 0) return [74, 222, 128, 180];
              if (diffFromAvg > -20) return [248, 113, 113, 180];
              if (diffFromAvg > -50) return [239, 68, 68, 200];
              return [220, 38, 38, 220];
            },
            pickable: true,
            opacity: 0.85,
            stroked: true,
            filled: true,
            radiusScale: 1,
            radiusMinPixels: 15,
            radiusMaxPixels: 80,
            lineWidthMinPixels: 2,
            getLineColor: [255, 255, 255, 150],
            onHover: (info: any) => {
              if (info.object) {
                setHoveredRegion(info.object.region);
              } else {
                setHoveredRegion(null);
              }
            }
          })
        ];

    // MapboxOverlay 생성
    const deckOverlay = new MapboxOverlay({
      interleaved: true,
      layers
    });

    // MapLibre에 컨트롤로 추가
    map.addControl(deckOverlay as any);
    deckRef.current = deckOverlay;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
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
            🗺️ 인터랙티브 지도
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
            MapLibre GL + Deck.gl 기반 고성능 히트맵
          </p>
        </div>

        {/* 뷰 모드 토글 */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('scatter')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              viewMode === 'scatter'
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
      <div className="relative" style={{ height: '600px' }}>
        <div ref={mapContainerRef} className="absolute inset-0" />

        {/* 호버 툴팁 */}
        {hoveredRegion && (
          <div 
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
          </div>
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
            🖱️ 드래그: 이동 | 스크롤: 줌
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