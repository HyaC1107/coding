import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import StateUpdateCard from '@/components/card/StateUpdateCard';
import SchedulePopup from '@/pages/popup/SchedulePopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const data = [
  {
    state: 31,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: undefined,
    date: '2023년 5월 2일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/002-interior.png'),
    category: '종합인테리어',
  },
  {
    state: 32,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: undefined,
    date: undefined,
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/002-interior.png'),
    category: '종합인테리어',
  },
  {
    state: 33,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/003-demolition.png'),
    category: '철거',
  },
];
export default function ConstructionScheduleUpdate(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [showPopup, setPopup] = useState(false);
  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };
  return (
    <View style={{height: '100%'}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          시공취소 및 시공날짜 변경요청 입니다
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <View
          style={
            Platform.OS === 'ios'
              ? {
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  height: 400,
                }
              : {
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  height: 450,
                }
          }>
          <FlatList
            data={data}
            horizontal
            style={{width: '100%'}}
            renderItem={({item}) => (
              <View
                style={{
                  width: Dimensions.get('window').width,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F9F9F9',
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                    marginTop: '2%',
                  }}>
                  <Image style={{width: 60, height: 60}} source={item.icon} />
                  <Image
                    style={{position: 'absolute', right: -140}}
                    source={require('@/assets/images/progress-icon.png')}
                  />
                </View>
                <Text
                  style={{
                    paddingBottom: '5%',
                    paddingTop: '2%',
                    fontSize: responsiveFontSize(1.4),
                  }}>
                  {item.category}
                </Text>

                <StateUpdateCard
                  state={item.state}
                  storeName={item.storeName}
                  storeThum={item.storeThum}
                  date={item.date}
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
      </View>
      {router.params?.popupOpen && <SchedulePopup handlePopup={handlePopup} />}
      {/* 알람 6종 확인, 하나씩 주석해제하여 확인 */}
      {/* <UpdateReqPopup /> */}
      {/* <UpdateReqAcptPopup /> */}
      {/* <CancelReqAcptPopup /> */}
      {/* <CancleReqDenyPopup /> */}
      {/* <ScheduleCancelAlarm /> */}
      {/* <ScheduleUpdateAlarm /> */}
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
  scrollWrapper:
    Platform.OS === 'ios'
      ? {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '2%',
          paddingTop: '8%',
        }
      : {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '2%',
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

  fontaStyle1Wrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyle1: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#656565',
    fontWeight: '600',
  },
  fontStyle2: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#2CB07B',
    fontWeight: '600',
  },
  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    alignItems: 'center',
  },
  fontStyle3: {
    paddingLeft: '5%',
    color: '#EB701F',
    fontWeight: '600',
  },
});
