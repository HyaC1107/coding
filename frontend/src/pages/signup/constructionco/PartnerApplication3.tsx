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
import Location from '@/components/signup/Location';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_WIDTH} from '@/constants/context';

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
import Location from '@/components/signup/Location';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_WIDTH} from '@/constants/context';
import {postForm} from '@/utils/api';

export default function PartnerApplication3(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();

  const [exposedLocation, setExposedLocation] = useState<string[]>(['강남구 삼성동']);
  const [additionalLocation, setAdditionalLocation] = useState<string[]>([]);
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    personalId: '',
    phoneNumber: '',
  });

  const handleSubmit = async () => {
    try {
      const params = router.params;
      const formData = new FormData();

      // Basic Info from SignUpEnterprise and previous steps
      formData.append('userId', params.userId || '');
      formData.append('password', params.password || '');
      formData.append('email', params.email || '');
      formData.append('name', params.name || params.userId || ''); // Fallback
      formData.append('phoneNumber', params.phoneNumber || '01000000000');
      formData.append('type', 'constructor');

      // Company Info
      formData.append('companyName', params.companyName || '');
      formData.append('businessNumber', params.businessNumber || '');
      formData.append('address', params.address || '');
      formData.append('companyEmail', params.companyEmail || '');
      formData.append('afterService', params.afterService === 'true' ? 'true' : 'false');
      formData.append('categories', JSON.stringify([params.categories]));
      formData.append('homePage', params.homePage || '');
      formData.append('SNS', params.SNS || '');
      formData.append('youTube', params.youTube || '');
      formData.append('guarantee', params.guarantee || '');
      
      formData.append('exposedLocation', JSON.stringify(exposedLocation));
      formData.append('additionalLocation', JSON.stringify(additionalLocation));

      // Files
      if (params.profileImg) {
        formData.append('profileImg', {
          uri: params.profileImg.uri,
          name: params.profileImg.fileName || 'profile.jpg',
          type: params.profileImg.type || 'image/jpeg',
        } as any);
      }
      if (params.CBPImg) {
        formData.append('CBPImg', {
          uri: params.CBPImg.uri,
          name: params.CBPImg.fileName || 'cbp.jpg',
          type: params.CBPImg.type || 'image/jpeg',
        } as any);
      }
      if (params.personalIdImg) {
        formData.append('personalIdImg', {
          uri: params.personalIdImg.uri,
          name: params.personalIdImg.fileName || 'id.jpg',
          type: params.personalIdImg.type || 'image/jpeg',
        } as any);
      }
      if (params.leaseCarImg) {
        formData.append('leaseCarImg', {
          uri: params.leaseCarImg.uri,
          name: params.leaseCarImg.fileName || 'lease.jpg',
          type: params.leaseCarImg.type || 'image/jpeg',
        } as any);
      }

      // Certificates
      if (params.certificateFiles && params.certificateFiles.length > 0) {
        // Backend expects certificates as JSON array of strings normally, 
        // but if we want to upload files we might need to handle it differently.
        // For now, let's send them as certificates field if backend can handle multiple files.
        // Given current backend only handles specific fields via getPath, certificates might just be names.
        formData.append('certificates', JSON.stringify(params.certificateFiles.map((f: any) => f.fileName)));
      }

      const result = await postForm('/auth/register/partner', formData);
      if (result.success) {
        Alert.alert('성공', result.message, [
          {text: '확인', onPress: () => navigation.navigate('SignUpReview', {userId: params.userId})}
        ]);
      }
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      Alert.alert('오류', msg);
    }
  };

  return (
    <SafeAreaView style={styles.rootWrapper}>
      <ScrollView style={styles.rootWrapper}>
        <View style={styles.welcomeTitleWrap}>
          <Text style={styles.greeting}>노출하고 싶은 지역을</Text>
          <Text style={styles.greeting}>선택해 주세요!</Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingLeft: '5%',
              paddingRight: '5%',
              paddingTop: '5%',
              marginBottom:5
            }}>
            <Text style={styles.exposeLocText}>기본 노출지역</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image
                style={styles.addLocIcon}
                source={require('@/assets/images/01-login/01-add-button.png')}
              />
              <Text
                style={{color: '#2CB07B', fontSize: responsiveFontSize(1.6)}}>
                지역추가
              </Text>
            </View>
          </View>
          <View style={styles.showingLocationExWrap}>
            <Text
              style={{
                paddingBottom: '1%',
                paddingTop: '2%',
                fontSize: responsiveFontSize(1.6),
              }}>
              예시
            </Text>
            {exposedLocation.map((loc, idx) => (
              <Location key={idx} />
            ))}
            <Location />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '2%',
            }}>
            <Text style={[styles.uploadMent2]}>
              5개의 동을 선택 할 수 있어요!
            </Text>
            <Text style={[styles.uploadMent2, styles.marginBottom]}>
              면은 동 1개당 2개를 선택 할 수 있어요!
            </Text>
          </View>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingLeft: '5%',
              paddingRight: '5%',
              paddingTop: '5%',
              marginBottom:10
            }}>
            <Text>추가 노출지역</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image
                style={styles.addLocIcon}
                source={require('@/assets/images/01-login/01-add-button.png')}
              />
              <Text
                style={{color: '#2CB07B', fontSize: responsiveFontSize(1.6)}}>
                지역추가
              </Text>
            </View>
          </View>
          <View style={styles.showingLocationExWrap}>
            <Text
              style={{
                //paddingBottom: '1%',
                fontSize: responsiveFontSize(1.6),
                paddingTop: '4%',
              }}>
              예시
            </Text>
            <View
              style={{
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#ff0',
              }}>
              <Location />
              <Location />
              <Location />
            </View>
          </View>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '3%',
                  }
                : {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '4%',
                  }
            }>
            <Text style={[styles.uploadMent2]}>
              최대 10군데를 추가 할 수 있어요!
            </Text>
            <Text style={[styles.uploadMent2, styles.marginBottom]}>
              동 - 10,000원 / 군 - 5,000원 이예요!
            </Text>
          </View>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingLeft: '5%',
              paddingRight: '5%',
              paddingTop: '5%',
            }}>
            <Text>결제 금액</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
          </View>
          <View style={styles.payAmountWrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: '#ff0',
                width: '100%',
                paddingTop: '5%',
                paddingBottom: '2%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  padding: '2%',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  기본금액
                </Text>
                <Text
                  style={{
                    color: '#004BA7',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                  }}>
                  {(49000).toLocaleString()}원
                </Text>
              </View>
              <View>
                <Image
                  style={styles.addButton}
                  source={require('@/assets/images/01-login/01-add-button.png')}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  padding: '2%',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  추가금액
                </Text>

                <Text
                  style={{
                    color: '#004BA7',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                  }}>
                  {(0).toLocaleString()}원
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                width: '100%',
                borderColor: '#707070',
              }}></View>
            <View
              style={{width: '100%', alignItems: 'flex-end', paddingTop: '5%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: '2%',
                }}>
                <Text style={styles.basicFeeTxt}>기본료</Text>
                <Text
                  style={{
                    color: '#004BA7',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                    width: 100,
                    textAlign: 'right',
                    alignItems: 'flex-end',
                  }}>
                  {(49000).toLocaleString()}원
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.basicFeeTxt}>부가세10% 별도</Text>
                <Text
                  style={{
                    color: '#004BA7',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                    width: 100,
                    textAlign: 'right',
                    alignItems: 'flex-end',
                  }}>
                  {(4900).toLocaleString()}원
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: '10%',
                  paddingBottom: '10%',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                  }}>
                  총금액
                </Text>
                <Text
                  style={{
                    color: '#2CB07B',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                    width: 100,
                    textAlign: 'right',
                    alignItems: 'flex-end',
                  }}>
                  {(53900).toLocaleString()}원
                </Text>
              </View>
            </View>
          </View>
          <View
            style={
              Platform.OS === 'android'
                ? {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '2%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                  }
                : {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '2%',
                  }
            }>
            <Text style={[styles.payMent]}>
              첫달 49,000원 + 부가세 10% 으로 결제됩니다
            </Text>
            <Text style={[styles.payMent, styles.marginBottom]}>
              단 추가지역 비용은 다음달부터 결제 되오니 참고하시길 바랍니다
            </Text>
          </View>
        </View>

        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //alignItems: 'center',
              width: '100%',
              paddingLeft: '5%',
              paddingRight: '5%',
              paddingTop: '5%',
            }}>
            <Text style={styles.exposeLocText}>자동출금 은행 선택</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}></View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                //padding: '5%',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: '5%',
                  //backgroundColor: '#ff0',
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      paddingRight: '5%',
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    은행
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderRadius: 1,
                      borderColor: '#E6E6E6',
                    }}>
                    <TextInput
                      style={styles.selectWrap}
                      value={bankInfo.bankName}
                      onChangeText={text => setBankInfo({...bankInfo, bankName: text})}
                    />
                    <View style={styles.iconWrap}>
                      <Image
                        style={{width: 10, height: 10}}
                        source={require('@/assets/images/triangle0.5.png')}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        paddingRight: '5%',
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      예금주
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 1,
                        borderColor: '#E6E6E6',
                      }}>
                      <TextInput
                        style={styles.selectWrap}
                        value={bankInfo.accountHolder}
                        onChangeText={text => setBankInfo({...bankInfo, accountHolder: text})}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // padding: '5%',
                //justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingBottom: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //padding: '5%',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  // backgroundColor: '#ff0',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    {
                      //backgroundColor: '#f00'
                    }
                  }>
                  <Text
                    style={{
                      paddingRight: '5%',
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    계좌번호
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#E6E6E6',
                  }}>
                  <TextInput
                    style={{width: 190, height: 20}}
                    value={bankInfo.accountNumber}
                    onChangeText={text => setBankInfo({...bankInfo, accountNumber: text})}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                //padding: '5%',
                alignItems: 'center',
                width: '100%',
                paddingBottom: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //padding: '5%',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  // backgroundColor: '#ff0',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    {
                      //backgroundColor: '#f00'
                    }
                  }>
                  <Text
                    style={{
                      paddingRight: '5%',
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    주민등록번호
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#E6E6E6',
                  }}>
                  <TextInput
                    style={{width: 160, height: 20}}
                    value={bankInfo.personalId}
                    onChangeText={text => setBankInfo({...bankInfo, personalId: text})}
                    secureTextEntry
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                //padding: '5%',
                alignItems: 'center',
                width: '100%',
                paddingBottom: '5%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //padding: '5%',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  // backgroundColor: '#ff0',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    {
                      //backgroundColor: '#f00'
                    }
                  }>
                  <Text
                    style={{
                      paddingRight: '5%',
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    전화번호
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#E6E6E6',
                  }}>
                  <TextInput
                    style={{width: 190, height: 20}}
                    value={bankInfo.phoneNumber}
                    onChangeText={text => setBankInfo({...bankInfo, phoneNumber: text})}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.btnText}>가입 신청 완료</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  rootWrapper:
    Platform.OS === 'android'
      ? {
          display: 'flex',
          backgroundColor: 'white',
          width: '100%',
          flex: 1,
          paddingLeft: '3%',
          paddingRight: '3%',
        }
      : {
          display: 'flex',
          backgroundColor: 'white',
          width: '100%',
          flex: 1,
          paddingLeft: '5%',
          paddingRight: '5%',
        },
  welcomeTitleWrap:
    Platform.OS === 'android'
      ? {
          width: WINDOW_WIDTH * 0.9,
          justifyContent: 'center',
          //height: WINDOW_HEIGHT * 0.1,
          flex: 1,
          marginTop: '2%',
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
    width: '100%',
    alignItems: 'center',
    //    justifyContent: 'center',
    //minHeight: 200,
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
    width: WINDOW_WIDTH,
    alignItems: 'center',
    flex: 1,
    minHeight: 300,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#F8F8FA',
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
    //backgroundColor: '#ff0',
    //width: '90%',
    maxHeight: 230,
    paddingTop: '2%',
    //marginBottom: 10,
    justifyContent: 'center',
  },
  payAmountWrap: {
    alignItems: 'center',
    //backgroundColor: '#ff0',
    width: '70%',
    maxHeight: 230,
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
    fontSize: responsiveFontSize(1.6),
    color: '#000',
    marginBottom: '1%',
  },
  payMent:
    Platform.OS === 'ios'
      ? {
          fontSize: responsiveFontSize(1.6),
          color: '#000',
          marginBottom: '1%',
          letterSpacing: -1,
        }
      : {
          fontSize: responsiveFontSize(1.5),
          color: '#000',
          marginBottom: '1%',
          letterSpacing: -1,
        },
  addButton: {width: 20, height: 20},
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
  exposeLocText: {
    fontSize: responsiveFontSize(1.8),
  },
  addLocIcon: {
    width: 10,
    height: 10,
  },
  basicFeeTxt: {
    fontSize: responsiveFontSize(1.4),
  },
});
