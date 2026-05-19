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
import GetHeavyRequestListPage from '@/pages/tool/heavyequipmentco/getrequestlist/GetHeavyRequestListPage';
import HeavyRentReservListPage from '@/pages/tool/heavyequipmentco/rentreservations/HeavyRentReservListPage';
import HeavyCancelScheduleProfileCard from '@/pages/tool/heavyequipmentco/cancelrentschedule/HeavyCancelScheduleProfileCard';
import HeavyCancelSchedulePage from '@/pages/tool/heavyequipmentco/cancelrentschedule/HeavyCancelSchedulePage';
import HeavyUpdateRentPage from '@/pages/tool/heavyequipmentco/updaterentschedule/HeavyUpdateRentPage';
import HeavyRentSchedulePage from '@/pages/tool/heavyequipmentco/rentschedule/HeavyRentSchedulePage';
import HeavyRentSuccessPage from '@/pages/tool/heavyequipmentco/rentsuccesspage/HeavyRentSuccessPage';

const Tab = createBottomTabNavigator();

//장비요청 Stack
type ToolStackParamList = {
  GetHeavyRequestListPage: {}; // 장비요청
  HeavyRentReservListPage: {}; // 임대예약현황
  HeavyRentSchedulePage: {}; //임대스케줄
  HeavyUpdateRentPage: {}; //임대날짜변경요청
  HeavyCancelSchedulePage: {}; //임대취소요청
  HeavyRentSuccessPage: {}; //임대완료
};
const Stack = ReactNativeStack.createNativeStackNavigator<ToolStackParamList>();

const HeavyToolRentReqStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GetHeavyRequestListPage"
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
        component={GetHeavyRequestListPage}
      />
      <Stack.Screen
        name="HeavyCancelSchedulePage"
        initialParams={{headerValue: '임대취소 요청', popupOpen: false}}
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
                    <Text
                      style={{
                        paddingRight: '5%',
                        fontSize: responsiveFontSize(2),
                        fontWeight: 'bold',
                      }}>
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
        component={HeavyCancelSchedulePage}
      />
      <Stack.Screen
        name="HeavyRentReservListPage"
        initialParams={{headerValue: '임대예약현황', popupOpen: false}}
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
        component={HeavyRentReservListPage}
      />
      <Stack.Screen
        name="HeavyRentSuccessPage"
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
        component={HeavyRentSuccessPage}
      />

      <Stack.Screen
        name="HeavyUpdateRentPage"
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
        component={HeavyUpdateRentPage}
      />
      <Stack.Screen
        name="HeavyRentSchedulePage"
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
        component={HeavyRentSchedulePage}
      />
    </Stack.Navigator>
  );
};

export default HeavyToolRentReqStack;
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
