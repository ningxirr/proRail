"use strict";

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, Image, ScrollView } from 'react-native';
import NavBar from '../components/navBar';
import TimingInfo from '../components/timingInfo';
import FacilityList from '../components/facilityList';
import ExitList from '../components/exitList';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StationInfo = (props) => {
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView>
      <View style={Styles.image_view}>
        <Image source={require('../../assets/images/MockStationInfo.png')} style={Styles.map_image} resizeMode='contain'/>
      </View>
      
      <View style={Styles.description_view}>
          <TimingInfo 
            frequency={'6.00'} 
            function={() => {
              console.log('View Time Table')}
            }/>
          <FacilityList/>
          <ExitList/>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_view: {
    backgroundColor: '#00528C', 
    paddingVertical: screenHeight*0.15,
    paddingBottom: screenHeight*0.1
  },
  header_view: {
    backgroundColor: 'black',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: screenHeight*0.01,
  },
  header_station_view: {
    paddingVertical: screenHeight*0.02,
    paddingHorizontal: screenWidth*0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_text:{
    color: 'white',
    fontSize: screenHeight*0.03,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  station_route_view: {
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius:100,
  },
  station_route_text:{
    color:'white', 
    fontSize: screenHeight * 0.017, 
    textAlign:'center',
    fontFamily: 'LINESeedSans_A_Rg',
  },
  add_favorite_route_text: {
    textAlign: 'center',
  },
  map_image: {
    height: screenHeight*0.35,
    width: screenWidth,
  },
  description_view: {
    marginTop: -screenHeight*0.05,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: screenWidth*0.05,
    paddingVertical: screenHeight*0.02,
  }
});



export default StationInfo;
