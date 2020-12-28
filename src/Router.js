import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SignUpPage } from './Screens/SingUp/Signup';
import { LoginPage } from './Screens/SingIn/Signin';

const AuthStack = createBottomTabNavigator(

)
const BottomTabNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignIn" component={LoginPage} />
            <AuthStack.Screen name="SingUp" component={SignUpPage} />
        </AuthStack.Navigator>
    );
};
export default BottomTabNavigator;