import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyStack(props) {
    return (
        <Stack.Navigator initialRouteName={props.default}>
            {props.screen.map((screen) =>
            (
                <Stack.Screen key={screen.key} name={screen.name} component={screen.component} initialParams={screen.params} />
            )
            )}
        </Stack.Navigator>
    );
}