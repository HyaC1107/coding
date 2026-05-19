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
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
interface ProfileCardProps {
  /// can use card props
  reservAvaiilableState?: boolean;
}

export default function HeavyRentSuccessProfileCard(
  cardProps: ProfileCardProps,
): JSX.Element {
  const {reservAvaiilableState} = cardProps;

  return (
    <View
      style={{
        width: WINDOW_WIDTH * 0.8,
        backgroundColor: '#F9F9F9',
        padding: '2%',
        paddingLeft: '3%',
        // marginBottom: WINDOW_HEIGHT * 0.04,
        // marginTop: '1%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '3%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            width: WINDOW_WIDTH * 0.75,
            height: WINDOW_HEIGHT * 0.1,
          }}>
          <Image
            style={
              Platform.OS === 'ios'
                ? {width: 55, height: 55}
                : {
                    width: 60,
                    height: 60,
                  }
            }
            source={require('@assets/images/star/rent-star.png')}
          />
          <View
            style={{
              justifyContent: 'center',
              gap: 10,
              //backgroundColor: '#ababab',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                letterSpacing: -0.7,
              }}>
              스타인테리어
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text
                style={{
                  color: '#656565',
                  fontWeight: '600',
                  letterSpacing: -0.7,
                  fontSize: responsiveFontSize(1.4),
                }}>
                고소작업차
              </Text>
              <Text
                style={{
                  color: '#656565',
                  fontWeight: '600',
                  letterSpacing: -0.7,
                  fontSize: responsiveFontSize(1.4),
                }}>
                보증보험가능
              </Text>
              <Text
                style={{
                  color: '#656565',
                  fontWeight: '600',
                  letterSpacing: -0.7,
                  fontSize: responsiveFontSize(1.4),
                }}>
                6개월A/S
              </Text>
            </View>
          </View>
          <Image
            style={
              Platform.OS === 'android'
                ? {width: 45, height: 45}
                : {
                    width: 40,
                    height: 40,
                  }
            }
            source={require('@/assets/images/08-company/10-chattalkbtn.png')}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.85,
    // height: WINDOW_HEIGHT * 0.4,
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
    // height: '100%',
    paddingTop: WINDOW_HEIGHT * 0.05,
    paddingBottom: WINDOW_HEIGHT * 0.04,
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.68,
    gap: 10,
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
    width: WINDOW_WIDTH * 0.65,
    height: WINDOW_HEIGHT * 0.17,
    backgroundColor: '#f9f9f9',
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    gap: 25,
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
