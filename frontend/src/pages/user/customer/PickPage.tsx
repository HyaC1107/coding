import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import PickCard from '@components/pick/PickCard';

export default function PickPage(): JSX.Element {
  const navigation = useNavigation<any>();

  const data = [
    {
      index: 0,
      thumUrl: require('@/assets/images/hanmaum.png'),
      storeNm: '한마음인테리어',
      like: '100',
      subscribe: '30',
      tagString: '보증보험가능 자격증보유 6개월A/S',
      detailImgList: [
        require('@assets/images/han-detail-1.png'),
        require('@assets/images/han-detail-1.png'),
        require('@assets/images/han-detail-1.png'),
      ],
    },
    {
      index: 0,
      thumUrl: require('@/assets/images/star-interior-thum.png'),
      storeNm: '스타인테리어',
      like: '100',
      subscribe: '30',
      tagString: '보증보험가능 6개월A/S',
      detailImgList: [
        require('@assets/images/star-interior-1.png'),
        require('@assets/images/star-interior-1.png'),
        require('@assets/images/star-interior-1.png'),
      ],
    },
  ];

  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 10,
              paddingTop: '5%',
            }}>
            {data.map((el, i) => {
              return <PickCard key={i} data={el} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
