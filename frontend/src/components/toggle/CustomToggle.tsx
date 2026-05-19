import {WINDOW_WIDTH} from '@/constants/context';
import * as React from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

interface Props {
  onColor: string;
  offColor: string;
  label: string;
  onToggle: () => void;
  style: object;
  isOn: boolean;
  labelStyle: object;
}

interface DefaultProps {
  onColor?: string;
  offColor?: string;
  label?: string;
  onToggle: () => void;
  style?: object;
  isOn: boolean;
  labelStyle?: object;
}

export default function Toggle(props: DefaultProps): JSX.Element {
  const animatedValue = new Animated.Value(0);
  const defaultProps: DefaultProps = {
    onColor: '#2CB07B',
    offColor: '#2CB07B',
    label: '',
    onToggle: () => {},
    style: {},
    isOn: false,
    labelStyle: {},
  };

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 1],
  });

  const {isOn, onColor, offColor, style, onToggle, labelStyle, label} = props;

  const color = isOn ? onColor : offColor;

  animatedValue.setValue(isOn ? 0 : 1);

  Animated.timing(animatedValue, {
    toValue: isOn ? 1 : 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: false,
  });

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableWithoutFeedback
        onPress={() => {
          typeof onToggle === 'function' && onToggle();
        }}>
        <View style={[styles.toggleContainer, style, {backgroundColor: color}]}>
          {isOn && (
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                //ackgroundColor: '#ff0',
                paddingLeft: '10%',
                color: 'white',
                fontSize: responsiveFontSize(1.3),
                width: 30,
                textAlign: 'right',
              }}>
              상가
            </Text>
          )}
          <Animated.View
            style={[
              styles.toggleWheelStyle,
              {
                marginLeft: moveToggle,
              },
            ]}></Animated.View>
          {!isOn && (
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                //ackgroundColor: '#ff0',
                paddingLeft: '10%',
                color: 'white',
                fontSize: responsiveFontSize(1.3),
                textAlign: 'left',
              }}>
              우리집
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2CB07B',
    borderRadius: 100,
  },
  toggleContainer:
    Platform.OS === 'ios'
      ? {
          width: 65,
          height: 25,
          marginLeft: 0,
          paddingLeft: 3,
          //   paddingRight: 5,
          borderRadius: 15,
          //justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          color: '#2CB07B',
          backgroundColor: '#2CB07B',
        }
      : {
          width: 67,
          height: 25,
          marginLeft: 0,
          paddingLeft: 3,
          paddingRight: 5,
          borderRadius: 15,
          //justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          color: '#2CB07B',
          backgroundColor: '#2CB07B',
        },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: 17,
    height: 17,
    backgroundColor: 'white',
    borderRadius: 12.5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2.5,
    // elevation: 1.5,
  },
});
