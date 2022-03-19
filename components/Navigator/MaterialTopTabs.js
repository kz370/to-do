import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const MaterialTopTab = createMaterialTopTabNavigator();

export default function MyMaterialTopTab(props) {
    return (
        <MaterialTopTab.Navigator>
            {props.screen.map((screen) => (
                <MaterialTopTab.Screen key={screen.key} name={screen.name} component={screen.component} initialParams={screen.params} />)
            )}
        </MaterialTopTab.Navigator>
    );
}