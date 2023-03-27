"use strict";

import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, ImageBackground, PermissionsAndroid } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDistance, findNearest } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import NextStation from '../../components/nextStation';
import AllRoute from '../../components/allRoute';
import TochableIcon from '../../components/tochableIcon';
import RailMap from '../../components/RailMap';
import Header from '../../components/header';

import stationInfo from '../../../data/station_info'
import stationLocation from '../../../data/station_location'
import platFormLineStationInfo from '../../../data/platform_line_station_info'

const Navigate = (props) => {
  const { setNavigate, setIsSet } = props.route.params;
  /********************BottomSeet********************/
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  /********************Geolocation********************/
  //Check if the user has allowed the app to use the location
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => setHasLocationPermission(response))
  const beginingStation = props.route.params.routes[0].path[0][0]; 
  const [stationGPS, setStationGPS] = useState(beginingStation); //set the station code of the nearest station
  const [stationDistance, setStationDistance] = useState(false); //set the distance between the nearest station and the user
  const [stationInterchanges, setStationInterchanges] = useState([]); //set the station code of the nearest station

  // filter all station interchanges (on iOS)
  // const interchangeStation = [... new Set([].concat(...props.route.params.routes).map(obj => obj.path).flat().map(subarray => subarray[subarray.length-1]))];
  // console.log(interchangeStation)

  //filter for the latitude and longitude of the station in this path
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
          interval: 1000,
          fastestInterval: 5000,
          distanceFilter: 0,
        },
      );
      return () => {
        if (_watchId) {
          console.log('clear watch')
          Geolocation.clearWatch(_watchId);
        }
      };
  }, []);

  // useEffect(() => {
  //   if(props.route.params.routes.length === 1) {
  //     let stopStation = [];
  //     for (let i = 0; i < props.route.params.routes[0].path.length; i++) {
  //       if (props.route.params.routes[0].path[i].length > 1){
  //         let takeTheTrainTo = "";
  //         const stationCode = props.route.params.routes[0].path[i][0];
  //         if (platFormLineStationInfo["1"]["platform_line"][0]["stations"].includes(stationCode)){ //สายสีเขียวสุขุมวิท
  //           if(props.route.params.routes[0].path[i][1] === 'N8' 
  //           || props.route.params.routes[0].path[i][1] === 'N7'
  //           || props.route.params.routes[0].path[i][1] === 'N1'
  //           || props.route.params.routes[0].path[i][1] === 'E1'
  //           || props.route.params.routes[0].path[i][1] === 'E5') {
  //             takeTheTrainTo = 'E23'; //Kheha
  //           }
  //           else {
  //             takeTheTrainTo = 'N24'; //Khu Khot
  //           }
  //         }
  //         else if (platFormLineStationInfo["1"]["platform_line"][1]["stations"].includes(stationCode)) { //สายสีเขียวสีลม
  //           if(props.route.params.routes[0].path[i][1] === 'S1'
  //           || props.route.params.routes[0].path[i][1] === 'S3'
  //           || props.route.params.routes[0].path[i][1] === 'S8'){
  //             takeTheTrainTo = 'S12'; //Bang Wa
  //           }
  //           else {
  //             takeTheTrainTo = 'W1'; //National Stadium
  //           }
  //         }
  //         else if (platFormLineStationInfo["2"]["platform_line"][0]["stations"].includes(stationCode)) { //สายสีน้ำเงิน
  //           if(props.route.params.routes[0].path[i][1] === 'BL33'){
              
  //           }
  //         }
  //         // stopStation.push({
  //         //   interchage: props.route.params.routes[0].path[i][0],
  //         //   takeTheTrainTo: ,
  //         // });
  //       }
  //     }
  //     setStationInterchanges(stopStation);
  //   }
  //   else{
  //     setStationInterchanges([]);
  //   }
  // }, [props.route.params.routes])


  const selectNavigateText = () => {
    if (stationDistance > 5000) {
      return 'Nearest Station';
    }
    else if (stationInterchanges.length !== 0) {
      if (stationGPS === beginingStation) return 'Get on the train at';
      else if (stationDistance < 100 && stationInterchanges.includes(stationGPS)) return 'Take the train to';
      else return 'Next Station';
    }
    else {
      return 'Next Station';
    }
  }

  const stationPath = props.route.params.stationPath;
  return (
    <SafeAreaView style={Styles.container}> 
    <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={Styles.header_view}>
          <Header
            title={'Navigate'}
            haveCloseIcon={true}
            function2={() => {
              props.navigation.navigate('HomeProRailNavigator');
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'AddStopScreen' }]
              });
              // setNavigate(false);
              // setIsSet(false);
            }}
          />
        </View>
        <View style={Styles.navigation_view}>
          <NextStation 
            navigate={hasLocationPermission} 
            navigateText={selectNavigateText()} 
            stationName={stationInfo[stationGPS].station_name.en} 
            stationColor={stationInfo[stationGPS].platform.color.color} 
            stationPlatform={stationInfo[stationGPS].platform.platform}
            description={'You are out of the route'}/>
        </View>
        
        <RailMap 
          cannotClicked={true}
          oriStationCode={stationPath[0]}
          destStationCode={stationPath[stationPath.length-1]}
          itemsCode={stationPath.slice(1, stationPath.length - 1)}
          />
        
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
    backgroundColor: 'white',
  },
  header_view: {
    zIndex:1,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  navigation_view: {
    zIndex:1,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: '5%',
    marginTop: 60,
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

export default Navigate;
