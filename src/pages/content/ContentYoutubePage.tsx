import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useState } from "react";

export default function ContentYoutubePage() {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  const tabs = [
    { id: "youtube", label: "유튜브", path: "/youtube" },
    { id: "pr", label: "PR", path: "/pr" }
  ];

  // YouTube data
  const youtubeItems = [
    {
      id: 1,
      thumbnail: "https://img.youtube.com/vi/CEg-OJItD7Y/maxresdefault.jpg",
      videoId: "CEg-OJItD7Y"
    },
    {
      id: 2,
      thumbnail: "https://img.youtube.com/vi/Z6SoJHWOD5U/maxresdefault.jpg",
      videoId: "Z6SoJHWOD5U"
    },
    {
      id: 3,
      thumbnail: "https://img.youtube.com/vi/EDr9b3M0qOA/maxresdefault.jpg",
      videoId: "EDr9b3M0qOA"
    },
    {
      id: 4,
      thumbnail: "https://img.youtube.com/vi/oQrGHazduKA/maxresdefault.jpg",
      videoId: "oQrGHazduKA"
    },
    {
      id: 5,
      thumbnail: "https://img.youtube.com/vi/9iinlDCuERY/maxresdefault.jpg",
      videoId: "9iinlDCuERY"
    },
    {
      id: 6,
      thumbnail: "https://img.youtube.com/vi/kNaG3YNicHM/maxresdefault.jpg",
      videoId: "kNaG3YNicHM"
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
      {/* YouTube Section */}
      <SectionContainer backgroundColor="white" reducedTopPadding alignItems="start">
        <div className="w-full max-w-[97.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {youtubeItems.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-2xl aspect-[16/9] shadow-lg hover:shadow-2xl transition-all duration-500 bg-black"
              >
                {playingVideoId === item.videoId ? (
                  /* YouTube iframe - Playing */
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  /* Thumbnail - Not Playing */
                  <div
                    className="relative group cursor-pointer w-full h-full"
                    onClick={() => setPlayingVideoId(item.videoId)}
                  >
                    {/* Background Image */}
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt="YouTube video thumbnail"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[52px] h-[52px] bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <svg 
                          className="w-[26px] h-[26px] text-white ml-0.5" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}