"use strict";
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BrieflyRoute from './brieflyRoute';
import Walking from './walking';
import FullRoute from './fullRoute';
import CustomButton from '../../customButton';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
let routes = [
    {
        "fastest":[
            {
                "path": "Green",
                "walk": null,
                "station": {
                    "en": ['Kasetsart University(F)', 'Sena Nikhom', 'Ratchayothin', 'Phahonyothin'],
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
        ],
        "chepest":[
            {
                "path": "Green",
                "walk": null,
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
        ],
        "leastInterchanges":[
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
]

const Route = (props) => {
    const [briefly, setBriefly] = useState(true);
    return( 
            <View style = {Styles.overall_component_view}>
                {
                    briefly ?
                    routes.map((route, index) => (
                        <View key={index}>
                            {
                                props.path === 'Fastest' ?
                                route.fastest.map((item, index) => (
                                    <BrieflyRoute 
                                        key={index}
                                        stop={false} 
                                        walk={item.walk}
                                        path={item.path} 
                                        start_station_en={item.station.en[0]} 
                                        start_station_th={item.station.th[0]} 
                                        stop_station_en={item.station.en[item.station.en.length-1]}
                                        stop_station_th={item.station.th[item.station.th.length-1]}/>
                                )):
                                props.path === 'Cheapest' ?
                                route.chepest.map((item, index) => (
                                    <BrieflyRoute 
                                        key={index}
                                        stop={false} 
                                        walk={item.walk}
                                        path={item.path} 
                                        start_station_en={item.station.en[0]} 
                                        start_station_th={item.station.th[0]} 
                                        stop_station_en={item.station.en[item.station.en.length-1]}
                                        stop_station_th={item.station.th[item.station.th.length-1]}/>
                                )):
                                route.leastInterchanges.map((item, index) => (
                                    <BrieflyRoute 
                                        key={index}
                                        stop={false} 
                                        walk={item.walk}
                                        path={item.path} 
                                        start_station_en={item.station.en[0]} 
                                        start_station_th={item.station.th[0]} 
                                        stop_station_en={item.station.en[item.station.en.length-1]}
                                        stop_station_th={item.station.th[item.station.th.length-1]}/>
                                ))
                            }
                        </View>  
                    )):
                    routes.map((route) => (
                        props.path === 'Fastest' ?
                        route.fastest.map((item, index) => (
                            <FullRoute 
                                key={index}
                                item={item.walk}
                                path={item.path} 
                                walk={item.walk}
                                route_en={item.station.en} 
                                route_th={item.station.th}/>
                        )):
                        props.path === 'Cheapest' ?
                        route.chepest.map((item, index) => (
                            <FullRoute 
                                key={index}
                                item={item.walk}
                                path={item.path} 
                                walk={item.walk}
                                route_en={item.station.en} 
                                route_th={item.station.th}/>
                        )):
                        route.leastInterchanges.map((item, index) => (
                            <FullRoute 
                                key={index}
                                item={item.walk}
                                path={item.path} 
                                walk={item.walk}
                                route_en={item.station.en} 
                                route_th={item.station.th}/>
                        ))
                    ))
                } 
            </View>
    );
}

const Styles = StyleSheet.create({
    overall_component_view: {
        marginHorizontal :screenHeight*0.025,
    },
    path_with_icon_view: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: screenHeight*0.01,
        marginVertical: screenHeight*0.005,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Route;