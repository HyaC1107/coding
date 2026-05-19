import {WINDOW_HEIGHT} from '@/constants/context';
import {useNavigation} from '@react-navigation/native';
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

// ..
interface ChatHeaderProps {
  sender: string;
  thumbnail: ImageProps;
  senderAddress: string;
  isLoggedin?: boolean;
}
export default function ChatHeader(data: ChatHeaderProps) {
  const {sender, senderAddress, thumbnail} = data;
  const navigate = useNavigation<any>();
  return (
    <View style={styles.headerRootWrap}>
      <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
        <View style={styles.backWrap}>
          <Image
            source={require('@/assets/images/back.png')}
            style={{width: 9.8, height: 15.4}}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.headerTitleWrap}>
          <Image
            style={{
              width: 50,
              height: 50,
              marginBottom: 10,
            }}
            resizeMode="contain"
            source={thumbnail}
          />
          <Text
            style={
              Platform.OS === 'android'
                ? {
                    fontSize: responsiveFontSize(1.8),
                  }
                : {
                    fontSize: responsiveFontSize(1.8),
                    paddingBottom: 1,
                  }
            }>
            {sender}
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(1.2),
            }}>
            {senderAddress}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate.navigate('Alarm')}>
        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#416292',
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require('@/assets/images/06-chatroom/07-phone.png')} // 수정사항 전달받은 아이콘 적용함
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  headerRootWrap:
    Platform.OS === 'android'
      ? {
          alignItems: 'center',
          //height: WINDOW_HEIGHT * 0.15,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderBottomColor: '#e9edef',
          borderBottomWidth: 1,
          height: 120,
        }
      : {
          alignItems: 'center',
          height: 135,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderBottomColor: '#e9edef',
          borderBottomWidth: 1,
          paddingTop: 30,
        },
  backWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ff0',
    width: '20%',
  },
  headerTitleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#ff0000',
    width: '60%',
    height: '100%',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
