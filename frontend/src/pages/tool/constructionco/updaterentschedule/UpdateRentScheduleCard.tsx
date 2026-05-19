import ProfileCard from '@/components/card/ProfileCard';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
interface VisitCardProps {
  customerName: string;
  customerAddress: string;
  visitTime: string;
  companySchedule: string;
  updateState: number; // 0 : date update, 1 : cancel, 2 : success
  isCanceled?: boolean; // updateSate가 1일때만 사용
}

export default function UpdateRentScheduleCard(
  data: VisitCardProps,
): JSX.Element {
  const {updateState, isCanceled} = data;
  /*
   * scheduleState (스케줄 공사취소, 날짜변경 상태관리 state)
   * default 0 : 취소, 변경으로 상태를 업데이트하지않은상태
   * 1 : 취소상태
   * 2 : 날짜변경상태
   */
  const [scheduleState, setScheduleState] = useState(0);
  /*
   * isOpen (스케줄표 오픈)
   * true : dropdown open
   * false : dropdown close
   */
  const [isOpen, setOpen] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            gap: 15,
            paddingBottom: '5%',
          }}>
          {updateState === 0 && (
            <Text
              style={{
                fontSize: responsiveScreenFontSize(2.6),
                fontWeight: 'bold',
                color: '#2CB07B',
              }}>
              변경된 임대날짜
            </Text>
          )}
          {updateState === 1 && (
            <Text
              style={{
                fontSize: responsiveScreenFontSize(2.4),
                fontWeight: 'bold',
                color: '#F2295F',
              }}>
              중장비업체에게 임대취소 요청중
            </Text>
          )}
          <Text
            style={{
              fontSize: responsiveScreenFontSize(2.4),
              fontWeight: 'bold',
            }}>
            2023년 05월 25일
          </Text>
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    //width: WINDOW_WIDTH * 0.49,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 45,
                    //gap: 10,
                    width: '100%',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    //gap: 15,
                  }
            }>
            <View
              style={
                Platform.OS === 'android'
                  ? {
                      height: '100%',
                      paddingTop: 5,
                      position: 'absolute',
                      left: -20,
                    }
                  : {
                      height: '100%',
                      paddingTop: 5,
                      position: 'absolute',
                      left: 50,
                    }
              }>
              
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2.2),
                  color: '#656565',
                }}>
                  <Image
                style={{width: 12, height: 18}}
                source={require('@/assets/images/03-main-icon/02-upperloc.png')}
              />
                서울시 마포구 마포대로 33
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2.2),
                  color: '#656565',
                }}>
                삼성아파트 305동 101호
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: responsiveScreenFontSize(2),

              color: '#656565',
            }}>
            AM 08:00 ~ PM 17:00
          </Text>
        </View>

        <View
          style={
            updateState !== 2
              ? {
                  width: '100%',
                  alignItems: 'center',
                  gap: 15,
                  paddingTop: '3%',
                }
              : {
                  width: '100%',
                  alignItems: 'center',
                  gap: 15,
                  paddingTop: '3%',
                  paddingBottom: '10%',
                }
          }>
          <ProfileCard />
        </View>

        {!isCanceled && updateState !== 2 && (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.08,
              gap: 2,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Text
                style={{
                  color: '#656565',
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '600',
                }}>
                업체에서 확인중에 있습니다
              </Text>
            </View>
          </View>
        )}
        {isCanceled && (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.08,
              gap: 2,
            }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Text
                  style={{
                    color: '#2CB07B',
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: 'bold',
                  }}>
                  수락
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
        {scheduleState === 2 && (
          <TouchableWithoutFeedback
            onPress={() => {
              setOpen(!isOpen);
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4%',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text style={{fontSize: responsiveFontSize(1.6)}}>
                변경된 날짜 보기
              </Text>
              <Image source={require('@/assets/images/open-schedule.png')} />
            </View>
          </TouchableWithoutFeedback>
        )}
        {isOpen && (
          <View
            style={{
              width: '95%',
              padding: '2%',
              paddingLeft: '3%',
            }}>
            <View
              style={{
                alignItems: 'center',
                gap: 10,
                padding: '3%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: responsiveFontSize(2), fontWeight: 'bold'}}>
                2023년 05월 28일
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: '#656565',
                }}>
                AM 08:00 ~ PM 17:00
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer:
    Platform.OS === 'ios'
      ? {
          width: Dimensions.get('window').width * 0.85,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: WINDOW_HEIGHT * 0.1,
        }
      : {
          width: Dimensions.get('window').width * 0.85,
          borderRadius: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 10,
          borderWidth: 1,
          borderColor: '#e9edef',
          marginBottom: WINDOW_HEIGHT * 0.1,
        },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT * 0.03,
  },
  customerInfoContainer: {
    width: WINDOW_WIDTH * 0.68,
    gap: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imageBox: {},
  infoBox: {
    width: 'auto',
    justifyContent: 'center',
    gap: 2,
  },
  nameAndCopy: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visitTimeBox: {
    width: WINDOW_WIDTH * 0.65,
    height: WINDOW_HEIGHT * 0.17,
    backgroundColor: '#f9f9f9',
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  visitInfo: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    gap: 25,
  },
  modifyVisitTime: {
    width: '25%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyButton: {
    width: '85%',
    height: '90%',
    backgroundColor: '#e9edef',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
