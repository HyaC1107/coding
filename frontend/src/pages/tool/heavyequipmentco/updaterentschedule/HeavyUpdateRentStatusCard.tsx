import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import GetHeavyProfileCard from './HeavyUpdateRentProfileCard';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import VisitScheduleCard from '@/components/card/VisitScheduleCard';

interface VisitCardProps {
  customerName: string;
  customerAddress: string;
  visitTime: string;
  companySchedule: string;
  state: boolean;
}

export default function HeavyUpdateRentStatusCard(
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
        <View
          style={{
            paddingBottom: '5%',
            width: '100%',
            alignItems: 'center',
            gap: 15,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.6),
              fontWeight: 'bold',
              color: '#2CB07B',
            }}>
            변경된 임대날짜
          </Text>
          <Text
            style={{
              fontSize: responsiveScreenFontSize(2.4),
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
                  fontSize: responsiveScreenFontSize(2.2),
                  fontWeight: '600',
                  color: '#656565',
                }}>
                <Image
                  style={{width: 12, height: 18}}
                  source={require('@/assets/images/03-main-icon/02-upperloc.png')}
                />
                서울시 마포구 마포대로 33
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2.2),
                  fontWeight: '600',
                  color: '#656565',
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
            paddingTop: '3%',
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
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.1,
              borderBottomColor: '#e9edef',
              borderBottomWidth: 1,
            }}>
            <TouchableWithoutFeedback>
              <Text
                style={{
                  color: '#F2295F',
                  fontWeight: 'bold',
                  paddingRight: 40,
                  fontSize: responsiveFontSize(2.2),
                }}>
                임대취소
              </Text>
            </TouchableWithoutFeedback>
            <Image source={require('@/assets/images/vertical-bar.png')} />
            <TouchableWithoutFeedback>
              <Text
                style={{
                  paddingLeft: 40,
                  color: '#2CB07B',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                }}>
                수락
              </Text>
            </TouchableWithoutFeedback>
          </View>
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: WINDOW_HEIGHT * 0.07,
              borderBottomColor: '#E9EDEF',
              borderBottomWidth: 1,
              //   backgroundColor: '#ff0',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: 'bold',
                color: '#2CB07B',
              }}>
              {'수락'}
            </Text>
          </View> */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setOpen(!isOpen);
              }}>
              <View
                style={
                  !isOpen
                    ? {
                        width: '50%',
                        height: 'auto',
                        paddingTop: '3%',
                        paddingBottom: '3%',
                        //   justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }
                    : {
                        width: '50%',
                        height: 'auto',
                        //   justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingTop: '5%',
                      }
                }>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    letterSpacing: -0.7,
                    marginRight: '5%',
                    paddingTop: '3%',
                    paddingBottom: '3%',
                  }}>
                  2023.05.10 스케줄보기
                </Text>
                <Image source={require('@/assets/images/open-schedule.png')} />
              </View>
            </TouchableWithoutFeedback>
            {isOpen && (
              <View style={{alignItems: 'center', paddingTop: '3%'}}>
                <VisitScheduleCard
                  tm={'08:00'}
                  nm={'홍길동'}
                  addr={'서울특별시 마포구 마포대로 16 삼성아파트 102동 520호'}
                />
                <VisitScheduleCard
                  tm={'08:00'}
                  nm={'홍길동'}
                  addr={'서울특별시 마포구 마포대로 16 삼성아파트 102동 520호'}
                />
              </View>
            )}
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              //   width: WINDOW_WIDTH * 0.5,
              height: WINDOW_HEIGHT * 0.07,
              //   backgroundColor: '#ff0',
              gap: 10,
            }}>
            <Text style={{fontSize: responsiveFontSize(2)}}>
              2023.05.25 스케줄보기
            </Text>
            <Image source={require('@/assets/images/open-schedule.png')} />
          </View> */}
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
          marginBottom: 20,
        }
      : {
          width: Dimensions.get('window').width * 0.9,
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
          marginBottom: 20,
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.02,
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
