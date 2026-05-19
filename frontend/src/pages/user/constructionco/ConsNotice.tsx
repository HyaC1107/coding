import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, Alert} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import NoticeTab from '@/components/user/notice/NoticeTab';
import EventTab from '@/components/user/notice/EventTab';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {get} from '@/utils/api';

export default function ConsNotice(): JSX.Element {
  const navigation = useNavigation<any>();
  const [check, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [item, setItem] = useState(1);
  const [noticedata, setNoticedata] = useState<any[]>([]);

  const fetchNotices = useCallback(async () => {
    try {
      const response = await get('/notices');
      const formattedData = response.map((notice: any, index: number) => ({
        title: notice.title,
        date: notice.createdAt ? notice.createdAt.split('T')[0] : '',
        description: notice.content,
        index: index,
      }));
      setNoticedata(formattedData);
    } catch (error: any) {
      Alert.alert('오류', error.message || '공지사항을 불러오는 데 실패했습니다.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotices();
    }, [fetchNotices]),
  );

  useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom:10}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(1);
            setCheck1(true);
            setCheck2(false);
          }}>
          <View
            style={
              item === 1
                ? {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#2CB07B',
                    alignItems: 'center',
                    padding: '3%',
                    backgroundColor: 'white',
                  }
                : {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#F6F6F6',
                    alignItems: 'center',
                    padding: '3%',
                    backgroundColor: 'white',
                  }
            }>
            <Text
              style={
                item === 1
                  ? {color: '#2CB07B', fontWeight: '600'}
                  : {color: '#B4B4B4'} //240214
              }>
              공지사항
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(2);
            setCheck1(false);
            setCheck2(true);
          }}>
          <View
            style={
              item === 2
                ? {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#2CB07B',
                    alignItems: 'center',
                    padding: '3%',
                    backgroundColor: 'white',
                  }
                : {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#F6F6F6',
                    alignItems: 'center',
                    padding: '3%',
                    backgroundColor: 'white',
                  }
            }>
            <Text
              style={
                item === 2
                  ? {color: '#2CB07B', fontWeight: '600'}
                  : {color: '#B4B4B4'}
              }>
              이벤트
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {check && <NoticeTab data={noticedata} />}
      {check2 && <EventTab />}
    </View>
  );
}
