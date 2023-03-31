"use strict";

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TotalFavorite from '../../components/totalFavorite';
import FavoriteRouteList from '../../components/favoriteRouteList';
import getDataFromAsyncStorage from '../../function/getDataFromAsyncStorage';

const screenHeight = Dimensions.get('window').height;

const FavoriteRoute = (props) => {
  const [favoriteRoute, setFavaoriteRoute] = useState([]);
  const [recommended, setRecommended] = useState('');
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["40%", "75%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const favoriteRouteData = await getDataFromAsyncStorage('@favorite');
        const recommendedData = await getDataFromAsyncStorage('@recommended');
        if(favoriteRouteData !== null) setFavaoriteRoute([...favoriteRouteData].reverse());
        if(recommendedData !== null) setRecommended(recommendedData[0]);
      };
      fetchData();
    }, [])
  );

  if(!recommended){
    return (<View/>)
  }

  return (
    <SafeAreaView style={Styles.container}> 
      <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground source={require('../../../assets/images/fav_background.png')} resizemode='contain' style={{height:screenHeight*0.7}} >
        <View style={Styles.header_view}>
            <Text style={Styles.header_text}>
                Favorite Route
            </Text>
        </View>
        <View style={Styles.navigation_view}>
          <TotalFavorite favCount={favoriteRoute.length}/>
        </View>
      </ImageBackground>
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
              { 
                  !recommended ? null:
                    favoriteRoute.map((route, index) => (
                        <View key={index} style={Styles.all_favorite_route}>
                            <FavoriteRouteList 
                              route={route} 
                              navigation={props.navigation} 
                              recommended={recommended}/>
                        </View>
                    ))
                }
                <TouchableOpacity onPress={()=>props.navigation.navigate('AddStopNavigator')}>
                  <View style={Styles.add_favorite_route_view}>
                    <Text style={Styles.add_favorite_route_text}>+ Favorite</Text>
                  </View>
                </TouchableOpacity>
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
    borderBottomStartRadius: 20
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  all_favorite_route:{
    paddingVertical: 10,
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
  },
  add_favorite_route_view:{
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingVertical: 30,
    marginVertical: 10,
  },
  add_favorite_route_text: {
    textAlign: 'center',
    fontFamily: 'LINESeedSans_A_Rg',
    fontSize: 15,
    color: 'black'
  }
});

export default FavoriteRoute;
