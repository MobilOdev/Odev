
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Home... again"
                />
            </View>
        );
    }
}