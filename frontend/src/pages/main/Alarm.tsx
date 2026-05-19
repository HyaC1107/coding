import React, {useCallback, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/context';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { get, patch } from '@/utils/api';

export default function Alarm(): JSX.Element {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await get('/notifications');
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications])
  );

  const handleRead = async (id: string, type: string) => {
    try {
      await patch(`/notifications/${id}/read`);
      // Optional: Navigate based on notification type
      // fetchNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleReadAll = async () => {
    try {
      await patch('/notifications/read-all');
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{ padding: 10, alignItems: 'flex-end' }}>
        <TouchableWithoutFeedback onPress={handleReadAll}>
          <Text style={{ color: '#2CB07B', fontWeight: 'bold', fontSize: 12 }}>전체 읽음 처리</Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isLoading && notifications.length === 0 ? (
          <ActivityIndicator size="large" color="#2CB07B" style={{ marginTop: 50 }} />
        ) : notifications.length > 0 ? (
          notifications.map((el, i) => {
            const currentDate = formatDate(el.createdAt);
            const prevDate = i > 0 ? formatDate(notifications[i - 1].createdAt) : null;
            const showDate = currentDate !== prevDate;

            return (
              <View key={el._id || i}>
                {showDate && (
                  <Text
                    style={{
                      width: '100%',
                      backgroundColor: '#f9f9f9',
                      textAlign: 'center',
                      padding: 10,
                      color: '#656565',
                      fontSize: responsiveFontSize(1.4),
                    }}>
                    {currentDate}
                  </Text>
                )}
                <TouchableWithoutFeedback onPress={() => handleRead(el._id, el.type)}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomColor: '#F0F3F4',
                      borderBottomWidth: 1,
                      paddingVertical: 15,
                      backgroundColor: el.isRead ? 'white' : '#f0f9f4',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        paddingLeft: '5%',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: el.isRead ? '#ccc' : '#2CB07B',
                          borderRadius: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image 
                          source={require('@/assets/images/alarm0.5.png')} 
                          style={{ width: 25, height: 25, tintColor: 'white' }} 
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 15,
                        paddingRight: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.6),
                          fontWeight: 'bold',
                          color: '#334856',
                          marginBottom: 5,
                        }}>
                        {el.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.4),
                          color: '#666',
                        }}>
                        {el.message}
                      </Text>
                    </View>
                    {el.type === 'review_request' && !el.isRead && (
                      <View
                        style={{
                          backgroundColor: '#2CB07B',
                          height: 30,
                          borderRadius: 15,
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          marginRight: 10,
                        }}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>리뷰쓰기</Text>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })
        ) : (
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text style={{ color: '#999' }}>알림 내역이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
});
