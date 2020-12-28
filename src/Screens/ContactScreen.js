
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class ContactScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Contact Screen</Text>

            </View>
        );
    }
}