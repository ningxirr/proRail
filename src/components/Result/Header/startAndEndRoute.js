"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
        width:screenWidth*0.33
    },
    route_component_view: {
        borderRadius:5, 
        marginBottom:screenHeight*0.02, 
        padding: screenHeight*0.01
    },
    route_component_text: {
        textAlign:'center', 
        color:'white', 
        fontSize: screenHeight * 0.018, 
        fontWeight:'normal'
    },
    station_name_text: {
        textAlign:'center', 
        color:'white', 
        fontSize: screenHeight * 0.017, 
        fontWeight:'700'
    }
});

export default StartAndEndRoute;