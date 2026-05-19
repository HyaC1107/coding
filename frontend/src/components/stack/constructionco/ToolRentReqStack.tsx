import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Main from '@/pages/main/customer/Main';
import FindService from '@/pages/pick/FindService';
import CustomHeader from '@/components/header/CustomHeader';
import * as ReactNativeStack from '@react-navigation/native-stack';
import SchedulePage from '@/pages/schedule/customer/SchedulePage';
import ScheduleVisitFix from '@/pages/schedule/customer/ScheduleVisitFix';
import ConstructionSchedule from '@/pages/schedule/customer/ConstructionSchedule';
import ConstructionScheduleUpdate from '@/pages/schedule/customer/ConstructionScheduleUpdate';
import ReviewWrite from '@/pages/schedule/customer/ReviewWrite';
import VisitRequestPage from '@/pages/schedule/heavyequipmentco/VisitRequestPage';
import VisitFixedPage from '@/pages/schedule/constructionco/visitfixed/VisitFixedPage';
import ConstructionRequestPage from '@/pages/schedule/constructionco/constructionrequest/ConstructionReqestPage';
import ConstructinoSchedulePage from '@/pages/schedule/constructionco/constructionschedule/ConstructionSchedulePage';
import ConstructionFinishPage from '@/pages/schedule/constructionco/constructionfinish/ConstructionFinishPage';
import ScheduleMgmtPage from '@/pages/schedule/constructionco/schedulemgmt/ScheduleMgmtPage';
import ToolRequestPage from '@/pages/tool/constructionco/toolrentrequest/ToolReqestPage';
import GetRequestListPage from '@/pages/tool/constructionco/getrequestlist/GetRequestListPage';
import RentSchedulePage from '@/pages/tool/constructionco/rentschedule/RentSchedulePage';
import UpdateRentSchedulePage from '@/pages/tool/constructionco/updaterentschedule/UpdateRentSchedulePage';
import CancelRentSchedulePage from '@/pages/tool/constructionco/cancelrentschedule/CancelRentSchedulePage';
import RentSuccessPage from '@/pages/tool/constructionco/rentsuccesspage/RentSuccessPage';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();

//장비요청 Stack
type ToolStackParamList = {
  ToolReqestPage: {}; // 장비요청
  GetRequestListPage: {}; // 요청보기
  RentSchedulePage: {}; //임대스케줄
  UpdateRentSchedulePage: {}; //임대날짜변경요청
  CancelRentSchedulePage: {}; //임대취소요청
  RentSuccessPage: {}; //임대완료
};
const Stack = ReactNativeStack.createNativeStackNavigator<ToolStackParamList>();

const ToolRentReqStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToolReqestPage"
        initialParams={{headerValue: '장비요청', popupOpen: false}}
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
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/open0.5.png')} />
<Text style={styles.headerTitleStyle}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@/assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
              isLogin={false}
            />
          ),
        }}
        component={ToolRequestPage}
      />
      <Stack.Screen
        name="RentSuccessPage"
        initialParams={{headerValue: '임대완료', popupOpen: false}}
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
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/open0.5.png')} />
<Text style={styles.headerTitleStyle}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@/assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
              isLogin={false}
            />
          ),
        }}
        component={RentSuccessPage}
      />
      <Stack.Screen
        name="CancelRentSchedulePage"
        initialParams={{headerValue: '임대취소요청', popupOpen: false}}
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
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/open0.5.png')} />
<Text style={styles.headerTitleStyle}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@/assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
              isLogin={false}
            />
          ),
        }}
        component={CancelRentSchedulePage}
      />
      <Stack.Screen
        name="UpdateRentSchedulePage"
        initialParams={{headerValue: '임대날짜변경요청', popupOpen: false}}
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
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/open0.5.png')} />
<Text style={styles.headerTitleStyle}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@/assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
              isLogin={false}
            />
          ),
        }}
        component={UpdateRentSchedulePage}
      />
      <Stack.Screen
        name="RentSchedulePage"
        initialParams={{headerValue: '임대스케줄', popupOpen: false}}
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
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/open0.5.png')} />
<Text style={styles.headerTitleStyle}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@/assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
              isLogin={false}
            />
          ),
        }}
        component={RentSchedulePage}
      />
      <Stack.Screen
        name="GetRequestListPage"
        initialParams={{headerValue: '임대견적', popupOpen: false}}
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
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/open0.5.png')} />
<Text style={styles.headerTitleStyle}>
                      {el.route.params.headerValue}
                    </Text>
                    <Image source={require('@/assets/images/open0.5.png')} />
                  </View>
                </TouchableWithoutFeedback>
              }
              isLogin={false}
            />
          ),
        }}
        component={GetRequestListPage}
      />
    </Stack.Navigator>
  );
};

export default ToolRentReqStack;

const styles = StyleSheet.create({
  headerTitleStyle:
    Platform.OS === 'ios'
      ? {
          paddingRight: '5%',
          marginLeft: '5%',
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
          letterSpacing: -0.7,
        }
      : {
          paddingRight: '5%',
          marginLeft: '5%',
          fontSize: responsiveFontSize(2),
          fontWeight: '800',
          letterSpacing: -0.7,
        },
});
