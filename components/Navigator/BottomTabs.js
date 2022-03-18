import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

export default function MyBottomTab(props) {
    return (
        <BottomTab.Navigator>
            {props.screen.map((screen) =>
            (
                <BottomTab.Screen key={screen.key} name={screen.name} component={screen.component} initialParams={screen.params} />
            )
            )}
        </BottomTab.Navigator>
    );
}