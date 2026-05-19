import {WINDOW_HEIGHT} from '@/constants/context';
import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const holidayStyles = (cell = undefined) =>
  StyleSheet.create({
    Calendar: {
      width: '100%',
      height: WINDOW_HEIGHT * 0.38,
      // backgroundColor: '#ff0',
    },
    CalendarMonth: {
      width: '100%',
      height: WINDOW_HEIGHT * 0.05,
      justifyContent: 'center',
      alignItems: 'center',
    },
    CalendarMonthWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '75%',
    },
    DatePickerIcon: {
      width: RFPercentage(4.5),
      height: RFPercentage(4.5),
      resizeMode: 'contain',
    },
    DatePickerMonthText: {
      color: '#000',
    },
  });

export default holidayStyles;
