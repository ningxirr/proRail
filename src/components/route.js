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

    const handleSiamStation = (station, type, color) => {
        const stationList = props.route;
        if(station === 'CEN'){
            if(stationList.includes('N1') || stationList.includes('E1')) {
                if(type === 'light') return '#B3EE78';
                else return '#4CAF1D';
            }
            else if(stationList.includes('W1') || stationList.includes('S1')){
                if(type === 'light') return '#84C5C2';
                else return '#0A8B86';
            }
        }
        return color;
    }
    return(   
        <View>
            {
                props.walk !== null ? 
                <View>
                    <Animated.View entering={FadeIn.duration(600)}>
                        {
                             props.haveToWalk ? 
                             <Walking 
                                time={Math.ceil(props.walk)} 
                                station={stationInfo[props.route[0]].station_name.en.length >= 23 ? stationInfo[props.route[0]].station_name.en.substring(0,23) + '...' : stationInfo[props.route[0]].station_name.en }/> : null
                        }
                    </Animated.View> 
                </View> : null
            }
            <TouchableOpacity onPress={() => {setBriefly(!briefly)}}>
                {
                    props.route[0] === props.route[props.route.length-1] ?
                    <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
                        <View style={Styles.path_with_image_view}>
                            <View style={[Styles.path_image_view]}>
                                <BrieflyPathIcon 
                                    color={'transparent'} 
                                    // lightColor={stationInfo[props.route[0]].platform.color.path_light_color}
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {stationInfo[props.route[0]].station_name.en.length > 23 ? stationInfo[props.route[0]].station_name.en.substring(0,23) + '...' :stationInfo[props.route[0]].station_name.en}
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
                                            {Math.ceil(props.price)}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                }
                                
                            </View>
                        </View>
                    </Animated.View>:
                    briefly ?
                    /***************briefly***************/
                    <Animated.View style={Styles.path_view} entering={FadeIn} exiting={FadeOut}>
                        <View style={Styles.path_with_image_view}>
                            <View style={[Styles.path_image_view, {marginVertical: 1}]}>
                                <BrieflyPathIcon
                                    color={ handleSiamStation(props.route[0], 'dark', stationInfo[props.route[0]].platform.color.path_color) } 
                                    lightColor={ handleSiamStation(props.route[0], 'light', stationInfo[props.route[0]].platform.color.path_light_color) }
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {stationInfo[props.route[0]].station_name.en.length > 23 ? stationInfo[props.route[0]].station_name.en.substring(0,23)+'...' : stationInfo[props.route[0]].station_name.en}
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
                                            {Math.ceil(props.price)}
                                        </Text>
                                        <Text style={Styles.price_unit_text}>
                                            THB
                                        </Text>
                                    </View>
                                }
                                
                            </View>
                        </View>
                        <Animated.View style={Styles.path_with_image_view} entering={props.route.length === 2 ? FadeIn:FadeInDown} exiting={props.route.length === 2 ? FadeOut : FadeOutDown}>
                            <View style={[Styles.path_image_view, {marginVertical: 1, transform:[{rotateX: '180deg'}]}]}>
                                <BrieflyPathIcon 
                                    color={ handleSiamStation(props.route[props.route.length-1], 'dark', stationInfo[props.route[props.route.length-1]].platform.color.path_color) } 
                                    lightColor={ handleSiamStation(props.route[props.route.length-1], 'light', stationInfo[props.route[props.route.length-1]].platform.color.path_light_color) }
                                />
                            </View>
                            <View>
                                <Text style={Styles.briefly_path_en_text}>
                                    {stationInfo[props.route[props.route.length-1]].station_name.en.length > 23 ? stationInfo[props.route[props.route.length-1]].station_name.en.substring(0,23)+'...' : stationInfo[props.route[props.route.length-1]].station_name.en}
                                </Text>
                                <Text style={Styles.briefly_path_th_text}>
                                    {stationInfo[props.route[props.route.length-1]].station_name.th}
                                </Text>
                            </View>
                        </Animated.View>   
                    </Animated.View> : 
                    /***************full***************/
                    <Animated.View style={Styles.container_view} entering={FadeIn}>
                        <View>
                            {
                                props.route.map((station, index) => (
                                    
                                    <View key={index} style={Styles.path_with_image_view}>
                                        {
                                            index === 0 || index === props.route.length-1 ? 
                                            <Animated.View entering={index===0 ? null: props.route.length === 2 ? FadeIn: FadeInUp} >
                                                <View style={[Styles.path_image_view, {marginTop: 0}, index === props.route.length-1 ? {transform:[{rotateX: '180deg'}]}: null]}>
                                                    <PathIcon
                                                        isHeader={true}
                                                        color={ handleSiamStation(station, 'dark', stationInfo[props.route[index]].platform.color.path_color) } 
                                                        lightColor={ handleSiamStation(station, 'light', stationInfo[props.route[index]].platform.color.path_light_color) }
                                                    />
                                                </View>
                                                
                                            </Animated.View>
                                            :
                                            <Animated.View entering={props.route.length === 2 ? FadeIn: FadeInUp}>
                                                <View style={Styles.path_image_view} >
                                                    <PathIcon
                                                        isHeader={false}
                                                        color={ handleSiamStation(station, 'dark', stationInfo[props.route[index]].platform.color.path_color) } 
                                                        lightColor={ handleSiamStation(station, 'light', stationInfo[props.route[index]].platform.color.path_light_color) }
                                                    />
                                                </View>
                                            </Animated.View>
                                        }
                                        <Animated.View entering={index===0 ? null: props.route.length === 2 ? FadeIn: FadeInUp} >
                                            <Text style={Styles.briefly_path_en_text} numberOfLines={1} ellipsizeMode='tail' >
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

const Styles = StyleSheet.create({
    path_view: {
        flex: 1,
        paddingVertical: 10,
        marginVertical: 5,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
    },
    path_with_image_view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    path_image_view:{
        marginLeft: 30
    },
    briefly_path_en_text: {
        marginLeft: 40,
        fontSize: 14,
        color: 'black',
        fontFamily: 'LINESeedSans_A_Bd',
        width: 200
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
        borderColor: '#CCCCCC',
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