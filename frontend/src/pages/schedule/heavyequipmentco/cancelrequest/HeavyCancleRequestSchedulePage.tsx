import React, {useRef, useState, useCallback} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';

import styled from 'styled-components/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
import ConstructionRequestCalendarPopup from '@/components/popup/ConstructionRequestCalendarPopup';
import UpdateScheduleCard from '@/pages/schedule/constructionco/cmmn/UpdateScheduleCard';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';
import HeavyScheduleNavPopup from '@/components/popup/HeavyScheduleNavPopup';
import HeavyUpdateScheduleCard from '../cmmn/HeavyUpdateScheduleCard';
import {useAuth} from '@/context/AuthContext';
import {get} from '@/utils/api';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;

export default function HeavyCancleRequestSchedulePage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const [requests, setRequests] = useState<any[]>([]);
  const {auth} = useAuth();
  const router = useRoute<any>();
  const navigation = useNavigation<any>();

  const fetchRequests = async () => {
    try {
      // Fetch both cancel (41) and update (51) requests
      const cancelRequests = await get('/requests', {
        companyId: auth?.userId,
        status: 41,
      });
      const updateRequests = await get('/requests', {
        companyId: auth?.userId,
        status: 51,
      });
      setRequests([...cancelRequests, ...updateRequests]);
    } catch (error) {
      console.error('Failed to fetch cancel/update requests:', error);
      Alert.alert('오류', '목록을 불러오는데 실패했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [auth?.userId])
  );

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          임대취소/변경 요청을 표시합니다
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: '10%',
          flexGrow: 1,
        }}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {requests.length > 0 ? (
          <>
            <FlatList
              data={requests}
              horizontal
              snapToInterval={Dimensions.get('window').width * 0.9 + 5}
              snapToAlignment="start"
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              onScroll={e => {
                const newPage = Math.round(
                  e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
                );
                setPage(newPage);
              }}
              renderItem={({item}) => (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: WINDOW_HEIGHT * 0.05,
                  }}>
                  <HeavyUpdateScheduleCard
                    requestId={item._id}
                    status={item.status}
                    customerName={item.customerId?.name || '고객님'}
                    customerAddress={item.region || ''}
                    requestedDate={item.requestedDate}
                    requestedTime={item.requestedTime}
                    companySchedule={item.workContent || ''}
                    onRefresh={fetchRequests}
                    visitTime={''}
                  />
                </View>
              )}
            />
            <IndicatorWrapper>
              {requests.map((_, i) => (
                <Indicator key={`indicator_${i}`} focused={i === page} />
              ))}
            </IndicatorWrapper>
          </>
        ) : (
          <View style={{marginTop: 50}}>
            <Text>취소 또는 변경 요청이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
      <View style={{width: '100%', height: 45, flexDirection: 'row'}}>
        <View
          style={{
            width: '45%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#416292',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(1.8),
              fontWeight: '600',
              letterSpacing: -0.7,
            }}>
            고객관리스케줄 안내문
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            //schedule popup open
          }}>
          <View
            style={{
              width: '55%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: 'white',
              borderTopColor: '#F6F6F6',
              borderTopWidth: 1,
            }}>
            <Image source={require('@assets/images/scheduleler0.5.png')} />
            <Text
              style={{
                fontWeight: '600',
                paddingLeft: '5%',
                letterSpacing: -0.7,
                fontSize: responsiveFontSize(2),
              }}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params?.popupOpen && (
        <HeavyScheduleNavPopup handlePopup={handlePopup} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  scrollWrapper:
    Platform.OS === 'ios'
      ? {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '1%',
          paddingTop: '8%',
        }
      : {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '1%',
        },
});
const styles = StyleSheet.create({
  scrollWrapper:
    Platform.OS === 'ios'
      ? {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '1%',
          paddingTop: '8%',
        }
      : {
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
          marginBottom: '1%',
        },
});
