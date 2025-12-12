'use client';

import { useEffect, useRef } from 'react';
import SectionContainer from './SectionContainer';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

export default function Section7() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock YouTube videos data
  const videos: YouTubeVideo[] = [
    {
      id: '1',
      title: '사피엔스아일랜드와 함께하는 인사이트 여행',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '2',
      title: '디지털 트랜스포메이션의 미래',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '3',
      title: 'AI와 함께하는 비즈니스 혁신',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '4',
      title: '초개인화 서비스의 핵심',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '5',
      title: '데이터 기반 의사결정 전략',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: '6',
      title: '스타트업 성장 가이드',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ',
    },
  ];

  // Duplicate videos for infinite scroll effect
  const duplicatedVideos = [...videos, ...videos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    const cardWidth = 380; // width + gap
    const totalWidth = cardWidth * videos.length;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position for infinite loop
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, [videos.length]);

  return (
    <SectionContainer backgroundColor="white">
      <div className="w-full flex flex-col">
        {/* Header Section - Badge and Title */}
        <div className="flex flex-col items-center justify-center text-center gap-[var(--section-gap-medium)] mb-[var(--section-gap-large)]">
          {/* Badge */}
          <div 
            className="inline-flex items-center px-[1rem] py-[0.5rem] bg-[var(--section-brand-primary)] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
          >
            Your Question, Our Insight
          </div>
          
          {/* Main Title */}
          <h2 
            className="text-[var(--section-text-primary)] text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            SAPILAND, 사피랜드
          </h2>
        </div>

        {/* YouTube Carousel - Full Width */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-[1.25rem] overflow-x-hidden px-[2rem] md:px-[3rem] lg:px-[4rem] py-[1rem]"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="flex-shrink-0 w-[22.5rem] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                    <div className="w-[4rem] h-[4rem] bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <svg 
                        className="w-[2rem] h-[2rem] text-white ml-[0.25rem]" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-[1rem]">
                  <h3 
                    className="text-[var(--section-text-primary)] text-[1rem] leading-snug line-clamp-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}