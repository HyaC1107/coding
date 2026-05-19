import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Carousel from '@/components/carousel/Carousel';
import {WINDOW_HEIGHT} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const data = {
  dt: '2023년 4월 1일',
  nm: 'test',
  review: false,
  isCheck: true,
  state: 1,
};

interface SchecduleCardProps {
  dt: string;
  nm: string;
  review: boolean;
  isCheck: boolean;
  state: number;
  i: number;
  thumnailList?: any[];
  imgUrl?: any;
  requestedDate?: string;
  requestedTime?: string;
}
export default function ScheduleCardComponent(
  data: SchecduleCardProps,
): JSX.Element {
  const [showPopup, setPopup] = useState(true);
  const {dt, nm, review, isCheck, state, i, thumnailList, imgUrl, requestedDate, requestedTime} = data;

  const getStatusText = (status: number) => {
    switch (status) {
      case 31: return '업체확인중';
      case 32: return '방문일정수락/대기중';
      case 33: return '방문일정확정';
      case 34: return '시공완료';
      case 41: return '취소요청중';
      case 42: return '취소완료';
      case 51: return '일정변경요청중';
      default: return '상태알수없음';
    }
  };

  const getStatusStyle = (status: number) => {
    if (status === 31 || status === 32 || status === 51) return styles.fontStyle1;
    if (status === 33 || status === 34) return styles.fontStyle2;
    if (status === 41 || status === 42) return styles.fontStyle3;
    return styles.fontStyle1;
  };

  const isOtherWrap = (status: number) => {
    return status !== 31;
  };

  return (
    <View
      key={i}
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
      }}>
      <View style={styles.rootWrapper}>
        <View
          style={{
            width: '100%',
            // height: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              gap: 20,
              paddingTop: '5%',
              paddingBottom: '5%',
            }}>
            <View>
              {imgUrl ? (
                <Image style={{width: 70, height: 70}} source={imgUrl} />
              ) : (
                <Image
                  style={{width: 70, height: 70}}
                  source={require('@/assets/images/pick1.png')}
                />
              )}
            </View>
            <View
              style={{
                // paddingTop: '10%',
                justifyContent: 'center',
                gap: 10,
              }}>
              <Text
                style={
                  Platform.OS === 'ios'
                    ? {
                        fontSize: responsiveFontSize(2),
                        fontWeight: 'bold',
                      }
                    : {
                        fontSize: responsiveFontSize(2),
                        fontWeight: '800',
                      }
                }>
                {nm || '한마음인테리어'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.6),
                    paddingRight: '2%',
                    color: '#656565',
                  }}>
                  보증보험가능
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.6),
                    paddingRight: '2%',
                    color: '#656565',
                  }}>
                  자격증보유
                </Text>
                <Text
                  style={{fontSize: responsiveFontSize(1.6), color: '#656565'}}>
                  6개월A/S
                </Text>
              </View>
            </View>
            {state !== 31 && (
              <View style={{position: 'absolute', right: -5, top: 15}}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('@/assets/images/05-pick/connect-chat.png')}
                />
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            width: '100%',
          }}>
          {thumnailList && (
            <View style={{height: 120}}>
              <Carousel imgList={thumnailList} />
            </View>
          )}
          {!thumnailList && requestedDate && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <View
                style={{
                  width: '90%',
                  height: WINDOW_HEIGHT * 0.16,
                  backgroundColor: 'rgba(0,0,0,0.78)',

                  marginBottom: '8%',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? {
                          color: 'white',
                          letterSpacing: -0.7,
                          fontWeight: 'bold',
                          fontSize: responsiveFontSize(2),
                        }
                      : {
                          color: 'white',
                          letterSpacing: -0.7,
                          fontWeight: '800',
                          fontSize: responsiveFontSize(2),
                        }
                  }>
                  {requestedDate} {requestedTime}
                </Text>
                {/* <Text
                  style={
                    Platform.OS === 'ios'
                      ? {
                          color: 'white',
                          fontSize: responsiveFontSize(2),
                          fontWeight: 'bold',
                        }
                      : {
                          color: 'white',
                          fontSize: responsiveFontSize(2),
                          fontWeight: '800',
                        }
                  }>
                  임대료금액 : 500,000 원
                </Text> */}
              </View>
            </View>
          )}
          <View
            style={
              isOtherWrap(state) ? styles.fontStyleOtherWrap : styles.fontaStyle1Wrap
            }>
            {state === 31 && (
              <Text style={styles.fontStyle1}>
                {requestedDate} {requestedTime}
              </Text>
            )}
            <Text
              style={getStatusStyle(state)}>
              {getStatusText(state)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootWrapper:
    Platform.OS === 'ios'
      ? {
          width: '85%',

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
        }
      : {
          width: '85%',

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

  // font Style1 : 예약중
  // font Style2 : 예약완료
  // font Style3 : 예약불가
  // fontStyle1Wrap: 예약중, 예약완료 wrap
  // fontStyleOtherWrap: 예약불가wrap
  fontaStyle1Wrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyle1:
    Platform.OS === 'ios'
      ? {
          paddingLeft: '5%',
          paddingRight: '5%',
          color: '#656565',
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.6),
        }
      : {
          paddingLeft: '5%',
          paddingRight: '5%',
          color: '#656565',
          fontWeight: '800',
          fontSize: responsiveFontSize(1.6),
        },
  fontStyle2:
    Platform.OS === 'ios'
      ? {
          paddingLeft: '5%',
          paddingRight: '5%',
          color: '#2CB07B',
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.6),
        }
      : {
          paddingLeft: '5%',
          paddingRight: '5%',
          color: '#2CB07B',
          fontWeight: '800',
          fontSize: responsiveFontSize(1.6),
        },
  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    alignItems: 'center',
    height: 40,
    width: '100%',
    //backgroundColor: '#ff0',
    justifyContent: 'center',
  },
  fontStyle3:
    Platform.OS === 'ios'
      ? {
          paddingLeft: '5%',
          color: '#EB701F',
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.6),
        }
      : {
          paddingLeft: '5%',
          color: '#EB701F',
          fontWeight: '800',
          fontSize: responsiveFontSize(1.6),
        },
});
