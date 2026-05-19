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
  onRefresh: () => void;
}

export default function VisitFixedStatusCard(
  props: VisitCardProps,
): JSX.Element {
  const {requestId, customerName, customerAddress, detailAddress, visitTime, onRefresh} = props;

  const handleComplete = async () => {
    try {
      await patch(`/requests/${requestId}/complete`);
      Alert.alert('성공', '임대가 완료되었습니다.');
      onRefresh();
    } catch (error) {
      console.error('Failed to complete request:', error);
      Alert.alert('오류', '완료 처리에 실패했습니다.');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
          <View style={styles.imageBox}>
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
                  fontSize: responsiveFontSize(2),
                  fontWeight: 'bold',
                }}>
                {customerName} 고객님
              </Text>
              <Image
                style={{
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                }}
                source={require('@/assets/images/08-company/02-copy.png')}></Image>
            </View>
            <Text
              style={{
                width: '90%',
                fontSize: responsiveFontSize(1.8),
                color: '#656565',
              }}>
              {customerAddress} {detailAddress}
            </Text>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
              }}>
              고객님에게 방문예정 시간입니다
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
                fontWeight: 'bold',
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
                임대 완료하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.85,
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
    paddingTop: WINDOW_HEIGHT * 0.03,
    paddingBottom: WINDOW_HEIGHT * 0.03,
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.8,
    gap: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imageBox: {
  },
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
    paddingTop: '3%',
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
