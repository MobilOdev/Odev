import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>

                <TextInput placeholder={"Enter User Name"} style={{ width: "70%", height: "5%", borderBottomWidth: 1 }}></TextInput>
                <TextInput placeholder={"Enter Password"} style={{ width: "70%", height: "5%", borderBottomWidth: 1, margin: 10 }}></TextInput>
                <TouchableOpacity style={{ height: 43, width: 200, backgroundColor: "gray", alignContent: "center", alignItems: "center", borderRadius: 40, justifyContent: "center", marginTop: "5%" }} onPress={() => this.props.login()}>
                    <Text style={{ margin: 10 }}>Login </Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
    },
});