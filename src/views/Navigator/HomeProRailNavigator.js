import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeProRailScreen from '../screens/HomeProRailScreen'
import ChooseDirectionScreen from '../screens/ChooseDirectionScreen'
import BTSFullScheduleScreen from '../screens/BTSFullScheduleScreen'
import AboutProRailScreen from '../screens/AboutProRailScreen'
import ResultScreen from '../screens/ResultScreen'
import NavigateScreen from '../screens/NavigateScreen'

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
        <Stack.Screen 
          name="BTSFullScheduleScreen" 
          component={BTSFullScheduleScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen 
          name="AboutProRailScreen" 
          component={AboutProRailScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
    </Stack.Navigator>
  )
}

export default HomeProRailNavigator