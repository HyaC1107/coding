import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PopUp from '@/pages/popup/PopUp';
import {useNavigation, useRoute} from '@react-navigation/native';
import SelectExposeArea from '@/pages/popup/SelectExposeArea';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import CustomTextInput from '@/components/textinput/TextInput';
import PssWdTextInput from '@/components/textinput/PsswdTextInput';
import SignUpTextInput from '@/components/textinput/signupTextInput';
import SignUpPWInput from '@/components/textinput/signUpPWInput';
import { post } from '@/utils/api';

export default function SignUp(): JSX.Element {
  const [warn, setWarn] = useState(false);
  const [warnEmail, setEmailWarn] = useState(false);
  const [warnNick, setNickWarn] = useState(false);
  const [success, setSuccess] = useState(false);
  const route = useRoute();
  const navigation = useNavigation<any>();

  useEffect(() => {
    console.log(route.params);
  }, []);
  
  const [type, setType] = useState('customer');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('01000000000');
  const [identify, setIdentify] = useState(true);
  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleRegister = async () => {
    if (!isIdChecked) {
      Alert.alert('알림', '아이디 중복 확인을 해주세요.');
      return;
    }

    if (password !== passwordChk) {
      setWarn(true);
      return;
    }

    if (!userId || !password || !email || !nickname || !name) {
      Alert.alert('알림', '모든 정보를 입력해주세요.');
      return;
    }

    try {
      const data = await post('/auth/register', {
        userId,
        password,
        email,
        name,
        phoneNumber,
        nickname,
        type: 'customer'
      });

      if (data.success) {
        Alert.alert('성공', '회원가입이 완료되었습니다.', [
          { text: '확인', onPress: () => navigation.navigate('Login') }
        ]);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입에 실패했습니다.';
      Alert.alert('오류', message);
    }
  };

  const handleCheck = async () => {
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
    } catch (error: any) {
      Alert.alert('오류', '아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View>
      <View style={styles.rootWrapper}>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>아이디를 입력해주세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}>
              <TouchableWithoutFeedback
                onPress={handleCheck}
              >
                <View style={[styles.checkDupBtn, isIdChecked && { backgroundColor: '#848484' }]}>
                  <Text style={styles.checkTxt}>{isIdChecked ? '확인완료' : '중복확인'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <SignUpTextInput handleText={(text: string) => {
            setUserId(text);
            setIsIdChecked(false);
          }} />
        </View>

        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>이름을 입력해주세요</Text>
            </View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <SignUpTextInput handleText={setName} />
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
          <SignUpPWInput handleText={setPassword} />
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
          <SignUpPWInput handleText={(text: string) => {
            setPasswordChk(text);
            setWarn(false);
          }} />
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
          <SignUpTextInput handleText={setEmail} />
          <Text style={warnEmail ? styles.warnMent : styles.disabled}>
            이메일을 확인해주세요
          </Text>
        </View>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>닉네임을 입력해주세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}>
              <TouchableWithoutFeedback
                onPress={() =>
                  {
                    Alert.alert('알림', '사용가능합니다.');
                  }}
              >
                <View style={styles.checkDupBtn}>
                  <Text style={styles.checkTxt}>중복확인</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <SignUpTextInput handleText={setNickname} />
          <Text style={warnNick ? styles.warnMent : styles.disabled}>
            이미 다른사람이 사용하고 있습니다
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
        <TouchableWithoutFeedback
          onPress={handleRegister}
        >
          <View style={styles.buttonWrap}>
            <View>
              <Text style={styles.loginBtn}>회원 가입 완료</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <PopUp />
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
  },
  textInputWrapper: {
    alignItems: 'center',
    height: '5%',
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
    height: '80%',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  checkTxt: {
    color: '#fff',
    fontSize: 11,
  },
  textInputWrap: {
    width: '100%',
    height: '10%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInput: {
    borderColor: '#E6E6E6',
    borderWidth: 1,
    width: '100%',
    height: '55%',
    borderRadius: 3,
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
    fontSize: 10.5,
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
