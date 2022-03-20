import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ToDo({navigation,route,toDosList,bgColor}) {

    return (
        <ScrollView style={[s.container, { backgroundColor: bgColor }]}>
            {toDosList.map((item) =>
            (
                <View key={item.key} style={[s.todo]}>
                    <Text style={[s.txt]}>
                        {item.todo}
                    </Text>
                    <Text style={[s.txt]}>
                        {item.date}
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('EditToDo', { item: item, key: item.key }) }}>
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