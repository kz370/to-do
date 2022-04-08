import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { timeStampToDate } from '../functions';
import { updateDataObject, deleteDataObject } from '../functions';
import { s } from '../Style'

export default function ToDo({ navigation, route, toDosList, bgColor, onSetVal }) {
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
            Alert.alert("Warning", 'Are you sure you want to delete selected', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        deleteDataObject(checked)
                        onSetVal()
                    }
                },
            ])
        }

        const completeSelected = () => {
            Alert.alert("Warning", 'Are you sure you completed selected', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        updateDataObject(null, checked)
                        onSetVal()
                    }
                },
            ])
        }
        const checkAll = () => {
            setToDo(prev => prev.map(item => ({ ...item, checked: checked.length ? false : true })))
        }

        const editSelected = () => {
            const item = toDo.filter(item => item.checked)[0]
            navigation.navigate('EditToDo', { item: item })
        }


        if (toDo.length > 0 || route.name !== 'pending') {
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
                                        {timeStampToDate(Date.parse(item.date))[2]}
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
                    <View style={{ flex: .08, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={[{ flex: 1, justifyContent: 'center', backgroundColor: !editKey.disabled ? "rgb(0,123,255)" : '#E8E8E8' }]} onPress={editSelected} disabled={editKey.disabled}>
                            <View style={[s.btnsTxtContainer]}>
                                <Text style={{ marginHorizontal: 5, color: editKey.disabled ? 'black' : "white" }}>
                                    edit
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    <FontAwesome name="edit" size={20} color={editKey.disabled ? 'black' : "white"} />
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ flex: 1, justifyContent: 'center', backgroundColor: checked.length ? "rgb(220,53,69)" : '#E8E8E8' }]} onPress={deleteSelected} disabled={!checked.length}>
                            <View style={[s.btnsTxtContainer]}>
                                <Text style={{ marginHorizontal: 5, color: checked.length ? 'white' : "black" }}>
                                    Delete
                                </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    <Feather name='trash-2' size={20} color={checked.length ? 'white' : "black"} />
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {route.name != 'complete' &&
                            <TouchableOpacity style={[{ flex: 1, justifyContent: 'center', backgroundColor: checked.length ? "#58A745" : '#E8E8E8' }]} onPress={completeSelected} disabled={!checked.length}>
                                <View style={[s.btnsTxtContainer]}>
                                    <Text style={{ marginHorizontal: 5, color: checked.length ? 'white' : "black" }}>
                                        Complete
                                    </Text>
                                    <Text style={{ textAlign: 'center' }}>
                                        <Feather name='check-square' size={20} color={checked.length ? 'white' : "black"} />
                                    </Text>
                                </View>
                            </TouchableOpacity>}
                        <TouchableOpacity style={[{ flex: 1, justifyContent: 'center', backgroundColor: toDo.length ? '#BEBEBE' : '#E8E8E8' }]} onPress={checkAll} disabled={!toDo.length}>
                            <View style={[s.btnsTxtContainer]}>
                                <Text style={{ marginHorizontal: 5, color: checked.length ? 'white' : "black" }}>
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
        } else {
            return (
                <View style={[s.container, s.centerContent, { backgroundColor: bgColor }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddToDo')} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontSize: 50 }}>
                            <Text style={{ fontSize: 20 }}>
                                There are no tasks pleas press to add{"\n\n\n\n"}
                            </Text>
                            New Task
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    } catch (err) {
        console.log(err)
        return (
            <View>

            </View>
        )
    }
}


