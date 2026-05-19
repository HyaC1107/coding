import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import Main from '@/pages/main/customer/Main';
import FindService from '@/pages/pick/FindService';
import CustomHeader from '@/components/header/CustomHeader';
import * as ReactNativeStack from '@react-navigation/native-stack';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

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
  Main: {};
  Alarm: {};
  FindService: {};
  ServiceIntro: {};
  PickService: {};
  PickServiceDetail: {};
  SetServiceTime: {};
};
const Stack = ReactNativeStack.createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
        name="FindService"
        initialParams={{headerValue: '종합인테리어', popupOpen: false}}
        options={{
          title: '',
          header: (el: any) => (
            <CustomHeader
              title={
                <TouchableWithoutFeedback
                  onPress={() => {
                    el.navigation.setParams({
                      ...el.route.params,
                      popupOpen: true,
                    });
                    console.log(el.route.params);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(2),
                      }}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
            />
          ),
        }}
        component={FindService}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
