import React from 'react'
import { StatusBar, StyleSheet, Text, TextInput, View, RefreshControl, Dimensions, ScrollView, Alert, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { StackActions } from '@react-navigation/native';
import { Permissions, Notifications } from 'expo';
const { width, height } = Dimensions.get('window')

export default class SignUp extends React.Component {

    state = {
        email: '',
        name: '',
        password: '',
        loading: false,
    }

    kayitol = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((auth) => {
                let uid = auth.user.uid;
                this.createUser(uid)
                alert("Kayıt Başarılı. Girişe yönlendiriliyorsunuz.")


                this.props.navigation.dispatch(StackActions.replace('Login'));

            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Bu e-posta zaten kullanılıyor.');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('E-posta adresi bulunamadı.');
                }
                if (error.code === 'auth/weak-password') {
                    alert('Şifre en az altı karakter olmalı.');
                }
                else {
                    console.log(errorCode)
                }
                console.error(error);
            });
    }
    createUser = (uid) => {
        firebase.database().ref('users').child(uid).set({
            email: this.state.email,
            uid: uid,
            name: this.state.name,
        });
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='small' color='black' />
                </View>
            );
        }
        else
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TextInput
                        placeholder="İsim"
                        style={{ marginTop: 10, width: width - 40, padding: 15, fontSize: 12, backgroundColor: '#f5f5f5' }}
                        underlineColorAndroid='transparent'
                        onChangeText={name => this.setState({ name: name })}
                        value={this.state.name}
                        keyboardType='default'
                        placeholderTextColor='gray'
                    />
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
                    <TouchableOpacity onPress={() => this.kayitol()}>
                        <View style={{ alignItems: 'center', backgroundColor: '#ff655b', width: width - 40, padding: 15, borderRadius: 4, marginTop: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>Kayıt ol</Text>
                        </View></TouchableOpacity>

                </View>
            )
    }
}