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
import PopUp from '../../popup/PopUp';
import {useNavigation, useRoute} from '@react-navigation/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_WIDTH} from '@/constants/context';

export default function Agreement(): JSX.Element {
  const route = useRoute();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const navigation = useNavigation<any>();
  const router = useRoute();

  return (
    <View>
      <View style={{backgroundColor: 'white'}}>
        <Text
          style={{
            paddingLeft: '7.5%',
            fontSize: responsiveFontSize(2),
            backgroundColor: 'white',
            paddingTop: '10%',
          }}>
          서명을 해주세요!
        </Text>
      </View>
      <View style={styles.rootWrapper}>
        <View style={styles.agreeBoxWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck1(!check1);
            }}>
            <View style={!check1 ? styles.agreeBox : styles.agreeBoxCheck}>
              <Image source={require('@/assets/images/docs.png')} />
              <Text
                style={{
                  paddingTop: '15%',
                  color: '#676767',
                  fontSize: responsiveFontSize(1.6),
                }}>
                이용약관서명
              </Text>
              <View
                style={
                  !check1 ? styles.agreeBoxGreen : styles.agreeBoxGreenCheck
                }></View>
              <Image
                style={!check1 ? styles.agreeBoxGreen : styles.checkMark}
                source={require('@/assets/images/checkmark.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck2(!check2);
            }}>
            <View style={!check2 ? styles.agreeBox : styles.agreeBoxCheck}>
              <Image source={require('@/assets/images/docs.png')} />
              <Text
                style={{
                  paddingTop: '15%',
                  color: '#676767',
                  fontSize: responsiveFontSize(1.6),
                }}>
                개인정보처리방침
              </Text>
              <View
                style={
                  !check2 ? styles.agreeBoxGreen : styles.agreeBoxGreenCheck
                }></View>
              <Image
                style={!check2 ? styles.agreeBoxGreen : styles.checkMark}
                source={require('@/assets/images/checkmark.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.agreeBoxWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck3(!check3);
            }}>
            <View style={!check3 ? styles.agreeBox : styles.agreeBoxCheck}>
              <Image source={require('@/assets/images/docs.png')} />
              <Text
                style={{
                  paddingTop: '15%',
                  color: '#676767',
                  fontSize: responsiveFontSize(1.6),
                }}>
                가입신청서
              </Text>
              <View
                style={
                  !check3 ? styles.agreeBoxGreen : styles.agreeBoxGreenCheck
                }></View>
              <Image
                style={!check3 ? styles.agreeBoxGreen : styles.checkMark}
                source={require('@/assets/images/checkmark.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setCheck4(!check4);
            }}>
            <View style={!check4 ? styles.agreeBox : styles.agreeBoxCheck}>
              <Image source={require('@/assets/images/docs.png')} />
              <Text
                style={{
                  paddingTop: '15%',
                  color: '#676767',
                  fontSize: responsiveFontSize(1.6),
                }}>
                CMS 신청
              </Text>
              <View
                style={
                  !check4 ? styles.agreeBoxGreen : styles.agreeBoxGreenCheck
                }></View>
              <Image
                style={!check4 ? styles.agreeBoxGreen : styles.checkMark}
                source={require('@/assets/images/checkmark.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SignUpDone', router.params)}>
            <View style={styles.button}>
              <Text style={styles.btnText}>신청완료</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingTop: '20%',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  agreeBoxWrap: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '20%',
    marginBottom: '10%',
  },
  agreeBox: {
    height: '100%',
    width: '45%',
    backgroundColor: 'white',
    opacity: 1,
    borderWidth: 1,
    borderColor: '#2CB07B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  agreeBoxCheck: {
    height: '100%',
    width: '45%',
    backgroundColor: 'white',
    opacity: 1,
    borderColor: '#2CB07B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  agreeBoxGreen: {
    display: 'none',
  },
  agreeBoxGreenCheck: {
    // backgroundColor:2CB07B
    height: '100%',
    width: '100%',
    backgroundColor: '#2CB07B',
    opacity: 0.8,
    //borderWidth: 1,
    // borderColor: '#2CB07B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  checkMark: {
    position: 'absolute',
  },
  buttonWrap: {
    minHeight: 130,
    height: '10%',
    width: '100%',
    justifyContent: 'flex-end',
    // paddingTop: '10%',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    paddingBottom: '10%',
  },
  button: {
    borderRadius: 100,
    width: WINDOW_WIDTH * 0.5,
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    height: 40,
    // height: 50,
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
});
