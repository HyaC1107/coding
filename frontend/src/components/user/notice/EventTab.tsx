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

export default function EventTab(): JSX.Element {
  const navigation = useNavigation<any>();
  // const [tabOpen, setTabOpen] = useState(false);
  // const [selectedItem, setItem] = useState(-1);
  useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 10,
            }}>
            <Image
              source={require('../../../assets/images/event-card-1.png')}
            />
            <Image
              source={require('../../../assets/images/event-card-2.png')}
            />
            <Image
              source={require('../../../assets/images/event-card-3.png')}
            />
          </View>
          <View
            style={{
              width: '85%',
              // alignItems: 'center',
              // justifyContent: 'center',

              height: Dimensions.get('window').height * 0.2,
            }}>
            <Text style={{fontWeight: 'bold', paddingTop: '5%'}}>참여방법</Text>
            <Text style={{fontWeight: 'bold', paddingTop: '10%'}}>
              응모방법
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
