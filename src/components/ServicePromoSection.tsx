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
          
          {/* Text Content - Order 1 on Mobile, Order 2 on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-3 order-1 lg:order-2"
          >
            {/* Badge */}
            <div 
              className="inline-flex items-center self-start px-3 py-1.5 bg-white border-2 border-[#000050] text-[#000050] rounded-full text-[0.625rem] md:text-[0.75rem] tracking-wider"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
            >
              SERVICES
            </div>
            
            {/* Main Heading */}
            <h2 
              className="text-[var(--section-text-primary)] text-[2rem] md:text-[2.625rem] lg:text-[3rem] leading-tight"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              모든 질문에 석학인 지혜전문가분들이 답변을 해드립니다.
            </h2>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/business')}
              className="bg-[#000050] text-white hover:bg-[#1e1e1e] transition-all duration-300 px-6 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] self-start shadow-lg hover:shadow-2xl"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              자세히보기
            </motion.button>
          </motion.div>

          {/* Image Content - Order 2 on Mobile, Order 1 on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center items-center order-2 lg:order-1"
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
        </div>
      </div>
    </section>
  );
}