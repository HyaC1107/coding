import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { get, post } from '../../utils/api';
import CustomerLayout from '../../components/layout/CustomerLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const CustomerPick = () => {
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', region, category],
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
    <CustomerLayout>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>업체 찾기</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <Input 
              placeholder="지역을 입력하세요 (예: 서울시 마포구)" 
              value={region}
              onChange={e => setRegion(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input 
              placeholder="카테고리를 입력하세요 (예: 도배)" 
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : companies?.length > 0 ? (
          companies.map((company: any) => (
            <div 
              key={company._id} 
              onClick={() => handleToggleCompany(company._id)}
              style={{
                ...companyCardStyle,
                border: selectedCompanies.includes(company._id) ? '2px solid var(--color-primary)' : '1px solid #eee',
                backgroundColor: selectedCompanies.includes(company._id) ? 'rgba(44, 176, 123, 0.05)' : 'white'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{company.companyName}</h3>
              <p style={{ color: 'var(--color-gray)', fontSize: '14px' }}>{company.address}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                {company.categories?.map((cat: string) => (
                  <span key={cat} style={tagStyle}>{cat}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>조건에 맞는 업체가 없습니다.</p>
        )}
      </div>

      {selectedCompanies.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: 'var(--border-radius)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          zIndex: 100
        }}>
          <p style={{ fontWeight: 'bold' }}>{selectedCompanies.length}개 업체 선택됨</p>
          <Button onClick={handleRequest}>방문 견적 요청하기</Button>
        </div>
      )}
    </CustomerLayout>
  );
};

const companyCardStyle: React.CSSProperties = {
  padding: '20px',
  borderRadius: 'var(--border-radius)',
  cursor: 'pointer',
  transition: 'all 0.2s',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const tagStyle: React.CSSProperties = {
  backgroundColor: '#F0F9F4',
  color: 'var(--color-primary)',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold'
};

export default CustomerPick;
