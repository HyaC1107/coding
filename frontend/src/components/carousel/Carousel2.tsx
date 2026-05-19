import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {PathConfig} from '@react-navigation/native';

import styled from 'styled-components/native';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 10px;
`;
const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;
interface CarouselProps {
  data: string[];
}
export default function Carousel2(caroselProps: CarouselProps): JSX.Element {
  const {data} = caroselProps;
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {}, []);
  return (
    <View style={{height: '100%'}}>
      <View style={styles.rootWrapper}>
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={data}
            horizontal
            style={{width: '100%'}}
            renderItem={({item}: any) => {
              return (
                <View
                  style={{
                    marginRight: 10,
                    //backgroundColor: '#ababab',
                  }}>
                  <Image style={{height: 120, width: 200}} source={item} />
                </View>
              );
            }}
            onScroll={e => {
              Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                useNativeDriver: false,
              });
              const newPage = Math.round(e.nativeEvent.contentOffset.x / 205);
              setPage(newPage);
            }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
          <IndicatorWrapper>
            {Array.from({length: 3}, (_, i) => i).map(i => (
              <Indicator key={`indicator_${i}`} focused={i === page} />
            ))}
          </IndicatorWrapper>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    //height: '100%',
    //backgroundColor: '#ababab',
    paddingLeft: '5%',
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
});
