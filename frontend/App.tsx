/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextBase,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from '@/pages/login/Login';
import LoginUserType from '@/pages/login/LoginUserType';
import {
  NavigationContainer,
  ThemeProvider,
  useRoute,
} from '@react-navigation/native';
import * as ReactNativeStack from '@react-navigation/native-stack';
import SignUp from '@/pages/signup/customer/SignUp';
import {RootStackParamList} from '@/utils/StackParamList';
import CustomHeader from '@/components/header/CustomHeader';

import Main from '@/pages/main/customer/Main';
import NavigatorTab from '@/components/NavigatorTab';
import Alarm from '@/pages/main/Alarm';
import FindService from '@/pages/pick/FindService';
import ServiceIntro from '@/pages/pick/ServiceIntro';
import PickService from '@/pages/pick/PickService';
import PickServiceDetail from '@/pages/pick/PickServiceDetail';
import SetServiceTime from '@/pages/pick/SetServiceTime';
import ChatRoom from '@/pages/talk/customer/ChatRoom';
import ChatHeader from '@/components/header/ChatHeader';

import LoginSignupStack from '@/components/stack/customer/LoginSignupStack';
import ConstructionCoNavigatorTab from '@/components/ConstructionCoNavigatorTab';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ConstructionChatRoom from '@/pages/talk/constructionco/ConstructionChatRoom';
import ConsPayAdvertisement from '@/pages/user/constructionco/payadvertisement/ConsPayAdvertisement';
import ConsPayAdvertisement2 from '@/pages/user/constructionco/payadvertisement/ConsPayAdvertisement2';
import ConsPayAdvertisement3 from '@/pages/user/constructionco/payadvertisement/ConsPayAdvertisement3';
import ConsUpdateCoInfo from '@/pages/user/constructionco/updatecoinfo/ConsUpdateCoInfo';
import ConsUpdateCoInfo2 from '@/pages/user/constructionco/updatecoinfo/ConsUpdateCoInfo2';
import HeavyCoNavigatorTab from '@/components/HeavyCoNavigatorTab';
import HeavyPayAdvertisement from '@/pages/user/heavyequipmentco/payadvertisement/HeavyPayAdvertisement';
import HeavyUpdateCoInfo from '@/pages/user/heavyequipmentco/updatecoinfo/HeavyUpdateCoInfo';
import HeavyUpdateCoInfo2 from '@/pages/user/heavyequipmentco/updatecoinfo/HeavyUpdateCoInfo2';
import {setCustomText} from 'react-native-global-props';
import {AuthProvider} from '@/context/AuthContext';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const theme = StyleSheet.create({
  rootTheme: {
    fontFamily: 'NotoSansKR-Regular',
    color: 'white',
  },
});
const customTextProps = {
  style: {
    fontFamily: 'Noto Sans Kr',
  },
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  type RootStackParamList = {
    NavigatoarTab: {};
    ConstructionCoNavigatorTab: {};
    HeavyCoNavigatorTab: {};
    StoreNavigatoarTab: {};
    Home: {};
    LoginStack: {userId: string};
    LoginUserType: {userType: string};
    SignUp: {userType: string};
    SignUpEnterprise: {userType: string};
    SignUpEnterIntro: {userType: string};
    PartnerApplication: {userType: string};
    PartnerApplication2: {userType: string};
    PartnerApplication3: {userType: string};
    SubscriptionCost: {userType: string};
    Agreement: {userType: string};
    SignUpReview: {userType: string};
    SignUpReviewRefused: {userType: string};
    ConfirmSignUp: {userType: string};
    FindAccount: {userType: string};
    Main: {userType: string};
    Alarm: {};
    FindService: {};
    ServiceIntro: {};
    PickService: {};
    PickServiceDetail: {};
    SetServiceTime: {};
    ChatRoom: {};
    ConstructionChatRoom: {};
    ConsPayAdvertisement: {};
    ConsPayAdvertisement2: {};
    ConsPayAdvertisement3: {};
    ConsUpdateCoInfo: {};
    ConsUpdateCoInfo2: {};
    HeavyPayAdvertisement: {};
    HeavyUpdateCoInfo: {};
    HeavyUpdateCoInfo2: {};
  };

  const Stack =
    ReactNativeStack.createNativeStackNavigator<RootStackParamList>();
  const BackImage = () => (
    <Image source={require('@/assets/images/chevron.png')} />
  );

  useEffect(() => {
    //Text
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginStack"
            options={{
              title: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerShown: false,
            }}
            component={LoginSignupStack}
          />
          <Stack.Screen
            name="ConstructionCoNavigatorTab"
            options={{
              title: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
            }}
            component={ConstructionCoNavigatorTab}
          />

          <Stack.Screen
            name="NavigatoarTab"
            options={{
              title: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
            }}
            component={NavigatorTab}
          />
          <Stack.Screen
            name="HeavyCoNavigatorTab"
            options={{
              title: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
            }}
            component={HeavyCoNavigatorTab}
          />
          {/* <Stack.Screen
            name="HeavyCoNavigatorTab"
            options={{
              title: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
            }}
            component={HeavyCoNavigatorTab}
          /> */}

          <Stack.Screen
            name="ServiceIntro"
            options={{
              title: '',
              header: () => (
                <CustomHeader
                  title={
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          fontWeight: 'bold',
                        }}>
                        종합인테리어
                      </Text>
                      <Image source={require('@/assets/images/open0.5.png')} />
                    </View>
                  }
                />
              ),
            }}
            component={ServiceIntro}
          />

          <Stack.Screen
            name="PickService"
            options={{
              title: '',
            }}
            component={PickService}
          />
          <Stack.Screen
            name="PickServiceDetail"
            options={{
              title: '',
              header: el => (
                <CustomHeader
                  title={
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: responsiveFontSize(2),
                        }}></Text>
                      <Image source={require('@/assets/images/open0.5.png')} />
                    </View>
                  }
                />
              ),
            }}
            component={PickServiceDetail}
          />
          <Stack.Screen
            name="SetServiceTime"
            initialParams={{popupOpen: false, headerValue: '선택'}}
            options={{
              header: (el: any) => (
                <CustomHeader
                  title={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        el.navigation.setParams({popupOpen: true});
                        //   console.log(el.route);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Text
                          style={{
                            paddingRight: '2%',
                            fontWeight: 'bold',
                            fontSize: responsiveFontSize(2),
                          }}>
                          {el.route.params?.headerValue}
                        </Text>
                        <Image source={require('@/assets/images/open0.5.png')} />
                      </View>
                    </TouchableWithoutFeedback>
                  }
                />
              ),
            }}
            component={SetServiceTime}
          />
          <Stack.Screen
            name="Main"
            options={{
              title: '',
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
            }}
            component={Main}
          />
          <Stack.Screen
            name="Alarm"
            options={{
              title: '',
              header: () => <CustomHeader title={'알림'} />,
            }}
            component={Alarm}
          />

          {/* 시공업체 광고결제 */}
          <Stack.Screen
            name="ConsPayAdvertisement"
            initialParams={{headerValue: '광고결제', popupOpen: false}}
            options={{
              title: '광고결제',
              header: (el: any) => (
                <CustomHeader
                  title={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        el.navigation.setParams({
                          ...el.route.params,
                          popupOpen: true,
                        });
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.headerTitleStyle}>
                          {el.route.params.headerValue}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  }
                  isLogin={true}
                />
              ),
            }}
            component={ConsPayAdvertisement}
          />
          <Stack.Screen
            name="ConsPayAdvertisement2"
            initialParams={{headerValue: '광고결제', popupOpen: false}}
            options={{
              title: '광고결제',
              header: (el: any) => (
                <CustomHeader
                  title={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        el.navigation.setParams({
                          ...el.route.params,
                          popupOpen: true,
                        });
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.headerTitleStyle}>
                          {el.route.params.headerValue}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  }
                  isLogin={true}
                />
              ),
            }}
            component={ConsPayAdvertisement2}
          />
          <Stack.Screen
            name="ConsPayAdvertisement3"
            initialParams={{headerValue: '광고결제', popupOpen: false}}
            options={{
              title: '광고결제',
              header: (el: any) => (
                <CustomHeader
                  title={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        el.navigation.setParams({
                          ...el.route.params,
                          popupOpen: true,
                        });
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.headerTitleStyle}>
                          {el.route.params.headerValue}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  }
                  isLogin={true}
                />
              ),
            }}
            component={ConsPayAdvertisement3}
          />

          {/* 시공업체 정보 수정요청 */}
          <Stack.Screen
            name="ConsUpdateCoInfo"
            options={{
              title: '업체정보수정요청',
              header: () => <CustomHeader title={'업체정보수정요청'} />,
            }}
            component={ConsUpdateCoInfo}
          />
          <Stack.Screen
            name="ConsUpdateCoInfo2"
            options={{
              title: '업체정보수정요청',
              header: () => <CustomHeader title={'업체정보수정요청'} />,
            }}
            component={ConsUpdateCoInfo2}
          />

          {/* 중장비업체 광고결재 */}
          <Stack.Screen
            name="HeavyPayAdvertisement"
            initialParams={{headerValue: '광고결제', popupOpen: false}}
            options={{
              title: '광고결제',
              header: (el: any) => (
                <CustomHeader
                  title={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        el.navigation.setParams({
                          ...el.route.params,
                          popupOpen: true,
                        });
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.headerTitleStyle}>
                          {el.route.params.headerValue}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  }
                  isLogin={true}
                />
              ),
            }}
            component={HeavyPayAdvertisement}
          />

          {/* 중장비업체 업체정보수정 */}
          <Stack.Screen
            name="HeavyUpdateCoInfo"
            options={{
              title: '업체정보수정요청',
              header: () => <CustomHeader title={'업체정보수정요청'} />,
            }}
            component={HeavyUpdateCoInfo}
          />
          <Stack.Screen
            name="HeavyUpdateCoInfo2"
            options={{
              title: '업체정보수정요청',
              header: () => <CustomHeader title={'업체정보수정요청'} />,
            }}
            component={HeavyUpdateCoInfo2}
          />

          {/* 중장비업체 파트너신청서 */}
          {/* <Stack.Screen
          name="HeavyPartnerApplication"
          options={{
            title: '파트너 신청서',
            header: () => <CustomHeader title={'파트너 신청서'} />,
          }}
          component={HeavyPartnerApplication}
        />
        <Stack.Screen
          name="HeavyPartnerApplication2"
          options={{
            title: '파트너 신청서',
            header: () => <CustomHeader title={'파트너 신청서'} />,
          }}
          component={HeavyPartnerApplication2}
        />
        <Stack.Screen
          name="HeavyPartnerApplication3"
          options={{
            title: '파트너 신청서',
            header: () => <CustomHeader title={'파트너 신청서'} />,
          }}
          component={HeavyPartnerApplication3}
        />

        <Stack.Screen
          name="SignUpReview"
          options={{
            title: '검토중',
            header: () => <CustomHeader title={'검토중'} />,
          }}
          component={SignUpReview}
        />
        <Stack.Screen
          name="SignUpReviewRefused"
          options={{
            title: '검토중',
            header: () => <CustomHeader title={'검토중'} />,
          }}
          component={SignUpReviewRefused}
        />
          */}
          <Stack.Screen
            name="ChatRoom"
            options={{
              title: '채팅룸',
            }}
            component={ChatRoom}
          />
          <Stack.Screen
            name="ConstructionChatRoom"
            options={{
              title: '채팅룸',
            }}
            component={ConstructionChatRoom}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: 'bold',
  },
  background: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleStyle:
    Platform.OS === 'ios'
      ? {
          paddingRight: '5%',
marginLeft:'5%',
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
          letterSpacing: -0.7,
        }
      : {
          paddingRight: '5%',
marginLeft:'5%',
          fontSize: responsiveFontSize(2),
          fontWeight: '800',
          letterSpacing: -0.7,
        },
});

export default App;
