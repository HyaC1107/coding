import React, {useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styled, {css} from 'styled-components/native';

import {
  RouteProp,
  StackNavigationState,
  TypedNavigator,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Carousel from '@/components/carousel/Carousel';
import SchedulePopup from '@/pages/popup/SchedulePopup';
import {scheduleFixedData} from './schedule';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function ScheduleVisitFix(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();
  const [showPopup, setPopup] = useState(false);

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          업체에서 방문예정입니다 견적을 비교 후 공사를 요청하세요
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: '20%',
          paddingTop: '5%',
        }}
        style={{flex: 1, backgroundColor: 'white'}}>
        {scheduleFixedData.map((el, i) => {
          return (
            <View
              key={i}
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '5%',
              }}>
              <View style={styles.rootWrapper}>
                {el.state !== 3 && (
                  <View style={{position: 'absolute', right: 15, top: 15}}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={require('@/assets/images/05-pick/connect-chat.png')}
                    />
                  </View>
                )}
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (el.state === 2) {
                      setPopup(true);
                    }
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '30%',
                      flexDirection: 'row',
                    }}>
                    <View style={{padding: '5%'}}>
                      <Image
                        style={{width: 70, height: 70}}
                        source={require('@/assets/images/pick1.png')}
                      />
                    </View>
                    <View
                      style={{
                        paddingTop: '10%',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.TitleTextStyle}>한마음인테리어</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.SubTextStyle}>보증보험가능</Text>
                        <Text style={styles.SubTextStyle}>자격증보유</Text>
                        <Text style={styles.SubTextStyle}>6개월A/S</Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    paddingTop: '10%',
                    width: '100%',
                    height: '70%',
                    borderBottomColor: '#E9EDEF',
                    borderBottomWidth: 1,
                  }}>
                  {el.isCheck && (
                    <View
                      style={{
                        width: '100%',
                        height: '77%',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 1,
                        top: '20%',
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('@/assets/images/magnifier.png')}
                      />
                      <Text style={{color: 'white', paddingTop: '5%'}}>
                        다른업체찾기
                      </Text>
                    </View>
                  )}
                  <Carousel imgList={el.thumnailList} />
                  <View
                    style={
                      el.state !== 1
                        ? styles.fontStyleOtherWrap
                        : styles.fontaStyle1Wrap
                    }>
                    <Text
                      style={
                        el.state === 1 ? styles.fontStyle1 : {display: 'none'}
                      }>
                      2023년 5월 01일 AM 10:00
                    </Text>
                    <Text
                      style={
                        el.state === 1 || el.state === 4
                          ? styles.fontStyle1
                          : el.state === 2
                          ? styles.fontStyle2
                          : styles.fontStyle3
                      }>
                      {el.ment}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
        <View
          style={{
            width: '45%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#416292',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: responsiveFontSize(1.8),
            }}>
            스케줄 안내문
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            //schedule popup open
          }}>
          <View
            style={{
              width: '55%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: 'white',
              borderTopColor: '#F6F6F6',
              borderTopWidth: 1,
            }}>
            <Image source={require('@/assets/images/scheduleler0.5.png')} />
            <Text
              style={{
                fontWeight: '600',
                paddingLeft: '5%',
                fontSize: responsiveFontSize(2),
              }}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params?.popupOpen && <SchedulePopup handlePopup={handlePopup} />}
      {/* <RequestPopup showPopup={showPopup} handlePopup={handlePopup} /> */}
      {/* <RequestAcceptedPopup showPopup={showPopup} handlePopup={handlePopup} />
      <CalendarFilterPopup /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper:
    Platform.OS === 'ios'
      ? {
          width: '85%',
          height: 270,
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
        }
      : {
          width: '85%',
          height: 270,
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
        },

  scrollWrapper:
    Platform.OS === 'ios'
      ? {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '1%',
          paddingTop: '8%',
        }
      : {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '1%',
        },
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor: '#ff0',
    position: 'relative',
    paddingBottom: '5%',
  },

  // font Style1 : 예약중
  // font Style2 : 예약완료
  // font Style3 : 예약불가
  // fontStyle1Wrap: 예약중, 예약완료 wrap
  // fontStyleOtherWrap: 예약불가wrap
  fontaStyle1Wrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyle1:
    Platform.OS === 'ios'
      ? {
          paddingLeft: '5%',
          paddingRight: '5%',
          color: '#656565',
          fontWeight: 'bold',
          letterSpacing: -0.7,
          fontSize: responsiveFontSize(1.6),
        }
      : {
          paddingLeft: '5%',
          paddingRight: '5%',
          color: '#656565',
          fontWeight: '800',
          letterSpacing: -0.7,
          fontSize: responsiveFontSize(1.6),
        },
  fontStyle2: Platform.OS
    ? {
        paddingLeft: '5%',
        paddingRight: '5%',
        color: '#2CB07B',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.6),
        letterSpacing: -0.7,
      }
    : {
        paddingLeft: '5%',
        paddingRight: '5%',
        color: '#2CB07B',
        fontWeight: '800',
        fontSize: responsiveFontSize(1.6),
        letterSpacing: -0.7,
      },
  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    height: 40, //240214
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',//240214
  },
  fontStyle3:
    Platform.OS === 'ios'
      ? {
          paddingLeft: '5%',
          color: '#EB701F',
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.6),
          letterSpacing: -0.7,
        }
      : {
          paddingLeft: '5%',
          color: '#EB701F',
          fontSize: responsiveFontSize(1.6),
          fontWeight: '800',
          letterSpacing: -0.7,
        },

  TitleTextStyle:
    Platform.OS === 'ios'
      ? {
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
          paddingBottom: '5%',
          letterSpacing: -0.7,
        }
      : {
          fontSize: responsiveFontSize(2),
          fontWeight: '800',
          paddingBottom: '5%',
          letterSpacing: -0.7,
        },
  SubTextStyle: {
    fontSize: responsiveFontSize(1.6),
    paddingRight: '2%',
    color: '#656565',
    letterSpacing: -0.7,
  },
});
