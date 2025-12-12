import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import hatiMockup from "figma:asset/d2981efae0e25a3844ec2ae1f7ff83860fbb42f7.png";
import insiqMockup from "figma:asset/04c57dbacc0ea9b0f58ee0399e55174b7be696f2.png";

const mockupImages = [
  {
    id: 1,
    src: hatiMockup,
    alt: "HATI 앱 화면 목업"
  },
  {
    id: 2,
    src: insiqMockup,
    alt: "INSIQ 앱 화면 목업"
  }
];

export default function ServicePromoSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mockupImages.length);
    }, 8000); // 8초마다 이미지 전환 (6초 → 8초로 변경, 전체적으로 더 느리게)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[70vh] bg-[#f8f9fa] py-[3rem] md:py-[4rem] lg:py-[5rem] px-[2rem] md:px-[4rem] flex items-center">
      <div className="w-full max-w-[var(--section-max-width)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] lg:gap-[3.5rem] items-center">
          
          {/* Left Side - Image Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* HATI Mockup Image */}
            <div className="relative w-full max-w-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mockupImages[currentImageIndex].id}
                  src={mockupImages[currentImageIndex].src}
                  alt={mockupImages[currentImageIndex].alt}
                  className="w-full h-auto drop-shadow-2xl"
                  style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <div 
              className="inline-flex items-center self-start px-4 py-2 bg-gradient-to-br from-[#000050] to-[#000040] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
            >
              OUR SERVICES
            </div>
            
            {/* Main Heading */}
            <h2 
              className="text-[var(--section-text-primary)] text-[2rem] md:text-[2.625rem] lg:text-[3rem] leading-tight"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              AI 기반 지식 플랫폼으로<br />
              비즈니스를 혁신하세요
            </h2>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/business')}
              className="bg-[#1e1e1e] text-white hover:bg-[#000050] transition-all duration-300 px-6 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] self-start shadow-lg hover:shadow-2xl"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              서비스 자세히보기
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}