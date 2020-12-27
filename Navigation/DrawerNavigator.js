
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../Screens/HomeScreen";
import NotificationsScreen from "../Screens/Notifications";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;