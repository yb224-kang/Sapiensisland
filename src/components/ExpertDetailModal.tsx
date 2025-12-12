import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { X, GraduationCap, Lightbulb, Tv, Award, Sparkles } from "lucide-react";
import { Professor } from "../data/professors";

interface ExpertDetailModalProps {
  expert: Professor | null;
  isOpen: boolean;
  onClose: () => void;
  onBooking: (expertId: number) => void;
}

export default function ExpertDetailModal({ expert, isOpen, onClose, onBooking }: ExpertDetailModalProps) {
  if (!expert) return null;

  // Parse expertise into array
  const expertiseList = expert.expertise.split('\n').filter(item => item.trim());
  
  // Extract keywords from expertise
  const extractKeywords = (text: string) => {
    const keywords = new Set<string>();
    const patterns = [
      /\[([^\]]+)\]/g, // Extract text within brackets
    ];
    
    patterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        keywords.add(match[1]);
      }
    });
    
    return Array.from(keywords);
  };

  const keywords = extractKeywords(expert.expertise);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[67.5rem] max-h-[90vh] overflow-y-auto p-0 gap-0 bg-gradient-to-b from-white to-gray-50/50" aria-describedby={undefined}>
        {/* Accessible Title - Hidden visually but available for screen readers */}
        <DialogTitle className="sr-only">
          전문가 프로필 - {expert.name}
        </DialogTitle>

        {/* Header with Close Button - Enhanced */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-[1.5rem] md:px-[2rem] py-[1.25rem] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-[0.75rem]">
            <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-gradient-to-br from-[var(--section-brand-primary)] to-[var(--section-brand-primary)]/70 flex items-center justify-center">
              <Sparkles className="w-[1.25rem] h-[1.25rem] text-white" />
            </div>
            <h2
              className="text-[var(--section-text-primary)] text-[1.25rem] md:text-[1.5rem] m-0"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, lineHeight: 1 }}
            >
              전문가 프로필
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-[2.5rem] h-[2.5rem] rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:rotate-90 flex-shrink-0"
          >
            <X className="w-[1.25rem] h-[1.25rem] text-gray-500" />
          </button>
        </div>

        {/* Content - Enhanced with better spacing and visual hierarchy */}
        <div className="p-[1.5rem] md:p-[2.5rem] space-y-[2.5rem] relative z-0 pb-[7rem]">
          {/* Profile Header - Enhanced */}
          <div className="flex flex-col md:flex-row gap-[2rem] items-center md:items-start bg-gradient-to-br from-white to-[var(--section-brand-primary)]/5 rounded-2xl p-[2rem] border border-[var(--section-brand-primary)]/10 shadow-sm">
            {/* Profile Image - Enhanced with gradient ring */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--section-brand-primary)] to-purple-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-[10rem] h-[10rem] rounded-2xl overflow-hidden ring-4 ring-white shadow-2xl">
                <ImageWithFallback
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Info - Enhanced typography */}
            <div className="flex-1 text-center md:text-left">
              <h3
                className="text-[var(--section-text-primary)] text-[2rem] md:text-[2.25rem] mb-[0.75rem] bg-gradient-to-r from-[var(--section-text-primary)] to-[var(--section-brand-primary)] bg-clip-text"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
              >
                {expert.name}
              </h3>
              <p
                className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] mb-[1rem]"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
              >
                {expert.title}
              </p>
              <div
                className="inline-flex items-center px-[1.25rem] py-[0.5rem] bg-gradient-to-r from-[var(--section-brand-primary)] to-[var(--section-brand-primary)]/80 text-white rounded-full text-[0.875rem] md:text-[0.9375rem] shadow-lg"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                <Award className="w-[1rem] h-[1rem] mr-[0.5rem]" />
                {expert.field} 전문가
              </div>

              {/* Short Bio - Enhanced */}
              {expert.shortBio && (
                <p
                  className="mt-[1.5rem] text-[var(--section-text-secondary)] text-[0.9375rem] md:text-[1rem] leading-relaxed bg-white/80 rounded-xl p-[1rem] border border-gray-100"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                >
                  {expert.shortBio}
                </p>
              )}
            </div>
          </div>

          {/* Keywords/Tags - Enhanced with gradient cards */}
          {keywords.length > 0 && (
            <div className="bg-white rounded-2xl p-[1.75rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-[0.75rem] mb-[1.25rem]">
                <div className="w-[2.25rem] h-[2.25rem] rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <Award className="w-[1.125rem] h-[1.125rem] text-white" />
                </div>
                <h4
                  className="text-[var(--section-text-primary)] text-[1.125rem] md:text-[1.25rem]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  주요 키워드
                </h4>
              </div>
              <div className="flex flex-wrap gap-[0.625rem]">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-[1rem] py-[0.5rem] bg-gradient-to-r from-gray-50 to-gray-100 text-[var(--section-text-secondary)] rounded-lg text-[0.8125rem] md:text-[0.875rem] hover:from-[var(--section-brand-primary)]/10 hover:to-[var(--section-brand-primary)]/5 hover:text-[var(--section-brand-primary)] transition-all duration-200 border border-gray-200 hover:border-[var(--section-brand-primary)]/30 shadow-sm hover:shadow-md cursor-default"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education - Enhanced with gradient accent */}
          <div className="bg-white rounded-2xl p-[1.75rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-[0.75rem] mb-[1.25rem]">
              <div className="w-[2.25rem] h-[2.25rem] rounded-lg bg-gradient-to-br from-blue-400 to-[var(--section-brand-primary)] flex items-center justify-center shadow-md">
                <GraduationCap className="w-[1.125rem] h-[1.125rem] text-white" />
              </div>
              <h4
                className="text-[var(--section-text-primary)] text-[1.125rem] md:text-[1.25rem]"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
              >
                학력 및 경력
              </h4>
            </div>
            <div
              className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-[1.5rem] text-[var(--section-text-secondary)] text-[0.9375rem] md:text-[1rem] leading-relaxed whitespace-pre-line border border-gray-100/50"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              {expert.education}
            </div>
          </div>

          {/* Expertise - Enhanced with numbered cards */}
          <div className="bg-white rounded-2xl p-[1.75rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-[0.75rem] mb-[1.25rem]">
              <div className="w-[2.25rem] h-[2.25rem] rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md">
                <Lightbulb className="w-[1.125rem] h-[1.125rem] text-white" />
              </div>
              <h4
                className="text-[var(--section-text-primary)] text-[1.125rem] md:text-[1.25rem]"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
              >
                주요 강연 및 전문 분야
              </h4>
            </div>
            <div className="space-y-[0.875rem]">
              {expertiseList.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-[1rem] bg-gradient-to-r from-white to-gray-50/50 border border-gray-200/80 rounded-xl p-[1.25rem] hover:border-[var(--section-brand-primary)]/40 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex-shrink-0 w-[2rem] h-[2rem] rounded-lg bg-gradient-to-br from-[var(--section-brand-primary)] to-[var(--section-brand-primary)]/70 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <span
                      className="text-white text-[0.875rem]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <p
                    className="flex-1 text-[var(--section-text-secondary)] text-[0.875rem] md:text-[0.9375rem] leading-relaxed group-hover:text-[var(--section-text-primary)] transition-colors"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                  >
                    {item.replace(/^-\s*/, '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Appearances - Enhanced with gradient background */}
          {(expert.expertise.includes('KBS') || expert.expertise.includes('tvn') || expert.expertise.includes('JTBC')) && (
            <div className="bg-white rounded-2xl p-[1.75rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-[0.75rem] mb-[1.25rem]">
                <div className="w-[2.25rem] h-[2.25rem] rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-md">
                  <Tv className="w-[1.125rem] h-[1.125rem] text-white" />
                </div>
                <h4
                  className="text-[var(--section-text-primary)] text-[1.125rem] md:text-[1.25rem]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  미디어 출연
                </h4>
              </div>
              <div
                className="bg-gradient-to-r from-[var(--section-brand-primary)]/5 via-purple-500/5 to-pink-500/5 rounded-xl p-[1.5rem] text-[var(--section-text-secondary)] text-[0.875rem] md:text-[0.9375rem] leading-relaxed border border-[var(--section-brand-primary)]/10"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
              >
                {expert.expertise
                  .split('\n')
                  .filter(line => line.includes('KBS') || line.includes('tvn') || line.includes('JTBC'))
                  .map(line => line.replace(/^-\s*/, ''))
                  .join('\n')}
              </div>
            </div>
          )}
        </div>

        {/* Floating CTA Button - Always visible at bottom */}
        <div className="sticky bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-lg border-t border-gray-200/80 px-[1.5rem] md:px-[2.5rem] py-[1.25rem] shadow-2xl">
          <Button
            onClick={() => {
              onBooking(expert.id);
              onClose();
            }}
            className="w-full bg-gradient-to-r from-[var(--section-brand-primary)] to-[var(--section-brand-primary)]/80 hover:from-[var(--section-brand-primary)]/90 hover:to-[var(--section-brand-primary)]/70 text-white py-[1.5rem] text-[1.0625rem] md:text-[1.1875rem] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-[0.5rem]">
              <Sparkles className="w-[1.25rem] h-[1.25rem] group-hover:rotate-12 transition-transform" />
              이 전문가 예약하기
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}