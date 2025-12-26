import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  X, 
  MessageSquare,
  Clock,
  CheckCircle,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Calendar
} from 'lucide-react';
import { inquiries as mockInquiries, Inquiry } from '../data/mockData';

export default function InquiryContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Inquiry['status']>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter inquiries based on search and status
  const filteredInquiries = mockInquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get counts by status
  const pendingCount = mockInquiries.filter(i => i.status === 'pending').length;
  const repliedCount = mockInquiries.filter(i => i.status === 'replied').length;
  const resolvedCount = mockInquiries.filter(i => i.status === 'resolved').length;

  // Status badge
  const getStatusBadge = (status: Inquiry['status']) => {
    const statusConfig = {
      pending: { label: '대기중', color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-3 h-3" /> },
      replied: { label: '답변완료', color: 'bg-blue-100 text-blue-700', icon: <CheckCircle className="w-3 h-3" /> },
      resolved: { label: '처리완료', color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-3 h-3" /> },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${config.color}`}
        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const handleReply = () => {
    if (!selectedInquiry || !replyText.trim()) return;
    
    // TODO: API 연동
    console.log('답변 전송:', {
      inquiryId: selectedInquiry.id,
      reply: replyText
    });
    
    alert('답변이 전송되었습니다.');
    setReplyText('');
    setSelectedInquiry(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-xs mb-2 text-blue-900" style={{ fontWeight: 600 }}>📧 기타문의 관리</h4>
        <p className="text-[0.625rem] text-blue-800" style={{ fontWeight: 400 }}>
          홈페이지를 통해 접수된 기타문의를 확인하고 답변할 수 있습니다.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1" style={{ fontWeight: 500 }}>
                대기중
              </p>
              <p className="text-2xl text-amber-600" style={{ fontWeight: 700 }}>
                {pendingCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1" style={{ fontWeight: 500 }}>
                답변완료
              </p>
              <p className="text-2xl text-blue-600" style={{ fontWeight: 700 }}>
                {repliedCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1" style={{ fontWeight: 500 }}>
                처리완료
              </p>
              <p className="text-2xl text-green-600" style={{ fontWeight: 700 }}>
                {resolvedCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 이름, 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#000050] transition-colors"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all text-xs ${
              showFilters 
                ? 'bg-[#000050] text-white border-[#000050]' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#000050]'
            }`}
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
          >
            <Filter className="w-4 h-4" />
            필터
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div>
                <label className="block text-xs text-gray-700 mb-2" style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}>
                  상태 필터
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-xs appearance-none pr-8 focus:outline-none focus:border-[#000050] transition-colors"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
                  >
                    <option value="all">전체</option>
                    <option value="pending">대기중</option>
                    <option value="replied">답변완료</option>
                    <option value="resolved">처리완료</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inquiry List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  번호
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  제목
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  문의자
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  연락처
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  상태
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  접수일시
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-700" style={{ fontWeight: 600 }}>
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs text-gray-500">
                    문의 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr 
                    key={inquiry.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-xs text-gray-900" style={{ fontWeight: 500 }}>
                      #{inquiry.id}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900" style={{ fontWeight: 600 }}>
                      {inquiry.title}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700" style={{ fontWeight: 500 }}>
                      {inquiry.contactName}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700" style={{ fontWeight: 400 }}>
                      <div>{inquiry.contactPhone}</div>
                      <div className="text-[0.625rem] text-gray-500">{inquiry.contactEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(inquiry.status)}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700" style={{ fontWeight: 400 }}>
                      {inquiry.createdAt}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="px-3 py-1.5 bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors text-xs"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>
                  문의 상세
                </h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status and Date */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(selectedInquiry.status)}
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedInquiry.createdAt}
                  </span>
                </div>

                {/* Title */}
                <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm text-gray-700 mb-2 flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <MessageSquare className="w-4 h-4" />
                    제목
                  </h4>
                  <p className="text-sm text-[#1e1e1e]" style={{ fontWeight: 600 }}>
                    {selectedInquiry.title}
                  </p>
                </div>

                {/* Message */}
                <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm text-gray-700 mb-3" style={{ fontWeight: 600 }}>
                    문의 내용
                  </h4>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed" style={{ fontWeight: 400 }}>
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm text-gray-700 mb-4" style={{ fontWeight: 600 }}>
                    문의자 정보
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-[0.625rem] text-gray-500" style={{ fontWeight: 500 }}>성함</p>
                        <p className="text-xs text-gray-900" style={{ fontWeight: 600 }}>
                          {selectedInquiry.contactName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-[0.625rem] text-gray-500" style={{ fontWeight: 500 }}>전화번호</p>
                        <p className="text-xs text-gray-900" style={{ fontWeight: 600 }}>
                          {selectedInquiry.contactPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-[0.625rem] text-gray-500" style={{ fontWeight: 500 }}>이메일</p>
                        <p className="text-xs text-gray-900" style={{ fontWeight: 600 }}>
                          {selectedInquiry.contactEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Section (if exists) */}
                {selectedInquiry.reply && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm text-blue-900" style={{ fontWeight: 600 }}>
                        답변 내용
                      </h4>
                      <span className="text-xs text-blue-700">
                        {selectedInquiry.repliedBy} • {selectedInquiry.repliedAt}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed" style={{ fontWeight: 400 }}>
                      {selectedInquiry.reply}
                    </p>
                  </div>
                )}

                {/* Reply Form (if pending or replied) */}
                {selectedInquiry.status !== 'resolved' && (
                  <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
                    <h4 className="text-sm text-gray-700 mb-3" style={{ fontWeight: 600 }}>
                      {selectedInquiry.status === 'replied' ? '추가 답변' : '답변 작성'}
                    </h4>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="답변 내용을 입력해주세요..."
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#000050] transition-all resize-none text-sm"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    닫기
                  </button>
                  {selectedInquiry.status !== 'resolved' && (
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                    >
                      답변 전송
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
