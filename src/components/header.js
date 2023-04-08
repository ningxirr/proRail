"use strict";

import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = (props) => {
  return (
    <View style={Styles.container}>
      <StatusBar translucent={false} backgroundColor="black" barStyle="light-content" />
      {
        props.haveBackIcon ? 
        <View style={Styles.icon_header_view}>
          <TouchableOpacity style={{width: 25, height: 25}} onPress={props.function}>
            <Icon name='angle-left' color={'white'} size={25} />
          </TouchableOpacity>
        </View>:
        null
      }
      <View style={Styles.header_view}>
          <Text style={[Styles.header_text, {flex: 0.9}]} ellipsizeMode='tail' numberOfLines={1}>
              {props.title}
          </Text>
          {
            props.haveCloseIcon ?
            <View>
              <Ionicons name='md-close' color={'white'} size={25} onPress={props.function2}/>
            </View>
            :
            <View style = {[Styles.station_route_view, { backgroundColor: props.color }]}>
              <Text style = {Styles.station_route_text}>
                  {props.platform}
              </Text>
            </View>
          }
          
      </View>
    </View>  
   
    
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingTop: 10,
    backgroundColor: 'black',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  icon_header_view: {
    paddingTop: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_view:{
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSansApp-Bold',
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
    fontFamily: 'LINESeedSansApp-Regular',
  }
});

export default Header;
