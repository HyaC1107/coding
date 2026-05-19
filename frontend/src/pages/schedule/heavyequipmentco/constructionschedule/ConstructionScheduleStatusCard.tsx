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
  Alert,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { patch } from '@/utils/api';

interface VisitCardProps {
  requestId: string;
  customerName: string;
  customerAddress: string;
  detailAddress: string;
  visitTime: string;
  workFloor: string;
  workContent: string;
  requestedDate: string;
  price: number;
  onRefresh: () => void;
}

export default function ConstructionScheduleStatusCard(
  props: VisitCardProps,
): JSX.Element {
  const {
    requestId,
    customerName,
    customerAddress,
    detailAddress,
    visitTime,
    workFloor,
    workContent,
    requestedDate,
    price,
    onRefresh
  } = props;
  const [isOpen, setOpen] = useState(false);

  const handleSetSchedule = async () => {
    try {
      await patch(`/requests/${requestId}/setSchedule`);
      Alert.alert('성공', '임대 일정이 확정되었습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to set schedule:', error);
      Alert.alert('오류', '일정 확정에 실패했습니다.');
    }
  };

  const handleCancel = async () => {
    try {
      await patch(`/requests/${requestId}/reject`);
      Alert.alert('성공', '임대가 취소되었습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to cancel request:', error);
      Alert.alert('오류', '임대 취소에 실패했습니다.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={{width: '100%', alignItems: 'center', gap: 15}}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.4),
              fontWeight: 'bold',
            }}>
            {requestedDate}
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
                {customerAddress}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#656565',
                }}>
                {detailAddress}
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
            {visitTime.split(' ')[1]}
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
                  {customerName} 고객님
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(2)}}>작업층수</Text>
                <Text style={{fontSize: responsiveFontSize(2)}}>{workFloor}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '80%',
            alignItems: 'center',
          }}>
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
                padding: '3%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <View style={{gap: 15, alignItems: 'center', paddingTop: '5%'}}>
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
                    작업내용
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 10, paddingBottom: '5%'}}>
                  <Text style={{fontSize: responsiveFontSize(1.8)}}>
                    {workContent}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#E9EDEF',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5%',
              gap: 10,
              width: WINDOW_WIDTH * 0.7,
            }}>
            <Text
              style={{
                letterSpacing: -1,
                fontSize: responsiveFontSize(1.8),
                color: '#0F134A',
              }}>
              임대날짜 변경요청
            </Text>
            <Text
              style={{fontSize: responsiveFontSize(1.4), letterSpacing: -1}}>
              ※고객님의 스케줄을 확인하셔서 시공날짜변경 하세요
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '10%',
              paddingBottom: '5%',
              width: '65%',
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
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                  textAlign: 'center',
                }}>
                임대료금액
              </Text>
              <Text
                style={{
                  paddingLeft: '5%',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.2),
                  textAlign: 'center',
                }}>
                {price.toLocaleString()}원
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#e9edef',
            borderBottomWidth: 1,
            padding: '10%',
            paddingBottom: '12%',
          }}>
          <TouchableWithoutFeedback onPress={handleCancel}>
            <Text
              style={{
                color: '#F2295F',
                fontWeight: 'bold',
                paddingRight: 30,
                fontSize: responsiveFontSize(2.2),
              }}>
              임대취소
            </Text>
          </TouchableWithoutFeedback>
          <Image source={require('@/assets/images/vertical-bar.png')} />
          <TouchableWithoutFeedback onPress={handleSetSchedule}>
            <Text
              style={{
                paddingLeft: 30,
                color: '#2CB07B',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.2),
              }}>
              임대완료
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
              gap: 10,
            }}>
            <Text
              style={{fontSize: responsiveFontSize(2), letterSpacing: -0.7}}>
              {requestedDate} 임대스케줄
            </Text>
            <Image source={require('@/assets/images/open-schedule.png')} />
          </View>
        </TouchableWithoutFeedback>
        {isOpen && (
          <View
            style={{
              width: '95%',
              backgroundColor: '#F9F9F9',
              padding: '2%',
              paddingLeft: '5%',
              paddingRight: '5%',
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
                      fontSize: responsiveFontSize(2),
                      fontWeight: 'bold',
                      letterSpacing: -0.7,
                    }}>
                    하늘스카이
                  </Text>
                  <Text
                    style={{
                      color: '#656565',
                      letterSpacing: -0.7,
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    고소작업차 1톤보유
                  </Text>
                </View>
              </View>
              <Image
                style={
                  Platform.OS === 'android'
                    ? {width: 42, height: 42}
                    : {
                        width: 40,
                        height: 40,
                      }
                }
                source={require('@/assets/images/08-company/10-chattalkbtn.png')}
              />
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
                gap: 30,
                padding: '3%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                임대료금액
              </Text>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                {price.toLocaleString()}원
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
          marginBottom: 10,
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
          marginBottom: 10,
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.03,
  },
  customerInfoContainer: {
    width: '90%',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageBox: {
  },
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
  },
  nameAndCopy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.7,
    backgroundColor: '#f9f9f9',
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
  scrollWrapper:
    Platform.OS === 'ios'
      ? {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '2%',
          paddingTop: '8%',
        }
      : {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '2%',
        },
});
