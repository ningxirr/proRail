"use strict";

import React, { useCallback, useMemo, useRef, useEffect, useState, Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NextStation from '../../components/nextStation';
import AllRoute from '../../components/allRoute';
import RailMap from '../../components/RailMap';
import Header from '../../components/header';
import stationLocation from '../../../data/station_location'

const Navigate = (props) => {
 /********************BottomSeet********************/
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "40%", "70%"], []);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const handleSheetChange = useCallback((index) => {
    if(index === 0) setFullScreenMap(true);
    else setFullScreenMap(false);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  //prepare all intercahge for notifcation
  const [stationInterchanges, setStationInterchanges] = useState([]); 
  //filter for the latitude and longitude of the station in this path
  const filteredStation = stationLocation.filter(obj => [... new Set([].concat(...props.route.params.routes.map(obj => obj.path).flat()))].includes(obj.code));
  useEffect(() => {
    if(props.route.params.routes.length === 1) {
      let stopStation = [];
      for (let i = 0; i < props.route.params.routes[0].path.length; i++) {
        stopStation.push(props.route.params.routes[0].path[i][0]);
      }
      stopStation.push(props.route.params.routes[0].path[props.route.params.routes[0].path.length-1][props.route.params.routes[0].path[props.route.params.routes[0].path.length-1].length-1])
      setStationInterchanges(stopStation);
    }
    else{
      setStationInterchanges([]);
    }
  }, [props.route.params.routes])

  const stationPath = props.route.params.stationPath;
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, marginTop: 25}}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor:'white' }}>
        <View style={{zIndex: 1}}>
          <Header 
            title="Navigate" 
            back={true} 
            navigation={props.navigation} 
            haveCloseIcon={true} 
            function2={()=> {
              props.navigation.navigate(props.route.params.initailScreen);
            }}/>
        </View>
        <View style={Styles.navigation_view}>
          <NextStation 
            isNearestOnly={false}
            beginingStation={stationPath[0]}
            lastStation={stationPath[stationPath.length-1]}
            filteredStation={filteredStation}
            setStationInterchanges={setStationInterchanges}
            stationInterchanges={stationInterchanges}/>
        </View>
        
        <View style={{marginTop: fullScreenMap ? 0 : -80 }}>
          <RailMap 
            cannotClicked={true}
            oriStationCode={stationPath[0]}
            destStationCode={stationPath[stationPath.length-1]}
            itemsCode={stationPath.slice(1, stationPath.length - 1)}
            />
        </View>
            <View style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              paddingHorizontal: 10,
              marginHorizontal: 20,
              backgroundColor: '#D3D3D3',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
              <FontAwesome name="chevron-up" size={25} color="white" onPress={()=>handleSnapPress(1)}/>
            </View>
          <BottomSheet 
            ref={sheetRef} 
            index={1} 
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
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header_view: {
    zIndex:1,
    height: 120,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: 'black',
    width: '100%'
  },
  navigation_view: {
    zIndex:1,
    height: 100,
    marginTop: -20,
    marginTop: -20,
    paddingHorizontal: '5%',
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: "white",
  }
});

export default Navigate;