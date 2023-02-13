"use strict";

import React, {useState} from 'react';
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
  const code = 'BL37'
  let images = [{uri:'https://drive.google.com/uc?export=view&id='.concat(stationInfo[code].img_id)}];
  return (
    <SafeAreaView style={Styles.container}>
      {/* <Header title={'Station Info'} color={getColor(stationInfo[code].p)}/> */}
      <ScrollView>
      <View style={Styles.image_view}>
        <TouchableOpacity onPress={() => {
          setIsVisible(true)
          console.log(visible)}}>
          <Image 
            source={{uri:'https://drive.google.com/uc?export=view&id='.concat(stationInfo[code].img_id)}} 
            style={Styles.map_image} 
            resizeMode='cover'/>
          <ImageView 
            images={images}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </TouchableOpacity>
        
       
      </View>
      
      <View style={Styles.description_view}>
          <TimingInfo 
            frequency={stationInfo[code].freq} 
            function={() => {
              console.log('View Time Table')}
            }/>
          <FacilityList facility={stationInfo[code].fac} language={'th'}/>
          <ExitList exit={stationInfo[code].exit} language={'th'} color={getColor(stationInfo[code].p)}/>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00528C',
  },
  image_view: {
    paddingTop: screenHeight*0.16,
    paddingBottom: screenHeight*0.02,
  },
  map_image: {
    height: screenHeight*0.35,
    width: screenWidth,
  },
  description_view: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: screenWidth*0.05,
    paddingVertical: screenHeight*0.02,
  }
});

export default StationInfo;
