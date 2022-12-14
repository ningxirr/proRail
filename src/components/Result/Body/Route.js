"use strict";
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
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
        <View>
            <View style = {Styles.overall_component_view}>
                {
                    briefly ?
                    routes.map((route, index) => (
                        <View key={index}>
                            {
                                props.path === 'Fastest' ?
                                route.fastest.map((item, index) => (
                                    <View key={index}>
                                        <BrieflyRoute 
                                            stop={false} 
                                            path={item.path} 
                                            start_station_en={item.station.en[0]} 
                                            start_station_th={item.station.th[0]} 
                                            stop_station_en={item.station.en[item.station.en.length-1]}
                                            stop_station_th={item.station.th[item.station.th.length-1]}/>
                                    </View>
                                )):
                                props.path === 'Cheapest' ?
                                route.chepest.map((item, index) => (
                                    <View key={index}>
                                        <BrieflyRoute 
                                            stop={false} 
                                            path={item.path} 
                                            start_station_en={item.station.en[0]} 
                                            start_station_th={item.station.th[0]} 
                                            stop_station_en={item.station.en[item.station.en.length-1]}
                                            stop_station_th={item.station.th[item.station.th.length-1]}/>
                                    </View>
                                )):
                                route.leastInterchanges.map((item, index) => (
                                    <View key={index}>
                                        <BrieflyRoute 
                                            stop={false} 
                                            path={item.path} 
                                            start_station_en={item.station.en[0]} 
                                            start_station_th={item.station.th[0]} 
                                            stop_station_en={item.station.en[item.station.en.length-1]}
                                            stop_station_th={item.station.th[item.station.th.length-1]}/>
                                    </View>
                                ))
                            }
                        </View>  
                    )):
                    routes.map((route) => (
                        props.path === 'Fastest' ?
                        route.fastest.map((item, index) => (
                            <View key={index}>
                                <Animated.View entering={FadeIn.duration(600)}>
                                    {
                                        item.walk !== null ? <Walking time={item.walk} station={item.station.en[0]}/> : null
                                    }
                                </Animated.View> 
                                <FullRoute path={item.path} route_en={item.station.en} route_th={item.station.th}/>
                            </View>
                        )):
                        props.path === 'Cheapest' ?
                        route.chepest.map((item, index) => (
                            <View key={index}>
                                <Animated.View entering={FadeIn.duration(600)}>
                                    {
                                        item.walk !== null ? <Walking time={item.walk} station={item.station.en[0]}/> : null
                                    }
                                </Animated.View> 
                                <FullRoute path={item.path} route_en={item.station.en} route_th={item.station.th}/>
                            </View>
                        )):
                        route.leastInterchanges.map((item, index) => (
                            <View key={index}>
                                <Animated.View entering={FadeIn.duration(600)}>
                                    {
                                        item.walk !== null ? <Walking time={item.walk} station={item.station.en[0]}/> : null
                                    }
                                </Animated.View> 
                                <FullRoute path={item.path} route_en={item.station.en} route_th={item.station.th}/>
                            </View>
                        ))
                    ))
                } 
            </View>
            <View style = {Styles.overall_component_view}>
                <View style = {Styles.body_view}>
                    <CustomButton 
                        text={briefly? 'Show More' : 'Show Less'} 
                        backgroundColor={'white'} 
                        borderColor={'black'} 
                        textColor={'black'} 
                        function={()=> {
                            setBriefly(!briefly);
                        }}/>
                    <CustomButton 
                        text={'Confirm'} 
                        backgroundColor={'black'} 
                        borderColor={'black'} 
                        textColor={'white'} 
                        function={()=>{
                            console.log('Confirm');
                        }}/>
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    overall_component_view: {
        marginHorizontal :screenHeight*0.025,
    }
});

export default Route;