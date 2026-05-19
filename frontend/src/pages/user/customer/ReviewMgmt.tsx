import React, {useCallback, useState} from 'react';
import {
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

import {useFocusEffect, useNavigation} from '@react-navigation/native';

import CreateReviewSuccessPopup from '@/components/popup/CreateReviewSuccessPopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useAuth} from '@/context/AuthContext';
import {get} from '@/utils/api';

export default function ReviewMgmt(): JSX.Element {
  const navigation = useNavigation<any>();
  const {auth} = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!auth?.userId) return;
    setIsLoading(true);
    try {
      const data = await get(`/reviews?customerId=${auth.userId}`);
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            width: Dimensions.get('window').width,
            padding: '5%',
          }}>
          <FlatList
            horizontal={false}
            data={reviews}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              !isLoading ? (
                <View style={{alignItems: 'center', paddingTop: 50}}>
                  <Text style={{color: '#656565'}}>작성한 리뷰가 없습니다.</Text>
                </View>
              ) : null
            }
            renderItem={({item, index}) => (
              <View
                key={item._id}
                style={{
                  width: Dimensions.get('window').width - 30,
                  justifyContent: 'center',
                  paddingBottom: '5%',
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '2%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image source={require('@assets/images/review-thum-1.png')} />
                    <Text
                      style={{
                        paddingLeft: '2%',
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      {item.companyId || '업체'}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '40%',
                      alignItems: 'flex-end',
                      paddingRight: '1%',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.4),
                        letterSpacing: -1,
                      }}>
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingBottom: '5%',
                    borderRadius: 5,
                    backgroundColor: '#F6F6F6',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 30,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <TouchableWithoutFeedback
                      style={{width: 200, height: '100%'}}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.2),
                          color: '#656565',
                        }}>
                        수정
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 100,
                        height: 100,
                        marginRight: '5%',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 100,
                        height: 100,
                        marginRight: '5%',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 50,
                        height: 100,
                        marginRight: '5%',
                      }}></View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      paddingTop: '5%',
                      paddingBottom: '5%',
                    }}>
                    <Text style={{fontSize: responsiveFontSize(1.4)}}>
                      {item.content}
                    </Text>
                  </View>
                  {/* Since backend doesn't seem to support owner comments in the simple model, 
                      I'll omit it or keep it as optional placeholder if I had evidence it existed.
                      Based on review model, there's no comment field. */}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {/* <CreateReviewPopup /> */}
      {/* <CreateReviewSuccessPopup /> */}
    </View>
  );
}
