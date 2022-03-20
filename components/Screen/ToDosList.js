import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function ToDo({ navigation, route, toDosList, bgColor }) {
    const [toDo, setToDo] = useState([])
    const [checked, setChecked] = useState([])
    const [checkBtn, setCheckBtn] = useState('Check all')

    useEffect(() => {
        setToDo(toDosList.map(item => ({ ...item, checked: false })))
    }, [toDosList])

    const checkItem = (key) => {
        setToDo(prev =>
            (prev.map(item => item.key == key ? { ...item, checked: !item.checked } : item))
        )
    }
    useEffect(() => {
        setChecked(toDo.filter(item => item.checked).map(item => item.key))
    }, [toDo])

    const deleteSelected = () => {
        navigation.navigate('ToDo', { method: 'deleteMultiple', keys: checked })
    }

    const completeSelected = () => {
        navigation.navigate('ToDo', { method: 'completeMultiple', keys: checked })
    }
    const checkAll = () => {
        setToDo(prev => prev.map(item => ({ ...item, checked: !item.checked })))
        setCheckBtn(prev=> prev=='Check all'?"Uncheck all":"Check all")
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={[s.container, { backgroundColor: bgColor, flex: 1 }]}>
                {toDo.map((item) =>
                (
                    <View key={item.key} style={[s.todo]}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={[s.txt]}>
                                {item.todo}
                            </Text>
                            <Text style={[s.txt, { color: 'green' }]}>
                                {item.date}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate('EditToDo', { item: item, key: item.key }) }}>
                                <View style={[s.centerContent]}>
                                    <FontAwesome name="edit" size={24} color="blue" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('ToDo', { method: 'delete', key: item.key }) }}>
                                <View style={[s.centerContent]}>
                                    <FontAwesome name="trash-o" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { checkItem(item.key) }}>
                                <View style={[s.centerContent]}>
                                    <Feather name={item.checked ? 'check-square' : 'square'} size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                )}
            </ScrollView>
            <View style={{ flex: .05, flexDirection: 'row', justifyContent: 'space-around', }}>
                <TouchableOpacity style={[s.btns, { backgroundColor: checked.length ? "red" : '#E8E8E8' }]} onPress={deleteSelected} disabled={!checked.length}>
                    <View style={[s.btnsTxtContainer]}>
                        <Text style={{ marginHorizontal: 15 }}>
                            Delete
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            <Feather name='trash-2' size={24} color="black" />
                        </Text>
                    </View>
                </TouchableOpacity>
                {route.name!='complete'&&
                <TouchableOpacity style={[s.btns, { backgroundColor: checked.length ? "green" : '#E8E8E8' }]} onPress={completeSelected} disabled={!checked.length}>
                    <View style={[s.btnsTxtContainer]}>
                        <Text style={{ marginHorizontal: 15 }}>
                            Complete
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            <Feather name='check-square' size={24} color="black" />
                        </Text>
                    </View>
                </TouchableOpacity>}
                <TouchableOpacity style={[s.btns, { backgroundColor: '#BEBEBE' }]} onPress={checkAll}>
                    <View style={[s.btnsTxtContainer]}>
                        <Text style={{ marginHorizontal: 15, color: 'black' }}>
                            {checkBtn}
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            <Feather name='check' size={24} color="black" />
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const s = StyleSheet.create({
    centerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
        padding: 15,
    },
    date: {
        margin: 10,
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    txt: {
        textAlign: "left",
        padding: 10,
        color: "black",
        fontSize: 16
    },
    todo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 10,
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    btns: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 1
    },
    btnsTxtContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});