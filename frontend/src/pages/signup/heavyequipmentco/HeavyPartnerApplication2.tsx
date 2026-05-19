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
import PopUp from '../../popup/PopUp';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/utils/StackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';

export default function HeavyPartnerApplication2(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<RouteProp<RootStackParamList>>();

  const [form, setForm] = useState({
    homePage: '',
    SNS: '',
    youTube: '',
  });

  const [images, setImages] = useState<any>({
    freightCertImg: null,
    pilotTrainingCertImg: null,
  });

  const handleImagePick = (field: string) => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setImages({...images, [field]: response.assets[0]});
      }
    });
  };

  const handleNext = () => {
    navigation.navigate('HeavyPartnerApplication3', {
      ...router.params,
      ...form,
      ...images,
    });
  };

  return (
    <SafeAreaView style={styles.rootWrapper}>
      <ScrollView
        style={styles.rootWrapper}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.welcomeTitleWrap}>
          <Text style={styles.greeting}>정확한 내용과 파일을</Text>
          <Text style={styles.greeting}>등록 해주세요!</Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            <TouchableWithoutFeedback onPress={() => handleImagePick('freightCertImg')}>
              <View style={styles.fileUploadBox}>
                {images.freightCertImg ? (
                  <Image source={{uri: images.freightCertImg.uri}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                ) : (
                  <View style={styles.plus}>
                    <Image
                      style={styles.addButton}
                      source={require('@/assets/images/01-login/01-add-button.png')}
                    />
                    <View
                      style={
                        Platform.OS === 'ios'
                          ? {alignItems: 'center', gap: 2}
                          : {alignItems: 'center'}
                      }>
                      <Text style={styles.uploadMent}>화물운송</Text>
                      <Text style={styles.uploadMent}>자격증</Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleImagePick('pilotTrainingCertImg')}>
              <View style={styles.fileUploadBox}>
                {images.pilotTrainingCertImg ? (
                  <Image source={{uri: images.pilotTrainingCertImg.uri}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                ) : (
                  <View style={styles.plus}>
                    <Image
                      style={styles.addButton}
                      source={require('@/assets/images/01-login/01-add-button.png')}
                    />
                    <View
                      style={
                        Platform.OS === 'ios'
                          ? {alignItems: 'center', gap: 2}
                          : {alignItems: 'center'}
                      }>
                      <Text style={styles.uploadMent}>조종교육</Text>
                      <Text style={styles.uploadMent}>이수증</Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={styles.uploadMent2}>
              각각의 자격증과 이수증을 첨부해주세요!
            </Text>
          </View>
        </View>

        <View style={styles.greyBodyWrap2}>
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
              value={form.homePage}
              onChangeText={text => setForm({...form, homePage: text})}
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
              value={form.SNS}
              onChangeText={text => setForm({...form, SNS: text})}
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
              value={form.youTube}
              onChangeText={text => setForm({...form, youTube: text})}
            />
          </View>
          <View style={[styles.textInputWrapper]}>
            <Text style={styles.uploadMent2}>포트폴리오를 등록하고</Text>
            <Text style={styles.uploadMent2}>
              고객님들에게 대표님의 기술력을 뽑내보세요!
            </Text>
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={handleNext}>
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
          marginBottom: '10%',
        }
      : {
          width: WINDOW_WIDTH * 0.9,
          justifyContent: 'center',
          flex: 1,
          // marginTop: '5%',
          marginBottom: '10%',
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
    paddingTop: '5%',
    paddingBottom: '5%',
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
    height: '75%',
    // backgroundColor: '#ff0',
    paddingBottom: '3%',
  },
  uploadMent: {
    color: '#999999',
    fontSize: responsiveFontSize(1.2),
    //paddingBottom: '15%',
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
    marginLeft: '3%',
    width: '77%',
    //backgroundColor: '#ff0000',
    height: '90%',
    display: 'flex',
    fontSize: responsiveFontSize(1.3),
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
