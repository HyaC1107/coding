import PayReqCard from '@/components/card/PayReqCard';
import VisitScheduleCard from '@/components/card/VisitScheduleCard';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useEffect, useRef, useState} from 'react';
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
  onRefresh: () => void;
}

export default function VisitRequestStatusCard(
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
    onRefresh
  } = props;
  const [isOpen, setOpen] = useState(false);

  const handleAccept = async () => {
    try {
      await patch(`/requests/${requestId}/accept`);
      Alert.alert('성공', '방문 요청을 수락했습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to accept request:', error);
      Alert.alert('오류', '요청 수락에 실패했습니다.');
    }
  };

  const handleReject = async () => {
    try {
      await patch(`/requests/${requestId}/reject`);
      Alert.alert('성공', '방문 요청을 거절했습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to reject request:', error);
      Alert.alert('오류', '요청 거절에 실패했습니다.');
    }
  };

  return (
    <View style={!isOpen ? styles.cardContainer : [styles.cardContainerOpen]}>
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
                  fontWeight: '600',
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
                  fontWeight: '600',
                }}>
                {detailAddress}
                <Image
                style={{width: 15, height: 20}}
                source={require('@/assets/images/08-company/02-copy.png')}
              />
              </Text>
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
        <View style={[styles.visitTimeBox, {marginTop: '10%'}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '3%',
              gap: 20,
              width: '70%',
            }}>
            <View
              style={
                Platform.OS === 'android'
                  ? {width: 57, height: 57}
                  : {
                      width: 50,
                      height: 50,
                    }
              }>
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
            </View>
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
          style={[
            styles.visitTimeBox,
            {borderTopWidth: 1, borderTopColor: '#F1F1F5'},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '3%',
              width: '100%',
              justifyContent: 'center',
            }}>
            <View style={{gap: 15, alignItems: 'center'}}>
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
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={{fontSize: responsiveFontSize(1.8)}}>
                  {workContent}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={{
            paddingTop: '2%',
            textAlign: 'left',
            width: '80%',
            fontSize: responsiveFontSize(1.4),
            color: '#656565',
          }}>
          ※ 반드시 입찰하기 전 고객님과 1:1 대화방에서 작업환경 사진 및 요건을
          확인 한 후 입찰 하시길 바랍니다
        </Text>
        <View
          style={
            Platform.OS === 'ios'
              ? {
                  width: '100%',
                  alignItems: 'center',
                  height: 30,
                  justifyContent: 'center',
                  maxHeight: 70,
                  marginTop: 20,
                }
              : {
                  width: '100%',
                  alignItems: 'center',
                  height: 30,
                  justifyContent: 'center',
                  maxHeight: 70,
                  marginTop: 30,
                }
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '70%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontWeight: 'bold', fontSize: responsiveFontSize(2.2)}}>
              임대료금액설정
            </Text>
            <Text
              style={{fontWeight: 'bold', fontSize: responsiveFontSize(2.2)}}>
              0원
            </Text>
          </View>
        </View>
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
          <TouchableWithoutFeedback onPress={handleReject}>
            <Text
              style={{
                color: '#EB701F',
                fontWeight: '700',
                paddingRight: 25,
                fontSize: responsiveFontSize(2.2),
              }}>
              예약불가
            </Text>
          </TouchableWithoutFeedback>
          <Image source={require('@/assets/images/vertical-bar.png')} />
          <TouchableWithoutFeedback onPress={handleAccept}>
            <Text
              style={{
                paddingLeft: 25,
                color: '#2CB07B',
                fontWeight: '700',
                fontSize: responsiveFontSize(2.2),
              }}>
              입찰하기
            </Text>
          </TouchableWithoutFeedback>
        </View>
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
                      height: 'auto',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }
                  : {
                      height: 'auto',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingTop: '5%',
                    }
              }>
              <Text
                style={{fontSize: responsiveFontSize(2), paddingRight: '5%'}}>
                {requestedDate} 스케줄보기
              </Text>
              <Image source={require('@assets/images/open0.5.png')} />
            </View>
          </TouchableWithoutFeedback>
          {isOpen && (
            <View style={{alignItems: 'center', paddingTop: '3%'}}>
              <PayReqCard
                tm={'08:00'}
                nm={'홍길동'}
                addr={'서울특별시 마포구 마포대로 16 삼성아파트 102동 520호'}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.85,
    height: WINDOW_HEIGHT * 0.78,
    maxHeight: 620,
    borderRadius: 2,
    shadowColor: '#ababab',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9edef',
    marginBottom: 12,
  },
  cardContainerOpen: {
    width: Dimensions.get('window').width * 0.85,

    borderRadius: 5,
    shadowColor: '#ababab',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9edef',
  },
  cardScrollContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.85,
    height: WINDOW_HEIGHT * 0.51,
    borderRadius: 10,
    shadowColor: '#ababab',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9edef',
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    paddingTop: '5%',
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.8,
    gap: 5,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: WINDOW_HEIGHT * 0.03,
    // backgroundColor: '#ff0',
  },
  imageBox: {
    // width: 90,
    // height: '100%',
  },
  infoBox: {
    // width: 210,
    // height: '100%',
    width: 'auto',
    // backgroundColor: '#ff0',
    justifyContent: 'center',
    paddingTop: '3%',
  },
  nameAndCopy: {
    width: '100%',
    // height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.7,
    height: WINDOW_HEIGHT * 0.12,
    backgroundColor: '#f9f9f9',
    // marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    // width: '75%',
    height: '85%',
    justifyContent: 'space-evenly',
    padding: '5%',
    // backgroundColor: '#ff0',
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
