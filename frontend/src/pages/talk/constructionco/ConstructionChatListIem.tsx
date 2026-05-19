import {WINDOW_HEIGHT} from '@/constants/context';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageProps,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
export interface ChatListItemProps {
  roomId: string;
  thumbnail: ImageProps;
  sender: string;
  chatContents: string;
  receivedTime: string;
  numberOfMessage: number;
  disconnected: boolean;
}

export default function ConstructionChatListIem(
  props: ChatListItemProps,
): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ConstructionChatRoom', {
          roomId: props.roomId,
          sender: props.sender,
          senderAddress: '서울시 마포구 염리동 50-1 1층',
          thumbnail: props.thumbnail,
          disconnected: props.disconnected,
        });
      }}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={props.thumbnail}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
        <View style={styles.contentsContinaer}>
          <View style={styles.row}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.2),
                fontWeight: 'bold',
                letterSpacing: -0.7,
              }}>
              {props.sender}
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.2),
                color: '#656565',
                letterSpacing: -0.7,
              }}>
              {props.receivedTime}
            </Text>
          </View>
          <View style={styles.row}>
            <Text
              style={{
                fontSize: 11,
                color: '#999',
              }}>
              {props.chatContents}
            </Text>
            {props.numberOfMessage > 0 ? (
              <View style={styles.messageCircle}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                  }}>
                  {props.numberOfMessage}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 70,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    //marginBottom: 1,
  },
  chatContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {},
  contentsContinaer:
    Platform.OS === 'android'
      ? {
          width: '81%',
          height: '70%',
          //backgroundColor: '#ff0',
          justifyContent: 'space-evenly',
        }
      : {
          width: '80%',
          height: '70%',
          //backgroundColor: '#ff0',
          justifyContent: 'space-evenly',
        },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageCircle: {
    width: 40,
    height: 18,
    backgroundColor: '#f00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
