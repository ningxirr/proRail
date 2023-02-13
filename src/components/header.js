"use strict";

import React from 'react';
import { StyleSheet, Text, View,  Dimensions } from 'react-native';
import NavBar from '../components/navBar';
import stationInfo from '../../data/station_info.json';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const getColor = require('../function/getColor');

const Header = (props) => {
  return (
    <View style={Styles.container}>
      
      <NavBar/>
      <View style={Styles.header_view}>
          <Text style={Styles.header_text}>
              {props.title}
          </Text>
          {/* {console.log(props.station.route.params.station)}
          {console.log(stationInfo[props.station.route.params.station])} 
          getColor(stationInfo[props.station.route.params.station].p) */}
          <View style = {[Styles.station_route_view, { backgroundColor: '#f5f367' }]}>
              <Text style = {Styles.station_route_text}>
                  BTS skytrain
              </Text>
          </View>
      </View>
    </View>  
   
    
  );
};

const Styles = StyleSheet.create({
    container: {
    paddingVertical: screenHeight*0.01,
    backgroundColor: 'black',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: screenHeight*0.15,
  },
  header_view:{
    paddingVertical: screenHeight*0.01,
    paddingHorizontal: screenWidth*0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  station_route_view: {
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius:100,
  },
  station_route_text:{
    color:'white', 
    fontSize: 15, 
    textAlign:'center',
    fontFamily: 'LINESeedSans_A_Rg',
  },
});

export default Header;
