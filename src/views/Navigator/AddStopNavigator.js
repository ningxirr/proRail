import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChooseDirectionScreen from '../screens/ChooseDirectionScreen'
import Header from '../../components/header'
import AddStopScreen from '../screens/AddStopScreen'
import ResultScreen from '../screens/ResultScreen'
import NavigateScreen from '../screens/NavigateScreen'

const Stack = createNativeStackNavigator();

const AddStopNavigator = ({routeName, setNavigate}) => {
  console.log(routeName)
    const [isSet, setIsSet] = useState(false);
    useEffect(() => {
      if(!isSet && routeName === "NavigateScreen"){
        setIsSet(true);
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
            options={({ navigation }) => ({
              // header: () => (
              //   <Header
              //     title={'Navigate'}
              //     haveCloseIcon={true}
              //     function2={() => {
              //       navigation.navigate('HomeProRailNavigator');
              //       navigation.reset({
              //         index: 0,
              //         routes: [{ name: 'AddStopScreen' }]
              //       });
              //       setNavigate(false);
              //       setIsSet(false);
              //     }}
              //   />
              // ),
              headerTransparent: true,
              headerShown: false,
            })}
            initialParams={{ setNavigate, setIsSet }}
          /> 
      </Stack.Navigator>
    )
}

export default AddStopNavigator