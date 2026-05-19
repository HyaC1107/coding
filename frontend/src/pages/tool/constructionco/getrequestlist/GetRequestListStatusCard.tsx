import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {patch} from '@/utils/api';
import {WINDOW_HEIGHT} from '@/constants/context';

interface GetRequestListStatusCardProps {
  requestId: string;
  startDate: string;
  endDate: string;
  region: string;
  heavyType: string;
  carType: string;
  status: string;
  notes: string;
  onRefresh: () => void;
}

const statusMap: {[key: string]: string} = {
  pending: '대기중',
  accepted: '수락됨',
  rejected: '거절됨',
  completed: '완료됨',
  cancelled: '취소됨',
};

export default function GetRequestListStatusCard({
  requestId,
  startDate,
  endDate,
  region,
  heavyType,
  carType,
  status,
  notes,
  onRefresh,
}: GetRequestListStatusCardProps): JSX.Element {
  
  const handleCancel = () => {
    Alert.prompt(
      '요청 취소',
      '취소 사유를 입력해주세요.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async (reason) => {
            try {
              await patch(`/tool-requests/${requestId}/cancel`, { reason });
              Alert.alert('알림', '요청이 취소되었습니다.');
              onRefresh();
            } catch (error: any) {
              Alert.alert('오류', error.message || '취소에 실패했습니다.');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleUpdate = () => {
    Alert.alert(
      '일정 변경 요청',
      '일정 변경을 요청하시겠습니까?',
      [
        { text: '아니오', style: 'cancel' },
        {
          text: '예',
          onPress: () => {
            Alert.prompt(
              '변경 사유',
              '변경 사유를 입력해주세요.',
              async (reason) => {
                try {
                  await patch(`/tool-requests/${requestId}/update`, {
                    newStartDate: startDate,
                    newEndDate: endDate,
                    reason,
                  });
                  Alert.alert('알림', '변경 요청이 전송되었습니다.');
                  onRefresh();
                } catch (error: any) {
                  Alert.alert('오류', error.message || '변경 요청에 실패했습니다.');
                }
              }
            );
          }
        }
      ]
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={{width: '100%', alignItems: 'center', gap: 15}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.4),
              fontWeight: 'bold',
            }}>
            {startDate} ~ {endDate}
          </Text>
          <View style={styles.infoRow}>
            <Image
              style={{width: 12, height: 18, marginRight: 5}}
              source={require('@/assets/images/03-main-icon/02-upperloc.png')}
            />
            <Text style={styles.infoText}>{region}</Text>
          </View>
          <Text style={styles.infoText}>
            장비: {heavyType} ({carType})
          </Text>
          <Text style={[styles.infoText, {fontWeight: 'bold', color: status === 'pending' ? '#2CB07B' : '#656565'}]}>
            상태: {statusMap[status] || status}
          </Text>
          {notes ? <Text style={styles.notesText}>비고: {notes}</Text> : null}
        </View>

        <View style={styles.divider} />

        <View style={styles.buttonContainer}>
          {status === 'pending' || status === 'accepted' ? (
            <>
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>일정변경</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#F2295F'}]} onPress={handleCancel}>
                <Text style={[styles.buttonText, {color: 'white'}]}>요청취소</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.infoText}>종료된 요청입니다.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e9edef',
    marginBottom: WINDOW_HEIGHT * 0.05,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.025,
    paddingBottom: WINDOW_HEIGHT * 0.04,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: responsiveScreenFontSize(2),
    color: '#656565',
  },
  notesText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#F1F1F5',
    marginTop: '5%',
    width: '90%',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '5%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e9edef',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
});
