import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import ToDoList from './ToDosList'

const MaterialTopTab = createMaterialTopTabNavigator();

export default function ToDo({ navigation, route }) {
    const [toDoList, setToDoList] = useState([])

    const pending = toDoList.filter(toDo=>toDo.status == 'pending')
    const complete = toDoList.filter(toDo=>toDo.status == 'complete')
    const overdue = toDoList.filter(toDo=>toDo.status == 'overdue')

    useEffect(() => {
        if (route.params) {
            if (route.params.newTodo) {
                const newTodo = route.params.newTodo
                if (route.params.method == 'add') {
                    setToDoList(prev => { return [...prev, newTodo] })
                    
                } else {
                    setToDoList(prev => ([prev.filter(item => item.key != newTodo.key)]))
                    setToDoList(prev => ([...prev, newTodo]))
                }
            }
            navigation.dispatch(
                CommonActions.navigate({
                    name: route.name,
                    params: "ToDo",
                })
            );
        }
    }, [route.params])

    return (
        <View style={{ flex: 1 }}>
            <MaterialTopTab.Navigator>
                <MaterialTopTab.Screen name="pending">
                {props => <ToDoList {...props} toDosList={pending} bgColor='yellow' />}
                </MaterialTopTab.Screen>
                <MaterialTopTab.Screen name="complete">
                {props => <ToDoList {...props} toDosList={complete} bgColor='lawngreen' />}
                </MaterialTopTab.Screen>
                <MaterialTopTab.Screen name="overdue">
                {props => <ToDoList {...props} toDosList={overdue} bgColor='Overdue' />}
                </MaterialTopTab.Screen>
            </MaterialTopTab.Navigator>

            <TouchableOpacity onPress={() => { navigation.navigate('AddToDo', { lastKey: toDoList.length }) }} disabled={false}>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingHorizontal: 22, paddingVertical: 15 }}>
                    Add new To-do
                </Text>
            </TouchableOpacity>
        </View>
    );
}
