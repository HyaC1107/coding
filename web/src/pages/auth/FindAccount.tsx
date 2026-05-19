import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../utils/api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const FindAccount = () => {
  const [tab, setTab] = useState<'id' | 'pw'>('id');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    userId: '',
  });
  const [result, setResult] = useState<string | null>(null);

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tab === 'id') {
        const data = await post('/auth/findId', {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
        });
        setResult(`찾으시는 아이디는 [${data.userId}] 입니다.`);
      } else {
        const data = await post('/auth/findPw', {
          userId: formData.userId,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
        });
        setResult(data.message || '비밀번호 재설정 메일이 발송되었습니다.');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || '정보를 찾을 수 없습니다.');
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
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>계정 찾기</h1>

        <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid #eee' }}>
          <button 
            onClick={() => { setTab('id'); setResult(null); }}
            style={{ 
              flex: 1, 
              padding: '12px', 
              fontSize: '16px', 
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              color: tab === 'id' ? 'var(--color-primary)' : 'var(--color-gray)',
              borderBottom: tab === 'id' ? '2px solid var(--color-primary)' : 'none'
            }}
          >
            아이디 찾기
          </button>
          <button 
            onClick={() => { setTab('pw'); setResult(null); }}
            style={{ 
              flex: 1, 
              padding: '12px', 
              fontSize: '16px', 
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              color: tab === 'pw' ? 'var(--color-primary)' : 'var(--color-gray)',
              borderBottom: tab === 'pw' ? '2px solid var(--color-primary)' : 'none'
            }}
          >
            비밀번호 찾기
          </button>
        </div>

        {result ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '18px', marginBottom: '30px' }}>{result}</p>
            <Link to="/">
              <Button fullWidth variant="primary">로그인하러 가기</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFind}>
            {tab === 'pw' && (
              <Input 
                label="아이디" 
                placeholder="아이디를 입력해주세요" 
                value={formData.userId}
                onChange={e => setFormData({ ...formData, userId: e.target.value })}
              />
            )}
            <Input 
              label="이름" 
              placeholder="이름을 입력해주세요" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <Input 
              label="휴대폰 번호" 
              placeholder="010-0000-0000" 
              value={formData.phoneNumber}
              onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Input 
              label="이메일" 
              placeholder="이메일을 입력해주세요" 
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />

            <Button type="submit" fullWidth variant="dark" style={{ marginTop: '20px' }}>
              {tab === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FindAccount;
