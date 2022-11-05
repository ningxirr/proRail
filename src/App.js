import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

// console.log('f',firestore())
const getData = async() => {
  const usersCollection = await firestore().collection('facility').doc('0').get();
  console.log("123",usersCollection)
  return usersCollection
}


const App = () => (
  <View style={styles.container}>
    <View style={styles.header}>


      <Text style={styles.textHeader}>CustomizeRoute {getData()}</Text>
    </View>
    <View style={styles.content}>

    </View>
  </View>
);

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header: {
    flex: 3,
    backgroundColor: "#000000"
  },
  content: {
    flex: 6,
    backgroundColor: "#FFFFFF"
  },
  textHeader:{
    color : "#FFFFFF",
    padding : 20 
  }
});

export default App;