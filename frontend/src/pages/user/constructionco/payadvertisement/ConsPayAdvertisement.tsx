import React, {useEffect, useRef, useState, useCallback} from 'react';
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
  Alert,
} from 'react-native';
import PopUp from '../../../popup/PopUp';
import {RouteProp, useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import {RootStackParamList} from '@/utils/StackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';
import Location from '@/components/signup/Location';
import LocationUpdate from '@/components/signup/LocationUpdate';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_WIDTH} from '@/constants/context';
import {useAuth} from '@/context/AuthContext';
import {get} from '@/utils/api';

export default function ConsPayAdvertisement(): JSX.Element {
  const navigation = useNavigation<any>();
  const {auth} = useAuth();
  const scrollRef = useRef<any>();
  const pressScrollTab = () => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
  }
  const router = useRoute<RouteProp<RootStackParamList>>();
  const [updateMode, setMode] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchPlans = async () => {
        try {
          const data = await get('/ad/plans');
          setPlans(data);
          if (data && data.length > 0) {
            setSelectedPlan(data[0]);
          }
        } catch (error: any) {
          Alert.alert('오류', error.message || '광고 플랜을 불러오는데 실패했습니다.');
        }
      };
      fetchPlans();
    }, []),
  );

  const basePrice = selectedPlan ? selectedPlan.price : 149000;
  const vat = Math.floor(basePrice * 0.1);
  const totalPrice = basePrice + vat;

  return (
    <SafeAreaView style={styles.rootWrapper}>
      <ScrollView style={styles.rootWrapper}>
        <View style={styles.welcomeTitleWrap}>
          <Text style={styles.greeting}>
            {!updateMode
              ? '현재 적용되어 있는 노출지역 입니다'
              : '광고 노출지역을 수정 합니다'}
          </Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View
            style={
              updateMode
                ? {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingTop: '3%',
                  }
                : {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingTop: '5%',
                  }
            }>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                letterSpacing: -1,
              }}>
              기본 노출지역
            </Text>
            {updateMode && (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Image
                  style={styles.addLocIcon}
                  source={require('@/assets/images/01-login/01-add-button.png')}
                />
                <Text
                  style={{color: '#2CB07B', fontSize: responsiveFontSize(1.6)}}>
                  지역추가
                </Text>
              </View>
            )}
          </View>
          {!updateMode ? (
            <View style={styles.showingLocationExWrap}>
              {/* <Text style={{paddingBottom: '2%'}}>예시</Text> */}
              <LocationUpdate />
              <LocationUpdate />
              <LocationUpdate />
              <LocationUpdate />
              <LocationUpdate />
            </View>
          ) : (
            <View style={styles.showingLocationExWrap}>
              {/* <Text style={{paddingBottom: '2%'}}>예시</Text> */}
              <Location />
              <Location />
              <Location />
              <Location />
              <Location />
            </View>
          )}
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
            style={
              updateMode
                ? {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingTop: '3%',
                  }
                : {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingTop: '5%',
                  }
            }>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                letterSpacing: -1,
              }}>
              추가 노출지역
            </Text>
            {updateMode && (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Image
                  style={styles.addLocIcon}
                  source={require('@/assets/images/01-login/01-add-button.png')}
                />
                <Text
                  style={{color: '#2CB07B', fontSize: responsiveFontSize(1.6)}}>
                  지역추가
                </Text>
              </View>
            )}
          </View>
          <View style={styles.showingLocationExWrap}>
            {/* <Text style={{paddingBottom: '2%'}}>예시</Text> */}
            {!updateMode ? (
              <View
                style={{
                  flexWrap: 'wrap',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: '#ff0',
                }}>
                <LocationUpdate />
                <LocationUpdate />
                <LocationUpdate />
              </View>
            ) : (
              <View
                style={{
                  flexWrap: 'wrap',
                  width: '100%',
                  maxHeight: 220, //240214a
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: '#ff0',
                }}>
                <Location />
                <Location />
                <Location />
                <Location />
                <Location />
                <Location />
                <Location />
                <Location />
                <Location />
                <Location />
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '2%',
            }}>
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
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                letterSpacing: -1,
              }}>
              결제 금액
            </Text>
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
                    letterSpacing: -1,
                  }}>
                  기본금액
                </Text>
                <Text
                  style={{
                    color: '#004BA7',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: '600',
                    letterSpacing: -1,
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
                    letterSpacing: -1,
                  }}>
                  추가금액
                </Text>
                <Text
                  style={{
                    color: '#004BA7',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                    letterSpacing: -1,
                  }}>
                  {(49000).toLocaleString()}원
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
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
                    letterSpacing: -1,
                  }}>
                  {basePrice.toLocaleString()}원
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
                    letterSpacing: -1,
                  }}>
                  {vat.toLocaleString()}원
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
                    letterSpacing: -1,
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
                    letterSpacing: -1,
                  }}>
                  {totalPrice.toLocaleString()}원
                </Text>
              </View>
            </View>
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
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                letterSpacing: -1,
              }}>
              자동출금 은행 선택
            </Text>
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
                  <Text style={styles.accTxt}>은행</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderRadius: 1,
                      borderColor: '#E6E6E6',
                    }}>
                    <TextInput style={styles.selectWrap} />
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
                    <Text style={styles.accTxt}>예금주</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 1,
                        borderColor: '#E6E6E6',
                      }}>
                      <TextInput style={styles.selectWrap} />
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
                  <Text style={styles.accTxt}>계좌번호</Text>
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
                  <TextInput style={{width: 190, height: 20}} />
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
                  <Text style={styles.accTxt}>주민등록번호</Text>
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
                  <TextInput style={{width: 160, height: 20}} />
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
                  <Text style={styles.accTxt}>전화번호</Text>
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
                  <TextInput style={{width: 190, height: 20}} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (updateMode) {
                if (!selectedPlan) {
                  Alert.alert('알림', '선택된 광고 플랜이 없습니다.');
                  return;
                }
                navigation.navigate('ConsPayAdvertisement2', { planId: selectedPlan._id });
                pressScrollTab();
              } else {
                setMode(!updateMode);
              }
            }}>
            <View style={styles.button}>
              <Text style={styles.btnText}>
                {!updateMode ? '광고범위 수정하기' : '다음'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  rootWrapper:
    Platform.OS === 'ios'
      ? {
          // justifyContent: 'center',
          // alignItems: 'center',
          display: 'flex',
          backgroundColor: 'white',
          // flexDirection: 'column',
          width: '100%',
          flex: 1,
          paddingLeft: '6%',
          paddingRight: '6%',
        }
      : {
          // alignItems: 'center',
          display: 'flex',
          backgroundColor: 'white',
          // flexDirection: 'column',
          width: '100%',
          flex: 1,
          paddingLeft: '3%',
          paddingRight: '3%',
        },
  welcomeTitleWrap: {
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
    height: '15%',
    flex: 1.5,
    marginTop: '5%',
    marginBottom: '5%',
  },
  greeting: {
    fontSize: responsiveFontSize(2),
    color: '#000',
    letterSpacing: -0.7,
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
    //backgroundColor: '#ff0',
    //width: '90%',
    maxHeight: 230,
    paddingTop: '2%',
    //marginBottom: 10,
    justifyContent: 'center',
  },
  addLocIcon: {
    width: 10,
    height: 10,
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
  accTxt: {
    paddingRight: '5%',
    fontSize: responsiveFontSize(1.6),
    letterSpacing: -1,
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
  addButton: {
    width: 20,
    height: 20,
  },
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
  basicFeeTxt: {
    fontSize: responsiveFontSize(1.4),
  },
});
