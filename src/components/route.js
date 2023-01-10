"use strict";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeOutDown, FadeInUp } from 'react-native-reanimated';
import Walking from './walking';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BrieflyRoute = (props) => {
    const [briefly, setBriefly] = useState(true);
    useEffect(() => {
        setBriefly(props.route_en)
    }, [props.route_en])
    return(   
        <View>
            {
                props.walk !== null ? 
                <View>
                    <Animated.View entering={FadeIn.duration(600)}>
                        {
                            props.walk !== null ? <Walking time={props.walk} station={props.route_en[0]}/> : null
                        }
                    </Animated.View> 
                </View> : null
            }
            <TouchableOpacity onPress={() => setBriefly(!briefly)}>
                {
                    briefly ?
                    <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
                        <View style={Styles.path_with_image_view}>
                            <Image source={getImage(props.path)} style={[Styles.briefly_path_image, {transform: [{ scaleX: 1 },{ scaleY: 1 }]}]}/>
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {props.route_en[0]}
                                </Text>
                                <Text style={Styles.briefly_path_th_text}>
                                    {props.route_th[0]}
                                </Text>
                            </View>
                            <View style={Styles.price_component_view}>
                                <Text style={Styles.price_text}>
                                    {props.price}{'\n'}THB
                                </Text>
                            </View>
                        </View>
                        <Animated.View style={Styles.path_with_image_view} entering={FadeInDown} exiting={FadeOutDown}>
                            <Image source={getImage(props.path)} style={[Styles.briefly_path_image, {marginVertical: screenHeight*0.002, transform: [{ scaleX: -1 },{ scaleY: -1 }]}]}/>
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {props.route_en[props.route_en.length-1]}
                                </Text>
                                <Text style={Styles.briefly_path_th_text}>
                                    {props.route_th[props.route_th.length-1]}
                                </Text>
                            </View>
                        </Animated.View>   
                    </Animated.View> :
                    <Animated.View style={Styles.container_view} entering={FadeIn}>
                        <View>
                            {
                                props.route_en.map((route, index) => (
                                    <View key={index} style={Styles.path_with_image_view}>
                                        {
                                            index === 0 || index === props.route_en.length-1 ? 
                                            <Animated.View entering={index===0 ? null: FadeInUp} >
                                                <Image source={getHeaderAndFooterImage(props.path)} style={[Styles.briefly_path_image, index === props.route_en.length-1 ? {transform: [{ scaleX: -1 },{ scaleY: -1 }]}: null]} />
                                            </Animated.View>
                                            :
                                            <Animated.View entering={FadeInUp}>
                                                <Image source={getPathImage(props.path)} style={Styles.briefly_path_image} entering={FadeInUp.duration(500)}/>
                                            </Animated.View>
                                        }
                                        <Animated.View entering={index===0 ? null: FadeInUp} >
                                            <Text style={Styles.briefly_path_en_text}>
                                                {route}
                                            </Text>
                                            <Text style={Styles.briefly_path_th_text}>
                                                {props.route_th[index]}
                                            </Text>
                                        </Animated.View>
                                    </View>
                                ))
                            }
                            <View style={Styles.price_component_view}>
                                <Text style={Styles.price_text}>
                                    {props.price}{'\n'}THB
                                </Text>
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
        case 'Green':
            return require('../../assets/images/BrieflyRoute/green.png');
        case 'DarkGreen':
            return require('../../assets/images/BrieflyRoute/darkGreen.png');
        case 'Blue':
            return require('../../assets/images/BrieflyRoute/blue.png');
        case 'Purple':
            return require('../../assets/images/BrieflyRoute/purple.png');
        case 'Pink':
            return require('../../assets/images/BrieflyRoute/pink.png');
        case 'Gold':
            return require('../../assets/images/BrieflyRoute/gold.png');
        case 'Red':
            return require('../../assets/images/BrieflyRoute/red.png');
        case 'LightRed':
            return require('../../assets/images/BrieflyRoute/lightRed.png');
        default:
            return require('../../assets/images/BrieflyRoute/default.png');
    }
}

function getPathImage(path){
    switch(path){
        case 'Green':
            return require('../../assets/images/FullRoute/Body/green.png');
        case 'DarkGreen':
            return require('../../assets/images/FullRoute/Body/darkGreen.png');
        case 'Blue':
            return require('../../assets/images/FullRoute/Body/blue.png');
        case 'Purple':
            return require('../../assets/images/FullRoute/Body/purple.png');
        case 'Pink':
            return require('../../assets/images/FullRoute/Body/pink.png');
        case 'Gold':
            return require('../../assets/images/FullRoute/Body/gold.png');
        case 'Red':
            return require('../../assets/images/FullRoute/Body/red.png');
        case 'LightRed':
            return require('../../assets/images/FullRoute/Body/lightRed.png');
        default:
            return require('../../assets/images/FullRoute/Body/default.png');
    }
}

function getHeaderAndFooterImage(path){
    switch(path){
        case 'Green':
            return require('../../assets/images/FullRoute/HeaderAndFooter/green.png');
        case 'DarkGreen':
            return require('../../assets/images/FullRoute/HeaderAndFooter/darkGreen.png');
        case 'Blue':
            return require('../../assets/images/FullRoute/HeaderAndFooter/blue.png');
        case 'Purple':
            return require('../../assets/images/FullRoute/HeaderAndFooter/purple.png');
        case 'Pink':
            return require('../../assets/images/FullRoute/HeaderAndFooter/pink.png');
        case 'Gold':
            return require('../../assets/images/FullRoute/HeaderAndFooter/gold.png');
        case 'Red':
            return require('../../assets/images/FullRoute/HeaderAndFooter/red.png');
        case 'LightRed':
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
        width: screenWidth*0.06,
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