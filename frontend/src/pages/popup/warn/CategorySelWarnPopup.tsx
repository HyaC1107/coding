import { WINDOW_HEIGHT } from '@/constants/context';
import { BlurView } from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
// import "com.reactnativecommunity.blurview.BlurViewPackage"

export default function CategorySelWarnPopup(): JSX.Element {
  const [check, setCheck] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [showPopup, setPopup] = useState(true);
  const [blurType, setBlurType] = useState('light');
  const [viewRef, setViewRef] = useState(null);

  useEffect(() => {
    if (!check1 || !check2 || !check3 || !check4) setCheck(0);
  }, [check1, check2, check3, check4]);
  return (
    <View style={showPopup ? styles.rootWrapper : styles.close}>      
      {/* <BlurView
        // viewRef={viewRef}
        style={styles.blurViewStyle}
        // blurRadius={1}
        // blurType={'light'}
        // Additional available on Android
        blurRadius={20}
        // downsampleFactor={10}
        // overlayColor={'rgba(0, 0, 255, .6)'}
      /> */}
      <View
        style={{
          width: WINDOW_HEIGHT * 0.3,
          height: WINDOW_HEIGHT * 0.3,
          borderRadius: 20,
          backgroundColor: 'rgba(0,0,0,0.9)',
        }}>
        <TouchableWithoutFeedback onPress={() => setPopup(!showPopup)}>
          <View style={{width: '100%', alignItems: 'flex-end', padding: '10%'}}>
            <Image source={require('../../../assets/images/close.png')} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{width: '100%', alignItems: 'center', paddingBottom: '10%'}}>
          <Image source={require('../../../assets/images/popup-check.png')} />
        </View>
        <View style={{width: '100%', alignItems: 'center', padding: '5%'}}>
          <Text style={{color: 'white', fontSize: responsiveFontSize(1.3), paddingBottom: '5%'}}>
            업체를 선정하지 못한 카테고리가 있습니다
          </Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(1.3)}}>
            다시한번 확인하고 다음을 눌러주세요
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  close: {display: 'none'},
  rootWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    
    // backdrop-filter: blur(5px);
    // backgrou: 0.5,
    position: 'absolute',
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  popUpWrap: {
    // position: 'absolute',
    backgroundColor: 'white',
    height: '70%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    borderWidth: 3,
    marginBottom: '5%',
    width: '30%',
    //marginBottom: '5%',
    borderColor: '#D8D8D8',
  },
  modalTitle: {},
  checkGroupWrap: {
    width: '100%',
    minHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '7.5%',
    flex: 1,
  },
  checkSubGroupWrap: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '2%',
    paddingLeft: '18%',
  },
  iconWrap: {
    width: '6%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    borderRadius: 3,
    backgroundColor: '#2CB07B',
    width: WINDOW_HEIGHT * 0.03,
    height: WINDOW_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBox: {
    borderRadius: 3,
    backgroundColor: '#F6F6F6',
    width: WINDOW_HEIGHT * 0.03,
    height: WINDOW_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: '2%',
  },
  text: {fontSize: 13},
  divider: {
    borderWidth: 1,
    borderColor: '#F6F6F6',
    width: '85%',
    marginBottom: '5%',
  },
  iconWrapSmall: {
    width: '6.2%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxSmall: {
    borderRadius: 5,
    backgroundColor: '#2CB07B',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBoxSmall: {
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSmallWrap: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  textSmall: {
    fontSize: 12,
    //  backgroundColor: '#ff0',
  },
  buttonWrap: {
    width: '100%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    //justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
    //paddingBottom: '40%',
    //backgroundColor: '#ff0',
  },
  button: {
    backgroundColor: '#2CB07B',
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNonActive: {
    backgroundColor: '#F6F6F6',
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnTxt: {
    color: 'white',
    fontSize: 15,
  },
  btnTxtNonActive: {
    color: '#000',
    fontSize: 15,
  },
});
