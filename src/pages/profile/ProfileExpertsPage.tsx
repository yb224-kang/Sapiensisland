import PageHeroLayout from "../../components/PageHeroLayout";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import { professors } from "../../data/professors";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileExpertsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const professorRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Handle scroll to specific professor
  useEffect(() => {
    const state = location.state as { scrollToProfessorId?: number } | null;
    
    if (state?.scrollToProfessorId) {
      const professorId = state.scrollToProfessorId;
      
      // Wait for DOM to be ready and TabNavigation to settle
      const timer = setTimeout(() => {
        const targetElement = professorRefs.current[professorId];
        
        if (targetElement) {
          // Calculate offset for header and tab navigation
          const headerHeight = 80; // Approximate header height
          const tabHeight = 60; // Approximate tab navigation height
          const extraOffset = 20; // Extra spacing
          
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - tabHeight - extraOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Optional: Highlight the card briefly
          setHoveredId(professorId);
          setTimeout(() => setHoveredId(null), 2000);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  const tabs = [
    { id: "professors", label: "전문가 프로필", path: "/experts" },
    { id: "booking", label: "예약문의", path: "/booking" }
  ];

  return (
    <PageHeroLayout
      title="지혜전문가"
      description="각 분야 최고의 전문가들이 여러분의 성장을 함께 합니다.<br class='hidden md:block' />검증된 전문가들의 깊이 있는 인사이트를 경험하세요."
      backgroundImage="https://png.pngtree.com/thumb_back/fw800/background/20251112/pngtree-abstract-network-connections-minimalist-white-background-with-space-for-text-image_19922004.webp"
      backgroundAlt="Professional mentors and experts"
      tabs={tabs}
      basePath="/profile"
    >
      {/* Professors Section */}
      <section className="w-full bg-white py-16 md:py-24 lg:py-28 px-8 md:px-16">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-12">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {professors.map((professor) => (
                <div
                  key={professor.id}
                  className="relative h-[300px] cursor-pointer perspective-1000"
                  onMouseEnter={() => setHoveredId(professor.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  ref={(el) => professorRefs.current[professor.id] = el}
                >
                  {/* Flip Container */}
                  <div 
                    className="relative w-full h-full transition-transform duration-700 transform-style-3d"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: hoveredId === professor.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front Side */}
                    <div 
                      className="absolute inset-0 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    >
                      <div className="p-6 h-full flex flex-col items-center text-center">
                        {/* Profile Image - Small Circle */}
                        <div className="relative w-[90px] h-[90px] mb-4">
                          <div className="w-full h-full rounded-full overflow-hidden ring-3 ring-gray-100">
                            <ImageWithFallback
                              src={professor.image}
                              alt={professor.name}
                              className="w-full h-full object-cover"
                              style={{
                                filter: 'grayscale(100%) sepia(20%) hue-rotate(200deg) saturate(150%)'
                              }}
                            />
                          </div>
                        </div>

                        {/* Name */}
                        <h3
                          className="text-[var(--section-text-primary)] text-[19px] md:text-[20px] mb-2 leading-[1.3]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          {professor.name}
                        </h3>

                        {/* Title */}
                        <p
                          className="text-[var(--section-text-secondary)] text-[12px] md:text-[13px] mb-3 leading-[1.5] px-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {professor.title}
                        </p>

                        {/* Field Badge */}
                        <div
                          className="inline-flex items-center px-3 py-1 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full text-[11px] md:text-[12px] mb-3"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          {professor.field}
                        </div>

                        {/* Divider */}
                        <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                        
                        {/* Hover Hint */}
                        <p 
                          className="mt-auto text-[var(--section-text-secondary)]/40 text-[10px] animate-pulse"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          자세히 보기 →
                        </p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div 
                      className="absolute inset-0 rounded-2xl bg-white border-2 border-[var(--section-brand-primary)] shadow-2xl overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[var(--section-brand-primary)] to-[var(--section-brand-primary)]/90 px-5 py-3">
                          <h4
                            className="text-white text-[16px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                          >
                            {professor.name}
                          </h4>
                          <p
                            className="text-white/80 text-[10px] mt-0.5"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            {professor.field}
                          </p>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                          {/* Short Bio */}
                          <div className="mb-4 pb-3 border-b border-gray-200">
                            <p
                              className="text-[var(--section-text-primary)] text-[11px] leading-[1.6] whitespace-pre-line"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                            >
                              {professor.shortBio}
                            </p>
                          </div>

                          {/* Education */}
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-1 h-3 bg-[var(--section-brand-primary)] rounded-full" />
                              <p
                                className="text-[var(--section-brand-primary)] text-[10px] uppercase tracking-wide"
                                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                              >
                                학력
                              </p>
                            </div>
                            <p
                              className="text-[var(--section-text-secondary)] text-[10px] leading-[1.6] whitespace-pre-line pl-3"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                            >
                              {professor.education}
                            </p>
                          </div>

                          {/* Expertise - First 3 items */}
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-1 h-3 bg-[var(--section-brand-primary)] rounded-full" />
                              <p
                                className="text-[var(--section-brand-primary)] text-[10px] uppercase tracking-wide"
                                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                              >
                                주요 분야
                              </p>
                            </div>
                            <p
                              className="text-[var(--section-text-secondary)] text-[10px] leading-[1.6] whitespace-pre-line pl-3"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                            >
                              {professor.expertise.split('\n').slice(0, 3).join('\n')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => navigate('/profile/booking')}
              className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-8 py-6 text-[16px] md:text-[18px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              예약문의
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </PageHeroLayout>
  );
}