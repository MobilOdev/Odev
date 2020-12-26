import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

export default function App() {
  return (
    <View style={styles.container}>
      
      <TextInput placeholder={"Enter User Name"}style={{width:"70%",height:"5%",borderBottomWidth:1}}></TextInput>
      <TextInput placeholder={"Enter Password"}style={{width:"70%",height:"5%",borderBottomWidth:1,margin:10}}></TextInput>
      <TouchableOpacity style={{height:43,width:200,backgroundColor:"black",alignContent:"center",alignItems:"center",borderRadius:40,justifyContent:"center",marginTop:"5%"}}>
      <Text style={{color:"white",}}>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:"center",
  },
});
