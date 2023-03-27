import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeProRailNavigator from './HomeProRailNavigator';
import StationInfoNavigator from './StationInfoNavigator';
import FavoriteNavigator from './FavoriteNavigator';
import AddStopNavigator from './AddStopNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserPreferenceScreen from '../screens/UserPreferenceScreen';
import Header from '../../components/header';

const Tab = createBottomTabNavigator();

const ButtomNavigator = (props) => {
  const hide = props.routeName === "ResultScreen";
  const [navigate, setNavigate] = useState(false);
  useEffect(() => {
    setNavigate(props.routeName === "NavigateScreen");
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="HomeProRailNavigator"
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
        name="StationInfoNavigator"
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
        name="AddStopNavigator"
        children={() => <AddStopNavigator setNavigate={navigate => setNavigate(navigate)} routeName={props.routeName}/>}
        // component={AddStopNavigator}
        options={{
          tabBarIcon: ({size}) => (
            navigate ? 
            <View style={styles.addBottonView}>
              <MaterialCommunityIcons name="navigation-variant" color="white" size={size * 1.4} />
            </View> :
            <View style={styles.addBottonView}>
              <FontAwesomeIcon name="plus" color="white" size={size * 1.4} />
            </View>
          ),
          tabBarStyle: { display: hide ? "none" : "flex" },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FavoriteNavigator"
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
        name="UserPreferenceScreen"
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
