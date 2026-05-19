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
  // isUpdate state : 임대요청 날짜변경시 카드모양변경에 적용됨
  const [isUpdated, setUpdated] = useState(false);

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
                  fontWeight: '600',
                }}><Image
                style={{width: 12, height: 18}}
                source={require('@/assets/images/03-main-icon/02-upperloc.png')}
              />
                서울시 마포구 마포대로 33
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#656565',
                  fontWeight: '600',
                }}>
                삼성아파트 305동 101호
                <Image
                style={{width: 15, height: 20}}
                source={require('@/assets/images/08-company/02-copy.png')}
              />
              <Image
                style={{width: 15, height: 20}}
                source={require('@/assets/images/08-company/02-copy.png')}
              />
              </Text>
            </View>
            {/* <View
              style={{
                height: WINDOW_HEIGHT * 0.05,
                justifyContent: 'flex-end',
              }}>
              
            </View> */}
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: '#656565',
              fontWeight: '600',
            }}>
            AM 10:00
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
                    fontSize: responsiveFontSize(2),
                    color: '#000',
                  }}>
                  성시경 고객님
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(2)}}>작업층수</Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>2층</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '80%',
            alignItems: 'center',
            // backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          {isUpdated && (
            <View
              style={{
                width: '100%',
                height: '100%',
                //   height: '100%',
                position: 'absolute',
                top: 0,
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.8)',
                justifyContent: 'center',
                gap: 20,
              }}>
              <View style={{alignItems: 'center', gap: 5}}>
                <Text style={{color: 'white', letterSpacing: -1}}>
                  고객님에게 날짜변경을
                </Text>
                <Text style={{color: 'white', letterSpacing: -1}}>
                  요청하였습니다
                </Text>
              </View>
              <View style={{alignItems: 'center', gap: 5}}>
                <Text style={{color: 'white', letterSpacing: -1}}>
                  2023년 05월 26일
                </Text>
                <Text style={{color: 'white', letterSpacing: -1}}>
                  AM 10:00
                </Text>
              </View>
            </View>
          )}
          <View
            style={[
              styles.visitTimeBox,
              {
                borderTopWidth: 1,
                borderTopColor: '#F1F1F5',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '5%',
                width: '100%',
                justifyContent: 'center',
                paddingBottom: '5%',
              }}>
              <View style={{gap: 15, alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: '3%',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(2),
                      color: '#000',
                    }}>
                    작업내용
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 10, paddingBottom: '3%'}}>
                  <Text style={{fontSize: responsiveFontSize(1.8)}}>
                    중형냉장고를 2층에서 내리고 싶습니다
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '70%',
              alignItems: 'center',
              height: 80,
              justifyContent: 'center',
              //maxHeight: 70,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: 'auto',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                  textAlign: 'center',
                }}>
                임대료금액
              </Text>

              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                }}>
                {(500000).toLocaleString()}원
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // width: '85%',
            width: '100%',
            //backgroundColor: '#ff0',
            alignItems: 'center',
            height: WINDOW_HEIGHT * 0.08,
            justifyContent: 'center',
            maxHeight: 70,
            borderTopWidth: 1,
            borderTopColor: '#F6F6F6',
          }}>
          <TouchableWithoutFeedback>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                  color: '#2CB07B',
                  textAlign: 'center',
                }}>
                수락하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
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
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.03,
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
