import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChooseDirectionScreen from '../screens/ChooseDirectionScreen'
import Header from '../../components/header'
import AddStopScreen from '../screens/AddStopScreen'
import ResultScreen from '../screens/ResultScreen'
import NavigateScreen from '../screens/NavigateScreen'
import TochableIcon from '../../components/tochableIcon'

const Stack = createNativeStackNavigator();

const AddStopNavigator = ({routeName, setNavigate}) => {
  console.log(routeName)
    const [isSet, setIsSet] = useState(false);
    useEffect(() => {
      if(!isSet && routeName === "NavigateScreen"){
        setIsSet(true);
        setNavigate(routeName === "NavigateScreen");
      }
      else if(routeName === "AddStopScreen"){
        setIsSet(false);
        setNavigate(routeName === "NavigateScreen");
      }
    }, [routeName]);
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

export default AddStopNavigator