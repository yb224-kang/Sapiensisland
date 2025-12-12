import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 브라우저의 스크롤 복원 기능 비활성화
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 홈페이지일 경우에만 맨 위로 스크롤
    // 다른 페이지는 PageHeroLayout에서 자동으로 콘텐츠 섹션으로 스크롤
    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    } else {
      // 하위 페이지는 일단 맨 위로 이동 (PageHeroLayout이 콘텐츠로 스크롤함)
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
