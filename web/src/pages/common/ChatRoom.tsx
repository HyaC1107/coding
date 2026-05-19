import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { get, BASE_URL } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

    socketRef.current?.emit('sendMessage', {
      roomId,
      sender: auth?.userId,
      content: inputText
    });
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', backgroundColor: 'white', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', fontSize: '20px' }}>{'<'}</button>
        <h3 style={{ fontWeight: 'bold' }}>채팅방</h3>
      </div>

      <div ref={scrollRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f9f9f9' }}>
        {messages.map((msg, idx) => {
          const isMe = msg.sender === auth?.userId;
          return (
            <div key={idx} style={{ 
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMe ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                padding: '10px 16px',
                borderRadius: '16px',
                backgroundColor: isMe ? 'var(--color-primary)' : 'white',
                color: isMe ? 'white' : 'var(--color-dark)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                fontSize: '14px'
              }}>
                {msg.content}
              </div>
              <span style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '12px' }}>
        <input 
          style={{ flex: 1, padding: '12px', borderRadius: '24px', border: '1px solid #eee', backgroundColor: '#f5f5f5' }}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <Button type="submit" style={{ borderRadius: '24px' }}>전송</Button>
      </form>
    </div>
  );
};

export default ChatRoom;
