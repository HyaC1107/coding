import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, postForm } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import HeavyLayout from '../../components/layout/HeavyLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const HeavyMyPage = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery({
    queryKey: ['heavyProfile', auth?.userId],
    queryFn: () => get(`/companies/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => postForm(`/companies/${auth?.userId}`, formData),
    onSuccess: () => {
      alert('업체 정보가 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['heavyProfile'] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate(formData);
  };

  if (isLoading) return <HeavyLayout><p>로딩 중...</p></HeavyLayout>;

  return (
    <HeavyLayout>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px' }}>마이페이지</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '10px', backgroundColor: '#ddd', overflow: 'hidden' }}>
            {company?.profileImg && <img src={company.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <Button variant="outline">로고 변경</Button>
        </div>

        <form onSubmit={handleUpdate} style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Input label="업체명" name="companyName" defaultValue={company?.companyName} />
          <Input label="중장비 종류" name="heavyType" defaultValue={company?.heavyType} />
          <Input label="대표번호" name="phoneNumber" defaultValue={company?.userId?.phoneNumber} />
          <Input label="지역" name="region" defaultValue={company?.region} />
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <Button type="submit">저장하기</Button>
            <Button type="button" variant="gray">광고 관리</Button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>파트너 메뉴</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div style={supportCardStyle}>공지사항</div>
          <div style={supportCardStyle}>리뷰 관리</div>
          <div style={supportCardStyle}>입찰 관리</div>
          <div style={supportCardStyle}>고객 센터</div>
        </div>
      </div>
    </HeavyLayout>
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

export default HeavyMyPage;
