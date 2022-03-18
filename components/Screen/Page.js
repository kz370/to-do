import React from 'react';
import {View, Text} from 'react-native';


export default function Page ({ route }){
    const params = route.params||[]
return(
    <View style={{margin:30}}>
        <Text>{params.title}</Text>
    </View>
)
}