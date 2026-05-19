import React, {useEffect, useState, useCallback} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import NoticeTab from '@/components/user/notice/NoticeTab';
import EventTab from '@/components/user/notice/EventTab';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {get} from '@/utils/api';

export default function FrequentQnA(): JSX.Element {
  const navigation = useNavigation<any>();
  const [check, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<any[]>([]);

  const fetchFaqs = useCallback(async () => {
    try {
      const response = await get('/notices/faqs');
      setFaqs(response);
    } catch (error: any) {
      Alert.alert('오류', error.message || 'FAQ를 불러오는 데 실패했습니다.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFaqs();
    }, [fetchFaqs]),
  );

  useEffect(() => {
    let category = '';
    if (check2) category = '로그인&회원가입';
    else if (check3) category = '이용문의';
    else if (check4) category = '업체질문';
    else if (check5) category = '시공';

    const filtered = category
      ? faqs.filter((faq: any) => faq.category === category)
      : faqs;

    const formattedData = filtered.map((faq: any, index: number) => ({
      title: `Q. ${faq.question}`,
      date: faq.createdAt ? faq.createdAt.split('T')[0] : '',
      description: faq.answer,
      index: index,
    }));
    setFilteredFaqs(formattedData);
  }, [faqs, check, check2, check3, check4, check5]);

  useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={
          Platform.OS === 'ios'
            ? {
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                height: 35,
                borderBottomWidth: 1,
                borderColor: '#E9EDEF',
                marginLeft: '5%',
                marginBottom: '3%',
                marginTop: '5%',
                gap: 15,
                //backgroundColor: '#ff0',
              }
            : {
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                height: 40,
                borderBottomWidth: 1,
                borderColor: '#E9EDEF',
                marginLeft: '5%',
                //marginRight: '10%',
                marginTop: '5%',
                marginBottom: '3%',

                gap: 15,
              }
        }>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheck1(true);
            setCheck2(false);
            setCheck3(false);
            setCheck4(false);
            setCheck5(false);
          }}>
          <View>
            <Text style={check ? styles.TabText : styles.TabGreyText}>
              전체
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheck1(false);
            setCheck2(true);
            setCheck3(false);
            setCheck4(false);
            setCheck5(false);
          }}>
          <View>
            <Text style={check2 ? styles.TabText : styles.TabGreyText}>
              로그인&회원가입
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheck1(false);
            setCheck2(false);
            setCheck3(true);
            setCheck4(false);
            setCheck5(false);
          }}>
          <View>
            <Text style={check3 ? styles.TabText : styles.TabGreyText}>
              이용문의
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheck1(false);
            setCheck2(false);
            setCheck3(false);
            setCheck4(true);
            setCheck5(false);
          }}>
          <View>
            <Text style={check4 ? styles.TabText : styles.TabGreyText}>
              업체질문
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheck1(false);
            setCheck2(false);
            setCheck3(false);
            setCheck4(false);
            setCheck5(true);
          }}>
          <View>
            <Text style={check5 ? styles.TabText : styles.TabGreyText}>
              시공
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <NoticeTab data={filteredFaqs} />
    </View>
  );
}

const styles = StyleSheet.create({
  TabText: {fontWeight: 'bold', fontSize: responsiveFontSize(1.6)},
  TabGreyText: {
    color: '#B4B4B4',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6),
  },
});

const styles = StyleSheet.create({
  TabText: {fontWeight: 'bold', fontSize: responsiveFontSize(1.6)},
  TabGreyText: {
    color: '#B4B4B4',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6),
  },
});
