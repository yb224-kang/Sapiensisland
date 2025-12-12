import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutVisionPage from "./pages/about/AboutVisionPage";
import AboutCompetencyPage from "./pages/about/AboutCompetencyPage";
import AboutHistoryPage from "./pages/about/AboutHistoryPage";
import BusinessOverviewPage from "./pages/business/BusinessOverviewPage";
import BusinessHatiPage from "./pages/business/BusinessHatiPage";
import BusinessInsiqPage from "./pages/business/BusinessInsiqPage";
import ProfilePage from "./pages/ProfilePage";
import ContentPRPage from "./pages/content/ContentPRPage";
import ContentYoutubePage from "./pages/content/ContentYoutubePage";
import ContactInquiryPage from "./pages/contact/ContactInquiryPage";
import ContactLocationPage from "./pages/contact/ContactLocationPage";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContactButton from "./components/FloatingContactButton";
import BookingModal from "./components/BookingModal";

export default function App() {
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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />

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
              element={
                <Navigate to="/contact/inquiry" replace />
              }
            />
            <Route
              path="/contact/inquiry"
              element={<ContactInquiryPage />}
            />
            <Route
              path="/contact/location"
              element={<ContactLocationPage />}
            />
          </Routes>
        </main>
        <FloatingContactButton
          onBooking={handleOpenBookingModal}
        />
      </div>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        preSelectedExpertId={preSelectedExpertId}
      />
    </Router>
  );
}