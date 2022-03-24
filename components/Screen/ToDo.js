import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendPushNotification } from '../functions';
import ToDoList from './ToDosList'
import { getDataObject, updateOverdue } from '../functions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const MaterialTopTab = createMaterialTopTabNavigator();

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export default function ToDo({ navigation, route }) {
    try {
        const [expoPushToken, setExpoPushToken] = useState('');
        const [notification, setNotification] = useState(false);
        const notificationListener = useRef();
        const responseListener = useRef();
        const [toDoList, setToDoList] = useState([])
        const [val, setVal] = useState(true)
        const pending = toDoList.filter(toDo => toDo.status == 'pending')
        const complete = toDoList.filter(toDo => toDo.status == 'complete')
        const overdue = toDoList.filter(toDo => toDo.status == 'overdue')

        useEffect(() => {
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

            // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                navigation.navigate('overdue')
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }, []);

        useEffect(async () => {
            if (val) {
                const list = await getDataObject()
                setToDoList(prev => list ? list : prev)
                setVal(false)
            }
        })

        useEffect(() => {
            const intervalId = setTimeout(async () => {
                const list = await getDataObject()
                const getToDoList = list ? list : []
                if (getToDoList.length) {
                    const getPendinglist = getToDoList.filter(todo => todo.status === 'pending')
                    if (getPendinglist.length) {
                        const newToDoList = getToDoList.map((todo) => {
                            if (todo.status === "pending" && todo.date < Date.now()) {
                                return { ...todo, status: 'overdue' }
                            } else {
                                return todo
                            }
                        })
                        const overdueList = newToDoList.filter(item => item.status === 'overdue')
                        if (!arraysEqual(newToDoList, getToDoList)) {
                            if (overdueList.length) {
                                await updateOverdue(newToDoList)
                                overdueList.map(async(todo)=>{
                                    await sendPushNotification(expoPushToken,{
                                        to: expoPushToken,
                                        sound: 'default',
                                        title: todo.todo,
                                        body: `You have missed a task \n${todo.description}`,
                                    })
                                })
                                setVal(true)
                            }
                        }
                    }
                }
            }, 30000)
            return () => clearInterval(intervalId)
        })


        useEffect(async () => {
            if (route.params) {
                if (route.params.rerender) {
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
                        {props => <ToDoList {...props} onSetVal={() => setVal(true)} toDosList={pending} title="test" bgColor='rgba(130, 115, 0, 0.45)' />}
                    </MaterialTopTab.Screen>
                    <MaterialTopTab.Screen
                        name="complete"
                        options={{
                            title: `complete ${complete.length}`,
                            tabBarStyle: { backgroundColor: 'rgba(0, 130, 18, 0.38)' },
                        }}>
                        {props => <ToDoList {...props} onSetVal={() => setVal(true)} toDosList={complete} bgColor='rgba(0, 130, 18, 0.38)' />}
                    </MaterialTopTab.Screen>
                    <MaterialTopTab.Screen
                        name="overdue"
                        options={{
                            title: `overdue ${overdue.length}`,
                            tabBarStyle: { backgroundColor: 'rgba(119, 0, 0, 0.46)' },
                        }}>
                        {props => <ToDoList {...props} onSetVal={() => setVal(true)} toDosList={overdue} bgColor='rgba(119, 0, 0, 0.46)' />}
                    </MaterialTopTab.Screen>
                </MaterialTopTab.Navigator>

                <TouchableOpacity onPress={() => { navigation.navigate('AddToDo') }} style={{ backgroundColor: 'skyblue' }}>
                    <View style={[{ flexDirection: 'row', paddingVertical: 15, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ marginHorizontal: 5, fontSize: 25, color: "black" }}>
                            New task
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            <Feather name='plus' size={25} color="black" />
                        </Text>
                    </View>
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
