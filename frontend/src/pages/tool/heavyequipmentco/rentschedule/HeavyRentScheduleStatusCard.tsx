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

interface RentScheduleStatusCardProps {
  requestId: string;
  startDate: string;
  endDate: string;
  region: string;
  heavyType: string;
  carType: string;
  status: string;
  notes: string;
  confirmedDate?: string;
  confirmedTime?: string;
  onRefresh: () => void;
}

export default function RentScheduleStatusCard({
  requestId,
  startDate,
  endDate,
  region,
  heavyType,
  carType,
  status,
  notes,
  confirmedDate,
  confirmedTime,
  onRefresh,
}: RentScheduleStatusCardProps): JSX.Element {
  
  const handleComplete = () => {
    Alert.alert(
      '렌탈 완료',
      '렌탈이 완료되었습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              await patch(`/tool-requests/${requestId}/complete`);
              Alert.alert('알림', '렌탈 완료 처리가 되었습니다.');
              onRefresh();
            } catch (error: any) {
              Alert.alert('오류', error.message || '완료 처리에 실패했습니다.');
            }
          },
        },
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
            {confirmedDate || startDate}
          </Text>
          <View style={styles.infoRow}>
            <Image
              style={{width: 12, height: 18, marginRight: 5}}
              source={require('@/assets/images/03-main-icon/02-upperloc.png')}
            />
            <Text style={styles.infoText}>{region}</Text>
          </View>
          {confirmedTime ? (
            <Text style={styles.infoText}>확정 시간: {confirmedTime}</Text>
          ) : (
            <Text style={styles.infoText}>{startDate} ~ {endDate}</Text>
          )}
          <Text style={styles.infoText}>
            장비: {heavyType} ({carType})
          </Text>
          {notes ? <Text style={styles.notesText}>비고: {notes}</Text> : null}
        </View>

        <View style={styles.divider} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#416292'}]} onPress={handleComplete}>
            <Text style={[styles.buttonText, {color: 'white'}]}>렌탈 완료</Text>
          </TouchableOpacity>
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
    fontWeight: '600',
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
    justifyContent: 'center',
    paddingTop: '5%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
