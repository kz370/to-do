import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { timeStampToDate } from '../functions';

export default function ToDo({ navigation, route, toDosList, bgColor }) {
    try {
        const [toDo, setToDo] = useState([])
        const [checked, setChecked] = useState([])
        const [editKey, setEditKey] = useState({ key: null, disabled: false })

        useEffect(() => {
            setToDo(toDosList.map(item => ({ ...item, checked: false })))
        }, [toDosList])

        const checkItem = (id) => {
            setToDo(prev =>
                (prev.map(item => item.id == id ? { ...item, checked: !item.checked } : item))
            )
        }
        useEffect(() => {
            const nextList = toDo.filter(item => item.checked).map(item => item.id)
            setChecked(nextList)
            if (nextList.length == 1) {
                setEditKey({ key: nextList[0], disabled: false })
            } else {
                setEditKey({ key: null, disabled: true })
            }
        }, [toDo])

        const deleteSelected = () => {
            navigation.navigate('ToDo', { method: 'delete', ids: checked })
        }

        const completeSelected = () => {
            navigation.navigate('ToDo', { method: 'completeMultiple', ids: checked })
        }
        const checkAll = () => {
            setToDo(prev => prev.map(item => ({ ...item, checked: checked.length ? false : true })))
        }

        const editSelected = () => {
            const item = toDo.filter(item => item.checked)[0]
            navigation.navigate('EditToDo', { item: item })
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={[s.container, { backgroundColor: bgColor, flex: 1 }]}>
                    {toDo.map((item) =>
                    (

                        <Pressable key={item.id} style={[s.todo]} onPress={() => { checkItem(item.id) }} elevation={5}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={[s.txt]}>
                                    {item.todo}
                                </Text>
                                <Text style={[s.txt, { color: 'green' }]}>
                                    {timeStampToDate(item.date)}
                                </Text>
                                <Text style={[s.txt, { color: 'green' }]}>
                                    {item.description}
                                </Text>
                            </View>
                            <View>
                                <View style={[s.centerContent]}>
                                    <Feather name={item.checked ? 'check-square' : 'square'} size={24} color="black" />
                                </View>
                            </View>
                        </Pressable>
                    )
                    )}
                </ScrollView>
                <View style={{ flex: .05, flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={[s.btns, { backgroundColor: !editKey.disabled ? "skyblue" : '#E8E8E8' }]} onPress={editSelected} disabled={editKey.disabled}>
                        <View style={[s.btnsTxtContainer]}>
                            <Text style={{ marginHorizontal: 5 }}>
                                edit
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                <FontAwesome name="edit" size={24} color="blue" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.btns, { backgroundColor: checked.length ? "red" : '#E8E8E8' }]} onPress={deleteSelected} disabled={!checked.length}>
                        <View style={[s.btnsTxtContainer]}>
                            <Text style={{ marginHorizontal: 5 }}>
                                Delete
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                <Feather name='trash-2' size={20} color="black" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {route.name != 'complete' &&
                        <TouchableOpacity style={[s.btns, { backgroundColor: checked.length ? "green" : '#E8E8E8' }]} onPress={completeSelected} disabled={!checked.length}>
                            <View style={[s.btnsTxtContainer]}>
                                <Text style={{ marginHorizontal: 5, color: "black" }}>
                                    Complete
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    <Feather name='check-square' size={20} color="black" />
                                </Text>
                            </View>
                        </TouchableOpacity>}
                    <TouchableOpacity style={[s.btns, { backgroundColor: toDo.length ? '#BEBEBE' : '#E8E8E8' }]} onPress={checkAll} disabled={!toDo.length}>
                        <View style={[s.btnsTxtContainer]}>
                            <Text style={{ marginHorizontal: 5, color: 'black' }}>
                                {checked.length ? "Uncheck all" : "Check all"}
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                <Feather name='check' size={20} color="black" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } catch (err) {
        console.log(err)
        return (
            <View>

            </View>
        )
    }
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
        paddingTop: 10
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
        borderBottomColor: 'skyblue',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginBottom: 10
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