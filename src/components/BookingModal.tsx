import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock, MapPin, User, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { professors } from "../data/professors";
import { useState, useEffect } from "react";

// Booking step types
type BookingStep = 'expert' | 'datetime' | 'location' | 'details' | 'confirm';

// Mock available times
const availableTimes = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedExpertId?: number | null;
}

export default function BookingModal({ isOpen, onClose, preSelectedExpertId }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('expert');
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [locationType, setLocationType] = useState<'online' | 'offline'>('online');
  const [location, setLocation] = useState('');
  
  // Form data for inquiry
  const [formData, setFormData] = useState({
    agency: '',
    client: '',
    topic: '',
    audience: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    fee: '',
    message: ''
  });

  // Handle pre-selected expert
  useEffect(() => {
    if (preSelectedExpertId) {
      setSelectedExpert(preSelectedExpertId);
      setCurrentStep('datetime');
    }
  }, [preSelectedExpertId]);

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
      case 'details': return formData.agency.trim() !== '' && formData.client.trim() !== '' && formData.contactName.trim() !== '' && formData.contactPhone.trim() !== '' && formData.contactEmail.trim() !== '';
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
    // Reset and close
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep('expert');
    setSelectedExpert(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setLocationType('online');
    setLocation('');
    setFormData({
      agency: '',
      client: '',
      topic: '',
      audience: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      fee: '',
      message: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[75rem] max-h-[90vh] overflow-y-auto p-0 gap-0" aria-describedby={undefined}>
        {/* Accessible Title - Hidden visually but available for screen readers */}
        <DialogTitle className="sr-only">
          전문가 예약하기 {selectedExpertData ? `- ${selectedExpertData.name}` : ''}
        </DialogTitle>

        {/* Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2
            className="text-[var(--section-text-primary)] m-0"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: 1.2 }}
          >
            전문가 예약하기
          </h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-10 relative z-0">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative max-w-[800px] mx-auto">
              {/* Progress Bar Background */}
              <div className="absolute top-[28px] left-[56px] right-[56px] h-[2px] bg-gray-200" />
              
              {/* Progress Bar Fill */}
              <div 
                className="absolute top-[28px] left-[56px] h-[2px] bg-[var(--section-brand-primary)] transition-all duration-500"
                style={{ 
                  width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                  maxWidth: 'calc(100% - 112px)'
                }}
              />

              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center gap-3 z-10">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-[var(--section-brand-primary)] text-white' 
                          : isCurrent 
                          ? 'bg-[var(--section-brand-primary)] text-white ring-4 ring-[var(--section-brand-primary)]/20' 
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span 
                      className={`text-[14px] absolute top-[72px] whitespace-nowrap ${
                        isCurrent ? 'text-[var(--section-brand-primary)]' : 'text-gray-500'
                      }`}
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: isCurrent ? 700 : 600 }}
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
              className="min-h-[400px]"
            >
              {/* Step 1: Expert Selection */}
              {currentStep === 'expert' && (
                <div>
                  <h3 
                    className="text-[var(--section-text-primary)] text-[20px] md:text-[24px] mb-6 mt-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    전문가를 선택해주세요
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {professors.map((professor) => (
                      <motion.div
                        key={professor.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedExpert(professor.id)}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                          selectedExpert === professor.id
                            ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                            : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-gray-100">
                            <ImageWithFallback
                              src={professor.image}
                              alt={professor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4
                            className="text-[var(--section-text-primary)] text-[14px] mb-1"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                          >
                            {professor.name}
                          </h4>
                          <p
                            className="text-[var(--section-text-secondary)] text-[11px] mb-2 line-clamp-2"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                          >
                            {professor.title}
                          </p>
                          <span
                            className="inline-block px-2 py-0.5 bg-[var(--section-brand-primary)]/10 text-[var(--section-brand-primary)] rounded-full text-[10px]"
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
                  <h3 
                    className="text-[var(--section-text-primary)] text-[20px] md:text-[24px] mb-2 mt-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    날짜와 시간을 선택해주세요
                  </h3>
                  <p 
                    className="text-[var(--section-text-secondary)] text-[14px] mb-6"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                  >
                    {selectedExpertData?.name} 전문가와의 상담 일정
                  </p>

                  {/* Calendar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className="text-[var(--section-text-primary)] text-[16px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                      >
                        {today.getFullYear()}년 {today.getMonth() + 1}월
                      </h4>
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
                          className="text-center py-2 text-[var(--section-text-secondary)] text-[12px]"
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
                            className={`aspect-square rounded-lg flex items-center justify-center text-[13px] transition-all duration-200 ${
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
                      <h4
                        className="text-[var(--section-text-primary)] text-[16px] mb-3"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                      >
                        시간 선택
                      </h4>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {availableTimes.map((time) => {
                          const isSelected = selectedTime === time;
                          const isAvailable = Math.random() > 0.2; // Mock availability

                          return (
                            <motion.button
                              key={time}
                              whileHover={isAvailable ? { scale: 1.05 } : {}}
                              onClick={() => isAvailable && setSelectedTime(time)}
                              disabled={!isAvailable}
                              className={`py-2 px-3 rounded-lg text-[13px] transition-all duration-200 ${
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
                  <h3 
                    className="text-[var(--section-text-primary)] text-[20px] md:text-[24px] mb-6 mt-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    상담 장소를 선택해주세요
                  </h3>

                  {/* Location Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setLocationType('online')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        locationType === 'online'
                          ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                          : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          locationType === 'online' ? 'bg-[var(--section-brand-primary)]' : 'bg-gray-100'
                        }`}>
                          <Calendar className={`w-7 h-7 ${locationType === 'online' ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <h4
                          className="text-[var(--section-text-primary)] text-[16px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          온라인 상담
                        </h4>
                        <p
                          className="text-[var(--section-text-secondary)] text-[12px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          Zoom, Google Meet 등을 통한<br />온라인 화상 상담
                        </p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setLocationType('offline')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        locationType === 'offline'
                          ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                          : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          locationType === 'offline' ? 'bg-[var(--section-brand-primary)]' : 'bg-gray-100'
                        }`}>
                          <MapPin className={`w-7 h-7 ${locationType === 'offline' ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <h4
                          className="text-[var(--section-text-primary)] text-[16px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          오프라인 상담
                        </h4>
                        <p
                          className="text-[var(--section-text-secondary)] text-[12px]"
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
                    >
                      <label
                        className="block text-[var(--section-text-primary)] text-[14px] mb-2"
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
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 4: Details */}
              {currentStep === 'details' && (
                <div>
                  <h3 
                    className="text-[var(--section-text-primary)] text-[20px] md:text-[24px] mb-2 mt-2"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                  >
                    문의하기
                  </h3>
                  <p
                    className="text-[var(--section-text-secondary)] text-[14px] mb-6"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                  >
                    문의를 남겨주시면 빠르고 신속하게 답변드리겠습니다.
                  </p>

                  <div className="space-y-5">
                    {/* Agency */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        요청사 (AGENCY) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.agency}
                        onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                        required
                        placeholder="요청사 이름을 입력해주세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      />
                    </div>

                    {/* Client */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        주최사 (고객사) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        required
                        placeholder="주최사 이름을 입력해주세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      />
                    </div>

                    {/* Topic */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        강연 주제
                      </label>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        placeholder="강연 주제를 입력해주세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      />
                    </div>

                    {/* Audience */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        강연 대상
                      </label>
                      <input
                        type="text"
                        value={formData.audience}
                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                        placeholder="강연 대상을 입력해주세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      />
                    </div>

                    {/* 담당자 연락처 섹션 */}
                    <div className="pt-4 border-t-2 border-gray-200">
                      <h4
                        className="text-[var(--section-text-primary)] text-[15px] mb-4"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                      >
                        담당자 연락처
                      </h4>

                      <div className="space-y-4">
                        {/* Contact Name */}
                        <div>
                          <label
                            className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            성함 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            required
                            placeholder="홍길동"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                          />
                        </div>

                        {/* Contact Phone */}
                        <div>
                          <label
                            className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            전화번호 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.contactPhone}
                            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                            required
                            placeholder="010-1234-5678"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                          />
                        </div>

                        {/* Contact Email */}
                        <div>
                          <label
                            className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                          >
                            이메일 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                            required
                            placeholder="example@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fee */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        강연료 (가세 별도 / 세금계산서 발행)
                      </label>
                      <input
                        type="text"
                        value={formData.fee}
                        onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                        placeholder="강연료를 입력해주세요 (예: 1,000,000원)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all text-[13px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="block text-[var(--section-text-primary)] text-[13px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        기타 문의 내용
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder="추가로 문의하실 내용이 있으시면 입력해주세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--section-brand-primary)] transition-all resize-none text-[13px]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 'confirm' && (
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--section-brand-primary)]/10 mb-3">
                      <CheckCircle2 className="w-7 h-7 text-[var(--section-brand-primary)]" />
                    </div>
                    <h3 
                      className="text-[var(--section-text-primary)] text-[20px] md:text-[24px] mb-2"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                    >
                      예약 내용을 확인해주세요
                    </h3>
                    <p
                      className="text-[var(--section-text-secondary)] text-[13px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                    >
                      아래 정보가 정확한지 확인 후 예약을 완료해주세요
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 space-y-5">
                    {/* Expert Info */}
                    <div className="flex items-center gap-4 pb-5 border-b border-gray-200">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--section-brand-primary)]">
                        <ImageWithFallback
                          src={selectedExpertData?.image || ''}
                          alt={selectedExpertData?.name || ''}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4
                          className="text-[var(--section-text-primary)] text-[16px] mb-1"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                        >
                          {selectedExpertData?.name}
                        </h4>
                        <p
                          className="text-[var(--section-text-secondary)] text-[12px]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {selectedExpertData?.field} · {selectedExpertData?.title}
                        </p>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3 text-[13px]">
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          날짜:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {selectedDate?.toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          시간:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          장소:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {locationType === 'online' ? '온라인 (Zoom/Google Meet)' : location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          참여 인원:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {formData.audience}
                        </span>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="pt-3 border-t border-gray-200">
                      <p
                        className="text-[var(--section-text-secondary)] text-[12px] mb-2"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        상담 목적:
                      </p>
                      <p
                        className="text-[var(--section-text-primary)] text-[13px] leading-relaxed"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                      >
                        {formData.topic}
                      </p>
                    </div>

                    {formData.message && (
                      <div className="pt-3 border-t border-gray-200">
                        <p
                          className="text-[var(--section-text-secondary)] text-[12px] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          특별 요청사항:
                        </p>
                        <p
                          className="text-[var(--section-text-primary)] text-[13px] leading-relaxed"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                        >
                          {formData.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              variant="outline"
              className="px-6 py-5 disabled:opacity-50"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전
            </Button>

            {currentStep !== 'confirm' ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-6 py-5 disabled:opacity-50"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                다음
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-8 py-5"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                예약 완료
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}