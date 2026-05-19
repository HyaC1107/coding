import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
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
import MainMenu, {MenuItemPorp, MenuListProp} from '@/components/main/MainMenu';
import CalendarPopup from '../popup/CalendarPopup';
import AddressSelectPopup from '../popup/AddressSelectPopup';
import {data, storeData} from '../main/customer/pickData';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
interface LoginProp {
  navigate: any;
}

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
const dum = false;
interface PickServiceProps {
  isPopupOpen?: boolean;
  handlePopup?: (selectedCategories: string[]) => void;
  navigation: any;
}
export default function PickService(pickProps: PickServiceProps): JSX.Element {
  const {isPopupOpen, handlePopup, navigation} = pickProps;
  // const navigation = useNavigation<any>();
  const [isOn, setToggle] = useState(true);
  const [page, setPage] = useState(0);
  const [homeDataState, setState] = useState<MenuItemPorp[]>([...data]);
  const [storeDataState, setStoreState] = useState<MenuItemPorp[]>([
    ...storeData,
  ]);
  const [nextPage, navigateToNextPage] = useState(true);
  const handleData = (v: MenuItemPorp[], selectedItem: MenuItemPorp) => {
    const d = v.map((e: MenuItemPorp) => {
      if (e.disc === selectedItem.disc) {
        return {...e, isSelected: !e.isSelected};
      }
      return {...e};
    });
    setState(d);
  };
  const handleStoreData = (v: MenuItemPorp[], selectedItem: MenuItemPorp) => {
    const d = v.map((e: MenuItemPorp) => {
      if (e.disc === selectedItem.disc) {
        return {...e, isSelected: !e.isSelected};
      }
      return {...e};
    });
    setStoreState(d);
  };
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    setToggle(true);
  }, []);

  return (
    <View
      style={
        isPopupOpen
          ? {
              flex: 1,
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 1,
            }
          : {
              display: 'none',
            }
      }>
      <View style={styles.locationWrapper}>
        <View></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#F6F6F6',
            borderBottomWidth: 2,
            paddingBottom: 15,
            width: '80%',
            justifyContent: 'center',
          }}>
          <Image source={require('@/assets/images/pin0.5.png')} />
          <Text style={{paddingLeft: '5%', paddingRight: '5%'}}>
            서울특별시 마포구 도화동 11-1
          </Text>
          <Image source={require('@/assets/images/open0.5.png')} />
        </View>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.rootWrapper}>
          <View></View>
          <View
            style={
              Platform.OS === 'android'
                ? {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    paddingTop: '2%',
                    paddingBottom: 20,
                  }
                : {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    paddingTop: '2%',
                    paddingBottom: 20,
                  }
            }>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#000',
              }}>
              필요한 시공을 선택하세요
            </Text>
            <Toggle isOn={!isOn} onToggle={() => setToggle(!isOn)} />
          </View>
          <View style={{paddingLeft: '10%', paddingRight: '10%'}}>
            <MainMenu
              data={isOn ? homeDataState : storeDataState}
              fullpage={true}
              handleData={isOn ? handleData : handleStoreData}
            />
          </View>
        </View>
      </ScrollView>
      {/* <CalendarPopup /> */}
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
              fontSize: responsiveFontSize(1.6),
            }}>
            주의사항 안내문
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            const selectedCategories = (isOn ? homeDataState : storeDataState)
              .filter(item => item.isSelected)
              .map(item => item.disc);
            handlePopup && handlePopup(selectedCategories);
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
                fontSize: responsiveFontSize(1.6),
              }}>
              다음
            </Text>
            <Image source={require('@/assets/images/next.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* <AddressSelectPopup /> */}
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
  locationWrapper:
    Platform.OS === 'ios'
      ? {
          height: 90,
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
          flexDirection: 'row',
          position: 'relative',
          paddingBottom: 5,
          backgroundColor: 'white',
        }
      : {
          height: 80,
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
          flexDirection: 'row',
          position: 'relative',
          paddingBottom: 10,
          backgroundColor: 'white',
        },
});
