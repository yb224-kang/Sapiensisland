import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

export default function PartnersContent() {
  const [partners, setPartners] = useState([
    { id: 1, name: "삼성전자", logoType: "text", color: "#1428A0", order: 1 },
    { id: 2, name: "LG전자", logoType: "text", color: "#A50034", order: 2 },
    { id: 3, name: "SK하이닉스", logoType: "text", color: "#EA002C", order: 3 },
    { id: 4, name: "네이버", logoType: "text", color: "#03C75A", order: 4 },
    { id: 5, name: "카카오", logoType: "text", color: "#FEE500", order: 5 },
    { id: 6, name: "포스코", logoType: "text", color: "#005BAC", order: 6 },
    { id: 7, name: "한국전력공사", logoType: "text", color: "#003DA5", order: 7 },
    { id: 8, name: "KT", logoType: "text", color: "#E30613", order: 8 }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    logoType: 'text' as 'text' | 'image',
    color: '#000000',
    logoUrl: ''
  });

  const handleAdd = () => {
    const newPartner = {
      id: Math.max(...partners.map(p => p.id)) + 1,
      name: formData.name,
      logoType: formData.logoType,
      color: formData.color,
      logoUrl: formData.logoUrl,
      order: partners.length + 1
    };
    setPartners([...partners, newPartner]);
    setIsAddModalOpen(false);
    setFormData({ name: '', logoType: 'text', color: '#000000', logoUrl: '' });
  };

  const handleEdit = () => {
    setPartners(partners.map(p => 
      p.id === selectedPartner.id 
        ? { ...p, name: formData.name, color: formData.color, logoType: formData.logoType, logoUrl: formData.logoUrl }
        : p
    ));
    setIsEditModalOpen(false);
    setSelectedPartner(null);
    setFormData({ name: '', logoType: 'text', color: '#000000', logoUrl: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPartners(partners.filter(p => p.id !== id));
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newPartners = [...partners];
    [newPartners[index], newPartners[index - 1]] = [newPartners[index - 1], newPartners[index]];
    setPartners(newPartners);
  };

  const moveDown = (index: number) => {
    if (index === partners.length - 1) return;
    const newPartners = [...partners];
    [newPartners[index], newPartners[index + 1]] = [newPartners[index + 1], newPartners[index]];
    setPartners(newPartners);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <h4 className="text-xs mb-2 text-blue-900" style={{ fontWeight: 600 }}>🏢 파트너사 로고 관리</h4>
        <div className="space-y-1.5 text-[0.625rem] text-blue-800" style={{ fontWeight: 400 }}>
          <div className="flex gap-2"><span className="text-blue-600">•</span><div><strong style={{ fontWeight: 600 }}>기본 정보:</strong> 파트너사 이름, 로고 색상</div></div>
          <div className="flex gap-2"><span className="text-blue-600">•</span><div><strong style={{ fontWeight: 600 }}>순서 관리:</strong> ↑↓ 버튼으로 표시 순서 변경 가능</div></div>
          <div className="flex gap-2"><span className="text-blue-600">•</span><div><strong style={{ fontWeight: 600 }}>홈페이지 노출:</strong> 메인 페이지 하단에 무한 스크롤 형태로 표시됩니다</div></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4 p-4 pb-0">
          <div>
            <h3 className="text-sm tracking-tight text-[#1e1e1e] mb-1" style={{ fontWeight: 600 }}>파트너사 목록</h3>
            <p className="text-xs text-gray-600" style={{ fontWeight: 400 }}>파트너사 로고를 추가, 수정, 삭제할 수 있습니다. (총 {partners.length}개)</p>
          </div>
          <button 
            onClick={() => {
              setFormData({ name: '', logoType: 'text', color: '#000000', logoUrl: '' });
              setIsAddModalOpen(true);
            }}
            className="px-3 py-1.5 text-xs bg-[#000050] text-white rounded-lg hover:bg-[#000070] transition-colors whitespace-nowrap" 
            style={{ fontWeight: 500 }}
          >
            + 파트너사 추가
          </button>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F8F8' }}>
                <th className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 600 }}>순서</th>
                <th className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 600 }}>파트너사명</th>
                <th className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 600 }}>로고 색상</th>
                <th className="px-3 py-2 text-xs text-gray-600" style={{ fontWeight: 600 }}>미리보기</th>
                <th className="px-3 py-2 text-xs text-gray-600 text-center" style={{ fontWeight: 600 }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner, index) => (
                <tr key={partner.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-900" style={{ fontWeight: 600 }}>{index + 1}</span>
                      <div className="flex flex-col gap-0.5 ml-1">
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-3 h-3 rotate-90" />
                        </button>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === partners.length - 1}
                          className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-3 h-3 rotate-90" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-900" style={{ fontWeight: 600 }}>{partner.name}</td>
                  <td className="px-3 py-2">
                    {partner.logoType === 'text' ? (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: partner.color }}
                        />
                        <span className="text-xs text-gray-600" style={{ fontWeight: 400 }}>{partner.color}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-600" style={{ fontWeight: 400 }}>이미지</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-lg border-2 border-gray-100 shadow-sm min-w-[128px] h-12">
                      {partner.logoType === 'text' ? (
                        <p
                          className="text-xs whitespace-nowrap"
                          style={{ 
                            fontFamily: 'Pretendard Variable, sans-serif', 
                            fontWeight: 800,
                            color: partner.color
                          }}
                        >
                          {partner.name}
                        </p>
                      ) : (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="max-h-8 max-w-full object-contain"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => {
                          setSelectedPartner(partner);
                          setFormData({ name: partner.name, logoType: partner.logoType, color: partner.color, logoUrl: partner.logoUrl });
                          setIsEditModalOpen(true);
                        }}
                        className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                        style={{ fontWeight: 500 }}
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => handleDelete(partner.id)}
                        className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors" 
                        style={{ fontWeight: 500 }}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 추가 모달 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-base text-[#1e1e1e]" style={{ fontWeight: 700 }}>파트너사 추가</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>파트너사명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                  placeholder="예: 삼성전자"
                  style={{ fontWeight: 500 }}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>로고 타입 *</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, logoType: 'text' })}
                    className={`px-3 py-1.5 text-xs ${formData.logoType === 'text' ? 'bg-[#000050] text-white' : 'bg-gray-200 text-gray-700'} rounded-lg hover:bg-[#000070] transition-colors`}
                    style={{ fontWeight: 500 }}
                  >
                    텍스트
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, logoType: 'image' })}
                    className={`px-3 py-1.5 text-xs ${formData.logoType === 'image' ? 'bg-[#000050] text-white' : 'bg-gray-200 text-gray-700'} rounded-lg hover:bg-[#000070] transition-colors`}
                    style={{ fontWeight: 500 }}
                  >
                    이미지
                  </button>
                </div>
              </div>

              {formData.logoType === 'text' && (
                <div>
                  <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>로고 색상 *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-16 h-11 border-2 border-gray-300 rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                      placeholder="#000000"
                      style={{ fontWeight: 500 }}
                    />
                  </div>
                </div>
              )}

              {formData.logoType === 'image' && (
                <div>
                  <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>로고 이미지 URL *</label>
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    placeholder="예: https://example.com/logo.png"
                    style={{ fontWeight: 500 }}
                  />
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 600 }}>미리보기</p>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-lg border-2 border-gray-100 shadow-sm">
                  {formData.logoType === 'text' && (
                    <p
                      className="text-sm whitespace-nowrap"
                      style={{ 
                        fontFamily: 'Pretendard Variable, sans-serif', 
                        fontWeight: 800,
                        color: formData.color
                      }}
                    >
                      {formData.name || '파트너사명'}
                    </p>
                  )}
                  {formData.logoType === 'image' && (
                    <img
                      src={formData.logoUrl}
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-2 justify-end rounded-b-2xl border-t border-gray-200">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200" style={{ fontWeight: 600 }}>취소</button>
              <button 
                onClick={handleAdd}
                disabled={!formData.name}
                className="px-4 py-2 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed" 
                style={{ fontWeight: 600 }}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-base text-[#1e1e1e]" style={{ fontWeight: 700 }}>파트너사 수정</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="px-6 py-6 space-y-5">
              <div>
                <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>파트너사명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                  placeholder="예: 삼성전자"
                  style={{ fontWeight: 500 }}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>로고 타입 *</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, logoType: 'text' })}
                    className={`px-3 py-1.5 text-xs ${formData.logoType === 'text' ? 'bg-[#000050] text-white' : 'bg-gray-200 text-gray-700'} rounded-lg hover:bg-[#000070] transition-colors`}
                    style={{ fontWeight: 500 }}
                  >
                    텍스트
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, logoType: 'image' })}
                    className={`px-3 py-1.5 text-xs ${formData.logoType === 'image' ? 'bg-[#000050] text-white' : 'bg-gray-200 text-gray-700'} rounded-lg hover:bg-[#000070] transition-colors`}
                    style={{ fontWeight: 500 }}
                  >
                    이미지
                  </button>
                </div>
              </div>

              {formData.logoType === 'text' && (
                <div>
                  <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>로고 색상 *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-16 h-11 border-2 border-gray-300 rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                      placeholder="#000000"
                      style={{ fontWeight: 500 }}
                    />
                  </div>
                </div>
              )}

              {formData.logoType === 'image' && (
                <div>
                  <label className="block text-xs text-gray-700 mb-2" style={{ fontWeight: 600 }}>로고 이미지 URL *</label>
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    placeholder="예: https://example.com/logo.png"
                    style={{ fontWeight: 500 }}
                  />
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2" style={{ fontWeight: 600 }}>미리보기</p>
                <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-lg border-2 border-gray-100 shadow-sm">
                  {formData.logoType === 'text' && (
                    <p
                      className="text-sm whitespace-nowrap"
                      style={{ 
                        fontFamily: 'Pretendard Variable, sans-serif', 
                        fontWeight: 800,
                        color: formData.color
                      }}
                    >
                      {formData.name || '파트너사명'}
                    </p>
                  )}
                  {formData.logoType === 'image' && (
                    <img
                      src={formData.logoUrl}
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-2 justify-end rounded-b-2xl border-t border-gray-200">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200" style={{ fontWeight: 600 }}>취소</button>
              <button 
                onClick={handleEdit}
                disabled={!formData.name}
                className="px-4 py-2 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed" 
                style={{ fontWeight: 600 }}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}