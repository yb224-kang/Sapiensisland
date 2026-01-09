import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { Navigation, Car, Train, Bus, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function AboutLocationPage() {
  const tabs = [
    { id: "vision", label: "비전", path: "/vision" },
    { id: "competency", label: "역량", path: "/competency" },
    { id: "history", label: "연혁", path: "/history" },
    { id: "location", label: "연락처 / 오시는길", path: "/location" }
  ];

  return (
    <PageHeroLayout
      title="회사소개"
      description="지식 전문가의 인사이트와 초개인화 IT 기술을 결합해,<br class='hidden md:block' />타인과 자신을 이해하고 삶의 복잡한 문제를 해소하는 솔루션을 제공합니다."
      backgroundImage="https://images.presentationgo.com/2025/09/abstract-digital-data-wave.jpg"
      backgroundAlt="Team collaboration and network"
      tabs={tabs}
      basePath="/about"
    >
      {/* Map Section */}
      <SectionContainer backgroundColor="light" reducedTopPadding>
        <div className="w-full max-w-[97.5rem]">
          {/* Introduction */}
          <div className="text-center mb-4 md:mb-6">
            <p 
              className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              서울특별시 강남구 테헤란로 503, 15층 1501호 (삼성동, 하이브로빌딩)
            </p>
          </div>

          {/* Contact Info Cards Grid - 4 in a row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    전화번호
                  </p>
                  <a
                    href="tel:02-2088-6584"
                    className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px] hover:text-[var(--section-brand-primary)] transition-colors"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    02-2088-6584
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    이메일
                  </p>
                  <a
                    href="mailto:Contact@sapisland.com"
                    className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] hover:text-[var(--section-brand-primary)] transition-colors break-all"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    Contact@sapisland.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    주소
                  </p>
                  <p
                    className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] leading-relaxed"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    서울 강남구 테헤란로 503,<br />
                    15층 1501호
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    운영 시간
                  </p>
                  <p
                    className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] leading-relaxed"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                  >
                    평일: 오전 9시 - 오후 6시<br />
                    주말 및 공휴일: 휴무
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 md:mb-12">
            <iframe
              src="https://maps.google.com/maps?q=37.507594,127.057202&z=17&output=embed&markers=37.507594,127.057202&iwloc=near"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="사피엔스아일랜드 위치"
              className="w-full h-[360px] md:h-[420px] lg:h-[520px]"
            />
          </div>

          {/* Transportation Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Train */}
            <div className="bg-[var(--section-bg-gray)] rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--section-brand-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-[var(--section-brand-primary)]" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[18px] md:text-[20px] pt-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  지하철
                </h3>
              </div>
              <div
                className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] leading-relaxed space-y-2"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
              >
                <p><span className="inline-block w-6 h-6 bg-[#00A84D] text-white rounded text-center leading-6 mr-2" style={{ fontWeight: 700 }}>2</span>삼성역 5번 출구 도보 5분</p>
                <p><span className="inline-block w-6 h-6 bg-[#996CAC] text-white rounded text-center leading-6 mr-2" style={{ fontWeight: 700 }}>9</span>봉은사역 7번 출구 도보 8분</p>
              </div>
            </div>

            {/* Bus */}
            <div className="bg-[var(--section-bg-gray)] rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--section-brand-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Bus className="w-6 h-6 text-[var(--section-brand-primary)]" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[18px] md:text-[20px] pt-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  버스
                </h3>
              </div>
              <div
                className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] leading-relaxed space-y-2"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
              >
                <p><span className="text-[var(--section-brand-primary)]" style={{ fontWeight: 600 }}>간선:</span> 146, 341, 360, 740</p>
                <p><span className="text-[var(--section-brand-primary)]" style={{ fontWeight: 600 }}>지선:</span> 3411, 4419</p>
                <p className="text-[12px] text-[var(--section-text-secondary)]/70">삼성역 정류장 하차</p>
              </div>
            </div>

            {/* Car */}
            <div className="bg-[var(--section-bg-gray)] rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--section-brand-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-[var(--section-brand-primary)]" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[18px] md:text-[20px] pt-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  자가용
                </h3>
              </div>
              <div
                className="text-[var(--section-text-secondary)] text-[13px] md:text-[14px] leading-relaxed"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
              >
                <p>방문 전 주차 가능 여부 확인 권장</p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}