import React, {useState} from 'react';
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

import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { useAuth } from '@/context/AuthContext';
import { postForm } from '@/utils/api';
import { launchImageLibrary } from 'react-native-image-picker';

export default function HeavyUpdateCoInfo2(): JSX.Element {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { auth } = useAuth();
  
  const [links, setLinks] = useState({
    homepage: '',
    sns: '',
    youtube: ''
  });
  
  const [images, setImages] = useState<Record<string, any>>({});

  const handleImagePick = async (key: string) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets[0]) {
      setImages(prev => ({ ...prev, [key]: result.assets![0] }));
    }
  };

  const handleFinalUpdate = async () => {
    const prevData = route.params || {};
    
    try {
      const formData = new FormData();
      formData.append('companyName', prevData.companyName);
      formData.append('region', prevData.region);
      formData.append('heavyType', prevData.heavyType);
      formData.append('career', prevData.career);
      formData.append('carWeight', prevData.carWeight);
      formData.append('email', prevData.email);
      
      formData.append('homepage', links.homepage);
      formData.append('sns', links.sns);
      formData.append('youtube', links.youtube);

      // Append images from step 1 and step 2
      const allImages = { ...prevData.images, ...images };
      Object.keys(allImages).forEach(key => {
        const img = allImages[key];
        formData.append(key + 'Img', {
          uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
          type: img.type || 'image/jpeg',
          name: img.fileName || `${key}.jpg`,
        } as any);
      });

      await postForm(`/companies/${auth?.userId}`, formData);
      Alert.alert('성공', '업체 정보가 수정되었습니다.', [
        { text: '확인', onPress: () => navigation.navigate('NavigatoarTab') }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || '수정에 실패했습니다.';
      Alert.alert('오류', message);
    }
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
            <TouchableWithoutFeedback onPress={() => handleImagePick('freight')}>
              <View style={styles.fileUploadBox}>
                {images.freight ? (
                  <Image source={{ uri: images.freight.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                ) : (
                  <View style={styles.plus}>
                    <Image style={styles.addButton} source={require('@/assets/images/01-login/01-add-button.png')} />
                    <Text style={styles.uploadMent}>화물운송 자격증</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleImagePick('education')}>
              <View style={styles.fileUploadBox}>
                {images.education ? (
                  <Image source={{ uri: images.education.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                ) : (
                  <View style={styles.plus}>
                    <Image style={styles.addButton} source={require('@/assets/images/01-login/01-add-button.png')} />
                    <Text style={styles.uploadMent}>조종교육 이수증</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={[styles.uploadMent2]}>
              각각의 자격증과 이수증을 첨부해주세요!
            </Text>
          </View>
        </View>

        <View style={styles.greyBodyWrap2}>
          <View style={styles.textInputWrapper}>
            <Text style={styles.textInputInfoTxt}>홈페이지 링크</Text>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              value={links.homepage}
              onChangeText={(text) => setLinks({ ...links, homepage: text })}
              placeholder="개인이 보유한 도메인 URL"
            />
          </View>

          <View style={styles.textInputWrapper}>
            <Text style={styles.textInputInfoTxt}>SNS 링크</Text>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              value={links.sns}
              onChangeText={(text) => setLinks({ ...links, sns: text })}
              placeholder="블로그, 인스타그램 등 URL"
            />
          </View>
          
          <View style={styles.textInputWrapper}>
            <Text style={styles.textInputInfoTxt}>유튜브 링크</Text>
          </View>
          <View style={styles.textWrapper}>
            <TextInput
              style={styles.TextInput}
              value={links.youtube}
              onChangeText={(text) => setLinks({ ...links, youtube: text })}
              placeholder="유튜브 URL"
            />
          </View>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback onPress={handleFinalUpdate}>
            <View style={styles.button}>
              <Text style={styles.btnText}>수정요청</Text>
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
    marginBottom: '5%',
    paddingTop: '5%',
  },
  greeting: {
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
    paddingHorizontal: '5%',
    backgroundColor: '#F8F8FA',
    paddingVertical: '5%',
  },
  fileUploadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WINDOW_WIDTH * 0.5,
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
    fontSize: responsiveFontSize(1.1),
    textAlign: 'center',
  },
  uploadMent2: {
    fontSize: responsiveFontSize(1.6),
    color: '#000',
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
  textInputInfoTxt: {
    color: '#000', 
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold'
  },
  textWrapper: {
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
  addButton: {
    width: 20,
    height: 20,
  },
});
