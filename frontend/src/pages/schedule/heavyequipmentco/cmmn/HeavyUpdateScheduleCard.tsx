import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useRef, useState} from 'react';
import {Platform, Alert} from 'react-native';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {patch} from '@/utils/api';

interface VisitCardProps {
  customerName: string;
  customerAddress: string;
  visitTime: string;
  companySchedule: string;
  requestId?: string;
  status?: number;
  onRefresh?: () => void;
  requestedDate?: string;
  requestedTime?: string;
}

export default function HeavyUpdateScheduleCard(
  data: VisitCardProps,
): JSX.Element {
  const {customerName, customerAddress, visitTime, companySchedule, requestId, status, onRefresh, requestedDate, requestedTime} = data;

  const handleAccept = async () => {
    if (!requestId) return;
    try {
      if (status === 41) {
        await patch(`/requests/${requestId}/cancel/accept`);
      } else if (status === 51) {
        await patch(`/requests/${requestId}/update/accept`);
      }
      Alert.alert('알림', '수락되었습니다.');
      onRefresh && onRefresh();
    } catch (error: any) {
      Alert.alert('오류', error.message || '수락 처리에 실패했습니다.');
    }
  };

  const handleReject = async () => {
    if (!requestId) return;
    try {
      if (status === 41) {
        await patch(`/requests/${requestId}/cancel/reject`);
      } else if (status === 51) {
        await patch(`/requests/${requestId}/update/reject`);
      }
      Alert.alert('알림', '거절되었습니다.');
      onRefresh && onRefresh();
    } catch (error: any) {
      Alert.alert('오류', error.message || '거절 처리에 실패했습니다.');
    }
  };

  // isRequestedByCustomer: status 41 (Cancel), 51 (Update)
  const isRequestedByCustomer = status === 41 || status === 51;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={{width: '100%', alignItems: 'center', gap: 15}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.4),
              fontWeight: 'bold',
            }}>
            {requestedDate || '날짜 미정'}
          </Text>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: 45,
                    gap: 15,
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: 50,
                    gap: 15,
                  }
            }>
            <View style={{height: '100%', paddingTop: 5}}>
             
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#656565',
                }}>
                <Image
                  style={{width: 12, height: 18}}
                  source={require('@/assets/images/03-main-icon/02-upperloc.png')}
                />
                {customerAddress || '주소 정보 없음'}
              </Text>
            </View>
            <View
              style={{
                height: WINDOW_HEIGHT * 0.05,
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{width: 15, height: 20}}
                source={require('@/assets/images/08-company/02-copy.png')}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: '#656565',
              fontWeight: '600',
            }}>
            {requestedTime || '시간 미정'}
          </Text>
        </View>

        <View
          style={[
            styles.visitTimeBox,
            {marginTop: '10%', paddingTop: '3%', paddingBottom: '3%'},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '3%',
              gap: 20,
              width: '80%',
              justifyContent: 'center',
            }}>
            <Image
              style={
                Platform.OS === 'android'
                  ? {width: 57, height: 57}
                  : {
                      width: 50,
                      height: 50,
                    }
              }
              source={require('@/assets/images/08-company/10-chattalkbtn.png')}
            />
            <View style={{gap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2.2),
                    color: '#000',
                    letterSpacing: -0.7,
                  }}>
                  {customerName || '고객님'}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(2)}}>작업내용</Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>{companySchedule || '내용 없음'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '80%',
            alignItems: 'center',
          }}>
          {isRequestedByCustomer ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.8)',
                justifyContent: 'center',
                gap: 20,
              }}>
              <View style={{alignItems: 'center', gap: 5}}>
                <Text
                  style={{
                    color: 'white',
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(2.6),
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {status === 41 ? '고객님이 임대취소를\n요청하였습니다' : '고객님이 일정변경을\n요청하였습니다'}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.8)',
                justifyContent: 'center',
                gap: 20,
              }}>
              <View style={{alignItems: 'center', gap: 5}}>
                <Text
                  style={{
                    color: 'white',
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(2.6),
                    fontWeight: 'bold',
                  }}>
                  고객님에게 요청을
                </Text>
                <Text
                  style={{
                    color: 'white',
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(2.6),
                    fontWeight: 'bold',
                  }}>
                  하였습니다
                </Text>
              </View>
            </View>
          )}

          <View
            style={
              !isRequestedByCustomer
                ? {
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5%',
                    gap: 5,
                  }
                : {
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5%',
                    gap: 5,
                  }
            }>
            <Text style={{fontSize: responsiveFontSize(2), color: '#0F134A'}}>
              {status === 41 ? '임대취소 요청' : '임대날짜 변경요청'}
            </Text>
            <Text
              style={
                !isRequestedByCustomer
                  ? {fontSize: responsiveFontSize(1.3), color: '#656565'}
                  : {fontSize: responsiveFontSize(1.3)}
              }>
              ※고객님의 스케줄을 확인하셔서 시공날짜변경 하세요
            </Text>
          </View>
        </View>

        {isRequestedByCustomer ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.07,
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: '5%',
              gap: 10,
              marginBottom: '3%',
            }}>
            <TouchableWithoutFeedback onPress={handleReject}>
              <View style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#f2f2f2', borderRadius: 5}}>
                <Text style={{color: '#F2295F', fontWeight: 'bold', fontSize: responsiveFontSize(2)}}>거절</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleAccept}>
              <View style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#f2f2f2', borderRadius: 5}}>
                <Text style={{color: '#2CB07B', fontWeight: 'bold', fontSize: responsiveFontSize(2)}}>수락</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.07,
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: '5%',
              gap: 10,
              marginBottom: '3%',
            }}>
            <Text
              style={{
                letterSpacing: -1,
                fontSize: responsiveFontSize(2.2),
                fontWeight: 'bold',
                color: '#656565',
              }}>
              고객님 확인중
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer:
    Platform.OS === 'ios'
      ? {
          width: Dimensions.get('window').width * 0.9,
          // height: WINDOW_HEIGHT * 0.4,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 10,
        }
      : {
          width: Dimensions.get('window').width * 0.9,
          // height: WINDOW_HEIGHT * 0.4,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          marginBottom: 10,
          borderColor: '#e9edef',
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.02,
  },
  customerInfoContainer: {
    width: '90%',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: WINDOW_HEIGHT * 0.03,
  },
  imageBox: {
    // width: 90,
    // height: '100%',
  },
  infoBox: {
    // width: 210,
    // height: '100%',
    width: 'auto',
    justifyContent: 'center',
  },
  nameAndCopy: {
    width: '100%',
    // height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    // width: '85%',
    // height: WINDOW_HEIGHT * 0.17,
    backgroundColor: '#f9f9f9',
    // marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7%',
    gap: 15,
  },
  modifyVisitTime: {
    width: '25%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyButton: {
    width: '85%',
    height: '90%',
    backgroundColor: '#e9edef',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
