"use strict";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Dimensions, Image } from 'react-native';
import BottomSheet, {BottomSheetScrollView, BottomSheetHandle} from '@gorhom/bottom-sheet';
import GestureRecognizer, {swipeDirections, } from 'react-native-swipe-gestures';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import NextStation from '../components/nextStation';
import AllRoute from '../components/allRoute';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Result = () => {
  // hooks
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "55%", "90%"], []);
  const [snapIndex, setSnapIndex] = useState(1);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    setSnapIndex(index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <SafeAreaView style={Styles.container}>
        <View style={Styles.header_view}>
          <Text style={Styles.header_text}>
            Navigate
          </Text>
          <Icon name='close' color={'white'} width={screenWidth*0.05} size={20}/>
        </View>
        <View style={Styles.navigation_view}>
          <NextStation navigate={true} stationName={'Keha'} stationColor={'#77CC00'} stationPlatform={'BTS skytrain'}/>
        </View>
        {/* <Image source={require('../../assets/images/Map.png')} style={{ width: '100%', height: '50%'}} resizeMode={'repeat'}/> */}

        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheet 
            ref={sheetRef} 
            index={1} 
            snapPoints={snapPoints} 
            onChange={handleSheetChange} 
            overDragResistanceFactor={10}
            handleComponent={() => {
              switch(snapIndex){
                case 0:
                  return (<Icon name='chevron-up' color={'#5A5A5A'} width={screenWidth*0.05} size={20} style={{alignSelf:'center'}}/>)
                case 1:
                  return (<Icon name='minus' color={'#5A5A5A'} width={screenWidth*0.05} size={20} style={{alignSelf:'center'}}/>)
                case 2:
                  return (<Icon name='chevron-down' color={'#5A5A5A'} width={screenWidth*0.05} size={20} style={{alignSelf:'center'}}/>)
              }
            }}
            // handleComponent = {() => {return (<Icon name='angle-up' color={'black'} width={screenWidth*0.05} size={20}/>)}}
            style={{
              backgroundColor: 'white',  // <==== HERE
              borderRadius: 24,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.1,
              shadowRadius: 24,
              elevation: 10,
            }}>
            <BottomSheetScrollView contentContainerStyle={Styles.contentContainer}>
              <AllRoute moreDetail={true} path={'Fastest'}/>
            </BottomSheetScrollView>
          </BottomSheet> 
        </GestureHandlerRootView>
        
      {/* </GestureRecognizer> */}
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
  },
  contentContainer: {
    backgroundColor: "white",
    paddingBottom: '5%'
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});



export default Result;
