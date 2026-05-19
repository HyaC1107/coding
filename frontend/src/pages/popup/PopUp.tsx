import { WINDOW_HEIGHT } from '@/constants/context';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default function PopUp(): JSX.Element {
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [sub1, setCheckSub1] = useState(false);
  const [sub2, setCheckSub2] = useState(false);
  const [showPopup, setPopup] = useState(true);

  useEffect(() => {
    if (!check1 || !check2 || !check3 || !check4) setCheckAll(false);
  }, [check1, check2, check3, check4, checkAll]);
  return (
    <View style={showPopup ? styles.rootWrapper : styles.close}>
      <View style={styles.popUpWrap}>
        <View style={styles.barWrap}>
          <View style={styles.bar}></View>
        </View>
        <View style={styles.checkGroupWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheckAll(!checkAll);
              setCheck1(!checkAll);
              setCheck2(!checkAll);
              setCheck3(!checkAll);
              setCheck4(!checkAll);
            }}>
            <View style={styles.iconWrap}>
              <View
                style={
                  checkAll || (check1 && check2 && check3 && check4)
                    ? styles.iconBox
                    : styles.iconGreyBox
                }>
                <Image source={require('../../assets/images/whitecheck.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.textWrap}>
            <Text style={styles.text}>전체동의</Text>
          </View>
        </View>
        {/* divier---- */}
        <View style={styles.divider} />
        {/* divier---- */}
        <View style={styles.checkGroupWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck1(!check1);
            }}>
            <View style={styles.iconWrap}>
              <View style={check1 ? styles.iconBox : styles.iconGreyBox}>
                <Image source={require('../../assets/images/whitecheck.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '85%',
            }}>
            <View style={styles.textWrap}>
              <Text style={styles.text}>(필수) 이용약관 동의</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.greyText}>전문보기</Text>
            </View>
          </View>
        </View>
        <View style={styles.checkGroupWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck2(!check2);
            }}>
            <View style={styles.iconWrap}>
              <View style={check2 ? styles.iconBox : styles.iconGreyBox}>
                <Image source={require('../../assets/images/whitecheck.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '85%',
            }}>
            <View style={styles.textWrap}>
              <Text style={styles.text}>(필수) 개인정보 수집 및 이용 동의</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.greyText}>전문보기</Text>
            </View>
          </View>
        </View>
        <View style={styles.checkGroupWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck3(!check3);
            }}>
            <View style={styles.iconWrap}>
              <View style={check3 ? styles.iconBox : styles.iconGreyBox}>
                <Image source={require('../../assets/images/whitecheck.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.textWrap}>
            <Text style={styles.text}>(필수) 만 14세 이상입니다</Text>
          </View>
        </View>
        <View style={styles.checkGroupWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck4(!check4);
            }}>
            <View style={styles.iconWrap}>
              <View style={check4 ? styles.iconBox : styles.iconGreyBox}>
                <Image source={require('../../assets/images/whitecheck.png')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.textWrap}>
            <Text style={styles.text}>
              (선택) 마케팅 활용 동의 및 광고 수신 동의
            </Text>
          </View>
        </View>
        <View style={styles.checkSubGroupWrap}>
          <View style={styles.iconWrapSmall}>
            <View style={styles.iconBoxSmall}>
              <Image source={require('../../assets/images/whitecheck.png')} />
            </View>
          </View>
          <View style={styles.textSmallWrap}>
            <Text style={styles.textSmall}>SMS 수신동의 (선택)</Text>
          </View>
          <View style={styles.iconWrapSmall}>
            <View style={styles.iconBoxSmall}>
              <Image source={require('../../assets/images/whitecheck.png')} />
            </View>
          </View>
          <View style={styles.textSmallWrap}>
            <Text style={styles.textSmall}>E-Mail 수신동의 (선택) </Text>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setPopup(false);
            }}>
            <View style={styles.button}>
              <Text style={styles.btnTxt}>동의하기</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgrou: 0.5,
    position: 'absolute',
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: '60%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    borderWidth: 3,
    marginBottom: '5%',
    width: '30%',
    borderColor: '#D8D8D8',
  },
  checkGroupWrap: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '7.5%',
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
  text: {fontSize: responsiveFontSize(1.8)},
  greyText: {fontSize: responsiveFontSize(1.6), color: '#B4B4B4'},
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
    fontSize: responsiveFontSize(1.6),
    //  backgroundColor: '#ff0',
  },
  buttonWrap: {
    width: '100%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    paddingBottom: '10%',
  },
  button: {
    backgroundColor: '#2CB07B',
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
