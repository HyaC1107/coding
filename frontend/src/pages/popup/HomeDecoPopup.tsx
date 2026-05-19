import DefaultTextInput from '@/components/textinput/DefaultTextInput';
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
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
interface SelectRowProps {
  setCheck: (v: number) => void;
  check: number;
  title: string;
  d: number;
}
const SelectRow = (props: SelectRowProps) => {
  const {setCheck, check, title, d} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        //   backgroundColor: '#ff0',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheck(d);
          }}>
          <View style={styles.iconWrap}>
            <View style={check === d ? styles.iconBox : styles.iconGreyBox}>
              <Image source={require('../../assets/images/whitecheck.png')} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.textWrap}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View>
          <Text
            style={{
              color: '#B4B4B4',
              fontWeight: '700',
              fontSize: responsiveFontSize(1.6),
            }}>
            삭제
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default function HomeDecoPopup(): JSX.Element {
  const [check, setCheck] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [showPopup, setPopup] = useState(true);

  useEffect(() => {
    if (!check1 || !check2 || !check3 || !check4) setCheck(0);
  }, [check1, check2, check3, check4]);
  return (
    <View style={showPopup ? styles.rootWrapper : styles.close}>
      <View style={styles.popUpWrap}>
        <View style={styles.barWrap}>
          <View style={styles.bar}></View>
        </View>
        <View style={{height: 20, justifyContent: 'flex-start'}}>
          <View
            style={{
              width: '100%',
              //backgroundColor: '#ff0',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingLeft: '7.5%',
              flexDirection: 'row',
            }}>
            <DefaultTextInput placeholder="업무를 입력하세요" />
            <TouchableWithoutFeedback
              onPress={() => {
                // onPress action here
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}>
                <Image
                  style={{marginRight: '10%', width: 15, height: 15}}
                  source={require('@/assets/images/01-login/01-add-button.png')}
                />
                <Text>추가</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* divier---- */}
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
          }}>
          <View style={styles.divider} />
        </View>
        {/* divier---- */}
        <View
          style={{
            flexGrow: 1,
            //flex: 1,
            //backgroundColor: '#ff0',
            width: '100%',
            //minHeight: 200,
          }}>
          <ScrollView style={{width: '100%', flex: 1}}>
            <View style={styles.checkGroupWrap}>
              <SelectRow
                setCheck={setCheck}
                check={check}
                title={'카페인테리어'}
                d={1}
              />
            </View>
            <View style={styles.checkGroupWrap}>
              <SelectRow
                setCheck={setCheck}
                check={check}
                title={'집인테리어'}
                d={2}
              />
            </View>
            <View style={styles.checkGroupWrap}>
              <SelectRow
                setCheck={setCheck}
                check={check}
                title={'단독주택인테리어'}
                d={3}
              />
            </View>
            <View style={styles.checkGroupWrap}>
              <SelectRow
                setCheck={setCheck}
                check={check}
                title={'카페인테리어'}
                d={4}
              />
            </View>
            <View style={styles.checkGroupWrap}>
              <SelectRow
                setCheck={setCheck}
                check={check}
                title={'음식점인테리어'}
                d={5}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setPopup(false);
            }}>
            <View style={check !== 0 ? styles.button : styles.buttonNonActive}>
              <Text
                style={check !== 0 ? styles.btnTxt : styles.btnTxtNonActive}>
                선택하기
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  close: {display: 'none'},
  rootWrapper: {
    justifyContent: 'flex-end',
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
    height: '60%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: '100%',
    //  alignItems: 'center',
  },
  barWrap: {
    width: '100%',
    height: '15%',
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
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGreyBox: {
    borderRadius: 3,
    backgroundColor: '#F6F6F6',
    width: 20,
    height: 20,
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
    // marginLeft: '7.5%',
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
    height: '15%',
    //paddingBottom: '40%',
    //backgroundColor: '#ff0',
  },
  button: {
    backgroundColor: '#2CB07B',
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNonActive: {
    backgroundColor: '#F6F6F6',
    height: 35,
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
