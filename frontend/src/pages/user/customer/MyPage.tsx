import React, {useCallback, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { useAuth } from '@/context/AuthContext';
import { get, BASE_URL } from '@/utils/api';

export default function MyPage(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    if (!auth?.userId) return;
    try {
      setIsLoading(true);
      const data = await get(`/users/${auth.userId}`);
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [auth?.userId]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }, [fetchUserData])
  );

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  if (isLoading && !userData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#2CB07B" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#F9F9F9',
          alignItems: 'center',
          padding: '5%',
          marginTop: '10%',
        }}>
        <View
          style={{
            position: 'absolute',
            right: 20,
            top: 10,
          }}>
          <TouchableWithoutFeedback onPress={handleLogout}>
            <Text style={{ fontSize: 12, color: '#656565' }}>로그아웃</Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            gap: 20,
          }}>
          <View
            style={{
              position: 'relative',
            }}>
            <Image
              style={
                Platform.OS === 'android' ?
              {
                borderRadius: 30,
                width: 60,
                height: 60,
              }:
              {
                width: 60,
                height: 60,
                borderWidth:1, 
                borderRadius:30, 
                borderColor:"white"
              }
              }
              source={userData?.profileImg ? { uri: `${BASE_URL}/${userData.profileImg.replace(/\\/g, '/')}` } : require('@/assets/images/07-mypage/02-customer/09-profile.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text
              style={
                Platform.OS === 'android'
                  ? {
                      color: '#000',
                      fontWeight: 'bold',
                      paddingBottom: '1%',
                      fontSize: responsiveFontSize(2.4),
                    }
                  : {
                      color: '#000',
                      fontWeight: 'bold',
                      paddingBottom: '1%',
                      fontSize: responsiveFontSize(2.2),
                    }
              }>
              {userData?.nickname || userData?.name || '사용자'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={
                  Platform.OS === 'ios'
                    ? {
                        color: '#000',
                        fontWeight: 'bold',
                        paddingRight: '5%',
                        fontSize: responsiveFontSize(2.2),
                      }
                    : {
                        color: '#000',
                        fontWeight: 'bold',
                        paddingRight: '10%',
                        fontSize: responsiveFontSize(2.4),
                      }
                }>
                {userData?.phoneNumber || '전화번호 없음'}
              </Text>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileUpdate')}>
                <View
                  style={{
                    backgroundColor: '#707070',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: WINDOW_WIDTH * 0.15,
                    height: WINDOW_HEIGHT * 0.025,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: responsiveFontSize(1.2),
                      letterSpacing: -1,
                    }}>
                    정보 수정
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
      <View
        style={
          Platform.OS === 'ios'
            ? {
                width: '100%',
                justifyContent: 'center',
                paddingTop: '10%',
                paddingBottom: '5%',
                paddingLeft: '5%',
                backgroundColor: 'white',
                rowGap: 25,
              }
            : {
                width: '100%',
                justifyContent: 'center',
                paddingTop: '10%',
                paddingBottom: '5%',
                paddingLeft: '5%',
                backgroundColor: 'white',
                rowGap: 32,
              }
        }>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Notice');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '10%',
              gap: 25,
            }}>
            <Image
              style={styles.buttonIcon}
              source={require('@/assets/images/07-mypage/02-customer/03-notice.png')}
            />
            <Text style={styles.butonText}>공지사항</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('PickPage');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '10%',
              gap: 25,
            }}>
            <Image
              style={styles.buttonIcon}
              source={require('@/assets/images/07-mypage/02-customer/12-pick.png')}
            />
            <Text style={styles.butonText}>찜콕</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('ReviewMgmt');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '10%',
              gap: 25,
            }}>
            <Image
              style={styles.buttonIcon}
              source={require('@/assets/images/07-mypage/02-customer/04-review.png')}
            />
            <Text style={styles.butonText}>리뷰관리</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('FrequentQnA');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '10%',
              gap: 25,
            }}>
            <Image
              style={{width: 20.4, height: 26.4}}
              source={require('@/assets/images/07-mypage/02-customer/11-faq.png')}
            />
            <Text style={styles.butonText}>자주 묻는 질문</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('QnAEnrollPage');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '10%',
              gap: 25,
            }}>
            <Image
              style={{width: 20.4, height: 26.4}}
              source={require('@/assets/images/07-mypage/02-customer/02-qna.png')}
            />
            <Text style={styles.butonText}>1:1 문의하기(불편,업체신고 등)</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('ProfileUpdate');
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '10%',
              gap: 25,
            }}>
            <Image
              style={{width: 19.2, height: 26.4}}
              source={require('@/assets/images/07-mypage/02-customer/13-info.png')}
            />
            <Text style={styles.butonText}>회원정보 수정하기</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: '5%',
  },
  butonText: {
    fontSize: responsiveFontSize(2),
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
});
 Applied fuzzy match at line 147.