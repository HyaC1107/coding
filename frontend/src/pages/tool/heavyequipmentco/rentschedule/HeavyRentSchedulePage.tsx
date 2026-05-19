import React, {useCallback, useRef, useState} from 'react';
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
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
import ToolRentNavPopup from '@/pages/popup/ToolRentNavPopup';
import HeavyRentScheduleStatusCard from './HeavyRentScheduleStatusCard';
import { useAuth } from '@/context/AuthContext';
import { get } from '@/utils/api';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;

export default function HeavyRentSchedulePage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const [requests, setRequests] = useState<any[]>([]);
  const { auth } = useAuth();
  const router = useRoute<any>();
  const navigation = useNavigation<any>();

  const fetchRequests = async () => {
    try {
      const data = await get('/tool-requests', {
        heavyId: auth?.userId,
        status: 'accepted'
      });
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch accepted tool requests:', error);
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
        <Text style={{fontSize: responsiveFontSize(2)}}>
          임대 확정스케줄 내역 입니다
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
        }}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {requests.length > 0 ? (
          requests.map((item, idx) => (
            <View
              key={item._id || idx}
              style={{
                width: Dimensions.get('window').width,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: WINDOW_HEIGHT * 0.03,
                marginTop: idx === 0 ? '5%' : 0
              }}>
              <HeavyRentScheduleStatusCard
                requestId={item._id}
                constructorName={item.constructorId?.companyName || '시공업체'}
                region={item.region}
                startDate={item.startDate}
                endDate={item.endDate}
                carType={item.carType}
                onRefresh={fetchRequests}
              />
            </View>
          ))
        ) : (
          <View style={{ marginTop: 50 }}>
            <Text>확정된 임대 스케줄이 없습니다.</Text>
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
          <Text style={{color: 'white', fontWeight: '600'}}>
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
            <Text style={{fontWeight: '600', paddingLeft: '5%'}}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params.popupOpen && (
        <ToolRentNavPopup handlePopup={handlePopup} />
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
