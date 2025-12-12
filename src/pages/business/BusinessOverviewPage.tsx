import { motion } from "motion/react";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { Users, Lightbulb, Target, TrendingUp, BookOpen, Sparkles, MessageSquare, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessOverviewPage() {
  const tabs = [
    { id: "overview", label: "Business", path: "/overview" },
    { id: "hati", label: "HATI", path: "/hati" },
    { id: "insiq", label: "INSIQ", path: "/insiq" }
  ];

  return (
    <PageHeroLayout
      title="서비스"
      description="혁신적인 기술과 전문 지식을 바탕으로<br class='hidden md:block' />고객의 성장과 성공을 지원하는 다양한 서비스를 제공합니다."
      backgroundImage="https://png.pngtree.com/thumb_back/fw800/background/20250830/pngtree-minimalist-green-tech-lines-image_18707991.webp"
      backgroundAlt="Business innovation and technology"
      tabs={tabs}
      basePath="/business"
    >
      {/* Integrated Flow Diagram */}
      <SectionContainer backgroundColor="white" reducedTopPadding>
        <div className="flex items-start justify-center min-h-[400px] w-full max-w-[75rem] mx-auto pt-8">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-[var(--section-bg-gray)] to-white rounded-2xl border-2 border-dashed border-[var(--section-brand-primary)]/30">
                <div className="text-center p-8">
                  <p 
                    className="text-[var(--section-text-secondary)] text-[16px] md:text-[18px]"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    향후 모식도 이미지 첨부 필요
                  </p>
                  <p 
                    className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] mt-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    지혜전문가, INSIQ 플랫폼, 고객 연결 플로우 다이어그램
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}