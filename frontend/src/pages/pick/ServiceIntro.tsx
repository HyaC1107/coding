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
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomTextInput from '@/components/textinput/TextInput';
import PssWdTextInput from '@/components/textinput/PsswdTextInput';
import styled, {css} from 'styled-components/native';

import {
  RouteProp,
  StackNavigationState,
  TypedNavigator,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '@/utils/StackParamList';
import Toggle from '@/components/toggle/CustomToggle';
import MainMenu from '@/components/main/MainMenu';
import CalendarPopup from '../popup/CalendarPopup';
import AddressSelectPopup from '../popup/AddressSelectPopup';
import Review from './Review';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ConstructionRequestCalendarPopup from '@/components/popup/ConstructionRequestCalendarPopup';
import CustomerRentRequestWithDate from '../popup/CustomerRentRequestWithDate';
import ReqAllSuccessPopup from '../popup/warn/ReqAllSuccessPopup';
interface LoginProp {
  navigate: any;
}

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  posigion: absolute;
  bottom: 30;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '30px' : '6px')};
  height: 6px;
  border-radius: 3px;
`;
export const ServiceInfo = () => {
  return (
    <View style={{flexDirection: 'row', padding: '5%', alignItems: 'center'}}>
      <View style={{height: 150}}>
        <View style={styles.companyInfoRowWrapper}>
          <View style={styles.companyInfoRowCategoryWrapper}>
            <Text style={styles.companyInfoFont}>주소</Text>
          </View>
          <View style={styles.companyInfoRowFieldWrapper}>
            <Text style={styles.companyInfoFont}>서울특별시 마포구 염리동</Text>
          </View>
        </View>
        <View style={styles.companyInfoRowWrapper}>
          <View style={styles.companyInfoRowCategoryWrapper}>
            <Text style={styles.companyInfoFont}>사업자번호</Text>
          </View>
          <View style={styles.companyInfoRowFieldWrapper}>
            <Text style={styles.companyInfoFont}>000-00-0000</Text>
          </View>
        </View>
        <View style={styles.companyInfoRowWrapper}>
          <View style={styles.companyInfoRowCategoryWrapper}>
            <Text style={styles.companyInfoFont}>A/S기간</Text>
          </View>
          <View style={styles.companyInfoRowCategoryWrapper}>
            <Text style={styles.companyInfoFont}>1년</Text>
          </View>
        </View>
        <View style={styles.companyInfoRowWrapper}>
          <View style={styles.companyInfoRowCategoryWrapper}>
            <Text style={styles.companyInfoFont}>인증업체</Text>
          </View>
          <View style={styles.companyInfoRowFieldWrapper}>
            <Text style={styles.companyInfoFont}>
              실내건축면허,전기자격증,도배자격증
            </Text>
          </View>
        </View>
        <View style={styles.companyInfoRowWrapper}>
          <View style={styles.companyInfoRowCategoryWrapper}>
            <Text style={styles.companyInfoFont}>보증가능여부</Text>
          </View>
          <View style={styles.companyInfoRowFieldWrapper}>
            <Text style={styles.companyInfoFont}>선급금보증,하자보수보증</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export const MainService = () => {
  return (
    <View
      style={
        Platform.OS === 'android'
          ? {
              flexDirection: 'row',
              //padding: '5%',
              paddingLeft: '5%',
              paddingTop: '5%',
              paddingRight: '10%',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '85%',
            }
          : {
              flexDirection: 'row',
              paddingLeft: '5%',
              paddingTop: '5%',
              paddingRight: '10%',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '82%',
            }
      }>
      <View style={{height: 150}}>
        <Text style={styles.companyInfoFont}>카페 인테리어</Text>
        <Text style={styles.companyInfoFont}>집인테리어</Text>
        <Text style={styles.companyInfoFont}>단독주택 인테리어</Text>
        <Text style={styles.companyInfoFont}>카페 인테리어</Text>
        <Text style={styles.companyInfoFont}>집인테리어</Text>
      </View>
      <View style={{paddingLeft: '10%', height: 150}}>
        <Text style={styles.companyInfoFont}>음식점 인테리어</Text>
        <Text style={styles.companyInfoFont}>사무실인테리어</Text>
        <Text style={styles.companyInfoFont}>음식점 인테리어</Text>
        <Text style={styles.companyInfoFont}>사무실인테리어</Text>
        <Text style={styles.companyInfoFont}>단독주택 인테리어</Text>
      </View>
    </View>
  );
};
export const Portfolio = () => {
  return (
    <View style={{width: '90%', padding: '10%', alignItems: 'center'}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('@/assets/images/homepage.png')} />
          <Text
            style={{
              paddingTop: '2%',
              fontSize: responsiveFontSize(1.6),
              letterSpacing: -0.7,
            }}>
            홈페이지
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('@/assets/images/sns.png')} />
          <Text
            style={{
              paddingTop: '2%',
              fontSize: responsiveFontSize(1.6),
              letterSpacing: -0.7,
            }}>
            SNS
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('@/assets/images/youtube.png')} />
          <Text
            style={{
              paddingTop: '2%',
              fontSize: responsiveFontSize(1.6),
              letterSpacing: -0.7,
            }}>
            유튜브
          </Text>
        </View>
      </View>
    </View>
  );
};
interface ServiceIntroProps {
  isPopupView?: boolean;
}
export default function ServiceIntro(data: ServiceIntroProps): JSX.Element {
  const {isPopupView} = data;
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(0);
  const [item, setItem] = useState(1);
  const route = useRoute<any>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [calendarPopup, setCalendarPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Function to close the success popup
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };
  
  // Function to open the success popup
  const openSuccessPopup = () => {
    setShowSuccessPopup(true);
  };

  const closePopup = () => {
    setCalendarPopup(false); // Closes the popup

  };

  useEffect(() => {
    console.log(route.params);
  }, []);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.rootWrapper}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={['test', 'test', 'test']}
              horizontal
              style={{width: '100%'}}
              renderItem={({item}) => (
                <View
                  style={{
                    height: 185,
                    width: Dimensions.get('window').width,
                  }}>
                  <Image
                    style={{width: '100%', backgroundColor: '#ff0'}}
                    source={require('@/assets/images/interior.png')}
                  />
                </View>
              )}
              onScroll={e => {
                Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                  useNativeDriver: false,
                });
                const newPage = Math.round(
                  e.nativeEvent.contentOffset.x /
                    Dimensions.get('window').width,
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
          <View></View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '7.5%',
              marginRight: '7.5%',
              paddingTop: '2%',
              paddingBottom: '2%',
              borderBottomWidth: 2,
              borderColor: '#F6F6F6',
            }}>
            <Image source={require('@/assets/images/thum0.5.png')} />
            <View
              style={{
                padding: '5%',
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(2.6),
                  }}>
                  한마음 인테리어
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: '5%',
                  gap: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: '5%',
                    gap: 5,
                  }}>
                  <Image
                    style={{width: 14, height: 10}}
                    source={require('@/assets/images/04-findservice/03-detail-eye.png')}
                  />
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? {
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '500',
                            letterSpacing: -0.7,
                          }
                        : {
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '600',
                            letterSpacing: -0.7,
                          }
                    }>
                    2896
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: '5%',
                    gap: 5,
                  }}>
                  <Image
                    style={{width: 12.125, height: 11}}
                    source={require('@/assets/images/04-findservice/04-detail-heart.png')}
                  />
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? {
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '500',
                            letterSpacing: -0.7,
                          }
                        : {
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '600',
                            letterSpacing: -0.7,
                          }
                    }>
                    +100
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: '5%',
                    gap: 5,
                  }}>
                  <Image
                    style={{width: 14, height: 9}}
                    source={require('@/assets/images/04-findservice/05-detail-people.png')}
                  />
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? {
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '500',
                            letterSpacing: -0.7,
                          }
                        : {
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '600',
                            letterSpacing: -0.7,
                          }
                    }>
                    100건
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              justifyContent: 'flex-start',
              paddingLeft: '7.5%',
              paddingRight: '7.5%',
              // height: 80,
            }}>
            <Text
              style={
                Platform.OS === 'ios'
                  ? {
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      paddingTop: '5%',
                      paddingBottom: '5%',
                      letterSpacing: -1,
                      fontWeight: '500',
                    }
                  : {
                      fontSize: responsiveFontSize(1.8),
                      color: '#000',
                      paddingTop: '5%',
                      paddingBottom: '5%',
                      letterSpacing: -1,
                      fontWeight: '600',
                    }
              }>
              업체 한마디
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.6),
                color: '#000',
                paddingBottom: '5%',
                letterSpacing: -0.7,
                lineHeight: 20,
              }}>
              {' '}
              다나함 어소시에이트는 단순히 공간을 만드는 것이 아니라 브랜드를
              만들어가는 관점으로 공간 안의 모든 요소가 고객의 아이덴티티와
              연결되도록 세심하게 디자인합니다. 이 과정에서 고객의 요청에 따라
              브랜드 디자인부터 컨설팅, 건축, 조경, 운영에 이르 기까지 확장
              영역에서 다양 한 업무를 수행하고 있습니다.이를 통해 보다 전체적인
              시각으로 고객의 필요를 읽고 적합한 솔루션을 제공합니다.
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setItem(1);
              }}>
              <View
                style={
                  item === 1
                    ? {
                        width: '25%',
                        borderBottomWidth: 2,
                        borderColor: '#2CB07B',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                    : {
                        width: '25%',
                        borderBottomWidth: 2,
                        borderColor: '#f6f6f6',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 1
                      ? Platform.OS === 'ios'
                        ? {
                            color: '#000',
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: '500',
                            letterSpacing: -0.7,
                          }
                        : {
                            color: '#000',
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: '600',
                            letterSpacing: -0.7,
                          }
                      : Platform.OS === 'ios'
                      ? {
                          color: '#B4B4B4',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '500',
                          letterSpacing: -0.7,
                        }
                      : {
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                  }>
                  업체정보
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setItem(2);
              }}>
              <View
                style={
                  item === 2
                    ? {
                        width: '25%',
                        borderBottomWidth: 2,
                        borderColor: '#2CB07B',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                    : {
                        width: '25%',
                        borderBottomWidth: 2,
                        borderColor: '#f6f6f6',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 2
                      ? {
                          color: '#000',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                      : {
                          color: '#B4B4B4',
                          borderColor: '#f6f6f6',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                  }>
                  주업무
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setItem(3);
              }}>
              <View
                style={
                  item === 3
                    ? {
                        width: '30%',
                        borderBottomWidth: 2,
                        borderColor: '#2CB07B',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                    : {
                        width: '30%',
                        borderBottomWidth: 2,
                        borderColor: '#f6f6f6',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 3
                      ? {
                          color: '#000',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                      : {
                          color: '#B4B4B4',
                          borderColor: '#f6f6f6',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                  }>
                  포트폴리오
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setItem(4);
              }}>
              <View
                style={
                  item === 4
                    ? {
                        width: '20%',
                        borderBottomWidth: 2,
                        borderColor: '#2CB07B',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                    : {
                        width: '20%',
                        borderBottomWidth: 2,
                        borderColor: '#f6f6f6',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 4
                      ? {
                          color: '#000',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                      : {
                          color: '#B4B4B4',
                          borderColor: '#f6f6f6',
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '600',
                          letterSpacing: -0.7,
                        }
                  }>
                  리뷰
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            {item === 1 && <ServiceInfo />}
            {item === 2 && <MainService />}
            {item === 3 && <Portfolio />}
            {item === 4 && <Review />}
          </View>
        </View>
      </ScrollView>
      {route.params?.isPopupView && (
        <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                width: '15%',
                borderTopColor: '#E6E6E6',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: 'white',
                borderTopWidth: 1,
              }}>
              <Image source={require('@/assets/images/heart-outline.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setCalendarPopup(true);
            }}>
            <View
              style={{
                width: '85%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#2CB07B',
              }}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
                방문요청하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      {isPopupView && (
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('SetServiceTime')}>
          <View
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
            }}>
            <View
              style={{
                width: '90%',
                height: '100%',
                backgroundColor: '#2CB07B',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 16}}>선택</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )}
      {calendarPopup && (
        <CalendarPopup 
          closePopup={() => setCalendarPopup(false)} 
          openSuccessPopup={openSuccessPopup} // Pass the function to show success popup
        />
      )}
      {showSuccessPopup && <ReqAllSuccessPopup closeSuccessPopup={closeSuccessPopup} />}
      {/* <AddressSelectPopup /> */}
      {/* <CustomerRentRequestWithDate /> */}
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
  companyInfoRowWrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // justifyContent: 'space-between',
  },
  companyInfoRowCategoryWrapper: {
    width: '40%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  companyInfoRowFieldWrapper: {
    width: '60%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // backgroundColor: '#ff0',
  },
  companyInfoFont:
    Platform.OS === 'ios'
      ? {
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: responsiveFontSize(1.4),
          letterSpacing: -0.7,
          fontWeight: '500',
        }
      : {
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: responsiveFontSize(1.4),
          letterSpacing: -0.7,
          fontWeight: '500',
        },
});
