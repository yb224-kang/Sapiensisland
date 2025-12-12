import svgPaths from "./svg-ygb0ehl6pd";

function Component() {
  return (
    <div className="h-[52px] relative shrink-0 w-[180px]" data-name="Component 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 52">
        <g id="Group">
          <path d={svgPaths.p21f6fd00} fill="var(--fill-0, black)" id="BG" />
          <path d={svgPaths.p2ddb7a70} fill="var(--fill-0, #A6A6A6)" id="Border" />
          <g id="Icon">
            <g id="Vector">
              <path d={svgPaths.p7ae7600} fill="white" />
              <path d={svgPaths.p3f237480} fill="white" />
            </g>
          </g>
          <g id="App Store">
            <path d={svgPaths.p1de14800} fill="var(--fill-0, white)" id="A" />
            <path d={svgPaths.p3d433a00} fill="var(--fill-0, white)" id="p" />
            <path d={svgPaths.p41efd80} fill="var(--fill-0, white)" id="p_2" />
            <path d={svgPaths.p38b1fb80} fill="var(--fill-0, white)" id="S" />
            <path d={svgPaths.p37451c80} fill="var(--fill-0, white)" id="t" />
            <path d={svgPaths.p3a946a00} fill="var(--fill-0, white)" id="o" />
            <path d={svgPaths.p9935900} fill="var(--fill-0, white)" id="r" />
            <path d={svgPaths.p27b0be00} fill="var(--fill-0, white)" id="e" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="h-[41.6px] relative w-[144px]" data-name="Component 3">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144 42">
        <g id="Group">
          <path d={svgPaths.pe39b300} fill="var(--fill-0, black)" id="BG" />
          <path d={svgPaths.p28bca700} fill="var(--fill-0, #A6A6A6)" id="Border" />
          <g id="Icon">
            <path d={svgPaths.p282e1200} fill="url(#paint0_linear_8_404)" id="Vector" />
            <path d={svgPaths.pef7300} fill="url(#paint1_linear_8_404)" id="Vector_2" />
            <path d={svgPaths.p3fa9a930} fill="url(#paint2_linear_8_404)" id="Vector_3" />
            <path d={svgPaths.p228b0900} fill="url(#paint3_linear_8_404)" id="Vector_4" />
          </g>
          <g id="Google Play">
            <path d={svgPaths.pefcc1c0} fill="var(--fill-0, white)" id="Google Play_2" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_8_404" x1="23.253" x2="5.80491" y1="9.05809" y2="26.9536">
            <stop stopColor="#00A0FF" />
            <stop offset="0.0066" stopColor="#00A1FF" />
            <stop offset="0.2601" stopColor="#00BEFF" />
            <stop offset="0.5122" stopColor="#00D2FF" />
            <stop offset="0.7604" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_8_404" x1="36.09" x2="10.28" y1="20.8015" y2="20.8015">
            <stop stopColor="#FFE000" />
            <stop offset="0.4087" stopColor="#FFBD00" />
            <stop offset="0.7754" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_8_404" x1="26.4821" x2="2.82108" y1="23.1879" y2="47.4557">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_8_404" x1="7.78378" x2="18.3495" y1="0.183242" y2="11.0198">
            <stop stopColor="#32A071" />
            <stop offset="0.0685" stopColor="#2DA771" />
            <stop offset="0.4762" stopColor="#15CF74" />
            <stop offset="0.8009" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Download() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative size-full" data-name="download">
      <Component />
      <div className="flex h-[52px] items-center justify-center relative shrink-0 w-[180px]" style={{ "--transform-inner-width": "144", "--transform-inner-height": "41.59375" } as React.CSSProperties}>
        <div className="flex-none scale-x-[125%] scale-y-[-125%]">
          <Component1 />
        </div>
      </div>
    </div>
  );
}