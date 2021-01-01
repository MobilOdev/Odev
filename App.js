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
const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      saved: false
    }
  }


  componentDidMount = async () => {
    await Font.loadAsync({
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
    if (firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user is logged');
        this.setState({ saved: true })
      }
      else
        this.setState({ loading: false });

    });

  }

  /*async girisyap() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      alert('signed in!');
      this.setState({ login: true });
    })
      .catch(function (error) {
      
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
          console.log(errorCode);
        }
        console.log(error);
      });
  }*/
  render() {

    if (this.state.loading == false) {
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>)
    }
    if (this.state.saved == true) {
      return (<NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>)
    }
    else {
      return (
        <Text>sa</Text>
      )
    }
  }

}
