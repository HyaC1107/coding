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

export default function CalendarOnlyPopup(): JSX.Element {
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  //   const [data, setData] = useState<DatePickProp[]>(item);
  const [showPopup, setPopup] = useState(true);
  const handleData = (el: DatePickProp[], selectedItem: DatePickProp) => {
    const newData = el.map(v => {
      if (v.index === selectedItem.index && !selectedItem.disable) {
        // console.log(v);
        return {...v, isSelected: !selectedItem.isSelected};
      } else if (!selectedItem.disable) return {...v, isSelected: false};
      else return {...v};
    });
    // setData(newData);
  };
  // useEffect(() => {
  //   if (!check1 || !check2 || !check3 || !check4) setCheckAll(false);
  // }, [check1, check2, check3, check4, checkAll]);

  return (
    <View style={showPopup ? styles.rootWrapper : styles.close}>
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
                paddingRight: '5%',
                paddingBottom: '5%',
              }}>
              희망방문요청 시간을 입력하세요
            </Text>
          </View>
        </View>
        <Calendar />
        <TouchableWithoutFeedback
          onPress={() => {
            setPopup(!showPopup);
          }}>
          <View style={styles.button}>
            <Text style={styles.btnTxt}>선택하기</Text>
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
    height: WINDOW_HEIGHT * 0.05,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  btnTxt: {
    color: 'white',
    fontSize: 15,
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: WINDOW_HEIGHT * 0.53,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    borderWidth: 3,
    marginBottom: '5%',
    width: '30%',
    //marginBottom: '4%',
    //marginTop: '5%',
    borderColor: '#D8D8D8',
  },
});
