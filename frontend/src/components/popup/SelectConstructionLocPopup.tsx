import {WINDOW_HEIGHT} from '@/constants/context';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
interface ScheduleNavPopupProps {
  //   handleHeader: (data: string) => void;
  handlePopup?: () => void;
}

export default function SelectConstructionLocPopup(
  data: ScheduleNavPopupProps,
): JSX.Element {
  const navigation = useNavigation<any>();
  const [check, setCheck] = useState(0);

  const [showPopup, setPopup] = useState(true);

  return (
    <View style={styles.rootWrapper}>
      <View style={styles.popUpWrap}>
        <View style={styles.barWrap}>
          <View style={styles.bar}></View>
          <Text style={{fontSize: responsiveFontSize(1.6), color: '#B4B4B4'}}>
            유형을 선택하세요
          </Text>
        </View>

        {/* divier---- */}
        <View style={styles.divider} />
        {/* divier---- */}
        <View
          style={{
            // flex: 1,
            width: '100%',
            height: WINDOW_HEIGHT * 0.3,
            maxHeight: 400,
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                width: '65%',
                alignItems: 'center',
                gap: 10,
                height: WINDOW_HEIGHT * 0.4,
                justifyContent: 'center',
                maxHeight: 220,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      width: WINDOW_HEIGHT * 0.15,
                      height: WINDOW_HEIGHT * 0.15,
                      maxHeight: 100,
                      maxWidth: 100,
                      backgroundColor: '#F9F9F9',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                    }}>
                    <Image
                      source={require('@/assets/images/request-get-pin.png')}
                    />
                    <Text
                      style={{
                        color: '#656565',
                        letterSpacing: -1,
                        fontWeight: 'bold',
                      }}>
                      신규주소
                    </Text>
                    <Text
                      style={{
                        color: '#656565',
                        letterSpacing: -1,
                        fontWeight: 'bold',
                      }}>
                      입력
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      width: WINDOW_HEIGHT * 0.15,
                      height: WINDOW_HEIGHT * 0.15,
                      maxHeight: 100,
                      maxWidth: 100,
                      backgroundColor: '#F9F9F9',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                    }}>
                    <Image
                      source={require('@/assets/images/request-get-pin.png')}
                    />
                    <Text
                      style={{
                        color: '#656565',
                        letterSpacing: -1,
                        fontWeight: 'bold',
                      }}>
                      고객님 주소
                    </Text>
                    <Text
                      style={{
                        color: '#656565',
                        letterSpacing: -1,
                        fontWeight: 'bold',
                      }}>
                      찾기
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  close: {display: 'none'},
  rootWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    // backgrou: 0.5,
    position: 'absolute',
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: WINDOW_HEIGHT * 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  bar: {
    borderWidth: 3,
    marginBottom: '5%',
    width: '30%',
    // marginBottom: '5%',
    borderColor: '#D8D8D8',
  },
  modalTitle: {},
  checkGroupWrap: {
    width: '100%',
    // minHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '7.5%',
    flex: 1,
    height: WINDOW_HEIGHT * 0.04,
  },
  checkSubGroupWrap: {
    width: '100%',
    height: '10%',

    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '18%',
  },
  iconWrap: {
    width: '6%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    borderRadius: 3,
    backgroundColor: '#2CB07B',
    width: WINDOW_HEIGHT * 0.03,
    height: WINDOW_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBox: {
    borderRadius: 3,
    backgroundColor: '#F6F6F6',
    width: WINDOW_HEIGHT * 0.03,
    height: WINDOW_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: '2%',
  },
  text: {fontSize: 13},
  divider: {
    borderWidth: 1,
    borderColor: '#F6F6F6',
    width: '85%',
    marginBottom: '5%',
  },
  iconWrapSmall: {
    width: '6.2%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxSmall: {
    borderRadius: 5,
    backgroundColor: '#2CB07B',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBoxSmall: {
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSmallWrap: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  textSmall: {
    fontSize: 12,
    //  backgroundColor: '#ff0',
  },
  buttonWrap: {
    width: '100%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#2CB07B',
    height: WINDOW_HEIGHT * 0.05,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNonActive: {
    backgroundColor: '#F6F6F6',
    height: WINDOW_HEIGHT * 0.05,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTxt: {
    color: 'white',
    fontSize: 15,
  },
  btnTxtNonActive: {
    color: '#000',
    fontSize: 15,
  },
});
