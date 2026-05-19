import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, View} from 'react-native';
import Main from '../pages/main/customer/Main';
import FindService from '../pages/pick/FindService';
import CustomHeader from './header/CustomHeader';
import PickService from '../pages/pick/PickService';
import * as ReactNativeStack from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import PickServiceDetail from '../pages/pick/PickServiceDetail';
import SchedulePage from '../pages/schedule/customer/SchedulePage';
import PopUp from '../pages/popup/PopUp';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from './stack/customer/HomeStack';
import ScheduleStack from './stack/customer/ScheduleStack';
import VisitRequestPage from '@/pages/schedule/heavyequipmentco/VisitRequestPage';
import StoreMain from '@/pages/main/constructionco/ConstructionCoMain';
import ConstructionCoMain from '@/pages/main/constructionco/ConstructionCoMain';
import ConCoScheduleStack from './stack/constructionco/ConCoScheduleStack';
import ToolRentReqStack from './stack/constructionco/ToolRentReqStack';
import UserStack from './stack/customer/UserStack';
import ChatList from '@/pages/talk/customer/ChatList';
import HeavyCoMain from '@/pages/main/heavyco/HeavyCoMain';
import HeavyToolRentReqStack from './stack/heavyco/HeavyToolRentReqStack';
import ConstructionChatList from '@/pages/talk/constructionco/ConstructionChatList';
import ConsUserStack from './stack/constructionco/ConsUserStack';
import HeavyScheduleStack from './stack/heavyco/HeavyScheduleStack';

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  NavigatoarTab: {};
  Home: {param: string};
  Login: {userId: string};
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
};
const Stack = ReactNativeStack.createNativeStackNavigator<RootStackParamList>();

export default function HeavyCoNavigatorTab() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2CB07B',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
          backgroundColor: 'white',
          borderTopColor: '#E6E6E6',
        },
        tabBarBadgeStyle: {
          maxWidth: 10,
          maxHeight: 10,
          fontSize: 10,
          lineHeight: 4,
        },
        tabBarItemStyle: {},
      }}>
      <Tab.Screen
        name="홈"
        component={HeavyCoMain}
        options={{
          title: '',
          headerShown: false,
          headerShadowVisible: false,

          tabBarLabel: '홈',
          tabBarIcon: ({focused, size}) => (
            <Image
              style={{width: 19.44, height: 23.328}}
              source={
                focused
                  ? require('@/assets/images/10-doc/10-home-a.png')
                  : require('@/assets/images/10-doc/09-home.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="고객관리스케줄"
        component={HeavyScheduleStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Image
              style={{width: 19.04, height: 20.16}}
              source={
                focused
                  ? require('@/assets/images/10-doc/03-schedule-a.png')
                  : require('@/assets/images/10-doc/03-schedule.png')
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="시공업체스케줄"
        component={HeavyToolRentReqStack}
        options={{
          tabBarLabel: '시공업체스케줄',
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Image
              style={{width: 24.64, height: 21.16}}
              source={
                focused
                  ? require('@/assets/images/10-doc/05-cons-a.png')
                  : require('@/assets/images/10-doc/04-cons.png')
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="TALK"
        component={ConstructionChatList}
        options={{
          tabBarLabel: 'TALK',
          headerShown: true,
          tabBarIcon: ({focused, size}) => (
            <Image
              style={{width: 21, height: 21}}
              source={
                focused
                  ? require('@/assets/images/10-doc/12-talk-a.png')
                  : require('@/assets/images/10-doc/11-talk.png')
              }
            />
          ),
          header: () => (
            <CustomHeader
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>전체</Text>
                  {/* <Image source={require('../assets/images/open0.5.png')} /> */}
                </View>
              }
              isLogin={true}
            />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        initialParams={{userType: 'heavy'}}
        component={ConsUserStack}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({focused, size}) => (
            <Image
              style={{width: 21, height: 21}}
              source={
                focused
                  ? require('@/assets/images/10-doc/02-mypage-a.png')
                  : require('@/assets/images/10-doc/01-mypage.png')
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
