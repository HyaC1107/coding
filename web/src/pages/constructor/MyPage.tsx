import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get, BASE_URL } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const BrandColor = '#416292';
const DARK = '#000326';
const ERROR = '#FF3120';

const ConstructorMyPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState<string | null>(null);

  const { data: company, isLoading } = useQuery({
    queryKey: ['companyProfile', auth?.userId],
    queryFn: () => get(`/companies/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  const handleWithdraw = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: '공지사항', icon: '/images/07-mypage/02-customer/03-notice.png', path: '/constructor/notice', action: null },
    { name: '리뷰관리', icon: '/images/07-mypage/02-customer/04-review.png', path: '/constructor/reviews', action: null },
    { name: '우리가게 꾸미기', icon: '/images/07-mypage/01-company/13-deco.png', path: null, action: '우리가게 꾸미기' },
    { name: '광고결제', icon: '/images/07-mypage/01-company/04-pay.png', path: null, action: '광고결제' },
    { name: '업체정보 수정요청', icon: '/images/07-mypage/01-company/11-revise.png', path: null, action: '업체정보 수정요청' },
    { name: '자주 묻는 질문', icon: '/images/07-mypage/02-customer/11-faq.png', path: '/constructor/qna', action: null },
    { name: '1:1 문의하기/소비자 신고', icon: '/images/07-mypage/02-customer/02-qna.png', path: '/constructor/qna', action: null },
    { name: '회원정보 수정하기', icon: '/images/07-mypage/02-customer/13-info.png', path: '/constructor/profile/edit', action: null },
  ];

  if (isLoading) return <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484', fontWeight: 'bold' }}>로딩 중...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>

      {/* 프로필 배너 */}
      <div style={{
        backgroundColor: 'rgba(65,98,146,0.08)',
        borderRadius: '16px',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        border: '1px solid #E6E6E6',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '14px',
          overflow: 'hidden', border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          backgroundColor: '#E6E6E6', flexShrink: 0,
        }}>
          <img
            src={company?.profileImg ? `${BASE_URL}/${company.profileImg.replace(/\\/g, '/')}` : '/images/pick1.png'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Profile"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>
            {company?.companyName || '업체명 없음'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: DARK }}>
              {company?.phoneNumber || company?.userId?.phoneNumber || '전화번호 없음'}
            </span>
            <button
              onClick={() => navigate('/constructor/profile/edit')}
              style={{
                backgroundColor: BrandColor, color: 'white',
                fontSize: '11px', padding: '4px 12px', borderRadius: '999px',
                fontWeight: 'bold', border: 'none', cursor: 'pointer',
              }}
            >
              업체 정보 관리
            </button>
          </div>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #E6E6E6',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        {menuItems.map((item, idx) => {
          const rowStyle: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 24px',
            borderBottom: idx < menuItems.length - 1 ? '1px solid #F0F0F0' : 'none',
            textDecoration: 'none',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.15s',
            width: '100%', boxSizing: 'border-box' as const,
          };
          const inner = (
            <>
              <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}>
                <img src={item.icon} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={item.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', flex: 1 }}>{item.name}</span>
              <img src="/images/next.png" style={{ width: '14px', opacity: 0.3 }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </>
          );
          if (item.path) {
            return (
              <Link key={item.name} to={item.path} style={rowStyle}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
              >
                {inner}
              </Link>
            );
          }
          return (
            <button key={item.name} onClick={() => setShowComingSoon(item.action)} style={{ ...rowStyle, border: 'none', borderBottom: idx < menuItems.length - 1 ? '1px solid #F0F0F0' : 'none', textAlign: 'left' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {/* 파트너 탈퇴 */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px', paddingBottom: '32px' }}>
        <button
          onClick={() => setShowWithdrawConfirm(true)}
          style={{
            color: '#848484', fontSize: '13px', fontWeight: '500',
            background: 'none', border: 'none',
            borderBottom: '1px solid #848484',
            cursor: 'pointer', paddingBottom: '2px',
          }}
        >
          파트너 탈퇴하기
        </button>
      </div>

      {/* 서비스 준비 중 모달 */}
      {showComingSoon && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setShowComingSoon(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: 'white', borderRadius: '20px', padding: '36px 28px', width: '100%', maxWidth: '340px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', textAlign: 'center' }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔧</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: DARK, marginBottom: '10px' }}>{showComingSoon}</h3>
            <p style={{ fontSize: '14px', color: '#848484', lineHeight: '1.7', marginBottom: '28px' }}>
              해당 서비스는 현재 준비 중입니다.<br />곧 서비스될 예정입니다.
            </p>
            <button
              onClick={() => setShowComingSoon(null)}
              style={{ width: '100%', height: '50px', backgroundColor: BrandColor, color: 'white', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 탈퇴 확인 모달 */}
      {showWithdrawConfirm && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setShowWithdrawConfirm(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px 28px', width: '100%', maxWidth: '380px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', textAlign: 'center' }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: DARK, marginBottom: '12px' }}>파트너 탈퇴하시겠습니까?</h3>
            <p style={{ fontSize: '14px', color: '#848484', lineHeight: '1.7', marginBottom: '28px' }}>
              탈퇴 시 모든 데이터가 삭제되며<br />복구할 수 없습니다.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowWithdrawConfirm(false)}
                style={{ flex: 1, height: '50px', backgroundColor: '#F0F0F0', color: '#444', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                취소
              </button>
              <button
                onClick={handleWithdraw}
                style={{ flex: 1, height: '50px', backgroundColor: ERROR, color: 'white', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ConstructorMyPage;
