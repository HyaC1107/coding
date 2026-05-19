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
  Switch,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomTextInput from '@components/textinput/TextInput';
import PssWdTextInput from '@components/textinput/PsswdTextInput';
import styled, {css} from 'styled-components/native';
import {
  RouteProp,
  StackNavigationState,
  TypedNavigator,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Toggle from '@/components/toggle/CustomToggle';
import MainMenu from '@components/main/MainMenu';
import {data, storeData} from './data';
import AddressSelectPopup from '@/pages/popup/AddressSelectPopup';
import {WINDOW_HEIGHT} from '@/constants/context';
import CalendarPopup from '@/pages/popup/CalendarPopup';
import SelectConstructionLocPopup from '@/components/popup/SelectConstructionLocPopup';
import CalendarWithTimePickerPopup from '@/pages/popup/CalendarWithTimePickerPopup';
import CustomerAddrPopup from '@/components/popup/CustomerAddrPopup';
import SelectCarTypePopup from '@/components/popup/SelectCarTypePopup';
import SelectToolPopup from '@/components/popup/SelectToolPopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ConstructionTimeSetPopup from '@/components/popup/ConstructionTimeSetPopup';
import CalendarWithSingleDatepicerPopup from '@/pages/popup/CalendarWithSingleDatepicerPopup';
import HomeDecoPopup from '@/pages/popup/HomeDecoPopup';
import QnaPopup from '@/components/popup/QnaPopup';
import SetPricePopup from '@/components/popup/SetPricePopup';
import SingleRowAlert from '@/components/alert/SingleRowAlert';
import AddressInputModal from '@/../api/addressInputModal';
import ReqAllStoreAlarmPopup from '@/pages/popup/warn/ReqAllStoreAlarmPopup';
import TimeSelWarnPopup from '@/pages/popup/warn/TimeSelWarnPopup';
import ReqAllSuccessPopup from '@/pages/popup/warn/ReqAllSuccessPopup';
import { useAuth } from '@/context/AuthContext';

interface LoginProp {
  navigate: any;
}

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#B4B4B4' : '#B4B4B4')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;
export default function Main(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth } = useAuth();
  const [isOn, setToggle] = useState(false);
  const [type, setType] = useState(1);
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [showPopup, setPopup] = useState(false);
  const [address, setAddress] = useState('서울특별시 마포구 도화동 11-1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(["주소를 입력해주세요",""]);
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelectAddress = ([address, detail]:[string,string]) => {
    setSelectedAddress([address,detail]);
    console.log("주소",selectedAddress)
  }; 
  const handleAdress = (data: string) => {
    setAddress(data);
  };
  const handlePopup = () => {
    setPopup(false);
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.locationWrapper}>
        <View style={{ position: 'absolute', left: '7.5%', bottom: '5%' }}>
          <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold' }}>
            {auth?.name}님, 반갑습니다!
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={toggleModal}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 12, height: 18}}
              source={require('@assets/images/03-main-icon/02-upperloc.png')}
            />  
            <View>
              <Text
                style={{
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  fontSize: responsiveFontSize(1.6),
                }}>
                {selectedAddress[0]}              
              </Text>              
              {selectedAddress[1] ===  "" ? (
                <Text style={{display:'none'}}></Text>              
              ):(<Text
                style={{
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  fontSize: responsiveFontSize(1.6),
                  textAlign:"center"
                }}>
                {selectedAddress[1]}              
              </Text>)}
            </View>         
            <Image
              style={{width: 8, height: 5}}
              source={require('@assets/images/03-main-icon/03-upperpopup.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Alarm')}>
          <View
            style={{right: '7.5%', position: 'absolute', marginBottom: '5%'}}>
            <Image source={require('@assets/images/alarm0.5.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.rootWrapper}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={['test', 'test', 'test']}
              horizontal
              contentContainerStyle={{alignItems: 'center'}}
              style={{width: '100%'}}
              renderItem={({item}) => (
                <View
                  style={{
                    height: 185,
                    width: Dimensions.get('window').width,
                  }}>
                  <Image
                    style={{width: '100%'}}
                    source={require('@assets/images/main/notice0.5.png')}
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
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '8%',
              paddingRight: '8%',
              paddingTop: '2%',
              paddingBottom: 16,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#000',
                letterSpacing: -0.7,
              }}>
              업체찾기
            </Text>
            <Toggle isOn={isOn} onToggle={() => setToggle(!isOn)} />
          </View>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    alignItems: 'center',
                    paddingLeft: '7.5%',
                    paddingRight: '7.5%',
                  }
                : {
                    alignItems: 'center',
                    paddingLeft: '7.5%',
                    paddingRight: '7.5%',
                  }
            }>
            <MainMenu data={isOn ? storeData : data} fullpage={false} />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: '8%',
              paddingRight: '8%',
              paddingTop: '2%',
              //height: 80,
              paddingBottom: '1%',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#000',
                letterSpacing: -1,
              }}>
              오늘의 방문스케줄
            </Text>
          </View>
          <View style={{height: 230, flex: 1}}>
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
              ]}
              horizontal
              contentContainerStyle={{paddingHorizontal: 24}}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('FindService', {isPopupView: false});
                  }}>
                  <View
                    key={item.img}
                    style={{
                      borderWidth: 1,
                      borderColor: '#E6E6E6',
                      height: 200,
                      width: 200,
                      margin: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '80%',
                        borderBottomColor: '#E6E6E6',
                        borderBottomWidth: 1,
                        position: 'relative',
                      }}>
                      <View
                        style={
                          Platform.OS === 'ios'
                            ? {
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '10%',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                width: '70%',
                                height: '15%',
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                zIndex: 1,
                                flexDirection: 'row',
                                paddingLeft: '15%',
                                paddingRight: '15%',
                              }
                            : {
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '10%',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                width: '80%',
                                height: '15%',
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                zIndex: 1,
                                flexDirection: 'row',
                                paddingLeft: '15%',
                                paddingRight: '15%',
                              }
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: responsiveFontSize(1.4),
                          }}>
                          {item.time}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: responsiveFontSize(1.4),
                          }}>
                          {item.state}
                        </Text>
                      </View>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={item.img}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: '20%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: responsiveFontSize(1.8),
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}></FlatList>
          </View>
        </View>
      </ScrollView>
      {showPopup && (
        <AddressSelectPopup
          handleAdress={handleAdress}
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
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  locationWrapper: {
    height: WINDOW_HEIGHT * 0.11,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'relative',
    paddingBottom: '5%',
  },
});
