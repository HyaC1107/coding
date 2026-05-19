import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomTextInput from '../../components/textinput/TextInput';
import PssWdTextInput from '../../components/textinput/PsswdTextInput';
import {WINDOW_WIDTH} from '@/constants/context';
import CustomText from '../CustomText';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
interface cardProps {
  imageSrc: any;
  text: string;
  setType: (data: string) => void;
  userType: string;
  value: string;
}
export default function TypeCard(data: cardProps): JSX.Element {
  const {imageSrc, text, setType, userType, value} = data;
  return (
    <View style={styles.TypeCardWrapper}>
      <TouchableWithoutFeedback
        onPressIn={() => {
          setType(value);
        }}>
        <View
          style={
            userType === value ? styles.cardWrap : styles.cardWrapNoneActive
          }>
          <View style={styles.checkIconWrap}>
            {imageSrc ? (
              <Image
                style={
                  userType === value
                    ? styles.checkIcon
                    : styles.checkIconOffWrap
                }
                source={require('../../assets/images/check.png')}
                alt="icon"
              />
            ) : (
              <Image
                style={
                  userType === value
                    ? styles.checkIconWithoutImage
                    : styles.checkIconOffWrap
                }
                source={require('../../assets/images/check.png')}
                alt="icon"
              />
            )}
          </View>
          {imageSrc && (
            <View style={styles.personFillWrap}>
              <Image source={imageSrc} alt="icon" style={styles.personFill} />
            </View>
          )}
          {imageSrc ? (
            <View style={styles.cardTxtWrap}>
              <CustomText style={styles.cardTxt}>{text}</CustomText>
            </View>
          ) : (
            <View style={styles.cardTxtWrapWithoutImg}>
              <CustomText style={styles.cardTxt}>{text}</CustomText>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  TypeCardWrapper: {
    justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    width: WINDOW_WIDTH * 0.4,
    height: WINDOW_WIDTH * 0.4,
  },
  cardWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#2CB07B',
    justifyContent: 'center',
  },
  cardWrapNoneActive: {
    width: '100%',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '63%',
    borderWidth: 1,
    borderRadius: 20,
    color: '#E2E2E2',
    // backgroundColor: '#ff0',
  },
  cardTxtWrap: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTxtWrapWithoutImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTxt: {
    color: '#000',
    fontSize: responsiveFontSize(1.8),
  },
  checkIconWrap: {
    alignItems: 'flex-end',
    width: '100%',
    // height: '25%',
    justifyContent: 'center',
    paddingRight: 10,
    //backgroundColor: '#ff0',
  },
  checkIconOffWrap: {
    display: 'none',
  },
  checkIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: -20,
    right: 10,
  },
  checkIconWithoutImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: -55,
    right: 10,
  },
  personFill: {
    width: 50,
    height: 50,
  },
  personFillWrap: {
    height: '40%',
    //backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
