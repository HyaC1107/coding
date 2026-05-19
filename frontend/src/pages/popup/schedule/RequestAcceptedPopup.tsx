import { WINDOW_HEIGHT } from '@/constants/context';
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
import {SafeAreaView} from 'react-native-safe-area-context';
interface RequestPopupProp {
  showPopup: boolean;
  handlePopup: () => void;
}
export default function RequestAcceptedPopup(
  data: RequestPopupProp,
): JSX.Element {
  const {showPopup, handlePopup} = data;
  const [check, setCheck] = useState(false);

  return (
    <View style={showPopup ? styles.rootWrapper : styles.close}>
      <View
        style={{
          width: WINDOW_HEIGHT * 0.3,
          height: WINDOW_HEIGHT * 0.3,
          borderRadius: 20,
          backgroundColor: 'rgba(0,0,0,0.9)',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            handlePopup();
            setCheck(false);
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              paddingTop: '10%',
              paddingRight: '10%',
            }}>
            <Image source={require('../../../assets/images/close.png')} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{width: '100%', alignItems: 'center', padding: '1%'}}>
          <Image source={require('../../../assets/images/popup-thum.png')} />
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: '5%'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '600',
              paddingBottom: '2%',
            }}>
            코지인테리어
          </Text>
          <Text style={{color: '#2CB07B', fontSize: 10}}>
            업체와 계약이 완료 되었습니다
          </Text>
        </View>

        <View style={{width: '100%', alignItems: 'center', paddingTop: '10%'}}>
          <Text style={{color: 'white', fontSize: 10}}>
            공사날짜는 업체에서 입력하오니
          </Text>
          <Text style={{color: 'white', fontSize: 10, paddingTop: '2%'}}>
            업체와 날짜를 상의하시길 바랍니다
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
    // backgrou: 0.5,
    position: 'absolute',
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
