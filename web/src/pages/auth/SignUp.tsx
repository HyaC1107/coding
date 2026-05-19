import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../../utils/api';

const PRIMARY = '#2CB07B';
const DARK = '#000326';
const ERROR = '#FF3120';

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
  fontSize: '13px',
  fontWeight: 'bold',
  color: DARK,
  marginBottom: '8px',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    userId: '', password: '', passwordConfirm: '',
    name: '', nickname: '', email: '', phoneNumber: '',
  });
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [key]: e.target.value }));
    if (key === 'userId') setIsIdChecked(false);
  };

  const getInputStyle = (key: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focusedField === key ? PRIMARY : '#E6E6E6',
  });

  const handleCheckId = async () => {
    if (!formData.userId) { alert('아이디를 입력해주세요.'); return; }
    try {
      const data = await post('/auth/check', { userId: formData.userId });
      if (data.available) { alert('사용 가능한 아이디입니다.'); setIsIdChecked(true); }
      else alert('이미 사용 중인 아이디입니다.');
    } catch { alert('아이디 중복 확인에 실패했습니다.'); }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIdChecked) { alert('아이디 중복 확인을 해주세요.'); return; }
    if (formData.password !== formData.passwordConfirm) { alert('비밀번호가 일치하지 않습니다.'); return; }
    if (!formData.name || !formData.email || !formData.phoneNumber) { alert('모든 필수 항목을 입력해주세요.'); return; }
    try {
      await post('/auth/register', { ...formData, type: 'customer' });
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  const pwMismatch = formData.passwordConfirm.length > 0 && formData.password !== formData.passwordConfirm;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 24px 80px' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        {/* 타이틀 */}
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: DARK, textAlign: 'center', marginBottom: '36px' }}>회원가입</h1>

        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* 아이디 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>아이디 <span style={{ color: ERROR }}>*</span></label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                value={formData.userId}
                onChange={set('userId')}
                onFocus={() => setFocusedField('userId')}
                onBlur={() => setFocusedField(null)}
                style={{ ...getInputStyle('userId'), flex: 1 }}
              />
              <button
                type="button"
                onClick={handleCheckId}
                style={{
                  height: '52px', padding: '0 18px', flexShrink: 0,
                  backgroundColor: isIdChecked ? '#848484' : PRIMARY,
                  color: 'white', borderRadius: '10px', border: 'none',
                  fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {isIdChecked ? '확인완료' : '중복확인'}
              </button>
            </div>
            {isIdChecked && (
              <p style={{ fontSize: '12px', color: PRIMARY, marginTop: '6px' }}>✓ 사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>비밀번호 <span style={{ color: ERROR }}>*</span></label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              onChange={set('password')}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('password')}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>비밀번호 확인 <span style={{ color: ERROR }}>*</span></label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={formData.passwordConfirm}
              onChange={set('passwordConfirm')}
              onFocus={() => setFocusedField('passwordConfirm')}
              onBlur={() => setFocusedField(null)}
              style={{ ...getInputStyle('passwordConfirm'), borderColor: pwMismatch ? ERROR : focusedField === 'passwordConfirm' ? PRIMARY : '#E6E6E6' }}
            />
            {pwMismatch && (
              <p style={{ fontSize: '12px', color: ERROR, marginTop: '6px' }}>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          {/* 구분선 */}
          <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }} />

          {/* 이름 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>이름 <span style={{ color: ERROR }}>*</span></label>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={set('name')}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('name')}
            />
          </div>

          {/* 닉네임 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>닉네임 <span style={{ color: '#AAAAAA', fontWeight: 'normal' }}>(선택)</span></label>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={formData.nickname}
              onChange={set('nickname')}
              onFocus={() => setFocusedField('nickname')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('nickname')}
            />
          </div>

          {/* 이메일 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>이메일 <span style={{ color: ERROR }}>*</span></label>
            <input
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={set('email')}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('email')}
            />
          </div>

          {/* 휴대폰 */}
          <div style={fieldStyle}>
            <label style={labelStyle}>휴대폰 번호 <span style={{ color: ERROR }}>*</span></label>
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

          {/* 제출 버튼 */}
          <div style={{ marginTop: '8px' }}>
            <button
              type="submit"
              style={{
                width: '100%', height: '54px', backgroundColor: DARK, color: 'white',
                borderRadius: '40px', fontSize: '16px', fontWeight: 'bold', border: 'none',
                cursor: 'pointer', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              회원가입 완료
            </button>
          </div>
        </form>

        {/* 하단 링크 */}
        <div style={{ textAlign: 'center', marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/signup/partner" style={{ fontSize: '14px', color: PRIMARY, fontWeight: 'bold', textDecoration: 'none' }}>
            파트너 회원가입은 여기로 →
          </Link>
          <Link to="/" style={{ fontSize: '14px', color: '#848484', textDecoration: 'none' }}>
            로그인으로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
