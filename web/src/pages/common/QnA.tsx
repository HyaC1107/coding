import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../../utils/api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const QnA = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { data: qnas, isLoading } = useQuery({
    queryKey: ['qnas'],
    queryFn: () => get('/qna'),
  });

  const submitMutation = useMutation({
    mutationFn: () => post('/qna', { title, content }),
    onSuccess: () => {
      alert('문의가 접수되었습니다.');
      setTitle('');
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['qnas'] });
    },
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>1:1 문의하기</h2>
        <Input label="제목" value={title} onChange={e => setTitle(e.target.value)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>내용</label>
          <textarea
            style={{ padding: '12px', borderRadius: 'var(--border-radius)', border: '1px solid #E6E6E6', minHeight: '150px', outline: 'none' }}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <Button onClick={() => submitMutation.mutate()}>문의 등록</Button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>내 문의 내역</h2>
        {isLoading ? <p>로딩 중...</p> : qnas?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {qnas.map((qna: any) => (
              <div key={qna._id} style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px' }}>
                <h4 style={{ fontWeight: 'bold' }}>{qna.title}</h4>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>{qna.content}</p>
                {qna.answer && (
                  <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    <p style={{ fontSize: '14px' }}><strong>답변:</strong> {qna.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : <p>문의 내역이 없습니다.</p>}
      </div>
    </div>
  );
};

export default QnA;
