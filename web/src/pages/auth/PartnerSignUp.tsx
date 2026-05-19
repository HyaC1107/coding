import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postForm, post } from '../../utils/api';

const PRIMARY = '#2CB07B';
const DARK = '#000326';
const ERROR = '#FF3120';

const inputStyle: React.CSSProperties = {
  width: '100%', height: '52px', padding: '0 16px',
  borderRadius: '10px', border: '1.5px solid #E6E6E6',
  fontSize: '15px', color: DARK, outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '13px', fontWeight: 'bold',
  color: DARK, marginBottom: '8px',
};

const PartnerSignUp = () => {
  const [formData, setFormData] = useState<any>({
    userId: '', password: '', passwordConfirm: '', email: '', name: '', phoneNumber: '',
    type: 'constructor', companyName: '', businessNumber: '', address: '',
    heavyType: '', career: '', heavyTON: '',
  });
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, [key]: e.target.value }));
    if (key === 'userId') setIsIdChecked(false);
  };

  const getInputStyle = (key: string): React.CSSProperties => ({
    ...inputStyle, borderColor: focusedField === key ? PRIMARY : '#E6E6E6',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files?.[0]) setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIdChecked) { alert('아이디 중복 확인을 해주세요.'); return; }
    if (formData.password !== formData.passwordConfirm) { alert('비밀번호가 일치하지 않습니다.'); return; }
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    Object.keys(files).forEach(k => data.append(k, files[k]));
    try {
      await postForm('/auth/register/partner', data);
      alert('파트너 회원가입 신청이 완료되었습니다. 심사 후 승인됩니다.');
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.message || '가입 신청에 실패했습니다.');
    }
  };

  const handleCheckId = async () => {
    if (!formData.userId) { alert('아이디를 입력해주세요.'); return; }
    try {
      const data = await post('/auth/check', { userId: formData.userId });
      if (data.available) { alert('사용 가능한 아이디입니다.'); setIsIdChecked(true); }
      else alert('이미 사용 중인 아이디입니다.');
    } catch { alert('아이디 중복 확인에 실패했습니다.'); }
  };

  const pwMismatch = formData.passwordConfirm.length > 0 && formData.password !== formData.passwordConfirm;

  const FileField = ({ label, fieldKey }: { label: string; fieldKey: string }) => (
    <div>
      <label style={{ ...labelStyle, fontSize: '12px' }}>{label}</label>
      <label style={{
        display: 'flex', alignItems: 'center', height: '44px', padding: '0 14px',
        border: '1.5px dashed #D0D0D0', borderRadius: '8px', cursor: 'pointer',
        fontSize: '13px', color: '#848484',
      }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {files[fieldKey]?.name || '파일 선택'}
        </span>
        <input type="file" style={{ display: 'none' }} onChange={e => handleFileChange(e, fieldKey)} />
      </label>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 24px 80px' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        <h1 style={{ fontSize: '26px', fontWeight: '900', color: DARK, textAlign: 'center', marginBottom: '32px' }}>파트너 회원가입</h1>

        {/* 파트너 타입 선택 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '32px' }}>
          {(['constructor', 'heavy'] as const).map(t => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '999px',
                border: formData.type === t ? `6px solid ${PRIMARY}` : '2px solid #D0D0D0',
                transition: 'border 0.15s',
              }} onClick={() => setFormData((p: any) => ({ ...p, type: t }))} />
              <span style={{ fontSize: '16px', fontWeight: formData.type === t ? 'bold' : '500', color: formData.type === t ? DARK : '#848484' }}>
                {t === 'constructor' ? '시공업체' : '중장비업체'}
              </span>
            </label>
          ))}
        </div>

        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* 기본 정보 */}
          <p style={{ fontSize: '15px', fontWeight: '900', color: DARK, paddingTop: '4px' }}>기본 정보</p>

          {/* 아이디 */}
          <div>
            <label style={labelStyle}>아이디 <span style={{ color: ERROR }}>*</span></label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="아이디를 입력해주세요" value={formData.userId} onChange={set('userId')}
                onFocus={() => setFocusedField('userId')} onBlur={() => setFocusedField(null)}
                style={{ ...getInputStyle('userId'), flex: 1 }} />
              <button type="button" onClick={handleCheckId} style={{
                height: '52px', padding: '0 18px', flexShrink: 0,
                backgroundColor: isIdChecked ? '#848484' : PRIMARY, color: 'white',
                borderRadius: '10px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
              }}>
                {isIdChecked ? '확인완료' : '중복확인'}
              </button>
            </div>
            {isIdChecked && <p style={{ fontSize: '12px', color: PRIMARY, marginTop: '6px' }}>✓ 사용 가능한 아이디입니다.</p>}
          </div>

          <div>
            <label style={labelStyle}>비밀번호 <span style={{ color: ERROR }}>*</span></label>
            <input type="password" placeholder="비밀번호를 입력해주세요" value={formData.password} onChange={set('password')}
              onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('password')} />
          </div>

          <div>
            <label style={labelStyle}>비밀번호 확인 <span style={{ color: ERROR }}>*</span></label>
            <input type="password" placeholder="비밀번호를 다시 입력해주세요" value={formData.passwordConfirm} onChange={set('passwordConfirm')}
              onFocus={() => setFocusedField('passwordConfirm')} onBlur={() => setFocusedField(null)}
              style={{ ...getInputStyle('passwordConfirm'), borderColor: pwMismatch ? ERROR : focusedField === 'passwordConfirm' ? PRIMARY : '#E6E6E6' }} />
            {pwMismatch && <p style={{ fontSize: '12px', color: ERROR, marginTop: '6px' }}>비밀번호가 일치하지 않습니다.</p>}
          </div>

          <div>
            <label style={labelStyle}>이메일 <span style={{ color: ERROR }}>*</span></label>
            <input type="email" placeholder="이메일을 입력해주세요" value={formData.email} onChange={set('email')}
              onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('email')} />
          </div>

          <div>
            <label style={labelStyle}>대표자 성함 <span style={{ color: ERROR }}>*</span></label>
            <input type="text" placeholder="성함을 입력해주세요" value={formData.name} onChange={set('name')}
              onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('name')} />
          </div>

          <div>
            <label style={labelStyle}>대표번호 <span style={{ color: ERROR }}>*</span></label>
            <input type="text" placeholder="010-0000-0000" value={formData.phoneNumber} onChange={set('phoneNumber')}
              onFocus={() => setFocusedField('phoneNumber')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('phoneNumber')} />
          </div>

          {/* 구분선 */}
          <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }} />

          {/* 업체 정보 */}
          <p style={{ fontSize: '15px', fontWeight: '900', color: DARK }}>업체 정보</p>

          <div>
            <label style={labelStyle}>업체명</label>
            <input type="text" placeholder="업체명을 입력해주세요" value={formData.companyName} onChange={set('companyName')}
              onFocus={() => setFocusedField('companyName')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('companyName')} />
          </div>

          <div>
            <label style={labelStyle}>사업자 등록번호</label>
            <input type="text" placeholder="000-00-00000" value={formData.businessNumber} onChange={set('businessNumber')}
              onFocus={() => setFocusedField('businessNumber')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('businessNumber')} />
          </div>

          <div>
            <label style={labelStyle}>업체 주소</label>
            <input type="text" placeholder="주소를 입력해주세요" value={formData.address} onChange={set('address')}
              onFocus={() => setFocusedField('address')} onBlur={() => setFocusedField(null)}
              style={getInputStyle('address')} />
          </div>

          {/* 중장비 전용 */}
          {formData.type === 'heavy' && (
            <>
              <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }} />
              <p style={{ fontSize: '15px', fontWeight: '900', color: DARK }}>중장비 정보</p>
              <div>
                <label style={labelStyle}>중장비 종류</label>
                <input type="text" placeholder="예: 굴삭기" value={formData.heavyType} onChange={set('heavyType')}
                  onFocus={() => setFocusedField('heavyType')} onBlur={() => setFocusedField(null)}
                  style={getInputStyle('heavyType')} />
              </div>
              <div>
                <label style={labelStyle}>경력 (년)</label>
                <input type="number" placeholder="경력을 입력해주세요" value={formData.career} onChange={set('career')}
                  onFocus={() => setFocusedField('career')} onBlur={() => setFocusedField(null)}
                  style={getInputStyle('career')} />
              </div>
              <div>
                <label style={labelStyle}>톤수 (TON)</label>
                <input type="text" placeholder="예: 5톤" value={formData.heavyTON} onChange={set('heavyTON')}
                  onFocus={() => setFocusedField('heavyTON')} onBlur={() => setFocusedField(null)}
                  style={getInputStyle('heavyTON')} />
              </div>
            </>
          )}

          {/* 서류 첨부 */}
          <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }} />
          <p style={{ fontSize: '15px', fontWeight: '900', color: DARK }}>서류 첨부</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FileField label="프로필 이미지" fieldKey="profileImg" />
            <FileField label="사업자등록증" fieldKey="CBPImg" />
            <FileField label="신분증" fieldKey="personalIdImg" />
            {formData.type === 'constructor' ? (
              <FileField label="리스카 사진" fieldKey="leaseCarImg" />
            ) : (
              <>
                <FileField label="장비 정면" fieldKey="frontImg" />
                <FileField label="장비 측면" fieldKey="sideImg" />
                <FileField label="장비 후면" fieldKey="rearImg" />
              </>
            )}
          </div>

          {/* 제출 버튼 */}
          <div style={{ marginTop: '8px' }}>
            <button
              type="submit"
              style={{
                width: '100%', height: '54px', backgroundColor: DARK, color: 'white',
                borderRadius: '40px', fontSize: '16px', fontWeight: 'bold', border: 'none',
                cursor: 'pointer', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              가입 신청하기
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/" style={{ fontSize: '14px', color: '#848484', textDecoration: 'none' }}>
            로그인으로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PartnerSignUp;
