import PageHeroLayout from "../components/PageHeroLayout";
import SectionContainer from "../components/SectionContainer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { useState } from "react";
import Footer from "../components/Footer";
import { professors } from "../data/professors";
import ExpertDetailModal from "../components/ExpertDetailModal";
import { motion } from "framer-motion";

interface ProfilePageProps {
  onOpenBookingModal: (expertId?: number | null) => void;
}

export default function ProfilePage({ onOpenBookingModal }: ProfilePageProps) {
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleCardClick = (professorId: number) => {
    setSelectedExpert(professorId);
    setIsDetailModalOpen(true);
  };

  const handleBookingFromDetail = (expertId: number) => {
    onOpenBookingModal(expertId);
  };

  const selectedExpertData = professors.find(p => p.id === selectedExpert);

  return (
    <PageHeroLayout
      title="지혜전문가"
      description="각 분야 최고의 전 여의 성장을 함께 합니다.<br class='hidden md:block' />검증된 전문가들의 깊이 있는 인사이트를 경험하세요."
      backgroundImage="https://png.pngtree.com/thumb_back/fw800/background/20251112/pngtree-abstract-network-connections-minimalist-white-background-with-space-for-text-image_19922004.webp"
      backgroundAlt="Professional mentors and experts"
      tabs={[]}
      basePath="/profile"
    >
      {/* Professors Section */}
      <SectionContainer backgroundColor="white" reducedTopPadding>
        <div className="w-full max-w-[97.5rem]">
          <div className="flex flex-col items-center gap-[1rem]">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-[var(--section-text-secondary)] text-[0.875rem] md:text-[1rem] max-w-[37.5rem]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              원하시는 전문가와 일정을 선택하고 예약을 진행하실 수 있습니다
            </motion.p>

            {/* Professors Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {professors.map((professor, index) => (
                <motion.div
                  key={professor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Top: Profile Image + Info - Center Aligned */}
                    <div className="flex flex-col items-center gap-3 mb-4">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <div className="w-[7.2rem] h-[7.2rem] rounded-xl overflow-hidden ring-2 ring-gray-100 shadow-md">
                          <ImageWithFallback
                            src={professor.image}
                            alt={professor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Info - Center Aligned */}
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        {/* Name */}
                        <h3
                          className="text-[var(--section-text-primary)] text-[1.125rem] leading-[1.3]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          {professor.name}
                        </h3>

                        {/* Field Badge */}
                        <div
                          className="inline-flex items-center px-2.5 py-0.5 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full text-[0.6875rem]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          {professor.field}
                        </div>

                        {/* Title */}
                        <p
                          className="text-[var(--section-text-secondary)] text-[0.75rem] leading-[1.4]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          {professor.title}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[0.0625rem] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />
                    
                    {/* Bottom: CTA Buttons */}
                    <div className="mt-auto w-full flex flex-row gap-2 justify-center">
                      <Button
                        className="w-[4.55rem] bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-3 py-1.5 text-[0.7875rem] rounded-lg transition-all"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        onClick={() => {
                          onOpenBookingModal(professor.id);
                        }}
                      >
                        예약하기
                      </Button>
                      <Button
                        className="w-[4.55rem] bg-white hover:bg-gray-50 text-[var(--section-brand-primary)] border border-[var(--section-brand-primary)] px-3 py-1.5 text-[0.7875rem] rounded-lg transition-all"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        onClick={() => handleCardClick(professor.id)}
                      >
                        상세보기
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-[50rem] mx-auto text-center mt-8"
            >
              <div className="bg-gradient-to-r from-[var(--section-brand-primary)]/5 to-transparent rounded-3xl p-8 md:p-12">
                <h3
                  className="text-[var(--section-text-primary)] text-[1.5rem] md:text-[1.75rem] mb-4"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  전문가와 함께 성장하세요
                </h3>
                <p
                  className="text-[var(--section-text-secondary)] text-[0.875rem] md:text-[1rem] mb-6"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                >
                  원하시는 전문가와 일정을 선택하고 예약을 진행하실 수 있습니다
                </p>
                <Button
                  onClick={() => onOpenBookingModal(null)}
                  className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-8 py-6 text-[1rem] md:text-[1.125rem] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  전문가 예약하기 →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Expert Detail Modal */}
      <ExpertDetailModal
        expert={selectedExpertData || null}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBooking={handleBookingFromDetail}
      />

      <Footer />
    </PageHeroLayout>
  );
}