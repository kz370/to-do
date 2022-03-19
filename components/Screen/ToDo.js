import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import TopMaterialNav from '../Navigator/MaterialTopTabs'
import { ToDoScreen } from './Screens';

export default function ToDo({ navigation }) {
    const [toDoList, settoDoList] = useState([])
    const [pendingList, setPendingList] = useState([])
    const [completedList, setCompletedList] = useState([])
    const [overdueList, setOverdueList] = useState([])
    const [toDosNav, setTodosNav] = useState(ToDoScreen(pendingList, completedList, overdueList))

    useEffect(() => {
        const pending = toDoList.filter(item => item.status == "pending");
        const complete = toDoList.filter(item => item.status == "complete");
        const overdue = toDoList.filter(item => item.status == "overdue");
        setPendingList(pending)
        setCompletedList(complete)
        setOverdueList(overdue)
        setTodosNav(ToDoScreen(pendingList, completedList, overdueList))
    },[toDoList])


    return (
        <View style={{ flex: 1 }}>
            <TopMaterialNav screen={toDosNav} />
            <TouchableOpacity onPress={() => { navigation.navigate('Add Todo',{lastKey:toDoList.length}) }} disabled={false}>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingHorizontal: 22, paddingVertical: 15 }}>
                    Add new To-do
                </Text>
            </TouchableOpacity>
        </View>
    );
}
