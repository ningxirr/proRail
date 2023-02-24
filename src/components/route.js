"use strict";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeOutDown, FadeInUp } from 'react-native-reanimated';
import stationInfo from '../../data/station_info.json';
import Walking from './walking';
import PathIcon from './pathIcon'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BrieflyRoute = (props) => {
    const [briefly, setBriefly] = useState(true);
    return(   
        <View>
            {
                props.walk !== null ? 
                <View>
                    {console.log(props.walk)}
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
                            <PathIcon color={stationInfo[props.route[0]].platform.color} lightColor={'#859CBA'}/>
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
                                    <Text style={Styles.price_text}>
                                        {props.price}{'\n'}THB
                                    </Text>
                                }
                                
                            </View>
                        </View>
                        <Animated.View style={Styles.path_with_image_view} entering={props.route.length === 2 ? FadeIn:FadeInDown} exiting={props.route.length === 2 ? FadeOut : FadeOutDown}>
                            <Image source={getImage(stationInfo[props.route[0]].platform.color)} style={[Styles.briefly_path_image, {marginVertical: screenHeight*0.002, transform: [{ scaleX: -1 },{ scaleY: -1 }]}]}/>
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
                                                <Image 
                                                    source={getHeaderAndFooterImage(stationInfo[props.route[0]].platform.color)} 
                                                    style={[Styles.briefly_path_image, index === props.route.length-1 ? {transform: [{ scaleX: -1 },{ scaleY: -1 }]}: null]} 
                                                    />
                                            </Animated.View>
                                            :
                                            <Animated.View entering={props.route.length === 2 ? FadeIn: FadeInUp}>
                                                <Image source={getPathImage(stationInfo[props.route[0]].platform.color)} 
                                                    style={Styles.briefly_path_image} 
                                                    entering={props.route.length === 2 ? FadeIn: FadeInUp.duration(500)}
                                                />
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
                                    <Text style={Styles.price_text}>
                                        {props.price}{'\n'}THB
                                    </Text>
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
        paddingVertical: screenHeight*0.01,
        marginVertical: screenHeight*0.005,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
    },
    path_with_image_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    briefly_path_image: {
        height: screenHeight*0.06,
        width: screenWidth*0.07,
        resizeMode: 'contain',
        marginLeft: screenWidth*0.07,
    },
    briefly_path_en_text: {
        marginLeft: screenWidth*0.1,
        fontSize: screenHeight*0.016,
        color: 'black',
        fontFamily: 'LINESeedSans_A_Bd',
    },
    briefly_path_th_text: {
        marginLeft: screenWidth*0.1,
        fontSize: screenHeight*0.016,
        color: 'black',
        fontFamily: 'LINESeedSansTH_A_Rg',
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
    container_view: {
        paddingVertical: screenHeight*0.01,
        marginVertical: screenHeight*0.005,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    price_text:{
        textAlign: 'center',
        fontSize: screenHeight*0.016,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'black',
    },
    price_component_view: {
        position: 'absolute',
        right: 10,
        top: 5
    }
});

export default BrieflyRoute;