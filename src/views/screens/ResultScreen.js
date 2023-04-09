"use strict";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Animated, Text, ImageBackground } from 'react-native';
import result from '../../../data/results.json';
import HeaderBar from '../../components/headerBar'
import getDataFromAsyncStorage from '../../function/getDataFromAsyncStorage';
import storeDataToAsyncStorage from '../../function/storeDataToAsyncStorage';
import removeDataFromAsyncStorage from '../../function/removeDataFromAsyncStorage';
import CustomButton from '../../components/customButton';
import AllRoute from '../../components/allRoute';
import RecommendedRoute from '../../components/recommendedRoute';
import Choices from '../../components/Choices';
import StartAndEndRoute from '../../components/startAndEndRoute';
import stationInfo from '../../../data/station_info.json';

const Result = (props) => {
    const [selectedPath, setSelectedPath] = useState('');
    const [recommended, setRecommended] = useState([]);
    const [favoriteRoute, setFavoriteRoute] = useState([]);
    const [animationValue] = useState(new Animated.Value(0));
    const [isFavorite, setIsFavorite] = useState(false);
    const [cannotFindPath, setCannotFindPath] = useState(false);
    const [choice, setMoreChoice] = useState(true);
    const [cheapestPath, setCheapestPath] = useState(null);
    const [fastestPath, setFastestPath] = useState(null);
    const [leastInterchangesPath, setLeastInterchangesPath] = useState(null);

    // const stationPath = ['BL37', 'RW06'];
    // const stationPath = ['BL37', 'RW06', 'BL37'];
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
    let routes, time, interchange, price;
    switch (selectedPath) {
      case 'fastest':
        routes = fastestPath.resultPath;
        time = fastestPath.time;
        interchange = fastestPath.interchange;
        price = fastestPath.price;
        break;
      case 'cheapest':
        routes = cheapestPath.resultPath;
        time = cheapestPath.time;
        interchange = cheapestPath.interchange;
        price = cheapestPath.price;
        break;
      case 'leastInterchanges':
        routes = leastInterchangesPath.resultPath;
        time = leastInterchangesPath.time;
        interchange = leastInterchangesPath.interchange;
        price = leastInterchangesPath.price;
        break;
      default: break;
    }
    return (
      //Ning may be we cannot use that margintop since margintop set that night is not look nice in android
      <SafeAreaView style={{flex: 1 }} >
        <SafeAreaView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%'}}>
        <Animated.View style={[Styles.nav_view, backgroundStyle]}>
              <HeaderBar 
                selectedPath={selectedPath}
                resultPathLength={selectedPath === 'cheapest' ? cheapestPath.resultPath.length : selectedPath === 'fastest' ? fastestPath.resultPath.length : leastInterchangesPath.resultPath.length}
                isFavorite={isFavorite}
                backIconFunction={()=>{
                  props.route.params.previousScreen !== undefined ?
                  props.navigation.navigate(props.route.params.previousScreen) :
                  props.navigation.goBack()
                }}
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
                onScroll={Animated.event([{ nativeEvent : { contentOffset: { y : animationValue } }}],{ useNativeDriver: false } )}
                showsVerticalScrollIndicator={false} bounces={false}>
                <View>
                  <ImageBackground source={require('../../../assets/images/background.png')} style={{height:330}}> 
                      <View style = {HeaderStyles.header_view}>
                        <View style = {HeaderStyles.header_body_view}>
                          <View style = {HeaderStyles.main_header_view}>
                          </View>
                          <View style = {HeaderStyles.start_and_end_route_view}>
                            <StartAndEndRoute stationName = {stationInfo[stationPath[0]].station_name.en} stationPlatform = {stationInfo[stationPath[0]].platform.platform} stationColor = {stationInfo[stationPath[0]].platform.color.path_color} stationPlatformLine={stationInfo[stationPath[0]].platform_line}/>
                            <Text style = {{color:'white', fontSize: 15, fontFamily: 'LINESeedSansApp-Regular'}}>
                              to
                            </Text>
                            <StartAndEndRoute stationName = {stationInfo[stationPath[stationPath.length-1]].station_name.en} stationPlatform = {stationInfo[stationPath[stationPath.length-1]].platform.platform} stationColor = {stationInfo[stationPath[stationPath.length-1]].platform.color.path_color} stationPlatformLine={stationInfo[stationPath[stationPath.length-1]].platform_line}/>
                          </View>
                        </View>
                      </View>
                  </ImageBackground>
                </View>

                <View style ={[{ marginTop: -60 }, BodyStyles.recommended_route_with_summary_view]}>
                  <RecommendedRoute 
                    time={time}
                    interchange={interchange}
                    price={price}/>
                </View>

                <View>
                  <View style = {BodyStyles.select_choice_view}>
                    <CustomButton   
                      text={'Recommended'}
                      backgroundColor={choice? 'black': 'white'} 
                      borderColor={choice? 'white': 'black'} 
                      textColor={choice? 'white': 'black'} 
                      width = {'49%'}
                      function={()=> {
                        setSelectedPath(recommended[0])
                        setMoreChoice(true)
                      }}/>
                    <CustomButton  
                      text={'More Choices'} 
                      backgroundColor={choice? 'white': 'black'} 
                      borderColor={choice? 'black': 'white'} 
                      textColor={choice? 'black': 'white'} 
                      width = {'49%'}
                      function={()=> {
                        setSelectedPath(recommended[1])
                        setMoreChoice(false)
                      }}/>
                  </View>

                  {/* MoreChoice */}
                  {
                    choice? null:
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={BodyStyles.more_choice_scroll_view}>
                        <View style={BodyStyles.choice_view}>
                          <Choices 
                            number={recommended[1] === 'fastest' ? fastestPath.time : recommended[1] === 'cheapest' ? cheapestPath.price : leastInterchangesPath.interchange} 
                            unit={recommended[1] === 'fastest' ? 'min(s)' : recommended[1] === 'cheapest' ? 'baht' : 'station(s)'} 
                            choice={recommended[1] === 'fastest' ? 'Fastest' : recommended[1] === 'cheapest' ? 'Cheapest' : 'Least\nInterchanges' } 
                            selected={selectedPath===recommended[1]} 
                            function={()=> {
                                setSelectedPath(recommended[1])
                              }}/>
                        </View>
                        <View style={BodyStyles.choice_view}>
                          <Choices 
                            number={recommended[2] === 'fastest' ? fastestPath.time : recommended[2] === 'cheapest' ? cheapestPath.price : leastInterchangesPath.interchange} 
                            unit={recommended[2] === 'fastest' ? 'min(s)' : recommended[2] === 'cheapest' ? 'baht' : 'station(s)'} 
                            choice={recommended[2] === 'fastest' ? 'Fastest' : recommended[2] === 'cheapest' ? 'Cheapest' : 'Least\nInterchanges' } 
                            selected={selectedPath===recommended[2]} 
                            function={()=> {
                                setSelectedPath(recommended[2])
                              }}/>
                        </View>
                      </ScrollView>
                  }
                </View> 
                <AllRoute routes={routes}/>
            </ScrollView>
            <View style = {Styles.button_view}>
                <CustomButton 
                    text={'Start Navigate'} 
                    backgroundColor={'black'} 
                    borderColor={'black'} 
                    textColor={'white'} 
                    width = {'100%'}
                    height = {45}
                    function={()=>{
                      props.navigation.navigate('NavigateScreen', {
                        routes: routes, 
                        stationPath: stationPath,
                        initailScreen: props.route.params.initailScreen
                      })
                    }}/>
            </View>
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
  button_view:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#eeeeee'
  }
});

const HeaderStyles = StyleSheet.create({
  header_view: {
    marginTop: 70
  },
  header_body_view:{
    paddingHorizontal: 10
  },
  main_header_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  start_and_end_route_view: {
    marginTop: 40,
    paddingVertical: 50,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }
});

const BodyStyles = StyleSheet.create({
  overall_component_view: {
    marginHorizontal : 25,
    marginBottom: 20
  },
  more_choice_scroll_view:{
    marginHorizontal : 25,
  },
  choice_view:{
    marginRight: 10,
    marginVertical: 5
  },
  select_choice_view: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recommended_route_with_summary_view:{
    marginHorizontal : 25,
    alignContent: 'center',
  },
  body_view: {
    paddingVertical: 10
  },
});

export default Result;

