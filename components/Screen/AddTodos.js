import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTodos({ navigation }) {
    const newDate = new Date()
    const [date, setDate] = useState({
        day: newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate(),
        month: newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1,
        year: newDate.getFullYear(),
        hour: newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours(),
        minute: newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes(),
        AmPm: newDate.hour >= 12 ? "PM" : "AM"
    });
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [todo, setTodo] = useState('')

    const onChange = (event, currentDate) => {
        if (event.type === "set") {
            if (mode === 'date' && currentDate > new Date(Date.now())) {
                setDate(prev => {
                    return {
                        ...prev,
                        day: currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate(),
                        month: currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1,
                        year: currentDate.getFullYear(),
                    }
                });
                showMode("time");
            } else {
                setDate(prev => {
                    return {
                        ...prev,
                        hour: currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours(),
                        minute: currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes(),
                        AmPm: currentDate.hour >= 12 ? "PM" : "AM"
                    }
                });
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

    const sumbitForm = () => {
        const newDate = `${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute} ${date.AmPm}`
        navigation.navigate("Pending",{newTodo:{ date: newDate, todo: todo, type: "pending" }})
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={[s.container]}>
                <View style={[s.date]}>
                    <Text style={[s.txt]}>selected: {`${date.day}/${date.month}/${date.year}   ${date.hour > 12 ? date.hour - 12 : date.hour}:${date.minute} ${date.AmPm}`}</Text>
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
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </View>
                <View style={[s.todo]}>
                    <Text style={[s.txt]}>Todo</Text>
                    <TextInput
                        value={todo}
                        style={s.input}
                        onChangeText={(e) => setTodo(e)}
                        placeholder="useless placeholder"

                    />
                </View>
                <Pressable style={s.submit} opacity={!todo ? .1 : 1} onPress={sumbitForm} disabled={!todo}>
                    <Text style={[s.txt, { fontSize: 20 }]}>
                        Add Todo
                    </Text>
                </Pressable>
            </View>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={s.goBackBtn}>
                <View style={[s.centerContent]}>
                    <Text style={[s.txt, s.goBackTxt]}>
                        <FontAwesome name="arrow-left" size={20} color="white" />
                    </Text>
                    <Text style={[s.txt, s.goBackTxt]}>go back</Text>
                </View>
            </TouchableOpacity>
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
        backgroundColor: 'white',
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
        textAlign: "center",
        padding: 10,
        color: "black"
    },
    dateChanger: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    todo: {
        margin: 10,
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
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