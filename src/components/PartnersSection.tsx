import { motion } from "motion/react";

// 모든 파트너사를 하나의 배열로 통합
const partners = [
  { id: 1, name: "삼성전자", logoType: "text", color: "#1428A0" },
  { id: 2, name: "LG전자", logoType: "text", color: "#A50034" },
  { id: 4, name: "SK하이닉스", logoType: "text", color: "#EA002C" },
  { id: 5, name: "네이버", logoType: "text", color: "#03C75A" },
  { id: 6, name: "카카오", logoType: "text", color: "#FEE500" },
  { id: 7, name: "포스코", logoType: "text", color: "#005BAC" },
  { id: 8, name: "한국전력공사", logoType: "text", color: "#003DA5" },
  { id: 9, name: "KT", logoType: "text", color: "#E30613" }
];

export default function PartnersSection() {
  // 무한 스크롤을 위해 파트너 배열을 3번 복제
  const infinitePartners = [...partners, ...partners, ...partners];

  return (
    <section className="w-full bg-white py-[1.5rem] md:py-[2rem] lg:py-[2.5rem] px-[2rem] md:px-[4rem]">
      <div className="w-full max-w-[var(--section-max-width)] mx-auto">
        {/* Single Row of Infinite Scrolling Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden py-2"
        >
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="flex gap-7 md:gap-10 animate-scroll-left py-1">
            {infinitePartners.map((partner, index) => (
              <div
                key={`partner-${partner.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-4 py-4 md:px-5 md:py-5 bg-white rounded-2xl border-2 border-gray-100 shadow-md hover:shadow-xl hover:border-gray-200 transition-all duration-300 min-w-[128px] md:min-w-[162px]"
              >
                {partner.logoType === 'text' ? (
                  <p
                    className="text-[0.875rem] md:text-[1.1875rem] lg:text-[1.375rem] whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Pretendard Variable, sans-serif', 
                      fontWeight: 800,
                      color: partner.color
                    }}
                  >
                    {partner.name}
                  </p>
                ) : (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-[2rem] md:max-h-[2.5rem] max-w-full object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS Animation for infinite scroll */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}