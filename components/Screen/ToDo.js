import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import TopMaterialNav from '../Navigator/MaterialTopTabs'
import { ToDoScreen } from './Screens';

export default function ToDo({ navigation, route }) {
    const [pendingList, setPendingList] = useState([{ key: 1, type: "pending", todo: "pendingItemOne", date: new Date().toLocaleDateString() }])
    const [completedList, setCompletedList] = useState([{ key: 1, type: "complete", todo: "completedItemOne", date: new Date().toLocaleDateString() }])
    const [overdueList, setOverdueList] = useState([{ key: 1, type: "overdue", todo: "overdueItemOne", date: new Date().toLocaleDateString() }])

    const toDosNav = ToDoScreen(pendingList, completedList, overdueList)

    const addTodo = (e) => {
        console.log(e)
        const dateParams = e.date
        const date = `${dateParams.day}/${dateParams.month}/${dateParams.year}   ${dateParams.hour}:${dateParams.minute} ${dateParams.AmPm}`
        const newKey = pendingList.length + 1
        console.log(newKey)
        setPendingList(prev => ({ ...prev, key: newKey, date: date, todo: e.todo, type: 'pending' }))
        console.log(pendingList)
    }

    return (
        <View style={{ flex: 1 }}>
            <TopMaterialNav screen={toDosNav} addTodo={(e) => { addTodo(e) }} />
            <TouchableOpacity onPress={() => { navigation.navigate('Add Todo') }} disabled={false}>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingHorizontal: 22, paddingVertical: 15 }}>
                    Add new To-do
                </Text>
            </TouchableOpacity>
        </View>
    );
}
