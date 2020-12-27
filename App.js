import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import DrawerNavigator from './Navigation/DrawerNavigator';
import LoginScreen from './Screens/LoginScreen'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
    this.login = this.login.bind(this);
  }
  async login() {
    this.setState({ login: true });
  }
  render() {
    if (this.state.login == false)
      return <LoginScreen login={this.login} />;
    return (

      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }

}




