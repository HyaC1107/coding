import React, {useEffect, useState} from 'react';
import {
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

import {useNavigation} from '@react-navigation/native';

import CreateReviewSuccessPopup from '@/components/popup/CreateReviewSuccessPopup';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT} from '@/constants/context';
export interface CoReviewCardProps {
  index: number;
  thumUrl: any;
  storeNm: string;
  createDt: string;
  isReviewed: boolean;
  review?: string;
  comment: string;
  isCommented: boolean;
  handleAlertOpen: () => void;
  handleData?: (data: any, isCommented: boolean, comment: string) => void;
}
export default function CoReviewCard(data: CoReviewCardProps): JSX.Element {
  const {
    index,
    thumUrl,
    storeNm,
    createDt,
    isReviewed,
    review,
    isCommented,
    comment,
    handleData,
    handleAlertOpen,
  } = data;
  const navigation = useNavigation<any>();
  const [cardData, setData] = useState<any>({
    ...data,
  });

  return (
    <View
      style={{
        width: Dimensions.get('window').width - 30,
        justifyContent: 'center',
        //paddingBottom: '5%',
        //backgroundColor: '#ababab',
      }}>
      <View
        style={
          Platform.OS === 'android'
            ? {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                //padding: '5%',
                paddingLeft: '3%',
                paddingRight: '5%',
                paddingTop: '5%',
                paddingBottom: '5%',
                alignItems: 'center',
              }
            : {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: '2%',
                paddingRight: '5%',
                paddingTop: '5%',
                paddingBottom: '5%',
                alignItems: 'center',
              }
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={thumUrl} />
          <Text style={{paddingLeft: '2%', fontSize: responsiveFontSize(1.6)}}>
            {storeNm}
          </Text>
        </View>
        {createDt ? (
          <Text style={{fontSize: responsiveFontSize(1.2)}}>{createDt}</Text>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Review');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text style={{color: '#2CB07B'}}>리뷰남기기</Text>
              <Image source={require('@assets/images/create-review.png')} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <View
        style={
          !isCommented
            ? {
                width: '100%',
                padding: '5%',
                borderRadius: 3,
                backgroundColor: '#F6F6F6',
                //height: WINDOW_HEIGHT * 0.45,
              }
            : {
                width: '100%',
                padding: '5%',
                borderRadius: 3,
                backgroundColor: '#F6F6F6',
              }
        }>
        <TouchableWithoutFeedback>
          <View style={{position: 'absolute', right: 15, top: 10}}>
            <Text style={{fontSize: responsiveFontSize(1.2), color: '#656565'}}>
              수정
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {isReviewed && (
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
        )}
        {isReviewed ? (
          <View
            style={{
              width: '100%',
              paddingTop: '5%',
              paddingBottom: '5%',
            }}>
            <Text
              style={{fontSize: responsiveFontSize(1.4), letterSpacing: -1}}>
              {review}
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
            }}>
            <Text
              style={{fontSize: responsiveFontSize(1.4), letterSpacing: -1}}>
              {review}
            </Text>
          </View>
        )}

        {isCommented && (
          <View
            style={{
              width: '100%',
              padding: '2%',
              paddingBottom: '5%',
              borderRadius: 5,
              backgroundColor: '#FFFFF6',
            }}>
            <View
              style={{
                paddingLeft: '1%',
                width: '100%',
                // paddingTop: '1%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: '1%',
              }}>
              <Image
                style={{
                  position: 'absolute',
                  top: '-70%',
                }}
                source={require('@/assets/images/balloon.png')}
              />
              <Image
                style={{width: 25, height: 25}}
                source={require('@/assets/images/08-company/14-reviewmaster.png')}
              />
              <Text
                style={{paddingLeft: '5%', fontSize: responsiveFontSize(1.6)}}>
                사장님
              </Text>
            </View>
            <Text
              style={{fontSize: responsiveFontSize(1.4), letterSpacing: -1}}>
              감사합니다 무슨일 있으시면 바로 연락주세요 번창하세요 사장님!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
