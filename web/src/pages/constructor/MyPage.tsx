import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, postForm, BASE_URL } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const menuItems = [
  { name: '공지사항', icon: '/images/07-mypage/02-customer/03-notice.png', path: '/constructor/notice' },
  { name: '리뷰관리', icon: '/images/07-mypage/02-customer/04-review.png', path: '/constructor/mypage' },
  { name: '우리가게 꾸미기', icon: '/images/07-mypage/01-company/13-deco.png', path: '/constructor/mypage' },
  { name: '광고결제', icon: '/images/07-mypage/01-company/04-pay.png', path: '/constructor/mypage' },
  { name: '업체정보 수정요청', icon: '/images/07-mypage/01-company/11-revise.png', path: '/constructor/mypage' },
  { name: '자주 묻는 질문', icon: '/images/07-mypage/02-customer/11-faq.png', path: '/constructor/qna' },
  { name: '1:1 문의하기/소비자 신고', icon: '/images/07-mypage/02-customer/02-qna.png', path: '/constructor/qna' },
  { name: '회원정보 수정하기', icon: '/images/07-mypage/02-customer/13-info.png', path: '/constructor/mypage' },
];

const ConstructorMyPage = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery({
    queryKey: ['companyProfile', auth?.userId],
    queryFn: () => get(`/companies/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  if (isLoading) return <div className="py-20 text-center text-gray font-bold">로딩 중...</div>;

  return (
    <div className="space-y-10">
      {/* Profile Banner */}
      <div className="bg-[#416292]/10 rounded-2xl p-10 flex items-center gap-10 border border-gainsboro h-[146px]">
        <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden border-4 border-white shadow-sm bg-gray-100 flex-shrink-0">
          <img 
            src={company?.profileImg ? `${BASE_URL}/${company.profileImg.replace(/\\/g, '/')}` : '/images/pick1.png'} 
            className="w-full h-full object-cover" 
            alt="Profile" 
          />
        </div>
        <div className="flex-1">
          <h2 className="text-[24px] font-black text-dark mb-1">{company?.companyName || '업체명 없음'}</h2>
          <div className="flex items-center gap-4">
            <span className="text-[20px] font-bold text-dark">{company?.userId?.phoneNumber || '전화번호 없음'}</span>
            <button className="bg-[#416292] text-white text-[11px] px-3 py-1 rounded-full font-bold hover:opacity-90 transition-colors">
              업체 정보 관리
            </button>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gainsboro overflow-hidden divide-y divide-gainsboro">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className="flex items-center gap-8 p-6 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-8 h-8 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
              <img src={item.icon} className="max-w-full max-h-full object-contain" alt={item.name} onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <span className="text-[19px] font-bold text-[#444] group-hover:text-dark transition-colors flex-1">{item.name}</span>
            <img src="/images/next.png" className="w-4 opacity-30" alt="" />
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center pt-10">
        <button className="text-gray text-[14px] font-medium border-b border-gray pb-0.5 hover:text-dark hover:border-dark transition-all">
          파트너 탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default ConstructorMyPage;
