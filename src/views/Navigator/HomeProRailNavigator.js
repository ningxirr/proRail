import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeProRailScreen from '../screens/HomeProRailScreen'
import ChooseDirectionScreen from '../screens/ChooseDirectionScreen'
import BTSFullScheduleScreen from '../screens/BTSFullScheduleScreen'

const Stack = createNativeStackNavigator();

const HomeProRailNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'right',
        title: null,
        headerStyle: { 
          backgroundColor: 'black',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          height: 150,
        },
        headerBackTitleVisible: false,
        headerTintColor: '#ffffff'
      }}
    >
        <Stack.Screen 
          name="HomeProRailScreen" 
          component={HomeProRailScreen} 
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen 
          name="ChooseDirectionScreen" 
          component={ChooseDirectionScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen 
          name="BTSFullScheduleScreen" 
          component={BTSFullScheduleScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
    </Stack.Navigator>
  )
}

export default HomeProRailNavigator