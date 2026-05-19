import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Calendar from '../../components/calendar/Calendar';
import DatePick, {
  DatePickListProp,
  DatePickProp,
} from '../../components/daypick/DatePick';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const item: DatePickProp[] = [
  {index: 1, time: '09:00', isSelected: false, disable: false},
  {index: 2, time: '09:30', isSelected: false, disable: false},
  {index: 3, time: '10:00', isSelected: false, disable: true},
  {index: 4, time: '10:30', isSelected: false, disable: false},
  {index: 5, time: '11:00', isSelected: false, disable: false},
  {index: 6, time: '11:30', isSelected: false, disable: false},
  {index: 7, time: '12:00', isSelected: false, disable: false},
  {index: 8, time: '12:30', isSelected: false, disable: false},
  {index: 9, time: '13:00', isSelected: false, disable: true},
  {index: 10, time: '13:30', isSelected: false, disable: false},
  {index: 11, time: '14:00', isSelected: false, disable: false},
  {index: 12, time: '14:30', isSelected: false, disable: false},
  {index: 13, time: '15:00', isSelected: false, disable: false},
  {index: 14, time: '15:30', isSelected: false, disable: false},
];

export default function CustomerRentRequestWithDate(): JSX.Element {
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [data, setData] = useState<DatePickProp[]>(item);
  const [showPopup, setPopup] = useState(true);
  const [isFormCompleted, setFormState] = useState(false);
  const handleData = (el: DatePickProp[], selectedItem: DatePickProp) => {
    const newData = el.map(v => {
      if (v.index === selectedItem.index && !selectedItem.disable) {
        // console.log(v);
        return {...v, isSelected: !selectedItem.isSelected};
      } else if (!selectedItem.disable) return {...v, isSelected: false};
      else return {...v};
    });
    setData(newData);
  };
  useEffect(() => {
    if (!check1 || !check2 || !check3 || !check4) setCheckAll(false);
  }, [check1, check2, check3, check4, checkAll]);

  return (
    <View style={styles.rootWrapper}>
      <View style={styles.popUpWrap}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{
            flex: 1,
            width: '100%',
            height: '55%',
            paddingTop: '1%',
          }}>
          <View style={styles.barWrap}>
            <View style={styles.bar}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#F6F6F6',
                width: '90%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingLeft: '5%',
                  paddingRight: '2%',
                  paddingBottom: '2%',
                  fontSize: responsiveFontSize(2),
                  letterSpacing: -0.7,
                }}>
                임대요청 할 날짜와 시간을 입력하세요
              </Text>
            </View>
          </View>
          <Calendar />
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: '#F6F6F6',
            }}>
            <DatePick data={data} handleData={handleData} />
          </View>
          <View
            style={{
              width: WINDOW_WIDTH * 0.8,
              borderBottomColor: '#F6F6F6',
              borderBottomWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '5%',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.2),
                color: '#333333',
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              *30분 단위로 희망시간 선택 / *타업체와 중복 불가능
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#F9F9F9',
              width: WINDOW_WIDTH * 0.8,
              borderRadius: 5,
              padding: '5%',
              marginBottom: '10%',
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingBottom: WINDOW_HEIGHT * 0.02,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text style={{fontSize: responsiveFontSize(2)}}>공사층수</Text>
              <View
                style={{
                  marginLeft: '2%',
                  width: WINDOW_WIDTH * 0.14,
                  height: WINDOW_HEIGHT * 0.03,
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}>
                <TextInput style={{width: '30%'}} />
              </View>
              <Text style={{fontSize: responsiveFontSize(2)}}>층</Text>
            </View>
            <View style={{paddingBottom: '2%'}}>
              <Text style={{fontSize: responsiveFontSize(2)}}>작업내용</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: WINDOW_HEIGHT * 0.17,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <TextInput multiline style={{width: '100%', height: '100%'}} />
            </View>
          </View>
        </ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            setPopup(!showPopup);
          }}>
          <View
            style={!isFormCompleted ? styles.inActiveButton : styles.button}>
            <Text
              style={!isFormCompleted ? styles.inActiveBtnTxt : styles.btnTxt}>
              {!isFormCompleted ? '선택하기' : '임대견적요청하기'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  close: {display: 'none'},
  rootWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgrou: 0.5,
    position: 'absolute',
  },
  buttonWrap: {
    width: '100%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  inActiveButton: {
    backgroundColor: '#F6F6F6',
    height: 35,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  button: {
    backgroundColor: '#2CB07B',
    height: 35,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  inActiveBtnTxt: {
    color: '#656565',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    letterSpacing: -0.7,
  },
  btnTxt: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    letterSpacing: -0.7,
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: '96%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    // height:,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    borderWidth: 3,
    marginBottom: '5%',
    width: '30%',
    //marginBottom: '4%',
    borderColor: '#D8D8D8',
    //marginTop: '2%',
  },
});
