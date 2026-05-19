import {WINDOW_HEIGHT} from '@/constants/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

// ..
interface SignupHeaderProps {
  title?: string;
  param: any;
}
export default function SignupHeader(data: SignupHeaderProps) {
  const {title, param} = data;
  const navigate = useNavigation<any>();
  const router = useRoute<any>();
  useEffect(() => {
    console.log(param);
  }, []);
  return (
    <View
      style={
        param === 'login' ? styles.headerLoginRootWrap : styles.headerRootWrap
      }>
      {param === 'selCompany' && (
        <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
          <View style={styles.backWrap}>
            <Image
              source={require('@/assets/images/back.png')}
              style={{width: 9.8, height: 15.4}}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback>
        <View style={styles.headerTitleWrap}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
            }}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {param === 'selCompany' && <View style={styles.headerTitleWrap}></View>}
    </View>
  );
}
const styles = StyleSheet.create({
  headerRootWrap: {
    alignItems: 'center',
    height: WINDOW_HEIGHT * 0.25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerLoginRootWrap: {
    alignItems: 'center',
    height: WINDOW_HEIGHT * 0.25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  headerTitleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ff0000',
    width: '60%',
    height: '100%',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
