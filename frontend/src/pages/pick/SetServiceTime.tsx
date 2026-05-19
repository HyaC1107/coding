import React, {useEffect, useRef, useState} from 'react';
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
  Alert,
} from 'react-native';

import styled, {css} from 'styled-components/native';

import {
  RouteProp,
  StackNavigationState,
  TypedNavigator,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/StackParamList';
import Toggle from '../../components/toggle/CustomToggle';
import MainMenu from '../../components/main/MainMenu';
import CalendarPopup from '../popup/CalendarPopup';
import AddressSelectPopup from '../popup/AddressSelectPopup';
import CategoryPopup from '../popup/CategoryPopup';
import Carousel from '../../components/carousel/Carousel';
import PickService from './PickService';
import CategorySelWarnPopup from '../popup/warn/CategorySelWarnPopup';
import IntroServicePopup from './IntroServicePopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ReqAllStoreAlarmPopup from '../popup/warn/ReqAllStoreAlarmPopup';
import { post, BASE_URL } from '@/utils/api';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;

export default function SetServiceTime(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();
  const { selectedCompanies = [], selectedCategories = [], region = '' } = router.params || {};

  const [companyTimes, setCompanyTimes] = useState<Record<string, string>>({});
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const [calendarPopup, setCalendarPopup] = useState(false);
  const [reqPopup, setReqPopup] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'flex',
        paddingBottom: 10,
        paddingTop: 10,
        height: 60,
      },
      headerShown: true,
    });
  }, []);

  const handleTimeSelect = (date: string, time: string) => {
    if (activeCompanyId) {
      setCompanyTimes(prev => ({
        ...prev,
        [activeCompanyId]: `${date} ${time}`
      }));
    }
  };

  const handleAllRequest = async () => {
    const companiesToRequest = selectedCompanies.map((c: any) => ({
      companyId: c._id,
      companyType: 'constructor',
      requestedTime: companyTimes[c._id] || '미지정'
    }));

    if (companiesToRequest.some((c: any) => c.requestedTime === '미지정')) {
      Alert.alert('알림', '모든 업체의 희망 방문 시간을 선택해주세요.');
      return;
    }

    try {
      await post('/requests', {
        companies: companiesToRequest,
        categories: selectedCategories,
        region: region,
        notes: ''
      });
      
      Alert.alert('성공', '방문 요청이 완료되었습니다.', [
        { text: '확인', onPress: () => navigation.navigate('스케줄') }
      ]);
    } catch (error) {
      console.error('Failed to submit requests:', error);
      Alert.alert('오류', '요청 제출에 실패했습니다.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        contentContainerStyle={
          Platform.OS === 'ios'
            ? {
                paddingBottom: '30%',
              }
            : {
                paddingBottom: '20%',
              }
        }>
        <View
          style={
            Platform.OS === 'android'
              ? {
                  backgroundColor: 'white',
                  paddingBottom: '5%',
                  alignItems: 'center',
                  paddingTop: '5%',
                }
              : {
                  backgroundColor: 'white',
                  paddingBottom: '5%',
                  alignItems: 'center',
                  paddingTop: '8%',
                }
          }>
          <Text style={{fontSize: responsiveFontSize(1.8)}}>
            업체를 선택하여 희망방문요청 시간을 입력하세요
          </Text>
        </View>
        {selectedCompanies.map((el: any, i: number) => {
          const selectedTime = companyTimes[el._id];
          return (
            <TouchableWithoutFeedback 
              key={el._id}
              onPress={() => {
                setActiveCompanyId(el._id);
                setCalendarPopup(true);
              }}
            >
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '5%',
                }}>
                <View
                  style={
                    Platform.OS === 'ios'
                      ? {
                          width: '85%',
                          height: 250,
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
                        }
                      : {
                          width: '85%',
                          height: 250,
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
                        }
                  }>
                  {selectedTime && (
                    <View
                      style={{
                        borderRadius: 3,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={
                          Platform.OS === 'ios'
                            ? {
                                color: 'white',
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: 'bold',
                              }
                            : {
                                color: 'white',
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: '800',
                              }
                        }>
                        {selectedTime}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      width: '100%',
                      height: '30%',
                      flexDirection: 'row',
                    }}>
                    <View style={{padding: '5%'}}>
                      <Image
                        style={{width: 50, height: 50, borderRadius: 25}}
                        source={el.profileImg ? { uri: `${BASE_URL}/${el.profileImg.replace(/\\/g, '/')}` } : require('../../assets/images/pick1.png')}
                      />
                    </View>
                    <View
                      style={{
                        paddingTop: '10%',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          paddingBottom: '5%',
                        }}>
                        {el.companyName}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {el.categories?.slice(0, 3).map((cat: string, idx: number) => (
                          <Text key={idx} style={{fontSize: 10, paddingRight: '2%'}}>
                            {cat}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingLeft: '5%',
                      paddingTop: '10%',
                      width: '100%',
                      height: '70%',
                    }}>
                    <Carousel imgList={el.profileImg ? [{ uri: `${BASE_URL}/${el.profileImg.replace(/\\/g, '/')}` }] : [require('@/assets/images/hanmaum/1.png')]} />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
            방문시간 안내문
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={handleAllRequest}>
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
            <Text
              style={{
                fontWeight: '600',
                color: '#2CB07B',
                paddingRight: '5%',
                fontSize: responsiveFontSize(2),
              }}>
              방문일괄요청
            </Text>
            <Image source={require('../../assets/images/next.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {calendarPopup && (
        <CalendarPopup 
          closePopup={() => setCalendarPopup(false)} 
          onSelect={handleTimeSelect}
        />
      )}      
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: '5%',
  },
});
