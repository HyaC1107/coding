import { WINDOW_HEIGHT } from '@/constants/context';
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
import Calendar from '../../../components/calendar/Calendar';
import DatePick, {
  DatePickListProp,
  DatePickProp,
} from '../../../components/daypick/DatePick';

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

export default function CalendarFilterPopup(): JSX.Element {
  const [checkAll, setCheckAll] = useState(false);
  const [check, setCheck] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [data, setData] = useState<DatePickProp[]>(item);
  const [showPopup, setPopup] = useState(true);
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
        <View
          style={{
            flex: 1,
            height: '20%',
            width: '100%',
            paddingTop: '10%',
            paddingLeft: '5%',
          }}>
          <ScrollView
            style={{
              width: '100%',
              flex: 1,
              height: '10%',
              borderColor: '#F6F6F6',
              borderTopWidth: 1,
              paddingTop: '4%',
            }}>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(1);
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 1 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>3D 도면설계</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(2);
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 2 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>종합인테리어</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(3);
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 3 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>철거</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(4);
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 4 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>소방설비</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(5);
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 5 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={styles.textWrap}>
                <Text style={styles.text}>설비</Text>
              </View>
            </View>
            <View style={styles.checkGroupWrap}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCheck(6);
                }}>
                <View style={styles.iconWrap}>
                  <View
                    style={check === 6 ? styles.iconBox : styles.iconGreyBox}>
                    <Image
                      source={require('../../../assets/images/whitecheck.png')}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.textWrap}>
                <Text style={styles.text}>전기</Text>
              </View>
            </View>
          </ScrollView>
        </View>

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
  checkGroupWrap: {
    width: '100%',
    minHeight: 35,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '7.5%',
    flex: 1,
  },
  checkSubGroupWrap: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '18%',
  },
  iconWrap: {
    width: '6%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    borderRadius: 3,
    backgroundColor: '#2CB07B',
    width: WINDOW_HEIGHT * 0.03,
    height: WINDOW_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBox: {
    borderRadius: 3,
    backgroundColor: '#F6F6F6',
    width: WINDOW_HEIGHT * 0.03,
    height: WINDOW_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '85%',
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
    height: '95%',
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
    borderColor: '#D8D8D8',
  },
  textWrap: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: '2%',
  },
  text: {fontSize: 13},
});
