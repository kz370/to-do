import 'react-native-gesture-handler';//for navigation
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './components/Navigator/Stack';
import ToDo from './components/Screen/ToDo';
import AddTodos from './components/Screen/AddTodos';


const StackScreen = [
  {
   key: 1,
   name: "TodoList",
   component: ToDo,
 },
  {
   key: 2,
   name: "Add Todo",
   component: AddTodos,
 }
]

export default function App() {
  return (
    <NavigationContainer >
      <View style={[{ paddingTop: Constants.statusBarHeight }]}></View>
      <StackNav screen={StackScreen} default={"TodoList"}/>
    </NavigationContainer>
  );
}
