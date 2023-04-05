import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screens/Register/Welcome'
import Regist from '../screens/Register/Regist'
import Feature from '../screens/Register/Feature'
import Choose from '../screens/Register/Choose'

const Stack = createNativeStackNavigator();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Welcome" 
            component={Welcome} 
            header
            options={{
            headerShown: false
            }}
            /> 
          <Stack.Screen 
            name="Feature" 
            component={Feature} 
            header
            options={{
              headerShown: false
            }}
          /> 
        {/* <Stack.Screen 
            name="Regist" 
            component={Regist} 
            header
            options={{
            headerShown: false
            }}
            /> */}
        <Stack.Screen 
            name="Choose" 
            component={Choose} 
            header
            options={{
            headerShown: false
            }}
            />
    </Stack.Navigator>
  )
}

export default RegisterNavigator;