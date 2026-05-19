import React, {useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomTextInput from '../../components/textinput/TextInput';
import PssWdTextInput from '../../components/textinput/PsswdTextInput';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
interface LoginProp {
  navigate: any;
}

const Review = () => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        padding: '5%',
      }}>
      <FlatList
        horizontal={false}
        data={['test', 'test']}
        renderItem={(i: any) => (
          <View
            key={i}
            style={{
              width: Dimensions.get('window').width - 30,
              justifyContent: 'center',
              borderBottomColor: '#F6F6F6',
              borderBottomWidth: 1,
              paddingBottom: '5%',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                //padding: '5%',
                //backgroundColor: '#f0f',
                alignItems: 'center',
                paddingLeft: '3%',
                paddingRight: '4%',
                paddingBottom: '2%',
                paddingTop: '4%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('@assets/images/04-findservice/02-review-customer.png')}
                />
                <Text
                  style={{
                    paddingLeft: '3%',
                    fontSize: responsiveFontSize(1.6),
                    letterSpacing: -0.7,
                  }}>
                  토토니
                </Text>
              </View>
              <View
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  공사기간
                </Text>
                <Text
                  style={{
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  2022.04.05~2022.04.06
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '97%',
                borderRadius: 5,
                backgroundColor: '#F6F6F6',
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingTop: '3%',
                paddingBottom: '3%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingBottom: '5%',
                  //backgroundColor: '#ff0',
                }}>
                <Text
                  style={{
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  바닥 에폭시 공사
                </Text>
                <Text
                  style={{
                    color: '#656565',
                    fontSize: responsiveFontSize(1.2),
                    letterSpacing: -0.7,
                  }}>
                  수정
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '90%',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 100,
                    height: 100,
                    marginRight: '5%',
                  }}></View>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 100,
                    height: 100,
                    marginRight: '5%',
                  }}></View>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 50,
                    height: 100,
                    marginRight: '5%',
                  }}></View>
              </View>
              <View
                style={{width: '100%', paddingTop: '5%', paddingBottom: '5%'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.4),
                    letterSpacing: -1,
                  }}>
                  사장님 덕분에 인테리어 잘 했습니다. 다른곳보다 저렴하고 상담도
                  친절하게 해주셔서 가게 오픈도 정확한 날짜에 오픈 하고
                  잘했습니다. 감사합니다 그리고 엄청 꼼꼼하게 봐주셔서 알지
                  못했던 것 부분도 착오 없이 진행했습니다
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  paddingTop: '1%',
                  paddingBottom: '3%',
                  borderRadius: 5,
                  backgroundColor: '#FFFFF6',
                }}>
                <View
                  style={{
                    // paddingLeft: '2%',
                    width: '100%',
                    paddingTop: '1%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: '2%',
                  }}>
                  <Image
                    style={{
                      position: 'absolute',
                      top: '-50%',
                    }}
                    source={require('../../assets/images/balloon.png')}
                  />
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('@/assets/images/04-findservice/01-review-owner.png')}
                  />
                  <Text style={{paddingLeft: '5%', letterSpacing: -1}}>
                    사장님
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.4),
                    letterSpacing: -1,
                  }}>
                  감사합니다 무슨일 있으시면 바로 연락주세요 번창하세요 사장님!
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    //alignItems: 'center',
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
    //backgroundColor: '#ff0',
    position: 'relative',
    paddingBottom: '5%',
  },
});

export default Review;
