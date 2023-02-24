"use strict";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import result from '../../data/results.json';
import stationInfo from '../../data/station_info.json';
import NavBar from '../components/navBar';
import Header from '../components/Result/header';
import Body from '../components/Result/body';
import { ContinousBaseGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

const storeData = async () => {
  try {
    await AsyncStorage.setItem('@recommended', JSON.stringify(['cheapest', 'fastest', 'leastInterchanges']))
  } catch (e) {
    
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@recommended');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.error('Error getting recommended data:', e);
  }
}
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

const Result = (props) => {
  const [selectedPath, setSelectedPath] = useState('');
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setRecommended(data);
      setSelectedPath(data[0]);
    };
    fetchData();
  }, []);

  if(!selectedPath){
    return (<View></View>)
  }
  else {
    const stationPath = ['BL37', 'RW06'];
    let resultPath = [];
    let time = 0;
    let interchage = 0;
    let price = 0;
    
    for (let index = 0; index < stationPath.length; index++) {
      if(index == stationPath.length-1) break;
      let pathResult = result[stationPath[index].concat('-').concat(stationPath[index+1])];
      resultPath.push(pathResult[selectedPath]);
      time += parseInt(pathResult[selectedPath].time);
      interchage += pathResult[selectedPath].path.length;
      price += pathResult[selectedPath].price.reduce((sum, x) => sum + x, 0);
    }

    return (
      <SafeAreaView style={pageStyles.container}>
        <ScrollView>
          <Header 
            header={props.route.params === undefined ? selectedPath === 'fastest' ? 'Fastest' : selectedPath === 'cheapest' ? 'Cheapest' : 'Least Interchanges' : 'Favorite Route'} 
            startStation={stationPath[0]} 
            stopStation={stationPath[stationPath.length-1]} />
          <Body 
            header = {selectedPath === 'fastest' ? 'Fastest' : selectedPath === 'cheapest' ? 'Cheapest' : 'Least Interchanges'}
            path={selectedPath}
            route={resultPath}
            routes={routes}
            recommended={recommended}
            setSelectedPath={header => setSelectedPath(header)}
            favRoute={props.route.params} 
            navigate={props.navigation}
            time={time}
            interchange={interchage}
            price={price}/>
        </ScrollView>
      </SafeAreaView>
  )
  }
};


const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Result;
