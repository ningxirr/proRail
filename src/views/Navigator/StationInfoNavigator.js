import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StationInformationListScreen from '../screens/StationInformationListScreen'
import StationInformationScreen from '../screens/StationInformationScreen'
import TimeTableScreen from '../screens/TimeTableScreen'

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
        <Stack.Screen 
          name="StationInformationScreen" 
          component={StationInformationScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        /> 
         <Stack.Screen 
          name="TimeTableScreen" 
          component={TimeTableScreen}
          // options= {({navigation}) => ({
          //   header: () => (
          //     <Header
          //       title={'Time Table'}
          //       haveBackIcon={true}
          //       function={() => {
          //         navigation.goBack();
          //       }}
          //     />
          //   ),
          //   headerTransparent: true,
          // })}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        /> 
    </Stack.Navigator>
  )
}

export default StationInfoNavigator