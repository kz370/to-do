import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTodos({ navigation, route }) {
    const adjustString = (string) => {
        return +string < 10 ? `0${string}` : string
    }
    const newDate = new Date()
    const [date, setDate] = useState({
        day: adjustString(newDate.getDate()),
        month: adjustString(newDate.getMonth() + 1),
        year: newDate.getFullYear(),
        hour: adjustString(newDate.getHours()),
        minute: adjustString(newDate.getMinutes()),
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
                        day: adjustString(currentDate.getDate()),
                        month: adjustString(currentDate.getMonth() + 1),
                        year: currentDate.getFullYear(),
                    }
                });
                showMode("time");
            } else {
                setDate(prev => {
                    return {
                        ...prev,
                        hour: adjustString(currentDate.getHours()),
                        minute: adjustString(currentDate.getMinutes()),
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
        navigation.navigate("ToDo", {method:'add', newTodo: {key:route.params.lastKey+1, date: newDate, todo: todo, status: "pending",checked:false } })
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={[s.container]}>
                <View style={[s.date]}>
                    <Text style={[s.txt]}>selected: {`${date.day}/${date.month}/${date.year}  ${date.hour > 12 ? adjustString(date.hour - 12) : date.hour}:${date.minute} ${date.AmPm}`}</Text>
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
                        placeholder="add new todo"

                    />
                </View>
                <Pressable style={s.submit} opacity={!todo ? .1 : 1} onPress={sumbitForm} disabled={!todo}>
                    <Text style={[s.txt, { fontSize: 20 }]}>
                        Add Todo
                    </Text>
                </Pressable>
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