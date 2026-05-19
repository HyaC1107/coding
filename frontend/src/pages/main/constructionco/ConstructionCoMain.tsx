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
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {WINDOW_HEIGHT} from '@/constants/context';
import CustomerRentRequestWIthDate from '@/pages/popup/CustomerRentRequestWithDate';
import CalendarPopup from '@/pages/popup/CalendarPopup';

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
import { useAuth } from '@/context/AuthContext';
import { get } from '@/utils/api';

export default function ConstructionCoMain(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth } = useAuth();
  const [page, setPage] = useState(0);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchNewRequestCount = async () => {
      try {
        const data = await get('/requests', {
          companyId: auth?.userId,
          status: 31
        });
        setNewRequestCount(data.length);
      } catch (error) {
        console.error('Failed to fetch new request count', error);
      }
    };

    if (auth?.userId) {
      fetchNewRequestCount();
    }
  }, [auth?.userId]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.headerWrapper}>
        <View style={{alignItems: 'flex-start', gap: 5}}>
          <Text
            style={{
              paddingLeft: '5%',
              paddingRight: '5%',
              fontSize: responsiveFontSize(2.2),
              fontWeight: 'bold',
            }}>
            반갑습니다
          </Text>
          <Text
            style={{
              paddingLeft: '5%',
              paddingRight: '5%',
              fontSize: responsiveFontSize(2.2),
              fontWeight: 'bold',
            }}>
            {auth?.name} 사장님
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Alarm')}>
          <View style={{paddingRight: '5%', marginBottom: '5%'}}>
            <Image source={require('@assets/images/alarm0.5.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.rootWrapper}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.25,
                width: Dimensions.get('window').width,
              }}>
              <Image
                style={{
                  width: '100%',
                  backgroundColor: '#ff0',
                  height: Dimensions.get('window').height * 0.25,
                }}
                source={require('@assets/images/main/notice0.5.png')}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '7.5%',
              paddingRight: '7.5%',
              paddingTop: Dimensions.get('window').height * 0.03,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#000',
              }}>
              오늘 {newRequestCount}건의 신규고객님이 방문했어요
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '85%',
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('window').height * 0.13,
                flexDirection: 'row',
                gap: 35,
              }}>
              <View style={{alignItems: 'center', gap: 10}}>
                <Text style={{fontSize: responsiveFontSize(1.2)}}>조회수</Text>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <Image
                    source={require('@assets/images/08-company/04-maineye.png')}
                    style={{width: 24.48, height: 17.28}}
                  />
                  <Text>900</Text>
                </View>
              </View>
              <View style={{alignItems: 'center', gap: 10}}>
                <Text style={{fontSize: responsiveFontSize(1.2)}}>
                  찜한 고객
                </Text>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <Image
                    source={require('@assets/images/08-company/06-mainheart.png')}
                    style={{width: 20.736, height: 19.008}}
                  />
                  <Text>+1000</Text>
                </View>
              </View>
              <View style={{alignItems: 'center', gap: 10}}>
                <Text style={{fontSize: responsiveFontSize(1.2)}}>
                  공사건수
                </Text>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <Image
                    source={require('@assets/images/08-company/13-mainperson.png')}
                    style={{width: 22.582, height: 15.488}}
                  />
                  <Text>100 건</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: '7.5%',
              paddingRight: '7.5%',
              paddingBottom: 15,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#000',
              }}>
              오늘의 스케줄
            </Text>
          </View>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    //height: 200,
                    //flex: 1,
                    height: 170,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {height: 190, justifyContent: 'center', alignItems: 'center'}
            }>
            <FlatList
              data={[
                {
                  img: require('@assets/images/main/carousel1.png'),
                  title: '다락철거',
                  time: 'PM 08:00',
                  state: '공사예정',
                },
                {
                  img: require('@assets/images/main/carousel2.png'),
                  title: '미디어인테리어',
                  time: 'PM 13:00',
                  state: '방문예약',
                },
                {
                  img: require('@assets/images/main/carousel1.png'),
                  title: '다락철거',
                  time: 'PM 08:00',
                  state: '공사예정',
                },
                {
                  img: require('@assets/images/main/carousel1.png'),
                  title: '다락철거',
                  time: 'PM 08:00',
                  state: '공사예정',
                },
              ]}
              horizontal
              contentContainerStyle={{paddingHorizontal: 24}}
              onScroll={e => {
                Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                  useNativeDriver: false,
                });
                const newPage = Math.round(e.nativeEvent.contentOffset.x / 205);
                setPage(newPage);
              }}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={Dimensions.get('window').height * 0.22}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('FindService', {isPopupView: false});
                  }}>
                  <View key={item.img} style={styles.mainCardWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: '10%',
                        width: '90%',
                        //backgroundColor: '#ababab',
                      }}>
                      <Image
                        style={{width: 36, height: 36, marginRight: '5%'}}
                        source={require('@/assets/images/08-company/05-maintalk.png')}
                      />
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: responsiveFontSize(1.2),
                              color: '#000',
                            }}>
                            성시경 고객님
                          <Image
                            style={{width: 12, height: 16}}
                            source={require('@/assets/images/08-company/02-copy.png')}
                          />
                          <Image
                            style={{width: 12, height: 16}}
                            source={require('@/assets/images/08-company/02-copy.png')}
                          />
                          </Text>
                          
                        </View>
                        <Text style={{fontSize: responsiveFontSize(1.1), color: '#656565'}}>
                          서울특별시 마포구 마포대로
                        </Text>
                        <Text style={{fontSize: responsiveFontSize(1.1), color: '#656565'}}>
                          20 202호
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '90%',
                          borderRadius: 5,
                          backgroundColor: '#F9F9F9',
                          gap: 10,
                          height: WINDOW_HEIGHT * 0.09,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: responsiveFontSize(1.2)}}>
                          고객님에게 방문예정 시간입니다
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: responsiveFontSize(1.2),
                          }}>
                          2023.05.10 PM 16:00
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
            <View style={{alignItems: 'center'}}>
              <IndicatorWrapper>
                {Array.from({length: 3}, (_, i) => i).map(i => (
                  <Indicator key={`indicator_${i}`} focused={i === page} />
                ))}
              </IndicatorWrapper>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <CalendarPopup /> */}
      {/* <CustomerRentRequestWIthDate /> */}
      {/* <CalendarPopup /> */}
      {/* <AddressSelectPopup /> */}
      {/* <ReqAllStoreAlarmPopup /> */}
      {/* <ReqAllSuccessPopup /> */}
      {/* <TimeSelWarnPopup /> */}
      {/* <CategoryPopup /> */}
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
  headerWrapper: {
    height: WINDOW_HEIGHT * 0.15,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: '5%',
  },
  mainCardWrapper:
    Platform.OS === 'ios'
      ? {
          height: 170,
          width: 200,
          //   marginLeft: 20,
          marginRight: 20,
          shadowColor: '#000',
          backgroundColor: 'white',
          shadowOffset: {
            width: 2,
            height: 5,
          },
          elevation: 10,
          borderRadius: 5,
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          //padding: '3%',
          padding: '3%',
          alignItems: 'center',
          justifyContent: 'center',
        }
      : {
          height: 170,
          width: 200,
          //   marginLeft: 20,
          marginTop:2,
          marginRight: 20,
          shadowColor: '#000',
          backgroundColor: 'white',
          shadowOffset: {
            width: 2,
            height: 10,
          },
          elevation: 7,
          borderRadius: 5,
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          //padding: '3%',
          padding: '3%',
          alignItems: 'center',
          justifyContent: 'center',
        },
});
