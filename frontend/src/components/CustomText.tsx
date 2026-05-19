import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function CustomText(props: any): JSX.Element {
  return (
    <Text style={[styles.defaultStyle, props.style, props.styles]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    fontFamily: 'Noto Sans KR',
  },
});
