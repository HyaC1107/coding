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

export default function VisitFixedStatusCard(
  props: VisitCardProps,
): JSX.Element {
  const {requestId, customerName, customerAddress, visitTime, onRefresh} = props;

  const handleComplete = async () => {
    try {
      await patch(`/requests/${requestId}/complete`);
      Alert.alert('성공', '시공이 완료되었습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to complete construction:', error);
      Alert.alert('오류', '완료 처리에 실패했습니다.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
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
          <View style={styles.infoBox}>
            <View style={styles.nameAndCopy}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: 'bold',
                  letterSpacing: -0.7,
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
                width: '90%',
                fontSize: responsiveFontSize(1.8),
                color: '#656565',
                letterSpacing: -0.7,
              }}>
              {customerAddress}
            </Text>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.4),
                letterSpacing: -0.7,
              }}>
              고객님에게 방문예정 시간입니다
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.6),
                fontWeight: 'bold',
                letterSpacing: -0.7,
              }}>
              {visitTime}
            </Text>
          </View>
        </View>
        <View style={{width: '100%', marginTop: 20}}>
          <TouchableWithoutFeedback onPress={handleComplete}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#2CB07B', fontWeight: 'bold', fontSize: responsiveFontSize(2.2)}}>
                시공 완료하기
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
          elevation: 5,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: 10,
        }
      : {
          width: Dimensions.get('window').width * 0.85,
          height: 320,
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
    justifyContent: 'center',
    paddingTop: WINDOW_HEIGHT * 0.03,
    paddingBottom: WINDOW_HEIGHT * 0.03,
  },
  customerInfoContainer: {
    width: '89%',
    gap: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
    gap: 5,
  },
  nameAndCopy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.75,
    height: WINDOW_HEIGHT * 0.17,
    backgroundColor: '#f9f9f9',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    gap: 15,
  },
});
