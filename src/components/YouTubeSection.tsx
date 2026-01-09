import { motion } from "motion/react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useState } from "react";

const youtubeVideos = [
  {
    id: 1,
    videoId: "CEg-OJItD7Y",
    thumbnail: "https://img.youtube.com/vi/CEg-OJItD7Y/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=CEg-OJItD7Y",
    duration: "12:34"
  },
  {
    id: 2,
    videoId: "Z6SoJHWOD5U",
    thumbnail: "https://img.youtube.com/vi/Z6SoJHWOD5U/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Z6SoJHWOD5U",
    duration: "15:42"
  },
  {
    id: 3,
    videoId: "EDr9b3M0qOA",
    thumbnail: "https://img.youtube.com/vi/EDr9b3M0qOA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=EDr9b3M0qOA",
    duration: "18:20"
  },
  {
    id: 4,
    videoId: "oQrGHazduKA",
    thumbnail: "https://img.youtube.com/vi/oQrGHazduKA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=oQrGHazduKA",
    duration: "10:15"
  },
  {
    id: 5,
    videoId: "9iinlDCuERY",
    thumbnail: "https://img.youtube.com/vi/9iinlDCuERY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=9iinlDCuERY",
    duration: "14:58"
  },
  {
    id: 6,
    videoId: "kNaG3YNicHM",
    thumbnail: "https://img.youtube.com/vi/kNaG3YNicHM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=kNaG3YNicHM",
    duration: "16:32"
  }
];

export default function YouTubeSection() {
  const navigate = useNavigate();
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  
  const handleVideoClick = (videoId: number) => {
    setPlayingVideoId(videoId);
  };

  // Custom Arrow Components
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-lg hover:bg-[#000050] hover:text-white transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-[#000050] group-hover:text-white" />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-lg hover:bg-[#000050] hover:text-white transition-all duration-300 flex items-center justify-center group"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-[#000050] group-hover:text-white" />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    cssEase: "ease-in-out"
  };

  return (
    <section className="w-full min-h-[70vh] bg-[#f8f9fa] py-[3rem] md:py-[4rem] lg:py-[5rem] px-[2rem] md:px-[4rem] flex items-center">
      <div className="w-full max-w-[var(--section-max-width)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] lg:gap-[3.5rem] items-center">
          
          {/* YouTube Video Carousel - Order 2 on Mobile, Order 1 on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative w-full px-12">
              <Slider {...settings}>
                {youtubeVideos.map((video) => (
                  <div key={video.id} className="px-2">
                    <motion.div
                      className="group cursor-pointer"
                      whileHover={{ scale: playingVideoId === video.id ? 1 : 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Large Video Card Container */}
                      <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-gray-100">
                        {playingVideoId === video.id ? (
                          // Show iframe when playing
                          <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : (
                          // Show thumbnail when not playing
                          <>
                            {/* Thumbnail Image */}
                            <div onClick={() => handleVideoClick(video.id)}>
                              <ImageWithFallback
                                src={video.thumbnail}
                                alt="YouTube Video"
                                className="w-full h-full object-cover"
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

                              {/* Duration Badge */}
                              <div className="absolute top-4 right-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg">
                                <p
                                  className="text-white text-[0.8125rem] md:text-[0.875rem]"
                                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                                >
                                  {video.duration}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>

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
              YOUTUBE
            </div>
            
            {/* Main Heading */}
            <h2 
              className="text-[var(--section-text-primary)] text-[2rem] md:text-[2.625rem] lg:text-[3rem] leading-tight"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              사피엔스 피플이 만들어가는<br />
              CONTENTS
            </h2>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/content')}
              className="bg-[#000050] text-white hover:bg-[#1e1e1e] transition-all duration-300 px-6 py-2.5 rounded-full text-[0.8125rem] md:text-[0.9375rem] self-start shadow-lg hover:shadow-2xl"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              자세히보기
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}