import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import imgLogo from "figma:asset/80402d67250fde3194de9b2667521bd9c17949d7.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "회사소개", path: "/about" },
    { label: "서비스", path: "/business" },
    { label: "지혜전문가", path: "/profile" },
    { label: "콘텐츠", path: "/content" },
    { label: "기타문의", path: "/contact" }
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

  // 현재 경로가 메뉴 아이템과 일치하는지 확인
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-[rgba(255,255,255,0.7)] backdrop-blur-[18.25px] backdrop-filter h-[3.1875rem] md:h-[3.71875rem] lg:h-[4.25rem] sticky top-0 w-full z-50">
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
        <nav className="hidden lg:flex flex-row items-center gap-[64px] text-[1.0625rem] tracking-[-0.1px]">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className={`text-nowrap whitespace-pre cursor-pointer relative px-4 pt-3 pb-2 rounded-full transition-all duration-300 flex items-center justify-center text-[#000050] ${
                isActive(item.path) 
                  ? 'bg-[#000050]/8' 
                  : 'bg-transparent hover:bg-[#000050]/8'
              }`}
              style={{ 
                fontFamily: 'Pretendard Variable, sans-serif', 
                fontWeight: isActive(item.path) ? 700 : 500,
                lineHeight: 1
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden flex-row items-center gap-[32px] text-[0.95625rem] tracking-[-0.09px]">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className={`text-nowrap whitespace-pre cursor-pointer relative px-3.5 pt-3 pb-2 rounded-full transition-all duration-300 flex items-center justify-center text-[#000050] ${
                isActive(item.path) 
                  ? 'bg-[#000050]/8' 
                  : 'bg-transparent hover:bg-[#000050]/8'
              }`}
              style={{ 
                fontFamily: 'Pretendard Variable, sans-serif', 
                fontWeight: isActive(item.path) ? 700 : 500,
                lineHeight: 1
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.button>
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
          style={{ top: "51px" }}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`md:hidden fixed right-0 top-[51px] h-[calc(100vh-51px)] w-[280px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-6 text-[0.95625rem] text-[#161616] tracking-[-0.09px] leading-[1.3]">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className={`text-left py-3 border-b border-gray-200 transition-colors duration-300 cursor-pointer ${
                isActive(item.path) ? 'text-[#000050] font-bold border-[#000050]' : 'hover:text-[#000050]'
              }`}
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: isActive(item.path) ? 700 : 600 }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}