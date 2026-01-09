import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock, MapPin, User, CheckCircle2, ChevronLeft, ChevronRight, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { professors } from "../data/professors";
import { useState, useEffect, useRef, useMemo } from "react";
// 독립 폴더의 hooks 사용 (re-export를 통해)
import { useCreateReservation } from '../hooks/useReservationQueries';

// Daum Postcode types
declare global {
  interface Window {
    daum: any;
  }
}

// Booking step types
type BookingStep = 'expert' | 'datetime' | 'location' | 'details' | 'confirm';

// Generate time slots (30-minute intervals)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 18) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Mock available times
const availableTimes = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

// 시/도/군 데이터
const cityDistrictData: Record<string, string[]> = {
  '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  '부산광역시': ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
  '대구광역시': ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'],
  '인천광역시': ['계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
  '광주광역시': ['광산구', '남구', '동구', '북구', '서구'],
  '대전광역시': ['대덕구', '동구', '서구', '유성구', '중구'],
  '울산광역시': ['남구', '동구', '북구', '중구', '울주군'],
  '세종특별자치시': ['세종시'],
  '경기도': ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '오산시', '이천시', '양주시', '하남시', '구리시', '안성시', '포천시', '의왕시', '양평군', '여주시', '동두천시', '과천시', '가평군', '연천군'],
  '강원도': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
  '충청북도': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
  '충청남도': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
  '전라북도': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
  '전라남도': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
  '경상북도': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
  '경상남도': ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
  '제주특별자치도': ['제주시', '서귀포시']
};

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
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState<string | null>(null);
  
  // Mock unavailable times (in real app, this would come from API based on selected date)
  const [unavailableTimes] = useState<string[]>(() => {
    // Randomly select some times as unavailable for demo
    const unavailable: string[] = [];
    timeSlots.forEach((slot) => {
      if (Math.random() > 0.8) { // 20% chance of being unavailable
        unavailable.push(slot);
      }
    });
    return unavailable;
  });
  
  const [locationType, setLocationType] = useState<'confirmed' | 'undecided'>('confirmed');
  const [location, setLocation] = useState('');
  const [addressPostcode, setAddressPostcode] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  
  // 장소미정 시 시/도/군 선택
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  
  // Refs for scroll management
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const navigationButtonsRef = useRef<HTMLDivElement>(null);
  
  // React Query mutation for creating reservation
  const createReservationMutation = useCreateReservation();
  
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

  // Global mouse up handler to end dragging (prevents date change during time drag)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleTimeMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Scroll to top when step changes
  useEffect(() => {
    const dialogElement = document.querySelector('[role="dialog"]');
    if (dialogElement) {
      dialogElement.scrollTop = 0;
    }
  }, [currentStep]);

  // Scroll to navigation buttons when selection is completed
  useEffect(() => {
    const scrollToButtons = () => {
      setTimeout(() => {
        const dialogElement = document.querySelector('[role="dialog"]');
        if (dialogElement) {
          dialogElement.scrollTo({
            top: dialogElement.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 300); // Wait for animation to complete
    };

    // Step 1: Expert selected
    if (currentStep === 'expert' && selectedExpert !== null) {
      scrollToButtons();
    }
    // Step 2: Date selected - removed scroll (better UX)
    // Step 3: Location selected
    if (currentStep === 'location' && canProceedToNext()) {
      scrollToButtons();
    }
    // Step 5: Confirmation page - always show buttons
    if (currentStep === 'confirm') {
      scrollToButtons();
    }
  }, [selectedExpert, selectedDate, selectedTime, locationType, location, currentStep]);

  // Generate calendar days for current month (memoized to prevent re-renders)
  const calendarDays = useMemo(() => {
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
  }, []); // Empty deps - only generate once on mount

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generate fixed availability map (memoized to prevent random changes)
  const dateAvailability = useMemo(() => {
    const availabilityMap = new Map<string, boolean>();
    calendarDays.forEach((day) => {
      if (day) {
        const isPast = day < today;
        const dateKey = day.toISOString();
        // Generate consistent availability (70% of future dates are available)
        availabilityMap.set(dateKey, !isPast && Math.random() > 0.3);
      }
    });
    return availabilityMap;
  }, [calendarDays]);

  const selectedExpertData = professors.find(p => p.id === selectedExpert);

  const steps = [
    { id: 'expert', label: '전문가 선택', icon: User },
    { id: 'datetime', label: '날짜 & 시간', icon: Calendar },
    { id: 'location', label: '장소', icon: MapPin },
    { id: 'details', label: '상세 정보', icon: Clock },
    { id: 'confirm', label: '내용확인', icon: CheckCircle2 }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'expert': return selectedExpert !== null;
      case 'datetime': return selectedDate !== null && selectedTime !== null;
      case 'location': 
        if (locationType === 'confirmed') {
          return location.trim() !== '';
        } else if (locationType === 'undecided') {
          return selectedCity.trim() !== '' && selectedDistrict.trim() !== '';
        }
        return false;
      case 'details': return formData.agency.trim() !== '' && formData.contactName.trim() !== '' && formData.contactPhone.trim() !== '' && formData.contactEmail.trim() !== '';
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

  const handleSubmit = async () => {
    // 필수 필드 검증
    if (!selectedDate || !selectedTime || !selectedExpert) {
      alert('필수 정보가 누락되었습니다.');
      return;
    }

    if (!formData.agency || !formData.topic || !formData.contactName || 
        !formData.contactPhone || !formData.contactEmail || !formData.fee) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 날짜 형식 변환 (YYYY-MM-DD)
    const reservationDate = selectedDate.toISOString().split('T')[0];
    
    // 지역 추출 (주소에서 또는 기본값)
    // 주소가 있으면 우편번호로 지역 판단, 없으면 기본값
    const region = addressPostcode ? '서울' : '서울'; // 임시로 기본값, 필요시 주소 파싱 로직 추가

    // professors 데이터에서 expert 정보 가져오기
    const selectedExpertData = professors.find(p => p.id === selectedExpert);

    // locationType 변환: 'confirmed' -> 'online', 'undecided' -> 'offline'
    const apiLocationType = locationType === 'confirmed' ? 'online' : 'offline';

    // 예약 데이터 구성
    const reservationData = {
      reservationDate,
      reservationTime: selectedTime,
      expert: selectedExpertData?.name || '', // expertId 대신 expert (string)
      expertField: selectedExpertData?.field || '', // expertField 추가
      locationType: apiLocationType, // 'online' | 'offline'로 변환
      location: locationType === 'confirmed' 
        ? location 
        : `${addressPostcode} ${addressDetail}`.trim(),
      region,
      agency: formData.agency,
      client: formData.agency, // client 필드 추가 (또는 별도 필드로)
      topic: formData.topic,
      audience: formData.audience || undefined,
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      fee: parseInt(formData.fee) || 0,
      message: formData.message || undefined,
    };

    try {
      await createReservationMutation.mutateAsync(reservationData);
      alert('예약이 완료되었습니다!');
      handleClose();
    } catch (error: any) {
      console.error('예약 생성 실패:', error);
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || '알 수 없는 오류가 발생했습니다.';
      alert(`예약 생성에 실패했습니다: ${errorMessage}`);
    }
  };

  const handleClose = () => {
    setCurrentStep('expert');
    setSelectedExpert(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedEndTime(null);
    setIsDragging(false);
    setDragStartTime(null);
    setLocationType('online');
    setLocation('');
    setAddressPostcode('');
    setAddressDetail('');
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

  // Load Daum Postcode API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Handle address search
  const handleAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function(data: any) {
        // 도로명 주소 우선, 없으면 지번 주소 사용
        const fullAddress = data.roadAddress || data.jibunAddress;
        const extraAddress = data.bname ? ` (${data.bname})` : '';
        
        setAddressPostcode(data.zonecode);
        setLocation(fullAddress + extraAddress);
        setAddressDetail('');
      },
      width: '100%',
      height: '100%'
    }).open();
  };

  // Time range selection handlers
  const handleTimeMouseDown = (e: React.MouseEvent, time: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setDragStartTime(time);
    setSelectedTime(time);
    setSelectedEndTime(time);
  };

  const handleTimeMouseEnter = (time: string) => {
    if (!isDragging || !dragStartTime) return;
    
    // Check if current time is unavailable
    if (unavailableTimes.includes(time)) return;
    
    const startIndex = timeSlots.indexOf(dragStartTime);
    const currentIndex = timeSlots.indexOf(time);
    
    // Check if there are any unavailable slots in the range
    const minIndex = Math.min(startIndex, currentIndex);
    const maxIndex = Math.max(startIndex, currentIndex);
    
    const slotsInRange = timeSlots.slice(minIndex, maxIndex + 1);
    const hasUnavailableInRange = slotsInRange.some(slot => unavailableTimes.includes(slot));
    
    if (hasUnavailableInRange) return; // Don't update selection if unavailable slots in range
    
    if (currentIndex >= startIndex) {
      setSelectedTime(dragStartTime);
      setSelectedEndTime(time);
    } else {
      setSelectedTime(time);
      setSelectedEndTime(dragStartTime);
    }
  };

  const handleTimeMouseUp = () => {
    setIsDragging(false);
    setDragStartTime(null);
    
    // Scroll to bottom when drag is complete (time selection is done)
    if (selectedTime && selectedEndTime) {
      setTimeout(() => {
        const dialogElement = document.querySelector('[role="dialog"]');
        if (dialogElement) {
          dialogElement.scrollTo({
            top: dialogElement.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  // Check if time is in selected range
  const isTimeInRange = (time: string, start: string, end: string) => {
    const timeIndex = timeSlots.indexOf(time);
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    
    return timeIndex > startIndex && timeIndex < endIndex;
  };

  // Calculate duration between two times
  const calculateDuration = (start: string, end: string) => {
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    
    if (startIndex === -1 || endIndex === -1) return '';
    
    const slots = endIndex - startIndex;
    const hours = Math.floor(slots / 2);
    const minutes = (slots % 2) * 30;
    
    if (hours === 0) return `${minutes}분`;
    if (minutes === 0) return `${hours}시간`;
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal>
      <DialogContent 
        className="max-w-[56rem] max-h-[90vh] overflow-y-auto p-0 gap-0" 
        aria-describedby={undefined}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Accessible Title - Hidden visually but available for screen readers */}
        <DialogTitle className="sr-only">
          강연문의하기 {selectedExpertData ? `- ${selectedExpertData.name}` : ''}
        </DialogTitle>

        {/* Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-4">
          {/* Expert Info + Close Button (Step 2 onwards) */}
          {selectedExpertData && currentStep !== 'expert' && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--section-brand-primary)]" />
                <p 
                  className="text-[var(--section-text-secondary)] text-[14px] m-0"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                >
                  <span 
                    className="text-[var(--section-text-primary)]"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    {selectedExpertData.name} 전문가
                  </span>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          )}

          {/* Close Button Only (Step 1) */}
          {currentStep === 'expert' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          )}

          {/* Step Title - ALL STEPS */}
          <div className="text-center mb-5">
            {/* Step Title */}
            <h3
              className="text-[var(--section-text-primary)] m-0"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '1.375rem', lineHeight: '1.3' }}
            >
              {currentStep === 'expert' && '전문가를 선택해주세요'}
              {currentStep === 'datetime' && '날짜와 시간을 선택해주세요'}
              {currentStep === 'location' && '강연 장소를 기입해주세요'}
              {currentStep === 'details' && '문의하기'}
              {currentStep === 'confirm' && '문의 내용을 확인해주세요'}
            </h3>
            
            {/* Subtitle for details step */}
            {currentStep === 'details' && (
              <p
                className="text-[var(--section-text-secondary)] mt-2 m-0"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.8125rem' }}
              >
                문의를 남겨주시면 빠르고 신속하게 답변드리겠습니다.
              </p>
            )}
          </div>

          {/* Progress Steps - NOW BELOW TITLE */}
          <div className="mb-0">
            <div className="flex items-center justify-between relative max-w-[600px] mx-auto">
              {/* Progress Bar Background */}
              <div className="absolute top-[20px] left-[40px] right-[40px] h-[2px] bg-gray-200" />
              
              {/* Progress Bar Fill */}
              <div 
                className="absolute top-[20px] left-[40px] h-[2px] bg-[var(--section-brand-primary)] transition-all duration-500"
                style={{ 
                  width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                  maxWidth: 'calc(100% - 80px)'
                }}
              />

              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-[var(--section-brand-primary)] text-white' 
                          : isCurrent 
                          ? 'bg-[var(--section-brand-primary)] text-white ring-3 ring-[var(--section-brand-primary)]/20' 
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span 
                      className={`text-[11px] whitespace-nowrap ${
                        isCurrent ? 'text-[var(--section-brand-primary)]' : 'text-gray-500'
                      }`}
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: isCurrent ? 700 : 500 }}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 relative z-0">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Calendar */}
                  <div 
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                    style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4
                        className="text-[var(--section-text-primary)] m-0"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}
                      >
                        📅 날짜 선택
                      </h4>
                      <div className="flex gap-2">
                        <button 
                          disabled={isDragging}
                          className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button 
                          disabled={isDragging}
                          className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div 
                      className="text-[var(--section-text-secondary)] mb-4"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.8125rem' }}
                    >
                      {today.getFullYear()}년 {today.getMonth() + 1}월
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                        <div
                          key={day}
                          className="text-center py-2 text-[var(--section-text-secondary)] text-[11px]"
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
                        const isAvailable = dateAvailability.get(day.toISOString()) ?? false;

                        return (
                          <motion.button
                            key={day.toISOString()}
                            whileHover={isAvailable && !isDragging ? { scale: 1.1 } : {}}
                            onClick={() => {
                              if (isAvailable && !isDragging) {
                                setSelectedDate(day);
                              }
                            }}
                            disabled={!isAvailable || isDragging}
                            className={`aspect-square rounded-lg flex items-center justify-center text-[13px] transition-all duration-200 ${
                              isSelected
                                ? 'bg-[var(--section-brand-primary)] text-white shadow-lg'
                                : isAvailable
                                ? 'bg-white hover:bg-[var(--section-brand-primary)]/10 text-[var(--section-text-primary)]'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                          >
                            {day.getDate()}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Time Selection */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4
                      className="text-[var(--section-text-primary)] mb-6 m-0"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}
                    >
                      🕐 시간 선택
                    </h4>
                    
                    {!selectedDate ? (
                      <div className="flex items-center justify-center h-[300px]">
                        <p
                          className="text-[var(--section-text-secondary)] text-center"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        >
                          먼저 날짜를 선택해주세요
                        </p>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        {/* Additional Notice */}
                        <div className="mb-4">
                          <p
                            className="text-gray-500 text-[11px] m-0"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                          >
                            * 선일정 및 이동 거리에 따라 요청하신 시간이 어려울 수 있습니다.
                          </p>
                        </div>

                        {/* Google Calendar Style Timeline */}
                        <div 
                          className="relative bg-white border border-gray-200 rounded-lg overflow-hidden max-h-[400px] overflow-y-auto select-none"
                          onMouseLeave={() => {
                            if (isDragging) {
                              handleTimeMouseUp();
                            }
                          }}
                        >
                          {/* Time Grid */}
                          <div className="relative" style={{ userSelect: 'none' }}>
                            {timeSlots.map((time, index) => {
                              const isAvailable = !unavailableTimes.includes(time);
                              const isHourMark = time.endsWith(':00');

                              return (
                                <div
                                  key={time}
                                  onMouseDown={(e) => handleTimeMouseDown(e, time, isAvailable)}
                                  onMouseEnter={() => handleTimeMouseEnter(time)}
                                  onMouseUp={() => handleTimeMouseUp()}
                                  className={`relative flex items-start border-b transition-colors ${
                                    isAvailable ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed'
                                  }`}
                                  style={{ 
                                    height: '2.5rem',
                                    borderColor: isHourMark ? '#d1d5db' : '#e5e7eb',
                                    userSelect: 'none'
                                  }}
                                >
                                  {/* Time Label */}
                                  <div className="w-20 flex-shrink-0 px-3 py-1">
                                    {isHourMark && (
                                      <span
                                        className="text-[11px] text-[var(--section-text-secondary)]"
                                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                                      >
                                        {time}
                                      </span>
                                    )}
                                  </div>

                                  {/* Unavailable Overlay */}
                                  {!isAvailable && (
                                    <div className="absolute left-20 right-0 top-0 bottom-0 bg-red-50/80 border-l-4 border-red-400 flex items-center px-3">
                                      <span
                                        className="text-[10px] text-red-600"
                                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                                      >
                                        예약됨
                                      </span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                            {/* Selected Range Overlay */}
                            {selectedTime && selectedEndTime && (() => {
                              const startIndex = timeSlots.indexOf(selectedTime);
                              const endIndex = timeSlots.indexOf(selectedEndTime);
                              const top = startIndex * 2.5; // rem
                              const height = (endIndex - startIndex + 1) * 2.5; // rem

                              return (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute left-20 right-0 bg-[var(--section-brand-primary)]/90 border-l-4 border-[var(--section-brand-primary)] rounded-r-lg shadow-lg pointer-events-none"
                                  style={{
                                    top: `${top}rem`,
                                    height: `${height}rem`,
                                  }}
                                >
                                  <div className="p-3 text-white">
                                    <p
                                      className="text-[13px] m-0"
                                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                                    >
                                      선택된 일정 {selectedTime} - {selectedEndTime}
                                    </p>
                                  </div>
                                </motion.div>
                              );
                            })()}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Location Selection */}
              {currentStep === 'location' && (
                <div>
                  {/* Location Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setLocationType('confirmed');
                        setSelectedCity('');
                        setSelectedDistrict('');
                        setSelectedRegion('');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        locationType === 'confirmed'
                          ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                          : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          locationType === 'confirmed' ? 'bg-[var(--section-brand-primary)]' : 'bg-gray-100'
                        }`}>
                          <MapPin className={`w-5 h-5 ${locationType === 'confirmed' ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <h4
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '0.875rem' }}
                        >
                          장소확정
                        </h4>
                        <p
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.6875rem' }}
                        >
                          정확한 주소가<br />확정된 경우
                        </p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setLocationType('undecided');
                        setLocation('');
                        setAddressPostcode('');
                        setAddressDetail('');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        locationType === 'undecided'
                          ? 'border-[var(--section-brand-primary)] bg-[var(--section-brand-primary)]/5 shadow-lg'
                          : 'border-gray-200 hover:border-[var(--section-brand-primary)]/50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          locationType === 'undecided' ? 'bg-[var(--section-brand-primary)]' : 'bg-gray-100'
                        }`}>
                          <Calendar className={`w-5 h-5 ${locationType === 'undecided' ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <h4
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '0.875rem' }}
                        >
                          장소미정
                        </h4>
                        <p
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.6875rem' }}
                        >
                          지역만 정해지고<br />상세 장소는 미정
                        </p>
                      </div>
                    </motion.button>
                  </div>

                  {/* Location Input for Confirmed Address */}
                  {locationType === 'confirmed' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Postcode + Search Button */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          우편번호
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={addressPostcode}
                            readOnly
                            placeholder="우편번호"
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                          />
                          <button
                            type="button"
                            onClick={handleAddressSearch}
                            className="px-6 py-3 bg-[var(--section-brand-primary)] text-white rounded-xl hover:bg-[var(--section-brand-primary)]/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                          >
                            <Search className="w-4 h-4" />
                            주소검색
                          </button>
                        </div>
                      </div>

                      {/* Address (Basic) */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          기본주소
                        </label>
                        <input
                          type="text"
                          value={location}
                          readOnly
                          placeholder="주소검색 버튼을 클릭하세요"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>

                      {/* Address Detail */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          상세주소
                        </label>
                        <input
                          type="text"
                          value={addressDetail}
                          onChange={(e) => setAddressDetail(e.target.value)}
                          placeholder="예: 3층 회의실"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* City/District/Region Selection for Undecided */}
                  {locationType === 'undecided' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* City (시/도) */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          시/도 <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={selectedCity}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setSelectedDistrict('');
                          }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        >
                          <option value="">시/도를 선택해주세요</option>
                          {Object.keys(cityDistrictData).map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      {/* District (시/군/구) */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          시/군/구 <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          disabled={!selectedCity}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        >
                          <option value="">시/군/구를 선택해주세요</option>
                          {selectedCity && cityDistrictData[selectedCity]?.map((district) => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>

                      {/* Additional Region Info (Optional) */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          추가 지역 정보 (선택)
                        </label>
                        <input
                          type="text"
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          placeholder="예: 강남역 인근, 판교 테크노밸리 등"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 4: Details */}
              {currentStep === 'details' && (
                <div className="space-y-8">
                  {/* 📋 Section 1: 강연 정보 */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--section-brand-primary)] flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h4
                        className="text-[var(--section-text-primary)] m-0"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}
                      >
                        강연 정보
                      </h4>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Agency & Client Combined */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          요청사(AGENCY) & 주최사(고객사) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.agency}
                          onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                          required
                          placeholder="요청사, 주최사 이름을 입력해주세요"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>

                      {/* Topic */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          강연 주제
                        </label>
                        <input
                          type="text"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          placeholder="강연 주제를 입력해주세요"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>

                      {/* Audience */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          강연 대상
                        </label>
                        <input
                          type="text"
                          value={formData.audience}
                          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                          placeholder="강연 대상을 입력해주세요"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          기타 문의 내용
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          placeholder="추가로 문의하실 내용이 있으시면 입력해주세요"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors resize-none bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 📞 Section 2: 담당자 연락처 */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--section-brand-primary)] flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h4
                        className="text-[var(--section-text-primary)] m-0"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}
                      >
                        담당자 연락처
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {/* Contact Name */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          성함 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          required
                          placeholder="홍길동"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>

                      {/* Contact Phone */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          전화번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                          required
                          placeholder="010-1234-5678"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>

                      {/* Contact Email */}
                      <div>
                        <label
                          className="block text-[var(--section-text-primary)] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                          이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          required
                          placeholder="example@email.com"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--section-brand-primary)] focus:outline-none transition-colors bg-white"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500, fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 'confirm' && (
                <div>
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
                          {locationType === 'confirmed' 
                            ? location 
                            : `장소 미정${selectedCity ? ` (선호 지역: ${selectedCity}${selectedDistrict ? ' ' + selectedDistrict : ''})` : ''}`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          요청사(AGENCY) & 주최사(고객사):
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {formData.agency}
                        </span>
                      </div>
                    </div>

                    {/* Lecture Details */}
                    {(formData.topic || formData.audience) && (
                      <div className="pt-3 border-t border-gray-200 space-y-3 text-[13px]">
                        {formData.topic && (
                          <div className="flex justify-between">
                            <span
                              className="text-[var(--section-text-secondary)]"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                            >
                              강연 주제:
                            </span>
                            <span
                              className="text-[var(--section-text-primary)]"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                            >
                              {formData.topic}
                            </span>
                          </div>
                        )}
                        {formData.audience && (
                          <div className="flex justify-between">
                            <span
                              className="text-[var(--section-text-secondary)]"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                            >
                              강연 대상:
                            </span>
                            <span
                              className="text-[var(--section-text-primary)]"
                              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                            >
                              {formData.audience}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="pt-3 border-t border-gray-200 space-y-3 text-[13px]">
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          담당자명:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {formData.contactName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          전화번호:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {formData.contactPhone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-[var(--section-text-secondary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          이메일:
                        </span>
                        <span
                          className="text-[var(--section-text-primary)]"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                        >
                          {formData.contactEmail}
                        </span>
                      </div>
                    </div>

                    {formData.message && (
                      <div className="pt-3 border-t border-gray-200">
                        <p
                          className="text-[var(--section-text-secondary)] text-[12px] mb-2"
                          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        >
                          기타 문의 내용:
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
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200">
          <div ref={navigationButtonsRef} className="flex items-center justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              variant="outline"
              className="px-6 py-5 disabled:opacity-50"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
            >
              <ChevronLeft className="w-4 h-4" />
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
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={createReservationMutation.isPending}
                className="bg-[var(--section-brand-primary)] hover:bg-[var(--section-brand-primary)]/90 text-white px-8 py-5 disabled:opacity-50"
                style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
              >
                {createReservationMutation.isPending ? '처리 중...' : '제출완료'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}