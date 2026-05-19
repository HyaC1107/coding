import React, {useRef, useState} from 'react';
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

import styled from 'styled-components/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import ConsToolRentNavPopup from '@/components/popup/ConsToolRentNavPopup';
import {useAuth} from '@/context/AuthContext';
import {post} from '@/utils/api';

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

export default function ToolReqestPage(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);
  const {auth} = useAuth();
  const router = useRoute<any>();
  const navigation = useNavigation<any>();

  const [formData, setFormData] = useState({
    heavyType: '',
    carType: '',
    startDate: '',
    endDate: '',
    region: '',
    notes: '',
  });

  const handlePopup = () => {
    navigation.setParams({...router.params, popupOpen: false});
  };

  const handleRequest = async () => {
    if (!formData.heavyType || !formData.region || !formData.startDate) {
      Alert.alert('알림', '필수 정보를 모두 입력해주세요. (장비, 지역, 날짜 등)');
      return;
    }
    try {
      await post('/tool-requests', {
        ...formData,
        constructorId: auth?.userId,
      });
      Alert.alert('성공', '렌탈 요청이 완료되었습니다.');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('오류', error.message || '요청에 실패했습니다.');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.scrollWrapper}>
        <Text style={{fontSize: responsiveFontSize(1.8), letterSpacing: -0.5}}>
          장비를 요청하려면 하단을 작성해주세요
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          paddingTop: WINDOW_HEIGHT * 0.02,
          flex: 1,
        }}>
        <ScrollView
          style={{flex: 1, maxHeight: WINDOW_HEIGHT}}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 5,
            paddingBottom: 50,
          }}>
          <View
            style={{
              backgroundColor: '#F9F9F9',
              width: WINDOW_WIDTH * 0.9,
              borderRadius: 5,
              alignItems: 'center',
              padding: '3%',
              gap: 20,
            }}>
            <View
              style={{
                width: '100%',
                gap: 10,
                alignItems: 'center',
                paddingBottom: WINDOW_HEIGHT * 0.03,
              }}>
              <Text style={styles.CardTitle}>임대요청 날짜를 선택하세요</Text>
              <TouchableWithoutFeedback onPress={() => {
                updateField('startDate', '2023-06-01');
                updateField('endDate', '2023-06-02');
                Alert.alert('알림', '2023-06-01 ~ 2023-06-02 선택됨');
              }}>
                <Text style={styles.SelectBtn}>{formData.startDate ? `${formData.startDate} ~ ${formData.endDate}` : '선택'}</Text>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                width: '100%',
                gap: 10,
                alignItems: 'center',
                paddingBottom: WINDOW_HEIGHT * 0.04,
              }}>
              <Text style={styles.CardTitle}>공사위치</Text>
              <TouchableWithoutFeedback onPress={() => {
                updateField('region', '서울시 마포구');
                Alert.alert('알림', '서울시 마포구 선택됨');
              }}>
                <Text style={styles.SelectBtn}>{formData.region || '선택'}</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#F9F9F9',
              width: WINDOW_WIDTH * 0.9,
              borderRadius: 5,
              alignItems: 'center',
              padding: '3%',
            }}>
            <View
              style={{
                width: '100%',
                gap: 30,
                alignItems: 'center',
                paddingBottom: WINDOW_HEIGHT * 0.02,
              }}>
              <Text style={styles.CardTitle}>공사시간을 선택하세요</Text>
              <Text style={styles.SelectBtn}>기본 설정 (09:00~18:00)</Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View
              style={{
                backgroundColor: '#F9F9F9',
                width: '48.5%',
                borderRadius: 5,
                paddingTop: '3%',
                height: WINDOW_HEIGHT * 0.12,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <Text style={styles.CardTitle}>장비를 선택하세요</Text>
                <TouchableWithoutFeedback onPress={() => {
                  updateField('heavyType', '사다리차');
                  Alert.alert('알림', '사다리차 선택됨');
                }}>
                  <Text style={styles.SelectBtn}>{formData.heavyType || '선택'}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#F9F9F9',
                width: '48.5%',
                borderRadius: 5,
                paddingTop: '3%',
                height: WINDOW_HEIGHT * 0.12,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <Text style={styles.CardTitle}>희망차종을 선택하세요</Text>
                <TouchableWithoutFeedback onPress={() => {
                  updateField('carType', '5톤');
                  Alert.alert('알림', '5톤 선택됨');
                }}>
                  <Text style={styles.SelectBtn}>{formData.carType || '선택'}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#F9F9F9',
              width: WINDOW_WIDTH * 0.9,
              borderRadius: 5,
              padding: '5%',
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingBottom: WINDOW_HEIGHT * 0.02,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text style={styles.CardTitle}>공사층수</Text>
              <View
                style={{
                  marginLeft: '2%',
                  width: WINDOW_WIDTH * 0.14,
                  height: WINDOW_HEIGHT * 0.03,
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}>
                <TextInput 
                  style={{width: '100%', textAlign: 'center', padding: 0}} 
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.CardTitle}>층</Text>
            </View>
            <View style={{paddingBottom: '2%'}}>
              <Text style={styles.CardTitle}>작업내용</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: WINDOW_HEIGHT * 0.17,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <TextInput 
                multiline 
                style={{width: '100%', height: '100%', textAlignVertical: 'top', padding: 10}} 
                value={formData.notes}
                onChangeText={(text) => updateField('notes', text)}
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 40,
              flexDirection: 'row',
              marginTop: '5%',
            }}>
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
              onPress={handleRequest}>
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
                  gap: 10,
                }}>
                <View
                  style={{
                    height: WINDOW_HEIGHT * 0.05,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      paddingLeft: '5%',
                      fontSize: responsiveFontSize(2),
                      letterSpacing: -1,
                      color: '#2CB07B',
                    }}>
                    요청하기
                  </Text>
                </View>
                <View
                  style={{
                    height: WINDOW_HEIGHT * 0.001,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('@/assets/images/chevron-color.png')}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
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
  CardTitle: {
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  SelectBtn: {
    color: '#B4B4B4',
    fontSize: responsiveFontSize(1.6),
  },
});
