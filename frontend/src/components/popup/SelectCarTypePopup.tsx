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
  handlePopup: () => void;
}

export default function SelectCarTypePopup(
  data: ScheduleNavPopupProps,
): JSX.Element {
  const navigation = useNavigation<any>();
  const [check, setCheck] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [showPopup, setPopup] = useState(true);

  useEffect(() => {
    if (!check1 || !check2 || !check3 || !check4) setCheck(0);
  }, [check1, check2, check3, check4]);
  return (
    <View style={showPopup ? styles.rootWrapper : styles.close}>
      <View style={styles.popUpWrap}>
        <View style={styles.barWrap}>
          <View style={styles.bar}></View>
          <Text style={{color: '#B4B4B4', fontSize: responsiveFontSize(1.6)}}>
            희망차종을 선택하세요
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
            paddingTop: '5%',
            gap: 10,
          }}>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(1);
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 1 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>1톤</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(2);
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 2 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>2.5톤</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(3);
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 3 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>3.5톤</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(4);
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 4 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>5톤</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setPopup(false);
              data.handlePopup();
            }}>
            <View style={check !== 0 ? styles.button : styles.buttonNonActive}>
              <Text
                style={check !== 0 ? styles.btnTxt : styles.btnTxtNonActive}>
                선택하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
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
    height: WINDOW_HEIGHT * 0.6,
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
    // flex: 1,
    // height: WINDOW_HEIGHT * 0.04,
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
    // height: '100%',

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
    // height: '100%',
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
    // backgroundColor: '#ff0',
    height: WINDOW_HEIGHT * 0.1,
    justifyContent: 'flex-end',
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
