import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomTextInput from '../../components/textinput/TextInput';
import PssWdTextInput from '../../components/textinput/PsswdTextInput';
import {
  RouteProp,
  StackNavigationState,
  TypedNavigator,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {storeData} from '@/pages/main/customer/data';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import SvgComponent from '@/pages/main/customer/TestSvg';

export interface MenuListProp {
  data: {
    src: any;
    disc: string;
    isSelected?: boolean;
  }[];
  handleData?: (list: MenuItemPorp[], item: MenuItemPorp) => void;
  fullpage: boolean;
}
export interface MenuItemPorp {
  src: any;
  disc: string;
  isSelected?: boolean;
}
export default function MainMenu(menuprop: MenuListProp): JSX.Element {
  const {data, fullpage, handleData} = menuprop;
  const navigation = useNavigation<any>();
  const [showMore, setState] = useState(false);
  const [isClick, setClick] = useState(false);
  const router = useRoute();
  useEffect(() => {}, [isClick]);
  return (
    <View
      key={1}
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#ff0',
      }}>
      <View style={fullpage ? styles.fullPageRootWrapper : styles.rootWrapper}>
        {data.map((el: MenuItemPorp, i) => {
          if ((i < 8 || showMore) && !fullpage)
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  navigation.navigate('FindService', {headerValue: el.disc});
                }}>
                <View
                  key={i}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    //padding: '2%',
                    //backgroundColor: '#ff0', // 간격확인용 , 개발시 삭제하고 사용하시면됩니다
                  }}>
                  <View
                    style={{
                      width: 65,
                      //margin: '1%',
                      height: 65,
                      borderRadius: 100,
                      // backgroundColor: '#F9F9F9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '5%',
                    }}>
                    <Image source={el.src} style={{width: 60, height: 60, borderWidth:1, borderRadius:100, borderColor:"white"}} />
                  </View>
                  <Text
                    style={{
                      paddingBottom: '3%',
                      fontSize: responsiveFontSize(1.4),
                      letterSpacing: -1,
                    }}>
                    {el.disc}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          if (fullpage) {
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  handleData && handleData(data, el);
                }}>
                <View
                  key={i}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    //padding: '2%',
                    //backgroundColor: '#ff0', // 간격확인용 , 개발시 삭제하고 사용하시면됩니다
                  }}>
                  <View
                    style={
                      Platform.OS === 'ios'
                        ? {
                            width: 60,
                            //margin: '1%',
                            height: 60,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '5%',
                          }
                        : {
                            width: 65,
                            //margin: '1%',
                            height: 65,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '5%',
                          }
                    }>
                    <Image
                      source={el.src}
                      style={
                        Platform.OS === 'ios'
                          ? {width: 60, height: 60,borderWidth:1, borderRadius:100, borderColor:"white"}
                          : {
                              width: 65,
                              //margin: '1%',
                              height: 65,
                            }
                      }
                    />
                    {!el.isSelected && (
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          zIndex: 1,
                          position: 'absolute',
                          borderRadius: 100,
                          backgroundColor: 'rgba(255,255,2555,0.6)',
                        }}></View>
                    )}
                  </View>
                  <Text
                    style={
                      el.isSelected
                        ? {
                            paddingBottom: '3%',
                            fontSize: responsiveFontSize(1.6),
                          }
                        : {
                            paddingBottom: '3%',
                            fontSize: responsiveFontSize(1.6),
                            color: '#ababab',
                          }
                    }>
                    {el.disc}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }
        })}
      </View>
      {!fullpage && (
        <TouchableWithoutFeedback
          onPress={() => {
            setState(!showMore);
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              flex: 1,
              //backgroundColor: '#faf',
              width: '100%',
            }}>
            {showMore && (
              <Image
                style={{margin: '1%', height: 9.8, width: 15.4}}
                source={require('@/assets/images/03-main-icon/04-close.png')}
              />
            )}
            <Text
              style={{fontSize: responsiveFontSize(1.2), letterSpacing: -1}}>
              {!showMore ? '더보기' : '접어두기'}
            </Text>
            {!showMore && (
              <Image
                style={{margin: '1%', height: 9.8, width: 15.4}}
                source={require('@/assets/images/03-main-icon/01-more.png')}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper:
    Platform.OS === 'ios'
      ? {
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: 19.5,
        }
      : {
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: 29.5,
        },
  fullPageRootWrapper:
    Platform.OS === 'ios'
      ? {
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: 20,
        }
      : {
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          gap: 22,
        },
});
