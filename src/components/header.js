"use strict";

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TochableIcon from './tochableIcon';

const Header = (props) => {
  return (
    <View style={Styles.container}>
      {
        props.haveBackIcon ? 
        <View style={Styles.header_view}>
          <TochableIcon name={'angle-left'} size={25} color={'white'} function={props.function}/>
        </View>:
        null
      }
      <View style={Styles.header_view}>
          <Text style={Styles.header_text}>
              {props.title}
          </Text>
          {
            props.haveCloseIcon ?
            <View>
              <TochableIcon name={'close'} color={'white'} size={20} function={props.function2}/>
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
    backgroundColor: 'black',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    // height: 110,
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
