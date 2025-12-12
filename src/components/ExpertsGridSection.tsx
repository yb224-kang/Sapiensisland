import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { professors } from "../data/professors";

export default function ExpertsGridSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-[70vh] bg-white py-[3rem] md:py-[4rem] lg:py-[5rem] px-[2rem] md:px-[4rem] flex items-center">
      <div className="w-full max-w-[var(--section-max-width)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] lg:gap-[3.5rem] items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
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
              KNOWLEDGE EXPERTS
            </div>
            
            {/* Main Heading */}
            <h2 
              className="text-[var(--section-text-primary)] text-[2rem] md:text-[2.625rem] lg:text-[3rem] leading-tight"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              사피엔스와 함께하는<br />
              Wisdom Experts
            </h2>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')}
              className="bg-[#1e1e1e] text-white hover:bg-[#000050] transition-all duration-300 px-6 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] self-start shadow-lg hover:shadow-2xl"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              자세히보기
            </motion.button>
          </motion.div>

          {/* Right Side - Professor Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[650px]">
              {/* 2 Rows x 4 Columns Grid */}
              <div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                style={{ willChange: 'transform' }}
              >
                {professors.slice(0, 8).map((professor, index) => (
                  <div
                    key={professor.id}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredId(professor.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100 shadow-md transition-all duration-300 group-hover:scale-105">
                      {/* Professor Image */}
                      <ImageWithFallback
                        src={professor.image}
                        alt={professor.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Basic Info - Always Visible */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center">
                        <p
                          className="text-[0.75rem] md:text-[0.875rem]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          {professor.name} / {professor.field}
                        </p>
                      </div>
                      
                      {/* Hover Overlay - Show "More Info" Button */}
                      <div
                        className={`absolute inset-0 flex flex-col justify-center items-center text-white text-center transition-all duration-300 ${
                          hoveredId === professor.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 80, 0.6)',
                          backdropFilter: 'blur(4px)',
                          WebkitBackdropFilter: 'blur(4px)'
                        }}
                      >
                        {/* More Info Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/profile/experts', { state: { scrollToProfessorId: professor.id } });
                          }}
                          className="bg-white text-[#000050] hover:bg-[#7dd3fc] hover:text-white transition-all duration-300 px-5 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] shadow-lg"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          더보기 →
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}