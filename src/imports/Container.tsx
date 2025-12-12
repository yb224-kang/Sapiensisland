import svgPaths from "./svg-cqwl1a31ju";

function Logo() {
  return (
    <div className="h-[60px] relative shrink-0 w-[704px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 704 60">
        <g id="Logo">
          <path d={svgPaths.pb4ceb00} fill="var(--fill-0, #0F33FF)" id="Vector" />
          <path d={svgPaths.pc7a7900} fill="var(--fill-0, #0F33FF)" id="Vector_2" />
          <path d={svgPaths.p310580f0} fill="var(--fill-0, #0F33FF)" id="Vector_3" />
          <path d={svgPaths.p9f288f0} fill="var(--fill-0, #0F33FF)" id="Vector_4" />
          <path d={svgPaths.p37eda200} fill="var(--fill-0, #0F33FF)" id="Vector_5" />
          <path d={svgPaths.p130ac500} fill="var(--fill-0, #0F33FF)" id="Vector_6" />
          <path d={svgPaths.p264b1100} fill="var(--fill-0, #0F33FF)" id="Vector_7" />
          <path d={svgPaths.p8e94240} fill="var(--fill-0, #0F33FF)" id="Vector_8" />
          <path d={svgPaths.p2f110e00} fill="var(--fill-0, #0F33FF)" id="Vector_9" />
          <path d={svgPaths.p268a0900} fill="var(--fill-0, #0F33FF)" id="Vector_10" />
          <path d={svgPaths.pc660970} fill="var(--fill-0, #0F33FF)" id="Vector_11" />
          <path d={svgPaths.p34e79a00} fill="var(--fill-0, #0F33FF)" id="Vector_12" />
          <path d={svgPaths.pccb1280} fill="var(--fill-0, #0F33FF)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[101px] top-[112px]" data-name="Container">
      <div className="flex flex-col font-['Pretendard:ExtraBold',sans-serif] justify-center leading-[0] not-italic opacity-0 relative shrink-0 text-[80px] text-black text-nowrap">
        <p className="leading-[1.3] whitespace-pre">TEXTTEXT,</p>
      </div>
      <Logo />
    </div>
  );
}

export default function Container1() {
  return (
    <div className="relative size-full" data-name="Container">
      <div className="absolute flex flex-col font-['Pretendard:ExtraBold',sans-serif] justify-center leading-[0] left-0 not-italic text-[80px] text-black top-[52px] translate-y-[-50%] w-[1257px]">
        <p className="leading-[1.3]">Spreading The Insights,</p>
      </div>
      <Container />
    </div>
  );
}