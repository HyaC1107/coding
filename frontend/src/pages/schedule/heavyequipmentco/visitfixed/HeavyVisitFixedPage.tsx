import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
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
import VisitFixedStatusCard from './VisitFixedStatusCard';
import HeavyScheduleNavPopup from '@/components/popup/HeavyScheduleNavPopup';
import { useAuth } from '@/context/AuthContext';
import { get } from '@/utils/api';

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

export default function HeavyVisitFixedPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const [requests, setRequests] = useState<any[]>([]);
  const { auth } = useAuth();
  const router = useRoute<any>();
  const navigation = useNavigation<any>();

  const fetchRequests = async () => {
    try {
      const data = await get('/requests', {
        companyId: auth?.userId,
        status: 33
      });
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch fixed requests:', error);
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
      <View
        style={{
          height: '9%',
          backgroundColor: 'white',
          padding: '2%',
          alignItems: 'center',
          marginBottom: '2%',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: responsiveFontSize(2)}}>
          고객님에게 방문 할 날짜를 표시합니다
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          {requests.length > 0 ? (
            <>
              <FlatList
                data={requests}
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 10,
                }}
                snapToInterval={Dimensions.get('window').width * 0.9 + 5}
                snapToAlignment="start"
                style={{
                  width: '100%',
                }}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: Dimensions.get('window').width * 0.9,
                      height: 'auto',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingTop: WINDOW_HEIGHT * 0.05,
                    }}>
                    <VisitFixedStatusCard
                      requestId={item._id}
                      customerName={item.customerId?.name || '고객님'}
                      customerAddress={item.region || ''}
                      detailAddress={item.detailAddress || ''}
                      visitTime={`${item.requestedDate} ${item.requestedTime}`}
                      onRefresh={fetchRequests}
                    />
                  </View>
                )}
                onScroll={e => {
                  Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                    useNativeDriver: false,
                  });
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
          ) : (
            <View style={{ marginTop: 50 }}>
              <Text>확정된 일정이 없습니다.</Text>
            </View>
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
      </View>
      {router.params.popupOpen && (
        <HeavyScheduleNavPopup handlePopup={handlePopup} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
});
