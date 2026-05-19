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

export default function CustomerAddrPopup(
  data: ScheduleNavPopupProps,
): JSX.Element {
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
    <View style={showPopup ? styles.rootWrapper : styles.close}>
      <View style={styles.popUpWrap}>
        <View style={styles.barWrap}>
          <View style={styles.bar}></View>
          <Text style={{color: '#B4B4B4', fontSize: responsiveFontSize(1.6)}}>
            시공스케줄에 있는 고객님 주소입니다
          </Text>
        </View>

        {/* divier---- */}
        <View style={styles.divider} />
        {/* divier---- */}
        <ScrollView
          style={{
            //240214
            width: '100%',
            minHeight: 190,
            // borderWidth:1,
            // display:"flex",
            // gap:20
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck(1);
            }}>
            <View style={styles.checkGroupWrap}>
              <View style={styles.iconWrap}>
                <View
                  style={
                    check === 1
                      ? {
                          borderRadius: 100,
                          backgroundColor: '#2CB07B',
                          width: WINDOW_HEIGHT * 0.03,
                          height: WINDOW_HEIGHT * 0.03,
                        }
                      : {
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: '#B4B4B4',
                          width: WINDOW_HEIGHT * 0.03,
                          height: WINDOW_HEIGHT * 0.03,
                        }
                  }></View>
              </View>
              <View style={styles.textWrap}>
                <Text
                  style={[
                    {
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: 'bold',
                      paddingBottom: '2%',
                    },
                  ]}>
                  성시경 고객님
                </Text>
                <Text style={styles.text}>서울특별시 마포구 마포대로 20</Text>
                <Text style={styles.text}>202호</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck(2);
            }}>
            <View style={styles.checkGroupWrap}>
              <View style={styles.iconWrap}>
                <View
                  style={
                    check === 2
                      ? {
                          borderRadius: 100,
                          backgroundColor: '#2CB07B',
                          width: WINDOW_HEIGHT * 0.03,
                          height: WINDOW_HEIGHT * 0.03,
                        }
                      : {
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: '#B4B4B4',
                          width: WINDOW_HEIGHT * 0.03,
                          height: WINDOW_HEIGHT * 0.03,
                        }
                  }></View>
              </View>
              <View style={styles.textWrap}>
                <Text
                  style={[
                    {
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: 'bold',
                      paddingBottom: '2%',
                    },
                  ]}>
                  김범종 고객님
                </Text>
                <Text style={styles.text}>서울특별시 마포구 마포대로 33</Text>
                <Text style={styles.text}>
                  마포 한화 오벨리스크 101동 1420호
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setPopup(false);
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
    height: WINDOW_HEIGHT * 0.45,
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
    // paddingBottom: '2%',
    paddingLeft: '7.5%',
    // backgroundColor: '#ff0',
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
    paddingLeft: '5%',
  },
  text: {fontSize: responsiveFontSize(1.6), color: '#656565'},
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
