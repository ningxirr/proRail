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
            {/*<Stack.Screen 
              name="Result" 
              component={Result} 
              header
              options={{
                headerTransparent: true,
                headerTitle: '',
                headerLeft: (navigation) => (
                  <TochableIcon name='angle-left' size={25} color={'white'} function={()=>console.log('back')}/>
                )
              }}
              />
             <Stack.Screen
              name='Navigate'
              component={Navigate}
              options={{ 
                headerShown: false,
              }}
              />
            <Stack.Screen
              name='FavoriteRoute'
              component={FavoriteRoute}
              options={{ 
                headerShown: false,
              }}
            /> */}
            <Stack.Screen
              name='StationInfo'
              component={StationInfo}
              options={{
                header: (props) => (<Header title={'Station Info'} station={props}/>),
                headerTransparent: true,
              }}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;
