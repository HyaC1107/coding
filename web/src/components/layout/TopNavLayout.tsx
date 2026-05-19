import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TopNavLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = {
    customer: [
      { path: '/customer/pick', label: '업체찾기' },
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

  const currentNavItems = auth ? navItems[auth.type] : [];

  return (
    <div className="min-h-screen flex flex-col font-['Noto_Sans_KR']">
      {/* Top Utility Bar */}
      <div className="h-[50px] bg-white border-b flex items-center justify-center">
        <div className="max-w-[1200px] w-full px-4 flex justify-end items-center gap-6 text-[13px] text-dark">
          <button className="flex items-center gap-1">
            <img src="/images/bell.png" className="w-4 h-4" alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
            알림
          </button>
          {auth ? (
            <span className="font-bold">{auth.name}님</span>
          ) : (
            <Link to="/" className="hover:text-primary">로그인</Link>
          )}
          {!auth && <Link to="/signup" className="hover:text-primary">회원가입</Link>}
          {auth && (
            <button onClick={handleLogout} className="text-gray hover:text-dark">로그아웃</button>
          )}
          <button className="bg-dark text-white px-3 py-1 rounded-full text-[12px]">앱다운로드</button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="h-[60px] bg-white border-b flex items-center justify-center sticky top-0 z-50">
        <div className="max-w-[1200px] w-full px-4 flex items-center">
          <Link to={auth ? `/${auth.type}/main` : '/'} className="text-[28px] font-black text-primary mr-20">
            PICK
          </Link>
          <nav className="flex gap-10">
            {currentNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-[17px] font-medium transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-dark hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Location Bar */}
      <div className="h-[45px] bg-gray-50 border-b flex items-center justify-center">
        <div className="max-w-[1200px] w-full px-4 flex items-center gap-2 text-[14px] text-dark">
          <span className="text-[18px]">📍</span>
          <span className="font-medium">서울특별시 마포구 도화동 00-1</span>
          <span className="text-[10px] ml-1">▼</span>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 bg-[#F6F6F6]">
        <div className="max-w-[1200px] mx-auto py-10 px-4">
          {children}
        </div>
      </main>
    </div>
  );
};

// Internal Link component to avoid import issues if not provided by caller
import { Link } from 'react-router-dom';

export default TopNavLayout;
