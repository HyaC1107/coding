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
import PopUp from '../../popup/PopUp';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/utils/StackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function PartnerApplication2Back(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<RouteProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.rootWrapper}>
      <ScrollView style={styles.rootWrapper}>
        <View style={styles.welcomeTitleWrap}>
          <Text style={styles.greeting}>정확한 내용과 파일을</Text>
          <Text style={styles.greeting}>등록 해주세요!</Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            <View style={styles.fileUploadBox}>
              <Text style={styles.plus}>+</Text>
              <Text style={styles.uploadMent}>필수자격증</Text>
            </View>
            <View style={[styles.fileUploadBox, styles.marginLeft]}>
              <Text style={styles.plus}>+</Text>
              <Text style={styles.uploadMent}>추가자격증</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.uploadMent2]}>
              필수 자격증과 추가 자격증을 많이 등록 할 수록 좋아요!{' '}
            </Text>
            <Text style={[styles.uploadMent2, styles.marginBottom]}>
              자격증이 필요 없는 업종이라면 다음으로 넘어가세요!
            </Text>
          </View>
        </View>
        <View style={[styles.greyBodyWrap2, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            <View style={styles.fileUploadBox}>
              <Text style={styles.uploadMent}>보증기관발급</Text>
              <Text style={styles.uploadMent}>유/무</Text>
            </View>
            <View style={[styles.fileUploadBox, styles.marginLeft]}>
              <Text style={styles.uploadMent}>보증가능</Text>
              <Text style={styles.uploadMent}>여부</Text>
            </View>
          </View>
          <View>
            <Text style={styles.uploadMent2}>
              보증기관을 통한 보증서 업무는 고객을 안전하게 해요!
            </Text>
          </View>
        </View>
        <View style={styles.greyBodyWrap3}>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>홈페이지 링크</Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              placeholder="개인이 보유한 도메인 URL을 입력하세요"
            />
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>SNS 링크</Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              placeholder="블로그,인스타그램,페이스북,밴드 등 URL을 입력하세요"
            />
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>유튜브 링크</Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              placeholder="유튜브 URL을 입력하세요"
            />
          </View>
          <View style={[styles.textInputWrapper, styles.marginTop]}>
            <Text>포트폴리오를 등록하고</Text>
            <Text>고객님들에게 대표님의 기술력을 뽑내보세요!</Text>
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('PartnerApplication3', router.params)
            }>
            <View style={styles.button}>
              <Text style={styles.btnText}>다음</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    // alignItems: 'center',
    height: '15%',
    flex: 1.5,
    marginTop: '5%',
    marginBottom: '10%',
  },
  greeting: {
    fontSize: 16,
    color: '#000',
  },
  purple: {color: '#4545FD'},
  greyBodyWrap: {
    width: '100%',
    alignItems: 'center',
    //    justifyContent: 'center',
    minHeight: 160,
    flex: 1,
    height: '40%',
    backgroundColor: '#F8F8FA',
    //padding: '6%',
  },
  greyBodyWrap2: {
    width: '100%',
    alignItems: 'center',
    //    justifyContent: 'center',
    minHeight: 150,
    flex: 1,
    height: '40%',
    backgroundColor: '#F8F8FA',
    //padding: '6%',
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
  fileUploadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ff0',
    width: '68%',
    height: '75%',
    // paddingTop: '2%',
    //marginBottom: 10,
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
    fontSize: 12,
    color: '#000',
    marginBottom: '1%',
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
  TextInput: {
    marginLeft: 20,
    width: '77%',
    //backgroundColor: '#ff0000',
    height: '100%',
    display: 'flex',
    fontSize: 10,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#ff0',
    width: '15%',
  },
});
