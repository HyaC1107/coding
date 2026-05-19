import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import CalendarModal from '../../components/common/CalendarModal';
import { dummyCompanies } from '../../data/dummyCompanies';
import type { DummyCompany } from '../../data/dummyCompanies';

const PRIMARY = '#2CB07B';
const DARK = '#000326';

// ── 카테고리 데이터 (Main.tsx와 동일) ──────────────────────
const residentialCategories = [
  { name: '3D도면설계',  icon: '/images/02-main-category/001-3d.png' },
  { name: '종합인테리어',icon: '/images/02-main-category/002-interior.png' },
  { name: '철거',        icon: '/images/02-main-category/003-demolition.png' },
  { name: '설비',        icon: '/images/02-main-category/006-electronic.png' },
  { name: '전기',        icon: '/images/02-main-category/005-facility.png' },
  { name: '샤시',        icon: '/images/02-main-category/007-chassis.png' },
  { name: '목공',        icon: '/images/02-main-category/008-woodworking.png' },
  { name: '욕실',        icon: '/images/02-main-category/009-bath.png' },
  { name: '타일',        icon: '/images/02-main-category/010-tile.png' },
  { name: '페인트',      icon: '/images/02-main-category/011-paint.png' },
  { name: '마루',        icon: '/images/02-main-category/014-floor.png' },
  { name: '필름',        icon: '/images/02-main-category/013-film.png' },
  { name: '도배',        icon: '/images/02-main-category/012-papering.png' },
  { name: '조명',        icon: '/images/02-main-category/015-light.png' },
  { name: '장판',        icon: '/images/02-main-category/016-flooring.png' },
  { name: '청소',        icon: '/images/02-main-category/024-cleaning.png' },
  { name: '도어락',      icon: '/images/02-main-category/025-doorlock.png' },
  { name: '냉난방',      icon: '/images/02-main-category/022-warming.png' },
  { name: '싱크',        icon: '/images/02-main-category/017-sink.png' },
  { name: 'CCTV',        icon: '/images/02-main-category/023-cctv.png' },
  { name: '카고크레인',  icon: '/images/02-main-category/026-cargo.png' },
  { name: '사다리차',    icon: '/images/02-main-category/027-laddercar.png' },
  { name: '고소작업차',  icon: '/images/02-main-category/028-aerialcar.png' },
];

const storeCategories = [
  { name: '3D도면설계',  icon: '/images/02-main-category/001-3d.png' },
  { name: '종합인테리어',icon: '/images/02-main-category/002-interior.png' },
  { name: '철거',        icon: '/images/02-main-category/003-demolition.png' },
  { name: '소방설비',    icon: '/images/02-main-category/004-firefighting.png' },
  { name: '설비',        icon: '/images/02-main-category/006-electronic.png' },
  { name: '전기',        icon: '/images/02-main-category/005-facility.png' },
  { name: '샤시',        icon: '/images/02-main-category/007-chassis.png' },
  { name: '목공',        icon: '/images/02-main-category/008-woodworking.png' },
  { name: '욕실',        icon: '/images/02-main-category/009-bath.png' },
  { name: '타일',        icon: '/images/02-main-category/010-tile.png' },
  { name: '페인트',      icon: '/images/02-main-category/011-paint.png' },
  { name: '마루',        icon: '/images/02-main-category/014-floor.png' },
  { name: '필름',        icon: '/images/02-main-category/013-film.png' },
  { name: '도배',        icon: '/images/02-main-category/012-papering.png' },
  { name: '조명',        icon: '/images/02-main-category/015-light.png' },
  { name: '장판',        icon: '/images/02-main-category/016-flooring.png' },
  { name: '싱크',        icon: '/images/02-main-category/017-sink.png' },
  { name: '닥트',        icon: '/images/02-main-category/018-doct.png' },
  { name: '금속공사',    icon: '/images/02-main-category/019-metalwork.png' },
  { name: '간판',        icon: '/images/02-main-category/020-sign.png' },
  { name: '천막&어닝',   icon: '/images/02-main-category/021-earning.png' },
  { name: '냉난방',      icon: '/images/02-main-category/022-warming.png' },
  { name: 'CCTV',        icon: '/images/02-main-category/023-cctv.png' },
  { name: '청소',        icon: '/images/02-main-category/024-cleaning.png' },
  { name: '도어락',      icon: '/images/02-main-category/025-doorlock.png' },
  { name: '카고크레인',  icon: '/images/02-main-category/026-cargo.png' },
  { name: '사다리차',    icon: '/images/02-main-category/027-laddercar.png' },
  { name: '고소작업차',  icon: '/images/02-main-category/028-aerialcar.png' },
];

