"use strict";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TochableIcon from './src/components/tochableIcon';
import Result from './src/views/Result';
import Navigate from './src/views/Navigate';
import FavoriteRoute from './src/views/FavoriteRoute';
import StationInfo from './src/views/StationInfo';
import Header from './src/components/header';
import Welcome from './src/views/Welcome';
import Regist from './src/views/Regist';
import Choose from './src/views/Choose';

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
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                header
                options={{
                  headerShown: false
                }}
                />
             <Stack.Screen 
              name="Regist" 
              component={Regist} 
              header
              options={{
                headerShown: false
              }}
              />
            <Stack.Screen 
              name="Choose" 
              component={Choose} 
              header
              options={{
                headerShown: false
              }}
              /> */}
            {/* <Stack.Screen 
              name="Result" 
              component={Result} 
              header
              options={{
                headerShown: false
              }}
              />
             <Stack.Screen
              name='Navigate'
              component={Navigate}
              options={{ 
                headerShown: false,
              }}
              /> */}
            <Stack.Screen
              name='FavoriteRoute'
              component={FavoriteRoute}
              options={{ 
                headerShown: false,
              }}
            /> 
            {/* <Stack.Screen
              name='StationInfo'
              component={StationInfo}
              options={{
                // header: (props) => (<Header title={'Station Info'} station={props}/>),
                // headerTitle: '',
                headerShown: false
              }}/> */}
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
