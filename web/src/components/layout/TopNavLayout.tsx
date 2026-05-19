import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Notifications from '../../pages/common/Notifications';

declare global {
  interface Window { daum: any; }
}

const TopNavLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState('주소를 입력해주세요');
  const [showNotiModal, setShowNotiModal] = useState(false);

  // 주소 바는 시공PICK 페이지에서만 표시
  const showAddressBar = ['/customer/pick', '/customer/main'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAddressSearch = () => {
    if (window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address);
        },
      }).open();
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const navItems = {
    customer: [
      { path: '/customer/main', label: '업체찾기' },
      { path: '/customer/pick', label: '시공PICK' },
      { path: '/customer/schedule', label: '스케줄' },
      { path: '/customer/chat', label: 'TALK' },
      { path: '/customer/mypage', label: '마이페이지' },
    ],
    constructor: [
      { path: '/constructor/schedule', label: '스케줄' },
      { path: '/constructor/chat', label: 'TALK' },
      { path: '/constructor/mypage', label: '마이페이지' },
    ],
    heavy: [
      { path: '/heavy/schedule', label: '스케줄' },
      { path: '/heavy/tool-rent', label: '장비렌탈' },
      { path: '/heavy/chat', label: 'TALK' },
      { path: '/heavy/mypage', label: '마이페이지' },
    ],
  };

  const currentNavItems = auth ? navItems[auth.type as keyof typeof navItems] ?? [] : [];

  return (
    <div className="min-h-screen flex flex-col font-['Noto_Sans_KR'] bg-[#F6F6F6]">

      {/* 다음 주소 API 스크립트 */}
      <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />

      {/* 상단 유틸리티 바 — 전체 오른쪽 정렬 */}
      <div className="bg-white border-b border-gainsboro">
        <div style={{ width: '100%', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', paddingRight: '40px', fontSize: '12px', color: '#848484' }}>
          <button
            onClick={() => setShowNotiModal(true)}
            className="flex items-center gap-1.5 hover:text-dark transition-colors"
          >
            <img src="/images/bell.png" className="w-[14px] h-[14px]" alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
            알림
          </button>
          <div className="w-px h-3 bg-gainsboro" />
          {auth ? (
            <span className="font-bold text-dark">{auth.name}님</span>
          ) : (
            <Link to="/" className="hover:text-dark transition-colors">로그인</Link>
          )}
          <div className="w-px h-3 bg-gainsboro" />
          {auth ? (
            <button onClick={handleLogout} className="hover:text-dark transition-colors">로그아웃</button>
          ) : (
            <Link to="/signup" className="hover:text-dark transition-colors">회원가입</Link>
          )}
          <div className="w-px h-3 bg-gainsboro" />
          <button className="bg-dark text-white px-5 py-2 rounded-full text-[12px] font-bold hover:opacity-80 transition-opacity">
            앱다운로드
          </button>
        </div>
      </div>

      {/* 네비게이션 바 — PICK 로고 제거, 메뉴만 중앙 */}
      <div className="bg-white border-b border-gainsboro sticky top-0 z-50 shadow-sm">
        <div className="w-full h-[60px] flex items-center justify-center">
          <nav className="flex items-center gap-10">
            {currentNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-[16px] font-medium transition-colors whitespace-nowrap px-1 py-1 ${
                    isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-dark hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* 위치 바 — 시공PICK 페이지에서만 표시 */}
      {showAddressBar && (
        <div className="bg-white border-b border-gainsboro">
          <div className="w-full h-[44px] flex items-center justify-center">
            <button
              onClick={openAddressSearch}
              className="flex items-center gap-2 text-[14px] text-dark hover:text-primary transition-colors"
            >
              <span className="text-[16px]">📍</span>
              <span className="font-medium">{address}</span>
              <img src="/images/triangle.png" className="w-[8px] opacity-40" alt="" />
            </button>
          </div>
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[960px] bg-white shadow-sm">
          {children}
        </div>
      </main>

      {/* 알림 모달 */}
      {showNotiModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
          }}
          onClick={() => setShowNotiModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '400px', maxHeight: '80vh',
              backgroundColor: 'white',
              borderRadius: '0 0 16px 16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              overflowY: 'auto',
              marginRight: '40px',
            }}
          >
            {/* 모달 헤더 */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px', borderBottom: '1px solid #F0F0F0',
              position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1,
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000326' }}>알림</span>
              <button
                onClick={() => setShowNotiModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#848484', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            {/* 알림 목록 */}
            <Notifications />
          </div>
        </div>
      )}

    </div>
  );
};

export default TopNavLayout;
