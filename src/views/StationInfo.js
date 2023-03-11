"use strict";

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View,  Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";
import stationInfo from '../../data/station_info.json';
import TimingInfo from '../components/timingInfo';
import FacilityList from '../components/facilityList';
import ExitList from '../components/exitList';
import Header from '../components/header';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StationInfo = () => {
  const [visible, setIsVisible] = useState(false);
  const code = 'E5'

  return (
    <SafeAreaView style={Styles.container}>
      <View style = {Styles.header_navbar_view}>
        <Header title={stationInfo[code].station_name.en} platform={stationInfo[code].platform.platform} color={stationInfo[code].platform.color.color}/>
      </View>
      
      <ScrollView>
      <View style={Styles.image_view}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image 
            source={{uri:'https://drive.google.com/uc?export=view&id='.concat(stationInfo[code].map_img_id)}} 
            style={{ 
              height: screenHeight*0.4,
              width: screenWidth,
              aspectRatio: 2,
              alignSelf: 'center'
            }} 
            resizeMode='cover'/>
          <ImageView 
            images={[{uri:'https://drive.google.com/uc?export=view&id='.concat(stationInfo[code].map_img_id)}]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </TouchableOpacity>
      </View>
      
      <View style={Styles.description_view}>
        <TimingInfo 
          frequency={stationInfo[code].frequency} 
          function={() => {
            console.log('View Time Table')}
          }/>
          {
            stationInfo[code].facility.length > 0 ?
            <FacilityList facility={stationInfo[code].facility} language={'en'}/>:
            null
          }
          { 
            stationInfo[code].exit.length > 0 ?
            <ExitList exit={stationInfo[code].exit} language={'en'} color={stationInfo[code].platform.color.color}/>:
            null
          }
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  image_view: {
    paddingTop: 110,
  },
  description_view: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -30,
  },
  header_navbar_view:{
    zIndex:1,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default StationInfo;
