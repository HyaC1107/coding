import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const PRIMARY = '#2CB07B';
const DARK = '#000326';

const CATEGORY_TABS = [
  '전체', '3D도면', '종합인테리어', '철거', '소방설비',
  '설비', '전기', '샤시', '목공', '욕실', '타일', '페인트',
  '마루', '필름', '도배', '조명', '장판', '싱크', '닥트',
  '금속공사', '간판', '냉난방', 'CCTV', '청소',
];

const dummyRooms = [
  { _id: 'r1', otherName: '한마음인테리어', otherImg: '', lastMessage: '안녕하세요 고객님', lastMessageAt: new Date().toISOString(), unread: 10 },
  { _id: 'r2', otherName: '스타인테리어', otherImg: '/images/dummy/company2.jpg', lastMessage: '안녕하세요 고객님', lastMessageAt: '2023-05-01T09:00:00.000Z', unread: 1 },
  { _id: 'r3', otherName: '코지인테리어', otherImg: '/images/dummy/company3.jpg', lastMessage: '안녕하세요 고객님', lastMessageAt: '2023-05-02T09:00:00.000Z', unread: 1 },
  { _id: 'r4', otherName: '미가인테리어', otherImg: '/images/dummy/company4.jpg', lastMessage: '다른 시공업체를 선택하셨습니다 업체와 대화가...', lastMessageAt: '2023-05-02T09:00:00.000Z', unread: 0 },
];

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `오전 ${h}:${m}`;
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const ChatList = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('전체');

  const { data: rooms } = useQuery({
    queryKey: ['chatRooms', auth?.userId],
    queryFn: () => get('/chat/rooms', { userId: auth?.userId }),
    enabled: !!auth?.userId,
  });

  const basePath = auth?.type === 'customer' ? '/customer' : auth?.type === 'constructor' ? '/constructor' : '/heavy';

  // participants는 string[] (userId 배열) → 상대방 ID 추출
  const displayRooms = rooms?.length ? rooms.map((room: any) => {
    const otherId = (room.participants as string[])?.find(id => id !== auth?.userId);
    return {
      _id: room._id,
      otherName: otherId || '알 수 없음',
      otherImg: '',
      lastMessage: room.lastMessage || '메시지가 없습니다.',
      lastMessageAt: room.lastMessageAt || '',
      unread: 0,
    };
  }) : dummyRooms;

  return (
    <div>
      {/* 카테고리 탭 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', overflowX: 'auto', borderBottom: '1px solid #E6E6E6', padding: '0 8px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '14px 10px', fontSize: '18px', color: PRIMARY, flexShrink: 0 }}
        >
          ‹
        </button>
        {CATEGORY_TABS.map(cat => {
          const badge = cat === '종합인테리어' ? 9 : cat === '철거' ? 11 : 0;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                position: 'relative', padding: '14px 14px', whiteSpace: 'nowrap',
                fontSize: '13px', fontWeight: activeCategory === cat ? 'bold' : '500',
                color: activeCategory === cat ? PRIMARY : '#848484',
                borderBottom: activeCategory === cat ? `2px solid ${PRIMARY}` : '2px solid transparent',
                backgroundColor: 'transparent', border: 'none',
                borderBottomStyle: 'solid', borderBottomWidth: '2px',
                borderBottomColor: activeCategory === cat ? PRIMARY : 'transparent',
                marginBottom: '-1px', cursor: 'pointer', flexShrink: 0,
              }}
            >
              {cat}
              {badge > 0 && (
                <span style={{
                  position: 'absolute', top: '6px', right: '2px',
                  backgroundColor: '#FF3B30', color: 'white',
                  fontSize: '9px', fontWeight: 'bold',
                  borderRadius: '999px', minWidth: '16px', height: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 3px',
                }}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 채팅 목록 */}
      <div>
        {displayRooms.map((room: any) => (
          <div
            key={room._id}
            onClick={() => navigate(`${basePath}/chat/${room._id}`, { state: { otherName: room.otherName, otherImg: room.otherImg } })}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 24px',
              borderBottom: '1px solid #F0F0F0',
              cursor: 'pointer', backgroundColor: 'white',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
          >
            {/* 아바타 */}
            <div style={{
              width: '52px', height: '52px', borderRadius: '999px',
              overflow: 'hidden', border: '1px solid #E6E6E6',
              backgroundColor: '#E0E0E0', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {room.otherImg ? (
                <img src={room.otherImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              ) : (
                <span style={{ fontSize: '22px', color: '#AAAAAA' }}>👤</span>
              )}
            </div>

            {/* 내용 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: DARK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {room.otherName}
                </h4>
                <span style={{ fontSize: '12px', color: '#848484', flexShrink: 0, marginLeft: '10px' }}>
                  {room.lastMessageAt ? formatTime(room.lastMessageAt) : ''}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#848484', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {room.lastMessage}
              </p>
            </div>

            {/* 읽지 않음 배지 */}
            {room.unread > 0 && (
              <div style={{
                backgroundColor: '#FF3B30', color: 'white',
                fontSize: '12px', fontWeight: 'bold',
                borderRadius: '999px', minWidth: '22px', height: '22px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 5px', flexShrink: 0,
              }}>
                {room.unread}
              </div>
            )}
          </div>
        ))}
        {displayRooms.length === 0 && (
          <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484' }}>채팅 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
