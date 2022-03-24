import 'react-native-gesture-handler';//for navigation
import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDo from './components/Screen/ToDo';
import AddToDo from './components/Screen/AddTodos';
import EditToDo from './components/Screen/EditTodo';

const Stack = createStackNavigator();

export default function App() {
  try {
    return (
      <NavigationContainer >
        <View style={[{ paddingTop: Constants.statusBarHeight }]}></View>
        <Stack.Navigator>
          <Stack.Screen name="ToDo" component={ToDo} />
          <Stack.Screen name="AddToDo" component={AddToDo} />
          <Stack.Screen name="EditToDo" component={EditToDo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } catch (err) {
    console.log(err)
    return (
      <View>

      </View>
    )
  }
}
