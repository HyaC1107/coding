import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { post } from '../../utils/api';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'customer' | 'partner'>('customer');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMsg('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    try {
      setErrorMsg('');
      const data = await post('/auth/login', { userId, password });
      login({ token: data.token, userId: data.userId, name: data.name, type: data.type });
      if (data.type === 'customer') navigate('/customer/main');
      else if (data.type === 'constructor') navigate('/constructor/main');
      else if (data.type === 'heavy') navigate('/heavy/main');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || '로그인이 되지 않습니다 아이디와 비밀번호를 다시 입력하세요');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-['Noto_Sans_KR'] px-6">
      <div className="w-full max-w-[470px] flex flex-col items-center" style={{ gap: 0 }}>

        {/* 회원 / 파트너 선택 */}
        <div className="flex justify-center gap-12" style={{ marginBottom: '48px' }}>
          {(['customer', 'partner'] as const).map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <img
                src={type === t ? '/images/circlecolor.png' : '/images/circlegrey.png'}
                className="w-[30px] h-[30px] object-contain"
                alt=""
              />
              <input type="radio" className="hidden" checked={type === t} onChange={() => setType(t)} />
              <span className={`text-[20px] ${type === t ? 'text-dark font-bold' : 'text-gray'}`}>
                {t === 'customer' ? '회원' : '파트너'}
              </span>
            </label>
          ))}
        </div>

        {/* 타이틀 */}
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 className="text-[32px] leading-snug text-dark font-medium tracking-tight">
            시공전문가 찾고 <span className="text-primary font-bold">픽!</span> 할 땐
          </h1>
        </div>

        {/* 입력창 */}
        <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center" style={{ opacity: 0.5 }}>
              <img src="/images/person.png" className="max-w-full max-h-full" alt="" />
            </div>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              style={{ paddingLeft: '52px' }}
              className="w-full h-[59px] pr-4 rounded-lg border-2 border-gainsboro focus:border-primary outline-none text-[17px] placeholder:text-darkgray tracking-tight"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center" style={{ opacity: 0.5 }}>
              <img src="/images/lock.png" className="max-w-full max-h-full" alt="" />
            </div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              style={{ paddingLeft: '52px' }}
              className="w-full h-[59px] pr-4 rounded-lg border-2 border-gainsboro focus:border-primary outline-none text-[17px] placeholder:text-darkgray tracking-tight"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className="w-full" style={{ minHeight: '24px', marginBottom: '24px' }}>
          {errorMsg && (
            <p className="text-[15px] text-error tracking-tight px-1">{errorMsg}</p>
          )}
        </div>

        {/* 자동로그인 + 찾기 */}
        <div className="w-full flex justify-between items-center" style={{ marginBottom: '36px' }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <img src="/images/check.png" className="w-[20px] h-[20px] object-contain" alt="" />
            <input type="checkbox" className="hidden" />
            <span className="text-[19px] text-gray">자동로그인</span>
          </label>
          <Link to="/find-account" className="text-[19px] text-gray hover:text-dark">
            아이디 / 비밀번호 찾기
          </Link>
        </div>

        {/* 회원가입 링크 */}
        <div style={{ marginBottom: '48px' }}>
          <Link to="/signup" className="text-[17px] text-gray hover:text-dark">
            회원 / 파트너 회원가입
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-[220px] h-[44px] bg-dark text-white rounded-[40px] text-[17px] font-bold hover:opacity-90 transition-opacity"
        >
          로그인
        </button>

      </div>
    </div>
  );
};

export default Login;
