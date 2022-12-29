"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RecommendedRoute = (props) => {
    return(
      <View style={Styles.recommended_route_view}>
        <RouteDetail topic = {'TIME'} number = {'36'} unit = {'mins'} />
        <RouteDetail topic = {'INTERCHANGE'} number = {'2'} unit = {'station(s)'}/>
        <RouteDetail topic = {'PRICE'} number = {'48'} unit = {'THB'}/>
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
        {"\t"}{props.unit}
      </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
    recommended_route_view: {
      flexDirection: 'row',
      backgroundColor: 'black',
      paddingHorizontal: '10%', 
      paddingVertical: screenHeight*0.019,
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    title_text: {
        fontSize: screenHeight*0.02, 
        fontFamily: 'LINESeedSans_A_Rg',        
        color:'white', 
        textAlign:'center'
    },
    number_text: {
        fontSize: screenHeight*0.048, 
        fontFamily: 'LINESeedSans_A_Bd', 
        color:'white', 
        textAlign:'center',
        paddingVertical: screenHeight*0.01
    },
    unit_text: {
        fontSize: screenHeight*0.018, 
        fontFamily: 'LINESeedSans_A_Rg', 
        color:'white', 
        marginRight:'5%', 
        textAlign:'center'
    }
});

export default RecommendedRoute;