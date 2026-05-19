import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
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
import {WINDOW_HEIGHT} from '@/constants/context';
import VisitFixedStatusCard from '../visitfixed/VisitFixedStatusCard';
import ConstructionRequestStatusCard from './ConstructionRequestStatusCard';
import ConstructionRequestCalendarPopup from '@/components/popup/ConstructionRequestCalendarPopup';
import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';

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
export default function ConstructionRequestPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const router = useRoute<any>();
  const navigation = useNavigation<any>();
  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.5}}>
          시공날짜를 표시합니다
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <FlatList
          data={data}
          horizontal
          snapToInterval={Dimensions.get('window').width + 5}
          snapToAlignment="start"
          style={{
            width: '100%',
          }}
          renderItem={({item}) => (
            <View
              style={{
                width: Dimensions.get('window').width,
                height: 'auto',
                paddingTop: WINDOW_HEIGHT * 0.05,
                //justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ConstructionRequestStatusCard
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
              letterSpacing: -1,
            }}>
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
            <Image
              style={{width: 18, height: 18}}
              source={require('@assets/images/08-company/09-schedulbtn.png')}
            />
            <Text
              style={{
                fontWeight: '600',
                paddingLeft: '5%',
                fontSize: responsiveFontSize(2),
                letterSpacing: -1,
              }}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params.popupOpen && (
        <ScheduleNavPopup handlePopup={handlePopup} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
