import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { useAuth } from '@/context/AuthContext';
import { get, patch, postForm, BASE_URL } from '@/utils/api';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileUpdateForm(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth } = useAuth();
  
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImg, setProfileImg] = useState<any>(null);
  const [existingImg, setExistingImg] = useState<string | null>(null);

  const [warn, setWarn] = useState(false);
  const [warnEmail, setEmailWarn] = useState(false);
  const [warnNickNm, setNickNmWarn] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.userId) return;
      try {
        const data = await get(`/users/${auth.userId}`);
        setUserId(data.userId);
        setEmail(data.email);
        setNickname(data.nickname);
        setPhoneNumber(data.phoneNumber);
        setExistingImg(data.profileImg);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, [auth?.userId]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets[0]) {
      setProfileImg(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    if (!nickname || !phoneNumber || !email) {
      Alert.alert('알림', '모든 정보를 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);

      if (profileImg) {
        formData.append('profileImg', {
          uri: Platform.OS === 'android' ? profileImg.uri : profileImg.uri.replace('file://', ''),
          type: profileImg.type || 'image/jpeg',
          name: profileImg.fileName || 'profile.jpg',
        } as any);
      }

      await postForm(`/users/${auth?.userId}`, formData);
      Alert.alert('성공', '프로필이 수정되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || '프로필 수정에 실패했습니다.';
      Alert.alert('오류', message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: '#f6f6f6', marginTop: 10 }} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.rootWrapper}>
          <TouchableWithoutFeedback onPress={handleImagePick}>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Image 
                style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee' }}
                source={profileImg ? { uri: profileImg.uri } : (existingImg ? { uri: `${BASE_URL}/${existingImg.replace(/\\/g, '/')}` } : require('@/assets/images/07-mypage/02-customer/09-profile.png'))}
              />
              <Text style={{ marginTop: 10, color: '#2CB07B', fontWeight: 'bold' }}>사진 변경</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.inputTitle}>아이디</Text>
            </View>
          </View>
          <View style={styles.textInputWrap}>
            <TextInput style={[styles.textInput, { backgroundColor: '#f9f9f9' }]} value={userId} editable={false} />
          </View>

          <View style={[styles.textInputWrapper, {marginTop: '5%'}]}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.inputTitle}>이메일</Text>
            </View>
          </View>
          <View style={styles.textInputWrap}>
            <TextInput 
              style={styles.textInput} 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.textInputWrapper, {marginTop: '5%'}]}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.inputTitle}>전화번호</Text>
            </View>
          </View>
          <View style={styles.textInputWrap}>
            <TextInput 
              style={styles.textInput} 
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.textInputWrapper, {marginTop: '7%'}]}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.inputTitle}>닉네임</Text>
            </View>
          </View>
          <View style={styles.textInputWrap}>
            <TextInput 
              style={styles.textInput} 
              value={nickname}
              onChangeText={setNickname}
            />
          </View>

          <View style={[styles.buttonWrap, {marginTop: '15%'}]}>
            <TouchableWithoutFeedback onPress={handleUpdate}>
              <View>
                <Text style={styles.loginBtn}>수정완료</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{height: WINDOW_HEIGHT * 0.1, justifyContent: 'center'}}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Text style={{color: '#999', fontSize: responsiveFontSize(1.6)}}>회원탈퇴하기</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%',
  },
  textInputWrapper: {
    height: Dimensions.get('window').height * 0.04,
    width: '100%',
    justifyContent: 'center',
  },
  textInputInfoWrap: {
    paddingLeft: '3%',
  },
  textInputWrap: {
    width: '100%',
    height: 40,
  },
  textInput: {
    borderColor: '#E6E6E6',
    borderWidth: 1,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: WINDOW_WIDTH * 0.5,
    backgroundColor: '#2CB07B',
    height: 45,
  },
  loginBtn: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#333',
  },
});
