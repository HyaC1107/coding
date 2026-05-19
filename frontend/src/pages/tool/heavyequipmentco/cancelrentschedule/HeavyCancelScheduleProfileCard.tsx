import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useEffect, useRef, useState} from 'react';
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
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
interface ProfileCardProps {
  /// can use card props
  reservAvaiilableState?: boolean;
}

export default function HeavyCancelScheduleProfileCard(
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
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '3%',
          paddingTop: '3%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 5,
            width: WINDOW_WIDTH * 0.75,
            height: WINDOW_HEIGHT * 0.09,
          }}>
          <Image source={require('@assets/images/star/rent-star.png')} />
          <View style={{justifyContent: 'center', gap: 10}}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.6),
                fontWeight: 'bold',
              }}>
              스타인테리어
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <Text
                style={{
                  color: '#656565',
                  fontSize: responsiveFontSize(1.3),
                }}>
                고소작업차
              </Text>
              <Text
                style={{
                  color: '#656565',
                  fontSize: responsiveFontSize(1.3),
                }}>
                보증보험가능
              </Text>
              <Text
                style={{
                  color: '#656565',
                  fontSize: responsiveFontSize(1.3),
                }}>
                6개월A/S
              </Text>
            </View>
          </View>
          <Image source={require('@assets/images/rent/talk.png')} />
        </View>
      </View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: '#F1F1F5',
          width: '100%',
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 30,
          padding: '7%',
          justifyContent: 'space-between',
          width: WINDOW_WIDTH * 0.75,
        }}>
        <View style={{alignItems: 'center', gap: 15}}>
          <Text style={{fontSize: responsiveFontSize(1.8)}}>희망장비</Text>
          <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
            고소작업차
          </Text>
        </View>
        <View style={{alignItems: 'center', gap: 10}}>
          <Text style={{fontSize: responsiveFontSize(1.8)}}>희망차종</Text>
          <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
            1톤
          </Text>
        </View>
        <View style={{alignItems: 'center', gap: 10}}>
          <Text style={{fontSize: responsiveFontSize(1.8)}}>작업층수</Text>
          <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
            2층
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: '#F1F1F5',
          width: '100%',
        }}></View>
      <View
        style={{
          //   flexDirection: 'row',
          //   alignItems: 'center',
          gap: 30,
          padding: '7%',
          //   justifyContent: 'space-between',
          width: WINDOW_WIDTH * 0.75,
          height: WINDOW_HEIGHT * 0.15,
        }}>
        <View style={{gap: 20}}>
          <Text style={{fontSize: responsiveFontSize(2)}}>작업내용</Text>
          <Text style={{fontSize: responsiveFontSize(1.8)}}>
            건물 외벽 방수 작업입니다
          </Text>
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
