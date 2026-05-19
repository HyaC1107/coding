import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
// import PopUp from '../../popup/PopUp';
import {useRoute, useFocusEffect} from '@react-navigation/native';
// import SelectExposeArea from '../../popup/SelectExposeArea';
import NoticeTab from '@/components/user/notice/NoticeTab';
import QnATab from '@/components/user/qna/QnATab';
import {WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {get, post} from '@/utils/api';

export default function ConsQnAEnrollPage(): JSX.Element {
  const [item, setItem] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [qnaList, setQnaList] = useState<any[]>([]);

  const fetchQnAs = useCallback(async () => {
    try {
      const response = await get('/qna');
      const formattedData = response.map((qna: any, index: number) => ({
        title: qna.title,
        date: qna.createdAt ? qna.createdAt.split('T')[0] : '',
        question: (
          <Text style={{fontSize: responsiveFontSize(1.4)}}>
            {qna.content}
          </Text>
        ),
        answer: (
          <Text style={{fontSize: responsiveFontSize(1.4)}}>
            {qna.answer || '아직 답변이 등록되지 않았습니다.'}
          </Text>
        ),
        index: index,
        state: qna.status === 'answered' ? 2 : 1,
      }));
      setQnaList(formattedData);
    } catch (error: any) {
      Alert.alert('오류', error.message || '문의 내역을 불러오는 데 실패했습니다.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchQnAs();
    }, [fetchQnAs]),
  );

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }
    try {
      await post('/qna', {title, content});
      Alert.alert('성공', '문의가 등록되었습니다.');
      setTitle('');
      setContent('');
      setItem(2); // Move to history tab
    } catch (error: any) {
      Alert.alert('오류', error.message || '문의 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    setTitle('');
    setContent('');
  }, [item]);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(1);
          }}>
          <View
            style={
              item === 1
                ? {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#2CB07B',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
                : {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#B4B4B4',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
            }>
            <Text
              style={
                item === 1
                  ? {color: '#2CB07B', fontWeight: '600'}
                  : {color: '#B4B4B4'}
              }>
              문의하기
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(2);
          }}>
          <View
            style={
              item === 2
                ? {
                    width: '50%',
                    borderBottomWidth: 2,
                    borderColor: '#2CB07B',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
                : {
                    width: '50%',
                    borderBottomWidth: 1,
                    borderColor: '#B4B4B4',
                    alignItems: 'center',
                    padding: '5%',
                    backgroundColor: 'white',
                  }
            }>
            <Text
              style={
                item === 2
                  ? {color: '#2CB07B', fontWeight: '600'}
                  : {color: '#B4B4B4'}
              }>
              문의내역확인
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {item === 1 && (
        <View style={{padding: '5%', gap: 20}}>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#E9EDEF',
              width: Dimensions.get('window').width * 0.6,
              height: Dimensions.get('window').height * 0.06,
              justifyContent: 'space-between',
              paddingLeft: '10%',
              alignItems: 'center',
              flexDirection: 'row',
              paddingRight: '5%',
            }}>
            <Text style={{color: '#BDBFC1'}}>카테고리입력</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  position: 'absolute',
                  top: -7,
                  right: 2,
                  borderBottomWidth: 15,
                  borderTopWidth: 15,
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderTopColor: '#E9EDEF',
                  borderBottomColor: 'transparent',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                }}></View>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E9EDEF',

              height: Dimensions.get('window').height * 0.4,
            }}>
            <View
              style={{
                height: '15%',
                borderBottomColor: '#E9EDEF',
                borderBottomWidth: 1,
                width: '100%',
                paddingLeft: '5%',
              }}>
              <TextInput
                placeholder="제목을 입력해주세요"
                style={{height: '100%'}}
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View
              style={{
                height: '85%',
                width: '100%',
                paddingLeft: '5%',
              }}>
              <TextInput
                style={{height: '100%', width: '100%', textAlignVertical: 'top'}}
                multiline
                value={content}
                onChangeText={setContent}
              />
            </View>
          </View>
          <View style={{paddingRight: '2%', alignItems: 'flex-end'}}>
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <View
                style={{
                  backgroundColor: '#2CB07B',
                  borderRadius: 5,
                  paddingLeft: '4%',
                  paddingRight: '4%',
                  paddingTop: '3%',
                  paddingBottom: '3%',
                }}>
                <Text style={{color: 'white', fontSize: 10}}>문의하기</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
      {item === 2 && <QnATab data={qnaList} />}
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    paddingTop: '10%',
  },
  textInputWrapper: {
    alignItems: 'center',
    height: '10%',
    width: '100%',
    justifyContent: 'center',
  },
  textInputInfoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  textInputInfoTxtWrap: {},
  checkDupBtmWrap: {
    width: '20%',
  },
  checkDupBtn: {
    backgroundColor: '#2CB07B',
    width: '100%',
    height: '80%',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  checkTxt: {
    color: '#fff',
    fontSize: 11,
  },
  textInputWrap: {
    width: '100%',
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInput: {
    borderColor: '#E6E6E6',
    borderWidth: 1,
    width: '100%',
    height: 35,
    borderRadius: 3,
  },
  buttonWrap: {
    //marginTop: '15%',
    //marginBottom: '5%',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 100,
    width: '50%',
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    height: '25%',
  },
  loginBtn: {
    borderRadius: 100,
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    // height: 50,
    fontSize: 15,
    textAlign: 'center',
  },
  warnMent: {
    fontSize: 10.5,
    color: '#FF3120',
    paddingLeft: '3%',
    paddingTop: '2%',
  },
  disabled: {
    display: 'none',
  },
  checkSuccessWrap: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkSuccessTxt: {
    color: '#2CB07B',
    fontSize: 11,
    paddingLeft: '5%',
  },
});
