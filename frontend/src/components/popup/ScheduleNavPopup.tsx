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

export default function ScheduleNavPopup(
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
          <Text style={{color: '#B4B4B4', fontSize: responsiveFontSize(1.4)}}>
            스케줄을 선택하세요
          </Text>
        </View>

        {/* divier---- */}
        <View style={styles.divider} />
        {/* divier---- */}
        <View
          style={{
            // flex: 1,
            width: '100%',
            height: WINDOW_HEIGHT * 0.4,
            // backgroundColor: '#ff0',
          }}>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(1);
                // data.handleHeader('희망방문요청');
                navigation.navigate('VisitRequestPage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 1 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>희망방문요청</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(2);
                // data.handleHeader('방문확정');
                navigation.navigate('VisitFixedPage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 2 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>방문확정</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(3);
                // data.handleHeader('시공요청');
                navigation.navigate('ConstructionReqestPage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 3 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>시공요청</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(4);
                // data.handleHeader('시공스케줄');
                navigation.navigate('ConstructionSchedulePage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 4 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>시공스케줄</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(5);
                // data.handleHeader('시공취소요청');
                navigation.navigate('CancleRequestSchedulePage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 5 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.textWrap}>
              <Text style={styles.text}>시공취소요청</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(6);
                navigation.navigate('ConstructionFinishPage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 6 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>시공완료</Text>
            </View>
          </View>
          <View style={styles.checkGroupWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setCheck(7);
                navigation.navigate('ScheduleMgmtPage');
              }}>
              <View style={styles.iconWrap}>
                <View style={check === 7 ? styles.iconBox : styles.iconGreyBox}>
                  <Image source={require('@/assets/images/whitecheck.png')} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.textWrap}>
              <Text style={styles.text}>예약관리</Text>
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
    height: WINDOW_HEIGHT * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
    // paddingBottom: '2%',
    paddingLeft: '7.5%',
    // flex: 1,
    height: WINDOW_HEIGHT * 0.055,
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
  text: {fontSize: responsiveFontSize(1.5)},
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
    //backgroundColor: '#f00',
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
