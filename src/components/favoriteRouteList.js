"use strict";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';

const screenHeight = Dimensions.get('window').height;


const FavoriteRouteList = (props) => {
    return (
        <TouchableOpacity 
            style = {Styles.container} 
            onPress={()=>props.navigation.navigate('Result', props.route)}>
            <View style = {Styles.next_station_view}>
                {console.log(props.route[0].route[0].station.en[0])}
                <Text style = {Styles.next_station_text}>
                    {props.route[0].route[0].station.en[0]}
                </Text>
                <Text style = {Styles.next_station_text}>
                    To {props.route[props.route.length-1].route[props.route[props.route.length-1].route.length-1].station.en[props.route[props.route.length-1].route[props.route[props.route.length-1].route.length-1].station.en.length-1]}
                </Text>
            </View>
            <View style = {[Styles.station_route_view, {backgroundColor: getStationColor(props.route[0].route[0].path)}]}>
                <Text style = {Styles.station_route_text}>
                    { props.route[0].price } THB
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function getStationColor(color){
    switch(color){
        case 'Green':
            return '#4CAF1D';
        case 'DarkGreen':
            return '#0A8B86';
        case 'Blue':
            return '#325E9A';
        case 'Purple':
            return '#800080';
        case 'Pink':
            return '#FA5558';
        case 'Gold':
            return '#FFC433';
        case 'Red':
            return '#761F21';
        case 'LightRed':
            return '#DE0F19';
        default:
            return 'grey';
    }
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
        alignSelf: 'center',
    },
    next_station_text: {
        color:'black', 
        fontSize: screenHeight * 0.016, 
        fontFamily: 'LINESeedSans_A_Bd',
        marginVertical: '1%',
    },
    station_route_view: {
        margin:'5%', 
        paddingVertical: '1%',
        paddingHorizontal: '7%',
        alignSelf: 'center',
        borderRadius:100,
    },
    station_route_text:{
        color:'white', 
        fontSize: screenHeight * 0.017, 
        textAlign:'center',
        fontFamily: 'LINESeedSans_A_Rg',
    }
});

export default FavoriteRouteList