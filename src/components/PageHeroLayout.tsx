import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import TabNavigation from "./TabNavigation";

interface Tab {
  id: string;
  label: string;
  path: string;
}

interface PageHeroLayoutProps {
  title: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
  tabs?: Tab[];
  basePath?: string;
  children: ReactNode;
}

export default function PageHeroLayout({
  title,
  description,
  backgroundImage,
  backgroundAlt,
  tabs,
  basePath,
  children
}: PageHeroLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // location.state에서 scrollToContent 확인
    const shouldScrollToContent = (location.state as any)?.scrollToContent;

    // 하위메뉴 탭 클릭(scrollToContent: true)인 경우에만 콘텐츠로 스크롤
    if (shouldScrollToContent && contentRef.current) {
      // 레이아웃이 완전히 안정화될 때까지 대기
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            const headerHeight = 80; // Header 높이
            const offset = 20; // 추가 여백
            const elementPosition = contentRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }, [location]);

  return (
    <div className="w-full">
      {/* Hero Section with Full Background */}
      <div className="relative w-full min-h-[51vh] md:min-h-[55.25vh] lg:min-h-[59.5vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src={backgroundImage}
            alt={backgroundAlt}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Center Content - Title & Description */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <div className="text-center max-w-[62.5rem]">
            {/* Main Heading */}
            <h1
              className="text-white tracking-[-0.1px] leading-[1.3] text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] mb-[1rem] md:mb-[1.25rem] lg:mb-[1.5rem]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              {title}
            </h1>
            
            <p
              className="text-white/90 leading-[1.7] max-w-[50rem] mx-auto text-[1rem] md:text-[1.125rem] lg:text-[1.1875rem]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          {tabs && basePath && <TabNavigation tabs={tabs} basePath={basePath} />}
        </div>
      </div>

      {/* Page Content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}