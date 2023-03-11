"use strict";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeOutDown, FadeInUp } from 'react-native-reanimated';
import stationInfo from '../../data/station_info.json';
import Walking from './walking';
import BrieflyPathIcon from './brieflyPathIcon';
import PathIcon from './pathIcon'

const Route = (props) => {
    const [briefly, setBriefly] = useState(true);
    useEffect(() => {
        setBriefly(true);
      }, [props]);
    return(   
        <View>
            {
                props.walk !== null ? 
                <View>
                    <Animated.View entering={FadeIn.duration(600)}>
                        {
                             props.haveToWalk ? <Walking time={props.walk} station={stationInfo[props.route[0]].station_name.en}/> : null
                        }
                    </Animated.View> 
                </View> : null
            }
            <TouchableOpacity onPress={() => {setBriefly(!briefly)}}>
                {
                    briefly ?
                    <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
                        <View style={Styles.path_with_image_view}>
                            <View style={[Styles.path_image_view, {marginVertical: 1}]}>
                                <BrieflyPathIcon
                                    color={stationInfo[props.route[0]].platform.color.path_color} 
                                    lightColor={stationInfo[props.route[0]].platform.color.path_light_color}
                                />
                            </View>
                            {/* <Image source={getImage(stationInfo[props.route[0]].platform.color)} style={[Styles.briefly_path_image, {transform: [{ scaleX: 1 },{ scaleY: 1 }]}]}/> */}
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {stationInfo[props.route[0]].station_name.en}
                                </Text>
                                <Text style={Styles.briefly_path_th_text}>
                                    {stationInfo[props.route[0]].station_name.th}
                                </Text>
                            </View>
                            <View style={Styles.price_component_view}>
                                {
                                    props.price === null ?
                                    null:
                                    <View>
                                        <Text style={Styles.price_text}>
                                            {props.price}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                }
                                
                            </View>
                        </View>
                        <Animated.View style={Styles.path_with_image_view} entering={props.route.length === 2 ? FadeIn:FadeInDown} exiting={props.route.length === 2 ? FadeOut : FadeOutDown}>
                            {/* <Image source={getImage(stationInfo[props.route[0]].platform.color.color)} style={[Styles.briefly_path_image, {marginVertical: screenHeight*0.002, transform: [{ scaleX: -1 },{ scaleY: -1 }]}]}/> */}
                            <View style={[Styles.path_image_view, {marginVertical: 1, transform:[{rotateX: '180deg'}]}]}>
                                <BrieflyPathIcon 
                                    color={stationInfo[props.route[0]].platform.color.path_color} 
                                    lightColor={stationInfo[props.route[0]].platform.color.path_light_color}
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {stationInfo[props.route[props.route.length-1]].station_name.en}
                                </Text>
                                <Text style={Styles.briefly_path_th_text}>
                                    {stationInfo[props.route[props.route.length-1]].station_name.th}
                                </Text>
                            </View>
                        </Animated.View>   
                    </Animated.View> : 
                    <Animated.View style={Styles.container_view} entering={FadeIn}>
                        <View>
                            {
                                props.route.map((station, index) => (
                                    <View key={index} style={Styles.path_with_image_view}>
                                        {
                                            index === 0 || index === props.route.length-1 ? 
                                            <Animated.View entering={index===0 ? null: props.route.length === 2 ? FadeIn: FadeInUp} >
                                                {/* <Image 
                                                    source={getHeaderAndFooterImage(stationInfo[props.route[0]].platform.color)} 
                                                    style={[Styles.briefly_path_image, index === props.route.length-1 ? {transform: [{ scaleX: -1 },{ scaleY: -1 }]}: null]} 
                                                    /> */}
                                                <View style={[Styles.path_image_view, {marginTop: 0}, index === props.route.length-1 ? {transform:[{rotateX: '180deg'}]}: null]}>
                                                    <PathIcon
                                                        isHeader={true}
                                                        color={stationInfo[props.route[0]].platform.color.path_color} 
                                                        lightColor={stationInfo[props.route[0]].platform.color.path_light_color}
                                                    />
                                                </View>
                                                
                                            </Animated.View>
                                            :
                                            <Animated.View entering={props.route.length === 2 ? FadeIn: FadeInUp}>
                                                {/* <Image source={getPathImage(stationInfo[props.route[0]].platform.color)} 
                                                    style={Styles.briefly_path_image} 
                                                    entering={props.route.length === 2 ? FadeIn: FadeInUp.duration(500)}
                                                /> */}
                                                <View style={Styles.path_image_view} >
                                                    <PathIcon
                                                        isHeader={false}
                                                        color={stationInfo[props.route[0]].platform.color.path_color} 
                                                        lightColor={stationInfo[props.route[0]].platform.color.path_light_color}
                                                    />
                                                </View>
                                            </Animated.View>
                                        }
                                        <Animated.View entering={index===0 ? null: props.route.length === 2 ? FadeIn: FadeInUp} >
                                            <Text style={Styles.briefly_path_en_text}>
                                                {stationInfo[station].station_name.en}
                                            </Text>
                                            <Text style={Styles.briefly_path_th_text}>
                                                {stationInfo[station].station_name.th}
                                            </Text>
                                        </Animated.View>
                                    </View>
                                ))
                            }
                            <View style={Styles.price_component_view}>
                                {
                                    props.price === null ?
                                    null:
                                    <View>
                                        <Text style={Styles.price_text}>
                                            {props.price}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    
                    </Animated.View>
                }
            </TouchableOpacity>
        </View>
    );
}

function getImage(path){
    switch(path){
        case '#71B047':
            return require('../../assets/images/BrieflyRoute/green.png');
        case '#315d36':
            return require('../../assets/images/BrieflyRoute/darkGreen.png');
        case '#31609e':
            return require('../../assets/images/BrieflyRoute/blue.png');
        case '#683279':
            return require('../../assets/images/BrieflyRoute/purple.png');
        case '#d96a6a':
            return require('../../assets/images/BrieflyRoute/pink.png');
        case '#cc9933':
            return require('../../assets/images/BrieflyRoute/gold.png');
        case '#f01818':
            return require('../../assets/images/BrieflyRoute/red.png');
        case '#e85658':
            return require('../../assets/images/BrieflyRoute/lightRed.png');
        default:
            return require('../../assets/images/BrieflyRoute/default.png');
    }
}

function getPathImage(path){
    switch(path){
        case '#71B047':
            return require('../../assets/images/FullRoute/Body/green.png');
        case '#315d36':
            return require('../../assets/images/FullRoute/Body/darkGreen.png');
        case '#31609e':
            return require('../../assets/images/FullRoute/Body/blue.png');
        case '#683279':
            return require('../../assets/images/FullRoute/Body/purple.png');
        case '#d96a6a':
            return require('../../assets/images/FullRoute/Body/pink.png');
        case '#cc9933':
            return require('../../assets/images/FullRoute/Body/gold.png');
        case '#f01818':
            return require('../../assets/images/FullRoute/Body/red.png');
        case '#e85658':
            return require('../../assets/images/FullRoute/Body/lightRed.png');
        default:
            return require('../../assets/images/FullRoute/Body/default.png');
    }
}

function getHeaderAndFooterImage(path){
    switch(path){
        case '#71B047':
            return require('../../assets/images/FullRoute/HeaderAndFooter/green.png');
        case '#315d36':
            return require('../../assets/images/FullRoute/HeaderAndFooter/darkGreen.png');
        case '#31609e':
            return require('../../assets/images/FullRoute/HeaderAndFooter/blue.png');
        case '#683279':
            return require('../../assets/images/FullRoute/HeaderAndFooter/purple.png');
        case '#d96a6a':
            return require('../../assets/images/FullRoute/HeaderAndFooter/pink.png');
        case '#cc9933':
            return require('../../assets/images/FullRoute/HeaderAndFooter/gold.png');
        case '#f01818':
            return require('../../assets/images/FullRoute/HeaderAndFooter/red.png');
        case '#e85658':
            return require('../../assets/images/FullRoute/HeaderAndFooter/lightRed.png');
        default:
            return require('../../assets/images/FullRoute/HeaderAndFooter/default.png');
    }
}

const Styles = StyleSheet.create({
    path_view: {
        paddingVertical: 10,
        marginVertical: 5,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
    },
    path_with_image_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    path_image_view:{
        marginLeft: 30
    },
    // briefly_path_image: {
    //     height: 60,
    //     width: screenWidth*0.07,
    //     resizeMode: 'contain',
    //     marginLeft: screenWidth*0.07,
    // },
    briefly_path_en_text: {
        marginLeft: 40,
        fontSize: 14,
        color: 'black',
        fontFamily: 'LINESeedSans_A_Bd',
    },
    briefly_path_th_text: {
        marginLeft: 40,
        fontSize: 12,
        color: 'black',
        fontFamily: 'LINESeedSansTH_A_Rg',
    },
    container_view: {
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    price_text:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'black',
    },
    price_unit_text:{
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'black',
    },
    price_component_view: {
        position: 'absolute',
        right: 10,
        top: 5
    }
});

export default Route;