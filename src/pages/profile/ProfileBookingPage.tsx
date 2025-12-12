import PageHeroLayout from "../../components/PageHeroLayout";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Calendar, Clock, MapPin, User, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Footer from "../../components/Footer";
import { professors } from "../../data/professors";

// Booking step types
type BookingStep = 'expert' | 'datetime' | 'location' | 'details' | 'confirm';

// Mock available times
const availableTimes = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

export default function ProfileBookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('expert');
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [locationType, setLocationType] = useState<'online' | 'offline'>('online');
  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [participants, setParticipants] = useState('');
  const [requests, setRequests] = useState('');

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedExpertData = professors.find(p => p.id === selectedExpert);

  const tabs = [
    { id: "professors", label: "전문가 프로필", path: "/experts" },
    { id: "booking", label: "예약문의", path: "/booking" }
  ];

  const steps = [
    { id: 'expert', label: '전문가 선택', icon: User },
    { id: 'datetime', label: '날짜 & 시간', icon: Calendar },
    { id: 'location', label: '장소 선택', icon: MapPin },
    { id: 'details', label: '상세 정보', icon: Clock },
    { id: 'confirm', label: '예약 확인', icon: CheckCircle2 }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'expert': return selectedExpert !== null;
      case 'datetime': return selectedDate !== null && selectedTime !== null;
      case 'location': return locationType === 'online' || (locationType === 'offline' && location.trim() !== '');
      case 'details': return purpose.trim() !== '' && participants.trim() !== '';
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canProceedToNext()) return;
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as BookingStep);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as BookingStep);
    }
  };

  const handleSubmit = () => {
    alert('예약이 완료되었습니다!\n\n실제 서비스에서는 이메일/SMS로 확인 메시지를 발송합니다.');
    // Reset form
    setCurrentStep('expert');
    setSelectedExpert(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setLocationType('online');
    setLocation('');
    setPurpose('');
    setParticipants('');
    setRequests('');
  };

  return (
    <PageHeroLayout
      title="지혜전문가"
      description="각 분야 최고의 전문가들이 여러분의 성장을 함께 합니다.<br class='hidden md:block' />검증된 전문가들의 깊이 있는 인사이트를 경험하세요."
      backgroundImage="https://png.pngtree.com/thumb_back/fw800/background/20251112/pngtree-abstract-network-connections-minimalist-white-background-with-space-for-text-image_19922004.webp"
      backgroundAlt="Professional mentors and experts"
      tabs={tabs}
      basePath="/profile"
    >
      {/* Booking Section */}
      <section className="w-full bg-white py-16 md:py-24 lg:py-28 px-8 md:px-16">
        <div className="w-full max-w-[1000px] mx-auto">
          
          {/* Introduction Text */}
          <div className="text-center mb-12 md:mb-16">
            <h2 
              className="text-[var(--section-text-primary)] text-[20px] md:text-[24px] lg:text-[28px] mb-3"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
            >
              각 분야 최고의 전문가들의 인사이트를 현장에서 들어보세요
            </h2>
            <p 
              className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
            >
              원하시는 전문가와 일정을 선택하고 예약을 진행하실 수 있습니다
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12 px-6 md:px-10">
            <div className="flex items-center justify-between relative">
              {/* Progress Bar Background */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />
              
              {/* Progress Bar Fill */}
              <div 
                className="absolute top-6 left-0 h-0.5 bg-[var(--section-brand-primary)] transition-all duration-500"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-[var(--section-brand-primary)] text-white' 
                          : isCurrent 
                          ? 'bg-[var(--section-brand-primary)] text-white ring-4 ring-[var(--section-brand-primary)]/20' 
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span 
                      className={`text-[11px] md:text-[12px] absolute top-14 whitespace-nowrap ${
                        isCurrent ? 'text-[var(--section-brand-primary)]' : 'text-gray-500'
                      }`}
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-10 min-h-[500px]"
            >
              {/* Step 1: Expert Selection */}
              {currentStep === 'expert' && (
                <div>
                  <h2 
                    className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-6"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    전문가를 선택해주세요
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professors.map((professor) => (
                      <motion.div
                        key={professor.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedExpert(professor.id)}
                        className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                          selectedExpert === professor.id
                            ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                            : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-gray-100">
                            <ImageWithFallback
                              src={professor.image}
                              alt={professor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3
                            className="text-[var(--section-text-primary)] text-[16px] md:text-[18px] mb-1"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                          >
                            {professor.name}
                          </h3>
                          <p
                            className="text-[var(--section-text-secondary)] text-[12px] md:text-[13px] mb-2"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            {professor.title}
                          </p>
                          <span
                            className="inline-block px-3 py-1 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full text-[11px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            {professor.field}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 'datetime' && (
                <div>
                  <h2 
                    className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    날짜와 시간을 선택해주세요
                  </h2>
                  <p 
                    className="text-[var(--section-text-secondary)] text-[14px] md:text-[15px] mb-8"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                  >
                    {selectedExpertData?.name} 전문가와의 상담 일정
                  </p>

                  {/* Calendar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="text-[var(--section-text-primary)] text-[18px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                      >
                        {today.getFullYear()}년 {today.getMonth() + 1}월
                      </h3>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                        <div
                          key={day}
                          className="text-center py-2 text-[var(--section-text-secondary)] text-[13px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} />;
                        }

                        const isPast = day < today;
                        const isSelected = selectedDate?.getTime() === day.getTime();
                        const isAvailable = !isPast && Math.random() > 0.3; // Mock availability

                        return (
                          <motion.button
                            key={day.toISOString()}
                            whileHover={isAvailable ? { scale: 1.1 } : {}}
                            onClick={() => isAvailable && setSelectedDate(day)}
                            disabled={!isAvailable}
                            className={`aspect-square rounded-lg flex items-center justify-center text-[14px] transition-all duration-200 ${
                              isSelected
                                ? 'bg-[var(--section-brand-primary)] text-white shadow-lg'
                                : isAvailable
                                ? 'bg-gray-50 hover:bg-[var(--section-brand-primary)]/10 text-[var(--section-text-primary)]'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            {day.getDate()}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3
                        className="text-[var(--section-text-primary)] text-[18px] mb-4"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                      >
                        시간 선택
                      </h3>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                        {availableTimes.map((time) => {
                          const isSelected = selectedTime === time;
                          const isAvailable = Math.random() > 0.2; // Mock availability

                          return (
                            <motion.button
                              key={time}
                              whileHover={isAvailable ? { scale: 1.05 } : {}}
                              onClick={() => isAvailable && setSelectedTime(time)}
                              disabled={!isAvailable}
                              className={`py-3 px-4 rounded-lg text-[14px] transition-all duration-200 ${
                                isSelected
                                  ? 'bg-[var(--section-brand-primary)] text-white shadow-lg'
                                  : isAvailable
                                  ? 'bg-gray-50 hover:bg-[var(--section-brand-primary)]/10 text-[var(--section-text-primary)]'
                                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                              }`}
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                            >
                              {time}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 3: Location Selection */}
              {currentStep === 'location' && (
                <div>
                  <h2 
                    className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-6"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    상담 장소를 선택해주세요
                  </h2>

                  {/* Location Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setLocationType('online')}
                      className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                        locationType === 'online'
                          ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                          : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          locationType === 'online' ? 'bg-[var(--section-brand-primary)]' : 'bg-gray-100'
                        }`}>
                          <Calendar className={`w-8 h-8 ${locationType === 'online' ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <h3
                          className="text-[var(--section-text-primary)] text-[18px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          온라인 상담
                        </h3>
                        <p
                          className="text-[var(--section-text-secondary)] text-[13px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          Zoom, Google Meet 등을 통한<br />온라인 화상 상담
                        </p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setLocationType('offline')}
                      className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                        locationType === 'offline'
                          ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                          : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          locationType === 'offline' ? 'bg-[var(--section-brand-primary)]' : 'bg-gray-100'
                        }`}>
                          <MapPin className={`w-8 h-8 ${locationType === 'offline' ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <h3
                          className="text-[var(--section-text-primary)] text-[18px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          오프라인 상담
                        </h3>
                        <p
                          className="text-[var(--section-text-secondary)] text-[13px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          전문가 사무실 또는<br />지정된 장소에서 대면 상담
                        </p>
                      </div>
                    </motion.button>
                  </div>

                  {/* Location Input for Offline */}
                  {locationType === 'offline' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <label
                        className="block text-[var(--section-text-primary)] text-[15px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        상담 장소 주소
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="예: 서울시 강남구 테헤란로 123"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors text-[14px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                      />
                      <p
                        className="mt-2 text-[var(--section-text-secondary)] text-[12px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      >
                        💡 전문가와 약속한 장소를 입력해주세요
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 4: Details */}
              {currentStep === 'details' && (
                <div>
                  <h2 
                    className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-6"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    상담 상세 정보를 입력해주세요
                  </h2>

                  <div className="space-y-6">
                    {/* Purpose */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[15px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        상담 목적 *
                      </label>
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="상담을 원하시는 주제나 목적을 간단히 설명해주세요"
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors resize-none text-[14px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                      />
                    </div>

                    {/* Participants */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[15px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        참여 인원 *
                      </label>
                      <input
                        type="text"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        placeholder="예: 5명 (팀장 1명, 팀원 4명)"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors text-[14px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                      />
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[15px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        특별 요청사항 (선택)
                      </label>
                      <textarea
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        placeholder="추가로 전달하고 싶은 내용이 있다면 작성해주세요"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors resize-none text-[14px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 'confirm' && (
                <div>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--section-brand-primary)]/10 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[var(--section-brand-primary)]" />
                    </div>
                    <h2 
                      className="text-[var(--section-text-primary)] text-[24px] md:text-[28px] mb-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                    >
                      예약 내용을 확인해주세요
                    </h2>
                    <p
                      className="text-[var(--section-text-secondary)] text-[14px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                    >
                      아래 정보가 정확한지 확인 후 예약을 완료해주세요
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                    {/* Expert Info */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[var(--section-brand-primary)]">
                        <ImageWithFallback
                          src={selectedExpertData?.image || ''}
                          alt={selectedExpertData?.name || ''}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3
                          className="text-[var(--section-text-primary)] text-[18px] mb-1"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          {selectedExpertData?.name}
                        </h3>
                        <p
                          className="text-[var(--section-text-secondary)] text-[13px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {selectedExpertData?.field} · {selectedExpertData?.title}
                        </p>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[var(--section-brand-primary)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p
                            className="text-[var(--section-text-secondary)] text-[12px] mb-1"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            날짜 및 시간
                          </p>
                          <p
                            className="text-[var(--section-text-primary)] text-[15px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            {selectedDate?.toLocaleDateString('ko-KR', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              weekday: 'short'
                            })} {selectedTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[var(--section-brand-primary)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p
                            className="text-[var(--section-text-secondary)] text-[12px] mb-1"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            장소
                          </p>
                          <p
                            className="text-[var(--section-text-primary)] text-[15px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            {locationType === 'online' ? '온라인 (Zoom/Google Meet)' : location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-[var(--section-brand-primary)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p
                            className="text-[var(--section-text-secondary)] text-[12px] mb-1"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            참여 인원
                          </p>
                          <p
                            className="text-[var(--section-text-primary)] text-[15px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            {participants}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[var(--section-brand-primary)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p
                            className="text-[var(--section-text-secondary)] text-[12px] mb-1"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            상담 목적
                          </p>
                          <p
                            className="text-[var(--section-text-primary)] text-[15px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            {purpose}
                          </p>
                        </div>
                      </div>

                      {requests && (
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 flex items-center justify-center text-[var(--section-brand-primary)] mt-0.5 flex-shrink-0">
                            💡
                          </div>
                          <div>
                            <p
                              className="text-[var(--section-text-secondary)] text-[12px] mb-1"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                            >
                              특별 요청사항
                            </p>
                            <p
                              className="text-[var(--section-text-primary)] text-[15px]"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                            >
                              {requests}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p
                      className="text-[var(--section-text-primary)] text-[13px] leading-relaxed"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                    >
                      📧 예약 확정 후 입력하신 이메일로 확인 메시지가 발송됩니다.<br />
                      📱 상담 하루 전에 리마인더 알림을 보내드립니다.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              variant="outline"
              className="px-6 py-3 text-[15px] rounded-full disabled:opacity-50"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전
            </Button>

            {currentStep === 'confirm' ? (
              <Button
                onClick={handleSubmit}
                className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-8 py-3 text-[15px] rounded-full shadow-lg"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                예약 완료하기
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-6 py-3 text-[15px] rounded-full disabled:opacity-50"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                다음
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </PageHeroLayout>
  );
}