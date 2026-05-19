import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomText from '@/components/CustomText';
import TypeCard from '@/components/usertype/TypeCard';
import {useNavigation} from '@react-navigation/native';
import {useMediaQuery} from 'react-responsive';

export default function LoginUserType(): JSX.Element {
  const navigation = useNavigation<any>();
  const [userType, setType] = useState('');
  const house = require('@/assets/images/house.png');
  const personFill = require('@/assets/images/person-fill.png');
  const isMiniSize = useMediaQuery({
    query: '(min-heigth: 660px)',
  });

  useEffect(() => {
    console.log(isMiniSize);
  }, []);

  return (
    <View style={styles.rootWrapper}>
      <View style={styles.typeCardRootWrap}>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log(userType);
          }}>
          {/* type card에서 회원가입유형 선택 */}
          <TypeCard
            text="회원 회원가입"
            value="customer"
            imageSrc={personFill}
            setType={setType}
            userType={userType}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            // setType('partner');
            console.log(userType);
          }}>
          <TypeCard
            text="파트너 회원가입"
            value="partner"
            imageSrc={house}
            setType={setType}
            userType={userType}
          />
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (userType === 'customer') {
            navigation.navigate('SignUp', {userType: 'customer'});
          } else {
            navigation.navigate('SelectCompanyType', {
              userType: 'partner',
            });
          }
        }}>
        <View style={isMiniSize ? styles.buttonWrapMini : styles.buttonWrap}>
          <View style={styles.button}>
            <CustomText style={styles.btnText}>다음</CustomText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  typeCardRootWrap: {
    justifyContent: 'space-between',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
    //backgroundColor: '#ff0000',
  },
  userTypeCommt: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flex: 1.3,
  },
  commtStyle: {
    color: '#000',
    fontSize: 20,
  },
  buttonWrap: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 50,
  },
  buttonWrapMini: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 120,
  },
  button: {
    borderRadius: 100,
    width: '50%',
    backgroundColor: '#000326',
    color: 'white',
    display: 'flex',
    //  height: '30%',
    // height: 50,
    height: 40,
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
});
