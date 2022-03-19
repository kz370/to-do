import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ToDo({ navigation, route }) {
    const params = route.params || []
    const bgColor = params.bgcolor
    const [todosList, setTodosList] = useState(params.list)

    useEffect(() => {
        if (route.name === "Pending" && route.params.newTodo) {
            const newTodo = route.params.newTodo
            setTodosList(prev => ([...prev, newTodo]))
            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Pending',
                    params: null,
                })
            );
        }
    }, [route.params])

    return (
        <ScrollView style={[s.container, { backgroundColor: bgColor }]}>
            {todosList.map((item, key) =>
            (
                <View key={key} style={[s.todo]}>
                    <Text style={[s.txt]}>
                        {item.todo}
                    </Text>
                    <Text style={[s.txt]}>
                        {item.date}
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Edit Todo',{item:item,key:key}) }}>
                        <View style={[s.centerContent]}>
                            <FontAwesome name="edit" size={24} color="blue" />
                        </View>
                    </TouchableOpacity>
                </View>
            )
            )}
        </ScrollView>
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
        margin: 10,
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
});