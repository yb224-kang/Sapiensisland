import SectionContainer from "./SectionContainer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Section5() {
  const snapshots = [
    {
      id: 1,
      title: "랩톱 인터페이스",
      imageUrl: "https://images.unsplash.com/photo-1550622824-c11e494a4b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBtb2NrdXAlMjB3aGl0ZXxlbnwxfHx8fDE3NjQwNTUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "랩톱 화면 목업"
    },
    {
      id: 2,
      title: "태블릿 디자인",
      imageUrl: "https://images.unsplash.com/photo-1740721455292-e5cd29544381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBpc29sYXRlZHxlbnwxfHx8fDE3NjQwNTUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "태블릿 디바이스 스크린샷"
    },
    {
      id: 3,
      title: "맥북 프로덕트",
      imageUrl: "https://images.unsplash.com/photo-1566476927456-446189d7b1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNib29rJTIwcHJvZHVjdCUyMHNob3R8ZW58MXx8fHwxNzY0MDU1MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "맥북 프로덕트 샷"
    },
    {
      id: 4,
      title: "아이패드 UI",
      imageUrl: "https://images.unsplash.com/photo-1758973935099-5b662a863f6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGFkJTIwc3R1ZGlvJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjQwNTUzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "아이패드 인터페이스"
    }
  ];

  return (
    <SectionContainer backgroundColor="gray">
      <div className="flex flex-col gap-[var(--section-gap-large)] w-full max-w-[var(--section-max-width)]">
        {/* Section Header */}
        <div className="flex flex-col gap-[var(--section-gap-small)] text-center">
          {/* Title - Badge Style */}
          <div 
            className="inline-flex items-center self-center px-[1rem] py-[0.5rem] bg-[var(--section-brand-primary)] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
          >
            GALLERY
          </div>
          
          {/* Subtitle - Main Heading */}
          <h2 
            className="text-[var(--section-text-primary)] text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            다양한 디바이스
          </h2>
          
          {/* Description */}
          <p 
            className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] leading-relaxed max-w-[50rem] mx-auto"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
          >
            모든 플랫폼에서 완벽한 경험을 제공합니다
          </p>
        </div>

        {/* Snapshots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] md:gap-[2rem]">
          {snapshots.map((snapshot) => (
            <div
              key={snapshot.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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