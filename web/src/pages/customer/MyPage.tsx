import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, postForm, BASE_URL } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const menuItems = [
  { name: '공지사항', icon: '/images/07-mypage/02-customer/03-notice.png', path: '/customer/notice' },
  { name: '찜콕', icon: '/images/07-mypage/02-customer/12-pick.png', path: '/customer/pick' },
  { name: '리뷰관리', icon: '/images/07-mypage/02-customer/04-review.png', path: '/customer/mypage' },
  { name: '자주 묻는 질문', icon: '/images/07-mypage/02-customer/11-faq.png', path: '/customer/qna' },
  { name: '1:1 문의하기(불편, 업체신고 등)', icon: '/images/07-mypage/02-customer/02-qna.png', path: '/customer/qna' },
  { name: '회원정보 수정하기', icon: '/images/07-mypage/02-customer/13-info.png', path: '/customer/mypage' },
];

const CustomerMyPage = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile', auth?.userId],
    queryFn: () => get(`/users/${auth?.userId}`),
    enabled: !!auth?.userId,
  });

  if (isLoading) return <div className="py-20 text-center text-gray font-bold">로딩 중...</div>;

  return (
    <div className="space-y-10">
      {/* Profile Banner */}
      <div className="bg-[#F6F6F6] rounded-2xl p-10 flex items-center gap-10 border border-gainsboro h-[146px]">
        <div className="w-[88px] h-[88px] rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-100 flex-shrink-0">
          <img 
            src={user?.profileImg ? `${BASE_URL}/${user.profileImg.replace(/\\/g, '/')}` : '/images/mypage-profile.png'} 
            className="w-full h-full object-cover" 
            alt="Profile" 
          />
        </div>
        <div className="flex-1">
          <h2 className="text-[24px] font-black text-dark mb-1">{user?.nickname || user?.name || '사용자'}</h2>
          <div className="flex items-center gap-4">
            <span className="text-[20px] font-bold text-dark">{user?.phoneNumber || '전화번호 없음'}</span>
            <button className="bg-gray text-white text-[11px] px-3 py-1 rounded-full font-bold hover:bg-dark transition-colors">
              정보 수정
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
              <img src={item.icon} className="max-w-full max-h-full object-contain" alt={item.name} />
            </div>
            <span className="text-[19px] font-bold text-[#444] group-hover:text-dark transition-colors flex-1">{item.name}</span>
            <img src="/images/next.png" className="w-4 opacity-30" alt="" />
          </Link>
        ))}
      </div>
      
      {/* Footer Utility */}
      <div className="flex justify-center pt-10">
        <button className="text-gray text-[14px] font-medium border-b border-gray pb-0.5 hover:text-dark hover:border-dark transition-all">
          회원탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default CustomerMyPage;
