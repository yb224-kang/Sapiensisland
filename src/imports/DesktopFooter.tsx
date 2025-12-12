import imgComponent4 from "figma:asset/9d06fe9e037508f249665f1ae6b10f97cc02ce4f.png";

function Component2() {
  return (
    <div className="h-[50px] relative shrink-0 w-[229.905px]" data-name="Component 4">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComponent4} />
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-0 py-[4px] relative shrink-0 w-full">
      <p className="basis-0 font-['Pretendard_Variable:Regular',sans-serif] grow leading-[1.3] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white tracking-[-0.08px]">(주)사피엔스아일랜드</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-0 py-[4px] relative shrink-0 w-full">
      <p className="basis-0 font-['Pretendard_Variable:Regular',sans-serif] grow leading-[1.3] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white tracking-[-0.08px]">(06168) 서울특별시 강남구 테헤란로 503, 15층 1501호 (삼성동, 하이브로빌딩)</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Component2 />
      <Frame14 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center max-w-[84px] min-h-px min-w-[84px] relative shrink-0">
      <p className="basis-0 font-['Pretendard_Variable:Regular',sans-serif] grow leading-[1.3] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white tracking-[-0.08px]">대표: 송상윤</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center max-w-[227px] min-h-px min-w-[227px] relative shrink-0">
      <p className="basis-0 font-['Pretendard_Variable:Regular',sans-serif] grow leading-[1.3] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white tracking-[-0.08px]">사업자등록번호: 543-81-02692</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px opacity-0 relative shrink-0">
      <p className="font-['Pretendard_Variable:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.08px] whitespace-pre">대표전화: 2022-서울강남-02507호</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-0 py-[4px] relative shrink-0 w-full">
      <Frame1 />
      <div className="h-[16px] relative shrink-0 w-0">
        <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 16">
            <path d="M0.5 0V16" id="Vector 16" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <Frame2 />
      <div className="h-[16px] relative shrink-0 w-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M0 0V16" id="Vector 17" opacity="0" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame9 />
      <Frame8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center max-w-[185px] min-h-px min-w-[185px] relative shrink-0">
      <p className="font-['Pretendard_Variable:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.08px] whitespace-pre">대표전화 :02-2088-6584</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center px-0 py-[4px] relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame10 />
      <Frame7 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="내용">
      <Frame11 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Pretendard_Variable:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.08px] whitespace-pre">Copyright © by SAPIENS ISLAND CORP. All Rights Reserved.</p>
    </div>
  );
}

function Component1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[37px] items-start justify-center px-0 py-[4px] relative shrink-0 w-full" data-name="개인정보/이용약관">
      <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "1" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg] size-full">
          <div className="relative size-full">
            <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1200">
                <path d="M0.5 0V1200" id="Vector 15" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame />
    </div>
  );
}

function Frame12() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative shrink-0">
      <Component />
      <Component1 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-start flex flex-wrap gap-[10px] items-start relative shrink-0 w-[1200px]">
      <Frame12 />
    </div>
  );
}

export default function DesktopFooter() {
  return (
    <div className="bg-black relative size-full" data-name="desktop- footer">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[360px] py-[60px] relative size-full">
          <Frame13 />
        </div>
      </div>
    </div>
  );
}