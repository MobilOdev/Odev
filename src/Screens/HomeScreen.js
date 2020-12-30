import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import * as firebase from 'firebase';
import * as Notifications from 'expo-notifications';

import * as Permissions from 'expo-permissions';
import { event } from 'react-native-reanimated';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     events: [],
        // };
    }


    render() {

        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>

        </View>

        );

    }
}
