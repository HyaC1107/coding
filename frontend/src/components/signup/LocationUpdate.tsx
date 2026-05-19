import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
// import {RadioButton} from 'react-native-paper';

export default function LocationUpdate(): JSX.Element {
  const [isShow, setState] = useState(true);

  return (
    <View
      style={
        isShow
          ? {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',

              paddingTop: '4%',
              paddingLeft: '5%',
              paddingRight: '2%',
              paddingBottom: '3%',
            }
          : {display: 'none'}
      }>
      <Image source={require('@/assets/images/select-loc0.5.png')} />
      <Text
        style={{
          color: '#676767',
          paddingLeft: '2%',
          paddingRight: '5%',
          fontSize: responsiveFontSize(1.4),
        }}>
        서울시 연남동
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({});
