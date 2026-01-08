import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { AppProviders } from "./providers/AppProviders";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutVisionPage from "./pages/about/AboutVisionPage";
import AboutCompetencyPage from "./pages/about/AboutCompetencyPage";
import AboutHistoryPage from "./pages/about/AboutHistoryPage";
import AboutLocationPage from "./pages/about/AboutLocationPage";
import BusinessOverviewPage from "./pages/business/BusinessOverviewPage";
import BusinessHatiPage from "./pages/business/BusinessHatiPage";
import BusinessInsiqPage from "./pages/business/BusinessInsiqPage";
import ProfilePage from "./pages/ProfilePage";
import ContentPRPage from "./pages/content/ContentPRPage";
import ContentYoutubePage from "./pages/content/ContentYoutubePage";
import ContactInquiryPage from "./pages/contact/ContactInquiryPage";
import AdminPage from "./pages/AdminPage";
import ExpertSettlementPage from "./pages/ExpertSettlementPage";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContactButton from "./components/FloatingContactButton";
import BookingModal from "./components/BookingModal";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [isBookingModalOpen, setIsBookingModalOpen] =
    useState(false);
  const [preSelectedExpertId, setPreSelectedExpertId] =
    useState<number | null>(null);

  const handleOpenBookingModal = (expertId?: number | null) => {
    setPreSelectedExpertId(expertId || null);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreSelectedExpertId(null);
  };

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* Header - 관리자 페이지에서는 숨김 */}
        {!isAdminPage && <Header />}

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage onOpenBookingModal={handleOpenBookingModal} />} />

            {/* About Routes */}
            <Route
              path="/about"
              element={<Navigate to="/about/vision" replace />}
            />
            <Route
              path="/about/vision"
              element={<AboutVisionPage />}
            />
            <Route
              path="/about/competency"
              element={<AboutCompetencyPage />}
            />
            <Route
              path="/about/history"
              element={<AboutHistoryPage />}
            />
            <Route
              path="/about/location"
              element={<AboutLocationPage />}
            />

            {/* Business Routes */}
            <Route
              path="/business"
              element={
                <Navigate to="/business/overview" replace />
              }
            />
            <Route
              path="/business/overview"
              element={<BusinessOverviewPage />}
            />
            <Route
              path="/business/hati"
              element={<BusinessHatiPage />}
            />
            <Route
              path="/business/insiq"
              element={<BusinessInsiqPage />}
            />

            {/* Profile Routes */}
            <Route
              path="/profile"
              element={
                <ProfilePage
                  onOpenBookingModal={handleOpenBookingModal}
                />
              }
            />
            <Route
              path="/profile/experts"
              element={
                <ProfilePage
                  onOpenBookingModal={handleOpenBookingModal}
                />
              }
            />
            <Route
              path="/profile/advisory"
              element={<Navigate to="/profile" replace />}
            />
            <Route
              path="/profile/partners"
              element={<Navigate to="/profile" replace />}
            />

            {/* Content Routes */}
            <Route
              path="/content"
              element={
                <Navigate to="/content/youtube" replace />
              }
            />
            <Route
              path="/content/pr"
              element={<ContentPRPage />}
            />
            <Route
              path="/content/youtube"
              element={<ContentYoutubePage />}
            />

            {/* Contact Routes */}
            <Route
              path="/contact"
              element={<ContactInquiryPage />}
            />
            <Route
              path="/contact/inquiry"
              element={<ContactInquiryPage />}
            />
            <Route
              path="/contact/location"
              element={<Navigate to="/about/location" replace />}
            />

            {/* Admin Route */}
            <Route
              path="/admin"
              element={<AdminPage />}
            />
            
            {/* Expert Settlement Page - 전문가 정산 현황 공유 페이지 */}
            <Route
              path="/admin/expert-settlement/:expertId"
              element={<ExpertSettlementPage />}
            />
          </Routes>
        </main>

        {/* Floating Button - 관리자 페이지에서는 숨김 */}
        {!isAdminPage && (
          <FloatingContactButton
            onBooking={handleOpenBookingModal}
          />
        )}
      </div>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        preSelectedExpertId={preSelectedExpertId}
      />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </Router>
  );
}