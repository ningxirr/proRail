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
        </View>
        <Text style = {Styles.station_name_text}>
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
      padding: 10
    },
    route_component_text: {
      textAlign:'center', 
      color:'white', 
      fontSize: 15, 
      fontFamily: 'LINESeedSans_A_Rg'
    },
    station_name_text: {
      textAlign:'center', 
      color:'white', 
      fontSize: 14, 
      fontFamily: 'LINESeedSans_A_Bd'
    }
});

export default StartAndEndRoute;