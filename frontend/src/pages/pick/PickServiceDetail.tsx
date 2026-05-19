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
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
import CategoryPopup from '../popup/CategoryPopup';
import Carousel from '@/components/carousel/Carousel';
import PickService from './PickService';
import CategorySelWarnPopup from '../popup/warn/CategorySelWarnPopup';
import IntroServicePopup from './IntroServicePopup';
import {WINDOW_HEIGHT} from '@/constants/context';
import {pickData as initialData } from './data';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { get, BASE_URL } from '@/utils/api';
import { Alert } from 'react-native';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0px;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;

export default function PickServiceDetail(): JSX.Element {
  const navigation = useNavigation<any>();
  const [isPopupOpen, setPopupClose] = useState(true);
  const router = useRoute<any>();
  const [showPopup, setPopup] = useState(false);
  const [pickData, setPickData] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const fetchCompanies = async (categories: string[], region: string) => {
    try {
      const data = await get('/companies', { 
        category: categories.join(','), 
        region, 
        type: 'constructor' 
      });
      setPickData(data.map((c: any) => ({
        ...c,
        isCheck: false,
        nm: c.companyName,
        imgUrl: c.profileImg ? { uri: `${BASE_URL}/${c.profileImg.replace(/\\/g, '/')}` } : require('@/assets/images/pick/1.png'),
        tags: c.categories || [],
        thumnailList: c.profileImg ? [{ uri: `${BASE_URL}/${c.profileImg.replace(/\\/g, '/')}` }] : [require('@/assets/images/04-findservice/02-findservice-thum.png')],
      })));
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      Alert.alert('오류', '업체 목록을 불러오는데 실패했습니다.');
    }
  };

  const handleListPopup = (categories?: string[]) => {
    if (categories && categories.length > 0) {
      setSelectedCategories(categories);
      const region = router.params?.region || '서울';
      fetchCompanies(categories, region);
    }
    setPopupClose(!isPopupOpen);
  };
  const handleServiceIntroPopup = () => {
    setPopup(false);
  };
  useEffect(() => {
    if (!isPopupOpen) {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        headerShown: true,
      });
    }
  }, [isPopupOpen]);
  const handleCheckToggle = (index: number) => {
    const updatedData = [...pickData];
    const checkedCount = updatedData.filter(item => item.isCheck).length;
    
    if (!updatedData[index].isCheck && checkedCount >= 3) {
      Alert.alert('알림', '최대 3개 업체까지 선택 가능합니다.');
      return;
    }

    updatedData[index].isCheck = !updatedData[index].isCheck;
    setPickData(updatedData);
  };

  const toggleCheck = (index: any) => {
    handleCheckToggle(index);
  };
  
  const handleCategory = (data: string) => {
    const headerParam = router.params;
    navigation.setParams({...headerParam, headerValue: data});
  };

  const handlePopup = () => {
    const headerParam = router.params;
    navigation.setParams({...headerParam, popupOpen: false});
  };

  const [scrolledItem, setItem] = useState(0);
  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        contentContainerStyle={
          Platform.OS === 'ios'
            ? {
                paddingBottom: '30%',
              }
            : {
                paddingBottom: '10%',
              }
        }>
        <View
          style={
            Platform.OS === 'ios'
              ? {
                  backgroundColor: 'white',
                  padding: '5%',
                  alignItems: 'center',
                  paddingTop: '10%',
                }
              : {
                  backgroundColor: 'white',
                  padding: '5%',
                  alignItems: 'center',
                  paddingTop: '5%',
                }
          }>
          <Text
            style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
            최대 3개 업체까지 선택 가능합니다
          </Text>
        </View>
        {pickData.map((el, i) => {
          return (
            <View
              key={el._id || i}
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '7%',
                height: 250,
                // backgroundColor: '#faf',
              }}>
              <TouchableWithoutFeedback onPress={() => toggleCheck(i)}>
              <View
                style={
                  Platform.OS === 'ios'
                    ? {
                        width: '85%',
                        height: '100%',
                        borderRadius: 3,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 2,
                          height: 5,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        backgroundColor: 'white',
                        elevation: 10,
                        gap: 15,
                        justifyContent: 'center',
                      }
                    : {
                        width: '85%',
                        height: '100%',
                        borderRadius: 3,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 2,
                          height: 10,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        backgroundColor: 'white',
                        elevation: 10,
                        gap: 15,
                        justifyContent: 'center',
                      }
                }>
                {el.isCheck && (
                  <View
                    style={{
                      borderRadius: 3,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      zIndex: 1,
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('@/assets/images/check-circle0.5.png')}
                    />
                  </View>
                  
                )}
                <View
                  style={{
                    width: '100%',
                    // height: '30%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: '#ff0',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '90%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 20,
                    }}>
                    <View style={{}}>
                      <Image 
                        source={typeof el.imgUrl === 'number' ? el.imgUrl : {uri: el.imgUrl.uri}} 
                        style={{width: 50, height: 50, borderRadius: 25}}
                      />
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setPopup(true);
                      }}>
                      <View
                        style={{
                          //   paddingTop: '5%',
                          justifyContent: 'center',

                          gap: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            fontWeight: 'bold',
                            letterSpacing: -0.7,
                          }}>
                          {el.nm}
                        </Text>
                        <View style={{flexDirection: 'row', gap: 10}}>
                          {el.tags.map((tag: any, i: number) => {
                            return (
                              <Text
                                key={i}
                                style={{
                                  fontSize: responsiveFontSize(1.6),
                                  letterSpacing: -0.7,
                                  paddingRight: '2%',
                                  color: '#656565',
                                }}>
                                {tag}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View
                  style={{
                    height: '50%',
                    paddingLeft: '5%',
                  }}>
                  <View style={{flex: 1}}>
                    <View style={styles.rootWrapper}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <FlatList
                          data={el.thumnailList}
                          horizontal
                          style={{width: '100%', height: 200}}
                          renderItem={({item}) => (
                            <View
                              key={item.index}
                              style={{
                                height: 200,
                                width: 150,
                                marginRight: 10,
                              }}>
                              <Image
                                style={{
                                  width: '100%',
                                  backgroundColor: '#ff0',
                                  borderRadius: 3,
                                  height: '100%'
                                }}
                                source={typeof item === 'number' ? item : {uri: item.uri}}
                              />
                            </View>
                          )}
                          onScroll={e => {
                            console.log();
                            Animated.event(
                              [{nativeEvent: {contentOffset: {x: scrollX}}}],
                              {
                                useNativeDriver: false,
                              },
                            );
                            const newPage = Math.round(
                              e.nativeEvent.contentOffset.x / 205,
                            );
                            setPage(newPage);
                            setItem(i);
                          }}
                          showsHorizontalScrollIndicator={false}
                          pagingEnabled
                        />
                        <IndicatorWrapper key={i}>
                          {Array.from({length: 3}, (_, idx) => idx).map(idx => (
                            <Indicator
                              key={`indicator_${idx}`}
                              focused={idx === page && scrolledItem === i}
                            />
                          ))}
                        </IndicatorWrapper>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
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
            }}>
            주의사항 안내문
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() =>{ 
            const selectedCompanies = pickData.filter(item => item.isCheck);
            if (selectedCompanies.length === 0) {
              Alert.alert('알림', '최소 1개 이상의 업체를 선택해주세요.');
              return;
            }
            navigation.setOptions({tabbarStyle: {display: 'flex'}})
            navigation.navigate('SetServiceTime', {
              ...router.params,
              selectedCompanies,
              selectedCategories,
            });
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
            <Text
              style={{
                fontWeight: '600',
                color: '#2CB07B',
                paddingRight: '5%',
                fontSize: responsiveFontSize(2),
              }}>
              다음
            </Text>
            <Image source={require('@/assets/images/next.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {showPopup && 
      <IntroServicePopup handlePopup={handleServiceIntroPopup} handleCheckToggle={handleCheckToggle} />}
      {router.params.popupOpen && (
        <CategoryPopup
          handleCategory={handleCategory}
          handlePopup={handlePopup}
        />
      )}
      <PickService
        handlePopup={handleListPopup}
        isPopupOpen={isPopupOpen}
        navigation={navigation}
      />
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
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: '5%',
  },
});
