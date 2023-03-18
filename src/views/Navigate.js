"use strict";

import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, ImageBackground, PermissionsAndroid } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDistance, findNearest } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import NextStation from '../components/nextStation';
import AllRoute from '../components/allRoute';
import TochableIcon from '../components/tochableIcon';

import stationInfo from '../../data/station_info'
import stationLocation from '../../data/station_location'

const screenHeight = Dimensions.get('window').height;

const Result = (props) => {
  /********************BottomSeet********************/
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["55%", "100%"], []);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  /********************Geolocation********************/
  //Check if the user has allowed the app to use the location
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => setHasLocationPermission(response) )

  const beginingStation = props.route.params.routes[0].path[0][0];
  const [stationGPS, setStationGPS] = useState(beginingStation);
  const [stationDistance, setStationDistance] = useState(false);
  const interchangeStation = [... new Set([].concat(...props.route.params.routes).map(obj => obj.path).flat().map(subarray => subarray[0]))];
  const filteredStation = stationLocation.filter(obj => [... new Set([].concat(...props.route.params.routes.map(obj => obj.path).flat()))].includes(obj.code));
  useEffect(() => {
    const _watchId = Geolocation.watchPosition(
      position => {
        console.log(position.coords)
        let nearest = findNearest(position.coords, filteredStation);
        setStationGPS(nearest.code);
        setStationDistance(getDistance(nearest, position.coords));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);

  const selectNavigateText = () => {
    if(setStationDistance > 10000){
      return 'Nearest Station';
    }
    else if(beginingStation === stationGPS){
      return 'Get on \n the Train at';
    }
    else if(interchangeStation.includes(stationGPS) && stationDistance < 250){
      return 'Take the Train To' //fix later take the train to lastest of station
    }
    else{
      return 'Next Station';
    }
  }

  return (
    <SafeAreaView style={Styles.container}> 
      <ImageBackground source={require('../../assets/images/Map.jpg')} resizemode='contain' style={{height:screenHeight*0.7}} >
        <View style={Styles.header_view}>
        <Text style={Styles.header_text}>
          Navigate
        </Text>
        <TochableIcon name={'close'} color={'white'} size={20} function={()=> props.navigation.navigate('FavoriteRoute')}/>
        </View>
        <View style={Styles.navigation_view}>
          <NextStation 
            navigate={hasLocationPermission} 
            navigateText={selectNavigateText()} 
            stationName={stationInfo[stationGPS].station_name.en} 
            stationColor={stationInfo[stationGPS].platform.color.color} 
            stationPlatform={stationInfo[stationGPS].platform.platform}/>
        </View>
      </ImageBackground>
        <GestureHandlerRootView style={{ flex: 1, marginTop: '-100%' }}>
          <BottomSheet 
            ref={sheetRef} 
            index={0} 
            snapPoints={snapPoints} 
            onChange={handleSheetChange} 
            overDragResistanceFactor={10}
            handleComponent={() => <></>}
            style={Styles.bottom_sheet}
            enableOverDrag={false}
            >
            <BottomSheetScrollView contentContainerStyle={Styles.content_bottom_sheet_scroll_view}>
              <AllRoute moreDetail={true} path={props.route.params.path} routes={props.route.params.routes}/>
            </BottomSheetScrollView>
          </BottomSheet> 
        </GestureHandlerRootView>
    </SafeAreaView>
    
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_view: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: 'black',
    height: 100,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigation_view: {
    paddingHorizontal: 25,
    marginTop: -30
  },
  header_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  content_bottom_sheet_scroll_view: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 10
  },
  bottom_sheet: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  }
});

export default Result;
