import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTodos({ navigation, route }) {
    try {
        const [date, setDate] = useState(null)
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);
        const [todo, setTodo] = useState(null)
        const [description, setDescription] = useState(null)
        const [selectedDate, setSelectedDate] = useState(null)
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
            setShow(false);
        };
        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };
        const showDatepicker = () => {
            showMode('date');
        };
        const sumbitForm = () => {
            navigation.navigate("ToDo", { method: 'add', newTodo: {  date: date, todo: todo, description: description, status: "pending", checked: false } })
        }

        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={[s.container]}>
                        <View style={[s.form]}>
                            {selectedDate &&
                                (
                                    <Text style={[s.txt]}>{selectedDate}</Text>
                                )
                            }
                            <View style={[s.dateChanger]}>
                                <TouchableOpacity onPress={showDatepicker} style={{ flex: 1 }}>
                                    <View style={[s.centerContent]}>
                                        <Text style={[s.txt]}>
                                            <FontAwesome name="calendar" size={25} color="skyblue" />
                                        </Text>
                                        <Text style={[s.txt]}>Set Date and time</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {show && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode={mode}
                                    is24Hour={true}
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
                        <Pressable style={s.submit} opacity={validateForm ? .1 : 1} onPress={sumbitForm} disabled={validateForm}>
                            <Text style={[s.txt, { fontSize: 20 }]}>
                                Confirm
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