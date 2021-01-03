import Constants from 'expo-constants';
import React from 'react';
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
            num: null,
            count: [],
            load: true,
            mrb: false
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
                title: 'Tebrikler',
                body: 'Etkinliğe kayıt oldunuz',
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
    createUser = (id, event) => {
        var user = firebase.auth().currentUser;
        firebase.database().ref('events/' + id + '/subscriber').child(user.uid).set({
            email: user.email,

        });
        firebase.database().ref('users/' + user.uid).child('registered/' + id).set({
            name: event

        });
    }
    checkuser = (id, event) => {
        var user = firebase.auth().currentUser;
        firebase.database().ref('events/' + '3' + '/subscriber/').child(user.uid).once('value', snapshot => {
            if (snapshot.val() === null) {
                this.createUser(id, event);
                this.sendPushNotification("ExponentPushToken[-uLTQFB8_R0mI_sKEDdoId]");

            }
            else {
                alert("Zaten kayıtlısız");
            }
        });


    }
    readSubscriberCount = (id) => {
        var b;
        var ref = firebase.database().ref('events/' + id);
        ref.on('value', snapshot => {
            b = snapshot.child("subscriber").numChildren();
        })
        this.state.count.push(b);
    }
    componentDidMount = async () => {
        this.currentUser = await firebase.auth().currentUser;
        await this.registerForPushNotificationsAsync();
        firebase
            .database()
            .ref('events/').on('value', snapshot => {
                this.setState({ events: snapshot.val() });


            });
    }
    render() {
        if (this.state.load == true) {

            return (
                <Container >
                    <Content>
                        {
                            this.state.events.length > 0 &&
                            this.state.events.map(((event, index) => {

                                { this.readSubscriberCount(index) }
                                return (
                                    <Card key={index} >
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://picsum.photos/200/300' }} />
                                                <Body>
                                                    <Text  >{event.title}</Text>
                                                    <Text >{event.producer}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem >
                                            <Text>{event.detail}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Button onPress={() => {
                                                    this.checkuser(event.id, event.title);

                                                }} transparent>
                                                    <Icon active name="thumbs-up" />
                                                    <Text>Katıl</Text>
                                                </Button>
                                            </Left>
                                            <Body>
                                                <Button transparent >
                                                    <Icon active name="chatbubbles" />
                                                    <Text   >Katılan kişi sayısı:{this.state.count.shift()}</Text>
                                                </Button>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                )
                            }))
                        }
                    </Content>
                </Container >
            );
        }
        else {
            return (<Text>sdasd</Text>)
        }
    }
}
