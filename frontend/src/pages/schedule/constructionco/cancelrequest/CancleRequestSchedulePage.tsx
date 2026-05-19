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
} from 'react-native';

import styled from 'styled-components/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
import UpdateScheduleCard from '@/pages/schedule/constructionco/cmmn/UpdateScheduleCard';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';
import {get} from '@/utils/api';
import {useAuth} from '@/context/AuthContext';

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

export default function CancleRequestSchedulePage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const [requests, setRequests] = useState<any[]>([]);
  const router = useRoute<any>();
  const navigation = useNavigation<any>();
  const {auth} = useAuth();

  const fetchRequests = useCallback(async () => {
    if (!auth?.userId) return;
    try {
      const cancel = await get('/requests', {companyId: auth.userId, status: 41});
      const update = await get('/requests', {companyId: auth.userId, status: 51});
      setRequests([...cancel, ...update]);
    } catch (e) {
      console.error('Failed to fetch cancel/update requests:', e);
    }
  }, [auth?.userId]);

  useFocusEffect(useCallback(() => { fetchRequests(); }, [fetchRequests]));

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          취소/변경 요청을 표시합니다
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        {requests.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#848484', fontSize: responsiveFontSize(1.8)}}>
              취소/변경 요청이 없습니다.
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={requests}
              horizontal
              snapToInterval={Dimensions.get('window').width + 5}
              snapToAlignment="start"
              style={{width: '100%'}}
              renderItem={({item}) => (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '5%',
                  }}>
                  <UpdateScheduleCard
                    requestId={item._id}
                    status={item.status}
                    customerName={item.customerId}
                    customerAddress={item.region || ''}
                    visitTime={item.confirmedTime || ''}
                    companySchedule={item.confirmedDate || ''}
                    requestedDate={item.updateRequest?.newDate || item.requestedDate || ''}
                    requestedTime={item.updateRequest?.newTime || item.requestedTime || ''}
                    onRefresh={fetchRequests}
                  />
                </View>
              )}
              onScroll={e => {
                const newPage = Math.round(
                  e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
                );
                setPage(newPage);
              }}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            />
            <IndicatorWrapper>
              {requests.map((_, i) => (
                <Indicator key={`indicator_${i}`} focused={i === page} />
              ))}
            </IndicatorWrapper>
          </>
        )}
      </View>
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
              fontWeight: '600',
              fontSize: responsiveFontSize(1.8),
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
            <Image
              style={{width: 18, height: 18}}
              source={require('@assets/images/08-company/09-schedulbtn.png')}
            />
            <Text
              style={{
                fontWeight: '600',
                paddingLeft: '5%',
                fontSize: responsiveFontSize(2),
              }}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params.popupOpen && (
        <ScheduleNavPopup handlePopup={handlePopup} />
      )}
      {/* <ConstructionRequestCalendarPopup /> */}
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
