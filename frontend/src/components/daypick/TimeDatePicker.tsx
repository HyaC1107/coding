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
        <Text
          style={{
            fontSize: responsiveFontSize(1.2),
            color: '#000',
            paddingLeft: '2%',
          }}>
          2023년 05월 10일
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  close: {display: 'none'},
  rootWrapper: {
    width: '100%',
    alignItems: 'center',
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
