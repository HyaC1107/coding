import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import CustomerLayout from '../../components/layout/CustomerLayout';

const CustomerMain = () => {
  const { auth } = useAuth();

  const { data: requestCount } = useQuery({
    queryKey: ['newRequests', auth?.userId],
    queryFn: () => get('/requests', { customerId: auth?.userId, status: 31 }).then((res: any[]) => res.length),
    enabled: !!auth?.userId,
  });

  return (
    <CustomerLayout>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          {auth?.name}님, 반갑습니다!
        </h1>
        <p style={{ color: 'var(--color-gray)' }}>현재 새로운 요청이 {requestCount || 0}건 있습니다.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Placeholder cards for main features */}
        <div style={cardStyle}>
          <h3>내 시공 일정</h3>
          <p>예정된 시공 일정을 확인하세요.</p>
        </div>
        <div style={cardStyle}>
          <h3>최근 메시지</h3>
          <p>채팅 내용을 확인하세요.</p>
        </div>
        <div style={cardStyle}>
          <h3>인기 업체</h3>
          <p>현재 가장 많이 찾는 시공업체입니다.</p>
        </div>
      </div>
    </CustomerLayout>
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

export default CustomerMain;
