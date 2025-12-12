import { useState } from "react";
import SectionContainer from "../components/SectionContainer";
import Footer from "../components/Footer";
import TabNavigation from "../components/TabNavigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    agency: "",
    client: "",
    location: "",
    topic: "",
    audience: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    fee: "",
    message: ""
  });

  const tabs = [
    { id: "inquiry", label: "문의하기" },
    { id: "contact", label: "연락처" },
    { id: "location", label: "찾아오시는길" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 폼 제출 로직 구현
    console.log("Form submitted:", formData);
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section with Full Background */}
      <div className="relative w-full min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1730531678572-49f4765235f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pY2F0aW9uJTIwY29ubmVjdGlvbiUyMGNvbnRhY3R8ZW58MXx8fHwxNzY0Mjk1ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Communication and contact"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Center Content - Title & Description */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <div className="text-center max-w-[1000px]">
            {/* Main Heading */}
            <h1
              className="text-white tracking-[-0.1px] leading-[1.2] text-[42px] md:text-[56px] lg:text-[68px] mb-6"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              문의하기
            </h1>
            
            <p
              className="text-white/90 leading-[1.7] max-w-[800px] mx-auto text-[16px] md:text-[18px] lg:text-[19px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              사피엔스아일랜드와 함께 성장할 기회를 만들어보세요.<br className="hidden md:block" />
              언제든지 문의 주시면 신속하게 답변드리겠습니다.
            </p>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <TabNavigation tabs={tabs} />
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="inquiry">
        <SectionContainer backgroundColor="gray-50">
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md">
              <h3
                className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-6"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
              >
                문의 양식
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="agency"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    요청사 (AGENCY) *
                  </label>
                  <Input
                    id="agency"
                    name="agency"
                    type="text"
                    required
                    value={formData.agency}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="요청사 이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    주최사 (고객사) *
                  </label>
                  <Input
                    id="client"
                    name="client"
                    type="text"
                    required
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="주최사 이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    강연 장소
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="강연 장소를 입력해주세요"
                  />
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    강연 주제
                  </label>
                  <Input
                    id="topic"
                    name="topic"
                    type="text"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="강연 주제를 입력해주세요"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audience"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    강연 대상
                  </label>
                  <Input
                    id="audience"
                    name="audience"
                    type="text"
                    value={formData.audience}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="강연 대상을 입력해주세요"
                  />
                </div>

                {/* 담당자 연락처 섹션 */}
                <div className="pt-4 border-t border-gray-200">
                  <h4
                    className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-4"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    담당자 연락처
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="contactName"
                        className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        성함 *
                      </label>
                      <Input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="홍길동"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactPhone"
                        className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        전화번호 *
                      </label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        required
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="010-1234-5678"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactEmail"
                        className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        이메일 *
                      </label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fee"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    강연료
                  </label>
                  <Input
                    id="fee"
                    name="fee"
                    type="text"
                    value={formData.fee}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="강연료를 입력해주세요 (예: 1,000,000원)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    기타 문의 내용
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[150px]"
                    placeholder="추가로 문의하실 내용이 있으시면 입력해주세요"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[var(--section-brand-primary)] text-white hover:bg-[#000070] transition-all duration-300 py-6 text-[16px] md:text-[18px]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  문의하기
                </Button>
              </form>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Contact Information Section */}
      <div id="contact">
        <SectionContainer backgroundColor="gray-50">
          <div className="w-full max-w-[1200px] mx-auto">
            {/* Contact Information Cards - 4 in a row on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
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
                    <p
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      02-2088-6584
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
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
                    <p
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      Contact@sapisland.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
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
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
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
          </div>
        </SectionContainer>
      </div>

      {/* Location Section */}
      <div id="location">
        <SectionContainer backgroundColor="gray-50">
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md">
                <h3
                  className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-6"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  찾아오시는길
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-1"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        주소
                      </p>
                      <p
                        className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px] leading-relaxed"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      >
                        (06168) 서울특별시 강남구 테헤란로 503,<br />
                        15층 1501호 (삼성동, 하이브로빌딩)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>

      <Footer />
    </div>
  );
}