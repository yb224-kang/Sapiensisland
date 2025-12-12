'use client';

import { useEffect, useRef } from 'react';
import SectionContainer from '../components/SectionContainer';
import Footer from '../components/Footer';
import TabNavigation from '../components/TabNavigation';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

export default function ContentPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "pr", label: "PR" },
    { id: "youtube", label: "유튜브" }
  ];

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
    <div className="w-full">
      {/* Hero Section with Full Background */}
      <div className="relative w-full min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1572814392266-1620040c58be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjBtZWRpYXxlbnwxfHx8fDE3NjQyOTU4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Content creation and media"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Center Content - Title & Description */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <div className="text-center max-w-[1000px]">
            {/* Main Heading */}
            <h1
              className="text-white tracking-[-0.1px] leading-[1.2] text-[42px] md:text-[56px] lg:text-[68px] mb-6"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              콘텐츠
            </h1>
            
            <p
              className="text-white/90 leading-[1.7] max-w-[800px] mx-auto text-[16px] md:text-[18px] lg:text-[19px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              최신 인사이트와 전문가의 지식을 담은 다양한 콘텐츠를 만나보세요.<br className="hidden md:block" />
              지속적으로 업데이트되는 가치 있는 정보를 제공합니다.
            </p>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <TabNavigation tabs={tabs} />
        </div>
      </div>

      {/* PR Section */}
      <div id="pr">
        <SectionContainer backgroundColor="white">
          <div className="flex flex-col items-center justify-center gap-[var(--section-gap-large)] w-full max-w-[1200px] mx-auto">
            <h2
              className="text-[var(--section-brand-primary)] tracking-[-0.1px] leading-[1.3] text-[32px] md:text-[42px] lg:text-[48px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              언론 보도
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {/* PR 아이템들 - 추후 실제 데이터로 교체 */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                    >
                      PR 미지 {item}
                    </span>
                  </div>
                  <div className="p-6">
                    <p
                      className="text-[var(--section-text-secondary)] text-[12px] mb-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                    >
                      2024.11.{20 + item}
                    </p>
                    <h3
                      className="text-[var(--section-text-primary)] text-[18px] md:text-[20px] mb-2 line-clamp-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                    >
                      사피엔스아일랜드 관련 보도 제목 {item}
                    </h3>
                    <p
                      className="text-[var(--section-text-secondary)] text-[14px] line-clamp-3"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      사피엔스아일랜드의 혁신적인 서비스와 비전에 대한 언론 보도 내용입니다.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
      
      {/* YouTube Carousel Section */}
      <div id="youtube">
        <SectionContainer backgroundColor="white">
          <div className="w-full flex flex-col">
            {/* YouTube Carousel - Full Width */}
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
              <div 
                ref={scrollRef}
                className="flex gap-5 overflow-x-hidden px-8 md:px-12 lg:px-16 py-4"
                style={{ scrollBehavior: 'auto' }}
              >
                {duplicatedVideos.map((video, index) => (
                  <div
                    key={`${video.id}-${index}`}
                    className="flex-shrink-0 w-[360px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
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
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                          <svg 
                            className="w-8 h-8 text-white ml-1" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-4">
                      <h3 
                        className="text-[var(--section-text-primary)] text-[16px] leading-snug line-clamp-2"
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
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}