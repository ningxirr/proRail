"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInDown, FadeOutDown } from 'react-native-reanimated';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BrieflyRoute = (props) => {
    return(   
        <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
            <View style={Styles.path_with_image_view}>
                <Image source={getImage(props.path)} style={[Styles.briefly_path_image, {transform: [{ scaleX: 1 },{ scaleY: 1 }]}]}/>
                <View>
                    <Text style={Styles.briefly_path_en_text}>
                        {props.start_station_en}
                    </Text>
                    <Text style={Styles.briefly_path_th_text}>
                        {props.start_station_th}
                    </Text>
                </View>
            </View>
            <Animated.View style={Styles.path_with_image_view} entering={FadeInDown} exiting={FadeOutDown}>
                <Image source={getImage(props.path)} style={[Styles.briefly_path_image, {transform: [{ scaleX: -1 },{ scaleY: -1 }]}]}/>
                <View>
                    <Text style={Styles.briefly_path_en_text}>
                        {props.stop_station_en}
                    </Text>
                    <Text style={Styles.briefly_path_th_text}>
                        {props.stop_station_th}
                    </Text>
                </View>
            </Animated.View>   
        </Animated.View>  
    );
}

function getImage(path){
    switch(path){
        case 'Green':
            return require('../../../../assets/images/BrieflyRoute/green.png');
        case 'DarkGreen':
            return require('../../../../assets/images/BrieflyRoute/darkGreen.png');
        case 'Blue':
            return require('../../../../assets/images/BrieflyRoute/blue.png');
        case 'Purple':
            return require('../../../../assets/images/BrieflyRoute/purple.png');
        case 'Pink':
            return require('../../../../assets/images/BrieflyRoute/pink.png');
        case 'Gold':
            return require('../../../../assets/images/BrieflyRoute/gold.png');
        case 'Red':
            return require('../../../../assets/images/BrieflyRoute/red.png');
        case 'LightRed':
            return require('../../../../assets/images/BrieflyRoute/lightRed.png');
        default:
            return require('../../../../assets/images/BrieflyRoute/default.png');
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
        marginVertical: screenHeight*0.002,
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

export default BrieflyRoute;