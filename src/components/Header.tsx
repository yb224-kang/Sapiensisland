import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import imgLogo from "figma:asset/80402d67250fde3194de9b2667521bd9c17949d7.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "회사소개", path: "/about" },
    { label: "서비스", path: "/business" },
    { label: "지혜전문가", path: "/profile" },
    { label: "콘텐츠", path: "/content" },
    { label: "문의하기", path: "/contact" }
  ];

  const handleMenuClick = (path: string) => {
    if (path === "#") {
      console.log(`Not yet implemented`);
    } else {
      // 상위메뉴 클릭 시 스크롤하지 않도록 state 전달
      navigate(path, { state: { scrollToContent: false } });
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-[rgba(255,255,255,0.7)] backdrop-blur-[18.25px] backdrop-filter h-[3.75rem] md:h-[4.375rem] lg:h-[5rem] sticky top-0 w-full z-50">
      <div className="absolute border-[#f0f0f0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_2px_10.1px_0px_rgba(0,0,0,0.08)]" />
      
      <div className="flex flex-row items-center justify-between size-full relative px-[1.25rem] sm:px-[2rem] md:px-[2.5rem] lg:px-[3.75rem]">
        {/* Logo */}
        <div className="h-[1.225rem] sm:h-[1.4rem] md:h-[1.575rem] lg:h-[1.75rem] w-[9.557rem] sm:w-[10.923rem] md:w-[12.288rem] lg:w-[13.653rem] relative shrink-0 cursor-pointer" onClick={handleLogoClick}>
          <img 
            alt="Sapiens island corp." 
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
            src={imgLogo}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-row items-center gap-[64px] text-[1.25rem] text-[#161616] tracking-[-0.1px] leading-[1.3]">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className="text-nowrap whitespace-pre hover:text-[var(--section-brand-primary)] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden flex-row items-center gap-[32px] text-[1.125rem] text-[#161616] tracking-[-0.09px] leading-[1.3]">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className="text-nowrap whitespace-pre hover:text-[var(--section-brand-primary)] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#161616] hover:bg-gray-100 rounded-lg transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
          style={{ top: "60px" }}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`md:hidden fixed right-0 top-[60px] h-[calc(100vh-60px)] w-[280px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-6 text-[1.125rem] text-[#161616] tracking-[-0.09px] leading-[1.3]">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className="text-left py-3 border-b border-gray-200 hover:text-[var(--section-brand-primary)] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}