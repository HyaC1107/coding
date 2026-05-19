import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../../utils/api';

const PRIMARY = '#2CB07B';
const DARK = '#000326';

const CATEGORIES = ['카테고리 입력', '로그인/회원가입', '이용문의', '업체질문', '시공'];

const dummyQnas = [
  { _id: 'q1', title: '업체에서 연락이 오지 않습니다', createdAt: '2023-03-02', status: '확인중', content: '재대로 된 업체를 선별하신게 맞으신가요? 타임스케어는 인테리어 업체에게 방문견적 받았습니다. 견적받고 아에 연락이 안됩니다 된 것으로 알았는데', answer: '안녕하세요 고객님\n불편을 느끼게 해서 정말 죄송합니다 해당 업체를 확인해 본 결과 과업중에 사고가 있어 병원에 입원해 있는 것으로 확인 되었습니다.\n\n다시한번 불편을 느끼게 해서 죄송합니다' },
  { _id: 'q2', title: '업체에서 연락이 오지 않습니다', createdAt: '2023-03-02', status: '답변완료', content: '두 번째 문의내용입니다.', answer: null },
];

const QnA = () => {
  const [activeTab, setActiveTab] = useState<'write' | 'history'>('write');
  const [category, setCategory] = useState('카테고리 입력');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: qnas } = useQuery({
    queryKey: ['qnas'],
    queryFn: () => get('/qna'),
  });

  const submitMutation = useMutation({
    mutationFn: () => post('/qna', { title, content, category }),
    onSuccess: () => {
      alert('문의가 접수되었습니다.');
      setTitle(''); setContent(''); setCategory('카테고리 입력');
      queryClient.invalidateQueries({ queryKey: ['qnas'] });
    },
  });

  const list = qnas?.length ? qnas : dummyQnas;

  return (
    <div>
      {/* 타이틀 */}
      <h1 style={{ fontSize: '20px', fontWeight: '900', color: DARK, textAlign: 'center', padding: '28px 24px 20px' }}>
        1:1문의하기
      </h1>

      {/* 탭 */}
      <div style={{ display: 'flex', borderBottom: '2px solid #E6E6E6', marginBottom: '28px' }}>
        {[{ key: 'write', label: '문의하기' }, { key: 'history', label: '문의내역확인' }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'write' | 'history')}
            style={{
              flex: 1, padding: '14px 0', fontSize: '15px', fontWeight: 'bold',
              color: activeTab === tab.key ? PRIMARY : '#848484',
              backgroundColor: 'transparent', border: 'none',
              borderBottom: activeTab === tab.key ? `2px solid ${PRIMARY}` : '2px solid transparent',
              marginBottom: '-2px', cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'write' && (
        <div style={{ padding: '0 24px' }}>
          {/* 카테고리 드롭다운 */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                width: '220px', height: '44px', padding: '0 40px 0 16px',
                borderRadius: '8px', border: '1.5px solid #E6E6E6',
                fontSize: '14px', color: '#555', outline: 'none',
                appearance: 'none', backgroundColor: 'white', cursor: 'pointer',
              }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span style={{ position: 'absolute', right: '176px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#848484' }}>▾</span>
          </div>

          {/* 제목 */}
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              width: '100%', height: '48px', padding: '0 16px',
              borderRadius: '8px', border: '1.5px solid #E6E6E6',
              fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              marginBottom: '0',
            }}
          />

          {/* 내용 */}
          <textarea
            placeholder=""
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px', borderRadius: '8px',
              border: '1.5px solid #E6E6E6', fontSize: '14px', outline: 'none',
              resize: 'none', height: '280px', boxSizing: 'border-box',
              borderTop: 'none', borderTopLeftRadius: '0', borderTopRightRadius: '0',
            }}
          />

          {/* 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              onClick={() => submitMutation.mutate()}
              disabled={submitMutation.isPending}
              style={{
                backgroundColor: PRIMARY, color: 'white', border: 'none',
                borderRadius: '8px', padding: '12px 28px', fontSize: '15px',
                fontWeight: 'bold', cursor: 'pointer',
              }}
            >
              문의하기
            </button>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div style={{ padding: '0 24px' }}>
          {list.map((qna: any) => (
            <div key={qna._id} style={{ marginBottom: '0', borderBottom: '1px solid #F0F0F0' }}>
              <button
                onClick={() => setOpenId(openId === qna._id ? null : qna._id)}
                style={{ width: '100%', textAlign: 'left', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <p style={{ fontSize: '12px', color: '#848484', marginBottom: '4px' }}>
                  {new Date(qna.createdAt).toLocaleDateString('ko-KR')}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '15px', fontWeight: 'bold', color: DARK }}>{qna.title}</p>
                  <span style={{
                    fontSize: '12px', fontWeight: 'bold', padding: '3px 10px',
                    borderRadius: '4px',
                    backgroundColor: qna.status === '답변완료' ? '#E8F7F1' : '#FFF3E6',
                    color: qna.status === '답변완료' ? PRIMARY : '#EB701F',
                  }}>
                    {qna.status || '확인중'}
                  </span>
                </div>
              </button>

              {openId === qna._id && (
                <div style={{ backgroundColor: '#FAFAFA', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: PRIMARY, marginRight: '8px' }}>Q.</span>
                    <span style={{ fontSize: '14px', color: DARK }}>{qna.content}</span>
                    {qna.status !== '답변완료' && (
                      <span style={{ fontSize: '12px', color: '#EB701F', float: 'right' }}>수정</span>
                    )}
                  </div>
                  {qna.answer && (
                    <div style={{ borderTop: '1px solid #E6E6E6', paddingTop: '14px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '999px', backgroundColor: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>A</span>
                        </div>
                        <p style={{ fontSize: '14px', color: DARK, lineHeight: '1.7', whiteSpace: 'pre-line' }}>{qna.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {list.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: '#848484' }}>문의 내역이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default QnA;
