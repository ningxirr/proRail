import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StationInformationListScreen from '../screens/StationInformationListScreen'
import StationInformationScreen from '../screens/StationInformationScreen'

const Stack = createNativeStackNavigator();

const StationInfoNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="StationInformationListScreen" 
          component={StationInformationListScreen} 
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
          />
        {/* navigate to Result Screen */}
        <Stack.Screen 
          name="StationInformationScreen" 
          component={StationInformationScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        /> 
    </Stack.Navigator>
  )
}

export default StationInfoNavigator