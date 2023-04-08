import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FavoriteRouteScreen from '../screens/FavoriteRouteScreen'
import NavigateScreen from '../screens/NavigateScreen'
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
         <Stack.Screen 
            name="ResultScreen" 
            component={ResultScreen}
            options={{
              headerShown: false,
              headerTransparent: true
            }}
          />
          <Stack.Screen 
          name="NavigateScreen" 
          component={NavigateScreen}
          options={{
            headerShown: false,
            headerBackVisible: false,
            headerTransparent: true,
          }}
        /> 
    </Stack.Navigator>
  )
}

export default StationInfoNavigator