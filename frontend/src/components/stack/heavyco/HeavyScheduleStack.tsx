import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
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
import VisitRequestPage from '@/pages/schedule/constructionco/visitrequest/VisitRequestPage';
// import VisitRequestPage from '@/pages/schedule/heavyequipmentco/VisitRequestPage';
import VisitFixedPage from '@/pages/schedule/constructionco/visitfixed/VisitFixedPage';
import ConstructionRequestPage from '@/pages/schedule/constructionco/constructionrequest/ConstructionReqestPage';
import ConstructinoSchedulePage from '@/pages/schedule/constructionco/constructionschedule/ConstructionSchedulePage';
import CancleRequestSchedulePage from '@/pages/schedule/constructionco/cancelrequest/CancleRequestSchedulePage';
import ConstructionFinishPage from '@/pages/schedule/constructionco/constructionfinish/ConstructionFinishPage';
import ScheduleMgmtPage from '@/pages/schedule/constructionco/schedulemgmt/ScheduleMgmtPage';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import HeavyVisitRequestPage from '@/pages/schedule/heavyequipmentco/visitrequest/HeavyVisitRequestPage';
import HeavyScheduleMgmtPage from '@/pages/schedule/heavyequipmentco/schedulemgmt/HeavyScheduleMgmtPage';
import HeavyConstructionFinishPage from '@/pages/schedule/heavyequipmentco/constructionfinish/HeavyConstructionFinishPage';
import HeavyCancleRequestSchedulePage from '@/pages/schedule/heavyequipmentco/cancelrequest/HeavyCancleRequestSchedulePage';
import HeavyConstructionSchedulePage from '@/pages/schedule/heavyequipmentco/constructionschedule/HeavyConstructinoSchedulePage';
import HeavyConstructionRequestPage from '@/pages/schedule/heavyequipmentco/constructionrequest/HeavyConstructionRequestPage';
/* 시공업체 avigatoion.Tab에서 고객관리 스케줄 Tab에 적용 */
/* 고객관리 스케줄 Stack */
type ShecduleStackParamList = {
  HeavyVisitRequestPage: {}; // 견적요청
  //   HeavyVisitFixedPage: {}; // 방문확정페이지
  HeavyConstructionReqestPage: {}; //임대요청
  HeavyConstructionSchedulePage: {}; //임대스케줄
  HeavyCancleRequestSchedulePage: {}; //임대취소요청
  HeavyConstructionFinishPage: {}; //임대완료
  HeavyScheduleMgmtPage: {}; //예약관리
};
const Stack =
  ReactNativeStack.createNativeStackNavigator<ShecduleStackParamList>();

const HeavyScheduleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HeavyVisitRequestPage"
        initialParams={{headerValue: '견적요청', popupOpen: false}}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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
        component={HeavyVisitRequestPage}
      />
      <Stack.Screen
        name="HeavyScheduleMgmtPage"
        initialParams={{headerValue: '예약관리', popupOpen: false}}
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
        component={HeavyScheduleMgmtPage}
      />
      <Stack.Screen
        name="HeavyConstructionFinishPage"
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
        component={HeavyConstructionFinishPage}
      />
      <Stack.Screen
        name="HeavyCancleRequestSchedulePage"
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
        component={HeavyCancleRequestSchedulePage}
      />

      <Stack.Screen
        name="HeavyConstructionSchedulePage"
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
        component={HeavyConstructionSchedulePage}
      />
      <Stack.Screen
        name="HeavyConstructionReqestPage"
        initialParams={{headerValue: '임대요청', popupOpen: false}}
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
        component={HeavyConstructionRequestPage}
      />
      {/* <Stack.Screen
        name="VisitFixedPage"
        initialParams={{headerValue: '방문확정', popupOpen: false}}
        options={{
          title: '',
          headerShown: true,
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
              isLogin={true}
            />
          ),
        }}
        component={VisitFixedPage}
      /> */}
    </Stack.Navigator>
  );
};

export default HeavyScheduleStack;
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
