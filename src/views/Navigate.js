"use strict";

import React, { useCallback, useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, ImageBackground } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NextStation from '../components/nextStation';
import AllRoute from '../components/allRoute';
import TochableIcon from '../components/tochableIcon';

const screenHeight = Dimensions.get('window').height;

const Result = (props) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["55%", "100%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  

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
          <NextStation navigate={true} stationName={'Keha'} stationColor={'#77CC00'} stationPlatform={'BTS skytrain'}/>
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
