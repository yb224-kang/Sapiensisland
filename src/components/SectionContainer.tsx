import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  backgroundColor?: "white" | "gray" | "light";
  className?: string;
  isHeroHeight?: boolean; // 히어로 섹션과 동일한 높이 적용
  alignItems?: "center" | "start"; // 정렬 방식 선택
  reducedTopPadding?: boolean; // 탭 네비게이션 이후 상단 패딩 축소
}

export default function SectionContainer({
  children,
  backgroundColor = "white",
  className = "",
  isHeroHeight = false,
  alignItems = "center",
  reducedTopPadding = false,
}: SectionContainerProps) {
  const bgColor = 
    backgroundColor === "white" 
      ? "bg-[var(--section-bg-white)]" 
      : backgroundColor === "light"
      ? "bg-[var(--section-bg-gray)]"
      : "bg-[var(--section-bg-gray)]";

  const heightClass = isHeroHeight 
    ? "h-[68vh]" 
    : "min-h-[var(--section-min-height-mobile)] md:min-h-[var(--section-min-height-tablet)] lg:min-h-[var(--section-min-height-desktop)]";

  const alignClass = alignItems === "start" ? "items-start" : "items-center";

  // 탭 네비게이션 이후 상단 패딩 축소
  const paddingClass = reducedTopPadding
    ? "px-[var(--section-padding-x-mobile)] pt-[1.5rem] pb-[var(--section-padding-y-mobile)] md:px-[var(--section-padding-x-tablet)] md:pt-[2rem] md:pb-[var(--section-padding-y-tablet)] lg:px-[var(--section-padding-x-desktop)] lg:pt-[2.5rem] lg:pb-[var(--section-padding-y-desktop)]"
    : "px-[var(--section-padding-x-mobile)] py-[var(--section-padding-y-mobile)] md:px-[var(--section-padding-x-tablet)] md:py-[var(--section-padding-y-tablet)] lg:px-[var(--section-padding-x-desktop)] lg:py-[var(--section-padding-y-desktop)]";

  return (
    <section className={`w-full ${bgColor} ${className}`}>
      <div
        className={`mx-auto ${paddingClass} ${heightClass} flex ${alignClass} justify-center`}
        style={{
          maxWidth: "var(--section-max-width)",
        }}
      >
        {children}
      </div>
    </section>
  );
}