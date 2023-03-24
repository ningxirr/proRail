import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ResultScreen from '../screens/ResultScreen'

const Stack = createNativeStackNavigator();

const StationInfoNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="FavoriteRouteScreen" 
          component={FavoriteRouteScreen} 
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
          />
        {/* navigate to Result Screen */}
        <Stack.Screen 
          name="HomeProRailNavigator" 
          component={HomeProRailNavigator}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        /> 
    </Stack.Navigator>
  )
}

export default StationInfoNavigator