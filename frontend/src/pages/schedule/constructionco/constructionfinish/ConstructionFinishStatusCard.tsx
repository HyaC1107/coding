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

export default function ConstructionFinishStatusCard(
  data: VisitCardProps,
): JSX.Element {
  const {customerName, customerAddress, visitTime, companySchedule} = data;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
          <View
            style={
              Platform.OS === 'android'
                ? {width: 60, height: 60}
                : {
                    width: 60,
                    height: 60,
                    borderWidth:1, borderRadius:100, borderColor:"white"
                  }
            }>
            <Image
              style={
                Platform.OS === 'android'
                  ? {
                      width: 65,
                      height: 65,
                    }
                  : {
                      width: 60,
                      height: 60,
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
                }}>
                성시경 고객님
                <Image
                style={{
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                }}
                source={require('@/assets/images/08-company/02-copy.png')} />
                <Image
                style={{
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                }}
                source={require('@/assets/images/08-company/02-copy.png')} />
              </Text>
              
            </View>
            <Text
              style={{
                width: '90%',
                fontSize: responsiveFontSize(1.8),
                color: '#656565',
                letterSpacing: -0.7,
              }}>
              서울특별시 마포구 마포대로 20 202호
            </Text>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.6),
                fontWeight: 'bold',
                color: '#2CB07B',
                letterSpacing: -0.7,
              }}>
              공사완료
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.4),
                fontWeight: 'bold',
              }}>
              2023.05.10 PM 16:00
            </Text>
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
          width: Dimensions.get('window').width * 0.8,
          // height: WINDOW_HEIGHT * 0.4,
          //height: 270,
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
          width: Dimensions.get('window').width * 0.8,
          // height: WINDOW_HEIGHT * 0.4,
          height: 300,
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
    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.05,
    paddingBottom: WINDOW_HEIGHT * 0.04,
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.68,
    gap: 15,
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
    width: WINDOW_WIDTH * 0.68,
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
    padding: '2%',
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
