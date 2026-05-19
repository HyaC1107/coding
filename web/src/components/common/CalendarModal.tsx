import { useState } from 'react';

const PRIMARY = '#2CB07B';

const AM_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
const PM_SLOTS = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  onConfirm: (date: string, time: string) => void;
  onClose: () => void;
}

const CalendarModal = ({ onConfirm, onClose }: Props) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelectedDate(null);
  };

  // 달력 날짜 배열 생성
  const buildCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay(); // 0=일
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: { day: number; curr: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, curr: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, curr: true });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: cells.length - firstDay - daysInMonth + 1, curr: false });
    }

    const rows: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(selectedDate).padStart(2, '0');
    const period = parseInt(selectedTime) < 12 ? 'AM' : 'PM';
    onConfirm(`${year}-${mm}-${dd}`, `${period} ${selectedTime}`);
  };

  const rows = buildCalendar();

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          width: '100%', maxWidth: '480px',
          borderRadius: '20px 20px 0 0',
          padding: '0 0 0 0',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* 헤더 */}
        <div style={{ position: 'relative', padding: '24px 24px 16px', textAlign: 'center', borderBottom: '1px solid #F0F0F0' }}>
          <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#000326' }}>희망방문요청 시간을 입력하세요</span>
          <button onClick={onClose} style={{
            position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '20px', color: '#848484', lineHeight: 1,
          }}>✕</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {/* 월 네비게이션 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '18px', color: PRIMARY }}>‹</button>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000326' }}>{year} . {month + 1}월</span>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '18px', color: PRIMARY }}>›</button>
          </div>

          {/* 요일 헤더 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' }}>
            {DAY_LABELS.map((d, i) => (
              <div key={d} style={{
                textAlign: 'center', fontSize: '13px', fontWeight: '600', padding: '4px 0',
                color: i === 0 ? '#FD5545' : i === 6 ? '#0F97FF' : '#666',
              }}>{d}</div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
              {row.map((cell, ci) => {
                const isSelected = cell.curr && selectedDate === cell.day;
                const past = cell.curr && isPast(cell.day);
                return (
                  <div
                    key={ci}
                    onClick={() => cell.curr && !past && setSelectedDate(cell.day)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: '40px', cursor: cell.curr && !past ? 'pointer' : 'default',
                    }}
                  >
                    <div style={{
                      width: '32px', height: '32px',
                      borderRadius: '999px',
                      backgroundColor: isSelected ? '#606060' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontSize: '14px', fontWeight: '600',
                        color: isSelected ? 'white'
                          : !cell.curr || past ? '#CBCBCB'
                          : ri === 0 && ci === 0 ? '#FD5545'
                          : ci === 6 ? '#0F97FF'
                          : '#333',
                      }}>
                        {cell.day}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* 구분선 */}
          <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '16px 0' }} />

          {/* 오전 슬롯 */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: '#848484', marginBottom: '10px' }}>오전/AM</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {AM_SLOTS.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  style={{
                    padding: '12px 0', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
                    border: 'none', cursor: 'pointer',
                    backgroundColor: selectedTime === t ? PRIMARY : '#F0F0F0',
                    color: selectedTime === t ? 'white' : '#333',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 오후 슬롯 */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#848484', marginBottom: '10px' }}>오후/PM</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {PM_SLOTS.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  style={{
                    padding: '12px 0', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
                    border: 'none', cursor: 'pointer',
                    backgroundColor: selectedTime === t ? PRIMARY : '#F0F0F0',
                    color: selectedTime === t ? 'white' : '#333',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 안내문구 */}
          <p style={{ fontSize: '12px', color: '#848484', textAlign: 'center', marginBottom: '20px' }}>
            *30분 단위로 희망시간 선택 / *타업체와 중복 불가능
          </p>

          {/* 선택완료 버튼 */}
          <button
            onClick={handleConfirm}
            style={{
              width: '100%', padding: '18px', borderRadius: '12px',
              backgroundColor: PRIMARY, color: 'white',
              fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
              marginBottom: '8px',
            }}
          >
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
