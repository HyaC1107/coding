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

export default function Location(): JSX.Element {
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
      <Image
        style={styles.exposeLocIcon}
        source={require('@/assets/images/01-login/06-expose-loc.png')}
      />
      <Text
        style={{
          color: '#676767',
          paddingLeft: '5%',
          paddingRight: '5%',
          fontSize: responsiveFontSize(1.4),
        }}>
        서울시 연남동
      </Text>
      <TouchableWithoutFeedback
        onPress={() => {
          setState(!isShow);
        }}>
        <Image
          style={styles.exposeLocIcon}
          source={require('@/assets/images/01-login/05-cancel-expose-loc.png')}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  exposeLocIcon: {
    width: 15,
    height: 15,
    //height: '10%',
  },
});
