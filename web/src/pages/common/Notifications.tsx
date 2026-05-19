import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, patch } from '../../utils/api';

const DARK = '#000326';
const PRIMARY = '#2CB07B';

const dummyNotifications = [
  { _id: 'n1', date: '2023년 04월 01일', companyName: '하늘스카이', message: '고객님! 업체에서 예약이 불가합니다\n희망방문스케줄에서 새로운 업체를 찾으세요!', isRead: false, type: '' },
  { _id: 'n2', date: '2023년 04월 01일', companyName: '이슬인테리어', message: '고객님! 업체에서 오전 10시에 방문할 예정입니다\n시간에 맞게 잘 지켜 주세요!', isRead: false, type: '' },
  { _id: 'n3', date: '2023년 04월 01일', companyName: '팅팅타일', message: '고객님! 타임/업체를 선택하셨어요!\n업체와 공사날짜를 조율하세요!', isRead: true, type: '' },
  { _id: 'n4', date: '2023년 04월 01일', companyName: '하늘전기', message: '고객님! 업체에서 오전 11시에 공사할 예정입니다\n공사에 차질이 없게 지켜주세요!', isRead: true, type: '' },
  { _id: 'n5', date: '2023년 04월 01일', companyName: '클린청소', message: '고객님! 업체에서 공사시간을 변경하였습니다\n스케줄과 대화창을 확인하세요!', isRead: true, type: '' },
  { _id: 'n6', date: '2023년 04월 01일', companyName: '팅팅타일', message: '고객님! 업체에서 공사를 취소 하셨습니다\n스케줄과 대화창을 확인하세요!', isRead: true, type: '' },
  { _id: 'n7', date: '2023년 04월 01일', companyName: '다보어씨씨티비', message: '고객님! 업체에서 공사를 취소 하셨습니다\n잠시만 기다려주세요 업체 확인에서 확인하고 있어요!', isRead: true, type: '' },
  { _id: 'n8', date: '2023년 04월 01일', companyName: '다보어씨씨티비', message: '고객님! 업체에서 공사를 취소 하셨습니다\n잠시만 기다려주세요 업체 확인에서 확인하고 있어요!', isRead: true, type: '' },
  { _id: 'n9', date: '2023년 04월 01일', companyName: '픽공스 알림', message: '고객님! 픽공스에서 아심찬 이벤트가 있습니다\n공지사항을 확인하셔서 이벤트에 참가하세요!', isRead: true, type: '' },
  { _id: 'n10', date: '2023년 04월 01일', companyName: '리뷰작성', message: '고객님! 공사가 마무리 되었어요!\n사장님에게 리뷰 한마디 남겨보세요!', isRead: false, type: 'review' },
];

const groupByDate = (list: any[]) => {
  const groups: Record<string, any[]> = {};
  list.forEach(n => {
    const key = n.date || new Date(n.createdAt || Date.now()).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });
  return groups;
};

const Notifications = () => {
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => get('/notifications'),
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const list = notifications?.length ? notifications.map((n: any) => ({
    ...n,
    date: new Date(n.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
    companyName: n.title,
    message: n.message,
  })) : dummyNotifications;

  const groups = groupByDate(list);

  return (
    <div style={{ padding: '0', backgroundColor: 'white', minHeight: '100vh' }}>
      {Object.entries(groups).map(([date, items]) => (
        <div key={date}>
          {/* 날짜 구분선 */}
          <div style={{ textAlign: 'center', padding: '16px 0 8px', fontSize: '13px', color: '#848484', fontWeight: '500' }}>
            {date}
          </div>

          {/* 알림 항목들 */}
          {items.map((noti: any) => (
            <div
              key={noti._id}
              onClick={() => noti._id.startsWith('n') ? undefined : (!noti.isRead && readMutation.mutate(noti._id))}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                padding: '16px 24px',
                borderBottom: '1px solid #F0F0F0',
                backgroundColor: noti.isRead ? 'white' : '#F9FFFE',
                cursor: 'pointer',
              }}
            >
              {/* 아바타 */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '999px',
                backgroundColor: '#D8D8D8', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '18px', color: '#AAAAAA' }}>👤</span>
              </div>

              {/* 내용 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: DARK, marginBottom: '4px' }}>
                  {noti.companyName}
                </p>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                  {noti.message}
                </p>
              </div>

              {/* 리뷰쓰기 버튼 */}
              {noti.type === 'review' && (
                <button style={{
                  backgroundColor: PRIMARY, color: 'white', border: 'none',
                  borderRadius: '20px', padding: '6px 14px', fontSize: '12px',
                  fontWeight: 'bold', cursor: 'pointer', flexShrink: 0,
                  display: 'flex', alignItems: 'center',
                }}>
                  리뷰쓰기
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      {list.length === 0 && (
        <div style={{ padding: '80px 24px', textAlign: 'center', color: '#848484', fontWeight: 'bold' }}>
          알림이 없습니다.
        </div>
      )}
    </div>
  );
};

export default Notifications;
