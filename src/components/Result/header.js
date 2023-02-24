"use strict";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import NextStation from '../nextStation';
import StartAndEndRoute from '../startAndEndRoute';
import NavBar from '../navBar';
import stationInfo from '../../../data/station_info.json';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const navigate = false;

const Header = (props) => {
    return (
      <View>
        <ImageBackground source={require('../../../assets/images/background.png')} style={{height:screenHeight*0.35}}> 
            {/* <NavBar />  */}
            <View style = {navigate ? Styles.header_view: Styles.header_no_navigate_view}>
              <View style = {Styles.header_body_view}>
                <View style = {Styles.main_header_view}>
                  <Text style = {[Styles.header_text, {fontSize: props.header.length > 10 ? screenHeight*0.028: screenHeight*0.038}]}>
                    {props.header}
                  </Text>
                  <View style={Styles.add_stop_view}>
                    <Text style={Styles.add_stop_text}>
                      2 stop(s)
                    </Text>
                  </View>
                </View>
                <View style = {Styles.start_and_end_route_view}>
                  <StartAndEndRoute stationName = {stationInfo[props.startStation].station_name.en} stationPlatform = {stationInfo[props.startStation].platform.platform} stationColor = {stationInfo[props.startStation].platform.color}/>
                  <Text style = {{color:'white', fontSize: screenHeight * 0.020, fontFamily: 'LINESeedSans_A_Rg'}}>
                    to
                  </Text>
                  <StartAndEndRoute stationName = {stationInfo[props.stopStation].station_name.en} stationPlatform = {stationInfo[props.stopStation].platform.platform} stationColor = {stationInfo[props.stopStation].platform.color}/>
                </View>
              </View>
            </View>
        </ImageBackground>
      </View>
    );
  };

  const Styles = StyleSheet.create({
    header_view: {
      width: screenWidth,
      height: screenHeight*0.48,
      paddingHorizontal: screenWidth*0.005,
      paddingVertical: screenHeight*0.03,
    },
    header_text: {
      color:'white', 
      fontFamily: 'LINESeedSans_A_Bd'
    },
    header_no_navigate_view: {
      width: screenWidth,
      height: screenHeight*0.35,
      paddingHorizontal: screenWidth*0.005,
      paddingVertical: screenHeight*0.01,
      marginTop: screenHeight*0.05
    },
    header_body_view:{
      paddingHorizontal: '5%'
    },
    main_header_view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    add_stop_view:{
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 100,
      justifyContent: 'center'
    },
    add_stop_text: {
      color:'white',
      fontSize: screenHeight * 0.016,
      fontFamily: 'LINESeedSans_A_Bd',
      textAlign: 'center',
      alignContent:'center', 
      paddingVertical: '2%',
      paddingHorizontal: '4%'
    },
    start_and_end_route_view: {
      width: '100%',
      paddingVertical: '8%',
      paddingHorizontal: screenHeight*0.015,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  });

  export default Header;