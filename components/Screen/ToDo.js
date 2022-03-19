import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import TopMaterialNav from '../Navigator/MaterialTopTabs'
import { ToDoScreen } from './Screens';

export default function ToDo({ navigation, route }) {
    const [pendingList, setPendingList] = useState([{ key: 1, type: "pending", todo: "pendingItemOne", date: new Date().toLocaleDateString() }])
    const [completedList, setCompletedList] = useState([{ key: 1, type: "complete", todo: "completedItemOne", date: new Date().toLocaleDateString() }])
    const [overdueList, setOverdueList] = useState([{ key: 1, type: "overdue", todo: "overdueItemOne", date: new Date().toLocaleDateString() }])
    const [toDosNav,setTodosNav] =useState(ToDoScreen(pendingList, completedList, overdueList))

    return (
        <View style={{ flex: 1 }}>
            <TopMaterialNav screen={toDosNav} />
            <TouchableOpacity onPress={() => { navigation.navigate('Add Todo') }} disabled={false}>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingHorizontal: 22, paddingVertical: 15 }}>
                    Add new To-do
                </Text>
            </TouchableOpacity>
        </View>
    );
}
