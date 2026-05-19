import { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../utils/api';

const PRIMARY = '#2CB07B';
const DARK = '#000326';
const ERROR_COLOR = '#FF3B30';

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '52px',
  padding: '0 16px',
  borderRadius: '10px',
  border: '1.5px solid #E6E6E6',
  fontSize: '15px',
  color: DARK,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  color: '#444',
  marginBottom: '8px',
};

type ResultState = { type: 'success'; email: string; mode: 'id' | 'pw' } | { type: 'error' } | null;

const FindAccount = () => {
  const [tab, setTab] = useState<'id' | 'pw'>('id');
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', userId: '' });
  const [result, setResult] = useState<ResultState>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const getInputStyle = (key: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focusedField === key ? PRIMARY : '#E6E6E6',
  });

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tab === 'id') {
        await post('/auth/findId', {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
        });
        setResult({ type: 'success', email: formData.email, mode: 'id' });
      } else {
        await post('/auth/findPw', {
          userId: formData.userId,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
        });
        setResult({ type: 'success', email: formData.email, mode: 'pw' });
      }
    } catch {
      setResult({ type: 'error' });
    }
  };

  const switchTab = (t: 'id' | 'pw') => {
    setTab(t);
    setResult(null);
    setFormData({ name: '', phoneNumber: '', email: '', userId: '' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
      <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* 타이틀 */}
        <h1 style={{ fontSize: '22px', fontWeight: '900', color: DARK, textAlign: 'center', marginTop: '60px', marginBottom: '28px' }}>
          아이디 / 비밀번호 찾기
        </h1>

        {/* 탭 */}
        <div style={{ display: 'flex', borderBottom: '2px solid #E6E6E6', marginBottom: '36px' }}>
          {(['id', 'pw'] as const).map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{
                flex: 1, padding: '14px 0',
                fontSize: '15px', fontWeight: 'bold',
                color: tab === t ? PRIMARY : '#848484',
                backgroundColor: 'transparent', border: 'none',
                borderBottom: tab === t ? `3px solid ${PRIMARY}` : '3px solid transparent',
                marginBottom: '-2px', cursor: 'pointer',
                transition: 'color 0.15s',
              }}
            >
              {t === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
            </button>
          ))}
        </div>

        {/* 결과/에러 영역 */}
        {result?.type === 'error' && (
          <div style={{ textAlign: 'center', padding: '60px 0 40px', flex: 1 }}>
            <p style={{ fontSize: '17px', fontWeight: 'bold', color: ERROR_COLOR, lineHeight: '1.8' }}>
              최송합니다<br />입력하신 정보가 맞지 않습니다
            </p>
          </div>
        )}

        {result?.type === 'success' && (
          <div style={{ textAlign: 'center', padding: '60px 0 40px', flex: 1, fontSize: '16px', color: DARK, lineHeight: '1.8' }}>
            입력하신 이메일{' '}
            <span style={{ color: PRIMARY, fontWeight: 'bold' }}>{result.email}</span>
            {' '}주소로<br />
            {result.mode === 'id' ? '아이디가 발송 되었습니다' : '비밀번호가 발송 되었습니다'}
          </div>
        )}

        {/* 폼 */}
        {!result && (
          <form onSubmit={handleFind} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>

            {tab === 'pw' && (
              <div>
                <label style={labelStyle}>아이디를 입력하세요</label>
                <input
                  type="text"
                  value={formData.userId}
                  onChange={set('userId')}
                  onFocus={() => setFocusedField('userId')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('userId')}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>이름을 입력하세요</label>
              <input
                type="text"
                value={formData.name}
                onChange={set('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('name')}
              />
            </div>

            <div>
              <label style={labelStyle}>휴대폰 번호를 입력하세요</label>
              <input
                type="text"
                placeholder="010-0000-0000"
                value={formData.phoneNumber}
                onChange={set('phoneNumber')}
                onFocus={() => setFocusedField('phoneNumber')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('phoneNumber')}
              />
            </div>

            <div>
              <label style={labelStyle}>가입한 이메일을 입력하세요</label>
              <input
                type="email"
                value={formData.email}
                onChange={set('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('email')}
              />
            </div>
          </form>
        )}

        {/* 하단 버튼 영역 */}
        <div style={{ marginTop: 'auto', paddingBottom: '40px', paddingTop: '24px' }}>
          {result?.type === 'success' ? (
            <Link
              to="/"
              style={{
                display: 'block', width: '100%', height: '54px', lineHeight: '54px',
                backgroundColor: DARK, color: 'white', borderRadius: '40px',
                fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center',
              }}
            >
              로그인 하기
            </Link>
          ) : (
            <button
              type="button"
              onClick={(e) => handleFind(e as any)}
              style={{
                width: '100%', height: '54px', backgroundColor: DARK, color: 'white',
                borderRadius: '40px', fontSize: '16px', fontWeight: 'bold', border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {tab === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
            </button>
          )}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" style={{ fontSize: '14px', color: '#848484', textDecoration: 'none' }}>
              로그인으로 돌아가기
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FindAccount;