// ── 타입 ───────────────────────────────────────────────────
interface SelectedCompany extends DummyCompany {
  fromCategory: string;
}

interface TimeEntry { date: string; time: string; }

// ── 안내문 모달 ─────────────────────────────────────────────
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
        <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: DARK }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#848484', lineHeight: 1 }}>✕</button>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0, listStyle: 'none' }}>
        {lines.map((line, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#444', lineHeight: '1.6' }}>
            <span style={{ color: PRIMARY, fontWeight: 'bold', flexShrink: 0 }}>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        style={{ width: '100%', marginTop: '24px', height: '48px', backgroundColor: DARK, color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        확인
      </button>
    </div>
  </div>
);

// ── 공용 하단 고정 버튼 바 ──────────────────────────────────
const BottomBar = ({
  leftLabel, guideTitle, guideLines,
  rightLabel, onRight, rightDisabled,
}: {
  leftLabel: string; guideTitle: string; guideLines: string[];
  rightLabel: string; onRight: () => void; rightDisabled?: boolean;
}) => {
  const [showGuide, setShowGuide] = useState(false);
  return (
    <>
      <div style={{
        position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        width: '65%', maxWidth: '580px',
        display: 'flex', gap: '10px', zIndex: 100,
      }}>
        <button
          onClick={() => setShowGuide(true)}
          style={{
            flex: 1, padding: '13px 0',
            backgroundColor: 'white', color: '#555',
            fontSize: '13px', fontWeight: '600',
            border: '1.5px solid #D0D0D0', borderRadius: '10px',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {leftLabel}
        </button>
        <button
          onClick={onRight}
          disabled={rightDisabled}
          style={{
            flex: 1, padding: '13px 0',
            backgroundColor: rightDisabled ? '#D0D0D0' : PRIMARY, color: 'white',
            fontSize: '13px', fontWeight: 'bold',
            border: 'none', borderRadius: '10px',
            cursor: rightDisabled ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            boxShadow: rightDisabled ? 'none' : '0 2px 8px rgba(44,176,123,0.35)',
          }}
        >
          {rightLabel} <span style={{ fontSize: '15px', lineHeight: 1 }}>›</span>
        </button>
      </div>
      {showGuide && <GuideModal title={guideTitle} lines={guideLines} onClose={() => setShowGuide(false)} />}
    </>
  );
};

// ── 카테고리 탭 ─────────────────────────────────────────────
const CategoryTabs = ({
  categories, activeIdx, onChange,
}: {
  categories: string[]; activeIdx: number; onChange: (i: number) => void;
}) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '0',
    borderBottom: '1px solid #E6E6E6', marginBottom: '24px',
    overflowX: 'auto', padding: '0 24px',
  }}>
    {categories.map((cat, i) => (
      <button key={cat} onClick={() => onChange(i)} style={{
        padding: '14px 20px', whiteSpace: 'nowrap',
        fontSize: '14px', fontWeight: activeIdx === i ? 'bold' : '500',
        color: activeIdx === i ? PRIMARY : '#848484',
        borderBottom: activeIdx === i ? `2px solid ${PRIMARY}` : '2px solid transparent',
        backgroundColor: 'transparent', border: 'none',
        borderBottomStyle: 'solid', borderBottomWidth: '2px',
        borderBottomColor: activeIdx === i ? PRIMARY : 'transparent',
        cursor: 'pointer',
      }}>
        {cat}
      </button>
    ))}
  </div>
);

// ── 메인 컴포넌트 ───────────────────────────────────────────
const CustomerPick = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isStore, setIsStore] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [selectedCompanies, setSelectedCompanies] = useState<SelectedCompany[]>([]);
  const [companyTimes, setCompanyTimes] = useState<Record<string, TimeEntry>>({});
  const [calendarTargetId, setCalendarTargetId] = useState<string | null>(null);

  const categories = isStore ? storeCategories : residentialCategories;

  const requestMutation = useMutation({
    mutationFn: (data: any) => post('/requests', data),
    onSuccess: () => {
      alert('방문 일정 요청이 완료되었습니다.');
      navigate('/customer/schedule');
    },
    onError: (e: any) => alert(e.response?.data?.message || '요청에 실패했습니다.'),
  });

  // ── 카테고리 선택 토글 ──
  const toggleCat = (name: string) => {
    setSelectedCats(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  // ── 업체 선택 토글 ──
  const toggleCompany = (company: DummyCompany) => {
    const exists = selectedCompanies.find(c => c._id === company._id);
    if (exists) {
      setSelectedCompanies(prev => prev.filter(c => c._id !== company._id));
      setCompanyTimes(prev => { const n = { ...prev }; delete n[company._id]; return n; });
    } else {
      if (selectedCompanies.length >= 3) {
        alert('최대 3개 업체까지 선택 가능합니다.');
        return;
      }
      setSelectedCompanies(prev => [
        ...prev,
        { ...company, fromCategory: selectedCats[activeCatIdx] ?? '' },
      ]);
    }
  };

  // ── 시간 설정 ──
  const handleTimeConfirm = (date: string, time: string) => {
    if (!calendarTargetId) return;
    setCompanyTimes(prev => ({ ...prev, [calendarTargetId]: { date, time } }));
    setCalendarTargetId(null);
  };

  // ── 최종 요청 제출 ──
  const handleSubmit = () => {
    const unset = selectedCompanies.filter(c => !companyTimes[c._id]);
    if (unset.length > 0) {
      alert(`${unset.map(c => c.companyName).join(', ')}의 방문 시간을 입력해주세요.`);
      return;
    }
    selectedCompanies.forEach(company => {
      const t = companyTimes[company._id];
      requestMutation.mutate({
        customerId: auth?.userId,
        companies: [{ companyId: company._id, companyType: 'constructor' }],
        categories: [company.fromCategory],
        region: company.region,
        requestedDate: t.date,
        requestedTime: t.time,
      });
    });
  };

  const companiesForTab = dummyCompanies.filter(
    c => c.category === selectedCats[activeCatIdx]
  );

  // ────────────────────────────────────────────────────────
  // STEP 1 — 시공 카테고리 선택
  // ────────────────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ padding: '0 0 100px' }}>
      {/* 토글 — 좌측 */}
      <div style={{ padding: '20px 24px 0' }}>
        <button
          onClick={() => setIsStore(!isStore)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div style={{ position: 'relative', width: '44px', height: '26px' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '999px', backgroundColor: isStore ? PRIMARY : '#E6E6E6', transition: 'background-color 0.2s' }} />
            <div style={{ position: 'absolute', top: '3px', width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '999px', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transform: isStore ? 'translateX(21px)' : 'translateX(3px)', transition: 'transform 0.2s' }} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#848484' }}>{isStore ? '상가' : '주거'}</span>
        </button>
      </div>

      {/* 제목 — 가운데 정렬 */}
      <div style={{ textAlign: 'center', padding: '16px 24px 4px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: DARK }}>필요한 시공을 선택해주세요</h2>
      </div>

      {/* 진행 표시 */}
      <div style={{ padding: '12px 32px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '999px', backgroundColor: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
        </div>
        <div style={{ flex: 1, height: '2px', backgroundColor: '#E6E6E6' }} />
        <div style={{ width: '22px', height: '22px', borderRadius: '999px', border: '2px solid #D0D0D0', backgroundColor: 'white' }} />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#E6E6E6' }} />
        <div style={{ width: '22px', height: '22px', borderRadius: '999px', border: '2px solid #D0D0D0', backgroundColor: 'white' }} />
      </div>

      {/* 카테고리 그리드 */}
      <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '16px 8px' }}>
        {categories.map(cat => {
          const sel = selectedCats.includes(cat.name);
          return (
            <button
              key={cat.name}
              onClick={() => toggleCat(cat.name)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '999px',
                border: sel ? `2px solid ${PRIMARY}` : '1px solid #E6E6E6',
                backgroundColor: sel ? 'rgba(44,176,123,0.08)' : '#F9F9F9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', transition: 'border-color 0.15s',
              }}>
                <img src={cat.icon} style={{ width: '44px', height: '44px', objectFit: 'contain' }} alt={cat.name} />
                {sel && (
                  <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', borderRadius: '999px', backgroundColor: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                  </div>
                )}
              </div>
              <span style={{ fontSize: '11px', color: sel ? PRIMARY : DARK, fontWeight: sel ? 'bold' : '400', textAlign: 'center', wordBreak: 'keep-all', lineHeight: '1.3' }}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: '0 24px' }}>
        <BottomBar
          leftLabel="주의사항 안내문"
          guideTitle="시공 주의사항"
          guideLines={[
            '시공업체 선택 전 반드시 업체와 충분한 상담을 진행하세요.',
            '업체 평점과 최근 시공 건수를 꼭 확인하세요.',
            '최대 3개 업체까지 동시에 방문 요청이 가능합니다.',
            '방문 견적 후 마음에 드는 업체에게 공사를 요청하세요.',
            '계약 전 견적서를 반드시 확인하시기 바랍니다.',
          ]}
          rightLabel="다음"
          onRight={() => {
            if (selectedCats.length === 0) { alert('시공 종류를 1개 이상 선택해주세요.'); return; }
            setActiveCatIdx(0);
            setStep(2);
          }}
          rightDisabled={selectedCats.length === 0}
        />
      </div>
    </div>
  );

  // ────────────────────────────────────────────────────────
  // STEP 2 — 업체 선택
  // ────────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ paddingBottom: '120px' }}>
      <CategoryTabs categories={selectedCats} activeIdx={activeCatIdx} onChange={setActiveCatIdx} />

      <div style={{ padding: '0 24px' }}>
        <p style={{ fontSize: '17px', fontWeight: 'bold', color: DARK, marginBottom: '20px', textAlign: 'center' }}>
          최대 3개 업체까지 선택 가능합니다
        </p>

        {/* 선택 현황 뱃지 */}
        {selectedCompanies.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {selectedCompanies.map(c => (
              <span key={c._id} style={{ backgroundColor: PRIMARY, color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '999px' }}>
                {c.companyName} ✓
              </span>
            ))}
          </div>
        )}

        {/* 업체 카드 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {companiesForTab.length > 0 ? companiesForTab.map(company => {
            const isSelected = selectedCompanies.some(c => c._id === company._id);
            return (
              <div
                key={company._id}
                onClick={() => toggleCompany(company)}
                style={{
                  backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden',
                  border: isSelected ? `2px solid ${PRIMARY}` : '1px solid #E6E6E6',
                  boxShadow: isSelected ? `0 0 0 3px rgba(44,176,123,0.12)` : '0 2px 8px rgba(0,0,0,0.05)',
                  cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
                }}
              >
                <div style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '999px', overflow: 'hidden', border: '1px solid #E6E6E6', backgroundColor: '#F0F0F0', flexShrink: 0 }}>
                    <img src={company.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '15px', fontWeight: 'bold', color: DARK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '5px' }}>{company.companyName}</p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {company.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '10px', color: '#848484', border: '1px solid #E6E6E6', padding: '1px 5px', borderRadius: '3px' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {isSelected && (
                    <div style={{ width: '20px', height: '20px', borderRadius: '999px', backgroundColor: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontSize: '11px' }}>✓</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', height: '100px', borderTop: '1px solid #E6E6E6', borderBottom: '1px solid #E6E6E6' }}>
                  <div style={{ width: '50%', overflow: 'hidden', borderRight: '1px solid #E6E6E6' }}>
                    <img src={company.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.2'; }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <img src={company.images[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.2'; }} />
                  </div>
                </div>
                <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: PRIMARY, fontWeight: 'bold' }}>+{company.rating}</span>
                  <span style={{ color: '#848484' }}>최근시공 <strong style={{ color: DARK }}>{company.recentCount}건</strong></span>
                </div>
              </div>
            );
          }) : (
            <div style={{ gridColumn: '1/-1', padding: '60px 0', textAlign: 'center', color: '#848484' }}>
              해당 카테고리의 업체가 없습니다.
            </div>
          )}
        </div>

        <BottomBar
          leftLabel="주의사항 안내문"
          guideTitle="업체 선택 안내"
          guideLines={[
            '최대 3개 업체까지 동시에 선택하여 방문 요청할 수 있습니다.',
            '업체 프로필과 포트폴리오 이미지를 꼼꼼히 확인하세요.',
            '평점(+수치)이 높을수록 고객 만족도가 높은 업체입니다.',
            '업체 선택 후 다음 단계에서 방문 희망 시간을 설정하세요.',
            '방문 이후 마음에 드는 업체에게 공사를 요청하세요.',
          ]}
          rightLabel="다음"
          onRight={() => {
            if (selectedCompanies.length === 0) { alert('업체를 1개 이상 선택해주세요.'); return; }
            setStep(3);
          }}
          rightDisabled={selectedCompanies.length === 0}
        />
      </div>
    </div>
  );

  // ────────────────────────────────────────────────────────
  // STEP 3 — 방문 시간 설정
  // ────────────────────────────────────────────────────────
  return (
    <div style={{ paddingBottom: '120px' }}>
      {calendarTargetId && (
        <CalendarModal
          onConfirm={handleTimeConfirm}
          onClose={() => setCalendarTargetId(null)}
        />
      )}

      <CategoryTabs categories={selectedCats} activeIdx={activeCatIdx} onChange={setActiveCatIdx} />

      <div style={{ padding: '0 24px' }}>
        <p style={{ fontSize: '17px', fontWeight: 'bold', color: DARK, marginBottom: '20px', textAlign: 'center' }}>
          업체를 선택하여 희망방문요청 시간을 입력하세요
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {selectedCompanies.map(company => {
            const t = companyTimes[company._id];
            return (
              <div
                key={company._id}
                onClick={() => setCalendarTargetId(company._id)}
                style={{
                  backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden',
                  border: t ? `2px solid ${PRIMARY}` : '1px solid #E6E6E6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '999px', overflow: 'hidden', border: '1px solid #E6E6E6', backgroundColor: '#F0F0F0', flexShrink: 0 }}>
                    <img src={company.profileImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '15px', fontWeight: 'bold', color: DARK, marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.companyName}</p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {company.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ fontSize: '10px', color: '#848484', border: '1px solid #E6E6E6', padding: '1px 5px', borderRadius: '3px' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 썸네일 + 시간 오버레이 */}
                <div style={{ position: 'relative', display: 'flex', height: '100px', borderTop: '1px solid #E6E6E6', borderBottom: '1px solid #E6E6E6' }}>
                  <div style={{ width: '50%', overflow: 'hidden', borderRight: '1px solid #E6E6E6' }}>
                    <img src={company.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.2'; }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <img src={company.images[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.2'; }} />
                  </div>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: t ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {t ? (
                      <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.5' }}>
                        {t.date.replace(/-/g, '년 ').replace(/년 (\d+)년 /, '년 $1월 ').replace(/월 /, '월 ') + '일'}<br />{t.time}
                      </span>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 'bold' }}>미지정</span>
                    )}
                  </div>
                </div>

                <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: PRIMARY, fontWeight: 'bold' }}>+{company.rating}</span>
                  <span style={{ color: '#848484' }}>최근시공 <strong style={{ color: DARK }}>{company.recentCount}건</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        <BottomBar
          leftLabel="방문시간 안내문"
          guideTitle="방문 시간 안내"
          guideLines={[
            '희망 방문 시간은 30분 단위로 선택 가능합니다.',
            '당일 방문 요청은 최소 2시간 전에 신청해주세요.',
            '업체별로 각각 다른 시간대 설정이 가능합니다.',
            '타 업체와 중복 예약은 불가합니다.',
            '방문 시간 변경은 스케줄 페이지에서 요청하실 수 있습니다.',
          ]}
          rightLabel="방문일정요청"
          onRight={handleSubmit}
          rightDisabled={selectedCompanies.some(c => !companyTimes[c._id])}
        />
      </div>
    </div>
  );
};

export default CustomerPick;
