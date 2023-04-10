"use strict";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RecommendedRoute = (props) => {
    return(
      <View style={Styles.recommended_route_view}>
        <RouteDetail topic = {'TIME'} number = {props.time} unit = {'mins'} />
        <RouteDetail topic = {'INTERCHANGE'} number = {props.interchange} unit = {'station(s)'}/>
        <RouteDetail topic = {'PRICE'} number = {props.price} unit = {'THB'}/>
      </View>
    );
}

const RouteDetail = (props) => {
  return(
    <View>
      <Text style = {Styles.title_text}>
        {props.topic}
      </Text>
      <Text style = {Styles.number_text}>
        {props.number}
      </Text>
      <Text style = {Styles.unit_text}>
        {props.unit}
      </Text>
      
    </View>
  );
}

const Styles = StyleSheet.create({
    recommended_route_view: {
      flexDirection: 'row',
      backgroundColor: 'black',
      paddingHorizontal: '10%', 
      paddingVertical: 20,
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    title_text: {
        fontSize: 14, 
        fontFamily: 'LINESeedSansApp-Regular',        
        color:'white', 
        textAlign:'center'
    },
    number_text: {
        fontSize: 36, 
        fontFamily: 'LINESeedSansApp-Bold', 
        color:'white', 
        textAlign:'center',
        paddingVertical: 10
    },
    unit_text: {
        fontSize: 12, 
        fontFamily: 'LINESeedSansApp-Regular', 
        color:'white', 
        textAlign:'center',
        alignSelf: 'center'
    }
});

export default RecommendedRoute;