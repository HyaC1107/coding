import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {post} from '@/utils/api';
import {useAuth} from '@/context/AuthContext';

export default function ReviewWrite(): JSX.Element {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {companyId, requestId, companyName} = route.params || {};
  const {auth} = useAuth();

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('알림', '리뷰 내용을 입력해주세요.');
      return;
    }

    if (!companyId || !requestId) {
      Alert.alert('오류', '필수 정보가 누락되었습니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      await post('/reviews', {
        companyId,
        requestId,
        rating,
        content,
      });
      Alert.alert('알림', '리뷰가 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('오류', error.message || '리뷰 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: 'white',
          padding: '5%',
          alignItems: 'center',
        }}>
        <Image source={require('@/assets/images/hanmaum.png')} />
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            fontWeight: 'bold',
            paddingTop: '4%',
          }}>
          {companyName || companyId || '한마음인테리어'}
        </Text>
        <View
          style={{
            paddingTop: '10%',
            width: WINDOW_WIDTH * 0.5,
            alignItems: 'center',
            borderBottomColor: '#A8A8A8',
            borderBottomWidth: 1,
            paddingBottom: '1%',
          }}>
          <TextInput
            placeholder="작업내용을 입력해주세요"
            style={
              Platform.OS === 'ios'
                ? {fontSize: responsiveFontSize(1.6)}
                : {
                    fontSize: responsiveFontSize(1.6),
                    textAlignVertical: 'bottom',
                    paddingVertical: 0,
                  }
            }
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: '5%',
          paddingBottom: '2%',
          paddingRight: '5%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            //backgroundColor: '#ff0',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image source={require('@/assets/images/dummythum.png')} />
            <Text style={{fontSize: responsiveFontSize(1.6)}}>{auth?.nickname || '사용자'}</Text>
          </View>
          <View>
            <Text
              style={{fontSize: responsiveFontSize(1.6), letterSpacing: -1}}>
              공사기간 2022.04.05~2022.04.06
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: '5%',
          paddingRight: '5%',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 5,
            backgroundColor: '#F8F8F8',
            width: '100%',
            paddingTop: '5%',
            paddingBottom: '5%',
            paddingLeft: '3%',
            paddingRight: '3%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View
              style={{
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.15,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#E9EDEF',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('@/assets/images/camera.png')} />
            </View>
            <View
              style={{
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.15,
                borderRadius: 5,
                backgroundColor: '#E9EDEF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('@/assets/images/picture-icon.png')} />
            </View>
            <View
              style={{
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.15,
                borderRadius: 5,
                backgroundColor: '#E9EDEF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('@/assets/images/picture-icon.png')} />
            </View>
            <View
              style={{
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.15,
                borderRadius: 5,
                backgroundColor: '#E9EDEF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('@/assets/images/picture-icon.png')} />
            </View>
            <View
              style={{
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.15,
                borderRadius: 5,
                backgroundColor: '#E9EDEF',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('@/assets/images/picture-icon.png')} />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '5%',
            }}>
            <TextInput
              multiline
              value={content}
              onChangeText={setContent}
              style={{
                width: Dimensions.get('window').width * 0.85,
                height: Dimensions.get('window').width * 0.4,
                backgroundColor: 'white',
                textAlignVertical: 'top',
                padding: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '5%',
          }}>
          <TouchableWithoutFeedback onPress={handleSubmit} disabled={isSubmitting}>
            <View
              style={{
                width: 50,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: isSubmitting ? '#A8A8A8' : '#2CB07B',
              }}>
              <Text style={{color: 'white', fontSize: responsiveFontSize(1.4)}}>
                등록
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
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
});
