import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';

import styled, {css} from 'styled-components/native';

import {
  RouteProp,
  StackNavigationState,
  TypedNavigator,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import SchedulePopup from '@/pages/popup/SchedulePopup';
import StateCard from '@/components/card/StateCard';
import StateUpdateCard from '@/components/card/StateUpdateCard';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {get} from '@/utils/api';
import {AuthContext} from '@/context/AuthContext';

export default function SchedulePage(): JSX.Element {
  const navigation = useNavigation<any>();
  const router = useRoute<any>();
  const {userId} = useContext(AuthContext);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await get('/requests', {customerId: userId});
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [userId])
  );

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };

  const renderCard = (el: any, i: number) => {
    const commonProps = {
      key: el._id || i,
      storeName: el.companies?.[0]?.companyId?.companyName || el.companies?.[0]?.companyId?.name || '업체명 없음',
      date: el.requestedDate,
      time: el.requestedTime,
      requestId: el._id,
      onRefresh: fetchRequests,
    };

    // Mapping backend status to UI state
    // 31: 업체 확인 대기 중 -> state 1 (선정중)
    // 32: 업체 답변 대기 중 -> state 2 (조율중)
    // 33: 방문 일정 확정 -> state 3 (취소가능)
    // 34: 시공 완료 -> state 21 (완료)
    // 41: 취소 요청 중 -> state 32 (StateUpdateCard)
    // 51: 일정 변경 요청 중 -> state 31 (StateUpdateCard)

    if (el.status === 41) {
      return <StateUpdateCard {...commonProps} state={32} />;
    }
    if (el.status === 51) {
      return <StateUpdateCard {...commonProps} state={31} />;
    }
    
    let uiState = 1;
    if (el.status === 31) uiState = 1;
    else if (el.status === 32) uiState = 2;
    else if (el.status === 33) uiState = 3;
    else if (el.status === 34) uiState = 21;
    else if (el.status === 42) uiState = 4; // Or something else for cancelled

    return (
      <View key={commonProps.key} style={{marginBottom: 20, alignItems: 'center'}}>
        <StateCard {...commonProps} state={uiState} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -1}}>
          업체에서 확인하고 있습니다
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: '20%',
          paddingTop: '5%',
        }}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="#416292" style={{marginTop: 20}} />
        ) : requests.length > 0 ? (
          requests.map((el: any, i: number) => renderCard(el, i))
        ) : (
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text>진행 중인 일정이 없습니다.</Text>
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
              fontWeight: '600',
              fontSize: responsiveFontSize(1.8),
            }}>
            스케줄 안내문
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SetServiceTime')}>
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
            <Image source={require('@/assets/images/scheduleler0.5.png')} />
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
      {router.params?.popupOpen && <SchedulePopup handlePopup={handlePopup} />}
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
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
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor: '#ff0',
    position: 'relative',
    paddingBottom: '5%',
  },

  // font Style1 : 예약중
  // font Style2 : 예약완료
  // font Style3 : 예약불가
  // fontStyle1Wrap: 예약중, 예약완료 wrap
  // fontStyleOtherWrap: 예약불가wrap
  fontaStyle1Wrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    alignItems: 'center',
  },
});
