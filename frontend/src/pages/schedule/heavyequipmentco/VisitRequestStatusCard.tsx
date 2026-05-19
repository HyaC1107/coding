import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
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

export default function VisitRequestStatusCard(
  data: VisitCardProps,
): JSX.Element {
  const {customerName, customerAddress, visitTime, companySchedule} = data;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.customerInfoContainer}>
          <View style={styles.imageBox}>
            <Image source={require('@/assets/images/talk.png')} />
          </View>
          <View style={styles.infoBox}>
            <View style={styles.nameAndCopy}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: 'bold',
                }}>
                성시경 고객님
              </Text>
              <Image
                style={{
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                }}
                source={require('@/assets/images/visit/copy.jpg')}></Image>
            </View>
            <Text
              style={{
                width: '90%',
                fontSize: responsiveFontSize(2),
                color: '#656565',
              }}>
              서울특별시 마포구 마포대로 20 202호
            </Text>
          </View>
        </View>
        <View style={styles.visitTimeBox}>
          <View style={styles.visitInfo}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
              }}>
              고객님 희망방문시간
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2.1),
                fontWeight: 'bold',
              }}>
              2023.05.10 PM 16:00
            </Text>
          </View>
          <View style={styles.modifyVisitTime}>
            <View style={styles.modifyButton}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  textAlign: 'center',
                  color: '#0f134a',
                }}>
                방문시간{'\n'}변경
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            paddingTop: '2%',
            textAlign: 'center',
            width: '85%',
            fontSize: responsiveFontSize(1.3),
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
          <TouchableWithoutFeedback>
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
          <Image source={require('../../../assets/images/vertical-bar.png')} />
          <TouchableWithoutFeedback>
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
          <View
            style={{
              width: '50%',
              height: 'auto',
              //   justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text>2023.05.10 스케줄보기 </Text>
            <Image source={require('@assets/images/open0.5.png')} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
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
