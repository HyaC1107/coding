import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatHeader from '@/components/header/ChatHeader';
import Yourchat from './YourChat';
import Mychat from './MyChat';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { useAuth } from '@/context/AuthContext';
import { socket, get, BASE_URL } from '@/utils/api';

export default function ChatRoom(): JSX.Element {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { roomId, sender, senderAddress, thumbnail } = route.params;
  const { auth } = useAuth();
  
  const [messages, setRequests] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setOpen] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <ChatHeader
          sender={sender}
          senderAddress={senderAddress}
          thumbnail={thumbnail}
        />
      ),
    });

    const fetchMessages = async () => {
      try {
        const data = await get(`/chat/${roomId}/messages`);
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    socket.connect();
    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (msg: any) => {
      setRequests((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, [roomId]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    socket.emit('sendMessage', {
      roomId,
      sender: auth?.userId,
      content: inputText,
    });
    setInputText('');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${ampm} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{width: '100%', height: '100%'}}
    >
      <View style={{flex: 1}}>
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.chatRoomContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, idx) => {
            const isMe = msg.sender === auth?.userId;
            if (isMe) {
              return (
                <Mychat 
                  key={msg._id || idx}
                  topMargin={idx === 0 ? '12%' : '2%'}
                  chatContents={msg.content}
                  timeStamp={formatTime(msg.createdAt)}
                  attachedImage={msg.imageUrl ? { uri: `${BASE_URL}/${msg.imageUrl.replace(/\\/g, '/')}` } : undefined}
                />
              );
            } else {
              return (
                <Yourchat 
                  key={msg._id || idx}
                  topMargin={idx === 0 ? '15%' : '5%'}
                  thumbnail={thumbnail ? (typeof thumbnail === 'number' ? thumbnail : { uri: thumbnail }) : require('@/assets/images/chat/chat-thum.png')}
                  chatContents={msg.content}
                  timeStamp={formatTime(msg.createdAt)}
                />
              );
            }
          })}
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
        <View
          style={{
            width: WINDOW_WIDTH * 0.1,
            height: WINDOW_HEIGHT * 0.06,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setOpen(!isOpen);
            }}>
            <Image
              style={{width: 12, height: 12}}
              source={require('@/assets/images/06-chatroom/09-plus.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            height: WINDOW_HEIGHT * 0.06,
            justifyContent: 'center',
          }}>
          <Image source={require('@/assets/images/chat/divide.png')} />
        </View>
        <View
          style={{
            width: WINDOW_WIDTH * 0.7,
            height: WINDOW_HEIGHT * 0.06,
            justifyContent: 'center',
          }}>
          <TextInput
            style={{ paddingHorizontal: 10 }}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요"
          />
        </View>
        <TouchableWithoutFeedback onPress={handleSend}>
          <View
            style={{
              width: WINDOW_WIDTH * 0.2,
              height: WINDOW_HEIGHT * 0.06,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 15, height: 20}}
              source={require('@/assets/images/06-chatroom/06-enter.png')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isOpen && (
        <View
          style={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT * 0.15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: '#F9F9F9',
            gap: 40,
          }}>
          <View style={{alignItems: 'center', gap: 10}}>
            <Image
              style={{width: 35, height: 35}}
              source={require('@/assets/images/06-chatroom/05-blue.png')}
            />
            <Text style={{fontSize: responsiveFontSize(0.8)}}>
              사진첨부하기
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <Image
              style={{width: 35, height: 35}}
              source={require('@assets/images/06-chatroom/01-yello.png')}
            />
            <Text style={{fontSize: responsiveFontSize(0.8)}}>견적서보기</Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <Image
              style={{width: 35, height: 35}}
              source={require('@assets/images/06-chatroom/04-red.png')}
            />
            <Text style={{fontSize: responsiveFontSize(0.8)}}>
              대화방나가기
            </Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatRoomContainer: {
    paddingHorizontal: '5%',
    paddingBottom: '10%',
  },
});
