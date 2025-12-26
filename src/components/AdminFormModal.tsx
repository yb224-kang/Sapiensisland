import { useState } from 'react';
import { X } from 'lucide-react';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mode: 'add' | 'edit';
  admin?: any;
}

export default function AdminFormModal({ isOpen, onClose, title, mode, admin }: AdminFormModalProps) {
  const [permissions, setPermissions] = useState(admin?.permissions || {
    reservations: { read: false, write: false },
    experts: { read: false, write: false },
    contents: { read: false, write: false },
    settlement: { read: false, write: false },
    admins: { read: false, write: false }
  });

  const menuList = [
    { id: 'reservations', label: '예약신청내역관리', icon: '📅' },
    { id: 'experts', label: '지혜전문가관리', icon: '👥' },
    { id: 'contents', label: '콘텐츠관리', icon: '📄' },
    { id: 'settlement', label: '정산관리', icon: '💰' },
    { id: 'admins', label: 'ADMIN관리', icon: '⚙️' }
  ];

  const handlePermissionChange = (menuId: string, type: 'read' | 'write', value: boolean) => {
    setPermissions((prev: any) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        [type]: value
      }
    }));
  };

  const handleSelectAll = (type: 'read' | 'write') => {
    const newPermissions = { ...permissions };
    menuList.forEach(menu => {
      newPermissions[menu.id] = {
        ...newPermissions[menu.id],
        [type]: true
      };
    });
    setPermissions(newPermissions);
  };

  const handleDeselectAll = (type: 'read' | 'write') => {
    const newPermissions = { ...permissions };
    menuList.forEach(menu => {
      newPermissions[menu.id] = {
        ...newPermissions[menu.id],
        [type]: false
      };
    });
    setPermissions(newPermissions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg text-[#1e1e1e]" style={{ fontWeight: 600 }}>{title}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
              <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                👤 기본 정보
              </h4>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="홍길동"
                    defaultValue={admin?.name}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="admin@sapiens.com"
                    defaultValue={admin?.email}
                  />
                  <p className="text-xs text-gray-500 mt-2">로그인 ID로 사용됩니다</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="010-1234-5678"
                    defaultValue={admin?.phone}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    소속부서 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="예: 서비스운영팀"
                    defaultValue={admin?.department}
                  />
                </div>
              </div>
            </div>

            {/* 메뉴별 접근 권한 */}
            <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  🔐 메뉴별 접근 권한
                </h4>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => { handleSelectAll('read'); handleSelectAll('write'); }}
                    className="text-xs text-blue-600 hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    전체 선택
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    type="button"
                    onClick={() => { handleDeselectAll('read'); handleDeselectAll('write'); }}
                    className="text-xs text-gray-600 hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    전체 해제
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 pb-2 border-b border-gray-200">
                  <div className="col-span-6 text-sm text-gray-700" style={{ fontWeight: 600 }}>메뉴</div>
                  <div className="col-span-3 text-center text-sm text-gray-700" style={{ fontWeight: 600 }}>읽기 (조회)</div>
                  <div className="col-span-3 text-center text-sm text-gray-700" style={{ fontWeight: 600 }}>쓰기 (등록/수정/삭제)</div>
                </div>

                {/* Permission Rows */}
                {menuList.map(menu => (
                  <div key={menu.id} className="grid grid-cols-12 gap-2 items-center py-2 hover:bg-gray-50 rounded">
                    <div className="col-span-6 text-sm text-gray-900" style={{ fontWeight: 500 }}>
                      <span className="mr-2">{menu.icon}</span>{menu.label}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <input
                        type="checkbox"
                        checked={permissions[menu.id]?.read || false}
                        onChange={(e) => handlePermissionChange(menu.id, 'read', e.target.checked)}
                        className="w-4 h-4 text-[#000050] border-gray-300 rounded focus:ring-[#000050]"
                      />
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <input
                        type="checkbox"
                        checked={permissions[menu.id]?.write || false}
                        onChange={(e) => handlePermissionChange(menu.id, 'write', e.target.checked)}
                        className="w-4 h-4 text-[#000050] border-gray-300 rounded focus:ring-[#000050]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-900 mb-1" style={{ fontWeight: 600 }}>
                  💡 권한 설명
                </p>
                <ul className="space-y-0.5 text-xs text-blue-800" style={{ fontWeight: 400 }}>
                  <li>• <strong>읽기:</strong> 해당 메뉴 접근 및 데이터 조회 가능</li>
                  <li>• <strong>쓰기:</strong> 데이터 등록, 수정, 삭제 가능 (읽기 권한 포함)</li>
                  <li>• 쓰기 권한이 있으면 읽기 권한도 자동으로 부여됩니다</li>
                </ul>
              </div>
            </div>

            {/* 상태 및 비밀번호 */}
            <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-5">
              <h4 className="text-sm mb-4 text-gray-700 flex items-center gap-2" style={{ fontWeight: 600 }}>
                🔒 계정 상태
              </h4>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                    상태 <span className="text-red-500">*</span>
                  </label>
                  <select 
                    className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                    defaultValue={admin?.status || 'active'}
                  >
                    <option value="active">활성 - 로그인 가능</option>
                    <option value="inactive">비활성 - 로그인 불가</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    비활성 상태에서는 로그인할 수 없습니다
                  </p>
                </div>

                {mode === 'add' && (
                  <div>
                    <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      초기 비밀번호 <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="password" 
                      className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                      style={{ fontWeight: 500 }}
                      placeholder="8자 이상 (영문, 숫자, 특수문자 포함)"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      첫 로그인 시 비밀번호 변경을 요구합니다
                    </p>
                  </div>
                )}

                {mode === 'edit' && (
                  <div>
                    <label className="block text-sm text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      비밀번호 변경
                    </label>
                    <input 
                      type="password" 
                      className="w-full h-11 px-4 text-sm border-2 border-gray-300 rounded-xl bg-white placeholder:text-gray-400 hover:border-gray-400 focus:border-[#000050] focus:ring-4 focus:ring-[#000050]/10 transition-all duration-200"
                      style={{ fontWeight: 500 }}
                      placeholder="변경하지 않으려면 비워두세요"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      비워두면 기존 비밀번호가 유지됩니다
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 h-12 px-6 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              style={{ fontWeight: 500 }}
            >
              취소
            </button>
            <button 
              className="flex-1 h-12 px-6 text-sm text-white bg-[#000050] rounded-xl hover:bg-[#000070] active:scale-98 transition-all duration-200 shadow-lg shadow-[#000050]/20 hover:shadow-xl hover:shadow-[#000050]/30"
              style={{ fontWeight: 600 }}
            >
              {mode === 'add' ? '관리자 추가하기' : '관리자 수정하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}