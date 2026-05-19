import React, {useEffect} from 'react';
import {
  DimensionValue,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export interface YourChatProps {
  topMargin: DimensionValue;
  thumbnail: ImageProps;
  chatContents: string;
  timeStamp: string;
}

export default function YourChat(props: YourChatProps): JSX.Element {
  return (
    <View style={{...styles.chatContainer, marginTop: props.topMargin}}>
      <Image
        resizeMode="contain"
        style={{
          width: 50,
          height: 50,
        }}
        source={props.thumbnail}></Image>
      <View style={styles.chatBubble}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.6),
            letterSpacing: -0.7,
          }}>
          {props.chatContents}
        </Text>
      </View>
      <View style={styles.timeStamp}>
        <Text
          style={{
            color: '#8b8b8b',
            fontSize: responsiveFontSize(0.7),
          }}>
          {props.timeStamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '10%',
  },
  chatBubble: {
    backgroundColor: '#fff',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    maxWidth: '60%',
  },
  timeStamp: {
    marginLeft: 5,
    justifyContent: 'flex-end',
  },
});
