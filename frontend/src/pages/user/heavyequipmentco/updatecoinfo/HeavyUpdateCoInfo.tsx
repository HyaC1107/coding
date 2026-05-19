import React, {useEffect, useState} from 'react';
import {
  Button,
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

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/utils/StackParamList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import { useAuth } from '@/context/AuthContext';
import { get, BASE_URL } from '@/utils/api';
import { launchImageLibrary } from 'react-native-image-picker';

export default function HeavyUpdateCoInfo(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth } = useAuth();
  
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('');
  const [heavyType, setHeavyType] = useState('');
  const [career, setCareer] = useState('');
  const [carWeight, setCarWeight] = useState('');
  const [email, setEmail] = useState('');
  
  const [images, setImages] = useState<Record<string, any>>({});
  const [existingImages, setExistingImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCompany = async () => {
      if (!auth?.userId) return;
      try {
        const data = await get(`/companies/${auth.userId}`);
        setCompanyName(data.companyName || '');
        setRegion(data.region || '');
        setHeavyType(data.heavyType || '');
        setCareer(data.career?.toString() || '');
        setCarWeight(data.carWeight?.toString() || '');
        setEmail(data.userId?.email || '');
        
        setExistingImages({
          front: data.carFrontImg,
          side: data.carSideImg,
          back: data.carBackImg,
          business: data.businessLicenseImg,
          driver: data.driverLicenseImg,
          carReg: data.carRegistrationImg,
        });
      } catch (error) {
        console.error('Failed to fetch company profile:', error);
      }
    };
    fetchCompany();
  }, [auth?.userId]);

  const handleImagePick = async (key: string) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets[0]) {
      setImages(prev => ({ ...prev, [key]: result.assets![0] }));
    }
  };

  const renderImage = (key: string, label: string) => {
    const selected = images[key];
    const existing = existingImages[key];
    
    return (
      <TouchableWithoutFeedback onPress={() => handleImagePick(key)}>
        <View style={styles.fileUploadBox}>
          {selected || existing ? (
            <Image 
              source={selected ? { uri: selected.uri } : { uri: `${BASE_URL}/${existing?.replace(/\\/g, '/')}` }}
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
            />
          ) : (
            <View style={styles.plus}>
              <Image
                style={styles.addButton}
                source={require('@/assets/images/01-login/01-add-button.png')}
              />
              <Text style={styles.uploadMent}>{label}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.rootWrapper}>
      <ScrollView
        style={styles.rootWrapper}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.welcomeTitleWrap}>
          <Text style={styles.greeting}>
            수정이 필요한 자료를 수정해주세요!
          </Text>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            {renderImage('front', '전면')}
            {renderImage('side', '측면')}
            {renderImage('back', '후면')}
          </View>
          <View>
            <Text style={styles.uploadMent2}>
              차량 번호판이 포함된 전면,후면과 측면 사진을 첨부해주세요!
            </Text>
          </View>
        </View>
        <View style={[styles.greyBodyWrap, styles.marginBottom]}>
          <View style={styles.fileUploadWrap}>
            {renderImage('business', '사업자등록증')}
            {renderImage('driver', '운전면허증')}
            {renderImage('carReg', '자동차등록증')}
          </View>
          <View>
            <Text style={styles.uploadMent2}>
              근접 촬영한 잘 보이는 원본이 필요해요!
            </Text>
          </View>
        </View>
        <View style={styles.greyBodyWrap2}>
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.textInputInfoTxt}>업체명</Text>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} value={companyName} onChangeText={setCompanyName} />
          </View>
          
          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.textInputInfoTxt}>업체 주소</Text>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} value={region} onChangeText={setRegion} />
          </View>

          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.textInputInfoTxt}>크레인 종류</Text>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} value={heavyType} onChangeText={setHeavyType} />
          </View>

          <View style={styles.textInputWrapper}>
            <View style={[styles.careerandCarWeightInfoWrap]}>
              <View style={{width: WINDOW_WIDTH * 0.37, gap: 5}}>
                <Text style={[styles.textInputInfoTxt, {paddingLeft: '6%'}]}>경력(년)</Text>
                <View style={styles.textWrapper}>
                  <TextInput style={styles.TextInput} value={career} onChangeText={setCareer} keyboardType="numeric" />
                </View>
              </View>
              <View style={{width: WINDOW_WIDTH * 0.37, gap: 5}}>
                <Text style={[styles.textInputInfoTxt, {paddingLeft: '6%'}]}>차량 TON</Text>
                <View style={styles.textWrapper}>
                  <TextInput style={styles.TextInput} value={carWeight} onChangeText={setCarWeight} keyboardType="numeric" />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.textInputWrapper}>
            <View style={styles.textInputInfoWrap}>
              <Text style={styles.textInputInfoTxt}>이메일</Text>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <TextInput style={styles.TextInput} value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('HeavyUpdateCoInfo2', {
                companyName, region, heavyType, career, carWeight, email, images
              })
            }>
            <View style={styles.button}>
              <Text style={styles.btnText}>다음</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  welcomeTitleWrap: {
    width: WINDOW_WIDTH * 0.9,
    justifyContent: 'center',
    flex: 1,
    marginBottom: '5%',
    paddingTop: '5%',
  },
  greeting: {
    letterSpacing: -0.7,
    fontSize: responsiveFontSize(2),
    color: '#000',
  },
  greyBodyWrap: {
    width: WINDOW_WIDTH * 0.9,
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    padding: '5%',
    gap: 20,
  },
  greyBodyWrap2: {
    width: WINDOW_WIDTH * 0.9,
    alignItems: 'center',
    gap: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#F8F8FA',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  fileUploadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3%',
    justifyContent: 'space-between',
  },
  marginBottom: {
    marginBottom: '5%',
  },
  fileUploadBox: {
    width: WINDOW_WIDTH * 0.22,
    height: WINDOW_WIDTH * 0.22,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2CB07B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  uploadMent: {
    color: '#999999',
    fontSize: responsiveFontSize(1.2),
  },
  addButton: {
    width: 20,
    height: 20,
  },
  uploadMent2: {
    fontSize: responsiveFontSize(1.6),
    color: '#000',
    letterSpacing: -1,
  },
  buttonWrap: {
    minHeight: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    borderRadius: 100,
    width: WINDOW_WIDTH * 0.5,
    backgroundColor: '#000326',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInputWrapper: {
    width: '100%',
    marginTop: 10,
  },
  textInputInfoWrap: {
    paddingLeft: '3%',
  },
  careerandCarWeightInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textInputInfoTxt: {
    color: '#000',
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderColor: '#2CB07B',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  TextInput: {
    paddingLeft: 10,
    width: '100%',
    height: '100%',
  },
});
