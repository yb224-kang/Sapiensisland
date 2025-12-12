import imgComponent4 from "figma:asset/518df2b38a9893e7bd2becbd5fbcf6fb526a1b40.png";

function Component() {
  return (
    <div className="h-[40px] relative shrink-0 w-[312.076px]" data-name="Component 4">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgComponent4} />
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 box-border content-center flex flex-wrap font-['Pretendard_Variable:SemiBold',sans-serif] gap-[64px] grow h-[86px] items-center justify-center leading-[1.3] min-h-px min-w-px not-italic px-0 py-[24px] relative shrink-0 text-[#161616] text-[20px] text-right tracking-[-0.1px]" data-name="Navigation">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0">ABOUT</p>
      <p className="relative shrink-0 text-nowrap whitespace-pre">PROFILES</p>
      <p className="relative shrink-0 text-nowrap whitespace-pre">CONTACT US</p>
      <p className="relative shrink-0 text-nowrap whitespace-pre">YOUTUBE</p>
    </div>
  );
}

function DesktopGnb() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[80px] shrink-0 sticky top-0 w-full" data-name="desktop-gnb">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_2px_10.1px_0px_rgba(0,0,0,0.08)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-center flex flex-wrap gap-[10px] h-[80px] items-center justify-center px-[60px] py-0 relative w-full">
          <Component />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

export default function Gnb() {
  return (
    <div className="backdrop-blur-[18.25px] backdrop-filter content-stretch flex flex-col items-start relative size-full" data-name="gnb">
      <DesktopGnb />
    </div>
  );
}