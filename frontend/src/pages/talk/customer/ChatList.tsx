import React, {useState, useCallback} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import ChatListItem from './ChatListItem';
import {get} from '@/utils/api';
import {useAuth} from '@/context/AuthContext';

export default function ChatList(): JSX.Element {
  const navigation = useNavigation<any>();
  const {auth} = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);

  const fetchRooms = useCallback(async () => {
    if (!auth?.userId) return;
    try {
      const data = await get('/chat/rooms', {userId: auth.userId});
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  }, [auth?.userId]);

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, [fetchRooms]),
  );

  return (
    <ScrollView contentContainerStyle={styles.chatContainer}>
      {rooms.map(room => {
        // Find the other participant
        const otherParticipant = room.participants.find(
          (p: string) => p !== auth?.userId,
        );

        return (
          <ChatListItem
            key={room._id}
            roomId={room._id}
            thumbnail={require('@/assets/images/10-doc/01-mypage.png')} // Default thumbnail
            sender={otherParticipant || '알 수 없음'}
            chatContents={room.lastMessage || '메시지가 없습니다.'}
            receivedTime={
              room.lastMessageAt
                ? new Date(room.lastMessageAt).toLocaleDateString()
                : ''
            }
            numberOfMessage={0} // Not supported by backend yet
            disconnected={false}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chatContainer:
    Platform.OS === 'android'
      ? {
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'white',
          flex: 1,
          paddingTop: 10,
        }
      : {
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'white',
          flex: 1,
          paddingTop: 20,
        },
  borderContainer: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    height: 1,
    marginVertical: 10,
  },
});
