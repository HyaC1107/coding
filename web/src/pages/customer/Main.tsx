import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

// 주거 목록 (앱 data.ts 기준)
const residentialCategories = [
  { name: '3D도면설계', icon: '/images/02-main-category/001-3d.png' },
  { name: '종합인테리어', icon: '/images/02-main-category/002-interior.png' },
  { name: '철거', icon: '/images/02-main-category/003-demolition.png' },
  { name: '설비', icon: '/images/02-main-category/006-electronic.png' },
  { name: '전기', icon: '/images/02-main-category/005-facility.png' },
  { name: '샤시', icon: '/images/02-main-category/007-chassis.png' },
  { name: '목공', icon: '/images/02-main-category/008-woodworking.png' },
  { name: '욕실', icon: '/images/02-main-category/009-bath.png' },
  { name: '타일', icon: '/images/02-main-category/010-tile.png' },
  { name: '페인트', icon: '/images/02-main-category/011-paint.png' },
  { name: '마루', icon: '/images/02-main-category/014-floor.png' },
  { name: '필름', icon: '/images/02-main-category/013-film.png' },
  { name: '도배', icon: '/images/02-main-category/012-papering.png' },
  { name: '조명', icon: '/images/02-main-category/015-light.png' },
  { name: '장판', icon: '/images/02-main-category/016-flooring.png' },
  { name: '청소', icon: '/images/02-main-category/024-cleaning.png' },
  { name: '도어락', icon: '/images/02-main-category/025-doorlock.png' },
  { name: '냉난방', icon: '/images/02-main-category/022-warming.png' },
  { name: '싱크', icon: '/images/02-main-category/017-sink.png' },
  { name: 'CCTV', icon: '/images/02-main-category/023-cctv.png' },
  { name: '카고크레인', icon: '/images/02-main-category/026-cargo.png' },
  { name: '사다리차', icon: '/images/02-main-category/027-laddercar.png' },
  { name: '고소작업차', icon: '/images/02-main-category/028-aerialcar.png' },
];

// 상가 목록 (앱 storeData.ts 기준)
const storeCategories = [
  { name: '3D도면설계', icon: '/images/02-main-category/001-3d.png' },
  { name: '종합인테리어', icon: '/images/02-main-category/002-interior.png' },
  { name: '철거', icon: '/images/02-main-category/003-demolition.png' },
  { name: '소방설비', icon: '/images/02-main-category/004-firefighting.png' },
  { name: '설비', icon: '/images/02-main-category/006-electronic.png' },
  { name: '전기', icon: '/images/02-main-category/005-facility.png' },
  { name: '샤시', icon: '/images/02-main-category/007-chassis.png' },
  { name: '목공', icon: '/images/02-main-category/008-woodworking.png' },
  { name: '욕실', icon: '/images/02-main-category/009-bath.png' },
  { name: '타일', icon: '/images/02-main-category/010-tile.png' },
  { name: '페인트', icon: '/images/02-main-category/011-paint.png' },
  { name: '마루', icon: '/images/02-main-category/014-floor.png' },
  { name: '필름', icon: '/images/02-main-category/013-film.png' },
  { name: '도배', icon: '/images/02-main-category/012-papering.png' },
  { name: '조명', icon: '/images/02-main-category/015-light.png' },
  { name: '장판', icon: '/images/02-main-category/016-flooring.png' },
  { name: '싱크', icon: '/images/02-main-category/017-sink.png' },
  { name: '닥트', icon: '/images/02-main-category/018-doct.png' },
  { name: '금속공사', icon: '/images/02-main-category/019-metalwork.png' },
  { name: '간판', icon: '/images/02-main-category/020-sign.png' },
  { name: '천막&어닝', icon: '/images/02-main-category/021-earning.png' },
  { name: '냉난방', icon: '/images/02-main-category/022-warming.png' },
  { name: 'CCTV', icon: '/images/02-main-category/023-cctv.png' },
  { name: '청소', icon: '/images/02-main-category/024-cleaning.png' },
  { name: '도어락', icon: '/images/02-main-category/025-doorlock.png' },
  { name: '카고크레인', icon: '/images/02-main-category/026-cargo.png' },
  { name: '사다리차', icon: '/images/02-main-category/027-laddercar.png' },
  { name: '고소작업차', icon: '/images/02-main-category/028-aerialcar.png' },
];

