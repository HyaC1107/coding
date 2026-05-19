import React, {useState, useCallback} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import ChatListItem from './ConstructionChatListIem';
import {WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { useAuth } from '@/context/AuthContext';
import { get } from '@/utils/api';

export default function ConstructionChatList(): JSX.Element {
  const navigation = useNavigation<any>();
  const { auth } = useAuth();
  const [item, setItem] = useState(1);
  const [rooms, setRooms] = useState<any[]>([]);

  const fetchRooms = useCallback(async () => {
    if (!auth?.userId) return;
    try {
      const data = await get('/chat/rooms', { userId: auth.userId });
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  }, [auth?.userId]);

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, [fetchRooms])
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(1);
          }}>
          <View style={item === 1 ? styles.tabActiveStyle : styles.tabStyle}>
            <Text
              style={
                item === 1
                  ? {
                      color: '#2CB07B',
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.6),
                    }
                  : {
                      color: '#CCCCCC',
                      fontSize: responsiveFontSize(1.6),
                      fontWeight: 'bold',
                    }
              }>
              고객 채팅방
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setItem(2);
          }}>
          <View style={item === 2 ? styles.tabActiveStyle : styles.tabStyle}>
            <Text
              style={
                item === 2
                  ? {
                      color: '#2CB07B',
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.6),
                    }
                  : {
                      color: '#CCCCCC',
                      fontSize: responsiveFontSize(1.6),
                      fontWeight: 'bold',
                    }
              }>
              중장비 채팅방
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {rooms.map((room) => {
          const otherParticipant = room.participants.find((p: string) => p !== auth?.userId);
          return (
            <ChatListItem 
              key={room._id}
              roomId={room._id}
              thumbnail={require('@/assets/images/chat/pick1.png')}
              sender={otherParticipant || '고객님'}
              chatContents={room.lastMessage || '메시지가 없습니다.'}
              receivedTime={room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleDateString() : ''}
              numberOfMessage={0}
              disconnected={false}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 20,
  },
  tabActiveStyle:
    Platform.OS === 'android'
      ? {
          width: WINDOW_WIDTH * 0.45,
          borderBottomWidth: 2,
          borderColor: '#2CB07B',
          alignItems: 'center',
          height: 50,
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingTop: '4%',
        }
      : {
          width: WINDOW_WIDTH * 0.45,
          borderBottomWidth: 2,
          borderColor: '#2CB07B',
          alignItems: 'center',
          height: 60,
          paddingTop: '8%',
          justifyContent: 'center',
        },
  tabStyle:
    Platform.OS === 'android'
      ? {
          width: WINDOW_WIDTH * 0.45,
          borderBottomWidth: 2,
          borderColor: '#F9F9F9',
          height: 50,
          justifyContent: 'center',
          backgroundColor: 'white',
          alignItems: 'center',
          paddingTop: '4%',
        }
      : {
          width: WINDOW_WIDTH * 0.45,
          borderBottomWidth: 2,
          borderColor: '#F9F9F9',
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          paddingTop: '8%',
          backgroundColor: 'white',
        },
});
