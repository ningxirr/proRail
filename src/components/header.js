"use strict";

import React from 'react';
import { StyleSheet, Text, View,  Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = (props) => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity style={Styles.header_view}>
        <Icon name='angle-left' borderRadius={15} size={25} color={'white'}/>
      </TouchableOpacity>
      <View style={Styles.header_view}>
          <Text style={Styles.header_text}>
              {props.title}
          </Text>
          <View style = {[Styles.station_route_view, { backgroundColor: props.color }]}>
            <Text style = {Styles.station_route_text}>
                {props.platform}
            </Text>
          </View>
      </View>
    </View>  
   
    
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'black',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    height: 110,
  },
  header_view:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  station_route_view: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius:15,
  },
  station_route_text:{
    color:'white', 
    fontSize: 15, 
    textAlign:'center',
    fontFamily: 'LINESeedSans_A_Rg',
  }
});

export default Header;
