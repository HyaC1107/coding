import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, postForm } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import CustomerLayout from '../../components/layout/CustomerLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const CustomerMyPage = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile', auth?.userId],
    queryFn: () => get(`/users/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => postForm(`/users/${auth?.userId}`, formData),
    onSuccess: () => {
      alert('프로필이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate(formData);
  };

  if (isLoading) return <CustomerLayout><p>로딩 중...</p></CustomerLayout>;

  return (
    <CustomerLayout>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px' }}>마이페이지</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '75px', backgroundColor: '#ddd', overflow: 'hidden' }}>
            {user?.profileImg && <img src={user.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <Button variant="outline">사진 변경</Button>
        </div>

        <form onSubmit={handleUpdate} style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Input label="이름" name="name" defaultValue={user?.name} />
          <Input label="닉네임" name="nickname" defaultValue={user?.nickname} />
          <Input label="이메일" name="email" defaultValue={user?.email} />
          <Input label="휴대폰 번호" name="phoneNumber" defaultValue={user?.phoneNumber} />
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <Button type="submit">저장하기</Button>
            <Button type="button" variant="gray">회원 탈퇴</Button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>고객 지원</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={supportCardStyle}>공지사항</div>
          <div style={supportCardStyle}>자주 묻는 질문</div>
          <div style={supportCardStyle}>1:1 문의하기</div>
        </div>
      </div>
    </CustomerLayout>
  );
};

const supportCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: 'var(--border-radius)',
  border: '1px solid #eee',
  textAlign: 'center',
  cursor: 'pointer'
};

export default CustomerMyPage;
