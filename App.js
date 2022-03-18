import 'react-native-gesture-handler';//for navigation
import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
// import Nav from './components/Navigator/Stack'
// import Nav from './components/Navigator/NativeStack'
// import Nav from './components/Navigator/Drawer'
// import Nav from './components/Navigator/MaterialBottomTabs'
import Nav from './components/Navigator/MaterialTopTabs'
// import Nav from './components/Navigator/BottomTabs'

import screens from './components/Screen/Screens'

export default function App() {
  return (
    <NavigationContainer >
      <View style={[{ paddingTop: Constants.statusBarHeight }]}></View>
      <Nav screen={screens} tabBarPosition="top" />
    </NavigationContainer>
  );
}
