import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ConstructorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/constructor/main', label: '홈', icon: '🏠' },
    { path: '/constructor/schedule', label: '일정관리', icon: '📅' },
    { path: '/constructor/chat', label: '채팅', icon: '💬' },
    { path: '/constructor/mypage', label: '마이페이지', icon: '👤' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
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
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px', color: '#416292' }}>PICK PARTNER</h1>
        
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
                backgroundColor: isActive ? 'rgba(65, 98, 146, 0.3)' : 'transparent',
                fontWeight: isActive ? 'bold' : 'normal'
              })}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>{auth?.name} 사장님</p>
          <button onClick={handleLogout} style={{ color: 'var(--color-gray)', fontSize: '14px', backgroundColor: 'transparent', textAlign: 'left' }}>
            로그아웃
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', backgroundColor: 'var(--color-light)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default ConstructorLayout;
