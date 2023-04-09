"use strict";

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View,  Dimensions, ImageBackground, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TotalFavorite from '../../components/totalFavorite';
import FavoriteRouteList from '../../components/favoriteRouteList';
import getDataFromAsyncStorage from '../../function/getDataFromAsyncStorage';
import Header from '../../components/header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const screenHeight = Dimensions.get('window').height;

const FavoriteRoute = (props) => {
  const [favoriteRoute, setFavaoriteRoute] = useState([]);
  const [recommended, setRecommended] = useState('');
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "65%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
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
        <Header title="Favorite Route"/>
        <View style={Styles.navigation_view}>
          <TotalFavorite favCount={favoriteRoute.length}/>
        </View>
      </ImageBackground>
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
              <FontAwesome name="chevron-up" size={25} color="white" onPress={()=>handleSnapPress(0)}/>
            </View>
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
                  !recommended || favoriteRoute.length === 0 ? 
                    <View style={{alignItems: 'center', padding: 50}}>
                      <Text style={{color: '#cfcfcf', fontSize: 18, fontFamily: 'LINESeedSansApp-Regular',}}>No favoite route </Text>
                    </View>
                  :
                    favoriteRoute.map((route, index) => (
                        <View key={index} style={Styles.all_favorite_route}>
                            <FavoriteRouteList 
                              favoriteRoute={favoriteRoute}
                              setFavaoriteRoute={setFavaoriteRoute}
                              route={route} 
                              navigation={props.navigation} 
                              recommended={recommended}/>
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
    backgroundColor: 'black'
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
    marginTop: -20
  },
  header_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSansApp-Bold',
  },
  content_bottom_sheet_scroll_view: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  all_favorite_route:{
    paddingVertical: 5,
  },
  bottom_sheet: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
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
    fontFamily: 'LINESeedSansApp-Regular',
    fontSize: 15,
    color: 'black'
  }
});

export default FavoriteRoute;
