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
import ConstructionRequestCalendarPopup from '@/components/popup/ConstructionRequestCalendarPopup';
import ConstructionRequestStatusCard from '@/pages/schedule/constructionco/constructionrequest/ConstructionRequestStatusCard';
import GetRequestListStatusCard from './HeavyRentSuccessStatusCard';
import CalendarOnlyPopup from '@/pages/popup/CalendarOnlyPopup';
import ToolRentNavPopup from '@/pages/popup/ToolRentNavPopup';
import GetHeavyRequestListStatusCard from './HeavyRentSuccessStatusCard';


const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
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
    storeName: '코지인테리어',
    storeThum: require('@assets/images/cozy.png'),
    time: undefined,
    date: '2023년 5월 2일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@assets/images/main/home/19518.png'),
    category: '종합인테리어',
    state: 0,
  },
  {
    storeName: '코지인테리어',
    storeThum: require('@assets/images/cozy.png'),
    time: undefined,
    date: undefined,
    startDt: undefined,
    endDt: undefined,
    icon: require('@assets/images/main/home/19518.png'),
    category: '종합인테리어',
    state: 1,
  },
  {
    storeName: '코지인테리어',
    storeThum: require('@assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@assets/images/main/home/19519.png'),
    category: '철거',
    state: 2,
  },
];
export default function HeavyRentSuccessPage(): JSX.Element {
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
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          임대 완료된 날짜를 표시합니다
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: '5%',
        }}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: Dimensions.get('window').width,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: WINDOW_HEIGHT * 0.03,
            marginTop:'5%' 
          }}>
          <GetHeavyRequestListStatusCard
            customerName={''}
            customerAddress={''}
            visitTime={''}
            companySchedule={''}
            state={0}
          />
        </View>
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
              fontSize: responsiveFontSize(1.8),
              letterSpacing: -1,
              fontWeight: '600',
            }}>
            시공업체스케줄 안내문
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
        <ToolRentNavPopup handlePopup={handlePopup} />
      )}

      {/* <CalendarOnlyPopup /> */}
      {/* <ConstructionRequestCalendarPopup /> */}
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
