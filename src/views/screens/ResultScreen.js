"use strict";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Animated, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import result from '../../../data/results.json';
import HeaderBar from '../../components/headerBar'
import Header from '../../components/Result/header';
import Body from '../../components/Result/body';
import getDataFromAsyncStorage from '../../function/getDataFromAsyncStorage';
import storeDataToAsyncStorage from '../../function/storeDataToAsyncStorage';
import removeDataFromAsyncStorage from '../../function/removeDataFromAsyncStorage';

// const storeData = async () => {
//   try {
//     await AsyncStorage.setItem('@recommended', JSON.stringify(['cheapest', 'fastest', 'leastInterchanges']))
//     console.log('storeData')
//   } catch (e) {
    
//   }
// }
        
// const storeFavoriteRouteData = async (data) => {
//   try {
//     await AsyncStorage.setItem('@favorite', JSON.stringify(data))
//   } catch (e) {
    
//   }
// }

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@recommended');
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//     console.error('Error getting recommended data:', e);
//   }
// }

// const getFavoriteRouteData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('@favorite');
//       // console.log(jsonValue)
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch(e) {
//       console.error('Error getting recommended data:', e);
//     }
//   }

// const removeValue = async () => {
//     try {
//       await AsyncStorage.removeItem('@favorite')
//     } catch(e) {
//       // remove error
//     }
  
//     console.log('Done.')
//   }

const Result = (props) => {
    const [selectedPath, setSelectedPath] = useState('');
    const [recommended, setRecommended] = useState([]);
    const [favoriteRoute, setFavoriteRoute] = useState([]);
    const [animationValue] = useState(new Animated.Value(0));
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteRoutePrice, setFavoriteRoutePrice] = useState([]);
    // const stationPath = ['BL37', 'RW06'];
    // const stationPath = ['BL37', 'RW06', 'BL37'];
    console.log(props.route.params.code)
    // const stationPath = ['S3','E11']
  let stationPath = props.route.params.code

  const backgroundInterpolate = animationValue.interpolate({
    inputRange : [0, 100],
    outputRange : ["rgba(0, 0, 0, 0)" , "rgba(0, 0, 0, 1)"]
  })

  const backgroundStyle = {
    backgroundColor : backgroundInterpolate
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromAsyncStorage('@recommended');
      const favoriteRouteData = await getDataFromAsyncStorage('@favorite');
      const favoriteRoutePriceData = await getDataFromAsyncStorage('@favoriteRoutePrice');
      setFavoriteRoute(favoriteRouteData);
      setRecommended(data);
      setFavoriteRoutePrice(favoriteRoutePriceData);
      setSelectedPath(data[0]);
    };
    fetchData();
    console.log("data: "+favoriteRoute)
  }, []);

  if(!selectedPath){
    removeDataFromAsyncStorage('@recommended');
    removeDataFromAsyncStorage('@favorite');
    storeDataToAsyncStorage('@recommended', ['cheapest', 'fastest', 'leastInterchanges']);
    // storeDataToAsyncStorage('@favorite', ['RW06,BL37']);
    storeDataToAsyncStorage('@favorite', ['BL37-RW06']);
    storeDataToAsyncStorage('@favoriteRoutePrice', [75]);
    return (<View></View>)
  }
  else {
    let resultPath = [];
    let time = 0;
    let interchage = 0;
    let price = 0;
    for (let index = 0; index < stationPath.length; index++) {
      if(index == stationPath.length-1) break;
      let pathResult = result[stationPath[index].concat('-').concat(stationPath[index+1])];
      if(pathResult === undefined) return (<RouteNotFound/>)
      resultPath.push(pathResult[selectedPath]);
      time += parseInt(pathResult[selectedPath].time);
      interchage += pathResult[selectedPath].path.length;
      price += pathResult[selectedPath].price.reduce((sum, x) => sum + x, 0);
    }
    return (
        <SafeAreaView style={Styles.container}>
            <Animated.View style={[Styles.nav_view, backgroundStyle]}>
                <HeaderBar 
                    selectedPath={selectedPath}
                    resultPathLength={resultPath.length}
                    isFavorite={isFavorite}
                    backIconFunction={()=>props.navigation.goBack()}
                    starIconFunction={()=>{
                      if(!favoriteRoute.includes(stationPath.join('-'))){
                        let data = favoriteRoute.concat(stationPath.join('-'));
                        let priceData = favoriteRoutePrice.concat(price);
                        removeDataFromAsyncStorage('@favorite');
                        storeDataToAsyncStorage('@favorite', data);
                        removeDataFromAsyncStorage('@favoriteRoutePrice');
                        storeDataToAsyncStorage('@favoriteRoutePrice', priceData);
                        setFavoriteRoute(data);
                        setIsFavorite(true);
                      }
                      else{
                        let data = favoriteRoute.filter(e => e !== stationPath.join('-'));
                        let priceData = favoriteRoutePrice.filter(e => e !== price);
                        removeDataFromAsyncStorage('@favorite');
                        storeDataToAsyncStorage('@favorite', data);
                        removeDataFromAsyncStorage('@favoriteRoutePrice');
                        storeDataToAsyncStorage('@favoriteRoutePrice', priceData);
                        setFavoriteRoute(data);
                        setIsFavorite(false);
                      }
                    }}/>
            </Animated.View>
            <ScrollView 
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent : { contentOffset: { y : animationValue } }}],{ useNativeDriver: false } )}>
                <Header 
                    stop={resultPath.length}
                    startStation={stationPath[0]} 
                    stopStation={stationPath[stationPath.length-1]} />
                <Body 
                    header = {selectedPath === 'fastest' ? 'Fastest' : selectedPath === 'cheapest' ? 'Cheapest' : 'Least Interchanges'}
                    path={selectedPath}
                    routes={resultPath}
                    recommended={recommended}
                    setSelectedPath={header => setSelectedPath(header)}
                    favRoute={props.route.params} 
                    navigate={props.navigation}
                    time={time}
                    interchange={interchage}
                    price={price}
                    favoriteRoute={favoriteRoute}/>
            </ScrollView>
        </SafeAreaView>
  )
  }
};

const RouteNotFound = () =>{
  return(
    <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
      <Text style={{fontFamily: 'LINESeedSansTH_A_Bd', fontSize: 50}}>ไม่พบเส้นทาง</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nav_view:{
    zIndex:1,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20
  },
  header_navbar_view:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  header_bar_view:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_bar_text:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'LINESeedSans_A_Bd',
  },
  stop_view: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: '#ffff',
    borderWidth: 1,
    borderRadius:15,
  },
  stop_text:{
    color:'white', 
    fontSize: 15, 
    textAlign:'center',
    fontFamily: 'LINESeedSans_A_Rg',
  },
});

export default Result;

