/**
 * @format
 */

import {AppRegistry, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {setCustomText} from 'react-native-global-props';

const customFont = {
  fontFamily: 'NotoSansKR',
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'NotoSansKR',
  },
  // other styles...
});
const customTextProps = {
  style: {
    fontFamily: 'Noto Sans Kr',
  },
};
const RootComponent = () => {
  useEffect(() => {
    setCustomText(customTextProps);
    // Text.style = {fontFamily: 'Noto Sans Kr'};
  }, []);
  return <App />;
};

AppRegistry.registerComponent(appName, () => RootComponent);
