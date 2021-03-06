import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from "@khaledz370/datetimepicker-react-native";
import { Picker } from '@react-native-picker/picker';
import { timeStampToDate, updateDataObject } from '../functions';

export default function EditToDo({ navigation, route }) {
    try {
        const prevDate = Date.parse(route.params.item.date)
        const [date, setDate] = useState(new Date(prevDate));
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);
        const [todo, setTodo] = useState(route.params.item.todo)
        const [status, setStatus] = useState(route.params.item.status)
        const [selectedDate, setSelectedDate] = useState(timeStampToDate(prevDate)[0])
        const [selectedTime, setSelectedTime] = useState(timeStampToDate(prevDate)[1])
        const [description, setDescription] = useState(route.params.item.description)
        const [validateForm, setValidateForm] = useState(true)

        useEffect(() => {
            if (todo && description && selectedDate && date > Date.now()) {
                setValidateForm(false)
                return true
            }
            setValidateForm(true)

        })

        const onChange = (currentDate) => {
            if (mode === 'date') {
                const dateString = timeStampToDate(Date.parse(currentDate))[0]
                setSelectedDate(dateString)
                setDate(new Date(`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${date.toLocaleTimeString()} `))
                setShow(false)
            } else if (mode === 'time') {
                const timeString = timeStampToDate(Date.parse(currentDate))[1]
                setSelectedTime(timeString)
                const dateString = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${currentDate.toLocaleTimeString()}`
                setDate(new Date(dateString))
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

        const saveTodo = async () => {
            const newTodo = { id: route.params.item.id, date: date, description: description, todo: todo, status: status }
            await updateDataObject(newTodo)
            await navigation.navigate("ToDo", { rerender: true })
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
                                <DatePicker
                                date={date}
                                mode={mode}
                                onConfirm={e=>onChange(e)}
                                onCancel={()=>setShow(false)}
                                startDate={new Date(Date.now())}
                                hrs12={true}
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
                        <TouchableOpacity style={[s.submit, { backgroundColor: validateForm ? 'grey' : 'skyblue' }]} opacity={validateForm ? .1 : 1} onPress={saveTodo} disabled={validateForm}>
                            <Text style={[s.txt, { fontSize: 20 }]}>
                                Save todo
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