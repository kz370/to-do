import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import ToDoList from './ToDosList'
import * as SQLite from 'expo-sqlite';

const MaterialTopTab = createMaterialTopTabNavigator();

const db = SQLite.openDatabase('database.db');

export default function ToDo({ navigation, route }) {
    try {
        const [toDoList, setToDoList] = useState([])
        const [val, setVal] = useState(true)
        const [overDue, setOverDue] = useState(null)
        useEffect(() => {
            if (val) {
                db.transaction((tx) => {
                    tx.executeSql(`create table if not exists todos (id integer primary key,todo text,description text,date text,status text)`);
                })
                db.transaction((tx) => {
                    tx.executeSql(
                        `select * from todos;`, null, (_, { rows: { _array } }) => { setToDoList(_array) }, (_, err) => { console.log("err=>", err) }
                    );
                })
                setToDoList(prev => (prev.map(todo => ({ ...todo, checked: false }))))
                setVal(false)
            }
        })

        useEffect(() => {
            const intervalId = setTimeout(() => {
                db.transaction((tx) => {
                    tx.executeSql(`select id from todos where status=? and date>? `, ['pending', Date.now()], (_, { rows: { _array } }) => setOverDue(_array), (_, err) => { console.log("err=>", err) });
                })
                if (overDue) {
                    if (overDue.length) {
                        const overdueTasks = `(${overDue.map(item => item.id).toString()})`
                        setVal(true)
                        db.transaction((tx) => {
                            tx.executeSql(`update todos set status=?  where id in ${overdueTasks}`, ['overdue'], (_, { rows: { _array } }) => setOverDue(_array), (_, err) => { console.log("err=>", err) });
                        })
                    }
                }
            }, 60000)
            setVal(false)
            return () => clearInterval(intervalId)
        })

        const pending = toDoList.filter(toDo => toDo.status == 'pending')
        const complete = toDoList.filter(toDo => toDo.status == 'complete')
        const overdue = toDoList.filter(toDo => toDo.status == 'overdue')

        useEffect(() => {
            if (route.params) {
                if (route.params.newTodo) {
                    const newTodo = route.params.newTodo
                    if (route.params.method == 'add') {
                        db.transaction((tx) => {
                            tx.executeSql(
                                `insert into todos (todo,description, date, status) values(?,?,?,?);`,
                                [newTodo.todo, newTodo.description, newTodo.date, newTodo.status],
                                false, (_, err) => {
                                    console.log("err=>", err)
                                }
                            );
                        })
                        setVal(true)
                    } if (route.params.method == 'update') {
                        db.transaction((tx) => {
                            tx.executeSql(
                                `update todos set todo=(?),description=(?), date=(?), status=(?) where id=(?);`,
                                [newTodo.todo, newTodo.description, newTodo.date, newTodo.status, newTodo.id],
                                false, (_, err) => {
                                    console.log("err=>", err)
                                }
                            );
                        })
                        setVal(true)
                    }
                }
                else if (route.params.method == 'delete') {
                    const idValues = `(${route.params.ids.toString()})`
                    db.transaction((tx) => {
                        tx.executeSql(
                            `delete from todos where id in ${idValues};`,
                            null,
                            false, (_, err) => {
                                console.log("err=>", err)
                            }
                        );
                    })
                    setVal(true)
                } else if (route.params.method == 'completeMultiple') {
                    const idValues = `(${route.params.ids.toString()})`
                    db.transaction((tx) => {
                        tx.executeSql(
                            `update todos set status=(?) where id in ${idValues}`,
                            ['complete'],
                            false, (_, err) => {
                                console.log("err=>", err)
                            }
                        );
                    })
                    setVal(true)
                }

                navigation.dispatch(
                    CommonActions.navigate({
                        name: route.name,
                        params: "ToDo",
                    })
                );
            }
        }, [route.params])

        return (
            <View style={{ flex: 1 }}>
                <MaterialTopTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 15, color: "black", fontWeight: "400", textTransform: "capitalize" },
                    }}
                >
                    <MaterialTopTab.Screen
                        name="pending"
                        options={{
                            title: `pending ${pending.length}`,
                            tabBarStyle: { backgroundColor: 'rgba(130, 115, 0, 0.45)' },
                        }}>
                        {props => <ToDoList {...props} toDosList={pending} title="test" bgColor='rgba(130, 115, 0, 0.45)' />}
                    </MaterialTopTab.Screen>
                    <MaterialTopTab.Screen
                        name="complete"
                        options={{
                            title: `complete ${complete.length}`,
                            tabBarStyle: { backgroundColor: 'rgba(0, 130, 18, 0.38)' },
                        }}>
                        {props => <ToDoList {...props} toDosList={complete} bgColor='rgba(0, 130, 18, 0.38)' />}
                    </MaterialTopTab.Screen>
                    <MaterialTopTab.Screen
                        name="overdue"
                        options={{
                            title: `overdue ${overdue.length}`,
                            tabBarStyle: { backgroundColor: 'rgba(119, 0, 0, 0.46)' },
                        }}>
                        {props => <ToDoList {...props} toDosList={overdue} bgColor='rgba(119, 0, 0, 0.46)' />}
                    </MaterialTopTab.Screen>
                </MaterialTopTab.Navigator>

                <TouchableOpacity onPress={() => { navigation.navigate('AddToDo') }} disabled={false}>
                    <Text style={{ fontSize: 20, textAlign: 'center', paddingHorizontal: 22, paddingVertical: 15 }}>
                        New Task
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } catch (err) {
        console.log(err)
        return (
            <View>

            </View>
        )
    }
}
