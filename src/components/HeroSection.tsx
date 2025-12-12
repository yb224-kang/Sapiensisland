import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import serviceLogo1 from "figma:asset/a2d6b6fad345113a74cea577ad925342b6658cd5.png";
import serviceLogo2 from "figma:asset/b4dcd96aa72cb41d5827405f89284eb0b4f66c3e.png";
import serviceLogo3 from "figma:asset/74c0accd5f972481a08f931cddf086935534c0dc.png";

const heroTitles = [
  {
    id: 1,
    line1: "세상의 모든 마인드를",
    line2: "읽어드립니다."
  },
  {
    id: 2,
    line1: "Your Questions,",
    line2: "Our Insights"
  }
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % heroTitles.length);
    }, 8000); // 5초 → 8초로 변경 (더 느리게)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] bg-white overflow-hidden flex items-center py-12 md:py-16 lg:py-20 px-8 md:px-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />
      
      <div className="relative z-10 w-full max-w-[var(--section-max-width)] mx-auto">
        {/* Subtle Floating Rings - Optimized for smooth animation without flickering */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.08, 0.15, 0.08],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-24 right-[30%] w-28 h-28 border border-[#000050] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.06, 0.12, 0.06],
            y: [0, 18, 0]
          }}
          transition={{ 
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-32 right-12 w-32 h-32 border border-purple-400 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.07, 0.14, 0.07],
            y: [0, -12, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-20 right-[35%] w-30 h-30 border border-indigo-300 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.05, 0.11, 0.05],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 right-[20%] w-26 h-26 border border-purple-300 rounded-full"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center self-start px-4 py-2 bg-gradient-to-br from-[#000050] to-[#000040] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
            >
              WELCOME TO SAPIENS ISLAND
            </motion.div>

            {/* Main Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-[var(--section-text-primary)] text-[2rem] md:text-[2.625rem] lg:text-[3rem] leading-tight"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
              >
                {heroTitles[currentTitleIndex].line1}
                <br />
                {heroTitles[currentTitleIndex].line2}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-relaxed"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              지혜전문가 그룹과 다양한 사람들이 소통하여 세상의 모든 마인드를 해석하는 지식 액셀러레이팅 서비스
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile/booking')}
                className="bg-[#1e1e1e] text-white hover:bg-[#000050] transition-all duration-300 px-6 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] self-start shadow-lg hover:shadow-2xl"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                강연예약
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="bg-[#1e1e1e] text-white hover:bg-[#000050] transition-all duration-300 px-6 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] self-start shadow-lg hover:shadow-2xl"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                회사소개
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Service Logos */}
          <div className="flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative grid grid-cols-2 gap-6 md:gap-10 max-w-[400px] md:max-w-[500px] lg:max-w-[640px] w-full">
              {/* Decorative Blur Circles - Simplified */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                className="absolute -top-12 -left-12 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-[#000050] to-purple-500 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                className="absolute -bottom-12 -right-12 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-purple-400 to-blue-300 rounded-full blur-3xl"
              />

              {/* Logo 1 - Top Left - Simplified Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0
                }}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.6, 
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.08 }}
                className="relative z-10 flex items-center justify-center"
              >
                <img 
                  src={serviceLogo1} 
                  alt="Service Logo 1" 
                  className="w-full h-auto max-w-[80px] md:max-w-[100px] lg:max-w-[120px] rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>

              {/* Logo 2 - Top Right - Simplified Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0
                }}
                transition={{ 
                  delay: 1.0, 
                  duration: 0.6, 
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.08 }}
                className="relative z-10 flex items-center justify-center mt-6 md:mt-12"
              >
                <img 
                  src={serviceLogo2} 
                  alt="Service Logo 2" 
                  className="w-full h-auto max-w-[80px] md:max-w-[100px] lg:max-w-[120px] rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>

              {/* Logo 3 - Bottom Center - Simplified Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0
                }}
                transition={{ 
                  delay: 1.2, 
                  duration: 0.6, 
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.08 }}
                className="relative z-10 col-span-2 flex items-center justify-center"
              >
                <img 
                  src={serviceLogo3} 
                  alt="Service Logo 3" 
                  className="w-full h-auto max-w-[80px] md:max-w-[100px] lg:max-w-[120px] rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}