import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../utils/api';

const PRIMARY = '#2CB07B';
const DARK = '#000326';

const dummyNotices = [
  { _id: 'no1', title: '[공지] 사기당하신 고객님 여러분', createdAt: '2023-03-02', content: '공사 일정이 지연되거나, 시공 과정에서 하자가 생길 때 보험으로 보상 받을 수 있는 방안을 준비 중에 있습니다. 이를 통해 혹시 문제가 생기는 경우라도 신속히 피해를 구제받을 수 있습니다.\n\n표준계약서와 전담 상담팀 등 고객이 상담-계약 과정에서 안심하고 도움받을 수 있는 방안도 포함합니다.' },
  { _id: 'no2', title: '[업데이트 안내] 불편개선 업데이트 안내', createdAt: '2023-03-02', content: '고객의 소리에 항상 귀를 기울이고 있습니다. 이번 업데이트를 통해 불편사항들을 개선하였습니다.' },
];

const Notice = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'notice' | 'event'>('notice');

  const { data: notices } = useQuery({
    queryKey: ['notices'],
    queryFn: () => get('/notices'),
  });

  const list = notices?.length ? notices : dummyNotices;

  return (
    <div>
      {/* 탭 */}
      <div style={{ display: 'flex', borderBottom: '2px solid #E6E6E6', marginBottom: '8px' }}>
        {[{ key: 'notice', label: '공지사항' }, { key: 'event', label: '이벤트' }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'notice' | 'event')}
            style={{
              padding: '14px 28px', fontSize: '15px', fontWeight: 'bold',
              color: activeTab === tab.key ? PRIMARY : '#848484',
              backgroundColor: 'transparent', border: 'none',
              borderBottom: activeTab === tab.key ? `2px solid ${PRIMARY}` : '2px solid transparent',
              marginBottom: '-2px', cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'notice' && (
        <div>
          {list.length === 0 && (
            <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484' }}>공지사항이 없습니다.</div>
          )}
          {list.map((notice: any) => (
            <div key={notice._id} style={{ borderBottom: '1px solid #F0F0F0' }}>
              <button
                onClick={() => setOpenId(openId === notice._id ? null : notice._id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', backgroundColor: 'white', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: DARK, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {notice.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#848484' }}>
                    {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <span style={{ fontSize: '18px', color: '#AAAAAA', marginLeft: '16px', transform: openId === notice._id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>
                  ∨
                </span>
              </button>
              {openId === notice._id && (
                <div style={{ padding: '0 24px 24px', backgroundColor: '#FAFAFA' }}>
                  <p style={{ fontSize: '14px', color: DARK, lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                    {notice.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'event' && (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '120px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '6px' }}>신규 파트너 프로모션 혜택</p>
            <p style={{ color: 'white', fontSize: '22px', fontWeight: '900' }}>첫달만 결제 후 무료!</p>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '120px', background: 'linear-gradient(135deg, #3b82f6, #1e40af)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '6px' }}>IOS 출시기념 혜택</p>
            <p style={{ color: 'white', fontSize: '22px', fontWeight: '900' }}>맥북쏜다</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;
