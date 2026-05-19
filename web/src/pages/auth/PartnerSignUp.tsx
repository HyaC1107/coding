import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postForm } from '../../utils/api';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const PartnerSignUp = () => {
  const [formData, setFormData] = useState<any>({
    userId: '',
    password: '',
    email: '',
    name: '',
    phoneNumber: '',
    type: 'constructor',
    companyName: '',
    businessNumber: '',
    address: '',
    heavyType: '',
    career: '',
    heavyTON: '',
  });

  const [files, setFiles] = useState<Record<string, File>>({});
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    Object.keys(files).forEach(key => data.append(key, files[key]));

    try {
      await postForm('/auth/register/partner', data);
      alert('파트너 회원가입 신청이 완료되었습니다. 심사 후 승인됩니다.');
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || '가입 신청에 실패했습니다.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>파트너 회원가입</h1>
        
        <form onSubmit={handleSignUp}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={formData.type === 'constructor'} 
                onChange={() => setFormData({ ...formData, type: 'constructor' })} 
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <span style={{ fontWeight: formData.type === 'constructor' ? 'bold' : 'normal' }}>시공업체</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={formData.type === 'heavy'} 
                onChange={() => setFormData({ ...formData, type: 'heavy' })} 
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <span style={{ fontWeight: formData.type === 'heavy' ? 'bold' : 'normal' }}>중장비업체</span>
            </label>
          </div>

          <Input label="아이디" value={formData.userId} onChange={e => setFormData({ ...formData, userId: e.target.value })} />
          <Input label="비밀번호" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          <Input label="이메일" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <Input label="대표자 성함" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input label="대표번호" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
          
          <div style={{ borderTop: '1px solid #eee', margin: '20px 0', paddingTop: '20px' }}>
            <Input label="업체명" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
            <Input label="사업자 등록번호" value={formData.businessNumber} onChange={e => setFormData({ ...formData, businessNumber: e.target.value })} />
            <Input label="업체 주소" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
          </div>

          {formData.type === 'heavy' && (
            <div style={{ borderTop: '1px solid #eee', margin: '20px 0', paddingTop: '20px' }}>
              <Input label="중장비 종류" value={formData.heavyType} onChange={e => setFormData({ ...formData, heavyType: e.target.value })} />
              <Input label="경력 (년)" type="number" value={formData.career} onChange={e => setFormData({ ...formData, career: e.target.value })} />
              <Input label="톤수 (TON)" type="number" value={formData.heavyTON} onChange={e => setFormData({ ...formData, heavyTON: e.target.value })} />
            </div>
          )}

          <div style={{ borderTop: '1px solid #eee', margin: '20px 0', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>서류 첨부</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>프로필 이미지</label>
                <input type="file" onChange={e => handleFileChange(e, 'profileImg')} />
              </div>
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>사업자등록증</label>
                <input type="file" onChange={e => handleFileChange(e, 'businessLicenseImg')} />
              </div>
              {formData.type === 'constructor' ? (
                <div>
                  <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>면허/자격증</label>
                  <input type="file" onChange={e => handleFileChange(e, 'licenseImg')} />
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>장비 정면</label>
                    <input type="file" onChange={e => handleFileChange(e, 'frontImg')} />
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>장비 측면</label>
                    <input type="file" onChange={e => handleFileChange(e, 'sideImg')} />
                  </div>
                </>
              )}
            </div>
          </div>

          <Button type="submit" fullWidth variant="primary" style={{ marginTop: '40px' }}>가입 신청하기</Button>
        </form>
      </div>
    </div>
  );
};

export default PartnerSignUp;
