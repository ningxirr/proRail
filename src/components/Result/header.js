"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import StartAndEndRoute from '../startAndEndRoute';
import stationInfo from '../../../data/station_info.json';

const Header = (props) => {
    return (
      <View>
        <ImageBackground source={require('../../../assets/images/background.png')} style={{height:330}}> 
            <View style = {Styles.header_view}>
              <View style = {Styles.header_body_view}>
                <View style = {Styles.main_header_view}>
                </View>
                <View style = {Styles.start_and_end_route_view}>
                  <StartAndEndRoute stationName = {stationInfo[props.startStation].station_name.en} stationPlatform = {stationInfo[props.startStation].platform.platform} stationColor = {stationInfo[props.startStation].platform.color.color}/>
                  <Text style = {{color:'white', fontSize: 15, fontFamily: 'LINESeedSansApp-Regular'}}>
                    to
                  </Text>
                  <StartAndEndRoute stationName = {stationInfo[props.stopStation].station_name.en} stationPlatform = {stationInfo[props.stopStation].platform.platform} stationColor = {stationInfo[props.stopStation].platform.color.color}/>
                </View>
              </View>
            </View>
        </ImageBackground>
      </View>
    );
  };

  const Styles = StyleSheet.create({
    header_view: {
      marginTop: 70
    },
    header_body_view:{
      paddingHorizontal: 10
    },
    main_header_view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    start_and_end_route_view: {
      marginTop: 40,
      paddingVertical: 50,
      paddingHorizontal: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  });

  export default Header;