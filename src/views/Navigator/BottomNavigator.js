import {View, StyleSheet} from 'react-native';
import React from 'react';
import HomeProRailNavigator from './HomeProRailNavigator';
import StationInfoNavigator from './StationInfoNavigator';
import FavoriteNavigator from './FavoriteNavigator';
import AddStopNavigator from './AddStopNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import UserPreferenceScreen from '../screens/UserPreferenceScreen';
import Header from '../../components/header';

const Tab = createBottomTabNavigator();

const ButtomNavigator = (props) => {
  console.log(props)
  const hide = props.routeName === "ResultScreen" || props.routeName === "NavigateScreen"
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
      }}
      >
      <Tab.Screen
        name="Home"
        component={HomeProRailNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarStyle: { display: hide ? "none" : "flex" },
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="StationInfo"
        component={StationInfoNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bus" color={color} size={size} />
          ),
          headerShown: false,
          statusBar: {
            backgroundColor: 'white',
          },
        }}
      />
      <Tab.Screen
        name="AddRoute"
        component={AddStopNavigator}
        options={{
          tabBarIcon: ({size}) => (
            <View style={styles.addBottonView}>
              <FontAwesomeIcon name="plus" color="white" size={size * 1.4} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavoriteNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="star-o" color={color} size={size} />
          ),
          headerShown: false,
          headerTransparent: true
        }}
      />
     <Tab.Screen
        name="User"
        component={UserPreferenceScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon name="user-o" color={color} size={size} />
          ),
          header: (props) => (<Header title={'Preference'} station={props}/>),
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
