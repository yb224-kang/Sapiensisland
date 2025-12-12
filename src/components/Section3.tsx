import SectionContainer from "./SectionContainer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Section3() {
  const snapshots = [
    {
      id: 1,
      title: "모바일 인터페이스",
      imageUrl: "https://images.unsplash.com/photo-1615790166084-59ace2ae5ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjQwNTUyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "모바일 앱 인터페이스 스크린샷"
    },
    {
      id: 2,
      title: "스마트폰 화면",
      imageUrl: "https://images.unsplash.com/photo-1760443728263-a85534971907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHN0dWRpbyUyMHNob3R8ZW58MXx8fHwxNzY0MDU1MjMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "스마트폰 화면 목업"
    },
    {
      id: 3,
      title: "대시보드 UI",
      imageUrl: "https://images.unsplash.com/photo-1658933161439-bbc61172d86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwcHJvZHVjdCUyMHBob3RvfGVufDF8fHx8MTc2NDA1NTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "앱 대시보드 ��페이스"
    },
    {
      id: 4,
      title: "디지털 프로덕트",
      imageUrl: "https://images.unsplash.com/photo-1760443728337-35a585921497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkZXZpY2UlMjBjbGVhbiUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY0MDU1MjMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "디지털 프로덕트 디자인"
    }
  ];

  return (
    <SectionContainer backgroundColor="white">
      <div className="flex flex-col gap-[var(--section-gap-large)] w-full max-w-[var(--section-max-width)]">
        {/* Section Header */}
        <div className="flex flex-col gap-[var(--section-gap-small)] text-center">
          {/* Title - Badge Style */}
          <div 
            className="inline-flex items-center self-center px-[1rem] py-[0.5rem] bg-[var(--section-brand-primary)] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
          >
            SNAPSHOTS
          </div>
          
          {/* Subtitle - Main Heading */}
          <h2 
            className="text-[var(--section-text-primary)] text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            프로젝트 스냅샷
          </h2>
          
          {/* Description */}
          <p 
            className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] leading-relaxed max-w-[50rem] mx-auto"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
          >
            우리의 프로젝트와 서비스를 한눈에 확인해보세요
          </p>
        </div>

        {/* Snapshots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] md:gap-[2rem]">
          {snapshots.map((snapshot) => (
            <div
              key={snapshot.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={snapshot.imageUrl}
                  alt={snapshot.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-[1rem] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 
                  className="text-white text-[1rem] md:text-[1.125rem]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  {snapshot.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}