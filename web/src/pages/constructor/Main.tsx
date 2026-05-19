import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import ConstructorLayout from '../../components/layout/ConstructorLayout';

const ConstructorMain = () => {
  const { auth } = useAuth();

  const { data: requestCount } = useQuery({
    queryKey: ['newRequestsPartner', auth?.userId],
    queryFn: () => get('/requests', { companyId: auth?.userId, status: 31 }).then((res: any[]) => res.length),
    enabled: !!auth?.userId,
  });

  return (
    <ConstructorLayout>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          {auth?.name} 사장님, 안녕하세요!
        </h1>
        <p style={{ color: 'var(--color-gray)' }}>현재 새로 접수된 시공 요청이 {requestCount || 0}건 있습니다.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={cardStyle}>
          <h3>오늘의 시공 일정</h3>
          <p>오늘 방문 예정인 고객님들을 확인하세요.</p>
        </div>
        <div style={cardStyle}>
          <h3>미답변 채팅</h3>
          <p>고객님들의 문의에 답변해주세요.</p>
        </div>
        <div style={cardStyle}>
          <h3>장비 렌탈 현황</h3>
          <p>임대한 중장비 일정을 확인하세요.</p>
        </div>
      </div>
    </ConstructorLayout>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: 'var(--border-radius)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

export default ConstructorMain;
