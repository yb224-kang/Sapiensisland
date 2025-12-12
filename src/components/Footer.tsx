import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-white">
      <div className="box-border px-[1.25rem] py-[2rem] sm:px-[2rem] sm:py-[2.5rem] md:px-[3rem] md:py-[3rem] lg:px-[3.75rem] lg:py-[3.5rem]">
        <div className="max-w-[var(--section-max-width)] mx-auto">
          <div className="flex flex-col gap-6 sm:gap-6 md:gap-8">
            {/* Company Info Section */}
            <div className="flex flex-col gap-4 sm:gap-4">
              {/* Company Name and Address */}
              <div className="flex flex-col gap-2">
                <p 
                  className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                >
                  (주)사피엔스아일랜드
                </p>
                <p 
                  className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5] break-words"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                >
                  (06168) 서울특별시 강남구 테헤란로 503, 15층 1501호 (삼성동, 하이브로빌딩)
                </p>
              </div>

              {/* CEO and Business Registration */}
              <div className="flex flex-col gap-2 sm:gap-2 md:flex-row md:items-center md:gap-3">
                <div className="flex items-center gap-3">
                  <p 
                    className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5]"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    대표: 송상윤
                  </p>
                  <div className="hidden md:block h-[16px] w-0 border-l border-gray-500" />
                </div>
                <p 
                  className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                >
                  사업자등록번호: 543-81-02692
                </p>
              </div>

              {/* Phone */}
              <p 
                className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5]"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
              >
                대표전화 :02-2088-6584
              </p>

              {/* Contact Link */}
              <Link
                to="/contact/location"
                className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5] hover:underline"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
              >
                연락처 / 오시는 길
              </Link>
            </div>

            {/* Privacy Policy Links */}
            <div className="flex flex-wrap items-center gap-3">
              <Link 
                className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5] hover:underline cursor-pointer"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                to="/privacy-policy"
              >
                개인정보처리방침
              </Link>
              <div className="h-[14px] w-0 border-l border-gray-500" />
              <Link 
                className="text-[0.8125rem] sm:text-[0.875rem] md:text-[1rem] tracking-[-0.08px] leading-[1.5] hover:underline cursor-pointer"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                to="/location-info-policy"
              >
                위치정보이용약관
              </Link>
            </div>

            {/* Divider and Copyright */}
            <div className="flex flex-col gap-3 md:gap-3">
              <div className="w-full h-0 border-t border-gray-600" />
              <p 
                className="text-[0.6875rem] sm:text-[0.75rem] md:text-[0.875rem] tracking-[-0.08px] leading-[1.5] text-center break-words text-gray-400"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
              >
                Copyright © by SAPIENS ISLAND CORP. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}