import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/utils/StackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';

export default function ConsUpdateCoInfo(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<RouteProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.rootWrapper}>
      <ScrollView
        style={styles.rootWrapper}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.welcomeTitleWrap}>
          <Text style={styles.greeting}>
            수정이 필요한 자료를 수정해주세요!
          </Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.fileUploadBox}>
                <View style={styles.plus}>
                  <Image
                    style={styles.addButton}
                    source={require('@/assets/images/01-login/01-add-button.png')}
                  />
                  <Text style={styles.uploadMent}>사업장 사진</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.fileUploadBox}>
                <View style={styles.plus}>
                  <Image
                    style={styles.addButton}
                    source={require('@/assets/images/01-login/01-add-button.png')}
                  />
                  <Text style={styles.uploadMent}>임대차계약서</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={styles.uploadMent2}>
              간판이 포함된 전면사진과 임대차계약서를 첨부해주세요
            </Text>
          </View>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.fileUploadBox}>
                <View style={styles.plus}>
                  <Image
                    style={styles.addButton}
                    source={require('@/assets/images/01-login/01-add-button.png')}
                  />
                  <Text style={styles.uploadMent}>사업자등록증</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.fileUploadBox}>
                <View style={styles.plus}>
                  <Image
                    style={styles.addButton}
                    source={require('@/assets/images/01-login/01-add-button.png')}
                  />
                  <Text style={styles.uploadMent}>자동차등록증</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={styles.uploadMent2}>
              근접 촬영한 잘 보이는 원본이 필요해요!
            </Text>
          </View>
        </View>
        <View style={styles.greyBodyWrap2}>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>
                  업체명을 입력해주세요
                </Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} />
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>
                  업체 주소를 입력해주세요
                </Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} />
            <View>
              <Text style={{fontSize: responsiveFontSize(1.2)}}>주소검색</Text>
            </View>
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>
                  주업종을 입력해주세요
                </Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} />
            <View style={styles.iconWrap}>
              <Image source={require('@/assets/images/triangle0.5.png')} />
            </View>
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>
                  사업자 이메일을 입력해주세요
                </Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} />
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>
                  A/S기간을 입력해주세요
                </Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} />
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('ConsUpdateCoInfo2', router.params)
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
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  welcomeTitleWrap:
    Platform.OS === 'android'
      ? {
          width: WINDOW_WIDTH * 0.9,
          justifyContent: 'center',
          //height: WINDOW_HEIGHT * 0.1,
          flex: 1,
          marginTop: '5%',
          marginBottom: '5%',
        }
      : {
          width: WINDOW_WIDTH * 0.9,
          justifyContent: 'center',
          flex: 1,
          // marginTop: '5%',
          marginBottom: '5%',
          paddingTop: '5%',
          //backgroundColor: '#f00',
        },
  greeting: {
    fontSize: responsiveFontSize(2),
    color: '#000',
  },
  purple: {color: '#4545FD'},
  greyBodyWrap: {
    width: WINDOW_WIDTH * 0.9,
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    padding: '4%',
    gap: 20,
  },
  greyBodyWrap2: {
    width: WINDOW_WIDTH * 0.9,
    alignItems: 'center',
    gap: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#F8F8FA',
    paddingTop: '8%',
    paddingBottom: '8%',
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
    width: WINDOW_WIDTH * 0.5,
    marginBottom: '3%',
    justifyContent: 'space-between',
  },
  marginBottom: {
    marginBottom: '5%',
  },
  fileUploadBox: {
    width: WINDOW_WIDTH * 0.2,
    height: WINDOW_WIDTH * 0.2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2CB07B',
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',

    // paddingBottom: '1%',
  },
  plus: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70%',
    //backgroundColor: '#ff0',
  },
  uploadMent: {
    color: '#999999',
    fontSize: responsiveFontSize(1.4),
    paddingBottom: '7%',
  },
  uploadMent2: {
    fontSize: responsiveFontSize(1.6),
    color: '#000',
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
    fontSize: responsiveFontSize(1.6),
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
    height: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textInputWrapper: {
    alignItems: 'center',
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
  careerandCarWeightInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingLeft: '3%',
    // paddingRight: '3%',
  },
  textInputInfoTxtWrap: {},
  textInputInfoTxt: {color: '#000', fontSize: responsiveFontSize(1.6)},
  checkDupBtmWrap: {
    width: '20%',
  },
  textWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: WINDOW_HEIGHT * 0.05,
    borderColor: '#2CB07B',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: '2%',
  },

  TextInput: {
    marginLeft: 20,
    width: '77%',
    //backgroundColor: '#ff0000',
    height: '90%',
    display: 'flex',
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#ff0',
    width: '15%',
  },
  addButton: {
    width: 20,
    height: 20,
  },
});
