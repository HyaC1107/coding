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
interface SchedulePopupProps {
  handlePopup: () => void;
}
export default function SchedulePopup(data: SchedulePopupProps): JSX.Element {
  const {handlePopup} = data;
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
    <View style={styles.rootWrapper}>
      <View style={styles.popUpWrap}>
        <View style={styles.barWrap}>
          <View style={styles.bar}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../assets/images/pin0.5.png')} />
            <Text style={{paddingLeft: '5%', paddingRight: '5%'}}>
              서울특별시 마포구 도화동 11-1
            </Text>
          </View>
        </View>

        {/* divier---- */}
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingLeft: '5%',
            paddingBottom: ' 1%',
          }}>
          <Text style={{color: '#B4B4B4'}}>스케줄을 선택하세요</Text>
        </View>
        <View style={styles.divider} />
        {/* divier---- */}
        <View
          style={{
            flexGrow: 1,
            width: '100%',
            minHeight: 200,
          }}>
          <View style={{width: '100%', flex: 1}}>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(1);
                  navigation.navigate('PreperVisit');
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 1 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>희망방문예정 스케줄</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(2);
                  navigation.navigate('FixedVisit');
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 2 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>방문확정 스케줄</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(5);
                  navigation.navigate('ScheduleHeavyRentOrder');
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 5 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>중장비요청</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(3);
                  navigation.navigate('ConstructionSchedule');
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 3 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>공사 스케줄</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(4);
                  navigation.navigate('ConstructionScheduleUpdate');
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 4 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>공사취소 및 시간변경 요청</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              handlePopup();
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
    height: '70%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    borderWidth: 3,
    marginBottom: '5%',
    width: '30%',
    //marginBottom: '5%',
    borderColor: '#D8D8D8',
  },
  modalTitle: {},
  checkGroupWrap: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '7.5%',
    // flex: 1,
    //backgroundColor: '#ff0',
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
    borderRadius: 5,
    backgroundColor: '#2CB07B',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBox: {
    borderRadius: 2,
    backgroundColor: '#F6F6F6',
    width: 20,
    height: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    height: WINDOW_HEIGHT * 0.1,
    //paddingBottom: '40%',
    //backgroundColor: '#ff0',
  },
  button: {
    backgroundColor: '#2CB07B',
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNonActive: {
    backgroundColor: '#F6F6F6',
    height: 30,
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
