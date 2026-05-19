import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../../utils/api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    email: '',
    phoneNumber: '',
  });
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckId = async () => {
    if (!formData.userId) {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const data = await post('/auth/check', { userId: formData.userId });
      if (data.available) {
        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      alert('아이디 중복 확인에 실패했습니다.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIdChecked) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // Simple validation
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      await post('/auth/register', {
        userId: formData.userId,
        password: formData.password,
        name: formData.name,
        nickname: formData.nickname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        type: 'customer'
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>회원가입</h1>
        
        <form onSubmit={handleSignUp}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <Input 
                label="아이디" 
                placeholder="아이디를 입력해주세요" 
                value={formData.userId}
                onChange={(e) => {
                  setFormData({ ...formData, userId: e.target.value });
                  setIsIdChecked(false);
                }}
              />
            </div>
            <Button type="button" variant="primary" style={{ marginBottom: '16px' }} onClick={handleCheckId}>
              중복확인
            </Button>
          </div>

          <Input 
            label="비밀번호" 
            type="password" 
            placeholder="비밀번호를 입력해주세요" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input 
            label="비밀번호 확인" 
            type="password" 
            placeholder="비밀번호를 다시 한번 입력해주세요" 
            value={formData.passwordConfirm}
            onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
            error={formData.passwordConfirm && formData.password !== formData.passwordConfirm ? '비밀번호가 일치하지 않습니다.' : ''}
          />

          <Input 
            label="이름" 
            placeholder="이름을 입력해주세요" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input 
            label="닉네임" 
            placeholder="닉네임을 입력해주세요" 
            value={formData.nickname}
            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          />
          <Input 
            label="이메일" 
            type="email" 
            placeholder="이메일을 입력해주세요" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input 
            label="휴대폰 번호" 
            placeholder="010-0000-0000" 
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />

          <Button type="submit" fullWidth variant="dark" style={{ marginTop: '20px' }}>회원가입 완료</Button>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/signup/partner" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
              파트너 회원가입은 여기로 {'>'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
