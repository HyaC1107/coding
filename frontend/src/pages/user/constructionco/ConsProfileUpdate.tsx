import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import PopUp from '../../popup/PopUp';
import {useRoute} from '@react-navigation/native';
// import SelectExposeArea from '../../popup/SelectExposeArea';

export default function ConsProfileUpdate(): JSX.Element {
  const [item, setItem] = useState(1);
  const [isShow, setState] = useState(true);
  const [email, setEmail] = useState('');

  const route = useRoute();
  useEffect(() => {
    setEmail('');
    setState(true);
  }, [item]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('window').height * 0.35,
          width: '100%',
          paddingTop: '15%',
        }}>
        <Text style={{paddingBottom: '2%', fontSize: 16}}>
          정보를 수정하기 위해
        </Text>
        <Text style={{paddingBottom: '2%', fontSize: 16}}>
          비밀번호를 입력해주세요
        </Text>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#E6E6E6',
            height: Dimensions.get('window').height * 0.07,
            width: Dimensions.get('window').width * 0.85,
            alignItems: 'center',
            paddingLeft: '3%',
            gap: 10,
            flexDirection: 'row',
          }}>
          <Image source={require('@/assets/images/profile-lock.png')} />
          <TextInput placeholder="비밀번호를 입력해주세요" />
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
    flexDirection: 'column',
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    paddingTop: '10%',
  },
  textInputWrapper: {
    alignItems: 'center',
    height: '10%',
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
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInput: {
    borderColor: '#E6E6E6',
    borderWidth: 1,
    width: '100%',
    height: 35,
    borderRadius: 3,
  },
  buttonWrap: {
    //marginTop: '15%',
    //marginBottom: '5%',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    width: '50%',
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    height: '25%',
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
