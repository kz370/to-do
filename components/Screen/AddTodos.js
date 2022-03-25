import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { storeDataObject, timeStampToDate } from '../functions';

export default function AddTodos({ navigation, route }) {
    try {
        const [date, setDate] = useState(Date.now())
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);
        const [todo, setTodo] = useState(null)
        const [description, setDescription] = useState(null)
        const [selectedDate, setSelectedDate] = useState(timeStampToDate(Date.now())[0])
        const [selectedTime, setSelectedTime] = useState(timeStampToDate(Date.now())[1])
        const [validateForm, setValidateForm] = useState(true)

        useEffect(() => {
            // console.log(date,Date.now())
            if (todo && description && selectedDate && date > Date.now()) {
                setValidateForm(false)
                return true
            }
            setValidateForm(true)

        })
        const onChange = (event, currentDate) => {
            if (event.type === "dismissed") {
                setShow(false)
                return
            }
            if (mode === 'date') {
                const dateString = timeStampToDate(Date.parse(currentDate))[0]
                setSelectedDate(dateString)
                setDate(currentDate.toLocaleDateString())
                setShow(false)
            } else if (mode === 'time') {
                const timeString = timeStampToDate(Date.parse(currentDate))[1]
                setSelectedTime(timeString)
                const datString = new Date(date).toLocaleDateString()
                const fullDate = `${datString} ${currentDate.toLocaleTimeString()}`
                const timeStamp = Date.parse(fullDate)
                setDate(timeStamp)
                setShow(false)
            }
        };
        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };
        const showDatepicker = (value) => {
            showMode(value);
        };
        const sumbitForm = async () => {
            const newTodo = { date: date, todo: todo, description: description, status: "pending", checked: false }
            const msg = await storeDataObject(newTodo)
            if (msg === 'item exist') {
                Alert.alert(`${todo} task already exist`)
            } else {
                await navigation.navigate("ToDo", { rerender: true })
            }
        }

        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={[s.container]}>
                        <View style={[s.form]}>
                            <Text style={[s.txt]}>{selectedDate}  {selectedTime}</Text>
                            <View style={[s.dateChanger]}>
                                <TouchableOpacity onPress={() => showDatepicker('date')} style={{ flex: 1 }}>
                                    <View style={[s.centerContent]}>
                                        <Text style={[s.txt]}>
                                            <FontAwesome name="calendar" size={25} color="skyblue" />
                                        </Text>
                                        <Text style={[s.txt]}>Set Date</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showDatepicker('time')} style={{ flex: 1 }}>
                                    <View style={[s.centerContent]}>
                                        <Text style={[s.txt]}>
                                            <FontAwesome name="clock-o" size={25} color="skyblue" />
                                        </Text>
                                        <Text style={[s.txt]}>Set time</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {show && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode={mode}
                                    onChange={onChange}
                                    minimumDate={new Date(Date.now())}
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
                        <TouchableOpacity style={[s.submit, { backgroundColor: validateForm ? 'grey' : 'skyblue' }]} opacity={validateForm ? .1 : 1} onPress={sumbitForm} disabled={validateForm}>
                            <Text style={[s.txt, { fontSize: 20 }]}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
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
    txt: {
        textAlign: "center",
        padding: 10,
        color: "black"
    },
    dateChanger: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.11)',
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
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