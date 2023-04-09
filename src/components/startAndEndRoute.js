"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const StartAndEndRoute = (props) => {
    return (
      <View style = {Styles.main_component_view}>
        <View style = {[Styles.route_component_view, {backgroundColor:props.stationColor}]}>
          <Text style = {Styles.route_component_text}>
            {props.stationPlatform}
          </Text>
          <Text style = {[Styles.route_component_text, {marginTop: 2, fontSize: 10, fontFamily: 'LINESeedSansApp-Regular'}]}>
            ({props.stationPlatformLine})
          </Text>
        </View>
        <Text style = {Styles.station_name_text} numberOfLines={2} ellipsizeMode='tail'>
          {props.stationName}
        </Text>
      </View>
    );
};

const Styles = StyleSheet.create({
    main_component_view: {
      width: 130
    },
    route_component_view: {
      borderRadius: 20, 
      marginBottom: 15, 
      padding: 5
    },
    route_component_text: {
      textAlign:'center', 
      color:'white', 
      fontSize: 15, 
      fontFamily: 'LINESeedSansApp-Bold'
    },
    station_name_text: {
      textAlign:'center', 
      color:'white', 
      fontSize: 14, 
      fontFamily: 'LINESeedSansApp-Bold'
    }
});

export default StartAndEndRoute;