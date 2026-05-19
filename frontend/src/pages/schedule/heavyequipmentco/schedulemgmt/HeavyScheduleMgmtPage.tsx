import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import StateUpdateCard from '@/components/card/StateUpdateCard';
import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import VisitFixedStatusCard from '../visitfixed/VisitFixedStatusCard';
import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';
import HeavyScheduleNavPopup from '@/components/popup/HeavyScheduleNavPopup';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;

const data = [
  {
    state: 31,
    storeName: '코지인테리어',
    storeThum: require('@assets/images/cozy.png'),
    time: undefined,
    date: '2023년 5월 2일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@assets/images/main/home/19518.png'),
    category: '종합인테리어',
  },
  {
    state: 32,
    storeName: '코지인테리어',
    storeThum: require('@assets/images/cozy.png'),
    time: undefined,
    date: undefined,
    startDt: undefined,
    endDt: undefined,
    icon: require('@assets/images/main/home/19518.png'),
    category: '종합인테리어',
  },
  {
    state: 33,
    storeName: '코지인테리어',
    storeThum: require('@assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@assets/images/main/home/19519.png'),
    category: '철거',
  },
];
export default function HeavyScheduleMgmtPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const router = useRoute<any>();
  const navigation = useNavigation<any>();
  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          //   height: WINDOW_HEIGHT * 0.25,
          width: WINDOW_WIDTH * 0.85,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: WINDOW_HEIGHT * 0.03,
          //backgroundColor: '#f00',
          borderBottomColor: '#F9F9F9',
          borderBottomWidth: 1,
          paddingBottom: WINDOW_HEIGHT * 0.03,
        }}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'flex-end',
              gap: 5,
              paddingBottom: WINDOW_HEIGHT * 0.01,
            }}>
            <Image source={require('@/assets/images/update-pen.png')} />
            <Text style={{color: '#B4B4B4', fontSize: responsiveFontSize(1.5)}}>
              수정하기
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            padding: WINDOW_HEIGHT * 0.01,
            gap: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.35),
              paddingBottom: WINDOW_HEIGHT * 0.01,
            }}>
            우리가게 운영시간이예요
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: WINDOW_WIDTH * 0.47,
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View style={{width: WINDOW_WIDTH * 0.13, alignItems: 'center'}}>
              <Text
                style={{fontSize: responsiveFontSize(2.3), fontWeight: 'bold'}}>
                월~금
              </Text>
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                color: '#2CB07B',
                fontWeight: 'bold',
              }}>
              09:00~19:30
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: WINDOW_WIDTH * 0.45,
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View
              style={{
                width: WINDOW_WIDTH * 0.13,
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: responsiveFontSize(2.3), fontWeight: 'bold'}}>
                토
              </Text>
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                color: '#2CB07B',
                fontWeight: 'bold',
              }}>
              09:00~19:30
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: WINDOW_WIDTH * 0.85,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: WINDOW_HEIGHT * 0.03,
          paddingBottom: WINDOW_HEIGHT * 0.04,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            paddingBottom: WINDOW_HEIGHT * 0.01,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
              일자별 예약불가 관리
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image source={require('@/assets/images/update-pen.png')} />
              <Text
                style={{color: '#B4B4B4', fontSize: responsiveFontSize(1.5)}}>
                설정하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{gap: 20, width: '100%', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            width: WINDOW_WIDTH * 0.85,
            gap: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{}}>2023.05.30</Text>
          </View>
          <Text
            style={{
              color: '#0F134A',
            }}>
            오전시간 예약불가
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // padding: '5%',
            width: WINDOW_WIDTH * 0.85,
            gap: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{}}>2023.06.01</Text>
          </View>
          <Text
            style={{
              color: '#0F134A',
            }}>
            오후시간 예약불가
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // padding: '5%',
            width: WINDOW_WIDTH * 0.85,
            gap: 20,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{}}>2023.06.01</Text>
          </View>
          <View>
            <Text
              style={{
                color: '#0F134A',
              }}>
              AM 09:00, AM 10:00, PM 13:30
            </Text>
            <Text
              style={{
                color: '#0F134A',
              }}>
              PM 15:00, PM 19:00, PM 19:30
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // padding: '5%',
            width: WINDOW_WIDTH * 0.85,
            gap: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{}}>2023.06.02</Text>
          </View>
          <Text
            style={{
              color: '#0F134A',
            }}>
            종일예약불가
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            //schedule popup open
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#416292',
            }}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              고객관리스케줄 안내문
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params.popupOpen && (
        <HeavyScheduleNavPopup handlePopup={handlePopup} />
      )}
    </View>
  );
}
