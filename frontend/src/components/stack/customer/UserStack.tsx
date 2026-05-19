import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import Main from '@/pages/main/customer/Main';
import FindService from '@/pages/pick/FindService';
import CustomHeader from '@/components/header/CustomHeader';
import * as ReactNativeStack from '@react-navigation/native-stack';
import MyPage from '@/pages/user/customer/MyPage';
import Notice from '@/pages/user/customer/Notice';
import PickPage from '@/pages/user/customer/PickPage';
import ReviewMgmt from '@/pages/user/customer/ReviewMgmt';
import FrequentQnA from '@/pages/user/customer/FrequentQnA';
import QnAEnrollPage from '@/pages/user/customer/QnAEnrollPage';
import ProfileUpdate from '@/pages/user/customer/ProfileUpdate';
import ProfileUpdateForm from '@/pages/user/customer/ProfileUpdateForm';
import ReviewWrite from '@/pages/schedule/customer/ReviewWrite';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();

type UserStackParamList = {
  Mypage: {};
  Notice: {};
  PickPage: {};
  ReviewMgmt: {};
  FrequentQnA: {};
  QnAEnrollPage: {};
  ProfileUpdate: {};
  ProfileUpdateForm: {};
  ReviewWrite: {};
};
const Stack = ReactNativeStack.createNativeStackNavigator<UserStackParamList>();

const UserStack = () => {
  const router = useRoute<any>();

  useEffect(() => {
    console.log(router.params);
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        // initialParams={}
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: false,
        }}
        component={MyPage}
      />
      <Stack.Screen
        name="Notice"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          //240214
          headerShown: true,
          header: () => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <CustomHeader
                title={
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.headerTitleStyle}>
                      공지사항
                    </Text>
                  </View>
                }
                isLogin={true}
              />
            </View>
          ),
        }}
        component={Notice}
      />
      <Stack.Screen
        name="ProfileUpdateForm"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: true,
          header: () => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <CustomHeader
                title={
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.headerTitleStyle}>
                      회원정보수정하기
                    </Text>
                  </View>
                }
                isLogin={true}
              />
            </View>
          ),
        }}
        component={ProfileUpdateForm}
      />
      <Stack.Screen
        name="ProfileUpdate"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: true,
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headerTitleStyle}>회원정보수정하기</Text>
                </View>
              }
              isLogin={true}
            />
          ),
        }}
        component={ProfileUpdate}
      />
      <Stack.Screen
        name="QnAEnrollPage"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: true,
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headerTitleStyle}>1:1문의하기</Text>
                </View>
              }
              isLogin={true}
            />
          ),
        }}
        component={QnAEnrollPage}
      />
      <Stack.Screen
        name="ReviewWrite"
        options={{
          title: '',
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headerTitleStyle}>리뷰</Text>
                </View>
              }
              isLogin={false}
            />
          ),
        }}
        component={ReviewWrite}
      />

      <Stack.Screen
        name="FrequentQnA"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: true,
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headerTitleStyle}>자주묻는질문</Text>
                </View>
              }
              isLogin={true}
            />
          ),
        }}
        component={FrequentQnA}
      />
      <Stack.Screen
        name="ReviewMgmt"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: true,
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headerTitleStyle}>전체</Text>
                  <Image source={require('@/assets/images/open0.5.png')} />
                </View>
              }
              isLogin={false}
            />
          ),
        }}
        component={ReviewMgmt}
      />
      <Stack.Screen
        name="PickPage"
        options={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerShown: true,
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.headerTitleStyle}>전체</Text>
                  <Image source={require('@/assets/images/open0.5.png')} />
                </View>
              }
              isLogin={false}
            />
          ),
        }}
        component={PickPage}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
const styles = StyleSheet.create({
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
