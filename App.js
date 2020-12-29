import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

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
      loading: true
    }
  }


  componentDidMount = async () => {
    var firebaseConfig = {
      apiKey: "AIzaSyD-Ni2UY5L22apFQsB5V1NPQNSKeEOcfl8",
      authDomain: "odev-3fb1c.firebaseapp.com",
      projectId: "odev-3fb1c",
      storageBucket: "odev-3fb1c.appspot.com",
      messagingSenderId: "550452464733",
      appId: "1:550452464733:web:207122c389146025c351b4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.setState({ loading: false });


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
    else {
      return (
        <Text>sa</Text>
      )
    }
  }

}
