
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile Screen</Text>

            </View>
        );
    }
}