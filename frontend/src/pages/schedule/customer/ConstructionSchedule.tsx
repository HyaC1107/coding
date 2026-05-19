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
import StateCard from '@/components/card/StateCard';
import SchedulePopup from '@/pages/popup/SchedulePopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const data = [
  {
    state: 1,
    storeName: undefined,
    storeThum: undefined,
    time: undefined,
    date: undefined,
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/005-facility.png'),
    category: '설비',
  },
  {
    state: 2,
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
    state: 3,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/003-demolition.png'),
    category: '철거',
  },
  {
    state: 4,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/001-3d.png'),
    category: '3D도면설계',
  },
  {
    state: 10,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/006-electronic.png'),
    category: '전기',
  },
  {
    state: 11,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: undefined,
    date: undefined,
    startDt: '2023년 5월 1일 AM 09시',
    endDt: '2023년 5월 2일 PM 17:30',
    icon: require('@/assets/images/02-main-category/007-chassis.png'),
    category: '샤시',
  },
  {
    state: 20,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/008-woodworking.png'),
    category: '목공',
  },
  {
    state: 21,
    storeName: '코지인테리어',
    storeThum: require('@/assets/images/cozy.png'),
    time: 'AM 09시 ~ PM 17:30',
    date: '2023년 5월 1일',
    startDt: undefined,
    endDt: undefined,
    icon: require('@/assets/images/02-main-category/009-bath.png'),
    category: '욕실',
  },
];
export default function ConstructionSchedule(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [showPopup, setPopup] = useState(false);

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };
  return (
    <View
      style={{
        height: '100%',
      }}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          일반적인 인테리어 공정순서대로 나열합니다
        </Text>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          반드시 안내문을 확인 하시길 바랍니다
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
                    //backgroundColor: '#F9F9F9',
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                    //   marginTop: '2%',
                  }}>
                  <Image style={
                    Platform.OS === 'android' 
                    ? {width: 60, height: 60}
                    : {width: 60, height: 60, borderWidth:1, borderRadius:100, borderColor:"white"}
                  } 
                    source={item.icon} />
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

                <StateCard
                  state={item.state}
                  storeName={item.storeName}
                  storeThum={item.storeThum}
                  date={item.date}
                  time={item.time}
                  startDt={item.startDt}
                  endDt={item.endDt}
                />

                {item.state === 3 && (
                  <View
                    style={
                      Platform.OS === 'ios'
                        ? {
                            width: '100%',
                            alignItems: 'center',
                            //height: 45,
                            //paddingTop: 10,
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 10,
                          }
                        : {
                            width: '100%',
                            position: 'absolute',
                            alignItems: 'center',
                            bottom: 0,
                            //height: 50,
                            justifyContent: 'center',
                          }
                    }>
                    <Text
                      style={{
                        color: '#656565',
                        fontSize: responsiveFontSize(1.2),
                      }}>
                      ※ 공사예정 14일 전으로 공사취소요청가능
                    </Text>
                  </View>
                )}
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
          <View
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#416292',
            }}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              스케줄 안내문
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              //schedule popup open
            }}>
            <View
              style={{
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
                borderTopColor: '#F6F6F6',
                borderTopWidth: 1,
              }}>
              <Image source={require('@/assets/images/scheduleler0.5.png')} />
              <Text style={{fontWeight: '600', paddingLeft: '5%'}}>
                스케줄관리
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {router.params?.popupOpen && <SchedulePopup handlePopup={handlePopup} />}
      {/* <RequestPopup showPopup={showPopup} handlePopup={handlePopup} /> */}
      {/* <RequestAcceptedPopup showPopup={showPopup} handlePopup={handlePopup} /> */}
      {/* <CalendarFilterPopup /> */}
    </View>
  );
}
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
