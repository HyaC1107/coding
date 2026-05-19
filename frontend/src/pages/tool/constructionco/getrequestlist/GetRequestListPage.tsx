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
import GetRequestListStatusCard from './GetRequestListStatusCard';
import ConsToolRentNavPopup from '@/components/popup/ConsToolRentNavPopup';
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

export default function GetRequestListPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const {auth} = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const router = useRoute<any>();
  const navigation = useNavigation<any>();

  const fetchRequests = async () => {
    try {
      const data = await get('/tool-requests', {
        constructorId: auth?.userId,
      });
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch tool requests:', error);
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
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.5}}>
          중장비 임대견적내역 입니다
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
              snapToInterval={Dimensions.get('window').width * 0.85 + 20}
              snapToAlignment="start"
              showsHorizontalScrollIndicator={false}
              onScroll={e => {
                const newPage = Math.round(
                  e.nativeEvent.contentOffset.x / (Dimensions.get('window').width * 0.85),
                );
                setPage(newPage);
              }}
              renderItem={({item}) => (
                <View
                  style={{
                    width: Dimensions.get('window').width * 0.85,
                    marginHorizontal: 10,
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: WINDOW_HEIGHT * 0.045,
                  }}>
                  <GetRequestListStatusCard
                    requestId={item._id}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    region={item.region}
                    heavyType={item.heavyType}
                    carType={item.carType}
                    status={item.status}
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
            <Text>임대 요청 내역이 없습니다.</Text>
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
              letterSpacing: -1,
            }}>
            중장비스케줄 안내문
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
                letterSpacing: -1,
              }}>
              스케줄관리
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {router.params?.popupOpen && (
        <ConsToolRentNavPopup handlePopup={handlePopup} />
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
