import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/customer/main', label: '홈', icon: '🏠' },
    { path: '/customer/pick', label: '업체찾기', icon: '🔍' },
    { path: '/customer/schedule', label: '일정관리', icon: '📅' },
    { path: '/customer/chat', label: '채팅', icon: '💬' },
    { path: '/customer/mypage', label: '마이페이지', icon: '👤' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar for desktop */}
      <aside style={{
        width: '240px',
        backgroundColor: 'var(--color-dark)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px', color: 'var(--color-primary)' }}>PICK</h1>
        
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--border-radius)',
                marginBottom: '8px',
                color: 'white',
                backgroundColor: isActive ? 'rgba(44, 176, 123, 0.2)' : 'transparent',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>{auth?.name}님 환영합니다</p>
          <button 
            onClick={handleLogout}
            style={{ 
              color: 'var(--color-gray)', 
              fontSize: '14px', 
              backgroundColor: 'transparent',
              textAlign: 'left'
            }}
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', backgroundColor: 'var(--color-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
