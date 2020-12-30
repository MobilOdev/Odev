
import React, { useState } from "react";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { StackActions } from '@react-navigation/native';
import { Avatar, Title, Caption } from 'react-native-paper'
import { ContactStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import { Text, View, StyleSheet } from "react-native";
import * as firebase from 'firebase';
import { string } from "yup";
const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {


    return (

        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Contact" component={ContactStackNavigator} />
        </Drawer.Navigator>
    );
};
function CustomDrawerContent(props) {
    const [name, setName] = useState(0);

    var user = firebase.auth().currentUser;

    {
        firebase.database()
            .ref(`users/${user.uid}/name`).once('value', (snapshot) => {
                setName(snapshot.val());

            })
    }

    return (
        <DrawerContentScrollView {...props}>

            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 4 }}>
                <Avatar.Image
                    source={{
                        uri: 'https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg'
                    }}
                    size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                    <Title style={styles.title}>{name}</Title>
                    <Caption style={styles.caption}>{user.email}</Caption>
                </View>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Hesaptan Çık"
                onPress={() => {
                    firebase.auth().signOut();
                    props.navigation.dispatch(StackActions.replace('Login'));
                }}
            />
        </DrawerContentScrollView>
    );
}
export default DrawerNavigator;
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});