import React from 'react';
import { StackActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as Font from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './src/Navigation/DrawerNavigator';
import * as firebase from 'firebase';
import Login from './src/Screens/SingIn/Signin';
import SignUp from './src/Screens/SingUp/Signup';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }


  componentDidMount = () => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    var firebaseConfig = {
      apiKey: "AIzaSyD-Ni2UY5L22apFQsB5V1NPQNSKeEOcfl8",
      authDomain: "odev-3fb1c.firebaseapp.com",
      databaseURL: "https://odev-3fb1c-default-rtdb.firebaseio.com",
      projectId: "odev-3fb1c",
      storageBucket: "odev-3fb1c.appspot.com",
      messagingSenderId: "550452464733",
      appId: "1:550452464733:web:207122c389146025c351b4"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);

    }


  }



  render() {

    if (this.state.loading == true) {
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>)
    }

    else {
      return (
        <Text>sa</Text>
      )
    }
  }

}
