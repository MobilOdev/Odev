import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import * as firebase from 'firebase';
import * as Notifications from 'expo-notifications';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem } from 'native-base';
import * as Permissions from 'expo-permissions';
import { event } from 'react-native-reanimated';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }
    sendPushNotification = (expoToken) => {
        let response = fetch("https://exp.host/--/api/v2/push/send", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: expoToken,
                title: 'Titleyi Gir',
                body: 'Bodyi Gir',
                priority: 'normal'
            }),
        });
    };
    registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        firebase
            .database()
            .ref('users/' + this.currentUser.uid + '/push_token')
            .set(token);
    };

    componentDidMount = async () => {

        this.currentUser = await firebase.auth().currentUser;
        await this.registerForPushNotificationsAsync();
        this.sendPushNotification("ExponentPushToken[-uLTQFB8_R0mI_sKEDdoId]");
        firebase
            .database()
            .ref('events/').on('value', snapshot => {
                this.setState({ events: snapshot.val() })

            });
    }
    render() {

        return (
            <Container >
                <Content>


                    {
                        this.state.events.length > 0 &&
                        this.state.events.map((event => {
                            return (

                                <Card>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: 'https://picsum.photos/200/300' }} />
                                            <Body>
                                                <Text>NativeBase</Text>
                                                <Text note>GeekyAnts</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem >
                                        <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: 200, width: null, flex: 1 }} />
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Button transparent>
                                                <Icon active name="thumbs-up" />
                                                <Text>12 Likes</Text>
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Button transparent>
                                                <Icon active name="chatbubbles" />
                                                <Text>4 Comments</Text>
                                            </Button>
                                        </Body>
                                        <Right>
                                            <Text>11h ago</Text>
                                        </Right>
                                    </CardItem>
                                </Card>


                            )
                        }))
                    }


                </Content>
            </Container >
        );

    }
}
