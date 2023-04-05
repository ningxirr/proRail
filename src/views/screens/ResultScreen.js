"use strict";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Animated, Text, StatusBar } from 'react-native';
import result from '../../../data/results.json';
import HeaderBar from '../../components/headerBar'
import Header from '../../components/Result/header';
import Body from '../../components/Result/body';
import getDataFromAsyncStorage from '../../function/getDataFromAsyncStorage';
import storeDataToAsyncStorage from '../../function/storeDataToAsyncStorage';
import removeDataFromAsyncStorage from '../../function/removeDataFromAsyncStorage';

const Result = (props) => {
    const [selectedPath, setSelectedPath] = useState('');
    const [recommended, setRecommended] = useState([]);
    const [favoriteRoute, setFavoriteRoute] = useState([]);
    const [animationValue] = useState(new Animated.Value(0));
    const [isFavorite, setIsFavorite] = useState(false);
    const [cannotFindPath, setCannotFindPath] = useState(false);

    const [cheapestPath, setCheapestPath] = useState(null);
    const [fastestPath, setFastestPath] = useState(null);
    const [leastInterchangesPath, setLeastInterchangesPath] = useState(null);

    // const stationPath = ['BL37', 'RW06'];
    // const stationPath = ['BL37', 'RW06', 'BL37'];
    console.log('resultPath ==>' + props.route.params.code)
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
      setCannotFindPath(false)
      for (let path of ['fastest', 'cheapest', 'leastInterchanges']){
        let resultPath = [];
        let time = 0;
        let interchange = 0;
        let price = 0;
        for (let index = 0; index < stationPath.length; index++) {
          if(index == stationPath.length-1) break;
          let pathResult = result[stationPath[index].concat('-').concat(stationPath[index+1])];
          if(pathResult === undefined){
            setCannotFindPath(true);
            break;
          } 
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
      const data = await getDataFromAsyncStorage('@recommended');
      const favoriteRouteData = await getDataFromAsyncStorage('@favorite');
      if (favoriteRouteData!==null){
        setFavoriteRoute(favoriteRouteData);
        setIsFavorite(favoriteRouteData.includes(stationPath.join('-')));
      } 
      if (data!==null){
        setRecommended(data);
        setSelectedPath(data[0]);
      }
    };
    fetchData();
  }, [stationPath])

  if(!selectedPath){
    return (<BreakingScreen text={'Loading...'}/>)
  }
  else if(cannotFindPath){
    return (<BreakingScreen text={'ไม่พบเส้นทาง'}/>)
  }
  else {
    return (
      //Ning may be we cannot use that margintop since margintop set that night is not look nice in android
      <SafeAreaView style={{flex: 1 }} >
        <SafeAreaView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%'}}>
        <Animated.View style={[Styles.nav_view, backgroundStyle]}>
              <HeaderBar 
                selectedPath={selectedPath}
                resultPathLength={selectedPath === 'cheapest' ? cheapestPath.resultPath.length : selectedPath === 'fastest' ? fastestPath.resultPath.length : leastInterchangesPath.resultPath.length}
                isFavorite={isFavorite}
                backIconFunction={()=>props.navigation.goBack()}
                starIconFunction={()=>{
                  if(!favoriteRoute.includes(stationPath.join('-'))){
                    let data = favoriteRoute.concat(stationPath.join('-'));
                    removeDataFromAsyncStorage('@favorite');
                    storeDataToAsyncStorage('@favorite', data);
                    setFavoriteRoute(data);
                    setIsFavorite(true);
                  }
                  else{
                    let data = favoriteRoute.filter(e => e !== stationPath.join('-'));
                    removeDataFromAsyncStorage('@favorite');
                    storeDataToAsyncStorage('@favorite', data);
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
                    stationPath={stationPath}
                    setSelectedPath={header => setSelectedPath(header)}
                    favRoute={props.route.params} 
                    navigate={props.navigation}
                    fastestPath={fastestPath}
                    cheapestPath={cheapestPath}
                    leastInterchangesPath={leastInterchangesPath}
                    favoriteRoute={favoriteRoute}/>
            </ScrollView>
        </SafeAreaView>
       
      </SafeAreaView>
    )
  }
};

const BreakingScreen = ({text}) =>{
  return(
    <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
      <Text style={{fontFamily: 'LINESeedSansTHApp-Bold', fontSize: 50}}>{text}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nav_view:{
    zIndex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
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
    fontFamily: 'LINESeedSansApp-Bold',
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
    fontFamily: 'LINESeedSansApp-Regular',
  },
});

export default Result;

