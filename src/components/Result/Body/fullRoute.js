"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeOutUp } from 'react-native-reanimated';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FullRoute = (props) => {
    
    return(   
        <Animated.View style={Styles.container_view} entering={FadeIn}>
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
                                <Image source={getImage(props.path)} style={Styles.briefly_path_image} entering={FadeInUp.duration(500)}/>
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
        </Animated.View>     
    );
}

function getImage(path){
    switch(path){
        case 'Green':
            return require('../../../../assets/images/FullRoute/Body/green.png');
        case 'DarkGreen':
            return require('../../../../assets/images/FullRoute/Body/darkGreen.png');
        case 'Blue':
            return require('../../../../assets/images/FullRoute/Body/blue.png');
        case 'Purple':
            return require('../../../../assets/images/FullRoute/Body/purple.png');
        case 'Pink':
            return require('../../../../assets/images/FullRoute/Body/pink.png');
        case 'Gold':
            return require('../../../../assets/images/FullRoute/Body/gold.png');
        case 'Red':
            return require('../../../../assets/images/FullRoute/Body/red.png');
        case 'LightRed':
            return require('../../../../assets/images/FullRoute/Body/lightRed.png');
        default:
            return require('../../../../assets/images/FullRoute/Body/default.png');
    }
}

function getHeaderAndFooterImage(path){
    switch(path){
        case 'Green':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/green.png');
        case 'DarkGreen':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/darkGreen.png');
        case 'Blue':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/blue.png');
        case 'Purple':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/purple.png');
        case 'Pink':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/pink.png');
        case 'Gold':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/gold.png');
        case 'Red':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/red.png');
        case 'LightRed':
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/lightRed.png');
        default:
            return require('../../../../assets/images/FullRoute/HeaderAndFooter/default.png');
    }
}

const Styles = StyleSheet.create({
    container_view: {
        paddingVertical: screenHeight*0.01,
        marginVertical: screenHeight*0.005,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    path_with_image_view:{
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
        fontColor: 'black',
        fontFamily: 'LINESeedSans_A_Bd',
    },
    briefly_path_th_text: {
        marginLeft: screenWidth*0.1,
        fontSize: screenHeight*0.016,
        fontColor: 'black',
        fontFamily: 'LINESeedSansTH_A_Rg',
    },
});

export default FullRoute;