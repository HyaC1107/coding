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
import {WINDOW_HEIGHT} from '@/constants/context';
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

export default function CalendarSchedulePopup(): JSX.Element {
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [data, setData] = useState<DatePickProp[]>(item);
  const [showPopup, setPopup] = useState(true);
  const [disabled, setDisable] = useState(1);
  const [isDone, setState] = useState(false);
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
              }}>
              날짜,요일을 선택해주세요
            </Text>
          </View>
        </View>
        <Calendar />
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{
            borderColor: '#F6F6F6',
            borderTopWidth: 1,
            width: '100%',
            flex: 1,
            height: WINDOW_HEIGHT * 0.3,
            // paddingTop: '5%',
            // paddingBottom: '5%',
          }}>
          <View style={{width: '90%', alignItems: 'center'}}>
            <DatePick data={data} handleData={handleData} />
          </View>
        </ScrollView>
        <View
          style={{
            width: '75%',
            alignItems: 'center',
            gap: 15,
            paddingTop: '5%',
            paddingBottom: '5%',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              //   backgroundColor: '#ff0',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {disabled === 1 ? (
                <Image
                  source={require('@/assets/images/disabled.png')}
                  style={{width: 15, height: 15}}
                />
              ) : (
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    backgroundColor: '#E9EDEF',
                  }}></View>
              )}
              <Text
                style={
                  disabled === 1 ? {color: '#F2295F'} : {color: '#707070'}
                }>
                금일 예약불가
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {disabled === 2 ? (
                <Image
                  source={require('@/assets/images/disabled.png')}
                  style={{width: 15, height: 15}}
                />
              ) : (
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    backgroundColor: '#E9EDEF',
                  }}></View>
              )}
              <Text
                style={
                  disabled === 2 ? {color: '#F2295F'} : {color: '#707070'}
                }>
                시간선택제 예약불가
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              //   backgroundColor: '#ff0',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {disabled === 3 ? (
                <Image
                  source={require('@/assets/images/disabled.png')}
                  style={{width: 15, height: 15}}
                />
              ) : (
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    backgroundColor: '#E9EDEF',
                  }}></View>
              )}
              <Text
                style={
                  disabled === 3 ? {color: '#F2295F'} : {color: '#707070'}
                }>
                오전시간 예약불가
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {disabled === 4 ? (
                <Image
                  source={require('@/assets/images/disabled.png')}
                  style={{width: 15, height: 15}}
                />
              ) : (
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    backgroundColor: '#E9EDEF',
                  }}></View>
              )}
              <Text
                style={
                  disabled === 4 ? {color: '#F2295F'} : {color: '#707070'}
                }>
                오후시간 예약불가
              </Text>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setPopup(!showPopup);
          }}>
          <View
            style={
              isDone
                ? styles.button
                : {
                    backgroundColor: '#F6F6F6',
                    height: '5%',
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
            }>
            <Text
              style={
                isDone
                  ? styles.btnTxt
                  : {
                      fontSize: responsiveFontSize(1.8),
                      color: '#656565',
                      fontWeight: 'bold',
                    }
              }>
              설정완료
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
  button: {
    backgroundColor: '#2CB07B',
    height: '5%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: '97%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
    paddingBottom: '5%',
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
