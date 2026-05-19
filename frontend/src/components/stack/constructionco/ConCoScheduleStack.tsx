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

/* 시공업체 avigatoion.Tab에서 고객관리 스케줄 Tab에 적용 */
/* 고객관리 스케줄 Stack */
type ShecduleStackParamList = {
  VisitRequestPage: {}; // 희망방문요청페이지
  VisitFixedPage: {}; // 방문확정페이지
  ConstructionReqestPage: {}; //시공요청
  ConstructionSchedulePage: {}; //시공스케줄
  CancleRequestSchedulePage: {}; //시공취소요청
  ConstructionFinishPage: {}; //시공완료
  ScheduleMgmtPage: {}; //예약관리
};
const Stack =
  ReactNativeStack.createNativeStackNavigator<ShecduleStackParamList>();

const ConCoScheduleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VisitRequestPage"
        initialParams={{headerValue: '희망방문요청', popupOpen: false}}
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
        component={VisitRequestPage}
      />
      <Stack.Screen
        name="ScheduleMgmtPage"
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
        component={ScheduleMgmtPage}
      />
      <Stack.Screen
        name="ConstructionFinishPage"
        initialParams={{headerValue: '시공완료', popupOpen: false}}
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
        component={ConstructionFinishPage}
      />
      <Stack.Screen
        name="CancleRequestSchedulePage"
        initialParams={{headerValue: '시공취소요청', popupOpen: false}}
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
        component={CancleRequestSchedulePage}
      />

      <Stack.Screen
        name="ConstructionSchedulePage"
        initialParams={{headerValue: '시공스케줄', popupOpen: false}}
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
        component={ConstructionRequestPage}
      />
      <Stack.Screen
        name="ConstructionReqestPage"
        initialParams={{headerValue: '시공요청', popupOpen: false}}
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
        component={ConstructinoSchedulePage}
      />
      <Stack.Screen
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
        component={VisitFixedPage}
      />
    </Stack.Navigator>
  );
};

export default ConCoScheduleStack;
const styles = StyleSheet.create({
  headerTitleStyle:
    Platform.OS === 'ios'
      ? {
          paddingRight: '3%',
          marginLeft: '3%',
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
          letterSpacing: -0.7,
        }
      : {
          marginLeft: '3%',
          paddingRight: '3%',
          fontSize: responsiveFontSize(2),
          fontWeight: '800',
          letterSpacing: -0.7,
        },
});
