import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const PRIMARY = '#2CB07B';
const DARK = '#000326';

const SUB_TABS = [
  { label: '희망방문요청', value: 'pending' },
  { label: '방문확정', value: 'confirmed' },
  { label: '중장비요청', value: 'heavy' },
  { label: '공사스케줄', value: 'schedule' },
  { label: '공사취소 및 시간변경 요청', value: 'cancel' },
];

const dummyRequests = [
  {
    _id: 'd1', companyName: '한마음인테리어', status: 31,
    requestedDate: '2023년 5월 01일', requestedTime: 'AM 10:00',
    tags: ['보증보험가능', '자격증보유', '6개월A/S'],
    profileImg: '', images: ['/images/dummy/interior1.jpg', '/images/dummy/interior2.jpg'],
    rating: 100, recentCount: 30,
  },
  {
    _id: 'd2', companyName: '스타인테리어', status: 33,
    requestedDate: '2023년 5월 02일', requestedTime: 'AM 11:00',
    tags: ['보증보험가능', '6개월A/S'],
    profileImg: '', images: ['/images/dummy/interior3.jpg', '/images/dummy/interior4.jpg'],
    rating: 100, recentCount: 30,
  },
  {
    _id: 'd3', companyName: '코지인테리어', status: 33,
    requestedDate: '2023년 5월 02일', requestedTime: 'AM 11:00',
    tags: ['보증보험가능', '6개월A/S'],
    profileImg: '', images: ['/images/dummy/interior5.jpg', '/images/dummy/interior6.jpg'],
    rating: 100, recentCount: 30,
  },
];

const statusLabel = (s: number) =>
  s === 31 ? '예약중' : s === 33 ? '예약완료' : s === 34 ? '시공완료' : s >= 41 ? '취소' : '확인중';

const statusColor = (s: number) =>
  s === 31 ? '#EB701F' : s === 33 ? PRIMARY : s === 34 ? DARK : '#848484';

const CompanyCard = ({ req, showAction }: { req: any; showAction?: string }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E6E6E6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative' }}>
    {/* TAKL badge */}
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1, backgroundColor: '#FFD600', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', fontWeight: 'bold', color: '#333' }}>
      TAKL
    </div>

    {/* 상단: 프로필 */}
    <div style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '999px', overflow: 'hidden', border: '1px solid #E6E6E6', backgroundColor: '#F0F0F0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {req.profileImg ? <img src={req.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : <span style={{ color: '#848484', fontSize: '18px' }}>👤</span>}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '14px', fontWeight: 'bold', color: DARK, marginBottom: '3px' }}>{req.companyName || req.companyId?.companyName || '업체 정보 없음'}</p>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {(req.tags || []).slice(0, 3).map((t: string) => (
            <span key={t} style={{ fontSize: '10px', color: '#848484', border: '1px solid #E6E6E6', padding: '1px 5px', borderRadius: '3px' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>

    {/* 이미지 */}
    <div style={{ position: 'relative', display: 'flex', height: '90px', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
      <div style={{ width: '50%', overflow: 'hidden', borderRight: '1px solid #F0F0F0' }}>
        <img src={(req.images || [])[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.backgroundColor = '#EEE'; e.currentTarget.style.display = 'none'; }} />
        <div style={{ width: '100%', height: '100%', backgroundColor: '#E8E8E8', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <img src={(req.images || [])[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
      </div>
    </div>

    {/* 하단: 날짜 + 상태 */}
    <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
      <span style={{ color: '#666' }}>
        {req.requestedDate || req.confirmedDate || ''}{' '}
        {req.requestedTime || req.confirmedTime || ''}
      </span>
      {showAction === 'status' && (
        <span style={{ color: statusColor(req.status), fontWeight: 'bold' }}>{statusLabel(req.status)}</span>
      )}
      {showAction === 'request' && (
        <button style={{ backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>공사요청</button>
      )}
      {showAction === 'cancel-request' && (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ border: `1px solid ${PRIMARY}`, color: PRIMARY, backgroundColor: 'white', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>거절</button>
          <span style={{ color: '#D0D0D0', lineHeight: '28px' }}>|</span>
          <button style={{ backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>수락</button>
        </div>
      )}
    </div>
  </div>
);

const CustomerSchedule = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const { auth } = useAuth();
  const { data: requests } = useQuery({
    queryKey: ['requests', auth?.userId],
    queryFn: () => get('/requests', { customerId: auth?.userId }),
    enabled: !!auth?.userId,
  });


  const list: any[] = (requests?.length ? requests : dummyRequests);

  const getTabContent = () => {
    switch (activeTab) {
      case 'pending':
        return { desc: '업체에서 확인하고 있습니다', cards: list, action: 'status' };
      case 'confirmed':
        return { desc: '업체에서 방문예정입니다 견적을 비교 후 공사를 요청하세요', cards: list.filter(r => r.status >= 33 || true), action: 'request' };
      case 'heavy':
        return { desc: '업체에서 확인하고 있습니다. 임대료 금액을 확인 후 공사요청을 눌러주세요', cards: list, action: 'status' };
      case 'schedule':
        return { desc: '일반적인 인테리어 공정순서대로 나열합니다 반드시 안내문을 확인하시길 바랍니다', cards: list, action: 'status' };
      case 'cancel':
        return { desc: '시공취소 및 시공날짜 변경요청 입니다', cards: list, action: 'cancel-request' };
      default:
        return { desc: '', cards: [], action: 'status' };
    }
  };

  const { desc, cards, action } = getTabContent();

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* 서브탭 */}
      <div style={{ overflowX: 'auto', borderBottom: '1px solid #E6E6E6', display: 'flex', whiteSpace: 'nowrap' }}>
        {SUB_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '14px 20px', whiteSpace: 'nowrap',
              fontSize: '13px', fontWeight: activeTab === tab.value ? 'bold' : '500',
              color: activeTab === tab.value ? PRIMARY : '#848484',
              borderBottom: activeTab === tab.value ? `2px solid ${PRIMARY}` : '2px solid transparent',
              backgroundColor: 'transparent', border: 'none',
              borderBottomStyle: 'solid', borderBottomWidth: '2px',
              borderBottomColor: activeTab === tab.value ? PRIMARY : 'transparent',
              marginBottom: '-1px', cursor: 'pointer', flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px 24px 0' }}>
        {/* 안내 문구 */}
        <p style={{ fontSize: '14px', color: '#555', textAlign: 'center', marginBottom: '24px', lineHeight: '1.6' }}>
          {desc}
        </p>

        {/* 카드 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {cards.map((req: any) => (
            <CompanyCard key={req._id} req={req} showAction={action} />
          ))}
          {cards.length === 0 && (
            <div style={{ gridColumn: '1/-1', padding: '60px 0', textAlign: 'center', color: '#848484' }}>
              내역이 없습니다.
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{ flex: 1, padding: '16px 0', backgroundColor: DARK, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => alert('스케줄 안내문을 확인해주세요.')}
          >
            스케줄안내문
          </button>
          <button
            style={{ flex: 1, padding: '16px 0', backgroundColor: 'white', color: DARK, border: `1.5px solid ${DARK}`, borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <span style={{ fontSize: '16px' }}>⚙</span> 스케줄관리
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSchedule;
