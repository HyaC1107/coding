import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, patch } from '../../utils/api';
import HeavyLayout from '../../components/layout/HeavyLayout';
import Button from '../../components/common/Button';

const HeavyToolRent = () => {
  const queryClient = useQueryClient();

  const { data: availableRequests, isLoading } = useQuery({
    queryKey: ['availableToolRequests'],
    queryFn: () => get('/tool-requests/available'),
  });

  const acceptMutation = useMutation({
    mutationFn: ({ id, confirmedDate, confirmedTime }: { id: string; confirmedDate: string; confirmedTime: string }) =>
      patch(`/tool-requests/${id}/accept`, { confirmedDate, confirmedTime }),
    onSuccess: () => {
      alert('렌탈 요청을 수락했습니다.');
      queryClient.invalidateQueries({ queryKey: ['availableToolRequests'] });
    },
    onError: () => alert('처리 중 오류가 발생했습니다.'),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      patch(`/tool-requests/${id}/reject`, { reason }),
    onSuccess: () => {
      alert('렌탈 요청을 거절했습니다.');
      queryClient.invalidateQueries({ queryKey: ['availableToolRequests'] });
    },
    onError: () => alert('처리 중 오류가 발생했습니다.'),
  });

  const handleAccept = (id: string) => {
    const confirmedDate = prompt('렌탈 시작 날짜를 입력해주세요 (예: 2025-06-15)');
    if (!confirmedDate) return;
    const confirmedTime = prompt('렌탈 시작 시간을 입력해주세요 (예: AM 09:00)');
    if (!confirmedTime) return;
    acceptMutation.mutate({ id, confirmedDate, confirmedTime });
  };

  const handleReject = (id: string) => {
    const reason = prompt('거절 사유를 입력해주세요.');
    if (reason === null) return;
    rejectMutation.mutate({ id, reason: reason || '업체 사정' });
  };

  return (
    <HeavyLayout>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>장비 렌탈 대기 목록</h1>
      <p style={{ color: 'var(--color-gray)', marginBottom: '30px' }}>시공업체들이 요청한 중장비 렌탈 목록입니다.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : availableRequests?.length > 0 ? (
          availableRequests.map((req: any) => (
            <div key={req._id} style={cardStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={typeBadgeStyle}>{req.heavyType}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{req.constructorId?.companyName || '시공업체'}</h3>
                </div>
                <p style={{ color: '#444' }}><strong>지역:</strong> {req.region}</p>
                <p style={{ color: '#444' }}><strong>기간:</strong> {req.startDate} ~ {req.endDate}</p>
                {req.carType && <p style={{ color: '#444' }}><strong>차종:</strong> {req.carType}</p>}
                {req.notes && <p style={{ color: '#666', marginTop: '8px', fontSize: '14px' }}><strong>요청사항:</strong> {req.notes}</p>}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button onClick={() => handleAccept(req._id)}>수락하기</Button>
                <Button variant="outline" onClick={() => handleReject(req._id)}>거절하기</Button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--color-gray)', textAlign: 'center', padding: '60px 0' }}>현재 대기 중인 렌탈 요청이 없습니다.</p>
        )}
      </div>
    </HeavyLayout>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: 'var(--border-radius)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid #f0f0f0',
};

const typeBadgeStyle: React.CSSProperties = {
  backgroundColor: '#EB701F',
  color: 'white',
  padding: '4px 10px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
};

export default HeavyToolRent;
