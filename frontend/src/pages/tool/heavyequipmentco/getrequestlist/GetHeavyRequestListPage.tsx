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
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
import GetHeavyRequestListStatusCard from './GetHeavyRequestListStatusCard';
import ToolRentNavPopup from '@/pages/popup/ToolRentNavPopup';
import {useAuth} from '@/context/AuthContext';
import {get} from '@/utils/api';

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

export default function GetHeavyRequestListPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const {auth} = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const router = useRoute<any>();
  const navigation = useNavigation<any>();

  const fetchRequests = async () => {
    try {
      // For now we fetch all available, in real app we might fetch user's company info to filter
      const data = await get('/tool-requests/available');
      setRequests(data);
    } catch (error: any) {
      console.error('Failed to fetch available tool requests:', error);
      Alert.alert('오류', '목록을 불러오는데 실패했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [])
  );

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.7}}>
          업체에서 장비를 요청한 내역 입니다
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 20,
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
              snapToInterval={Dimensions.get('window').width}
              snapToAlignment="start"
              style={{
                width: '100%',
                marginTop: '5%',
              }}
              showsHorizontalScrollIndicator={false}
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
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: WINDOW_HEIGHT * 0.03,
                  }}>
                  <GetHeavyRequestListStatusCard
                    requestId={item._id}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    region={item.region}
                    heavyType={item.heavyType}
                    carType={item.carType}
                    notes={item.notes}
                    onRefresh={fetchRequests}
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
            <Text>요청된 장비 임대 내역이 없습니다.</Text>
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
              letterSpacing: -1,
              fontWeight: '600',
            }}>
            시공업체스케줄 안내문
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
                fontSize: responsiveFontSize(2),
                letterSpacing: -1,
              }}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params?.popupOpen && (
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
