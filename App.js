import 'react-native-gesture-handler';//for navigation
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import ToDo from './components/Screen/ToDo';
import AddToDo from './components/Screen/AddTodos';
import EditToDo from './components/Screen/EditTodo';
import { createStackNavigator } from '@react-navigation/stack';
import { getDataObject, storeDataObject, clearStorage } from './Storage';

const Stack = createStackNavigator();

const storeData = async () => {
  await console.log(await storeDataObject({ todo: 'kzdev370', description: 'lurem ipsom', date: '1648123936', status: "pending" }))
}

const getData = async () => {
  console.log(await getDataObject())
}
const clearS = async () => {
  console.log(await clearStorage())
}

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
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button onPress={async () => storeData()} title="storeData" />
          <Button onPress={async () => getData()} title="getData" />
          <Button onPress={async () => clearS()} title="clear" />
        </View> */}
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
