import svgPaths from "./svg-yl8dj76h2i";
import img1 from "figma:asset/903161bd84a82dec518524f3d9a557f25b8dd100.png";
import img2 from "figma:asset/3c989c64a5986d228893afbc9e58eab2fac0d8cf.png";
import imgChangeColorHere from "figma:asset/08acafdd38c0f549544251b6fee4bec3d83f5aea.png";
import imgDisplayFrame from "figma:asset/80a14c9f52232ff860d2014c687d3e473bb452ba.png";
import { img } from "./svg-7x8oe";

function Screen() {
  return (
    <div className="absolute contents left-[-309.95px] top-[0.48px]" data-name="Screen">
      <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute h-[694.07px] left-[202.93px] mask-position-[-202.926px,_-512.875px_-50.085px,_-49.61px] mask-size-[797.543px_797.543px,_1417.43px_797.306px] top-[50.09px] w-[414.363px]" data-name="👈" style={{ maskImage: `url('${img}'), url('${img1}')` }}>
        <img alt="" className="block max-w-none size-full" height="694.07" src={img2} width="414.363" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[-309.95px] top-[0.12px]" data-name="Group">
      <div className="absolute h-[706.722px] left-[201.98px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-201.984px_-45.078px] mask-size-[797.543px_797.543px] top-[45.08px] w-[413.418px]" data-name="fix" style={{ maskImage: `url('${img}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 414 707">
          <path d={svgPaths.p3aeff6f0} fill="var(--fill-0, black)" id="fix" />
        </svg>
      </div>
      <div className="absolute h-[797.307px] left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[309.949px_-0.12px] mask-size-[797.543px_797.543px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1417.43px]" data-name="🎨 change color here" style={{ maskImage: `url('${img}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgChangeColorHere} />
      </div>
      <div className="absolute h-[797.307px] left-[-309.95px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[309.949px_-0.473px] mask-size-[797.543px_797.543px] top-[0.47px] w-[1417.43px]" data-name="display-frame" style={{ maskImage: `url('${img}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDisplayFrame} />
      </div>
      <Screen />
    </div>
  );
}

export default function IPhone() {
  return (
    <div className="relative size-full" data-name="iPhone">
      <Group />
    </div>
  );
}