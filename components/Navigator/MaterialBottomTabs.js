import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const MaterialBottomTab = createMaterialBottomTabNavigator();

export default function MyMaterialBottomTab(props) {
    return (
        <MaterialBottomTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarItemStyle: { width: 100 },
                tabBarStyle: { backgroundColor: 'powderblue' },
            }}>
            {props.screen.map((screen) =>
            (
                <MaterialBottomTab.Screen
                    key={screen.key}
                    name={screen.name}
                    component={screen.component}
                    initialParams={screen.params}
                />
            )
            )}
        </MaterialBottomTab.Navigator>
    );
}