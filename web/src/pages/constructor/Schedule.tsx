import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, patch } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import ConstructorLayout from '../../components/layout/ConstructorLayout';
import Button from '../../components/common/Button';

const statusTabs = [
  { label: '신규 요청', value: '31' },
  { label: '답변 대기', value: '32' },
  { label: '일정 확정', value: '33' },
  { label: '시공 완료', value: '34' },
  { label: '취소 요청', value: '41' },
  { label: '변경 요청', value: '51' },
];

const ConstructorSchedule = () => {
  const [activeTab, setActiveTab] = useState('31');
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['partnerRequests', activeTab, auth?.userId],
    queryFn: () => get('/requests', { companyId: auth?.userId, status: activeTab }),
    enabled: !!auth?.userId,
  });

  const transitionMutation = useMutation({
    mutationFn: ({ id, action, data }: { id: string; action: string; data?: object }) =>
      patch(`/requests/${id}/${action}`, data),
    onSuccess: () => {
      alert('상태가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['partnerRequests'] });
    },
    onError: () => alert('처리 중 오류가 발생했습니다.'),
  });

  const handleReject = (id: string) => {
    const reason = prompt('거절 사유를 입력해주세요.');
    if (reason === null) return;
    transitionMutation.mutate({ id, action: 'reject', data: { reason: reason || '업체 사정' } });
  };

  const handleSetSchedule = (id: string) => {
    const confirmedDate = prompt('방문 확정 날짜를 입력해주세요 (예: 2025-06-15)');
    if (!confirmedDate) return;
    const confirmedTime = prompt('방문 확정 시간을 입력해주세요 (예: AM 10:00)');
    if (!confirmedTime) return;
    transitionMutation.mutate({ id, action: 'setSchedule', data: { confirmedDate, confirmedTime } });
  };

  const handleCancelReject = (id: string) => {
    const reason = prompt('취소 거절 사유를 입력해주세요.');
    if (reason === null) return;
    transitionMutation.mutate({ id, action: 'cancel/reject', data: { reason: reason || '업체 사정' } });
  };

  const handleUpdateReject = (id: string) => {
    const reason = prompt('변경 거절 사유를 입력해주세요.');
    if (reason === null) return;
    transitionMutation.mutate({ id, action: 'update/reject', data: { reason: reason || '업체 사정' } });
  };

  return (
    <ConstructorLayout>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>일정 관리</h1>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '30px', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
        {statusTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: activeTab === tab.value ? 'bold' : 'normal',
              color: activeTab === tab.value ? '#416292' : 'var(--color-gray)',
              borderBottom: activeTab === tab.value ? '2px solid #416292' : 'none',
              backgroundColor: 'transparent',
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
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{req.customerId?.name || '고객'} 고객님</h3>
                </div>
                <p style={{ color: '#444' }}><strong>지역:</strong> {req.region}</p>
                <p style={{ color: '#444' }}><strong>시공 종류:</strong> {req.categories?.join(', ')}</p>
                <p style={{ color: '#444' }}><strong>희망 일시:</strong> {req.requestedDate} {req.requestedTime}</p>
                {req.confirmedDate && (
                  <p style={{ color: '#416292', fontWeight: 'bold', marginTop: '8px' }}>
                    <strong>확정 일시:</strong> {req.confirmedDate} {req.confirmedTime}
                  </p>
                )}
                {req.status === 51 && req.updateRequest && (
                  <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fff8f0', borderRadius: '6px', border: '1px solid #f0d0a0' }}>
                    <p style={{ fontWeight: 'bold', color: '#EB701F', marginBottom: '4px' }}>변경 요청 내용</p>
                    <p style={{ color: '#444' }}>변경 희망일: {req.updateRequest.newDate} {req.updateRequest.newTime}</p>
                    {req.updateRequest.reason && <p style={{ color: '#666', fontSize: '14px' }}>사유: {req.updateRequest.reason}</p>}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', minWidth: '120px' }}>
                {req.status === 31 && (
                  <>
                    <Button onClick={() => transitionMutation.mutate({ id: req._id, action: 'accept' })}>수락하기</Button>
                    <Button variant="outline" onClick={() => handleReject(req._id)}>거절하기</Button>
                  </>
                )}
                {req.status === 32 && (
                  <Button onClick={() => handleSetSchedule(req._id)}>방문 일정 확정</Button>
                )}
                {req.status === 33 && (
                  <Button onClick={() => transitionMutation.mutate({ id: req._id, action: 'complete' })}>시공 완료</Button>
                )}
                {req.status === 41 && (
                  <>
                    <Button onClick={() => transitionMutation.mutate({ id: req._id, action: 'cancel/accept' })}>취소 수락</Button>
                    <Button variant="outline" onClick={() => handleCancelReject(req._id)}>취소 거절</Button>
                  </>
                )}
                {req.status === 51 && (
                  <>
                    <Button onClick={() => transitionMutation.mutate({ id: req._id, action: 'update/accept' })}>변경 수락</Button>
                    <Button variant="outline" onClick={() => handleUpdateReject(req._id)}>변경 거절</Button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--color-gray)', textAlign: 'center', padding: '60px 0' }}>해당 상태의 요청이 없습니다.</p>
        )}
      </div>
    </ConstructorLayout>
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
  border: '1px solid #f0f0f0',
};

const getStatusBadgeStyle = (status: number): React.CSSProperties => {
  let color = 'var(--color-gray)';
  if (status === 31) color = '#EB701F';
  if (status === 32) color = '#999';
  if (status === 33) color = '#416292';
  if (status === 34) color = 'var(--color-dark)';
  if (status === 41) color = '#FF3120';
  if (status === 51) color = '#c58a00';
  return {
    backgroundColor: color,
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
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
    51: '변경 요청 중',
  };
  return labels[status] || '알 수 없음';
};

export default ConstructorSchedule;
