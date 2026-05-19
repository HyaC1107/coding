import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Carousel from '@/components/carousel/Carousel';
const data = {
  dt: '2023년 4월 1일',
  nm: 'test',
  review: false,
  isCheck: true,
  state: 1,
};

interface SchecduleCardProps {
  ChildComponent: () => JSX.Element;
  CategoryIcon: () => JSX.Element;
  title: string;
}
export default function ScheduleProgressStateCard(
  data: SchecduleCardProps,
): JSX.Element {
  const {ChildComponent, CategoryIcon, title} = data;
  const [showPopup, setPopup] = useState(true);
  return (
    <TouchableWithoutFeedback onPress={() => setPopup(!showPopup)}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5%',
        }}>
        <CategoryIcon />
        <Text style={{fontSize: 16, fontWeight: '600'}}>{title}</Text>
        <View
          style={{
            width: '50%',
            height: 280,
            borderRadius: 10,
            shadowColor: '#ababab',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            backgroundColor: 'white',
            elevation: 3,
            borderWidth: 2,
            borderColor: '#2CB07B',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ChildComponent />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    //justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  locationWrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor: '#ff0',
    position: 'relative',
    paddingBottom: '5%',
  },

  // font Style1 : 예약중
  // font Style2 : 예약완료
  // font Style3 : 예약불가
  // fontStyle1Wrap: 예약중, 예약완료 wrap
  // fontStyleOtherWrap: 예약불가wrap
  fontaStyle1Wrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fontStyle1: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#656565',
    fontWeight: '600',
  },
  fontStyle2: {
    paddingLeft: '5%',
    paddingRight: '5%',
    color: '#2CB07B',
    fontWeight: '600',
  },
  fontStyleOtherWrap: {
    borderTopWidth: 1,
    borderColor: '#F1F1F5',
    padding: '2%',
    alignItems: 'center',
  },
  fontStyle3: {
    paddingLeft: '5%',
    color: '#EB701F',
    fontWeight: '600',
  },
});
