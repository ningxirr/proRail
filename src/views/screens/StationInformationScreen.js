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

const getFrequency = (code) => {
  const today = new Date()
  const day = today.getDay();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const platformLineId = stationInfo[code].platform_line_id;

  let frequencySet = 0;
  let freqencyTime = [];
  if (platformLineId === '1' || platformLineId === '2' || platformLineId === '4' || platformLineId === '5' || platformLineId === '9'){
    if(day >= 1 && day <= 5){
      freqencyTime = freq[platformLineId]['Mon-Fri'];
    }
    else{
      freqencyTime = freq[platformLineId]['Sat-Sun'];
    }
  }
  else if (platformLineId === '3'){
    if(day >= 1 && day <= 5){
      freqencyTime = freq[platformLineId]['Mon-Fri'];
    }
    else if(day === 6){
      freqencyTime = freq[platformLineId]['Sat'];
    }
    else{
      freqencyTime = freq[platformLineId]['Sun'];
    }
  }
  else if (platformLineId === '10' || platformLineId === '11'){
    freqencyTime = freq[platformLineId]['Every'];
  }
  frequencySet = freqencyTime.filter((item) => {
    const time = item.period_time.split('-');
    const startMinute = time[0].includes(':') ? parseInt(time[0].trim().split(':')[1]) : parseInt(time[0].trim().split('.')[1]);
    const startHour = time[0].includes(':') ? parseInt(time[0].trim().split(':')[0]) === 0 ? 23 : parseInt(time[0].trim().split(':')[0]) : parseInt(time[0].trim().split('.')[1]) === 0 ? 23 : parseInt(time[0].trim().split('.')[0]);
    const endMinute = time[1].includes(':') ? parseInt(time[1].trim().split(':')[1]) === 0 ? 59 : parseInt(time[1].trim().split(':')[1]) : parseInt(time[1].trim().split('.')[1]) === 0 ? 59 : parseInt(time[1].trim().split('.')[1]);
    const endHour = time[1].includes(':') ? endMinute !== 59 ? parseInt(time[1].trim().split(':')[0]) : parseInt(time[1].trim().split(':')[0])-1 < 0 ? 23 : parseInt(time[1].trim().split(':')[0])-1 : endMinute !== 59 ? parseInt(time[1].trim().split('.')[0]) : parseInt(time[1].trim().split('.')[0])-1 < 0 ? 23 : parseInt(time[1].trim().split('.')[0])-1;
    if(startHour <= hour && endHour >= hour){
      if(startHour === hour && endHour === hour){
        if(startMinute <= minute && endMinute >= minute){
          return true;
        }
        else{
          return false;
        }
      }
      else if(startHour === hour){
        if(startMinute <= minute){
          return true;
        }
        else{
          return false;
        }
      }
      else if(endHour === hour){
        if(endMinute >= minute){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return true;
      }
    }
  });
  return frequencySet.length === 0 ? null : frequencySet[0].period_interval;
}

const StationInfo = ({navigation, route}) => {
  const [visible, setIsVisible] = useState(false);
  const code = route.params.code
  return (
    <SafeAreaView style={Styles.container}>
      <View style={{backgroundColor: '#fafafa', flex: 1}}>
      <View style = {Styles.header_navbar_view}>
        <Header 
          title={stationInfo[code].station_name.en}
          platform={stationInfo[code].platform.platform} 
          color={stationInfo[code].platform.color.path_color} 
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
          frequency={getFrequency(code)} 
          function={() => {
            navigation.navigate('TimeTableScreen',{
              route: { 
                code: code,
                navigation: navigation
              }
            })
            console.log('View Time Table')
          }
          }/>
          { 
            stationInfo[code].exit.length > 0 ?
            <ExitList exit={stationInfo[code].exit} language={'en'} color={stationInfo[code].platform.color.path_color}/>:
            null
          }
          {
            stationInfo[code].facility.length > 0 ?
            <FacilityList facility={stationInfo[code].facility} language={'en'}/>:
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
    position: 'absolute',
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
