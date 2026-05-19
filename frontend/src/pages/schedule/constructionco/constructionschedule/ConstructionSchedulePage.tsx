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
  Platform,
} from 'react-native';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';
import ConstructionScheduleStatusCard from './ConstructionScheduleStatusCard';
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

export default function ConstructionSchedulePage(): JSX.Element {
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
        status: 32
      });
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch construction schedule:', error);
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
          고객님이 시공요청 한 날짜를 표기합니다
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
                    paddingTop: WINDOW_HEIGHT * 0.05,
                  }}>
                  <ConstructionScheduleStatusCard
                    requestId={item._id}
                    customerName={item.customerId?.name || '고객님'}
                    customerAddress={item.region || ''}
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
            <Text>수락된 방문 요청이 없습니다.</Text>
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
