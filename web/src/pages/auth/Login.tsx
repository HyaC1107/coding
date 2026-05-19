import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { post } from '../../utils/api';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'customer' | 'partner'>('customer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const data = await post('/auth/login', { userId, password });
      login({
        token: data.token,
        userId: data.userId,
        name: data.name,
        type: data.type,
      });

      if (data.type === 'customer') navigate('/customer/main');
      else if (data.type === 'constructor') navigate('/constructor/main');
      else if (data.type === 'heavy') navigate('/heavy/main');
    } catch (error: any) {
      alert(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-['Noto_Sans_KR']">
      <div className="w-full max-w-[470px] px-6">
        {/* User Type Selection */}
        <div className="flex justify-center gap-10 mb-12">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative w-6 h-6">
              <img 
                src={type === 'customer' ? '/images/circlecolor.png' : '/images/circlegrey.png'} 
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <input 
              type="radio" 
              className="hidden"
              checked={type === 'customer'} 
              onChange={() => setType('customer')} 
            />
            <span className={`text-[19px] ${type === 'customer' ? 'text-dark font-bold' : 'text-gray'}`}>회원</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative w-6 h-6">
              <img 
                src={type === 'partner' ? '/images/circlecolor.png' : '/images/circlegrey.png'} 
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <input 
              type="radio" 
              className="hidden"
              checked={type === 'partner'} 
              onChange={() => setType('partner')} 
            />
            <span className={`text-[19px] ${type === 'partner' ? 'text-dark font-bold' : 'text-gray'}`}>파트너</span>
          </label>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] leading-tight text-dark font-medium tracking-tight">
            시공전문가 찾고 <span className="text-primary font-bold">픽!</span> 할 땐
          </h1>
          <h2 className="text-[40px] font-black text-dark tracking-tighter mt-1">PICK</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center opacity-50">
              <img src="/images/person.png" className="max-w-full max-h-full" alt="" />
            </div>
            <input 
              type="text"
              placeholder="아이디를 입력해주세요" 
              className="w-full h-[60px] pl-14 pr-4 rounded-lg border-2 border-gainsboro focus:border-primary outline-none transition-colors text-[17px] placeholder:text-darkgray"
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center opacity-50">
              <img src="/images/lock.png" className="max-w-full max-h-full" alt="" />
            </div>
            <input 
              type="password" 
              placeholder="비밀번호를 입력해주세요" 
              className="w-full h-[60px] pl-14 pr-4 rounded-lg border-2 border-gainsboro focus:border-primary outline-none transition-colors text-[17px] placeholder:text-darkgray"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Utils */}
          <div className="flex justify-between items-center py-2 px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="/images/check.png" className="w-full h-full object-contain opacity-70" alt="" />
              </div>
              <input type="checkbox" className="hidden" />
              <span className="text-[17px] text-gray">자동로그인</span>
            </label>
            <Link to="/find-account" className="text-[17px] text-gray hover:text-dark">
              아이디 / 비밀번호 찾기
            </Link>
          </div>

          {/* Buttons */}
          <div className="pt-6 space-y-4 flex flex-col items-center">
            <button 
              type="submit" 
              className="w-[220px] h-[44px] bg-dark text-white rounded-[40px] text-[17px] font-bold hover:opacity-90 transition-opacity"
            >
              로그인
            </button>
            
            <Link to="/signup" className="text-[17px] text-[#444] font-medium border-b border-[#444] pb-0.5">
              회원 / 파트너 회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
