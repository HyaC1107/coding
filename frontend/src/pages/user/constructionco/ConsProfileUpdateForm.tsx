import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@/constants/context';
import { useAuth } from '@/context/AuthContext';
import { get, postForm, BASE_URL } from '@/utils/api';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ConsProfileUpdateForm(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth } = useAuth();
  
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImg, setProfileImg] = useState<any>(null);
  const [existingImg, setExistingImg] = useState<string | null>(null);

  const [warn, setWarn] = useState(false);
  const [warnEmail, setEmailWarn] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!auth?.userId) return;
      try {
        const data = await get(`/companies/${auth.userId}`);
        setCompanyName(data.companyName);
        setEmail(data.userId?.email || '');
        setPhoneNumber(data.userId?.phoneNumber || '');
        setExistingImg(data.profileImg);
      } catch (error) {
        console.error('Failed to fetch company profile:', error);
      }
    };
    fetchCompany();
  }, [auth?.userId]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets[0]) {
      setProfileImg(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    if (!companyName || !phoneNumber || !email) {
      Alert.alert('알림', '모든 정보를 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);

      if (profileImg) {
        formData.append('profileImg', {
          uri: Platform.OS === 'android' ? profileImg.uri : profileImg.uri.replace('file://', ''),
          type: profileImg.type || 'image/jpeg',
          name: profileImg.fileName || 'profile.jpg',
        } as any);
      }

      await postForm(`/companies/${auth?.userId}`, formData);
      Alert.alert('성공', '업체 정보가 수정되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || '수정에 실패했습니다.';
      Alert.alert('오류', message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.rootWrapper}>
        <TouchableWithoutFeedback onPress={handleImagePick}>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Image 
              style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: '#eee' }}
              source={profileImg ? { uri: profileImg.uri } : (existingImg ? { uri: `${BASE_URL}/${existingImg.replace(/\\/g, '/')}` } : require('@/assets/images/07-mypage/02-customer/09-profile.png'))}
            />
            <Text style={{ marginTop: 10, color: '#2CB07B', fontWeight: 'bold' }}>업체 로고 변경</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <Text style={styles.inputTitle}>업체명</Text>
          </View>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput 
            style={styles.textInput} 
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        <View style={styles.textInputWrapper}>
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

        <View style={styles.textInputWrapper}>
          <View style={styles.textInputInfoWrap}>
            <Text style={styles.inputTitle}>연락처</Text>
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

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback onPress={handleUpdate}>
            <View>
              <Text style={styles.loginBtn}>수정완료</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        
        <View style={{ marginBottom: 40 }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Text style={{color: '#999', fontSize: responsiveFontSize(1.8)}}>회원탈퇴하기</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
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
    height: 40,
    width: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
  textInputInfoWrap: {
    paddingLeft: '3%',
  },
  textInputWrap: {
    width: '100%',
    height: 40,
    marginBottom: 10,
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
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: WINDOW_WIDTH * 0.5,
    backgroundColor: '#000326',
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
