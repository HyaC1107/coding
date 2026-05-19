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

import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import {launchImageLibrary} from 'react-native-image-picker';

export default function PartnerApplication(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<RouteProp<RootStackParamList>>();

  const [form, setForm] = useState({
    companyName: '',
    address: '',
    categories: '',
    companyEmail: '',
    afterService: '',
    businessNumber: '',
  });

  const [images, setImages] = useState<any>({
    profileImg: null,
    leaseCarImg: null,
    CBPImg: null,
    personalIdImg: null,
  });

  const handleImagePick = (field: string) => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('오류', response.errorMessage || '이미지를 불러오는데 실패했습니다.');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setImages((prev: any) => ({...prev, [field]: asset}));
      }
    });
  };

  const handleNext = () => {
    if (!form.companyName || !form.address) {
      Alert.alert('알림', '필수 정보를 입력해주세요.');
      return;
    }
    navigation.navigate('PartnerApplication2', {
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
          <Text style={styles.greeting}>사업장 검수 과정이예요!</Text>
          <Text style={styles.greeting}>
            정확한 서류와 사진을 등록해 주세요!
          </Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            <TouchableWithoutFeedback onPress={() => handleImagePick('profileImg')}>
              <View style={styles.fileUploadBox}>
                {images.profileImg ? (
                  <Image source={{uri: images.profileImg.uri}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                ) : (
                  <View style={styles.plus}>
                    <Image
                      style={styles.addButton}
                      source={require('@/assets/images/01-login/01-add-button.png')}
                    />
                    <Text style={styles.uploadMent}>사업장 사진</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleImagePick('leaseCarImg')}>
              <View style={styles.fileUploadBox}>
                {images.leaseCarImg ? (
                  <Image source={{uri: images.leaseCarImg.uri}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                ) : (
                  <View style={styles.plus}>
                    <Image
                      style={styles.addButton}
                      source={require('@/assets/images/01-login/01-add-button.png')}
                    />
                    <Text style={styles.uploadMent}>임대차계약서</Text>
                  </View>
                )}
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
            <TouchableWithoutFeedback onPress={() => handleImagePick('CBPImg')}>
              <View style={styles.fileUploadBox}>
                {images.CBPImg ? (
                  <Image source={{uri: images.CBPImg.uri}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                ) : (
                  <View style={styles.plus}>
                    <Image
                      style={styles.addButton}
                      source={require('@/assets/images/01-login/01-add-button.png')}
                    />
                    <Text style={styles.uploadMent}>사업자등록증</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleImagePick('personalIdImg')}>
              <View style={styles.fileUploadBox}>
                {images.personalIdImg ? (
                  <Image source={{uri: images.personalIdImg.uri}} style={{width: '100%', height: '100%', borderRadius: 5}} />
                ) : (
                  <View style={styles.plus}>
                    <Image
                      style={styles.addButton}
                      source={require('@/assets/images/01-login/01-add-button.png')}
                    />
                    <Text style={styles.uploadMent}>신분증</Text>
                  </View>
                )}
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
            <TextInput
              style={styles.TextInput}
              value={form.companyName}
              onChangeText={text => setForm({...form, companyName: text})}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <View style={styles.textInputInfoTxtWrap}>
                <Text style={styles.textInputInfoTxt}>
                  사업자 번호를 입력해주세요
                </Text>
              </View>
              <View style={styles.checkDupBtmWrap}></View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              value={form.businessNumber}
              onChangeText={text => setForm({...form, businessNumber: text})}
              keyboardType="numeric"
            />
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
            <TextInput
              style={styles.TextInput}
              value={form.address}
              onChangeText={text => setForm({...form, address: text})}
            />
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
            <TextInput
              style={styles.TextInput}
              value={form.categories}
              onChangeText={text => setForm({...form, categories: text})}
            />
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
            <TextInput
              style={styles.TextInput}
              value={form.companyEmail}
              onChangeText={text => setForm({...form, companyEmail: text})}
              keyboardType="email-address"
            />
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
            <TextInput
              style={styles.TextInput}
              value={form.afterService}
              onChangeText={text => setForm({...form, afterService: text})}
            />
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback onPress={handleNext}>
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
