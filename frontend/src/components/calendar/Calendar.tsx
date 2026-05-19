import React, {useEffect, useState} from 'react';
import {Image, Text, View, TouchableWithoutFeedback} from 'react-native';
// import {RFPercentage} from 'react-native-responsive-fontsize';
import {todayDate} from './dummyDate';
import {dummyCalendars} from './dummyDate';
import holidayStyles from './styles';
import {WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

interface calendarItemProps {
  dayOfWeek: any;
  holiday: any;
  otherMonth: any;
  selected: any;
  value: number;
}

const selectColor = (cell: any, rowIndex: number, index: any) => {
  if (cell.otherMonth) return '#cbcbcb';
  else if (cell.selected) return '#fff';
  else if (rowIndex === 0 && index === 0) return '#FD5545';
  else if (rowIndex === 0 && index === 6) return '#0F97FF';
  else return '#666';
};

const selectBackgroundColor = (cell: any) => {};

const renderRow = (
  rowData: any,
  rowIndex: any,
  day: string,
  handleDate?: (day: string) => void,
) => {
  const [selectedItem, setItem] = useState<calendarItemProps>({
    dayOfWeek: undefined,
    holiday: undefined,
    otherMonth: undefined,
    selected: false,
    value: 0,
  });
  return (
    <View
      style={{
        width: '100%',
        height: WINDOW_WIDTH * 0.08,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}
      key={rowIndex}>
      {rowData.map((cell: any, index: any) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log(cell);
              setItem(cell);
              handleDate &&
                handleDate(day + selectedItem.value.toString() + '일');
            }}
            style={{
              width: WINDOW_WIDTH * 0.1,
              height: '100%',
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            key={index}>
            <View
              style={{
                width: WINDOW_WIDTH * 0.06,
                height: WINDOW_WIDTH * 0.06,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  selectedItem.value === cell.value ? '#606060' : 'transparent',
                // borderRadius: 1000,
                borderRadius: selectedItem.value === cell.value ? 1000 : 0,
              }}>
              <Text
                style={{
                  width: WINDOW_WIDTH * 0.1,
                  //   fontWeight: selectedItem.value === cell.value ? 'bold' : '400',
                  fontWeight: '600',
                  color: selectedItem.value === cell.value ? 'white' : '#000',
                  fontSize: responsiveFontSize(1.5),
                  textAlign: 'center',
                }}
                key={index}>
                {cell.value}
              </Text>
            </View>
            {/* 
            {cell.holiday ? (
              <Image
                style={{
                  position: 'absolute',
                  bottom: -RFPercentage(1.8),
                }}
                source={require('@/assets/icons/holiday.png')}></Image>
            ) : null} */}
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};
interface CalendarProps {
  handleDate?: (date: string) => void;
}

const Calendar = (props: CalendarProps) => {
  const {handleDate} = props;
  const [changingDate, setChaingingDate] = useState(todayDate);
  const [calendarIndex, setCalendarIndex] = useState(0);
  const [day, setDay] = useState('');
  useEffect(() => {
    const date = new Date();
    console.log(
      date.getFullYear(),
      date.getDate(),
      date.getMonth() + 1,
      date.getDay(),
      date.getTime(),
    );
    setDay(
      date.getFullYear().toString() +
        '년 ' +
        date.getMonth().toString() +
        '월 ',
    );
  }, []);
  return (
    <View style={holidayStyles().Calendar}>
      <View style={holidayStyles().CalendarMonth}>
        <View style={holidayStyles().CalendarMonthWrapper}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCalendarIndex(prevIndex => {
                return prevIndex + 1;
              });
              setChaingingDate(previousDate => {
                return new Date(
                  previousDate.setMonth(previousDate.getMonth() - 1),
                );
              });
            }}>
            <Image source={require('@/assets/images/calendar-left.png')} />
          </TouchableWithoutFeedback>
          <Text style={holidayStyles().DatePickerMonthText}>
            {changingDate.getFullYear() +
              '.' +
              (changingDate.getMonth() + 1) +
              '월'}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setCalendarIndex(prevIndex => {
                return prevIndex + 1;
              });
              setChaingingDate(previousDate => {
                return new Date(
                  previousDate.setMonth(previousDate.getMonth() + 1),
                );
              });
            }}>
            <Image source={require('@/assets/images/calendar-right.png')} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View>
          {dummyCalendars[calendarIndex % 2].map((rowData, index) =>
            renderRow(rowData, index, day, handleDate),
          )}
        </View>
      </View>
    </View>
  );
};

export default Calendar;
