import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import DrawerNavigator from './src/Navigation/DrawerNavigator';
import { Provider } from 'mobx-react'
import store from './src/store'
import Router from './src/Router';
import * as Font from 'expo-font';
import * as firebase from 'firebase'
const { width, height } = Dimensions.get('window')
export default class App extends React.Component {
  state = {
    email: 'asd',
    password: 'sad'
  }
  constructor(props) {
    super(props);
    /*this.state = {
      login: false
    };
    this.login = this.login.bind(this);*/
    this.state = { loading: true };
  }
  /*async login() {
    this.setState({ login: true });
  }*/
  componentDidMount() {
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
    firebase.auth().onAuthStateChanged(
      auth => {
        if (auth)
          console.log('sad')
        else
          console.log('sada')
      }
    )

  }
  kayitol = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password,)
  }
  girisyap = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password,)
  }
  render() {
    /*if (this.state.login == false)
      return <LoginScreen login={this.login} />;
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );*/
    if (this.state.loading == false) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            placeholder="Email Adresi"
            style={{ marginTop: 10, width: width - 40, padding: 15, fontSize: 12, backgroundColor: '#f5f5f5' }}
            underlineColorAndroid='transparent'
            onChangeText={email => this.setState({ email: email })}
            value={this.state.email}
            keyboardType='email-address'
            placeholderTextColor='gray'
          />
          <TextInput
            placeholder="Şifre"
            style={{ marginTop: 10, width: width - 40, padding: 15, fontSize: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}
            underlineColorAndroid='transparent'
            onChangeText={password => this.setState({ password: password })}
            value={this.state.password}
            secureTextEntry
            placeholderTextColor='gray'
          />
          <TouchableOpacity onPress={() => this.girisyap()} >
            <View style={{ alignItems: 'center', backgroundColor: '#ff655b', width: width - 40, padding: 15, borderRadius: 4, marginTop: 10 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>Giriş Yap</Text>
            </View></TouchableOpacity>
          <TouchableOpacity onPress={() => this.kayitol()}>
            <View style={{ alignItems: 'center', backgroundColor: '#ff655b', width: width - 40, padding: 15, borderRadius: 4, marginTop: 10 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>Kayıt ol</Text>
            </View></TouchableOpacity>

        </View>)
    }
    else {
      return <Text>sa</Text>
    }

  }

}




