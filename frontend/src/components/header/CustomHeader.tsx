import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Platform} from 'react-native';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// ..
interface CustomHeaderProp {
  title: string | JSX.Element;
  isLogin?: boolean;
  isNonSelect?: boolean;
}
export default function CustomHeader(data: CustomHeaderProp) {
  const {title, isLogin} = data;
  const [isPress, setState] = useState(false);
  const navigate = useNavigation<any>();

  return (
    <View
      style={isLogin ? styles.headerRootWrap : styles.headerRootWrapNonLogin}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 60,
        }}>
        <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
          <View style={styles.backWrap}>
            <Image
              source={require('@/assets/images/back.png')}
              style={{width: 9.8, height: 15.4}}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setState(!isPress);
          }}>
          <View style={styles.headerTitleWrap}>
            {typeof title === 'string' ? (
              <Text style={styles.titleStyle}>{title}</Text>
            ) : (
              title
            )}
          </View>
        </TouchableWithoutFeedback>
        {/* {!isLogin && ( */}
          <TouchableWithoutFeedback onPress={() => navigate.navigate('Alarm')}>
            <View
              style={
                Platform.OS === 'android'
                  ? {
                      width: '15%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
                  : {
                      width: '15%',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      height: '100%',
                    }
              }>
              <Image source={require('@/assets/images/alarm0.5.png')} />
            </View>
          </TouchableWithoutFeedback>
        {/* )} */}
        <View style={styles.backWrap}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerRootWrap:
    Platform.OS === 'android'
      ? {
          alignItems: 'flex-end',
          backgroundColor: 'white',
          height: 70,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }
      : {
          alignItems: 'flex-end',
          backgroundColor: 'white',
          height: 70,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          //paddingBottom: '3%',
          //paddingTop: ,
          paddingBottom: 5,
        },
  headerRootWrapNonLogin:
    Platform.OS === 'android'
      ? {
          alignItems: 'center',
          backgroundColor: 'white',
          height: Dimensions.get('window').height * 0.1,
          minHeight: 80,
          // maxHeight: 80,
          width: '100%',
          flexDirection: 'row',

          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#f6f6f6',
        }
      : {
          alignItems: 'center',
          backgroundColor: 'white',
          height: Dimensions.get('window').height * 0.1,
          minHeight: 75,
          // maxHeight: 80,
          width: '100%',
          flexDirection: 'row',

          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#f6f6f6',
          paddingBottom: '5%',
        },
  backWrap:
    Platform.OS === 'ios'
      ? {
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '15%',
          height: '100%',
        }
      : {
          alignItems: 'center',
          justifyContent: 'center',
          width: '15%',
        },
  headerTitleWrap:
    Platform.OS === 'ios'
      ? {
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '70%',
          height: '100%',
        }
      : {
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
          height: '100%',
        },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
