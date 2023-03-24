import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FavoriteRouteScreen from '../screens/FavoriteRouteScreen'
import AddStopNavigator from './AddStopNavigator';

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
          name="AddStopNavigator" 
          component={AddStopNavigator}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        /> 
    </Stack.Navigator>
  )
}

export default StationInfoNavigator