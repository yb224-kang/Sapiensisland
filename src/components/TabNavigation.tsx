import { useNavigate, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
  path: string;
}

interface TabNavigationProps {
  tabs?: Tab[];
  basePath?: string;
}

export default function TabNavigation({ tabs = [], basePath = '' }: TabNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // tabs가 없거나 비어있으면 렌더링하지 않음
  if (!tabs || tabs.length === 0) {
    return null;
  }
  
  // 현재 경로에서 활성 탭 결정
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find(tab => currentPath === `${basePath}${tab.path}`);
    return activeTab?.id || tabs[0]?.id;
  };
  
  const currentTab = getActiveTab();
  
  const handleTabClick = (e: React.MouseEvent, tabPath: string) => {
    e.preventDefault();
    // 하위메뉴 탭 클릭 시 콘텐츠로 스크롤하도록 state 전달
    navigate(`${basePath}${tabPath}`, { state: { scrollToContent: true } });
  };

  return (
    <div className="w-full mt-16 md:mt-20 lg:mt-24 border-t border-white/30">
      <div className="w-full flex items-center justify-center py-5 md:py-6 lg:py-7">
        {/* Desktop & Tablet */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(e, tab.path)}
              className={`
                relative pb-1 transition-all duration-300
                ${currentTab === tab.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
                }
              `}
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              {tab.label}
              {/* 언더라인 */}
              <span 
                className={`
                  absolute bottom-0 left-0 w-full h-[3px] bg-white transition-all duration-300
                  ${currentTab === tab.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                `}
              />
            </button>
          ))}
        </div>

        {/* Mobile - Horizontal Scroll */}
        <div className="md:hidden flex items-center justify-center gap-6 overflow-x-auto scrollbar-hide w-full px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(e, tab.path)}
              className={`
                relative flex-shrink-0 pb-1 whitespace-nowrap transition-all duration-300
                ${currentTab === tab.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
                }
              `}
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              {tab.label}
              {/* 언더라인 */}
              <span 
                className={`
                  absolute bottom-0 left-0 w-full h-[2.5px] bg-white transition-all duration-300
                  ${currentTab === tab.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                `}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}