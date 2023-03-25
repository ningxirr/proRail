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

    const [cheapestPath, setCheapestPath] = useState(null);
    const [fastestPath, setFastestPath] = useState(null);
    const [leastInterchangesPath, setLeastInterchangesPath] = useState(null);

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
    for (let path of ['fastest', 'cheapest', 'leastInterchanges']){
      let resultPath = [];
      let time = 0;
      let interchange = 0;
      let price = 0;
      for (let index = 0; index < stationPath.length; index++) {
        if(index == stationPath.length-1) break;
        let pathResult = result[stationPath[index].concat('-').concat(stationPath[index+1])];
        if(pathResult === undefined) return (<BreakingScreen text={'ไม่พบเส้นทาง'}/>)
        resultPath.push(pathResult[path]);
        time += parseInt(Math.ceil(pathResult[path].time));
        interchange += pathResult[path].path.length-1;
        price += pathResult[path].price.reduce((sum, x) => sum + x, 0);
      }
      switch (path){
        case 'fastest':
          setFastestPath({
            resultPath : resultPath,
            time : Math.ceil(time),
            interchange : interchange, //+stationPath.length-2 if stop is interchange
            price : Math.ceil(price)
          });
          break;
        case 'cheapest':
          setCheapestPath({
            resultPath : resultPath,
            time : Math.ceil(time),
            interchange : interchange,
            price : Math.ceil(price)
          });
          break;
        case 'leastInterchanges':
          setLeastInterchangesPath({
            resultPath : resultPath,
            time : Math.ceil(time),
            interchange : interchange, 
            price : Math.ceil(price)
          });
          break;
        default: break;
      }
    }
  }, [stationPath])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromAsyncStorage('@recommended');
      const favoriteRouteData = await getDataFromAsyncStorage('@favorite');
      const favoriteRoutePriceData = await getDataFromAsyncStorage('@favoriteRoutePrice');
      setFavoriteRoute(favoriteRouteData);
      setRecommended(data);
      setFavoriteRoutePrice(favoriteRoutePriceData);
      setSelectedPath(data[0]);
      setIsFavorite(favoriteRouteData.includes(stationPath.join('-')));
    };
    fetchData();
  }, []);

  if(!selectedPath){
    // removeDataFromAsyncStorage('@recommended');
    // removeDataFromAsyncStorage('@favorite');
    // storeDataToAsyncStorage('@recommended', ['cheapest', 'fastest', 'leastInterchanges']);
    // storeDataToAsyncStorage('@favorite', ['RW06,BL37']);
    // storeDataToAsyncStorage('@favorite', ['BL37-RW06']);
    // storeDataToAsyncStorage('@favoriteRoutePrice', [75]);
    return (<BreakingScreen text={'กำลังโหลด'}/>)
  }
  else {
    return (
        <SafeAreaView style={Styles.container}>
            <Animated.View style={[Styles.nav_view, backgroundStyle]}>
                <HeaderBar 
                    selectedPath={selectedPath}
                    resultPathLength={selectedPath === 'cheapest' ? cheapestPath.resultPath.length : selectedPath === 'fastest' ? fastestPath.resultPath.length : leastInterchangesPath.resultPath.length}
                    isFavorite={isFavorite}
                    backIconFunction={()=>props.navigation.goBack()}
                    starIconFunction={()=>{
                      if(!favoriteRoute.includes(stationPath.join('-'))){
                        let data = favoriteRoute.concat(stationPath.join('-'));
                        let priceData = favoriteRoutePrice.concat(recommended[0] === 'cheapest' ? cheapestPath.price : recommended[0] === 'fastest' ? fastestPath.price : leastInterchangesPath.price);
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
                    startStation={stationPath[0]} 
                    stopStation={stationPath[stationPath.length-1]} />
                <Body 
                    selectedPath={selectedPath}
                    recommended={recommended}
                    setSelectedPath={header => setSelectedPath(header)}
                    favRoute={props.route.params} 
                    navigate={props.navigation}
                    fastestPath={fastestPath}
                    cheapestPath={cheapestPath}
                    leastInterchangesPath={leastInterchangesPath}
                    favoriteRoute={favoriteRoute}/>
            </ScrollView>
        </SafeAreaView>
    )
  }
};

const BreakingScreen = ({text}) =>{
  return(
    <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
      <Text style={{fontFamily: 'LINESeedSansTH_A_Bd', fontSize: 50}}>{text}</Text>
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

