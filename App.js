"use strict";
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Result from './src/views/Result';
import Navigate from './src/views/Navigate';
/*const getData = async () => {
  const usersCollection = await firestore()
    .collection('facility')
    .doc('0')
    .get();
  console.log('123', usersCollection);
  return usersCollection;
};*/
const Stack = createNativeStackNavigator();

const App = () => (
    // <Result /> 
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              name="Result" 
              component={Result} 
              // options={{title: 'Welcome'}}
              />
            <Stack.Screen
              name='Navigate'
              component={Navigate}
              />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
