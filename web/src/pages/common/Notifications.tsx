import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, patch } from '../../utils/api';

const Notifications = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => get('/notifications'),
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const readAllMutation = useMutation({
    mutationFn: () => patch('/notifications/read-all'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  return (
    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>알림</h1>
        <button
          onClick={() => readAllMutation.mutate()}
          style={{ color: 'var(--color-primary)', fontSize: '14px', backgroundColor: 'transparent' }}
        >
          전체 읽음 처리
        </button>
      </div>

      {isLoading ? <p>로딩 중...</p> : notifications?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#eee' }}>
          {notifications.map((noti: any) => (
            <div
              key={noti._id}
              onClick={() => !noti.isRead && readMutation.mutate(noti._id)}
              style={{
                backgroundColor: noti.isRead ? 'white' : '#f0f9f4',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <h4 style={{ fontWeight: 'bold', color: noti.isRead ? '#666' : 'var(--color-dark)' }}>{noti.title}</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>{noti.message}</p>
              <span style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{new Date(noti.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      ) : <p>알림이 없습니다.</p>}
    </div>
  );
};

export default Notifications;
