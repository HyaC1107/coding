import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, patch } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import CustomerLayout from '../../components/layout/CustomerLayout';
import Button from '../../components/common/Button';

const statusTabs = [
  { label: '전체', value: 'all' },
  { label: '대기 중', value: '31' },
  { label: '확정됨', value: '33' },
  { label: '완료됨', value: '34' },
];

const CustomerSchedule = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['requests', activeTab, auth?.userId],
    queryFn: () => get('/requests', {
      customerId: auth?.userId,
      status: activeTab === 'all' ? undefined : activeTab,
    }),
    enabled: !!auth?.userId,
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      patch(`/requests/${id}/cancel`, { reason }),
    onSuccess: () => {
      alert('취소 요청이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  return (
    <CustomerLayout>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>일정 관리</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #eee' }}>
        {statusTabs.map(tab => (
          <button 
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: activeTab === tab.value ? 'bold' : 'normal',
              color: activeTab === tab.value ? 'var(--color-primary)' : 'var(--color-gray)',
              borderBottom: activeTab === tab.value ? '2px solid var(--color-primary)' : 'none',
              backgroundColor: 'transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : requests?.length > 0 ? (
          requests.map((req: any) => (
            <div key={req._id} style={requestCardStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={getStatusBadgeStyle(req.status)}>{getStatusLabel(req.status)}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{req.companyId?.companyName || '업체 정보 없음'}</h3>
                </div>
                <p style={{ color: '#444' }}><strong>시공 종류:</strong> {req.categories?.join(', ')}</p>
                <p style={{ color: '#444' }}><strong>희망 일시:</strong> {req.requestedDate} {req.requestedTime}</p>
                {req.confirmedDate && (
                  <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginTop: '8px' }}>
                    <strong>확정 일시:</strong> {req.confirmedDate} {req.confirmedTime}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                {req.status < 33 && (
                  <Button variant="outline" onClick={() => {
                    const reason = prompt('취소 사유를 입력해주세요.');
                    if (reason !== null) cancelMutation.mutate({ id: req._id, reason: reason || '고객 요청' });
                  }}>취소 요청</Button>
                )}
                {req.status === 34 && (
                  <Button variant="primary">리뷰 쓰기</Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>내역이 없습니다.</p>
        )}
      </div>
    </CustomerLayout>
  );
};

const requestCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: 'var(--border-radius)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  border: '1px solid #f0f0f0'
};

const getStatusBadgeStyle = (status: number): React.CSSProperties => {
  let color = 'var(--color-gray)';
  if (status === 31) color = '#EB701F'; // 대기
  if (status === 33) color = 'var(--color-primary)'; // 확정
  if (status === 34) color = 'var(--color-dark)'; // 완료
  if (status >= 41) color = '#FF3120'; // 취소
  
  return {
    backgroundColor: color,
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  };
};

const getStatusLabel = (status: number) => {
  const labels: Record<number, string> = {
    31: '확인 대기',
    32: '답변 대기',
    33: '일정 확정',
    34: '시공 완료',
    41: '취소 요청 중',
    42: '취소 완료',
    51: '변경 요청 중'
  };
  return labels[status] || '알 수 없음';
};

export default CustomerSchedule;
