import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { get, BASE_URL } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const PRIMARY = '#2CB07B';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [roomEnded, setRoomEnded] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ChatList에서 state로 넘겨준 상대방 정보
  const locationState = location.state as { otherName?: string; otherImg?: string } | null;

  const { data: initialMessages } = useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => get(`/chat/${roomId}/messages`),
    enabled: !!roomId,
  });

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    socketRef.current = io(BASE_URL);
    socketRef.current.emit('joinRoom', roomId);
    socketRef.current.on('receiveMessage', (msg: any) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socketRef.current?.emit('leaveRoom', roomId);
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    socketRef.current?.emit('sendMessage', { roomId, sender: auth?.userId, content: inputText });
    setInputText('');
  };

  const otherName = locationState?.otherName || '채팅방';
  const otherAddr = '';
  const otherImg = locationState?.otherImg || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', backgroundColor: 'white' }}>

      {/* 헤더 */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #E6E6E6', display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: 'white' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#333', padding: '4px', flexShrink: 0 }}
        >
          ‹
        </button>
        <div style={{ width: '44px', height: '44px', borderRadius: '999px', overflow: 'hidden', backgroundColor: '#E0E0E0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {otherImg ? (
            <img src={otherImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          ) : (
            <span style={{ fontSize: '18px', color: '#AAAAAA' }}>👤</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#000326', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{otherName}</p>
          {otherAddr && <p style={{ fontSize: '12px', color: '#848484', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{otherAddr}</p>}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div
        ref={scrollRef}
        style={{ flex: 1, padding: '20px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#F5F5F5' }}
        onClick={() => setShowMenu(false)}
      >
        {messages.map((msg, idx) => {
          const isMe = msg.sender === auth?.userId || msg.sender?._id === auth?.userId;
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              {!isMe && (
                <div style={{ width: '32px', height: '32px', borderRadius: '999px', backgroundColor: '#D0D0D0', marginBottom: '4px', flexShrink: 0 }} />
              )}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: '16px',
                  backgroundColor: isMe ? '#FFD600' : 'white',
                  color: '#222', fontSize: '14px', maxWidth: '65%',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  lineHeight: '1.5',
                }}>
                  {msg.content}
                </div>
                <span style={{ fontSize: '10px', color: '#999' }}>
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            </div>
          );
        })}

        {/* 대화 종료 메시지 */}
        {roomEnded && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: '13px', color: '#848484', lineHeight: '1.8', marginBottom: '20px' }}>
              다른 시공업체를 선택하였습니다<br />업체와 대화가 불가능합니다
            </p>
            <button
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', margin: '0 auto' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '999px', backgroundColor: '#FF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '20px' }}>↗</span>
              </div>
              <span style={{ fontSize: '12px', color: '#555' }}>대화방나가기</span>
            </button>
          </div>
        )}
      </div>

      {/* + 메뉴 */}
      {showMenu && (
        <div style={{ backgroundColor: '#F8F8F8', borderTop: '1px solid #E6E6E6', padding: '20px 24px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {[
            { icon: '🖼', label: '사진첨부하기', color: '#0099FF' },
            { icon: '📋', label: '견적서보기', color: '#333' },
            { icon: '↗', label: '대화방나가기', color: '#FF4444' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => { if (item.label === '대화방나가기') { setRoomEnded(true); setShowMenu(false); } }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '999px', backgroundColor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '12px', color: '#555' }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* 입력창 */}
      {!roomEnded && (
        <form
          onSubmit={handleSend}
          style={{ padding: '10px 16px', borderTop: '1px solid #E6E6E6', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setShowMenu(v => !v)}
            style={{ width: '36px', height: '36px', borderRadius: '999px', backgroundColor: '#F0F0F0', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', color: '#555', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            +
          </button>
          <input
            style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1.5px solid #E6E6E6', outline: 'none', fontSize: '14px', backgroundColor: 'white' }}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button
            type="submit"
            style={{ width: '36px', height: '36px', borderRadius: '999px', backgroundColor: PRIMARY, border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ color: 'white', fontSize: '18px' }}>›</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatRoom;
