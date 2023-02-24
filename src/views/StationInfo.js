"use strict";

import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";
import stationInfo from '../../data/station_info.json';
import NavBar from '../components/navBar';
import TimingInfo from '../components/timingInfo';
import FacilityList from '../components/facilityList';
import ExitList from '../components/exitList';
import Header from '../components/header';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const getColor = require('../function/getColor');

const StationInfo = () => {
  const [visible, setIsVisible] = useState(false);
  // const [imageHeight, setImageHeight] = useState(null);
  // useEffect(() => {
  //   Image.getSize('https://drive.google.com/uc?export=view&id='.concat(stationInfo[code].map_img_id), (width, height) => {
  //     setImageHeight(height*(screenWidth/width));
  //   });
  // }, []);
  const code = 'E5'

  return (
    <SafeAreaView style={Styles.container}>
      {/* <Header title={'Station Info'} color={stationInfo[code].platform.color}/> */}
      <ScrollView>
      
      <View style={Styles.image_view}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image 
            source={{uri:'https://drive.google.com/uc?export=view&id='.concat(stationInfo[code].map_img_id)}} 
            style={{ 
              height: screenHeight*0.4,
              width: screenWidth,
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
            <FacilityList facility={stationInfo[code].facility} language={'th'}/>:
            null
          }
          { 
            stationInfo[code].exit.length > 0 ?
            <ExitList exit={stationInfo[code].exit} language={'th'} color={stationInfo[code].platform.color}/>:
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
    paddingTop: screenHeight*0.10,
  },
  description_view: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: screenWidth*0.05,
    paddingVertical: screenHeight*0.02,
    marginTop: -screenHeight*0.03,
  }
});

export default StationInfo;
