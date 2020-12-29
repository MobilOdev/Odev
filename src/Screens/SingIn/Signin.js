import React from 'react';
import { Text, View, TextInput, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import DrawerNavigator from '../../Navigation/DrawerNavigator';
import { NavigationContainer, StackActions } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
export default class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
        loading: false,
        login: false
    }



    loginApp = () => {
        this.setState({ loading: true });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ login: true });
            }).catch((err) => {
                console.log(err);
                this.setState({ loading: false });
                Alert.alert(
                    'Oops',
                    'Giriş Yapılamadı. Lütfen tekrar deneyiniz.',
                    [
                        { text: 'Tamam' }
                    ]
                )
            })
    }

    goSignUp = () => {
        const pushAction = StackActions.push('SignUp');

        this.props.navigation.dispatch(pushAction);
    }

    render() {
        if (this.state.login) {
            return (

                <DrawerNavigator />

            )
        } else {
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
                    <TouchableOpacity onPress={() => this.loginApp()} >
                        <View style={{ alignItems: 'center', backgroundColor: '#ff655b', width: width - 40, padding: 15, borderRadius: 4, marginTop: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>Giriş Yap</Text>
                        </View></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goSignUp()}>
                        <View style={{ alignItems: 'center', backgroundColor: '#ff655b', width: width - 40, padding: 15, borderRadius: 4, marginTop: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>Kayıt ol</Text>
                        </View></TouchableOpacity>

                </View>
            )
        }
    }

}
