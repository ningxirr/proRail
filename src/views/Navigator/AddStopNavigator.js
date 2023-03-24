import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChooseDirectionScreen from '../screens/ChooseDirectionScreen'
import AddStopScreen from '../screens/AddStopScreen'
import ResultScreen from '../screens/ResultScreen'

const Stack = createNativeStackNavigator();

const AddStopNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="AddStopScreen" 
          component={AddStopScreen}
          options={{
            headerShown:false,
            headerTransparent: true
          }}
        />
        <Stack.Screen 
          name="ChooseDirectionScreen" 
          component={ChooseDirectionScreen}
          options={{
            headerShown: false,
            headerTransparent: true
          }}
        />
        {/* navigate to Result Screen */}
        <Stack.Screen 
          name="ResultScreen" 
          component={ResultScreen}
          options={{
            headerShown: false,
            headerTransparent: true
          }}
        />
    </Stack.Navigator>
  )
}

export default AddStopNavigator