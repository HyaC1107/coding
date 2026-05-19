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
import {useNavigation} from '@react-navigation/native';
import StateUpdateCard from '@/components/card/StateUpdateCard';
import VisitRequestStatusCard from './VisitRequestStatusCard';
import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';

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
export default function VisitRequestPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const [isOpen, setOpen] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: '9%',
          backgroundColor: 'white',
          padding: '2%',
          alignItems: 'center',
          marginBottom: '2%',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: responsiveFontSize(1.6)}}>
          새로운 고객님이 방문견적을 요청하였습니다
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
            snapToInterval={Dimensions.get('window').width * 0.9 + 5}
            snapToAlignment="start"
            style={{
              width: '100%',
            }}
            renderItem={({item}) => (
              <View
                style={{
                  width: Dimensions.get('window').width * 0.9,
                  height: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: WINDOW_HEIGHT * 0.05,
                }}>
                <VisitRequestStatusCard
                  customerName={''}
                  customerAddress={''}
                  visitTime={''}
                  companySchedule={''}
                />
              </View>
            )}
            onScroll={e => {
              Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                useNativeDriver: false,
              });
              const newPage = Math.round(
                e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
              );
              setPage(newPage);
            }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
          <IndicatorWrapper>
            {Array.from({length: 3}, (_, i) => i).map(i => (
              <Indicator key={`indicator_${i}`} focused={i === page} />
            ))}
          </IndicatorWrapper>
        </View>

        <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
          <View
            style={{
              width: '45%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#416292',
            }}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              고객관리스케줄 안내문
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
              <Image source={require('@assets/images/scheduleler0.5.png')} />
              <Text style={{fontWeight: '600', paddingLeft: '5%'}}>
                스케줄관리
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}
