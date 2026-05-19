import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PopUp from '../../popup/PopUp';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PopUp from '../../popup/PopUp';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { post } from '@/utils/api';

export default function SignUpEnterprise(): JSX.Element {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [warn, setWarn] = useState(false);
  const [warnEmail, setEmailWarn] = useState(false);
  const [warnNick, setNickWarn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);

  const navigation = useNavigation<any>();
  const router = useRoute<any>();

  useEffect(() => {
    console.log(router.params);
  }, []);

  const handleIdCheck = async () => {
    if (!userId) {
      Alert.alert('알림', '아이디를 입력해주세요.');
      return;
    }
    try {
      const data = await post('/auth/check', { userId });
      if (data.available) {
        Alert.alert('알림', '사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      } else {
        Alert.alert('알림', '이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      }
    } catch (error) {
      Alert.alert('오류', '아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleNext = () => {
    if (!isIdChecked) {
      Alert.alert('알림', '아이디 중복 확인을 해주세요.');
      return;
    }
    if (password !== passwordChk) {
      setWarn(true);
      return;
    }
    if (!userId || !password || !email) {
      Alert.alert('알림', '필수 항목을 모두 입력해주세요.');
      return;
    }

    const params = {
      ...router.params,
      userId,
      password,
      email,
      name: name || userId, // name and phoneNumber are required by backend
      phoneNumber: phoneNumber || '01000000000',
    };

    if (router.params.userType === 'construction')
      navigation.navigate('PartnerApplication', params);
    if (router.params.userType === 'heavy')
      navigation.navigate('HeavyPartnerApplication', params);
  };

  return (
    <View>
      <View style={styles.rootWrapper}>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text style={{fontSize: responsiveFontSize(1.8)}}>
                아이디를 입력해주세요
              </Text>
            </View>
            <View style={styles.checkDupBtmWrap}>
              <TouchableWithoutFeedback onPress={handleIdCheck}>
                <View style={[styles.checkDupBtn, isIdChecked && {backgroundColor: '#848484'}]}>
                  <Text style={styles.checkTxt}>{isIdChecked ? '확인완료' : '중복확인'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            value={userId}
            onChangeText={(text) => {
              setUserId(text);
              setIsIdChecked(false);
            }}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>비밀번호를 입력해주세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}></View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>다시 한번 비밀번호를 입력해주세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}></View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            value={passwordChk}
            onChangeText={(text) => {
              setPasswordChk(text);
              setWarn(false);
            }}
          />
          <Text style={warn ? styles.warnMent : styles.disabled}>
            비밀번호가 맞지 않습니다 다시 입력하세요
          </Text>
        </View>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>이메일을 입력해주세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}>
              <TouchableWithoutFeedback>
                <View style={styles.checkDupBtn}>
                  <Text style={styles.checkTxt}>이메일인증</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={warnEmail ? styles.warnMent : styles.disabled}>
            이메일을 확인해주세요
          </Text>
        </View>

        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>본인인증하기</Text>
            </View>
            <View style={styles.checkDupBtmWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setSuccess(!success);
                  if (!success) {
                    setName('테스트');
                    setPhoneNumber('01012345678');
                  }
                }}>
                {success ? (
                  <View style={styles.checkSuccessWrap}>
                    <Image
                      source={require('@/assets/images/successcheck0.5.png')}
                    />
                    <Text style={styles.checkSuccessTxt}>인증완료</Text>
                  </View>
                ) : (
                  <View style={styles.checkDupBtn}>
                    <Text style={styles.checkTxt}>인증하기</Text>
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View
          style={
            Platform.OS === 'ios'
              ? {
                  flex: 1,
                  width: WINDOW_WIDTH,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {
                  flex: 1,
                  width: WINDOW_WIDTH,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: '5%',
                }
          }>
          <TouchableWithoutFeedback
            onPress={handleNext}>
            <View style={styles.buttonWrap}>
              <View>
                <Text style={styles.loginBtn}>다음</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <PopUp />
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper:
    Platform.OS === 'ios'
      ? {
          //justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          paddingLeft: '7.5%',
          paddingRight: '7.5%',
          gap: 10,
          paddingTop: '5%',
        }
      : {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          paddingLeft: '7.5%',
          paddingRight: '7.5%',
          gap: 15,
          paddingTop: '5%',
        },
  textInputWrapper: {
    alignItems: 'center',
    // height: '5%',
    width: '100%',

    justifyContent: 'center',
    //backgroundColor: '#ff0',
  },
  textInputInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  textInputInfoTxtWrap: {},
  checkDupBtmWrap: {
    width: '20%',
  },
  checkDupBtn: {
    backgroundColor: '#2CB07B',
    width: '100%',
    //height: '80%',
    height: 20,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  checkTxt: {
    color: '#fff',
    fontSize: responsiveFontSize(1.2),
  },
  textInputWrap: {
    width: '100%',
    height: '10%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInput:
    Platform.OS === 'ios'
      ? {
          borderColor: '#E6E6E6',
          borderWidth: 1,
          width: '100%',
          height: 45,
          borderRadius: 5,
        }
      : {
          borderColor: '#E6E6E6',
          borderWidth: 1,
          width: '100%',
          height: 50,
          borderRadius: 6,
        },
  buttonWrap: {
    marginTop: '15%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    width: WINDOW_WIDTH * 0.5,
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    height: 40,
  },
  loginBtn: {
    borderRadius: 100,
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    // height: 50,
    fontSize: 15,
    textAlign: 'center',
  },
  warnMent: {
    fontSize: responsiveFontSize(1.2),
    color: '#FF3120',
    paddingLeft: '3%',
    paddingTop: '2%',
  },
  disabled: {
    display: 'none',
  },
  checkSuccessWrap: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkSuccessTxt: {
    color: '#2CB07B',
    fontSize: 11,
    paddingLeft: '5%',
  },
});
