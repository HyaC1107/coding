import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const HeavyMain = () => {
  const { auth } = useAuth();

  const { data: requestCount } = useQuery({
    queryKey: ['newRequestsHeavy', auth?.userId],
    queryFn: () => get('/requests', { companyId: auth?.userId, status: 31 }).then((res: any[]) => res.length),
    enabled: !!auth?.userId,
  });

  const cards = [
    {
      title: '스케줄 관리',
      desc: '신규 요청과 오늘 방문 일정을 확인하세요.',
      path: '/heavy/schedule',
      icon: '📅',
      count: requestCount,
      countLabel: '신규 요청',
    },
    {
      title: '장비 렌탈',
      desc: '새로운 장비 렌탈 요청을 확인하고 지원하세요.',
      path: '/heavy/tool-rent',
      icon: '🚜',
    },
    {
      title: '채팅',
      desc: '고객님들의 문의에 답변해주세요.',
      path: '/heavy/chat',
      icon: '💬',
    },
    {
      title: '마이페이지',
      desc: '업체 정보와 리뷰를 관리하세요.',
      path: '/heavy/mypage',
      icon: '🏢',
    },
  ];

  const BrandColor = '#EB701F';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '32px 24px' }}>

      {/* 인사말 배너 */}
      <div style={{
        backgroundColor: 'rgba(235,112,31,0.08)',
        borderRadius: '16px',
        padding: '32px 36px',
        border: '1px solid #E6E6E6',
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#000326', marginBottom: '8px' }}>
          {auth?.name} 사장님, 반갑습니다!
        </h1>
        <p style={{ fontSize: '15px', color: '#848484' }}>
          {(requestCount ?? 0) > 0
            ? `현재 새로 접수된 요청이 ${requestCount}건 있습니다.`
            : '오늘도 좋은 하루 되세요.'}
        </p>
      </div>

      {/* 바로가기 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              border: '1px solid #E6E6E6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: '28px 24px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = BrandColor;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = '#E6E6E6';
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '14px' }}>{card.icon}</div>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#000326', marginBottom: '8px' }}>{card.title}</h3>
            <p style={{ fontSize: '13px', color: '#848484', lineHeight: '1.6', flex: 1 }}>{card.desc}</p>
            {card.count !== undefined && card.count > 0 && (
              <div style={{
                marginTop: '16px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                backgroundColor: BrandColor, color: 'white',
                fontSize: '12px', fontWeight: 'bold',
                padding: '6px 14px', borderRadius: '999px',
                alignSelf: 'flex-start',
              }}>
                <span style={{ width: '7px', height: '7px', backgroundColor: 'white', borderRadius: '999px', display: 'inline-block' }} />
                {card.countLabel} {card.count}건
              </div>
            )}
          </Link>
        ))}
      </div>

    </div>
  );
};

export default HeavyMain;
