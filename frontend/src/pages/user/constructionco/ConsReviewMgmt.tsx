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
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import StateUpdateCard from '@/components/card/StateUpdateCard';
import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';

import ScheduleNavPopup from '@/components/popup/ScheduleNavPopup';
import CoReviewCard, {CoReviewCardProps} from '@/components/card/CoReviewCard';
import SingleRowAlertWithConfirm from '@/components/alert/SingleRowAlertWithConfirm';
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

export default function ConsReviewMgmt(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const {auth} = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [alertOpen, setAlert] = useState(false);
  const [reply, setReplyState] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!auth?.userId) return;
    setIsLoading(true);
    try {
      const data = await get(`/reviews?companyId=${auth.userId}`);
      setReviews(data);
    } catch (error: any) {
      Alert.alert('오류', error.message || '리뷰 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [auth?.userId]);

  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, [fetchReviews])
  );

  const handleData = (data: any, isCommented: boolean, comment: string) => {
    // setData({...data, isCommented: isCommented, comment: comment});
  };
  const handleAlertOpen = () => {
    setAlert(true);
  };
  const handleAlertClose = () => {
    setAlert(false);
  };
  const [isRevised, setReviseState] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <FlatList
            data={reviews}
            horizontal
            keyExtractor={(item) => item._id}
            snapToInterval={Dimensions.get('window').width * 0.9 + 5}
            snapToAlignment="start"
            contentContainerStyle={{
              gap: 10,
              alignItems: 'flex-start',
              paddingTop: '2%',
              //backgroundColor: '#ff0',
            }}
            style={{
              width: '90%',
              // height: WINDOW_HEIGHT * 0.7,
            }}
            ListEmptyComponent={
              !isLoading ? (
                <View style={{width: Dimensions.get('window').width * 0.9, alignItems: 'center', paddingTop: 50}}>
                  <Text style={{color: '#656565'}}>등록된 리뷰가 없습니다.</Text>
                </View>
              ) : null
            }
            renderItem={({item, index}) => {
              return (
                <CoReviewCard
                  index={index}
                  createDt={formatDate(item.createdAt)}
                  thumUrl={require('@assets/images/review-thum-1.png')}
                  storeNm={item.customerId || '고객'}
                  isReviewed={true}
                  review={item.content}
                  isCommented={false}
                  comment={''}
                  handleData={handleData}
                  handleAlertOpen={handleAlertOpen}
                />
              );
            }}
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
          {reviews.length > 0 && !reply && (
            <IndicatorWrapper>
              {Array.from({length: reviews.length}, (_, i) => i).map(i => (
                <Indicator key={`indicator_${i}`} focused={i === page} />
              ))}
            </IndicatorWrapper>
          )}
        </View>
        <View
          style={{
            //   height: WINDOW_HEIGHT * 0.07,
            alignItems: 'center',
            justifyContent: 'flex-end',
            //backgroundColor: '#ff0',
            marginTop: '10%',
          }}>
          {reviews.length > 0 && !reply && (
            <TouchableWithoutFeedback
              onPress={() => {
                //handleAlertOpen();
                setReplyState(true);
                //handleData && handleData(data, !isCommented, comment);
              }}
              style={{width: WINDOW_HEIGHT * 0.05}}>
              <Text
                style={{
                  color: '#2CB07B',
                  fontSize: responsiveFontSize(1.6),
                  fontWeight: '600',
                }}>
                답변하기
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>

        {reply && (
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    width: '100%',
                    padding: '5%',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '53%',
                  }
                : {
                    width: '100%',
                    padding: '5%',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '50%',
                  }
            }>
            <View
              style={{
                width: '100%',
                //padding: '5%',
                borderRadius: 3,
                paddingBottom: '5%',
                paddingLeft: '5%',
                paddingRight: '5%',
                backgroundColor: '#F6F6F6',
              }}>
              <View
                style={{
                  paddingLeft: '1%',
                  width: '100%',
                  height: 50,
                  // paddingTop: '1%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: '1%',
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('@/assets/images/08-company/14-reviewmaster.png')}
                />
                <Text
                  style={{
                    paddingLeft: '5%',
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  사장님
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: WINDOW_HEIGHT * 0.17,
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}>
                <TextInput multiline style={{width: '100%', height: '100%'}} />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  //padding: '5%',
                  paddingTop: '5%',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setReplyState(false);
                    setReviseState(true);
                  }}>
                  <View
                    style={{
                      paddingLeft: '7%',
                      paddingRight: '7%',
                      paddingTop: '3%',
                      paddingBottom: '3%',
                      borderRadius: 8,
                      backgroundColor: '#2CB07B',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: responsiveFontSize(1.2),
                      }}>
                      등록
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        )}
      </View>
      {/* {router.params.popupOpen && (
        <ScheduleNavPopup handlePopup={handlePopup} />
      )} */}
      {alertOpen && (
        <SingleRowAlertWithConfirm
          imgUrl={require('@/assets/images/mypage/review-alert.png')}
          text={'답변을 등록 하시겠습니까?'}
          handleAlertClose={handleAlertClose}
        />
      )}
    </View>
  );
}
