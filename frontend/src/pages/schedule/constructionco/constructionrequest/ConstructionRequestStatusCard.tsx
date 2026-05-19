import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
interface VisitCardProps {
  customerName: string;
  customerAddress: string;
  visitTime: string;
  companySchedule: string;
}

export default function ConstructionRequestStatusCard(
  data: VisitCardProps,
): JSX.Element {
  const {customerName, customerAddress, visitTime, companySchedule} = data;
  // schedule list dropdown 여닫기 상태관리
  // isOpen : true (dropdown open), false (dropdown close)
  const [isOpen, setOpen] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
          <View style={styles.infoBox}>
            <View>
              <Image
                style={
                  Platform.OS === 'android'
                    ? {width: 65, height: 65}
                    : {
                        width: 56,
                        height: 56,
                      }
                }
                source={require('@/assets/images/08-company/10-chattalkbtn.png')}
              />
            </View>
            <View style={{gap: 5}}>
              <View style={styles.nameAndCopy}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    letterSpacing: -0.7,
                  }}>
                  성시경 고객님
                  <Image
                  style={{
                    width: 23,
                    height: 23,
                    resizeMode: 'contain',
                  }}
                  source={require('@/assets/images/08-company/02-copy.png')}></Image>
                  <Image
                  style={{
                    width: 23,
                    height: 23,
                    resizeMode: 'contain',
                  }}
                  source={require('@/assets/images/08-company/02-copy.png')}></Image>
                </Text>
                
              </View>
              <Text
                style={{
                  width: '90%',
                  fontSize: responsiveFontSize(1.6),
                  color: '#656565',
                  letterSpacing: -0.7,
                }}>
                서울특별시 마포구 마포대로 20 202호
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                gap: 2,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  paddingBottom: '2%',
                }}>
                공사 시작일
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2.4), fontWeight: 'bold'}}>
                2023년 05월 15일
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2.4), fontWeight: 'bold'}}>
                AM 07:00
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E9EDEF',
                width: '100%',
              }}></View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                gap: 2,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  paddingBottom: '2%',
                }}>
                공사 종료일
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2.4), fontWeight: 'bold'}}>
                2023년 05월 15일
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2.4), fontWeight: 'bold'}}>
                AM 07:00
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '85%',
            backgroundColor: '#E9EDEF',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3%',
            gap: 5,
          }}>
          <Text style={{fontSize: responsiveFontSize(2), color: '#0F134A'}}>
            시공날짜 변경요청
          </Text>
          <Text style={{fontSize: responsiveFontSize(1.3), color: '#656565'}}>
            ※고객님의 스케줄을 확인하셔서 시공날짜변경 하세요
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: WINDOW_HEIGHT * 0.12,
            borderBottomColor: '#e9edef',
            borderBottomWidth: 1,
          }}>
          <TouchableWithoutFeedback>
            <Text
              style={{
                color: '#F2295F',
                fontWeight: 'bold',
                width: '35%',
                textAlign: 'center',
                fontSize: responsiveFontSize(2),
              }}>
              공사취소
            </Text>
          </TouchableWithoutFeedback>
          <Image source={require('@/assets/images/vertical-bar.png')} />
          <TouchableWithoutFeedback>
            <Text
              style={{
                width: '35%',
                textAlign: 'center',
                color: '#2CB07B',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
              }}>
              공사완료
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen(!isOpen);
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.07,
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 5,
            }}>
            <Text style={{fontSize: responsiveFontSize(1.8)}}>
              2023.05.15 장비임대현황
            </Text>
            <Image
              style={{width: 11, height: 7}}
              source={require('@assets/images/08-company/01-cardmore.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        {isOpen && (
          <View
            style={{
              width: '95%',
              backgroundColor: '#F9F9F9',
              padding: '2%',
              paddingLeft: '3%',
              marginBottom: WINDOW_HEIGHT * 0.04,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '3%',
                paddingTop: '3%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Image source={require('@assets/images/sky-icon.png')} />
                <View style={{justifyContent: 'center', gap: 5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: 'bold',
                    }}>
                    하늘스카이
                  </Text>
                  <Text
                    style={{
                      color: '#656565',
                      fontSize: responsiveFontSize(1.4),
                    }}>
                    고소작업차 1톤보유
                  </Text>
                </View>
              </View>
              <Image source={require('@assets/images/schedule-talk.png')} />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#F1F1F5',
                width: '100%',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: '3%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                임대료금액
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                500,000원
              </Text>
            </View>
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
          width: Dimensions.get('window').width * 0.8,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 5,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 15,
          paddingTop: '5%',
          justifyContent: 'center',
        }
      : {
          width: Dimensions.get('window').width * 0.8,
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
          marginBottom: 15,
          paddingTop: '5%',
          justifyContent: 'center',
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.03,
  },
  customerInfoContainer: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    // marginTop: WINDOW_HEIGHT * 0.03,
  },

  infoBox: {
    // width: 210,
    // height: '100%',
    width: 'auto',
    //backgroundColor: '#ff0',
    justifyContent: 'center',
    //paddingTop: '3%',
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    gap: 15,
  },
  nameAndCopy: {
    width: '100%',
    // height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    width: '85%',
    // height: WINDOW_HEIGHT * 0.17,
    backgroundColor: '#f9f9f9',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    gap: 15,
    width: '100%',
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
