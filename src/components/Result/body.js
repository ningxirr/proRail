"use strict";
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AllRoute from '../allRoute';
import RecommendedRoute from '../recommendedRoute';
import Choices from '../Choices';
import CustomButton from '../customButton';

const Body = (props) => {
  let routes, time, interchange, price;
  switch (props.selectedPath) {
    case 'fastest':
      routes = props.fastestPath.resultPath;
      time = props.fastestPath.time;
      interchange = props.fastestPath.interchange;
      price = props.fastestPath.price;
      break;
    case 'cheapest':
      routes = props.cheapestPath.resultPath;
      time = props.cheapestPath.time;
      interchange = props.cheapestPath.interchange;
      price = props.cheapestPath.price;
      break;
    case 'leastInterchanges':
      routes = props.leastInterchangesPath.resultPath;
      time = props.leastInterchangesPath.time;
      interchange = props.leastInterchangesPath.interchange;
      price = props.leastInterchangesPath.price;
      break;
    default: break;
  }
  const [choice, setMoreChoice] = useState(true);
    return(
      <View> 
        {/* RecommendedRoute */}
        <View style ={[{ marginTop: -60 }, Styles.recommended_route_with_summary_view]}>
          <RecommendedRoute 
            time={time}
            interchange={interchange}
            price={price}/>
        </View>

        <View>
          <View style = {Styles.select_choice_view}>
            <CustomButton   
              text={'Recommended'}
              backgroundColor={choice? 'black': 'white'} 
              borderColor={choice? 'white': 'black'} 
              textColor={choice? 'white': 'black'} 
              width = {'49%'}
              function={()=> {
                props.setSelectedPath(props.recommended[0])
                setMoreChoice(true)
              }}/>
            <CustomButton  
              text={'More Choices'} 
              backgroundColor={choice? 'white': 'black'} 
              borderColor={choice? 'black': 'white'} 
              textColor={choice? 'black': 'white'} 
              width = {'49%'}
              function={()=> {
                props.setSelectedPath(props.recommended[1])
                setMoreChoice(false)
              }}/>
          </View>

          {/* MoreChoice */}
          {
            choice? null:
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={Styles.more_choice_scroll_view}>
                <View style={Styles.choice_view}>
                  <Choices 
                    number={props.recommended[1] === 'fastest' ? props.fastestPath.time : props.recommended[1] === 'cheapest' ? props.cheapestPath.price : props.leastInterchangesPath.interchange} 
                    unit={props.recommended[1] === 'fastest' ? 'min(s)' : props.recommended[1] === 'cheapest' ? 'baht' : 'station(s)'} 
                    choice={props.recommended[1] === 'fastest' ? 'Fastest' : props.recommended[1] === 'cheapest' ? 'Cheapest' : 'Least Interchanges' } 
                    selected={props.selectedPath===props.recommended[1]} 
                    function={()=> {
                        props.setSelectedPath(props.recommended[1])
                      }}/>
                </View>
                <View style={Styles.choice_view}>
                  <Choices 
                    number={props.recommended[2] === 'fastest' ? props.fastestPath.time : props.recommended[2] === 'cheapest' ? props.cheapestPath.price : props.leastInterchangesPath.interchange} 
                    unit={props.recommended[2] === 'fastest' ? 'min(s)' : props.recommended[1] === 'cheapest' ? 'baht' : 'station(s)'} 
                    choice={props.recommended[2] === 'fastest' ? 'Fastest' : props.recommended[2] === 'cheapest' ? 'Cheapest' : 'Least Interchanges' } 
                    selected={props.selectedPath===props.recommended[2]} 
                    function={()=> {
                        props.setSelectedPath(props.recommended[2])
                      }}/>
                </View>
              </ScrollView>
          }
        </View> 

        <AllRoute routes={routes}/>
        <View style = {Styles.overall_component_view}>
          <View style = {Styles.body_view}>
              <CustomButton 
                  text={'Confirm'} 
                  backgroundColor={'black'} 
                  borderColor={'black'} 
                  textColor={'white'} 
                  width = {'100%'}
                  function={()=>{
                      props.navigate.navigate('NavigateScreen', {
                          routes: routes, 
                          stationPath: props.stationPath,
                      })
                  }}/>
          </View>
        </View>
      </View>
    ); 
};

const Styles = StyleSheet.create({
  overall_component_view: {
    marginHorizontal : 25
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

export default Body;