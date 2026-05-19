import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const ChatList = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['chatRooms', auth?.userId],
    queryFn: () => get('/chat/rooms', { userId: auth?.userId }),
    enabled: !!auth?.userId,
  });

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>채팅 목록</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#eee' }}>
        {isLoading ? (
          <div style={{ backgroundColor: 'white', padding: '20px' }}>로딩 중...</div>
        ) : rooms?.length > 0 ? (
          rooms.map((room: any) => {
            const otherParticipant = room.participants.find((p: any) => p._id !== auth?.userId);
            return (
              <div 
                key={room._id} 
                onClick={() => navigate(`${location.pathname}/${room._id}`)}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#ddd', overflow: 'hidden' }}>
                  {otherParticipant?.profileImg && <img src={otherParticipant.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontWeight: 'bold' }}>{otherParticipant?.name || '알 수 없음'}</h4>
                    <span style={{ fontSize: '12px', color: '#999' }}>{room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleDateString() : ''}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                    {room.lastMessage || '메시지가 없습니다.'}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ backgroundColor: 'white', padding: '40px', textAlign: 'center' }}>채팅 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
