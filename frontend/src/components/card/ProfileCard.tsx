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
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
interface ProfileCardProps {
  /// can use card props
  reservAvaiilableState?: boolean;
}

export default function ProfileCard(cardProps: ProfileCardProps): JSX.Element {
  const {reservAvaiilableState} = cardProps;
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: '#F9F9F9',
        padding: '2%',
        paddingLeft: '3%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '3%',
          paddingTop: '3%',
        }}>
        {reservAvaiilableState ||
          (reservAvaiilableState === undefined && (
            <View style={{position: 'absolute', right: 0}}>
              <Image
                style={{width: 40, height: 40}}
                source={require('@/assets/images/08-company/10-chattalkbtn.png')}
              />
            </View>
          ))}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            
          }}>
          <Image source={require('@assets/images/sky-icon.png')} />
          <View
            style={
              Platform.OS === 'ios'
                ? {justifyContent: 'center', gap: 5}
                : {
                    justifyContent: 'center',
                    gap: 2,
                  }
            }>
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
                fontSize: responsiveFontSize(1.6),
              }}>
              고소작업차 1톤보유
            </Text>            
          </View>
          <Image
            style={{marginLeft:40,width: 40, height: 40}}
            source={require('@/assets/images/05-pick/connect-chat.png')}
          />
        </View>
        {/* {reservAvaiilableState ||
          (reservAvaiilableState === undefined && (
            <Image source={require('@assets/images/schedule-talk.png')} />
          ))} */}
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#F1F1F5',
          width: '100%',
        }}></View>
      <View
        style={
          reservAvaiilableState !== undefined
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: '3%',
                justifyContent: 'center',
              }
            : {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: '7%',
                justifyContent: 'center',
              }
        }>
        <Text style={{fontSize: responsiveFontSize(2.2), fontWeight: 'bold'}}>
          임대료금액
        </Text>
        <Text style={{fontSize: responsiveFontSize(2.2), fontWeight: 'bold'}}>
          500,000원
        </Text>
      </View>
      {reservAvaiilableState !== undefined && reservAvaiilableState && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: WINDOW_HEIGHT * 0.07,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#2CB07B',
              fontSize: responsiveScreenFontSize(1.8),
              fontWeight: 'bold',
              letterSpacing: -0.7,
            }}>
            업체 확인중
          </Text>
        </View>
      )}
      {reservAvaiilableState !== undefined && !reservAvaiilableState && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: WINDOW_HEIGHT * 0.07,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#F2295F',
              fontSize: responsiveScreenFontSize(1.8),
              fontWeight: 'bold',
              letterSpacing: -0.7,
            }}>
            예약불가
          </Text>
        </View>
      )}
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
