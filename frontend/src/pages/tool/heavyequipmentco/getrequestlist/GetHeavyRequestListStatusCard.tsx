import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import GetHeavyProfileCard from './GetHeavyProfileCard';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import PayReqCard from '@/components/card/PayReqCard';
import { patch } from '@/utils/api';

interface ToolRequestProps {
  requestId: string;
  constructorName: string;
  region: string;
  startDate: string;
  endDate: string;
  carType: string;
  notes?: string;
  onRefresh: () => void;
}

export default function GetHeavyRequestListStatusCard(
  props: ToolRequestProps,
): JSX.Element {
  const {requestId, constructorName, region, startDate, endDate, carType, notes, onRefresh} = props;
  const [isOpen, setOpen] = useState(false);

  const handleAccept = async () => {
    try {
      // In a real scenario, you might want to show a popup to confirm date/time
      // But based on the guide, we'll just send the patch.
      await patch(`/tool-requests/${requestId}/accept`, {
        confirmedDate: startDate,
        confirmedTime: 'AM 09:00' // Placeholder as per logic
      });
      Alert.alert('성공', '렌탈 요청을 수락했습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to accept tool request:', error);
      Alert.alert('오류', '요청 수락에 실패했습니다.');
    }
  };

  const handleReject = async () => {
    try {
      await patch(`/tool-requests/${requestId}/reject`, { reason: '일정 중복' });
      Alert.alert('성공', '렌탈 요청을 거절했습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to reject tool request:', error);
      Alert.alert('오류', '요청 거절에 실패했습니다.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={{width: '100%', alignItems: 'center', gap: 15}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.2),
              fontWeight: 'bold',
            }}>
            {startDate} ~ {endDate}
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: responsiveScreenFontSize(2),
                color: '#656565',
              }}>
              <Image
                style={{width: 12, height: 18}}
                source={require('@/assets/images/03-main-icon/02-upperloc.png')}
              />
              {region}
            </Text>
            <Text
              style={{
                fontSize: responsiveScreenFontSize(1.8),
                color: '#416292',
                marginTop: 5,
                fontWeight: 'bold',
              }}>
              {constructorName} | {carType}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            gap: 15,
            paddingTop: '5%',
          }}>
          {/* Notes display if available */}
          {notes && (
            <View style={{ paddingHorizontal: '10%', width: '100%' }}>
              <Text style={{ fontSize: 12, color: '#888' }}>요청사항: {notes}</Text>
            </View>
          )}
        </View>
        
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: WINDOW_HEIGHT * 0.08,
            borderTopColor: '#E9EDEF',
            borderTopWidth: 1,
            marginTop: 20,
          }}>
          <TouchableWithoutFeedback onPress={handleReject}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#EB701F',
                paddingHorizontal: 30,
              }}>
              거절하기
            </Text>
          </TouchableWithoutFeedback>
          <Image source={require('@/assets/images/vertical-bar.png')} />
          <TouchableWithoutFeedback onPress={handleAccept}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#2CB07B',
                paddingHorizontal: 30,
              }}>
              수락하기
            </Text>
          </TouchableWithoutFeedback>
        </View>
        
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setOpen(!isOpen);
            }}>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  letterSpacing: -0.7,
                  marginRight: '5%',
                }}>
                스케줄 확인하기
              </Text>
              <Image source={require('@/assets/images/open-schedule.png')} />
            </View>
          </TouchableWithoutFeedback>
          {isOpen && (
            <View style={{alignItems: 'center', paddingTop: '3%'}}>
              <PayReqCard
                tm={'08:00'}
                nm={'이전 작업'}
                addr={'근처 작업장'}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer:
    Platform.OS === 'ios'
      ? {
          width: Dimensions.get('window').width * 0.9,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 20,
        }
      : {
          width: Dimensions.get('window').width * 0.9,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 20,
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.03,
  },
});
