"use strict";
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import getDataFromAsyncStorage from './src/function/getDataFromAsyncStorage';
import BottomNavigator from './src/views/Navigator/BottomNavigator';
import RegisterNavigator from './src/views/Navigator/RegisterNavigator';
import SplashScreen from 'react-native-splash-screen'
import { enableScreens } from 'react-native-screens';

const Stack = createNativeStackNavigator();
const ref = createNavigationContainerRef();

const App = () => {
  const [isAreadyRegist, setIsAreadyRegist] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [routeName, setRouteName] = useState(null);
  useEffect(() => {
    SplashScreen.hide();
    const fetchData = async () => {
      const data = await getDataFromAsyncStorage('@regist');
      setIsAreadyRegist(data !== null);
      setIsRender(true);
    };
    fetchData();
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
  }, []);
  if(!isRender){
    return (
      <View style={{flex: 1, backgroundColor: '#1A1A1A'}}>
        <Image 
          source={require('./assets/images/launch_screen.png')} 
          resizeMode='contain' 
          style={{alignSelf: 'center', flex:1, justifyContent: 'center', height: 210, width: 210}}/>
      </View>
    );
  }
  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name)
      }}
      onStateChange={async () => {
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}>
        <Stack.Navigator>
        {
          isAreadyRegist ?  null :
            <Stack.Screen 
              name="RegisterNavigator" 
              component={RegisterNavigator} 
              header
              options={{
              headerShown: false
              }}
            /> 
        }
          <Stack.Screen name="BottomNavigator" options={{ headerShown: false }}>
            {() => <BottomNavigator routeName={routeName} />}
          </Stack.Screen>
        </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default App;
