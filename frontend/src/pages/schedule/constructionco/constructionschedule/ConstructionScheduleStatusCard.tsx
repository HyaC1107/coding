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

interface ConstructionCardProps {
  requestId: string;
  customerName: string;
  customerAddress: string;
  visitTime: string;
  onRefresh: () => void;
}

export default function ConstructionScheduleStatusCard(
  props: ConstructionCardProps,
): JSX.Element {
  const {requestId, customerName, customerAddress, visitTime, onRefresh} = props;

  const handleSetSchedule = async () => {
    try {
      await patch(`/requests/${requestId}/setSchedule`);
      Alert.alert('성공', '방문 일정을 확정했습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to set schedule:', error);
      Alert.alert('오류', '일정 확정에 실패했습니다.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
          <View
            style={
              Platform.OS === 'android'
                ? {width: 70, height: 70}
                : {
                    width: 65,
                    height: 65,
                  }
            }>
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
          <View style={styles.infoBox}>
            <View style={styles.nameAndCopy}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: 'bold',
                  letterSpacing: -1,
                }}>
                {customerName} 고객님
              </Text>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
                source={require('@/assets/images/visit/copy.jpg')}></Image>
            </View>
            <Text
              style={{
                width: '90%',
                fontSize: responsiveFontSize(1.8),
                color: '#656565',
                letterSpacing: -0.5,
              }}>
              {customerAddress}
            </Text>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                letterSpacing: -0.7,
              }}>
              수락하신 희망방문시간:
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
        </View>
        <View style={{width: '100%'}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E9EDEF',
              width: '100%',
              alignItems: 'center',
              paddingBottom: WINDOW_HEIGHT * 0.04,
            }}>
            <Text
              style={{
                paddingTop: '5%',
                textAlign: 'center',
                width: '85%',
                fontSize: responsiveFontSize(1.3),
                color: '#656565',
              }}>
              ※방문 일정을 확정하시려면 아래 버튼을 눌러주세요
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={handleSetSchedule}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#2CB07B', fontWeight: 'bold'}}>
                방문일정 확정하기
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
          width: Dimensions.get('window').width * 0.85,
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
          marginBottom: 15,
        }
      : {
          width: Dimensions.get('window').width * 0.85,
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
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.03,
    paddingBottom: WINDOW_HEIGHT * 0.03,
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.8,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoBox: {
    width: 'auto',
    gap: 3,
    justifyContent: 'center',
  },
  nameAndCopy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.75,
    backgroundColor: '#f9f9f9',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: '2%',
    paddingBottom: '3%',
  },
  visitInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7%',
    gap: 15,
  },
});
