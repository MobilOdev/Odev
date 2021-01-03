
import React from 'react';
import * as firebase from 'firebase';
import { Container, List, ListItem, Header, Content, Card, CardItem, Icon, Right, Text, Button } from 'native-base';
import { StyleSheet, View, TextInput } from 'react-native';



export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            events: [],
        }
    }
    componentDidMount = () => {

        firebase
            .database()
            .ref('users/' + firebase.auth().currentUser.uid + '/registered').on('value', snapshot => {
                var arr = Object.values(snapshot.val());
                this.setState({ events: arr, load: true });

            });
    }
    render() {
        if (this.state.load == true && this.state.events != null) {
            console.log(this.state.events.length)
            return (
                <Container>
                    <Content>
                        <CardItem header bordered>
                            <Text>Katıldığınız Etkinlikler</Text>
                        </CardItem>
                        {this.state.events
                            .map(function (item, index) {
                                return <List key={index}>
                                    <ListItem>

                                        <Text>{item.name}</Text>

                                    </ListItem>
                                </List>
                            })
                        }

                    </Content>
                </Container>

            );
        }
        else {
            return (
                <Text></Text>)
        }

    }
}
