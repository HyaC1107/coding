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

export default function DaySelectPopup(
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
          <Text style={{fontSize: responsiveFontSize(1.6)}}>
            운영시간을 입력하세요
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
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '90%', alignItems: 'center', gap: 10}}>
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    letterSpacing: -1,
                  }}>
                  요일을 선택하세요
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  height: WINDOW_HEIGHT * 0.06,
                  //   backgroundColor: '#ff0',
                  borderBottomColor: '#F6F6F6',
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(1);
                    }}>
                    <View
                      style={
                        check === 1
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                      }>
                      <Text style={{fontSize: responsiveFontSize(2.2)}}>
                        월
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(2);
                    }}>
                    <View
                      style={
                        check === 2
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#2CB07B',
                            }
                      }>
                      <Text
                        style={
                          check === 2
                            ? {fontSize: responsiveFontSize(2.2)}
                            : {
                                fontSize: responsiveFontSize(2.2),
                                color: 'white',
                              }
                        }>
                        화
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(3);
                    }}>
                    <View
                      style={
                        check === 3
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                      }>
                      <Text style={{fontSize: responsiveFontSize(2.2)}}>
                        수
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(4);
                    }}>
                    <View
                      style={
                        check === 4
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                      }>
                      <Text style={{fontSize: responsiveFontSize(2.2)}}>
                        목
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(5);
                    }}>
                    <View
                      style={
                        check === 5
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                      }>
                      <Text style={{fontSize: responsiveFontSize(2.2)}}>
                        금
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(6);
                    }}>
                    <View
                      style={
                        check === 6
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                      }>
                      <Text style={{fontSize: responsiveFontSize(2.2)}}>
                        토
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCheck(7);
                    }}>
                    <View
                      style={
                        check === 7
                          ? {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomColor: '#2CB07B',
                              borderBottomWidth: 2,
                            }
                          : {
                              height: WINDOW_HEIGHT * 0.04,
                              width: WINDOW_HEIGHT * 0.04,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }
                      }>
                      <Text style={{fontSize: responsiveFontSize(2.2)}}>
                        일
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={{width: '70%'}}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: WINDOW_HEIGHT * 0.2,
                    maxHeight: 150,
                    alignItems: 'center',
                  }}>
                  <View style={{alignItems: 'center', gap: 20}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        letterSpacing: -1,
                      }}>
                      오픈시간
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        fontWeight: 'bold',
                      }}>
                      07:00
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', gap: 20}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        letterSpacing: -1,
                      }}>
                      마감시간
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        fontWeight: 'bold',
                      }}>
                      19:00
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', gap: 20}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.2),
                        fontWeight: 'bold',
                      }}>
                      휴무
                    </Text>
                  </View>
                </View>
              </View>
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
    height: WINDOW_HEIGHT * 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.07,
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
