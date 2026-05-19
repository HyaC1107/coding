import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';

const PRIMARY = '#2CB07B';
const DARK = '#000326';

const dummyReviews = [
  { _id: 'rv1', companyName: '한마음인테리어', rating: 5, content: '정말 깔끔하게 작업해주셨어요. 만족합니다!', createdAt: '2024-03-15T10:00:00.000Z', category: '종합인테리어' },
  { _id: 'rv2', companyName: '스타인테리어', rating: 4, content: '작업 품질은 좋은데 시간이 조금 걸렸어요.', createdAt: '2024-02-20T10:00:00.000Z', category: '도배' },
  { _id: 'rv3', companyName: '코지인테리어', rating: 5, content: '친절하고 빠르게 작업해주셨습니다.', createdAt: '2024-01-10T10:00:00.000Z', category: '타일' },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <span key={star} style={{ fontSize: '16px', color: star <= rating ? '#FFD600' : '#E0E0E0' }}>★</span>
    ))}
  </div>
);

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const Reviews = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'written' | 'pending'>('written');

  const { data: reviews } = useQuery({
    queryKey: ['myReviews', auth?.userId],
    queryFn: () => get(`/reviews/user/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  const displayReviews = reviews?.length ? reviews : dummyReviews;

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '14px 0', fontSize: '15px',
    fontWeight: active ? 'bold' : '500',
    color: active ? PRIMARY : '#848484',
    backgroundColor: 'transparent', border: 'none',
    borderBottom: active ? `2px solid ${PRIMARY}` : '2px solid transparent',
    cursor: 'pointer', transition: 'color 0.15s',
  });

  return (
    <div style={{ minHeight: '60vh' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid #E6E6E6' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#333', padding: '4px' }}
        >
          ‹
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: DARK }}>리뷰관리</h2>
      </div>

      {/* 탭 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E6E6E6' }}>
        <button style={tabStyle(activeTab === 'written')} onClick={() => setActiveTab('written')}>작성한 리뷰</button>
        <button style={tabStyle(activeTab === 'pending')} onClick={() => setActiveTab('pending')}>미작성 리뷰</button>
      </div>

      {/* 리뷰 목록 */}
      {activeTab === 'written' ? (
        <div>
          {displayReviews.length === 0 ? (
            <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484' }}>작성한 리뷰가 없습니다.</div>
          ) : (
            displayReviews.map((review: any) => (
              <div key={review._id} style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'white', backgroundColor: PRIMARY, borderRadius: '4px', padding: '2px 8px', fontWeight: 'bold', marginRight: '8px' }}>
                      {review.category || '인테리어'}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: DARK }}>{review.companyName}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#848484' }}>{formatDate(review.createdAt)}</span>
                </div>
                <StarRating rating={review.rating} />
                <p style={{ fontSize: '14px', color: '#444', marginTop: '8px', lineHeight: '1.6' }}>{review.content}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484' }}>
          <p style={{ marginBottom: '16px' }}>작성 가능한 리뷰가 없습니다.</p>
          <p style={{ fontSize: '13px', lineHeight: '1.8' }}>시공이 완료된 업체의 리뷰를<br />작성해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
