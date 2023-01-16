"use strict";

import React, { useCallback, useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, ImageBackground } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NextStation from '../components/nextStation';
import AllRoute from '../components/allRoute';
import TochableIcon from '../components/tochableIcon';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Result = (props) => {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["55%", "100%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground source={require('../../assets/images/Map.png')} resizemode='contain' style={{height:screenHeight*0.7}} >
        <View style={Styles.header_view}>
        <Text style={Styles.header_text}>
          Navigate
        </Text>
        <TochableIcon name={'close'} color={'white'} width={screenWidth*0.05} size={20} function={()=> props.navigation.navigate('FavoriteRoute')}/>
        </View>
        <View style={Styles.navigation_view}>
          <NextStation navigate={true} stationName={'Keha'} stationColor={'#77CC00'} stationPlatform={'BTS skytrain'}/>
        </View>
      </ImageBackground>
      <Text style={{textAlign:'center', fontFamily: 'LINESeedSans_A_Bd',}}>IG: new_norawich</Text>
        <GestureHandlerRootView style={{ flex: 1, marginTop: '-100%' }}>
          <BottomSheet 
            ref={sheetRef} 
            index={0} 
            snapPoints={snapPoints} 
            onChange={handleSheetChange} 
            overDragResistanceFactor={10}
            handleComponent={() => <></>}
            style={Styles.bottom_sheet}
            // enableOverDrag={false}
            >
            <BottomSheetScrollView contentContainerStyle={Styles.content_bottom_sheet_scroll_view}>
              <AllRoute moreDetail={true} path={props.route.params.path} routes={props.route.params.routes}/>
              {console.log(props.route.params.path)}
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
  gesture_container: {
    flex: 1,
    marginTop: '-95%',
  },
  header_view: {
    paddingVertical: screenHeight*0.03,
    paddingHorizontal: screenWidth*0.05,
    backgroundColor: 'black',
    height: screenHeight*0.15,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigation_view: {
    paddingHorizontal: screenWidth*0.05,
    marginTop: '-13%'
  },
  header_text:{
    color: 'white',
    fontSize: screenHeight*0.03,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  content_bottom_sheet_scroll_view: {
    backgroundColor: "white",
    paddingTop: '2%',
    paddingBottom: '5%'
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
