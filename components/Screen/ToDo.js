import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import ToDoList from './ToDosList'

const MaterialTopTab = createMaterialTopTabNavigator();

export default function ToDo({ navigation, route }) {
    const [toDoList, setToDoList] = useState([])
    const [lastKey, setLastKey] = useState(0)

    const pending = toDoList.filter(toDo => toDo.status == 'pending')
    const complete = toDoList.filter(toDo => toDo.status == 'complete')
    const overdue = toDoList.filter(toDo => toDo.status == 'overdue')

    useEffect(() => {
        if (route.params) {
            if (route.params.newTodo) {
                const newTodo = route.params.newTodo
                if (route.params.method == 'add') {
                    setToDoList(prev => { return [...prev, newTodo] })
                } if (route.params.method == 'update') {
                    const newArray = toDoList.map(item => item.key !== newTodo.key ? item : newTodo)
                    setToDoList(newArray)
                }
            } else if (route.params.method == 'delete') {
                setToDoList(prev => (prev.filter(item => item.key != route.params.key)))
            }
            else if (route.params.method == 'deleteMultiple') {
                setToDoList(prev => (prev.filter(item => !route.params.keys.includes(item.key))))
            } else if (route.params.method == 'completeMultiple') {
                const newArray = toDoList.map(item => route.params.keys.includes(item.key) ? { ...item, status: 'complete' } : item)
                setToDoList(newArray)
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
            <MaterialTopTab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 15, color: "black", fontWeight: "400", textTransform: "capitalize" },
                }}
            >
                <MaterialTopTab.Screen
                    name="pending"
                    options={{
                        title: `pending ${pending.length}`,
                        tabBarStyle: { backgroundColor: 'yellow' },
                    }}>
                    {props => <ToDoList {...props} toDosList={pending} title="test" bgColor='yellow' />}
                </MaterialTopTab.Screen>
                <MaterialTopTab.Screen
                    name="complete"
                    options={{
                        title: `complete ${complete.length}`,
                        tabBarStyle: { backgroundColor: 'lawngreen' },
                    }}>
                    {props => <ToDoList {...props} toDosList={complete} bgColor='lawngreen' />}
                </MaterialTopTab.Screen>
                <MaterialTopTab.Screen
                    name="overdue"
                    options={{
                        title: `overdue ${overdue.length}`,
                        tabBarStyle: { backgroundColor: 'mediumvioletred' },
                    }}>
                    {props => <ToDoList {...props} toDosList={overdue} bgColor='mediumvioletred' />}
                </MaterialTopTab.Screen>
            </MaterialTopTab.Navigator>

            <TouchableOpacity onPress={() => { navigation.navigate('AddToDo', { lastKey: toDoList[toDoList.length - 1] ? toDoList[toDoList.length - 1].key : 0 }) }} disabled={false}>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingHorizontal: 22, paddingVertical: 15 }}>
                    Add new To-do
                </Text>
            </TouchableOpacity>
        </View>
    );
}
