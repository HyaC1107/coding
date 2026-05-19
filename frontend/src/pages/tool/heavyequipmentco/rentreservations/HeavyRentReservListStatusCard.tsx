import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import HeavyRentReservProfileCard from './HeavyRentReservProfileCard';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {Platform} from 'react-native';
import GetHeavyProfileCard from '../getrequestlist/GetHeavyProfileCard';

interface VisitCardProps {
  customerName: string;
  customerAddress: string;
  visitTime: string;
  companySchedule: string;
  state: number; // 0 : 예약대기중, 1: 예약불가, 2: 예약완료
}

export default function HeavyRentReservListStatusCard(
  data: VisitCardProps,
): JSX.Element {
  const {customerName, customerAddress, visitTime, companySchedule, state} =
    data;
  const dummy = [
    {
      key: 'key',
      reservAvaiilableState: true,
    },
    {
      key: 'key',
      reservAvaiilableState: true,
    },
    {
      key: 'key',
      reservAvaiilableState: false,
    },
  ];
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    console.log(isOpen);
  }, []);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={{width: '100%', alignItems: 'center', gap: 15}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.4),
              fontWeight: 'bold',
            }}>
            2023년 05월 25일
          </Text>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    //width: WINDOW_WIDTH * 0.49,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 45,
                    //gap: 10,
                    width: '100%',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    //gap: 15,
                  }
            }>
            <View
              style={
                Platform.OS === 'android'
                  ? {
                      height: '100%',
                      paddingTop: 5,
                      position: 'absolute',
                      left: -20,
                    }
                  : {
                      height: '100%',
                      paddingTop: 5,
                      position: 'absolute',
                      left: 50,
                    }
              }>
              
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  color: '#656565',
                  fontWeight: '600',
                }}>
                  <Image
                style={{width: 12, height: 18}}
                source={require('@/assets/images/03-main-icon/02-upperloc.png')}
              />
                서울시 마포구 마포대로 33
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  color: '#656565',
                  fontWeight: '600',
                }}>
                삼성아파트 305동 101호
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: '#656565',
              fontWeight: '600',
            }}>
            AM 08:00 ~ PM 17:00
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            gap: 15,
            paddingTop: 20,
          }}>
          <GetHeavyProfileCard />
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            // gap: 15,
            paddingTop: '3%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 40,
              alignItems: 'center',
              width: '100%',
              height: WINDOW_HEIGHT * 0.1,
              borderBottomColor: '#E9EDEF',
              borderBottomWidth: 1,
            }}>
            <Text
              style={{fontSize: responsiveFontSize(2.4), fontWeight: 'bold'}}>
              임대료금액
            </Text>
            <Text
              style={{fontSize: responsiveFontSize(2.4), fontWeight: 'bold'}}>
              {(500000).toLocaleString()}원
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                width: '50%',
                height: 'auto',
                paddingTop: '5%',
                paddingBottom: '5%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {state === 0 && (
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: '#656565',
                    fontWeight: 'bold',
                  }}>
                  예약대기중
                </Text>
              )}
              {state === 1 && (
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: '#F2295F',
                    fontWeight: 'bold',
                  }}>
                  예약불가
                </Text>
              )}
              {state === 2 && (
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: '#2CB07B',
                    fontWeight: 'bold',
                  }}>
                  예약완료
                </Text>
              )}
            </View>
          </View>
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
          marginBottom: 60,
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
          borderColor: '#e9edef',
          marginBottom: 60,
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.03,
    // paddingBottom: WINDOW_HEIGHT * 0.04,
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.68,
    gap: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imageBox: {},
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
    gap: 2,
  },
  nameAndCopy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.65,
    height: WINDOW_HEIGHT * 0.17,
    backgroundColor: '#f9f9f9',
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    gap: 25,
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
