import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomTextInput from '../../components/textinput/TextInput';
import PssWdTextInput from '../../components/textinput/PsswdTextInput';
import {
  useNavigation,
} from '@react-navigation/native';
import CustomText from '@/components/CustomText';
import { useAuth } from '@/context/AuthContext';
import { post } from '@/utils/api';

export default function Login(): JSX.Element {
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const colorCircle = require('../../assets/images/circlecolor.png');
  const greyCircle = require('../../assets/images/circlegrey.png');
  const [type, setType] = useState('customer');

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const data = await post('/auth/login', { userId, password });
      
      await login({
        token: data.token,
        userId: data.userId,
        name: data.name,
        type: data.type
      });

      if(data.type === 'customer') { 
        navigation.navigate('NavigatoarTab', {userType: 'customer'});
      } else if(data.type === 'constructor'){
        navigation.navigate('ConstructionCoNavigatorTab', {userType: 'constructor'});
      } else if(data.type === 'heavy'){
        navigation.navigate('HeavyCoNavigatorTab', {userType: 'heavy'});
      }
    } catch (error: any) {
      const message = error.response?.data?.message || '로그인에 실패했습니다. 서버 상태를 확인해주세요.';
      Alert.alert('오류', message);
    }
  };

  return (
    <View style={styles.rootWrapper}>
      <View style={styles.radioGroupWrap}>
        <TouchableWithoutFeedback
          onPress={() => {
            setType('customer');
          }}>
          <View style={styles.radioWrap}>
            <Image source={type === 'customer'? colorCircle : greyCircle} alt="icon" />
            <CustomText style={[styles.radioTxt]}>회원</CustomText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setType('partner');
          }}>
          <View style={styles.radioWrap}>
            <Image source={type !== 'customer' ? colorCircle : greyCircle} alt="icon" />
            <CustomText style={styles.radioTxt}>파트너</CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.titleWrap}>
        <Text style={[styles.title1, styles.black]}>시공전문가 찾고</Text>
        <CustomText style={[styles.title2, styles.green]}> 픽! </CustomText>
        <CustomText style={[styles.title1, styles.black]}>할땐</CustomText>
      </View>
      <CustomTextInput placeholder="아이디를 입력해주세요" handleId={setUserId} />
      <PssWdTextInput placeholder="비밀번호를 입력해주세요" handlePW={setPassword} />
      
      <View style={styles.autoLoginWrapper}>
        <View style={styles.autoLoginTxtWrap}>
          <View style={styles.checkWrap}>
            <Image
              style={styles.checkIcon}
              source={require('../../assets/images/check.png')}
            />
          </View>
          <View>
            <CustomText style={styles.autoTxt}>자동로그인</CustomText>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('FindAccount');
          }}
          >
          <View style={styles.findPsswdWrap}>
            <CustomText style={styles.findPsswd}>
              아이디 / 비밀번호찾기
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback
        onPress={() =>
          {
            navigation.navigate('SignUp', {userType: 'customer'});
          }}
        >
        <View style={styles.signUpWrap}>
          <CustomText style={styles.signUpTxt}>회원 / 파트너 회원가입</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={handleLogin}
        >
        <View style={styles.buttonWrap}>
          <View>
            <CustomText style={styles.loginBtn}> 로그인</CustomText>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  radioButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#eee',
    color: '#ababab',
  },
  waringWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 30,
  },
  warningText: {
    color: '#ff0000',
    fontSize: 11,
  },
  autoLoginWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  autoLoginTxtWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    //paddingRight: 20,
  },
  autoTxt: {color: '#848484'},
  findPsswdWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  findPsswd: {color: '#848484'},
  checkWrap: {
    paddingRight: 5,
    display: 'flex',
  },
  checkIcon: {
    height: 20,
    width: 20,
  },
  signUpWrap: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpTxt: {color: '#848484'},
  titleWrap: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title1: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  black: {color: '#000'},
  green: {color: '#2CB07B'},
  title2: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  buttonWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    width: 190,
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
  radioGroupWrap: {
    width: '50%',
    // height: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioWrap: {
    height: '100%',

    //backgroundColor: '#ff0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // marginRight: '8%',
  },
  radioTxt: {
    paddingLeft: '3%',
    fontSize: 16,
  },
});
