import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { post } from '../../utils/api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', justifyContent: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              checked={type === 'customer'} 
              onChange={() => setType('customer')} 
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <span style={{ fontSize: '18px', fontWeight: type === 'customer' ? 'bold' : 'normal' }}>회원</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              checked={type === 'partner'} 
              onChange={() => setType('partner')} 
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <span style={{ fontSize: '18px', fontWeight: type === 'partner' ? 'bold' : 'normal' }}>파트너</span>
          </label>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            시공전문가 찾고 <span style={{ color: 'var(--color-primary)' }}>픽!</span> 할땐
          </h1>
          <h2 style={{ fontSize: '32px', fontWeight: '900', marginTop: '10px' }}>PICK</h2>
        </div>

        <form onSubmit={handleLogin}>
          <Input 
            placeholder="아이디를 입력해주세요" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="비밀번호를 입력해주세요" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-gray)' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-primary)' }} />
              자동로그인
            </label>
            <Link to="/find-account" style={{ fontSize: '14px', color: 'var(--color-gray)' }}>
              아이디 / 비밀번호찾기
            </Link>
          </div>

          <Button type="submit" fullWidth variant="dark" style={{ marginBottom: '16px' }}>로그인</Button>
          
          <Link to="/signup">
            <Button fullWidth variant="outline">회원 / 파트너 회원가입</Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
