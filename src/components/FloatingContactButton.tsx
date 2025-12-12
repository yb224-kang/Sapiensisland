import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface FloatingContactButtonProps {
  onBooking: (expertId?: number | null) => void;
}

export default function FloatingContactButton({ onBooking }: FloatingContactButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 100px 이상 스크롤 시 버튼 표시
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={() => onBooking(null)}
          className="fixed bottom-8 right-8 z-40 bg-[#000050] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
          aria-label="전문가 예약하기"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-[0.9375rem]">전문가 예약하기</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}