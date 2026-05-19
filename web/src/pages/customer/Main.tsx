import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const categories = [
  { name: '3D도면설계', icon: '/images/02-main-category/001-3d.png' },
  { name: '종합인테리어', icon: '/images/02-main-category/002-interior.png' },
  { name: '철거', icon: '/images/02-main-category/003-demolition.png' },
  { name: '소방설비', icon: '/images/02-main-category/004-firefighting.png' },
  { name: '설비', icon: '/images/02-main-category/005-facility.png' },
  { name: '전기', icon: '/images/02-main-category/006-electronic.png' },
  { name: '샤시', icon: '/images/02-main-category/007-chassis.png' },
  { name: '목공', icon: '/images/02-main-category/008-woodworking.png' },
  { name: '욕실', icon: '/images/02-main-category/009-bath.png' },
  { name: '타일', icon: '/images/02-main-category/010-tile.png' },
  { name: '페인트', icon: '/images/02-main-category/011-paint.png' },
  { name: '도배', icon: '/images/02-main-category/012-papering.png' },
  { name: '필름', icon: '/images/02-main-category/013-film.png' },
  { name: '장판', icon: '/images/02-main-category/014-floor.png' },
  { name: '조명', icon: '/images/02-main-category/015-light.png' },
  { name: '마루', icon: '/images/02-main-category/016-flooring.png' },
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

const CustomerMain = () => {
  const { auth } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: requestCount } = useQuery({
    queryKey: ['newRequests', auth?.userId],
    queryFn: () => get('/requests', { customerId: auth?.userId, status: 31 }).then((res: any[]) => res.length),
    enabled: !!auth?.userId,
  });

  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="w-full h-[250px] rounded-2xl overflow-hidden bg-dark">
        <img 
          src="/images/main/banner.png" 
          className="w-full h-full object-cover opacity-80" 
          alt="Banner" 
          onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/1200x250?text=PICK+Service')}
        />
      </div>

      {/* Category Grid */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gainsboro">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[22px] font-bold text-dark">업체찾기</h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 text-gray hover:text-dark transition-colors"
          >
            <span className="text-[14px] font-medium">{isCollapsed ? '펼치기' : '접어두기'}</span>
            <div className={`w-4 h-4 flex items-center justify-center transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
              <img src="/images/chevron.png" className="w-full" alt="" />
            </div>
          </button>
        </div>

        <div className={`grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-4 transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-[120px]' : 'max-h-[1000px]'}`}>
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={`/customer/pick?category=${cat.name}`}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-[73px] h-[73px] bg-[#F9F9F9] rounded-2xl flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                <img src={cat.icon} className="w-[50px] h-[50px] object-contain" alt={cat.name} />
              </div>
              <span className="text-[14px] font-medium text-dark text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="space-y-6">
        <h2 className="text-[22px] font-bold text-dark">오늘의 방문스케줄</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {/* Placeholder for real schedule cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[300px] bg-white p-6 rounded-2xl border border-gainsboro shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">
                  {i}
                </div>
                <div>
                  <h3 className="font-bold text-dark text-[17px]">코지인테리어</h3>
                  <p className="text-primary text-[13px] font-bold">방문예정</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                <p className="text-[14px] text-dark font-medium">PM 13:00</p>
                <p className="text-[14px] text-gray leading-tight">서울특별시 마포구 도화동 00-1</p>
              </div>
              <Link to="/customer/schedule" className="text-center py-2 text-[14px] text-dark border-t border-gainsboro mt-2 pt-4">
                상세보기
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {requestCount > 0 && (
        <div className="fixed bottom-10 right-10 bg-primary text-white px-6 py-4 rounded-full shadow-2xl animate-bounce flex items-center gap-3">
          <span className="font-black text-xl">!</span>
          <span className="font-bold">신규 요청 {requestCount}건이 진행 중입니다</span>
        </div>
      )}
    </div>
  );
};

import { Link } from 'react-router-dom';

export default CustomerMain;
