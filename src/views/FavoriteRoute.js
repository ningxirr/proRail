"use strict";

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View,  Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TotalFavorite from '../components/totalFavorite';
import FavoriteRouteList from '../components/favoriteRouteList';
import stationInfo from '../../data/station_info.json';
import getDataFromAsyncStorage from '../function/getDataFromAsyncStorage';
import storeDataToAsyncStorage from '../function/storeDataToAsyncStorage';
import removeDataFromAsyncStorage from '../function/removeDataFromAsyncStorage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const favoriteRoute = [
  [
    {
      "time": 18,
      "interchange": 1,
      "price": 24,
      "route": [
          {
              "path": "Green",
              "walk": null,
              "price": 24,
              "station": {
                  "en": ['Kasetsart University(Fav)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
                  "th": ['มหาวิทยาลัยเกษตรศาสตร์', 'สนามนิคม', 'ราชโยธิน', 'พหลโยธิน']
              }
          },
          {
              "path": "Blue",
              "walk": 4,
              "price": 0,
              "station": {
                  "en": ['Phahonyothin', 'Ratchadaphisek', 'Sutthisan', 'Huai Kwang'],
                  "th": ['พหลโยธิน', 'ราชดำเนิน', 'สุทธิสาร', 'ห้วยขวาง']
              }
          }  
      ]
    }
  ],
  [
    {
      "time": 18,
      "interchange": 1,
      "price": 24,
      "route": [
          {
              "path": "Blue",
              "walk": null,
              "price": 0,
              "station": {
                  "en": ['Huai Kwang', 'Sutthisan', 'Ratchadaphisek', 'Phahonyothin'],
                  "th": ['ห้วยขวาง', 'สุทธิสาร', 'ราชดำเนิน', 'พหลโยธิน']
              }
          },
          {
              "path": "Green",
              "walk": 4,
              "price": 24,
              "station": {
                  "en": ['Phahonyothin', 'Ratchayothin', 'Sena Nikhom', 'Kasetsart University(Fav)'],
                  "th": ['พหลโยธิน', 'ราชโยธิน', 'สนามนิคม', 'มหาวิทยาลัยเกษตรศาสตร์']
              }
          }  
      ]
    }
  ] 
]

const storeData = async () => {
  try {
    await AsyncStorage.setItem('@favorite', JSON.stringify([['RW06', 'BL37']]))
  } catch (e) {
    
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@favorite');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.error('Error getting recommended data:', e);
  }
}

const getRecommendedData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@recommended');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.error('Error getting recommended data:', e);
  }
}

const FavoriteRoute = (props) => {
  const [favoriteRoute, setFavaoriteRoute] = useState([]);
  const [recommended, setRecommended] = useState('');
  const [favoriteRoutePrice, setFavoriteRoutePrice] = useState([]);
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["40%", "100%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const favoriteRouteData = await getDataFromAsyncStorage('@favorite');
      const favoriteRoutePriceData = await getDataFromAsyncStorage('@favoriteRoutePrice');
      const recommendedData = await getDataFromAsyncStorage('@recommended')
      setFavoriteRoutePrice(favoriteRoutePriceData);
      setFavaoriteRoute(favoriteRouteData);
      setRecommended(recommendedData[0]);
    };
    fetchData();
  }, []);

  if(!recommended){
    return (<View/>)
  }

  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground source={require('../../assets/images/fav_background.png')} resizemode='contain' style={{height:screenHeight*0.7}} >
        <View style={Styles.header_view}>
            <Text style={Styles.header_text}>
                Favorite Route
            </Text>
        </View>
        <View style={Styles.navigation_view}>
          <TotalFavorite favCount={1}/>
        </View>
      </ImageBackground>
      <Text style={{textAlign:'center', fontFamily: 'LINESeedSans_A_Bd', marginTop: '2%'}}>IG: new_norawich</Text>
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
              { 
                  !recommended ? null:
                    favoriteRoute.map((route, index) => (
                        <View key={index} style={Styles.all_favorite_route}>
                            <FavoriteRouteList 
                              route={route} 
                              navigation={props.navigation} 
                              recommended={recommended}
                              favoriteRoutePrice={favoriteRoutePrice[index]}/>
                        </View>
                    ))
                }
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
    borderBottomStartRadius: 20
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
    paddingVertical: screenHeight*0.03,
    paddingHorizontal: screenWidth*0.05,
  },
  all_favorite_route:{
    paddingVertical: screenHeight*0.008,
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
  add_favorite_route_text: {
    textAlign: 'center',
  }
});



export default FavoriteRoute;
