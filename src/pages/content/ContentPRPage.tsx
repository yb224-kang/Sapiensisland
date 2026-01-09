import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

export default function ContentPRPage() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  
  const tabs = [
    { id: "youtube", label: "유튜브", path: "/youtube" },
    { id: "pr", label: "PR", path: "/pr" }
  ];

  // PR data with article URLs
  const prItems = [
    {
      id: 1,
      title: "사피엔스아일랜드, '헥사코 모델' 활용 초개인화 플랫폼 개발 착수",
      date: "2024.09.05",
      source: "뉴스웨이",
      url: "https://www.newsway.co.kr/news/view?ud=2024090515202691903",
      image: "https://nimage.newsway.co.kr/photo/2024/09/05/20240905000146_0700.jpg"
    },
    {
      id: 2,
      title: "신박해도 아름답지 않으면 눈길 못 끌어… 정보 전달력 떨어지면 소비자에 못 다가가",
      date: "2025.07.22",
      source: "조선일보",
      url: "https://www.chosun.com/special/special_section/2025/07/22/35PUQEWDGJEO7MPFFRHS2B573Q/?utm_source=naver&utm_medium=referral&utm_campaign=naver-news",
      image: "https://www.chosun.com/resizer/v2/THJSEPM7FRHHRN5LJV4J2BSKG4.jpg?auth=f385160f6f6657d0774f0ba85e9bdf7fbf2b1cd4a818e0ab765f5f7e4553cf80&width=560&height=784&smart=true"
    }
  ];

  return (
    <PageHeroLayout
      title="콘텐츠"
      description="최신 인사이트와 전문가의 지식을 담은 다양한 콘텐츠를 만나보세요.<br class='hidden md:block' />지속적으로 업데이트되는 가치 있는 정보를 제공합니다."
      backgroundImage="https://www.freevector.com/uploads/vector/preview/63903/Vecteezydigital-wavebackgroundDF0222rev_generated.jpg"
      backgroundAlt="Content creation and media"
      tabs={tabs}
      basePath="/content"
    >
      {/* PR Section */}
      <SectionContainer backgroundColor="white" reducedTopPadding alignItems="start">
        <div className="w-full max-w-[97.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {prItems.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedArticle(item.url)}
              >
                {/* Blurred Background Image */}
                <ImageWithFallback
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-90"
                />
                
                {/* Main Image */}
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3
                    className="mb-1.5 leading-[1.3] line-clamp-1"
                    style={{ 
                      fontFamily: 'Pretendard Variable, sans-serif', 
                      fontWeight: 700,
                      fontSize: 'clamp(13px, 1.5vw, 16px)'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-white/80 text-[13px]"
                    style={{ 
                      fontFamily: 'Pretendard Variable, sans-serif', 
                      fontWeight: 500
                    }}
                  >
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Sticky */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
              <a
                href={selectedArticle}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#000050] hover:text-[#000070] transition-colors px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl"
                style={{ 
                  fontFamily: 'Pretendard Variable, sans-serif', 
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <ExternalLink className="w-4 h-4" />
                새 탭에서 열기
              </a>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* iframe Content */}
            <iframe
              src={selectedArticle}
              title="Article"
              className="w-full h-full border-0 pt-16"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      )}

      <Footer />
    </PageHeroLayout>
  );
}