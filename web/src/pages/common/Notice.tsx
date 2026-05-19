import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';

const Notice = () => {
  const { data: notices, isLoading } = useQuery({
    queryKey: ['notices'],
    queryFn: () => get('/notices'),
  });

  return (
    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>공지사항</h1>
      
      {isLoading ? <p>로딩 중...</p> : notices?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {notices.map((notice: any) => (
            <div key={notice._id} style={{ paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{notice.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{new Date(notice.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : <p>공지사항이 없습니다.</p>}
    </div>
  );
};

export default Notice;
