"use strict";

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View,  Dimensions, Image, ScrollView, TouchableOpacity  } from 'react-native';
import ImageView from "react-native-image-viewing";
import stationInfo from '../../../data/station_info.json';
import TimingInfo from '../../components/timingInfo';
import FacilityList from '../../components/facilityList';
import ExitList from '../../components/exitList';
import Header from '../../components/header';
import freq from '../../../data/freq.json';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StationInfo = ({navigation, route}) => {
  const [visible, setIsVisible] = useState(false);
  const code = route.params.code
  const today = new Date()
  const day = today.getDay();
  const hour = today.getHours();
  const minute = today.getMinutes();
  //I will add frequency later
  if(day > 1 && day < 5){
    
  }
  else{

  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{backgroundColor: '#fafafa'}}>
      <View style = {Styles.header_navbar_view}>
        <Header 
          title={stationInfo[code].station_name.en.length >= 20 ? stationInfo[code].station_name.en.substring(0,20)+'...' : stationInfo[code].station_name.en} 
          platform={stationInfo[code].platform.platform} 
          color={stationInfo[code].platform.color.color} 
          haveBackIcon={true}
          function={()=>navigation.goBack()}/>
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
            navigation.navigate('TimeTableScreen',{
              route: { code: code }
            })
            console.log('View Time Table')
          }
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
      </View>
  </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  image_view: {
    paddingTop: 50,
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
    top: 0,
    left: 0,
    right: 0,
  },
});

export default StationInfo;

// import React from 'react';
// import { View, Button } from 'react-native';
// import notifee from '@notifee/react-native';

// function StationInfo() {
//   async function onDisplayNotification() {
//     // Request permissions (required for iOS)
//     await notifee.requestPermission()

//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     // Display a notification
//     await notifee.displayNotification({
//       title: 'Notification Title',
//       body: 'Main body content of the notification',
//       android: {
//         channelId,
//         pressAction: {
//           id: 'default',
//         },
//       },
//     });
//   }

//   return (
//     <View>
//       <Button title="Display Notification" onPress={() => onDisplayNotification()} />
//     </View>
//   );
// }


// export default StationInfo;
