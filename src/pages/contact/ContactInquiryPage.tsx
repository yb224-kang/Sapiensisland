import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function ContactInquiryPage() {
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
    { id: "inquiry", label: "문의하기", path: "/inquiry" },
    { id: "location", label: "연락처 / 오시는길", path: "/location" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
    setFormData({ agency: "", client: "", location: "", topic: "", audience: "", contactName: "", contactPhone: "", contactEmail: "", fee: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageHeroLayout
      title="문의하기"
      description="사피엔스아일랜드와 함께 성장할 기회를 만들어보세요.<br class='hidden md:block' />언제든지 문의 주시면 신속하게 답변드리겠습니다."
      backgroundImage="https://www.openaccessgovernment.org/wp-content/uploads/2024/05/iStock-2092734289-e1715601027881.jpg"
      backgroundAlt="Communication and contact"
      tabs={tabs}
      basePath="/contact"
    >
      {/* Inquiry Form Section */}
      <SectionContainer backgroundColor="light" reducedTopPadding>
        <div className="w-full max-w-[97.5rem]">
          {/* Introduction */}
          <div className="text-center mb-4 md:mb-6">
            <p 
              className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              문의를 남겨주시면 빠르고 신속하게 답변드리겠습니다.
            </p>
          </div>

          <div className="max-w-[800px] mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Agency */}
              <div>
                <label
                  htmlFor="agency"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  요청사 (AGENCY) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="agency"
                  name="agency"
                  value={formData.agency}
                  onChange={handleChange}
                  required
                  placeholder="요청사 이름을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Client */}
              <div>
                <label
                  htmlFor="client"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  주최사 (고객사) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  placeholder="주최사 이름을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  강연 장소
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="강연 장소를 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  강연 주제
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="강연 주제를 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Audience */}
              <div>
                <label
                  htmlFor="audience"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  강연 대상
                </label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="강연 대상을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* 담당자 연락처 섹션 */}
              <div className="pt-6 border-t-2 border-gray-200">
                <h4
                  className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-5"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  담당자 연락처
                </h4>

                <div className="space-y-5">
                  {/* Contact Name */}
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                    >
                      성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="홍길동"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label
                      htmlFor="contactPhone"
                      className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                    >
                      전화번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label
                      htmlFor="contactEmail"
                      className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                    >
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    />
                  </div>
                </div>
              </div>

              {/* Fee */}
              <div>
                <label
                  htmlFor="fee"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  강연료 (부가세 별도 / 세금계산서 발행)
                </label>
                <input
                  type="text"
                  id="fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="강연료를 입력해주세요 (예: 1,000,000원)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[var(--section-text-primary)] text-[14px] md:text-[16px] mb-2"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  기타 문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="추가로 문의하실 내용이 있으시면 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all resize-none"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full max-w-[250px] bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white py-5 text-[16px] md:text-[18px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                >
                  문의 남기기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}