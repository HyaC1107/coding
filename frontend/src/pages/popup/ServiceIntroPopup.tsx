import React, {useEffect, useRef, useState} from 'react';
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
  TouchableNativeFeedback,
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
import CalendarPopup from './CalendarPopup';
import AddressSelectPopup from './AddressSelectPopup';
import Review from '../pick/Review';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
import {MainService, Portfolio, ServiceInfo} from '../pick/ServiceIntro';

interface LoginProp {
  navigate: any;
}

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 20px;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;
// const ServiceInfo = () => {
//   return (
//     <View style={{flexDirection: 'row', padding: '5%', alignItems: 'center'}}>
//       <View style={{height: 150}}>
//         <Text style={{paddingTop: 5, paddingBottom: 10}}>주소</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 9}}>사업자번호</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>A/S기간</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 7}}>인증업체</Text>
//         <Text style={{paddingTop: 5}}>보증가능여부</Text>
//       </View>
//       <View style={{paddingLeft: '10%', height: 150}}>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>
//           서울특별시 마포구 염리동
//         </Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>000-00-0000</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>1년</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>
//           실내건축면허,전기자격증,도배자격증
//         </Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>
//           선급금보증,하자보수보증
//         </Text>
//       </View>
//     </View>
//   );
// };
// const MainService = () => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         padding: '5%',
//         paddingRight: '10%',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '90%',
//       }}>
//       <View style={{height: 150}}>
//         <Text style={{paddingTop: 5, paddingBottom: 10}}>카페 인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 9}}>집인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>단독주택 인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 7}}>카페 인테리어</Text>
//         <Text style={{paddingTop: 5}}>집인테리어</Text>
//       </View>
//       <View style={{paddingLeft: '10%', height: 150}}>
//         <Text style={{paddingTop: 5, paddingBottom: 10}}>음식점 인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 9}}>사무실인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>음식점 인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 7}}>사무실인테리어</Text>
//         <Text style={{paddingTop: 5, paddingBottom: 5}}>단독주택 인테리어</Text>
//       </View>
//     </View>
//   );
// };
// const Portfolio = () => {
//   return (
//     <View style={{width: '90%', padding: '10%', alignItems: 'center'}}>
//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           alignItems: 'flex-start',
//           justifyContent: 'space-between',
//         }}>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <Image source={require('../../assets/images/homepage.png')} />
//           <Text style={{paddingTop: '2%'}}>홈페이지</Text>
//         </View>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <Image source={require('../../assets/images/sns.png')} />
//           <Text style={{paddingTop: '2%'}}>SNS</Text>
//         </View>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <Image source={require('../../assets/images/youtube.png')} />
//           <Text style={{paddingTop: '2%'}}>유튜브</Text>
//         </View>
//       </View>
//     </View>
//   );
// };
interface ServiceIntroProps {
  isPopupView?: boolean;
  handlePopup: () => void;
  handleSelect: (index: number) => void;
}
export default function ServiceIntroPopup({
  isPopupView,
  handlePopup,
  handleSelect, // Destructure the `handleSelect` prop
}: ServiceIntroProps): JSX.Element {
  // const {isPopupView, handlePopup} = data;
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(0);
  const [item, setItem] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const route = useRoute();
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    console.log(route.params);
  }, []);

  const handleItemSelect = () => {
    setIsChecked(true); // Local check state
    handleSelect(page);  // Pass index (page) to parent component to update `isChecked`
    handlePopup(); // Close the popup
  };

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
              borderBottomWidth: 1,
              borderColor: '#F6F6F6',
            }}>
            <Image
              source={require('@/assets/images/thum0.5.png')}
              style={{borderRadius: 3}}
            />
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
                    fontSize: responsiveFontSize(2.4),
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
                    gap: 6,
                  }}>
                  <Image source={require('@/assets/images/eye.png')} />
                  <Text style={{fontSize: responsiveFontSize(1.5)}}>2896</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: '5%',
                    gap: 6,
                  }}>
                  <Image source={require('@/assets/images/heart.png')} />
                  <Text style={{fontSize: responsiveFontSize(1.5)}}>+100</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: '5%',
                    gap: 6,
                  }}>
                  <Image source={require('@/assets/images/peoples-grey.png')} />
                  <Text style={{fontSize: responsiveFontSize(1.5)}}>100건</Text>
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
              style={{
                fontSize: responsiveFontSize(1.6),
                color: '#000',
                paddingTop: '5%',
                paddingBottom: '3%',
              }}>
              업체 한마디
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.6),
                color: '#000',
                paddingBottom: '5%',
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
            height: WINDOW_HEIGHT * 0.015,
            backgroundColor: '#F6F6F6',
          }}></View>
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
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                    : {
                        width: '25%',
                        borderBottomWidth: 1,
                        borderColor: '#B4B4B4',
                        alignItems: 'center',
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 1
                      ? {color: '#000', fontSize: 13}
                      : {color: '#B4B4B4', fontSize: 13}
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
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                    : {
                        width: '25%',
                        borderBottomWidth: 1,
                        borderColor: '#B4B4B4',
                        alignItems: 'center',
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 2
                      ? {color: '#000', fontSize: 13}
                      : {color: '#B4B4B4', fontSize: 13}
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
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                    : {
                        width: '30%',
                        borderBottomWidth: 1,
                        borderColor: '#B4B4B4',
                        alignItems: 'center',
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                }>
                <Text
                  style={
                    item === 3
                      ? {color: '#000', fontSize: 13}
                      : {color: '#B4B4B4', fontSize: 13}
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
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                    : {
                        width: '20%',
                        borderBottomWidth: 1,
                        borderColor: '#B4B4B4',
                        alignItems: 'center',
                        padding: '5%',
                        backgroundColor: 'white',
                      }
                }>
                <Text style={item === 4 ? {color: '#000'} : {color: '#B4B4B4'}}>
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
      {!isPopupView && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
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
          </View>
        </TouchableWithoutFeedback>
      )}
      {isPopupView && (
        <TouchableNativeFeedback onPress={() => handleItemSelect()}>
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
});
