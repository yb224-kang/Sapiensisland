import { useParams } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ExpertSettlementPage() {
  const { expertId } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyUrl = () => {
    const url = window.location.href;
    
    // Fallback 복사 방식 (클립보드 API가 차단된 경우 대비)
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      alert(`URL: ${url}\n\n위 URL을 복사해주세요.`);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  // 전문가별 정산 데이터 (실제로는 API에서 가져옴)
  const expertData: any = {
    '1': {
      expertId: 1,
      expertName: "김태훈",
      expertField: "심리학",
      totalRevenue: 9500000,
      totalSettlementAmount: 4800000,
      completedAmount: 2520000,
      pendingAmount: 2280000,
      lectures: [
        {
          id: 1,
          lectureDate: "2024-12-10",
          client: "삼성전자",
          topic: "리더십과 조직문화",
          revenue: 5000000,
          settlementAmount: 2520000,
          settlementStatus: "completed",
          settlementDate: "2024-12-15"
        },
        {
          id: 4,
          lectureDate: "2024-11-28",
          client: "SK하이닉스",
          topic: "창의적 사고",
          revenue: 4500000,
          settlementAmount: 2280000,
          settlementStatus: "pending",
          paymentScheduledDate: "2024-12-25"
        }
      ],
      pendingDetails: [
        { date: "2024-12-25", amount: 2280000, lectureDate: "2024-11-28", client: "SK하이닉스" }
      ]
    },
    '2': {
      expertId: 2,
      expertName: "이영희",
      expertField: "경제학",
      totalRevenue: 7500000,
      totalSettlementAmount: 3800000,
      completedAmount: 1800000,
      pendingAmount: 2000000,
      lectures: [
        {
          id: 2,
          lectureDate: "2024-12-12",
          client: "현대자동차",
          topic: "글로벌 경제 트렌드",
          revenue: 4000000,
          settlementAmount: 2000000,
          settlementStatus: "pending",
          paymentScheduledDate: "2024-12-20"
        },
        {
          id: 5,
          lectureDate: "2024-11-25",
          client: "네이버",
          topic: "디지털 경제의 미래",
          revenue: 3500000,
          settlementAmount: 1800000,
          settlementStatus: "completed",
          settlementDate: "2024-12-01"
        }
      ],
      pendingDetails: [
        { date: "2024-12-20", amount: 2000000, lectureDate: "2024-12-12", client: "현대자동차" }
      ]
    },
    '3': {
      expertId: 3,
      expertName: "박지성",
      expertField: "스포츠심리",
      totalRevenue: 6000000,
      totalSettlementAmount: 2750000,
      completedAmount: 0,
      pendingAmount: 2750000,
      lectures: [
        {
          id: 3,
          lectureDate: "2024-12-14",
          client: "LG화학",
          topic: "팀워크와 목표달성",
          revenue: 6000000,
          settlementAmount: 2750000,
          settlementStatus: "pending",
          paymentScheduledDate: "2024-12-25"
        }
      ],
      pendingDetails: [
        { date: "2024-12-25", amount: 2750000, lectureDate: "2024-12-14", client: "LG화학" }
      ]
    }
  };

  const expert = expertData[expertId || '1'];

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-2" style={{ fontWeight: 600 }}>전문가를 찾을 수 없습니다</h1>
          <p className="text-sm text-gray-600">올바른 링크인지 확인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#000050] text-white py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="white" opacity="0.1" />
              <path d="M20 10v20M10 20h20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h1 className="text-xl" style={{ fontWeight: 700 }}>사피엔스아일랜드</h1>
          </div>
          <p className="text-sm opacity-90" style={{ fontWeight: 400 }}>정산 현황 조회</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* URL 공유 안내 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-xs text-blue-900 mb-2 flex items-center gap-2" style={{ fontWeight: 600 }}>
                <span className="text-base">🔗</span>
                <span>이 페이지는 정산 현황을 확인하기 위한 개인 전용 페이지입니다</span>
              </h4>
              <p className="text-xs text-blue-700 mb-3" style={{ fontWeight: 400 }}>
                언제든지 이 URL을 통해 정산 현황을 확인하실 수 있습니다. 북마크에 저장하시거나 아래 버튼으로 URL을 복사하세요.
              </p>
              <button
                onClick={handleCopyUrl}
                className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition-all ${
                  isCopied 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-white text-[#000050] border border-[#000050] hover:bg-[#000050] hover:text-white shadow-sm'
                }`}
                style={{ fontWeight: 500 }}
              >
                {isCopied ? (
                  <>
                    <Check size={16} />
                    <span>URL이 복사되었습니다!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>URL 복사하기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expert Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#000050] flex items-center justify-center text-white text-xl" style={{ fontWeight: 600 }}>
              {expert.expertName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg text-gray-900 mb-1" style={{ fontWeight: 600 }}>{expert.expertName}</h2>
              <p className="text-sm text-gray-600" style={{ fontWeight: 400 }}>{expert.expertField} 전문가</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 400 }}>누적 매출액</p>
              <p className="text-base text-gray-900" style={{ fontWeight: 600 }}>₩{expert.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-blue-600 mb-2" style={{ fontWeight: 400 }}>총 정산금액</p>
              <p className="text-base text-blue-700" style={{ fontWeight: 600 }}>₩{expert.totalSettlementAmount.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-xs text-green-600 mb-2" style={{ fontWeight: 400 }}>입금완료</p>
              <p className="text-base text-green-700" style={{ fontWeight: 600 }}>₩{expert.completedAmount.toLocaleString()}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-xs text-orange-600 mb-2" style={{ fontWeight: 400 }}>입금예정</p>
              <p className="text-base text-orange-700" style={{ fontWeight: 600 }}>₩{expert.pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* 입금 예정 내역 */}
        {expert.pendingDetails.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-sm text-gray-900 mb-4" style={{ fontWeight: 600 }}>💳 입금 예정 내역</h3>
            <div className="space-y-3">
              {expert.pendingDetails.map((detail: any, idx: number) => (
                <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs" style={{ fontWeight: 600 }}>
                        예정일: {detail.date}
                      </div>
                      <span className="text-sm text-gray-600" style={{ fontWeight: 400 }}>
                        {detail.client} · {detail.lectureDate}
                      </span>
                    </div>
                    <p className="text-base text-orange-700" style={{ fontWeight: 700 }}>₩{detail.amount.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-gray-500" style={{ fontWeight: 400 }}>
                    ※ 입금 예정일은 사정에 따라 변경될 수 있습니다
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 강의별 정산 내역 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm text-gray-900 mb-4" style={{ fontWeight: 600 }}>📊 강의별 정산 내역</h3>
          <div className="space-y-3">
            {expert.lectures.map((lecture: any) => (
              <div key={lecture.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm text-gray-900" style={{ fontWeight: 600 }}>{lecture.topic}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                        lecture.settlementStatus === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`} style={{ fontWeight: 500 }}>
                        {lecture.settlementStatus === 'completed' ? '정산완료' : '정산대기'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>
                      {lecture.client} · {lecture.lectureDate}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1" style={{ fontWeight: 400 }}>강의 매출</p>
                    <p className="text-sm text-gray-900" style={{ fontWeight: 500 }}>₩{lecture.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1" style={{ fontWeight: 400 }}>정산 금액</p>
                    <p className="text-sm text-blue-600" style={{ fontWeight: 600 }}>₩{lecture.settlementAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1" style={{ fontWeight: 400 }}>
                      {lecture.settlementStatus === 'completed' ? '정산일자' : '예정일자'}
                    </p>
                    <p className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
                      {lecture.settlementStatus === 'completed' ? lecture.settlementDate : lecture.paymentScheduledDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="text-xs text-blue-900 mb-2" style={{ fontWeight: 600 }}>📌 안내 사항</h4>
          <ul className="space-y-1 text-xs text-blue-800" style={{ fontWeight: 400 }}>
            <li>• 정산 내역은 실시간으로 업데이트됩니다</li>
            <li>• 입금 예정일은 사정에 따라 변경될 수 있습니다</li>
            <li>• 정산 관련 문의사항은 담당자에게 연락 주시기 바랍니다</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500" style={{ fontWeight: 400 }}>
            © 2024 사피엔스아일랜드. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}