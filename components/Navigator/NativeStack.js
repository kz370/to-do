import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NativeStack = createNativeStackNavigator();

export default function MyNativeStack(props) {
    return (
        <NativeStack.Navigator>
            {props.screen.map((screen) =>
            (
                <NativeStack.Screen key={screen.key} name={screen.name} component={screen.component} initialParams={screen.params} />
            )
            )}
        </NativeStack.Navigator>
    );
}