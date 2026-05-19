import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../utils/StackParamList';

export default function ConfirmSignUp(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();

  return (
    <View style={styles.rootWrapper}>
      <View style={styles.welcomeTitleWrap}>
        <Text style={styles.greeting}>파트너가 되신걸 축하드립니다</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.greenText}>성공적인 파트너가 되어 매출</Text>
          <Text style={styles.greeting}>을 올리세요</Text>
        </View>
      </View>
      <View style={[styles.greyBodyWrap, styles.marginBottom]}>
        <View style={styles.showingLocationExWrap}>
          <Text style={{paddingBottom: '5%', fontSize: 16}}>주의사항</Text>
        </View>
        <View>
          <Text style={{paddingBottom: '2%', fontSize: 14}}>
            1. 사기, 사업자 폐업활동,어뷰징 행위
          </Text>
        </View>
        <View>
          <Text style={{paddingBottom: '2%', fontSize: 14}}>
            2. 제 3자에게 면허, 자격증 빌려주는 행위
          </Text>
        </View>
        <View>
          <Text style={{paddingBottom: '2%', fontSize: 14}}>
            3. 값싼 견적 및 자재 바꾸기 등 소비자를 기만하는 행위
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '2%',
            paddingBottom: '2%',
          }}>
          <Text style={[styles.uploadMent2]}>
            위와 같은 행동은 유의 해주세요{' '}
          </Text>
        </View>
      </View>

      <View style={[styles.greyBodyWrap2, styles.marginBottom]}>
        <View style={styles.showingLocationExWrap}>
          <Text style={{paddingBottom: '2%', fontSize: 16}}>안내사항</Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            paddingTop: '2%',
          }}>
          <Text style={[styles.noticeMent]}>
            프로모션의 기간이 종료 된 후에는 기본노출지역으로 설정되어 월
            납입금으로 변경되오니 추후 공지사항을 확인해 주시길 바랍 니다. 또한
            현재 운영 정책상 프로모션의 기간은 정해지지 않았 으며 차후
            운영방침에 따라 공지 해드리니 안심하고 무료로 이용 하시길 바랍니다.
          </Text>
        </View>
      </View>

      <View style={styles.buttonWrap}>
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
          <View style={styles.button}>
            <Text style={styles.btnText}>시작하기</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    // justifyContent: 'center',
    // alignItems: 'center',
    display: 'flex',
    backgroundColor: 'white',
    // flexDirection: 'column',
    width: '100%',
    flex: 1,

    paddingLeft: '6%',
    paddingRight: '6%',
  },
  welcomeTitleWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    // flex: 1.5,
    marginTop: '0%',
    marginBottom: '10%',
  },
  greeting: {
    fontSize: 16,
    color: '#000',
    marginBottom: '2%',
    fontWeight: '600',
  },
  greenText: {
    fontSize: 16,
    color: '#2CB07B',
    marginBottom: '2%',
    fontWeight: '600',
  },
  purple: {color: '#4545FD'},
  greyBodyWrap: {
    width: '100%',
    backgroundColor: '#F8F8FA',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '5%',
    borderRadius: 20,
  },
  greyBodyWrap2: {
    width: '100%',
    backgroundColor: '#F8F8FA',
    padding: '5%',
    borderRadius: 20,
  },
  greyBodyWrap3: {
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    minHeight: 300,
    paddingTop: '5%',
    // height: '30%',
    // flex: 6,
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#F8F8FA',
    //   paddingTop: '6%',
    // paddingBottom: '6%',
  },

  bodyMentWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: '#2CB07B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  showingLocationExWrap: {
    alignItems: 'center',
    maxHeight: 230,

    justifyContent: 'center',
  },
  payAmountWrap: {
    alignItems: 'center',
    width: '70%',
    maxHeight: 230,
    justifyContent: 'center',
  },
  marginLeft: {
    marginLeft: '16%',
  },
  marginBottom: {
    marginBottom: '5%',
  },
  fileUploadBox: {
    width: '35%',
    height: '70%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2CB07B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    // paddingBottom: '1%',
  },
  plus: {
    fontSize: 40,
    color: '#999999',
    // backgroundColor: '#ff0',

    textAlign: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  uploadMent: {
    color: '#999999',
    fontSize: 12,
    // paddingBottom: '15%',
  },

  uploadMent2: {
    fontSize: 14,
    color: '#000',
    //lineHeight: 20,
    //marginBottom: '2%',
  },
  noticeMent: {fontSize: 12, paddingBottom: '2%', lineHeight: 20},
  payMent: {fontSize: 12, color: '#000', marginBottom: '1%'},
  buttonWrap: {
    minHeight: 130,
    height: '10%',
    width: '100%',
    justifyContent: 'flex-end',
    // paddingTop: '10%',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    paddingBottom: '15%',
  },
  button: {
    borderRadius: 100,
    width: '50%',
    backgroundColor: '#2CB07B',
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
  textInputWrap: {
    width: '100%',
    height: '10%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInput: {
    borderColor: '#2CB07B',
    borderWidth: 1,
    width: '100%',
    height: '80%',
    borderRadius: 3,
    backgroundColor: 'white',
  },
  textInputWrapper: {
    alignItems: 'center',
    height: '10%',
    width: '100%',
    justifyContent: 'center',

    //backgroundColor: '#ff0',
  },
  marginTop: {
    marginTop: 14,
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
  textInputInfoTxt: {color: '#000'},
  checkDupBtmWrap: {
    width: '20%',
  },
  textWrapper: {
    alignItems: 'center',
    // paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    // width: '85%',
    backgroundColor: 'white',
    width: '100%',
    height: '13%',
    minHeight: 30,
    borderColor: '#2CB07B',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10,
  },
  selectWrap: {
    marginLeft: 20,
    width: 50,
    //backgroundColor: '#ff0000',
    height: 20,
    display: 'flex',
    fontSize: 10,
    borderRadius: 2,
  },
  accountWrap: {
    width: 150,
    height: 20,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#ff0',
    width: '10%',
    height: 20,
  },
});
