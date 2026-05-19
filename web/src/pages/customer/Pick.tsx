import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { get, post, BASE_URL } from '../../utils/api';

const CustomerPick = () => {
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [tab, setTab] = useState<'all' | 'picked'>('all');

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', region, category, tab],
    queryFn: () => get('/companies', { region, category, type: 'constructor' }),
  });

  const requestMutation = useMutation({
    mutationFn: (requestData: any) => post('/requests', requestData),
    onSuccess: () => {
      alert('시공 요청이 완료되었습니다.');
      setSelectedCompanies([]);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || '요청에 실패했습니다.');
    },
  });

  const handleToggleCompany = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== id));
    } else {
      if (selectedCompanies.length >= 3) {
        alert('최대 3개 업체까지 선택 가능합니다.');
        return;
      }
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const handleRequest = () => {
    if (selectedCompanies.length === 0) {
      alert('업체를 선택해주세요.');
      return;
    }
    const requestedDate = prompt('희망 날짜를 입력해주세요 (예: 2023-05-25)');
    const requestedTime = prompt('희망 시간을 입력해주세요 (예: AM 09:00)');
    
    if (!requestedDate || !requestedTime) return;

    requestMutation.mutate({
      companies: selectedCompanies.map(id => ({ companyId: id, companyType: 'constructor' })),
      categories: [category],
      region,
      requestedDate,
      requestedTime
    });
  };

  return (
    <div className="space-y-8">
      {/* Header & Filter */}
      <div className="flex justify-between items-end">
        <div className="flex gap-10 border-b border-gainsboro w-full max-w-[400px]">
          <button 
            onClick={() => setTab('picked')}
            className={`pb-4 text-[20px] font-bold transition-colors ${tab === 'picked' ? 'text-primary border-b-4 border-primary' : 'text-gray'}`}
          >
            찜콕
          </button>
          <button 
            onClick={() => setTab('all')}
            className={`pb-4 text-[20px] font-bold transition-colors ${tab === 'all' ? 'text-primary border-b-4 border-primary' : 'text-gray'}`}
          >
            전체
          </button>
        </div>

        <div className="flex gap-4 mb-1">
          <div className="relative">
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="appearance-none bg-white border border-gainsboro rounded-lg px-6 py-2 pr-10 text-[15px] font-bold outline-none cursor-pointer"
            >
              <option value="">종합인테리어</option>
              <option value="도배">도배</option>
              <option value="장판">장판</option>
              <option value="전기">전기</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-2 h-2">
              <img src="/images/triangle.png" className="w-full" alt="" />
            </div>
          </div>
          <div className="relative">
            <select 
              value={region} 
              onChange={e => setRegion(e.target.value)}
              className="appearance-none bg-white border border-gainsboro rounded-lg px-6 py-2 pr-10 text-[15px] font-bold outline-none cursor-pointer"
            >
              <option value="">지역선택</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-2 h-2">
              <img src="/images/triangle.png" className="w-full" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-gray font-bold">로딩 중...</div>
        ) : companies?.length > 0 ? (
          companies.map((company: any) => (
            <div 
              key={company._id} 
              onClick={() => handleToggleCompany(company._id)}
              className={`w-full max-w-[346px] mx-auto bg-white rounded-[8px] border overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer relative ${
                selectedCompanies.includes(company._id) ? 'border-primary ring-2 ring-primary/20' : 'border-gainsboro'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 flex gap-4 items-center">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden bg-gray-100 border border-gainsboro flex-shrink-0">
                  <img 
                    src={company.profileImg ? `${BASE_URL}/${company.profileImg.replace(/\\/g, '/')}` : '/images/pick1.png'} 
                    className="w-full h-full object-cover" 
                    alt={company.companyName} 
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-[18px] font-bold text-dark truncate">{company.companyName}</h3>
                  <div className="flex gap-1.5 flex-wrap mt-1">
                    {['보증보험가능', '자격증보유', '6개월A/S'].map(tag => (
                      <span key={tag} className="text-[10px] text-gray border border-gainsboro px-1.5 py-0.5 rounded-sm bg-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-6 h-6 flex-shrink-0">
                   <img src={selectedCompanies.includes(company._id) ? '/images/check-color.png' : '/images/check-none.png'} className="w-full" alt="" />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex h-[119px] border-y border-gainsboro bg-[#F9F9F9]">
                <div className="w-[173px] border-r border-gainsboro">
                  <img src="/images/hanmaum/1.png" className="w-full h-full object-cover opacity-80" alt="" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                </div>
                <div className="flex-1">
                   <img src="/images/hanmaum/2.png" className="w-full h-full object-cover opacity-80" alt="" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 flex justify-between items-center text-[13px] font-medium text-dark">
                <div className="flex items-center gap-1">
                  <img src="/images/star/1.png" className="w-3.5 h-3.5" alt="" />
                  <span className="text-primary font-bold">+100</span>
                </div>
                <div className="text-gray flex items-center gap-1.5">
                  최근시공 <span className="text-dark font-bold">30건</span>
                </div>
              </div>
              
              {selectedCompanies.includes(company._id) && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray font-bold">검색 결과가 없습니다.</div>
        )}
      </div>

      {/* Floating Action Button */}
      {selectedCompanies.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white px-10 py-6 rounded-full shadow-2xl border border-primary flex items-center gap-10 z-[100] animate-in fade-in slide-in-from-bottom-5">
          <div className="text-[18px]">
            <span className="font-bold text-primary">{selectedCompanies.length}</span>
            <span className="text-dark">개 업체 선택됨</span>
          </div>
          <button 
            onClick={handleRequest}
            className="bg-primary text-white px-8 py-3 rounded-full text-[17px] font-black hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            방문 견적 요청하기
            <img src="/images/next.png" className="w-4 invert" alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerPick;
