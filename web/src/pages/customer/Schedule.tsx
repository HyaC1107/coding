import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

// ── 안내문 모달 ──────────────────────────────────────────────
const GuideModal = ({ title, lines, onClose }: { title: string; lines: string[]; onClose: () => void }) => (
  <div
    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    onClick={onClose}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px 28px', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#000326' }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#848484', lineHeight: 1 }}>✕</button>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0, listStyle: 'none' }}>
        {lines.map((line, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#444', lineHeight: '1.6' }}>
            <span style={{ color: '#2CB07B', fontWeight: 'bold', flexShrink: 0 }}>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        style={{ width: '100%', marginTop: '24px', height: '48px', backgroundColor: '#000326', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        확인
      </button>
    </div>
  </div>
);

const PRIMARY = '#2CB07B';
const DARK = '#000326';
const ORANGE = '#EB701F';

const SUB_TABS = [
  { label: '희망방문요청', value: 'pending' },
  { label: '방문확정', value: 'confirmed' },
  { label: '중장비요청', value: 'heavy' },
  { label: '공사스케줄', value: 'schedule' },
  { label: '공사취소 및 시간변경 요청', value: 'cancel' },
];

// ── 더미 데이터 ──────────────────────────────────────────────

const dummyVisit = [
  { _id: 'd1', companyName: '한마음인테리어', status: 31, requestedDate: '2023년 5월 01일', requestedTime: 'AM 10:00', tags: ['보증보험가능', '자격증보유', '6개월A/S'], profileImg: '', images: ['/images/dummy/interior1.jpg', '/images/dummy/interior2.jpg'] },
  { _id: 'd2', companyName: '스타인테리어', status: 33, requestedDate: '2023년 5월 02일', requestedTime: 'AM 11:00', tags: ['보증보험가능', '6개월A/S'], profileImg: '', images: ['/images/dummy/interior3.jpg', '/images/dummy/interior4.jpg'] },
  { _id: 'd3', companyName: '코지인테리어', status: 33, requestedDate: '2023년 5월 02일', requestedTime: 'AM 11:00', tags: ['보증보험가능', '6개월A/S'], profileImg: '', images: ['/images/dummy/interior5.jpg', '/images/dummy/interior6.jpg'] },
];

const dummyHeavy = [
  { _id: 'h1', companyName: '호름스카이', status: 32, requestedDate: '2023년 5월 01일', requestedTime: 'AM 10:00', tags: ['3.5 Ton 보유', '조종교육이수'], profileImg: '/images/dummy/heavy1.jpg', images: ['/images/dummy/heavy1.jpg', '/images/dummy/heavy2.jpg'], rentalQuote: null },
  { _id: 'h2', companyName: '하늘스카이', status: 32, requestedDate: '2023년 5월 01일', requestedTime: 'AM 10:00', tags: ['2.5 Ton 보유', '조종교육이수'], profileImg: '/images/dummy/heavy2.jpg', images: ['/images/dummy/heavy2.jpg', '/images/dummy/heavy1.jpg'], rentalQuote: null },
  { _id: 'h3', companyName: '풍스카이', status: 33, requestedDate: '2023년 5월 02일', requestedTime: 'AM 11:00', tags: ['1 Ton 보유', '조종교육이수'], profileImg: '/images/dummy/heavy3.jpg', images: [], rentalQuote: { date: '2023년 5월 02일 AM 11:00', price: 500000 } },
];

const dummySchedule = {
  categories: [
    { name: '철거', icon: '/images/02-main-category/003-demolition.png', dots: 5, filled: 5 },
    { name: '욕실', icon: '/images/02-main-category/009-bath.png', dots: 5, filled: 3 },
    { name: '도배', icon: '/images/02-main-category/012-papering.png', dots: 5, filled: 1 },
  ],
  slots: [
    { _id: 's0', type: 'empty' },
    { _id: 's1', type: 'company', companyName: '코지인테리어', status: 'upcoming', dateRange: '2023년 5월 1일\nAM 09시 ~ PM 17:30', action: 'cancel-request' },
    { _id: 's2', type: 'company', companyName: '코지인테리어', status: 'today', dateRange: '2023년 5월 1일\nAM 09시 ~ PM 17:30', action: 'complete' },
  ],
};

const dummyCancel = {
  categories: [
    { name: '철거', icon: '/images/02-main-category/003-demolition.png', dots: 5, filled: 5 },
    { name: '욕실', icon: '/images/02-main-category/009-bath.png', dots: 5, filled: 3 },
  ],
  slots: [
    { _id: 'c1', type: 'company', companyName: '코지인테리어', requestType: 'cancel', message: '업체에서 취소변경을 요청 하였습니다', date: '2023년 5월 2일', action: 'accept-reject' },
    { _id: 'c2', type: 'company', companyName: '코지인테리어', requestType: 'change', message: '업체에게 변경을 하였습니다', date: '2023년 5월 2일', action: 'waiting' },
  ],
};

// ── 공통 카드 (탭 1,2,3) ────────────────────────────────────

const VisitCard = ({ req, mode }: { req: any; mode: 'status' | 'request' | 'heavy' }) => {
  const statusLabel = req.status === 31 ? '예약중' : req.status === 33 ? '예약완료' : req.status === 34 ? '시공완료' : '확인중';
  const statusColor = req.status === 31 ? ORANGE : req.status === 33 ? PRIMARY : DARK;

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E6E6E6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2, backgroundColor: '#FFD600', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', color: '#333' }}>TAKL</div>

      {/* 프로필 */}
      <div style={{ padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '999px', overflow: 'hidden', border: '1px solid #E6E6E6', backgroundColor: '#F0F0F0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {req.profileImg
            ? <img src={req.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            : <span style={{ color: '#848484', fontSize: '16px' }}>👤</span>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 'bold', color: DARK, marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.companyName}</p>
          <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
            {(req.tags || []).slice(0, 3).map((t: string) => (
              <span key={t} style={{ fontSize: '9px', color: '#848484', border: '1px solid #E6E6E6', padding: '1px 4px', borderRadius: '3px' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 이미지 영역 */}
      {mode === 'heavy' && req.rentalQuote ? (
        <div style={{ height: '88px', backgroundColor: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <p style={{ fontSize: '11px', color: 'white' }}>{req.rentalQuote.date}</p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: PRIMARY }}>임대료금액 : {req.rentalQuote.price.toLocaleString()} 원</p>
        </div>
      ) : (
        <div style={{ position: 'relative', display: 'flex', height: '88px', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0', backgroundColor: '#E8E8E8' }}>
          <div style={{ width: '50%', overflow: 'hidden', borderRight: '1px solid #F0F0F0' }}>
            <img src={(req.images || [])[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <img src={(req.images || [])[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          {/* 페이지 도트 */}
          <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '3px' }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: '5px', height: '5px', borderRadius: '999px', backgroundColor: i === 0 ? DARK : '#D0D0D0' }} />)}
          </div>
        </div>
      )}

      {/* 하단 */}
      <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
        <span style={{ color: '#666' }}>{req.requestedDate} {req.requestedTime}</span>
        {mode === 'status' && <span style={{ color: statusColor, fontWeight: 'bold' }}>{statusLabel}</span>}
        {mode === 'request' && <span style={{ color: PRIMARY, fontWeight: 'bold', cursor: 'pointer' }}>공사요청</span>}
        {mode === 'heavy' && !req.rentalQuote && <span style={{ color: '#848484', fontWeight: 'bold' }}>업체확인중</span>}
        {mode === 'heavy' && req.rentalQuote && <span style={{ color: PRIMARY, fontWeight: 'bold', cursor: 'pointer' }}>임대료청하기</span>}
      </div>
    </div>
  );
};

// ── 공사스케줄 / 취소변경 — 카테고리 헤더 ──────────────────

const CategoryHeader = ({ categories }: { categories: typeof dummySchedule.categories }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '24px 0 20px' }}>
    {categories.map(cat => (
      <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <img src={cat.icon} style={{ width: '40px', height: '40px', objectFit: 'contain' }} alt={cat.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div style={{ display: 'flex', gap: '3px' }}>
          {Array.from({ length: cat.dots }).map((_, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: i < cat.filled ? PRIMARY : '#D8D8D8' }} />
          ))}
        </div>
        <span style={{ fontSize: '12px', color: DARK, fontWeight: '500' }}>{cat.name}</span>
      </div>
    ))}
  </div>
);

// ── 공사스케줄 캐러셀 ────────────────────────────────────────

const ScheduleCarousel = ({ slots }: { slots: typeof dummySchedule.slots }) => {
  const [index, setIndex] = useState(0);
  const slot = slots[index];

  return (
    <div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '0 40px' }}>
        {/* 이전 */}
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          style={{ position: 'absolute', left: '0', width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #E0E0E0', backgroundColor: 'white', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}
        >‹</button>

        {/* 카드 */}
        {slot.type === 'empty' ? (
          <div style={{ width: '240px', height: '260px', border: '2px dashed #D0D0D0', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '15px', color: '#848484', fontWeight: 'bold' }}>업체선정중</span>
          </div>
        ) : (
          <div style={{ width: '240px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E6E6E6', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: DARK, borderBottom: '1px solid #F0F0F0' }}>
              {slot.companyName}
            </div>
            <div style={{ position: 'relative', height: '160px', backgroundColor: '#1a1a1a' }}>
              <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#FFD600', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', color: '#333', zIndex: 1 }}>TAKL</div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: '#ccc' }}>{slot.status === 'today' ? '금일 시공예정' : '시공예정'}</span>
                <span style={{ fontSize: '11px', color: '#aaa', whiteSpace: 'pre-line', textAlign: 'center' }}>{slot.dateRange}</span>
              </div>
            </div>
            <div style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #F0F0F0' }}>
              {slot.action === 'cancel-request' && <span style={{ fontSize: '13px', color: PRIMARY, fontWeight: 'bold', cursor: 'pointer' }}>공사취소요청</span>}
              {slot.action === 'complete' && <span style={{ fontSize: '13px', color: DARK, fontWeight: 'bold', cursor: 'pointer' }}>작업완료</span>}
            </div>
          </div>
        )}

        {/* 다음 */}
        <button
          onClick={() => setIndex(i => Math.min(slots.length - 1, i + 1))}
          disabled={index === slots.length - 1}
          style={{ position: 'absolute', right: '0', width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #E0E0E0', backgroundColor: 'white', cursor: index === slots.length - 1 ? 'default' : 'pointer', opacity: index === slots.length - 1 ? 0.3 : 1, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}
        >›</button>
      </div>

      {/* 도트 인디케이터 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
        {slots.map((_, i) => (
          <div key={i} onClick={() => setIndex(i)} style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: i === index ? DARK : '#D0D0D0', cursor: 'pointer' }} />
        ))}
      </div>

      {/* 안내 문구 */}
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#848484', marginTop: '20px' }}>
        ※ 공사예정 14일 전으로 공사취소가능
      </p>
    </div>
  );
};

// ── 취소/변경 캐러셀 ─────────────────────────────────────────

const CancelCarousel = ({ slots }: { slots: typeof dummyCancel.slots }) => {
  const [index, setIndex] = useState(0);
  const slot = slots[index];

  return (
    <div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '0 40px' }}>
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          style={{ position: 'absolute', left: '0', width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #E0E0E0', backgroundColor: 'white', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}
        >‹</button>

        <div style={{ width: '240px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E6E6E6', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', color: DARK, borderBottom: '1px solid #F0F0F0' }}>
            {slot.companyName}
          </div>
          <div style={{ position: 'relative', height: '160px', backgroundColor: '#2a2a2a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '0 16px', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#FFD600', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', color: '#333' }}>TAKL</div>
            <p style={{ fontSize: '13px', color: '#FF5A5A', fontWeight: 'bold', lineHeight: '1.5' }}>
              {slot.message}
            </p>
            <p style={{ fontSize: '11px', color: '#aaa' }}>{slot.date}</p>
          </div>
          <div style={{ padding: '10px 14px', textAlign: 'center', borderTop: '1px solid #F0F0F0' }}>
            {slot.action === 'accept-reject' && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: '#848484', fontWeight: 'bold', cursor: 'pointer' }}>거절</span>
                <span style={{ color: '#D0D0D0' }}>|</span>
                <span style={{ fontSize: '13px', color: PRIMARY, fontWeight: 'bold', cursor: 'pointer' }}>수락</span>
              </div>
            )}
            {slot.action === 'waiting' && (
              <span style={{ fontSize: '13px', color: '#848484' }}>수락대기중</span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIndex(i => Math.min(slots.length - 1, i + 1))}
          disabled={index === slots.length - 1}
          style={{ position: 'absolute', right: '0', width: '32px', height: '32px', borderRadius: '999px', border: '1px solid #E0E0E0', backgroundColor: 'white', cursor: index === slots.length - 1 ? 'default' : 'pointer', opacity: index === slots.length - 1 ? 0.3 : 1, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}
        >›</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
        {slots.map((_, i) => (
          <div key={i} onClick={() => setIndex(i)} style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: i === index ? DARK : '#D0D0D0', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
};

// ── 메인 컴포넌트 ────────────────────────────────────────────

const CustomerSchedule = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showGuide, setShowGuide] = useState(false);
  const { auth } = useAuth();

  const { data: requests } = useQuery({
    queryKey: ['requests', auth?.userId],
    queryFn: () => get('/requests', { customerId: auth?.userId }),
    enabled: !!auth?.userId,
  });

  const visitList: any[] = requests?.length ? requests : dummyVisit;

  const tabDescMap: Record<string, string> = {
    pending: '업체에서 확인하고 있습니다',
    confirmed: '업체에서 방문예정입니다 견적을 비교 후 공사를 요청하세요',
    heavy: '업체에서 확인하고 있습니다. 임대료 금액을 확인 후 공사요청을 눌러주세요',
    schedule: '일반적인 인테리어 공정순서대로 나열합니다 반드시 안내문을 확인하시길 바랍니다',
    cancel: '시공취소 및 시공날짜 변경요청 입니다',
  };

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* 서브탭 — 가운데 정렬, 스크롤 없음 */}
      <div style={{ borderBottom: '1px solid #E6E6E6', display: 'flex', justifyContent: 'center' }}>
        {SUB_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '14px 16px',
              fontSize: '12px',
              fontWeight: activeTab === tab.value ? 'bold' : '500',
              color: activeTab === tab.value ? PRIMARY : '#848484',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.value ? PRIMARY : 'transparent'}`,
              marginBottom: '-1px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 안내 문구 */}
      <p style={{ fontSize: '13px', color: '#555', textAlign: 'center', padding: '24px 24px 0', lineHeight: '1.6' }}>
        {tabDescMap[activeTab]}
      </p>

      {/* ── 탭 1: 희망방문요청 ── */}
      {activeTab === 'pending' && (
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {visitList.map((req: any) => <VisitCard key={req._id} req={req} mode="status" />)}
          </div>
        </div>
      )}

      {/* ── 탭 2: 방문확정 ── */}
      {activeTab === 'confirmed' && (
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {visitList.map((req: any) => <VisitCard key={req._id} req={req} mode="request" />)}
          </div>
        </div>
      )}

      {/* ── 탭 3: 중장비요청 ── */}
      {activeTab === 'heavy' && (
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {dummyHeavy.map((req: any) => <VisitCard key={req._id} req={req} mode="heavy" />)}
          </div>
        </div>
      )}

      {/* ── 탭 4: 공사스케줄 ── */}
      {activeTab === 'schedule' && (
        <div style={{ padding: '0 24px' }}>
          <CategoryHeader categories={dummySchedule.categories} />
          <ScheduleCarousel slots={dummySchedule.slots} />
        </div>
      )}

      {/* ── 탭 5: 공사취소 및 시간변경 요청 ── */}
      {activeTab === 'cancel' && (
        <div style={{ padding: '0 24px' }}>
          <CategoryHeader categories={dummyCancel.categories} />
          <CancelCarousel slots={dummyCancel.slots} />
        </div>
      )}

      {/* 하단 고정 버튼 */}
      <div style={{
        position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        width: '65%', maxWidth: '580px',
        display: 'flex', gap: '10px', zIndex: 100,
      }}>
        <button
          onClick={() => setShowGuide(true)}
          style={{ flex: 1, padding: '14px 0', backgroundColor: DARK, color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          스케줄안내문
        </button>
        <button
          style={{ flex: 1, padding: '14px 0', backgroundColor: 'white', color: DARK, border: `1.5px solid ${DARK}`, borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <span style={{ fontSize: '15px' }}>⚙</span> 스케줄관리
        </button>
      </div>

      {showGuide && (
        <GuideModal
          title="스케줄 안내문"
          lines={[
            '인테리어 공정 순서: 철거 → 설비/전기 → 샤시 → 목공 → 욕실/타일 → 도배/페인트 → 마루/장판 → 조명/청소',
            '공정 순서는 시공 상황에 따라 변경될 수 있습니다.',
            '각 공정 업체는 담당 공정 전날까지 확정되어야 합니다.',
            '공사 취소는 공사 예정일 14일 전까지만 가능합니다.',
            '시공 중 문제 발생 시 즉시 업체에 연락하시기 바랍니다.',
            '시공 완료 후 반드시 검수 확인을 진행해주세요.',
          ]}
          onClose={() => setShowGuide(false)}
        />
      )}
    </div>
  );
};

export default CustomerSchedule;
