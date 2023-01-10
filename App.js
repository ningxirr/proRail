"use strict";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
              header
              options={{
                headerTransparent: true,
                headerTitle: '',
                headerLeft: () => (
                  <TouchableOpacity>
                    <Icon name='angle-left' borderRadius={15} size={25} color={'white'}/>
                  </TouchableOpacity>
                )
              }}
              />
            <Stack.Screen
              name='Navigate'
              component={Navigate}
              />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
