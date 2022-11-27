import React from 'react';
import { StyleSheet, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Result from './src/views/Result';
/*const getData = async () => {
  const usersCollection = await firestore()
    .collection('facility')
    .doc('0')
    .get();
  console.log('123', usersCollection);
  return usersCollection;
};*/

const App = () => (
    <Result /> 
);

const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
