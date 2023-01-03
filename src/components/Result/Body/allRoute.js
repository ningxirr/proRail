"use strict";
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import Route from './route';
import RouteDescription from './routeDescription';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
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
    },{
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

const AllRoute = (props) => {
    return( 
        <View style = {Styles.overall_component_view}>
            {
                routes.map((route, index) => (
                    <View key={index}>
                        {
                            props.path === 'Fastest' ?
                            <View>
                                <RouteDescription 
                                        index={index} 
                                        time={route.fastest.time} 
                                        interchange={route.fastest.interchange}
                                        price={route.fastest.price}/>
                                {
                                    route.fastest.route.map((item, index) => (
                                        <Route 
                                            key={index}
                                            item={item.walk}
                                            path={item.path} 
                                            walk={item.walk}
                                            route_en={item.station.en} 
                                            route_th={item.station.th}
                                            price={route.fastest.price}/>
                                    ))
                                }
                            </View>
                            :
                            props.path === 'Cheapest' ?
                            <View>
                                <RouteDescription 
                                    index={index} 
                                    time={route.chepest.time} 
                                    interchange={route.chepest.interchange}
                                    price={route.chepest.price}/>
                                {
                                    route.chepest.route.map((item, index) => (
                                        <Route 
                                            key={index}
                                            item={item.walk}
                                            path={item.path} 
                                            walk={item.walk}
                                            route_en={item.station.en} 
                                            route_th={item.station.th}
                                            price={route.chepest.price}/>
                                    ))
                                }
                            </View>
                            :
                            <View>
                                <RouteDescription 
                                    index={index} 
                                    time={route.chepest.time} 
                                    interchange={route.chepest.interchange}
                                    price={route.chepest.price}/>
                                {
                                    route.leastInterchanges.route.map((item, index) => (
                                        <Route 
                                            key={index}
                                            item={item.walk}
                                            path={item.path} 
                                            walk={item.walk}
                                            route_en={item.station.en} 
                                            route_th={item.station.th}
                                            price={route.leastInterchanges.price}/>
                                    ))
                                }
                            </View>
                        }
                    </View>  
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

export default AllRoute;