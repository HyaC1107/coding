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
import {RootStackParamList} from '../../utils/StackParamList';
import Toggle from '../../components/toggle/CustomToggle';
import MainMenu from '../../components/main/MainMenu';
import CalendarPopup from '../popup/CalendarPopup';
import AddressSelectPopup from '../popup/AddressSelectPopup';
import CategoryPopup from '../popup/CategoryPopup';
import Carousel from '../../components/carousel/Carousel';
import PickService from './PickService';
import {pickData} from './data';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import AddressInputModal from '@/../api/addressInputModal';
import { get, BASE_URL } from '@/utils/api';
import { Alert } from 'react-native';

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

export default function FindService(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();
  const [isOpen, setOpen] = useState(false);
  //   const [isPopupOpen, setPopupClose] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  const fetchCompanies = async (region: string) => {
    try {
      const data = await get('/companies', { region, type: 'constructor' });
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      Alert.alert('오류', '업체 목록을 불러오는데 실패했습니다.');
    }
  };

  const handleSelectAddress = (data:any) => {
    setSelectedAddress(prevState => [...prevState, data.bname]);
    fetchCompanies(data.bname);
    console.log("주소",selectedAddress)
  }; 
  const initializeAddresses = () => {
    const defaultAddresses = [''];
    setSelectedAddress(defaultAddresses);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleCategory = (data: string) => {
    const headerParam = router.params;
    navigation.setParams({...headerParam, headerValue: data});
  };

  const handlePopup = () => {
    const headerParam = router.params;
    navigation.setParams({...headerParam, popupOpen: false});
  };

  useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
    console.log(router);
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={
          Platform.OS === 'android'
            ? {
                width: '100%',
                paddingLeft: '7.5%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                //paddingTop: '3%',
                height: 40,
              }
            : {
                width: '100%',
                paddingLeft: '7.5%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                //backgroundColor: '#ff0',
                //paddingTop: '3%',
                height: 55,
              }
        }>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{flexDirection: 'row', alignItems: 'center'}} >
            <Image
              style={{width: 12, height: 12}}
              source={require('@assets/images/04-findservice/08-add-loc.png')}
            />
            <Text style={{paddingLeft: '2%', fontSize: responsiveFontSize(1.6)}}>
              지역추가
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          {/* <Text
            style={{
              paddingLeft: '5%',
              color: '#828282',
              fontSize: responsiveFontSize(1.5),
            }}>
            용강동
          </Text>
        </View>
        <View>
          <Text
            style={{
              paddingLeft: '5%',
              color: '#828282',
              fontSize: responsiveFontSize(1.5),
            }}>
            도화동
          </Text>
        </View>
        <View>
          <Text
            style={{
              paddingLeft: '5%',
              color: '#828282',
              fontSize: responsiveFontSize(1.5),
            }}>
            도곡동
          </Text> */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedAddress.map((address, index) => (
            <View>
              <Text key={index} style={{
                paddingLeft: '5%',
                color: '#828282',
                fontSize: responsiveFontSize(1.5),
              }}>
                {address}
              </Text>      
            </View>
            ))}
          </View>
          {/* {selectedAddress[1] ===  "" ? (
            <Text style={{display:'none'}}></Text>              
          ):(<Text
            style={{
              paddingLeft: '5%',
              paddingRight: '5%',
              fontSize: responsiveFontSize(1.6),
              textAlign:"center"
            }}>
            {selectedAddress[1]}              
          </Text>)} */}
        </View>
      </View>
      <View
        style={
          Platform.OS === 'ios'
            ? {
                width: '100%',
                paddingLeft: '7.5%',
                flexDirection: 'column',
                // alignItems: 'center',
                backgroundColor: 'white',
                //paddingTop: '5%',
                paddingBottom: '5%',
                marginBottom: '2%',
                // backgroundColor: '#ff0',
              }
            : {
                width: '100%',
                paddingLeft: '7.5%',
                flexDirection: 'column',
                // alignItems: 'center',
                backgroundColor: 'white',
                paddingTop: '1%',
                paddingBottom: '5%',
                marginBottom: '2%',
              }
        }>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen(!isOpen);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                Platform.OS === 'ios'
                  ? {
                      paddingRight: '2%',
                      fontSize: responsiveFontSize(2),
                      letterSpacing: -0.7,
                      fontWeight: '500',
                    }
                  : {
                      paddingRight: '2%',
                      fontSize: responsiveFontSize(2),
                      letterSpacing: -0.7,
                      fontWeight: '600',
                    }
              }>
              찜콕
            </Text>
            {!isOpen && (
              <Image
                style={{width: 11, height: 7}}
                source={require('@assets/images/04-findservice/09-pick-down.png')}
              />
            )}
            {isOpen && (
              <Image
                style={{width: 11, height: 7}}
                source={require('@assets/images/04-findservice/10-pick-up.png')}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        {isOpen && (
          <View style={{paddingTop: '4%'}}>
            <FlatList
              data={[
                {
                  img: require('@/assets/images/pick/1.png'),
                  title: '하늘인테리어',
                  time: 'PM 08:00',
                  state: '공사예정',
                  tags: ['보증보험가능', '자격증보유', '1년 A/S'],
                },
                {
                  img: require('@/assets/images/pick/2.png'),
                  title: '디자인인테리어',
                  time: 'PM 13:00',
                  state: '방문예약',
                  tags: ['보증보험가능', '자격증보유', '1년 A/S'],
                },
                {
                  img: require('@/assets/images/pick/3.png'),
                  title: '하늘인테리어',
                  time: 'PM 08:00',
                  state: '공사예정',
                  tags: ['보증보험가능', '1년 A/S'],
                },
              ]}
              horizontal
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ServiceIntro', {isPopupView: true})
                  }>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#E6E6E6',
                      width: 200,
                      height: 240,
                      borderRadius: 10,
                      marginRight: 10,
                      borderTopWidth:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '75%',
                        borderBottomColor: '#E6E6E6',
                        borderBottomWidth: 1,
                        position: 'relative',
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                        source={item.img}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: '25%',
                        //alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '2%',
                        paddingLeft: '5%',
                        gap: 3,
                      }}>
                      <Text
                        style={
                          Platform.OS === 'android'
                            ? {
                                color: '#000',
                                fontSize: responsiveFontSize(1.8),
                                letterSpacing: -0.7,
                                fontWeight: '600',
                              }
                            : {
                                color: '#000',
                                fontSize: responsiveFontSize(1.8),
                                letterSpacing: -0.7,
                                fontWeight: '500',
                              }
                        }>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        {item.tags.map((el, i) => {
                          return (
                            <Text
                              key={i}
                              style={{
                                color: '#656565',
                                paddingTop: '1%',
                                paddingBottom: '3%',
                                paddingRight: '3%',
                                fontSize: responsiveFontSize(1.5),
                                letterSpacing: -1,
                              }}>
                              {el}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}></FlatList>
          </View>
        )}
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={
            Platform.OS === 'ios'
              ? {
                  backgroundColor: 'white',
                  paddingTop: '5%',
                  paddingBottom: '2%',
                  paddingLeft: '7.5%',
                }
              : {
                  backgroundColor: 'white',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                  paddingLeft: '7.5%',
                }
          }>
          <Text
            style={
              Platform.OS === 'ios'
                ? {
                    fontSize: responsiveFontSize(2),
                    fontWeight: '500',
                    letterSpacing: -0.7,
                  }
                : {
                    fontSize: responsiveFontSize(2),
                    fontWeight: '600',
                    letterSpacing: -0.7,
                  }
            }>
            업체찾기
          </Text>
        </View>
        {(companies.length > 0 ? companies : pickData).map((el, i) => {
          const isApiData = companies.length > 0;
          const displayData = isApiData ? {
            nm: el.companyName,
            imgUrl: el.profileImg ? { uri: `${BASE_URL}/${el.profileImg.replace(/\\/g, '/')}` } : require('@/assets/images/04-findservice/01-findservice-car.png'),
            tags: el.categories || [],
            thumnailList: el.profileImg ? [{ uri: `${BASE_URL}/${el.profileImg.replace(/\\/g, '/')}` }] : [require('@/assets/images/04-findservice/02-findservice-thum.png')],
            userId: el.userId
          } : el;

          return (
            <TouchableWithoutFeedback
                  key={isApiData ? el._id : i}
                  onPress={() =>
                    navigation.navigate('ServiceIntro', {isPopupView: true, companyId: displayData.userId})
                  }>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1%',
              }}>
              <View
                style={
                  Platform.OS === 'ios'
                    ? {
                        width: '85%',
                        height: WINDOW_HEIGHT * 0.45,
                        maxHeight: 280,
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 2,
                          height: 5,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        backgroundColor: 'white',
                        elevation: 10,
                        alignItems: 'center',
                        // backgroundColor: '#ff0',
                      }
                    : {
                        width: '85%',
                        height: 280,
                        maxHeight: 280,
                        borderRadius: 5,
                        marginBottom: '7%',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 2,
                          height: 10,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        backgroundColor: 'white',
                        elevation: 10,
                        alignItems: 'center',
                        // backgroundColor: '#ff0',
                      }
                }>
                <View
                  style={{
                    width: '100%',
                    // height: '30%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: '2%',
                    paddingTop: '2%',
                  }}>
                  <View style={{padding: '5%'}}>
                    <Image 
                      source={typeof displayData.imgUrl === 'number' ? displayData.imgUrl : {uri: displayData.imgUrl.uri}} 
                      style={isApiData ? {width: 60, height: 60, borderRadius: 30} : {}}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontWeight: 'bold',
                        // paddingBottom: '5%',
                        letterSpacing: -0.7,
                      }}>
                      {displayData.nm}
                    </Text>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      {displayData.tags.map((tag: string, idx: number) => {
                        return (
                          <Text
                            key={idx}
                            style={{
                              fontSize: responsiveFontSize(1.6),
                              color: '#656565',
                              letterSpacing: -0.7,
                            }}>
                            {tag}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '45%',
                    borderBottomColor: '#E9EDEF',
                    borderBottomWidth: 1,
                  }}>
                  <Carousel imgList={displayData.thumnailList} />
                </View>
                <View
                  style={
                    Platform.OS === 'android' ?{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '18%',
                    }:{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '14%',
                    }}
                  >
                  <View
                    style={{
                      width: WINDOW_WIDTH * 0.4,
                      justifyContent: 'space-between',
                      alignItems: 'center',

                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 15,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 16.38, height: 14.85}}
                        source={require('@/assets/images/04-findservice/07-service-heart.png')}
                      />
                      <Text>+100</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 15,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 18.9, height: 14.85}}
                        source={require('@/assets/images/04-findservice/06-people-green.png')}
                      />
                      <Text>30건</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
      {router.params.popupOpen && (
        <CategoryPopup
          handleCategory={handleCategory}
          handlePopup={handlePopup}
        />
      )}
      <AddressInputModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSelectAddress={handleSelectAddress}
      />
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
