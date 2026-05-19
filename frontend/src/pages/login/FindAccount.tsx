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
import PopUp from '../popup/PopUp';
import {useNavigation, useRoute} from '@react-navigation/native';
import SelectExposeArea from '../popup/SelectExposeArea';
import { post } from '@/utils/api';

export default function FindAccount(): JSX.Element {
  const [item, setItem] = useState(1);
  const [isShow, setIsShow] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [foundId, setFoundId] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const navigation = useNavigation<any>();

  useEffect(() => {
    setEmail('');
    setName('');
    setPhoneNumber('');
    setUserId('');
    setIsShow(true);
    setFoundId('');
    setResultMessage('');
  }, [item]);

  const handleFind = async () => {
    if (!isShow) {
      navigation.navigate('Login');
      return;
    }

    if (!name || !phoneNumber || !email) {
      Alert.alert('알림', '모든 정보를 입력해주세요.');
      return;
    }

    if (item === 2 && !userId) {
      Alert.alert('알림', '아이디를 입력해주세요.');
      return;
    }

    try {
      if (item === 1) {
        // 아이디 찾기
        const data = await post('/auth/findId', { name, phoneNumber, email });
        setFoundId(data.userId);
        setIsShow(false);
      } else {
        // 비밀번호 찾기
        const data = await post('/auth/findPw', { userId, name, phoneNumber, email });
        setResultMessage(data.message);
        setIsShow(false);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || '일치하는 정보를 찾을 수 없습니다.';
      setFoundId('');
      setResultMessage(message);
      setIsShow(false);
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(1);
          }}>
          <View
            style={
              item === 1
                ? {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#2CB07B',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
                : {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#B4B4B4',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
            }>
            <Text
              style={
                item === 1
                  ? {color: '#2CB07B', fontWeight: '600'}
                  : {color: '#B4B4B4'}
              }>
              아이디 찾기
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(2);
          }}>
          <View
            style={
              item === 2
                ? {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#2CB07B',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
                : {
                    width: '50%',
                    borderBottomWidth: 1,
                    borderColor: '#B4B4B4',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
            }>
            <Text
              style={
                item === 2
                  ? {color: '#2CB07B', fontWeight: '600'}
                  : {color: '#B4B4B4'}
              }>
              비밀번호 찾기
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {!isShow && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
          }}>
          {item === 1 ? (
            foundId ? (
              <>
                <Text style={{paddingBottom: '2%', fontSize: 16}}>찾으시는 아이디는</Text>
                <Text style={{paddingBottom: '2%', color: '#2CB07B', fontSize: 20, fontWeight: 'bold'}}>
                  {foundId}
                </Text>
                <Text style={{fontSize: 16}}>입니다.</Text>
              </>
            ) : (
              <>
                <Text style={{color: '#FF3120', paddingBottom: '2%', fontSize: 16}}>죄송합니다</Text>
                <Text style={{color: '#FF3120', fontSize: 16}}>{resultMessage || '입력하신 정보가 맞지 않습니다'}</Text>
              </>
            )
          ) : (
            <>
              <Text style={{paddingBottom: '2%', fontSize: 16, textAlign: 'center', paddingHorizontal: 20}}>
                {resultMessage || '입력하신 정보가 맞지 않습니다'}
              </Text>
            </>
          )}
        </View>
      )}

      <View style={isShow ? styles.rootWrapper : {display: 'none'}}>
        {item === 2 && (
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text>아이디를 입력하세요</Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
        )}
        {item === 2 && (
          <View style={styles.textInputWrap}>
            <TextInput 
              style={styles.textInput} 
              value={userId}
              onChangeText={setUserId}
            />
          </View>
        )}
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>이름을 입력하세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}></View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput 
            style={styles.textInput} 
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>휴대폰 번호를 입력하세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}></View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput 
            style={styles.textInput} 
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <View style={styles.textInputInfoTxtWrap}>
              <Text>가입한 이메일을 입력하세요</Text>
            </View>
            <View style={styles.checkDupBtmWrap}></View>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          paddingBottom: 40,
        }}>
        <TouchableWithoutFeedback
          onPress={handleFind}>
          <View style={styles.buttonWrap}>
            <Text style={styles.loginBtn}>
              {isShow
                ? item === 1
                  ? '아이디 찾기'
                  : '비밀번호 찾기'
                : '로그인 하기'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '10%',
  },
  textInputWrapper: {
    alignItems: 'center',
    //height: '12%',
    width: '100%',
    justifyContent: 'center',
  },
  textInputInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '3%',
    paddingRight: '3%',
    //backgroundColor: '#ff0',
    paddingBottom: 10,
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
  textInputWrap:
    Platform.OS === 'ios'
      ? {
          width: '100%',
          height: 50,
          marginBottom: '5%',
          // backgroundColor: '#ff0',
        }
      : {
          width: '100%',
          height: 70,
          marginBottom: '5%',
          //backgroundColor: '#ff0',
        },
  textInput:
    Platform.OS === 'ios'
      ? {
          borderColor: '#E6E6E6',
          borderWidth: 1,
          width: '100%',
          height: 40,
          borderRadius: 3,
        }
      : {
          borderColor: '#E6E6E6',
          borderWidth: 1,
          width: '100%',
          height: 40,
          borderRadius: 3,
        },
  buttonWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    width: '50%',
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
