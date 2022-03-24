import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { timeStampToDate,updateDataObject } from '../functions';

export default function EditToDo({ navigation, route }) {
    try {
        const [date, setDate] = useState(route.params.item.date);
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);
        const [todo, setTodo] = useState(route.params.item.todo)
        const [status, setStatus] = useState(route.params.item.status)
        const [selectedDate, setSelectedDate] = useState(timeStampToDate(route.params.item.date))
        const [description, setDescription] = useState(route.params.item.description)
        const [validateForm, setValidateForm] = useState(true)

        useEffect(() => {
            if (todo && description && selectedDate) {
                setValidateForm(false)
                return
            }
            setValidateForm(true)

        })

        const onChange = (event, currentDate) => {
            if (event.type === "set") {
                if (mode === 'date' && currentDate > new Date(Date.now())) {
                    console.log(currentDate)
                    const [month, day, year] = currentDate.toLocaleDateString().split('/')
                    const dateString = `${day}-${month}-${year.length > 2 ? year : `20${year}`}`
                    setSelectedDate(dateString)
                    setDate(currentDate.toLocaleDateString())
                    showMode("time");
                } else if (mode === 'time') {
                    const [hr, mn] = currentDate.toLocaleTimeString().split(':')
                    const timeString = `${hr % 12}:${mn} ${hr > 12 ? "pm" : "am"}`
                    setSelectedDate(prev => (`${prev} ${timeString}`))
                    const fullDate = `${date} ${currentDate.toLocaleTimeString()}`
                    const timeStamp = Date.parse(fullDate)
                    setDate(`${timeStamp}`)
                    setShow(false);
                }
            }
        };

        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };

        const showDatepicker = () => {
            showMode('date');
        };

        const saveTodo = async () => {
            const newTodo = { id: route.params.item.id, date: date, description: description, todo: todo, status: status }
            await updateDataObject(newTodo)
            await navigation.navigate("ToDo",{rerender:true})
        }


        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={[s.container]}>
                        <View style={[s.form]}>
                            <Text style={[s.txt]}>{selectedDate}</Text>
                            <View style={[s.dateChanger]}>
                                <TouchableOpacity onPress={showDatepicker} style={{ flex: 1 }}>
                                    <View style={[s.centerContent]}>
                                        <Text style={[s.txt]}>
                                            <FontAwesome name="calendar" size={25} color="skyblue" />
                                        </Text>
                                        <Text style={[s.txt]}>Select Date and time</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {show && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode={mode}
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <View style={[s.form]}>
                            <Text style={[s.txt]}>Todo</Text>
                            <TextInput
                                value={todo}
                                style={s.input}
                                onChangeText={(e) => setTodo(e)}
                                placeholder="add new todo"

                            />
                        </View>
                        <View style={[s.form]}>
                            <Text style={[s.txt]}>Description</Text>
                            <TextInput
                                multiline
                                value={description}
                                style={[s.input, { height: 100 }]}
                                numberOfLines={4}
                                onChangeText={(e) => setDescription(e)}
                                placeholder="Description"

                            />
                        </View>
                        <View style={[s.form]}>
                            <Picker
                                selectedValue={status}
                                onValueChange={(itemValue) =>
                                    setStatus(itemValue)
                                }>
                                <Picker.Item label="Pending" value={"pending"} />
                                <Picker.Item label="Complete" value={"complete"} />
                                <Picker.Item label="Overdue" value={"overdue"} />
                            </Picker>
                        </View>
                        <Pressable style={s.submit} opacity={validateForm ? .1 : 1} onPress={saveTodo} disabled={validateForm}>
                            <Text style={[s.txt, { fontSize: 20 }]}>
                                Save todo
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={{ height: 80 }} />
            </KeyboardAvoidingView>
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
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    date: {
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    txt: {
        textAlign: "center",
        padding: 10,
        color: "black"
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.11)',
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    dateChanger: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    todo: {
        margin: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    input: {
        borderColor: 'skyblue'
    },
    submit: {
        paddingHorizontal: 22,
        paddingVertical: 6,
        backgroundColor: 'skyblue',
        margin: 10,
        borderRadius: 10
    },
    goBackBtn: {
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    goBackTxt: {
        color: "white",
        backgroundColor: 'grey',
    }
});