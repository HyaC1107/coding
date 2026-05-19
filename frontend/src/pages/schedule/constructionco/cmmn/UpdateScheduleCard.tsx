import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
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

export default function UpdateScheduleCard(data: VisitCardProps): JSX.Element {
  const {customerName, customerAddress, visitTime, companySchedule, requestId, status, onRefresh, requestedDate, requestedTime} = data;
  
  const router = useRoute<any>();
  const navigation = useNavigation<any>();
  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };

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
        <View style={styles.customerInfoContainer}>
          <View
            style={
              Platform.OS === 'android'
                ? {width: 70, height: 70}
                : {
                    width: 65,
                    height: 65,
                  }
            }>
            <Image
              style={
                Platform.OS === 'android'
                  ? {width: 70, height: 70}
                  : {
                      width: 65,
                      height: 65,
                    }
              }
              source={require('@/assets/images/08-company/10-chattalkbtn.png')}
            />
          </View>
          <View style={styles.infoBox}>
            <View style={styles.nameAndCopy}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: 'bold',
                }}>
                {customerName || '고객님'}
              </Text>
              <Image
                style={{
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                }}
                source={require('@/assets/images/visit/copy.jpg')}></Image>
            </View>
            <Text
              style={{
                width: '90%',
                fontSize: responsiveFontSize(1.8),
                color: '#656565',
                letterSpacing: -1,
              }}>
              {customerAddress || '주소 정보 없음'}
            </Text>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            {isRequestedByCustomer ? (
              <View style={styles.shadowBox}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2),
                    textAlign: 'center',
                  }}>
                  {status === 41 ? '고객님이 공사를\n취소하였습니다' : '고객님이 일정변경을\n요청하였습니다'}
                </Text>
              </View>
            ) : (
              <View style={styles.shadowBox}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2),
                  }}>
                  고객님에게 확인요청을
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(2),
                  }}>
                  하였습니다
                </Text>
              </View>
            )}
            <View style={{
                width: '100%',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text style={{fontSize: responsiveFontSize(2)}}>공사 시작일</Text>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                {requestedDate || '날짜 미정'}
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                {requestedTime || '시간 미정'}
              </Text>
            </View>
          </View>
        </View>
        
        {isRequestedByCustomer ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.1,
            }}>
            <TouchableWithoutFeedback onPress={handleReject}>
              <Text
                style={{
                  color: '#F2295F',
                  fontWeight: 'bold',
                  paddingRight: '10%',
                  fontSize: responsiveFontSize(2),
                }}>
                거절
              </Text>
            </TouchableWithoutFeedback>
            <Image source={require('@/assets/images/vertical-bar.png')} />
            <TouchableWithoutFeedback onPress={handleAccept}>
              <Text
                style={{
                  paddingLeft: '10%',
                  color: '#2CB07B',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                수락
              </Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: WINDOW_HEIGHT * 0.1,
                  }
                : {
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: WINDOW_HEIGHT * 0.08,
                  }
            }>
            <Text
              style={
                Platform.OS === 'android'
                  ? {
                      color: '#2CB07B',
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(2.2),
                    }
                  : {
                      color: '#2CB07B',
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.8),
                    }
              }>
              고객님 확인중
            </Text>
          </View>
        )}
      </View>
      {router.params.popupOpen && (
        <ScheduleNavPopup handlePopup={handlePopup} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer:
    Platform.OS === 'ios'
      ? {
          width: Dimensions.get('window').width * 0.8,
          // height: WINDOW_HEIGHT * 0.4,
          height: 370,
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
          paddingTop: 5,
          paddingBottom: 5,
        }
      : {
          width: Dimensions.get('window').width * 0.85,
          // height: WINDOW_HEIGHT * 0.4,
          height: 450,
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
          paddingTop: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.04,
  },
  customerInfoContainer:
    Platform.OS === 'ios'
      ? {
          width: WINDOW_WIDTH * 0.65,
          gap: 10,
          alignItems: 'flex-start',
          flexDirection: 'row',
        }
      : {
          width: WINDOW_WIDTH * 0.7,
          gap: 10,
          alignItems: 'flex-start',
          flexDirection: 'row',
        },
  imageBox: {
    // width: 90,
    // height: '100%',
  },
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
    // paddingTop: '3%',
    gap: 5,
  },
  nameAndCopy: {
    width: '100%',
    // height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  visitTimeBox:
    Platform.OS === 'ios'
      ? {
          width: WINDOW_WIDTH * 0.6,
          height: 185,
          backgroundColor: '#f9f9f9',
          marginTop: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }
      : {
          width: WINDOW_WIDTH * 0.6,
          height: 230,
          backgroundColor: '#f9f9f9',
          marginTop: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
  visitInfo: {
    justifyContent: 'center',
    alignItems: 'center',
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
  shadowBox:
    Platform.OS === 'android'
      ? {
          position: 'absolute',
          width: WINDOW_WIDTH * 0.7,
          height: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }
      : {
          position: 'absolute',
          width: WINDOW_WIDTH * 0.65,
          height: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        },
});
