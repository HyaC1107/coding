import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get, BASE_URL, patch } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const PRIMARY = '#2CB07B';
const DARK = '#000326';
const ERROR = '#FF3120';

const menuItems = [
  { name: '공지사항', icon: '/images/07-mypage/02-customer/03-notice.png', path: '/customer/notice' },
  { name: '찜콕', icon: '/images/07-mypage/02-customer/12-pick.png', path: '/customer/pick' },
  { name: '리뷰관리', icon: '/images/07-mypage/02-customer/04-review.png', path: '/customer/reviews' },
  { name: '자주 묻는 질문', icon: '/images/07-mypage/02-customer/11-faq.png', path: '/customer/qna' },
  { name: '1:1 문의하기(불편, 업체신고 등)', icon: '/images/07-mypage/02-customer/02-qna.png', path: '/customer/qna' },
  { name: '회원정보 수정하기', icon: '/images/07-mypage/02-customer/13-info.png', path: '/customer/profile/edit' },
];

const CustomerMyPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ['userProfile', auth?.userId],
    queryFn: () => get(`/users/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  const handlePhoneUpdate = async () => {
    if (!newPhone) { alert('전화번호를 입력해주세요.'); return; }
    try {
      await patch(`/users/${auth?.userId}`, { phoneNumber: newPhone });
      refetch();
      setShowPhoneModal(false);
      setNewPhone('');
    } catch {
      alert('전화번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleWithdraw = async () => {
    try {
      await patch(`/users/${auth?.userId}`, { status: 'withdrawn' });
    } catch {
      // proceed anyway
    }
    logout();
    navigate('/');
  };

  if (isLoading) return <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484', fontWeight: 'bold' }}>로딩 중...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>

      {/* 프로필 배너 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        border: '1px solid #E6E6E6',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        {/* 설정 아이콘 */}
        <button
          onClick={() => navigate('/customer/profile/edit')}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#848484' }}
          title="회원정보 수정"
        >
          ⚙
        </button>
        <div style={{
          width: '72px', height: '72px', borderRadius: '999px',
          overflow: 'hidden', border: '2px solid #E6E6E6',
          backgroundColor: '#E0E0E0', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {user?.profileImg ? (
            <img
              src={`${BASE_URL}/${user.profileImg.replace(/\\/g, '/')}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Profile"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <span style={{ fontSize: '28px', color: '#AAAAAA' }}>👤</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: DARK, marginBottom: '8px' }}>
            {user?.nickname || user?.name || '사용자'} 님
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: DARK }}>
              {user?.phoneNumber || '010-0000-0000'}
            </span>
            <button
              onClick={() => setShowPhoneModal(true)}
              style={{
                backgroundColor: '#848484', color: 'white',
                fontSize: '11px', padding: '3px 10px', borderRadius: '4px',
                fontWeight: 'bold', border: 'none', cursor: 'pointer',
              }}
            >
              전화번호 변경
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
        {menuItems.map((item, idx) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '18px 24px',
              borderBottom: idx < menuItems.length - 1 ? '1px solid #F0F0F0' : 'none',
              textDecoration: 'none',
              backgroundColor: 'white',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
          >
            <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}>
              <img src={item.icon} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={item.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', flex: 1 }}>{item.name}</span>
            <img src="/images/next.png" style={{ width: '14px', opacity: 0.3 }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </Link>
        ))}
      </div>

      {/* 회원탈퇴 */}
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
          회원탈퇴하기
        </button>
      </div>

      {/* 전화번호 변경 모달 */}
      {showPhoneModal && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setShowPhoneModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px 28px', width: '100%', maxWidth: '380px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: DARK, marginBottom: '24px', textAlign: 'center' }}>전화번호 변경</h3>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: DARK, marginBottom: '8px' }}>새 전화번호</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
              style={{
                width: '100%', height: '52px', padding: '0 16px',
                borderRadius: '10px', border: `1.5px solid ${phoneFocus ? PRIMARY : '#E6E6E6'}`,
                fontSize: '15px', color: DARK, outline: 'none',
                boxSizing: 'border-box', marginBottom: '20px',
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setShowPhoneModal(false); setNewPhone(''); }}
                style={{ flex: 1, height: '50px', backgroundColor: '#F0F0F0', color: '#444', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                취소
              </button>
              <button
                onClick={handlePhoneUpdate}
                style={{ flex: 1, height: '50px', backgroundColor: PRIMARY, color: 'white', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 확인 모달 */}
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
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: DARK, marginBottom: '12px' }}>정말 탈퇴하시겠습니까?</h3>
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

export default CustomerMyPage;
