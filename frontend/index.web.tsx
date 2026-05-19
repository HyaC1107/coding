import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'; // 기존 App 진입점
import { name as appName } from './app.json'; // appName 없으면 그냥 'App'으로 대체 가능

const rootTag = document.getElementById('root') || document.createElement('div');

AppRegistry.registerComponent(appName || 'App', () => App);
AppRegistry.runApplication(appName || 'App', {
  rootTag
});