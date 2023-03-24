"use strict";
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AllRoute from '../allRoute';
import RecommendedRoute from '../recommendedRoute';
import Choices from '../Choices';
import CustomButton from '../customButton';

let routes = [
  {
      "fastest":{
          "time": 18,
          "interchange": 1,
          "price": 24,
          "route":[
              {
                  "path": "Green",
                  "walk": null,
                  "price": 24,
                  "station": {
                      "en": ['Kasetsart University(F)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
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
      },
      "chepest":{
          "time": 18,
          "interchange": 1,
          "price": 25,
          "route": [
              {
                  "path": "Green",
                  "walk": null,
                  "time": 18,
                  "interchange": 1,
                  "price": 24,
                  "station": {
                      "en": ['Kasetsart University(C)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
                      "th": ['มหาวิทยาลัยเกษตรศาสตร์', 'สนามนิคม', 'ราชโยธิน', 'พหลโยธิน']
                  }
              },
              {
                  "path": "Blue",
                  "walk": 4,
                  "station": {
                      "en": ['Phahonyothin', 'Ratchadaphisek', 'Sutthisan', 'Huai Kwang'],
                      "th": ['พหลโยธิน', 'ราชดำเนิน', 'สุทธิสาร', 'ห้วยขวาง']
                  }
              }  
          ]
      },
      "leastInterchanges": {
          "time": 18,
          "interchange": 1,
          "price": 24,
          "route":[
              {
                  "path": "Green",
                  "walk": null,
                  "station": {
                      "en": ['Kasetsart University(L)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
                      "th": ['มหาวิทยาลัยเกษตรศาสตร์', 'สนามนิคม', 'ราชโยธิน', 'พหลโยธิน']
                  }
              },
              {
                  "path": "Blue",
                  "walk": 4,
                  "station": {
                      "en": ['Phahonyothin', 'Ratchadaphisek', 'Sutthisan', 'Huai Kwang'],
                      "th": ['พหลโยธิน', 'ราชดำเนิน', 'สุทธิสาร', 'ห้วยขวาง']
                  }
              }  
          ]
      }
  },
  {
      "fastest":{
          "time": 18,
          "interchange": 1,
          "price": 24,
          "route":[
              {
                  "path": "Green",
                  "walk": null,
                  "price": 24,
                  "station": {
                      "en": ['Kasetsart University(F)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
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
      },
      "chepest":{
          "time": 18,
          "interchange": 1,
          "price": 24,
          "route": [
              {
                  "path": "Green",
                  "walk": null,
                  "time": 18,
                  "interchange": 1,
                  "price": 24,
                  "station": {
                      "en": ['Kasetsart University(C)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
                      "th": ['มหาวิทยาลัยเกษตรศาสตร์', 'สนามนิคม', 'ราชโยธิน', 'พหลโยธิน']
                  }
              },
              {
                  "path": "Blue",
                  "walk": 4,
                  "station": {
                      "en": ['Phahonyothin', 'Ratchadaphisek', 'Sutthisan', 'Huai Kwang'],
                      "th": ['พหลโยธิน', 'ราชดำเนิน', 'สุทธิสาร', 'ห้วยขวาง']
                  }
              }  
          ]
      },
      "leastInterchanges": {
          "time": 18,
          "interchange": 1,
          "price": 24,
          "route":[
              {
                  "path": "Green",
                  "walk": null,
                  "station": {
                      "en": ['Kasetsart University(L)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
                      "th": ['มหาวิทยาลัยเกษตรศาสตร์', 'สนามนิคม', 'ราชโยธิน', 'พหลโยธิน']
                  }
              },
              {
                  "path": "Blue",
                  "walk": 4,
                  "station": {
                      "en": ['Phahonyothin', 'Ratchadaphisek', 'Sutthisan', 'Huai Kwang'],
                      "th": ['พหลโยธิน', 'ราชดำเนิน', 'สุทธิสาร', 'ห้วยขวาง']
                  }
              }  
          ]
      }
  }
]

const Body = (props) => {
  const [choice, setMoreChoice] = useState(true);
    return(
      <View> 
        {/* RecommendedRoute */}
        <View style ={[{ marginTop: -60 }, Styles.recommended_route_with_summary_view]}>
          <RecommendedRoute 
            time={props.time}
            interchange={props.interchange}
            price={props.price}/>
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
                    number={props.time} 
                    unit={props.recommended[1] === 'fastest' ? 'min(s)' : props.recommended[1] === 'cheapest' ? 'baht' : 'station(s)'} 
                    choice={props.recommended[1] === 'fastest' ? 'Fastest' : props.recommended[1] === 'cheapest' ? 'Cheapest' : 'Least Interchanges' } 
                    selected={props.path===props.recommended[1]} 
                    function={()=> {
                        props.setSelectedPath(props.recommended[1])
                      }}/>
                </View>
                <View style={Styles.choice_view}>
                  <Choices 
                    number={props.interchange} 
                    unit={props.recommended[2] === 'fastest' ? 'min(s)' : props.recommended[1] === 'cheapest' ? 'baht' : 'station(s)'} 
                    choice={props.recommended[2] === 'fastest' ? 'Fastest' : props.recommended[2] === 'cheapest' ? 'Cheapest' : 'Least Interchanges' } 
                    selected={props.path===props.recommended[2]} 
                    function={()=> {
                        props.setSelectedPath(props.recommended[2])
                      }}/>
                </View>
              </ScrollView>
          }
        </View> 

        <AllRoute routes={props.routes}/>
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
                          routes: props.routes 
                      })
                      console.log('Confirm');
                  }}/>
          </View>
        </View>
      </View>
    ); 
};

const Styles = StyleSheet.create({
  overall_component_view: {
    marginHorizontal : 25,
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