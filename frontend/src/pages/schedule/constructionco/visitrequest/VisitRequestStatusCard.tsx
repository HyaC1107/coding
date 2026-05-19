import VisitScheduleCard from '@/components/card/VisitScheduleCard';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { patch } from '@/utils/api';

interface VisitCardProps {
  requestId: string;
  customerName: string;
  customerAddress: string;
  visitTime: string;
  onRefresh: () => void;
}

export default function VisitRequestStatusCard(
  props: VisitCardProps,
): JSX.Element {
  const {requestId, customerName, customerAddress, visitTime, onRefresh} = props;
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
    <View
      style={
        !isOpen
          ? styles.cardContainer
          : [styles.cardContainer, {height: 'auto'}]
      }>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
          <View style={styles.infoBox}>
            <View>
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
            <View style={{gap: 5}}>
              <View style={styles.nameAndCopy}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                  }}>
                  {customerName} 고객님
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
                  width: 200,
                  fontSize: responsiveFontSize(1.8),
                  color: '#656565',
                }}>
                {customerAddress}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={[styles.visitInfo, {gap: 10}]}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.4),
                letterSpacing: -0.7,
              }}>
              고객님 희망방문시간
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.4),
                fontWeight: 'bold',
                letterSpacing: -0.7,
              }}>
              {visitTime}
            </Text>
          </View>
          <View style={styles.modifyVisitTime}>
            <View
              style={
                Platform.OS === 'ios'
                  ? [styles.modifyButton, {gap: 7}]
                  : [styles.modifyButton, {gap: 5}]
              }>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.6),
                  textAlign: 'center',
                  color: '#0f134a',
                  letterSpacing: -1,
                }}>
                방문시간
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.6),
                  textAlign: 'center',
                  color: '#0f134a',
                  letterSpacing: -1,
                }}>
                변경
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            paddingTop: '2%',
            textAlign: 'center',
            width: '85%',
            fontSize: responsiveFontSize(1.4),
            letterSpacing: -0.7,
            color: '#656565',
          }}>
          ※방문시간 변경은 고객님과 시간을 조율해서 등록하길 바랍니다
        </Text>
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
                fontWeight: 'bold',
                paddingRight: 50,
                fontSize: responsiveFontSize(2),
              }}>
              예약불가
            </Text>
          </TouchableWithoutFeedback>
          <Image source={require('@/assets/images/vertical-bar.png')} />
          <TouchableWithoutFeedback onPress={handleAccept}>
            <Text
              style={{
                paddingLeft: 50,
                color: '#2CB07B',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2),
              }}>
              예약수락
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
                      width: '100%',
                      height: 'auto',
                      //   justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }
                  : {
                      width: '100%',
                      height: 'auto',
                      //   justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingTop: '5%',
                    }
              }>
              <Text style={{fontSize: responsiveFontSize(2), marginRight: 10}}>
                {visitTime.split(' ')[0]} 스케줄보기
              </Text>
              <Image
                style={{width: 11, height: 7}}
                source={require('@assets/images/08-company/01-cardmore.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          {isOpen && (
            <View style={{alignItems: 'center', paddingTop: '3%'}}>
              <VisitScheduleCard
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
  cardContainer:
    Platform.OS === 'ios'
      ? {
          //   flex: 1,
          width: Dimensions.get('window').width * 0.85,
          //height: 310,
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
          width: Dimensions.get('window').width * 0.85,
          // height: 350,
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
  cardScrollContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.85,
    height: WINDOW_HEIGHT * 0.51,
    borderRadius: 3,
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
    justifyContent: 'center',
    //backgroundColor: '#ff0000',
  },
  customerInfoContainer: {
    width: '100%',
    gap: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: WINDOW_HEIGHT * 0.03,
    justifyContent: 'center',
    //backgroundColor: '#ff0',
  },

  infoBox: {
    // width: 210,
    // height: '100%',
    width: '89%',
    //backgroundColor: '#ff0',
    //justifyContent: 'center',
    //paddingTop: '3%',
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    gap: 10,
  },
  nameAndCopy: {
    //width: '100%',
    // height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.75,
    height: WINDOW_HEIGHT * 0.12,
    backgroundColor: '#f9f9f9',
    marginTop: '5%',
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
    width: 70,
    height: 70,
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
