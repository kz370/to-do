import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function MyDrawer(props) {
    return (
        <Drawer.Navigator>
            {props.screen.map((screen) =>
            (
                <Drawer.Screen key={screen.key} name={screen.name} component={screen.component} initialParams={screen.params} />
            )
            )}
        </Drawer.Navigator>
    );
}