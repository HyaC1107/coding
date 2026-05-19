import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

/* 
* noticetab props
1. props 종류: title, date, description, index
2. props 설명
- title : 공지사항 제목
- date : 공지 일자
- description : 공지사항 상세내용 (아코디언)
- index : 공지사항 list key값 (해당값으로 아코디언 개별 여닫기여부 식별하도록 예시구현)
*/
interface NoticeTabProps {
  data: {title: string; date: string; description: string; index: number}[];
}
export default function NoticeTab(noticeProps: NoticeTabProps): JSX.Element {
  const {data} = noticeProps;
  const navigation = useNavigation<any>();
  const [tabOpen, setTabOpen] = useState(false);
  const [selectedItem, setItem] = useState(-1);

  useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {data.map((el, i) => {
        return (
          <View key={i}>
            <TouchableWithoutFeedback
              onPress={() => {
                setTabOpen(!tabOpen);
                if (el.index === selectedItem) {
                  setItem(-1);
                } else {
                  setItem(i);
                }
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignItems: 'flex-end',

                  marginLeft: '5%',
                  justifyContent: 'space-between',
                }}>
                <View style={{padding: '2%'}}>
                  <Text style={{fontSize: responsiveFontSize(1.8)}}>
                    {el.title}
                  </Text>
                </View>
                <View style={{padding: '2%'}}>
                  <Text style={{fontSize: responsiveFontSize(1.2)}}>
                    {el.date}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {/* 공지사항 세부설명 단건 아코디언 예제 구현 (실제 기능에맞게 프론트엔드 개발하여 이용) */}
            {el.index === selectedItem && (
              <View style={{width: '100%', alignItems: 'center'}}>
                <View
                  style={{
                    width: '90%',
                    backgroundColor: '#F6F6F6',
                    padding: '2%',
                  }}>
                  <Text style={{fontSize: responsiveFontSize(1.2)}}>
                    {el.description}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
