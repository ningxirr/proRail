"use strict";
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from "@react-navigation/native"
import getDataFromAsyncStorage from './src/function/getDataFromAsyncStorage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ButtomNavigator from './src/views/Navigator/BottomNavigator';

// import Header from './src/components/header';

// import Welcome from './src/views/Register/Welcome';
// import Regist from './src/views/Register/Regist';
// import Choose from './src/views/Register/Choose';
// import StationInfo from './src/views/StationInfo';
// import TimeTable from './src/views/TimeTable';
// import Result from './src/views/Result';
// import Navigate from './src/views/Navigate';

// import StationInformationScreen from './src/views/StationInformationScreen';

// import FavoriteRoute from './src/views/FavoriteRoute';

// import UserPreference from './src/views/UserPreference';
// import Test from './src/views/Test'; 

// import HomeProRailScreen from './src/views/HomeProRailScreen';
// import ChooseDirectionScreen from './src/views/ChooseDirectionScreen';
// import MockScreen from './src/views/MockScreen';

// import checkGPSPermission from './src/function/checkGPSPermission';

/*const getData = async () => {
  const usersCollection = await firestore()
    .collection('facility')
    .doc('0')
    .get();
  console.log('123', usersCollection);
  return usersCollection;
};*/
const Stack = createNativeStackNavigator();
const ref = createNavigationContainerRef();

const App = () => {
  const [isAreadyRegist, setIsAreadyRegist] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [routeName, setRouteName] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromAsyncStorage('@name');
      console.log(data)
      setIsAreadyRegist(data === null);
      setIsRender(true);
    };
    fetchData();
  }, []);
  if(!isRender){
    //Ning, You can put your beautiful animation "start page" here.
    return (<></>)
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
      }}
    >
      <ButtomNavigator routeName={routeName}/>
        {/* <Stack.Navigator> */}
            {/* <Stack.Screen 
                name="Test" 
                component={Test} 
                header
                options={{
                  headerShown: false
                }}
              /> */}
              {/* {
                isAreadyRegist ? 
                <Stack.Screen 
                  name="Welcome" 
                  component={Welcome} 
                  header
                  options={{
                    headerShown: false
                  }}
                  /> : null
              }
              {
                isAreadyRegist ? 
                <Stack.Screen 
                  name="Regist" 
                  component={Regist} 
                  header
                  options={{
                    headerShown: false
                  }}
                  />
                : null
              }
              {
                isAreadyRegist ? 
                <Stack.Screen 
                  name="Choose" 
                  component={Choose} 
                  header
                  options={{
                    headerShown: false
                  }}
                  />
                : null
              } */}
              {/* <Stack.Screen 
                name="Result" 
                component={Result} 
                header
                options={{
                  headerShown: false
                }}
                />
              <Stack.Screen
              name='Navigate'
              component={Navigate}
              options={{ 
                headerShown: false,
              }} 
              /> */}
            {/* <Stack.Screen
              name='StationInformationScreen'
              component={StationInformationScreen}
              options={{
                headerShown: false
            }}/>
            <Stack.Screen
              name='StationInfo'
              component={StationInfo}
              options={{
                headerShown: false
              }}/>
            <Stack.Screen
              name='TimeTable'
              component={TimeTable}
              options={({ navigation }) => ({
                header: () => (
                  <Header
                    title={'Time Table'}
                    haveBackIcon={true}
                    function={() => navigation.goBack()}
                  />
                ),
                headerTransparent: true
              })}
            /> */}

            {/* <Stack.Screen
              name='FavoriteRoute'
              component={FavoriteRoute}
              options={{ 
                headerShown: false,
              }}
            />  */}
            
            {/* <Stack.Screen
            name='UserPreference'
            component={UserPreference}
            options={{
              header: (props) => (<Header title={'Preference'} station={props}/>),
              headerTransparent: true
            }}/> */}
            {/* <Stack.Screen
              name='HomeProRailScreen'
              component={HomeProRailScreen}
              options={{
                headerShown: false
            }}/>
            <Stack.Screen
              name='ChooseDirectionScreen'
              component={ChooseDirectionScreen}
              options={{
                headerShown: false
            }}/>
            <Stack.Screen
              name='MockScreen'
              component={MockScreen}
              options={{
                headerShown: false
            }}/>
            <Stack.Screen 
              name="Result" 
              component={Result} 
              header
              options={{
                headerShown: false
              }}
              />  */}
            
        {/* </Stack.Navigator> */}
    </NavigationContainer>
);
}

export default App;
