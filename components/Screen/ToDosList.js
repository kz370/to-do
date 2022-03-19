import React from 'react';
import { View, Text } from 'react-native';


export default function ToDo({navigation, route }) {
    const params = route.params.screen || []

    if(route.params.addTodos&& params.title === 'Pending'){
        const todos = route.params.addTodos
        navigation.setParams({screen:params,addTodos: null});
        route.params.addTodo(todos)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
            {params.list.map((item, key) =>
            (
                <View key={key} style={{ backgroundColor: 'wheat', margin: 10, borderRadius: 10 }}>
                    <Text style={{ color: "black", fontSize: 30, padding: 10 }}>
                        {item.todo}
                    </Text>
                    <Text style={{ color: "black", fontSize: 30, padding: 10 }}>
                        {item.date}
                    </Text>
                </View>
            )
            )}
        </View>
    )
}