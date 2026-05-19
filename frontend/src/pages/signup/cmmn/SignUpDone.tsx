import {WINDOW_HEIGHT} from '@/constants/context';
import {useNavigation, useRoute} from '@react-navigation/native';
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

export default function SignUpDone(): JSX.Element {
  const router = useRoute<any>();
  const navigation = useNavigation<any>();
  return (
    <View style={styles.rootWrapper}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: WINDOW_HEIGHT * 0.45,
          gap: 70,
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (router.params?.userType === 'construction')
                navigation.navigate('ConstructionCoNavigatorTab');
              if (router.params?.userType === 'heavy') {
                navigation.navigate('HeavyCoNavigatorTab');
              }
              if (router.params?.userType === 'customer')
                navigation.navigate('NavigatoarTab');
            }}>
            <Image source={require('@/assets/images/agree.png')} />
          </TouchableWithoutFeedback>
          <Text
            style={{
              marginTop: '10%',
              fontSize: responsiveFontSize(2),
              color: '#50B98F',
            }}>
            파트너 신청이 완료 되었습니다
          </Text>
        </View>
        <View style={{alignItems: 'center', gap: 2}}>
          <Text style={{letterSpacing: -1}}>
            자료 검토 후 등록하신 이메일로 계약서가
          </Text>
          <Text style={{letterSpacing: -1}}>
            발송 되오니 확인 후 서명 부탁 드립니다
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    // paddingTop: '20%',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    gap: 60,
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
    width: '50%',
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
