import React from 'react';
import {
  DimensionValue,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export interface MyChatProps {
  topMargin: DimensionValue;
  attachedImage?: ImageProps;
  chatContents?: string;
  timeStamp?: string;
}

export default function Mychat(props: MyChatProps): JSX.Element {
  return (
    <View style={{...styles.chatContainer, marginTop: props.topMargin}}>
      <View
        style={{
          marginLeft: 5,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: '#8b8b8b',
            fontSize: responsiveFontSize(0.7),
          }}>
          {props.timeStamp}
        </Text>
      </View>
      {props.attachedImage ? (
        <Image source={props.attachedImage}></Image>
      ) : (
        <View style={styles.chatBubble}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.6),
              letterSpacing: -0.7,
            }}>
            {props.chatContents}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '10%',
  },
  chatBubble: {
    backgroundColor: '#ffeb34',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
