"use strict";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';
import stationInfo from '../../data/station_info.json';

const FavoriteRouteList = (props) => {
    const stationList = props.route.split('-');
    return (
        <TouchableOpacity 
            style = {Styles.container} 
            onPress={()=>{
                props.navigation.navigate('AddStopNavigator',{
                screen: 'ResultScreen',
                params: {
                    code: stationList
                },
            })}}>
            <View style = {Styles.next_station_view}>
                <Text style = {Styles.next_station_text}>
                    {stationInfo[stationList[0]].station_name.en}
                </Text>
                <Text style = {Styles.next_station_text}>
                    To {stationInfo[stationList[stationList.length-1]].station_name.en}
                </Text>
                <Text style = {Styles.route_text}>
                    {props.route}
                </Text>
            </View>
            <View style = {Styles.station_route_view}>
                <Text style = {Styles.station_stop_text}>
                    {stationList.length-2}
                </Text>
                <Text style = {[Styles.station_stop_text, {fontSize: 10, fontFamily: 'LINESeedSans_A_Rg'}]}>
                    STOP(S)
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    next_station_view: {
        margin:'5%',
        flex: 1,
        justifyContent: 'center',
    },
    next_station_text: {
        color:'black', 
        fontSize: 14, 
        fontFamily: 'LINESeedSans_A_Bd',
        marginVertical: 2,
    },
    route_text: {
        color:'#9E9A9A',
        fontSize: 12,
        marginVertical: 2,
        fontFamily: 'LINESeedSans_A_Rg',
    },
    station_route_view: {
        backgroundColor: 'black',
        marginHorizontal:'5%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    station_stop_text:{
        color:'white', 
        fontSize: 25, 
        textAlign:'center',
        fontFamily: 'LINESeedSans_A_Bd',
    }
});

export default FavoriteRouteList