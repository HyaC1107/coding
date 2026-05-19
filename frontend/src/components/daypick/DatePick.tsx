import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Calendar from '../../components/calendar/Calendar';
import {WINDOW_WIDTH} from '@/constants/context';
export interface DatePickListProp {
  data: DatePickProp[];
  handleData: (el: DatePickProp[], selectedItem: DatePickProp) => void;
}
export interface DatePickProp {
  index: number;
  time: string;
  isSelected: boolean;
  disable: boolean;
}
export default function DatePick(dataprop: DatePickListProp): JSX.Element {
  const {data, handleData} = dataprop;
  const [checkAll, setCheckAll] = useState(false);

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <View style={styles.rootWrapper}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1),
              color: '#333333',
              paddingLeft: '2%',
              paddingTop: '7%',
            }}>
            오전AM
          </Text>
        </View>
        {data.map((el, i) => {
          if (i < 7)
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  handleData(data, el);
                }}>
                <View
                  key={i}
                  style={
                    el.disable
                      ? {
                          borderRadius: 5,
                          backgroundColor: '#656565',
                          paddingTop: '1.5%',
                          paddingBottom: '1.5%',
                          width: WINDOW_WIDTH * 0.15,
                          alignItems: 'center',
                        }
                      : el.isSelected
                      ? {
                          borderRadius: 5,
                          backgroundColor: '#2CB07B',
                          paddingTop: '1.5%',
                          paddingBottom: '1.5%',
                          width: WINDOW_WIDTH * 0.15,
                          alignItems: 'center',
                        }
                      : {
                          borderRadius: 5,
                          backgroundColor: '#F6F6F6',
                          paddingTop: '1.5%',
                          paddingBottom: '1.5%',
                          width: WINDOW_WIDTH * 0.15,
                          alignItems: 'center',
                        }
                  }>
                  <Text
                    style={
                      el.isSelected
                        ? {color: 'white', fontSize: responsiveFontSize(1.5)}
                        : {color: '#000', fontSize: responsiveFontSize(1.5)}
                    }>
                    {el.time}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
        })}
        <View
          style={{width: '100%', alignItems: 'flex-start', paddingTop: '2%'}}>
          <Text
            style={{
              fontSize: responsiveFontSize(1),
              color: '#333333',
              paddingLeft: '2%',
            }}>
            오후AM
          </Text>
        </View>
        {data.map((el, i) => {
          if (i > 6)
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  handleData(data, el);
                }}>
                <View
                  key={i}
                  style={
                    el.disable
                      ? {
                          borderRadius: 5,
                          backgroundColor: '#656565',
                          paddingTop: '1.5%',
                          paddingBottom: '1.5%',
                          width: WINDOW_WIDTH * 0.15,
                          alignItems: 'center',
                        }
                      : el.isSelected
                      ? {
                          borderRadius: 5,
                          backgroundColor: '#2CB07B',
                          paddingTop: '1.5%',
                          paddingBottom: '1.5%',
                          width: WINDOW_WIDTH * 0.15,
                          alignItems: 'center',
                        }
                      : {
                          borderRadius: 5,
                          backgroundColor: '#F6F6F6',
                          paddingTop: '1.5%',
                          paddingBottom: '1.5%',
                          width: WINDOW_WIDTH * 0.15,
                          alignItems: 'center',
                        }
                  }>
                  <Text
                    style={
                      el.isSelected
                        ? {color: 'white', fontSize: responsiveFontSize(1.5)}
                        : {color: '#000', fontSize: responsiveFontSize(1.5)}
                    }>
                    {el.time}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  close: {display: 'none'},
  rootWrapper: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 15,
    paddingBottom: '5%',
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: '80%',
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
});