const dummySchedules = [
  { _id: 'd1', requestedTime: 'AM 10:00', companyName: '한마음 인테리어', img: '/images/main/carousel1.png' },
  { _id: 'd2', requestedTime: 'PM 02:00', companyName: '서울 타일 전문', img: '/images/main/carousel2.png' },
  { _id: 'd3', requestedTime: 'PM 04:30', companyName: '베스트 도배사', img: '/images/main/carousel1.png' },
];

const CustomerMain = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isStore, setIsStore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { data: schedules } = useQuery({
    queryKey: ['customerSchedules', auth?.userId],
    queryFn: () => get('/requests', { customerId: auth?.userId, status: 31 }),
    enabled: !!auth?.userId,
  });

  const displaySchedules = (schedules && schedules.length > 0) ? schedules : dummySchedules;

  const categories = isStore ? storeCategories : residentialCategories;
  const visibleCategories = showMore ? categories : categories.slice(0, 8);

  return (
    <div className="bg-white">

      {/* 배너 캐러셀 */}
      <div className="w-full h-[185px] overflow-hidden bg-dark">
        <img
          src="/images/main/carousel1.png"
          className="w-full h-full object-cover"
          alt="banner"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* 상가/주거 토글 — 왼쪽 정렬 */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px 24px 16px' }}>
        <button
          onClick={() => setIsStore(!isStore)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <div style={{ position: 'relative', width: '48px', height: '28px' }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '999px',
              backgroundColor: isStore ? '#2CB07B' : '#E6E6E6',
              transition: 'background-color 0.2s',
            }} />
            <div style={{
              position: 'absolute', top: '3px',
              width: '22px', height: '22px',
              backgroundColor: 'white', borderRadius: '999px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              transform: isStore ? 'translateX(23px)' : 'translateX(3px)',
              transition: 'transform 0.2s',
            }} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#848484' }}>
            {isStore ? '상가' : '주거'}
          </span>
        </button>
      </div>

      {/* 카테고리 그리드 — 원형 아이콘, 8개씩 */}
      <div style={{ padding: '0 24px 8px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '16px 8px',
        }}>
          {visibleCategories.map((cat) => (
            <Link
              key={cat.name}
              to={`/customer/pick?category=${cat.name}`}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '999px',
                overflow: 'hidden', border: '1px solid #E6E6E6',
                backgroundColor: '#F9F9F9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img src={cat.icon} style={{ width: '52px', height: '52px', objectFit: 'contain' }} alt={cat.name} />
              </div>
              <span style={{ fontSize: '11px', color: '#000326', textAlign: 'center', lineHeight: '1.3', wordBreak: 'keep-all' }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* 펼쳐보기 / 접어두기 */}
        <button
          onClick={() => setShowMore(!showMore)}
          style={{
            width: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: '20px', paddingBottom: '16px',
            gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#848484',
          }}
        >
          {showMore && (
            <img src="/images/chevron.png" style={{ width: '16px', opacity: 0.4, transform: 'rotate(-90deg)' }} alt="" />
          )}
          <span style={{ fontSize: '13px', fontWeight: '500' }}>
            {showMore ? '접어두기' : '펼쳐보기'}
          </span>
          {!showMore && (
            <img src="/images/chevron.png" style={{ width: '16px', opacity: 0.4, transform: 'rotate(90deg)' }} alt="" />
          )}
        </button>
      </div>

      {/* 구분선 */}
      <div style={{ height: '8px', backgroundColor: '#F6F6F6' }} />

      {/* 오늘의 방문 스케줄 */}
      <div style={{ backgroundColor: 'white', paddingTop: '24px', paddingBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000326', padding: '0 24px', marginBottom: '16px' }}>
          오늘의 방문스케줄
        </h2>

        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 24px 8px' }}>
          {displaySchedules.map((req: any) => {
            const companyName = req.companyName ?? req.companies?.[0]?.companyId ?? '업체명';
            const imgSrc = req.img ?? '/images/main/carousel1.png';
            return (
              <button
                key={req._id}
                onClick={() => navigate('/customer/schedule')}
                style={{
                  flexShrink: 0, width: '200px', height: '200px',
                  border: '1px solid #E6E6E6', borderRadius: '12px', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column', background: 'none', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '75%' }}>
                  <div style={{
                    position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0,0,0,0.65)', color: 'white', fontSize: '11px',
                    padding: '4px 12px', borderRadius: '999px',
                    display: 'flex', gap: '8px', zIndex: 1, whiteSpace: 'nowrap',
                  }}>
                    <span>{req.requestedTime}</span>
                    <span>방문예정</span>
                  </div>
                  <img src={imgSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.backgroundColor = '#F0F0F0'; }} />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#000326', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                    {companyName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CustomerMain;
