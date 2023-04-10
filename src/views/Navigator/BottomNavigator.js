import {View, StyleSheet, AppState} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';
import HomeProRailNavigator from './HomeProRailNavigator';
import StationInfoNavigator from './StationInfoNavigator';
import FavoriteNavigator from './FavoriteNavigator';
import AddStopNavigator from './AddStopNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import UserPreferenceScreen from '../screens/UserPreferenceScreen';

const Tab = createBottomTabNavigator();

const ButtomNavigator = (props) => {
  const appState = useRef(AppState.currentState);
  const routeName = props.routeName;
  const hide = routeName === "ResultScreen" || routeName === "NavigateScreen";
  console.log('routeName' +routeName)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
        appState.current = nextAppState;
        if(appState.current === 'background' && routeName !== null && routeName !== 'NavigateScreen'){
          Geolocation.stopObserving();
        }
      });
      return () => {
        subscription.remove();
      };
  }, [routeName]);

  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="HomeProRailNavigator"
        component={HomeProRailNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="md-home-outline" color={color} size={size} />
          ),
          tabBarLabel: "HOME",
          tabBarLabelStyle: {
            fontSize: 8,
            fontFamily: 'LINESeedSansTHApp-Bold',
          },
          tabBarStyle: { display: hide ? "none" : "flex" },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="StationInfoNavigator"
        component={StationInfoNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="file-tray-full-outline" color={color} size={size} />
          ),
          tabBarLabel: "INFO",
          tabBarLabelStyle: {
            fontSize: 8,
            fontFamily: 'LINESeedSansTHApp-Bold',
          },
          headerShown: false,
          statusBar: {
            backgroundColor: 'white',
          },
          tabBarHideOnKeyboard: true
        }}
      />
      <Tab.Screen
        name="AddStopNavigator"
        component={AddStopNavigator}
        options={{
          tabBarIcon: ({size}) => (
            <View style={styles.addBottonView}>
              <FontAwesomeIcon name="plus" color="white" size={size * 1.4}/>
            </View>
          ),
          tabBarStyle: { display: hide ? "none" : "flex" },
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabel: ""
        }}
      />
      <Tab.Screen
        name="FavoriteNavigator"
        component={FavoriteNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="star-o" color={color} size={size} />
          ),
          tabBarLabel: "FAVORITE",
          tabBarLabelStyle: {
            fontSize: 8,
            fontFamily: 'LINESeedSansTHApp-Bold',
          },
          tabBarStyle: { display: hide ? "none" : "flex" },
          headerShown: false,
          headerTransparent: true,
        }}
      />
     <Tab.Screen
        name="UserPreferenceScreen"
        component={UserPreferenceScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="user-o" color={color} size={size} />
          ),
          tabBarLabel: "USER",
          tabBarLabelStyle: {
            fontSize: 8,
            fontFamily: 'LINESeedSansTHApp-Bold',
          },
          headerShown: false,
          headerTransparent: true
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addBottonView: {
    backgroundColor: 'black',
    marginBottom: 10,
    width: (60),
    height: (60),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtomNavigator;
