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
  state 31 : 업체에서날짜변경을요청했을때, 
  state 32 : 업체에게 공사취소요청을 했을때,
  state 33 : 업체가 고객에서 공사취소요청을 했을때
  */
  state: number;
  storeName?: string;
  storeThum?: any;
  date?: string;
  requestId?: string;
  onRefresh?: () => void;
}

export default function StateUpdateCard(data: StateCardProps): JSX.Element {
  const {state, storeName, storeThum, date, requestId, onRefresh} = data;

  const handleAccept = async () => {
    if (!requestId) return;
    try {
      if (state === 31) {
        await patch(`/requests/${requestId}/update/accept`);
      } else if (state === 33) {
        await patch(`/requests/${requestId}/cancel/accept`);
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
      if (state === 31) {
        await patch(`/requests/${requestId}/update/reject`);
      } else if (state === 33) {
        await patch(`/requests/${requestId}/cancel/reject`);
      }
      Alert.alert('알림', '거절되었습니다.');
      onRefresh && onRefresh();
    } catch (error: any) {
      Alert.alert('오류', error.message || '거절 처리에 실패했습니다.');
    }
  };

  return (
    <View style={styles.noneOutlinedCardWrapper}>
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

          <View style={{width: 'auto', height: 'auto'}}>
            <View
              style={
                Platform.OS === 'android'
                  ? {
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      width: '72%',
                      height: '100%',
                      zIndex: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      padding: '5%',
                      paddingTop: '10%',
                    }
                  : {
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      width: '65%',
                      height: '100%',
                      zIndex: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      padding: '5%',
                      paddingTop: '10%',
                    }
              }>
              <Image
                style={{width: 30, height: 30}}
                source={require('@/assets/images/05-pick/connect-chat.png')}
              />

              {state === 31 && (
                <View
                  style={{
                    height: '60%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: '10%',
                    }}>
                    <View
                      style={
                        Platform.OS === 'android'
                          ? {
                              flexDirection: 'row',
                              //backgroundColor: '#ff0',
                              paddingTop: '10%',
                            }
                          : {
                              flexDirection: 'row',
                              //backgroundColor: '#ff0',
                              paddingTop: '10%',
                            }
                      }>
                      <Text style={styles.cardStateDateText1}>업체에서</Text>
                      <Text
                        style={[
                          styles.cardStateDateText1,
                          {
                            color: 'red',
                          },
                        ]}>
                        날짜변경
                      </Text>
                      <Text style={styles.cardStateDateText1}>을</Text>
                    </View>
                    <View>
                      <Text style={styles.cardStateDateText1}>
                        요청 하였습니다.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={
                      Platform.OS === 'android'
                        ? {
                            width: '100%',
                            alignItems: 'center',
                            // paddingBottom: '2%',
                          }
                        : {
                            width: '100%',
                            alignItems: 'center',
                            // paddingBottom: '2%',
                          }
                    }>
                    <Text style={styles.cardStateDateText1}>
                      {date && date}
                    </Text>
                  </View>
                </View>
              )}

              {state === 32 && (
                <View
                  style={{
                    height: '57%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.cardStateDateText1}>업체에게</Text>
                    <Text
                      style={[
                        styles.cardStateDateText1,
                        {
                          color: 'red',
                        },
                      ]}>
                      공사취소요청
                    </Text>
                  </View>
                  <Text style={styles.cardStateDateText1}>하였습니다.</Text>
                </View>
              )}

              {state === 33 && (
                <View
                  style={{
                    height: '57%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.cardStateDateText1}>업체에서</Text>
                    <Text
                      style={[
                        styles.cardStateDateText1,
                        {
                          color: 'red',
                        },
                      ]}>
                      공사취소요청
                    </Text>
                  </View>
                  <Text style={styles.cardStateDateText1}>하였습니다.</Text>
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

          {state !== 32 && (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback onPress={handleReject}>
                <Text
                  style={[
                    styles.cardStateDateText1,
                    {
                      padding: '10%',
                      color: '#EB701F',

                      paddingRight: '15%',
                    },
                  ]}>
                  거절
                </Text>
              </TouchableWithoutFeedback>
              <Image source={require('@/assets/images/vertical-bar.png')} />
              <TouchableWithoutFeedback onPress={handleAccept}>
                <Text
                  style={[
                    styles.cardStateDateText1,
                    {
                      padding: '10%',
                      paddingLeft: '15%',
                      color: '#2CB07B',
                    },
                  ]}>
                  수락
                </Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          {state === 32 && (
            <TouchableWithoutFeedback>
              <Text
                style={[
                  styles.cardStateDateText1,
                  {padding: '10%', color: '#2CB07B'},
                ]}>
                수락대기중
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
  noneOutlinedCardWrapper:
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
          shadowOpacity: 0.15,
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
  cardStateDateText1:
    Platform.OS === 'android'
      ? {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: -0.7,
          fontSize: responsiveFontSize(1.6),
        }
      : {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: -0.7,
          fontSize: responsiveFontSize(1.4),
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
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#2CB07B',
    fontWeight: '600',
  },
  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    alignItems: 'center',
  },
  fontStyle3: {
    paddingLeft: '5%',
    color: '#EB701F',
    fontWeight: '600',
  },
});
