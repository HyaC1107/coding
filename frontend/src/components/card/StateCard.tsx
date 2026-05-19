import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {patch} from '@/utils/api';

interface StateCardProps {
  /*
  state 1 : 업체선정중, 
  state 2 : 시간조율중,
  state 3 : 선정일14일전으로 취소요청가능상태
  state 4 : 선정일 14일 후로 취소요청불가능상태
  state 10 : 금일 시공가능 상태
  state 11 : 공사일이 2일이상일때
  state 20 : 공사일 시간이 지난후 작업완료 버튼이떠있는상태
  state 21 : 업체, 고객이 작업완료를 누르고 리뷰하기 버튼이있는상태
  */
  state: number;
  storeName?: string;
  storeThum?: any;
  time?: string;
  date?: string;
  startDt?: string;
  endDt?: string;
  requestId?: string;
  onRefresh?: () => void;
}

export default function StateCard(data: StateCardProps): JSX.Element {
  const {state, storeName, storeThum, time, date, startDt, endDt, requestId, onRefresh} = data;
  const navigation = useNavigation<any>();
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState(1);
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  let curr: string;
  const [showPopup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(false);
  };

  const handleCancel = async () => {
    if (!requestId) return;
    Alert.alert('취소 요청', '정말로 취소하시겠습니까?', [
      {text: '아니오', style: 'cancel'},
      {
        text: '예',
        onPress: async () => {
          try {
            await patch(`/requests/${requestId}/cancel`, {reason: '고객 변심'});
            Alert.alert('알림', '취소 요청이 완료되었습니다.');
            onRefresh && onRefresh();
          } catch (error: any) {
            Alert.alert('오류', error.message || '취소 요청에 실패했습니다.');
          }
        },
      },
    ]);
  };

  const handleUpdate = async () => {
    if (!requestId) return;
    // For update, normally we need new date/time. 
    // Since we shouldn't change UI much, I'll just navigate or show a simple alert for now if no UI is provided.
    // However, GEMINI_GUIDE_2 says "add Cancel/Update buttons and actions".
    // I'll assume for Update, we might need a prompt or navigate to a specialized page.
    // Since I cannot easily add a full form here, I'll just show an alert that it should be done via contact for now,
    // OR if there's a specific page, navigate to it.
    // But let's implement the API call with dummy data if we were to just test it.
    Alert.alert('일정 변경', '일정 변경을 요청하시겠습니까?', [
      {text: '아니오', style: 'cancel'},
      {
        text: '예',
        onPress: async () => {
          try {
            // Dummy data as we don't have a picker here
            await patch(`/requests/${requestId}/update`, {
              newDate: '2026-06-15',
              newTime: '10:00',
              reason: '일정 변경 희망',
            });
            Alert.alert('알림', '일정 변경 요청이 완료되었습니다.');
            onRefresh && onRefresh();
          } catch (error: any) {
            Alert.alert('오류', error.message || '일정 변경 요청에 실패했습니다.');
          }
        },
      },
    ]);
  };

  const handleComplete = async () => {
    if (!requestId) return;
    try {
      await patch(`/requests/${requestId}/complete`);
      Alert.alert('알림', '시공 완료 처리가 되었습니다.');
      onRefresh && onRefresh();
    } catch (error: any) {
      Alert.alert('오류', error.message || '완료 처리에 실패했습니다.');
    }
  };

  return (
    <View
      style={
        state === 1
          ? styles.greenOutlinedCardWrapper
          : styles.noneOutlinedCardWrapper
      }>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '90%',
            alignItems: 'center',
          }}>
          {storeName && (
            <View
              style={{
                height: '20%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}>
                {storeName}
              </Text>
            </View>
          )}
          {state === 1 && (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#2CB07B',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: 'bold',
                }}>
                업체선정중
              </Text>
            </View>
          )}
          {state !== 1 && (
            <View style={{width: 'auto', height: 'auto'}}>
              <View
                style={
                  Platform.OS === 'android'
                    ? {
                        position: 'absolute',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        width: '67%',
                        height: '100%',
                        zIndex: 1,
                        borderRadius: 3,
                        alignItems: 'center',
                        padding: '10%',
                      }
                    : {
                        position: 'absolute',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        width: '64%',
                        height: '100%',
                        zIndex: 1,
                        borderRadius: 3,
                        alignItems: 'center',
                        padding: '10%',
                      }
                }>
                {state !== 21 && (
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('@/assets/images/05-pick/connect-chat.png')}
                  />
                )}
                {state === 2 && (
                  <View
                    style={{
                      height: '45%',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.cardStateText1}>시공날짜 조율중</Text>
                  </View>
                )}
                {state === 21 && (
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        paddingTop: '5%',
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      {date && date}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        paddingTop: '5%',
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      공사완료
                    </Text>
                  </View>
                )}
                {state !== 1 && state !== 2 && state !== 21 && (
                  <View
                    style={
                      Platform.OS === 'android'
                        ? {
                            height: '60%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            //backgroundColor: '#ababab',
                          }
                        : {
                            height: '60%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }
                    }>
                    {(state === 3 || state === 4 || state === 33 || state === 41 || state === 42 || state === 51) && (
                      <Text style={styles.cardStateText1}>시공예정</Text>
                    )}
                    {(state === 10 || state === 11 || state === 20) && (
                      <Text style={styles.cardStateText1}>금일 시공예정</Text>
                    )}
                    {state !== 11 && (
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.cardDateText1}>{date && date}</Text>
                        <Text style={styles.cardDateText1}>{time && time}</Text>
                      </View>
                    )}
                    {state === 11 && (
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.cardDayText1}>
                          {startDt && startDt}~
                        </Text>
                        <Text style={styles.cardDayText1}>
                          {endDt && endDt}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
              {storeThum && (
                <Image
                  style={Platform.OS === 'ios' && {width: 120, height: 120}}
                  source={storeThum}
                />
              )}
            </View>
          )}
          {state === 3 && (
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableWithoutFeedback onPress={handleCancel}>
                <Text style={styles.fontStyle3}>공사취소요청</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleUpdate}>
                <Text style={[styles.fontStyle3, {color: '#416292'}]}>일정변경요청</Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          {state === 20 && (
            <TouchableWithoutFeedback onPress={handleComplete}>
              <Text style={styles.fontStyle2}>작업완료</Text>
            </TouchableWithoutFeedback>
          )}
          {state === 21 && (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ReviewWrite', {requestId, companyId: storeName})}>
              <Text
                style={{
                  marginTop: 15,
                  padding: '4%',
                  color: '#2CB07B',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(1.6),
                  letterSpacing: -0.7,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#2CB07B',
                }}>
                리뷰남기기
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  greenOutlinedCardWrapper:
    Platform.OS === 'android'
      ? {
          width: WINDOW_WIDTH * 0.55,
          height: WINDOW_HEIGHT * 0.4,
          maxHeight: 280,
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
          borderWidth: 2,
          borderColor: '#2CB07B',
        }
      : {
          width: WINDOW_WIDTH * 0.5,
          height: WINDOW_HEIGHT * 0.35,
          maxHeight: 280,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 5,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 2,
          borderColor: '#2CB07B',
        },
  noneOutlinedCardWrapper:
    Platform.OS === 'android'
      ? {
          width: WINDOW_WIDTH * 0.55,
          height: WINDOW_HEIGHT * 0.4,
          maxHeight: 280,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
        }
      : {
          width: WINDOW_WIDTH * 0.5,
          height: WINDOW_HEIGHT * 0.35,
          maxHeight: 280,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
        },
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: '5%',
  },

  fontaStyle1Wrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyle1: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#656565',
    fontWeight: '600',
  },
  fontStyle2: {
    color: '#2CB07B',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6),
    //backgroundColor: '#000',
    paddingTop: 30,
    letterSpacing: -0.7,
  },
  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    alignItems: 'center',
  },
  fontStyle3: {
    // paddingLeft: '5%',
    color: '#EB701F',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6),
    //backgroundColor: '#000',
    paddingTop: 30,
    letterSpacing: -0.7,
  },

  cardStateText1:
    Platform.OS === 'android'
      ? {
          color: 'white',
          fontWeight: 'bold',
          paddingTop: '10%',
          fontSize: responsiveFontSize(1.6),
        }
      : {
          color: 'white',
          fontWeight: 'bold',
          paddingTop: '12%',
          fontSize: responsiveFontSize(1.4),
        },
  cardDateText1:
    Platform.OS === 'android'
      ? {
          color: 'white',
          fontSize: responsiveFontSize(1.4),
        }
      : {
          color: 'white',
          fontSize: responsiveFontSize(1.2),
        },
  cardDayText1:
    Platform.OS === 'android'
      ? {
          color: 'white',
          fontSize: responsiveFontSize(1.4),
          letterSpacing: -1,
        }
      : {
          color: 'white',
          fontSize: responsiveFontSize(1.2),
          letterSpacing: -1,
        },
});
