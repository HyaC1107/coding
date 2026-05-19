import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import styled from 'styled-components/native';

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 0px;
  height: 20%;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#656565' : '#656565')};
  width: ${props => (props.focused ? '26px' : '5px')};
  height: 5px;
  border-radius: 3px;
`;
interface CarouselProps {
  imgList?: any[];
}
export default function Carousel(data: CarouselProps): JSX.Element {
  const {imgList} = data;
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1}}>
      <View style={styles.rootWrapper}>
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: '#ff0',
          }}>
          <FlatList
            data={imgList}
            horizontal
            contentContainerStyle={{height: 100}}
            style={{
              width: '100%',
              height: 100,
            }}
            renderItem={({item}) => (
              <Image
                style={{
                  width: 150,
                  borderRadius: 3,
                  marginLeft: 10,
                }}
                source={item}
              />
            )}
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
    //justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
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
