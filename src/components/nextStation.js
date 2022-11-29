"use strict";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const start = 1;

const NextStation = (props) => {
    return (
        <View>
            {props.navigate && (
                <View style = {[Styles.container, {backgroundColor: 'rgba(0,0,0,0.7)'}]}>
                    <View style = {Styles.next_station_view}>
                        <Text style = {Styles.next_station_text}>
                            {start==0? "Nearest": "Next"}
                        </Text>
                        <Text style = {Styles.next_station_text}>
                            Station
                        </Text>
                    </View>
                    <View style = {Styles.station_name_view}>
                        <Text style = {Styles.station_name_text}>
                            {props.stationName}
                        </Text>
                        <View style = {[Styles.station_route_view, { backgroundColor: props.stationColor }]}>
                            <Text style = {Styles.station_route_text}>
                                {props.stationPlatform}
                            </Text>
                        </View>
                    </View>
                </View> 
            )}
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    next_station_view: {
        margin:'5%'
    },
    next_station_text: {
        color:'white', 
        fontSize: screenHeight * 0.024, 
        fontWeight:'normal'
    },
    station_name_view: {
        margin:'5%', 
        width:'43%'
    },
    station_name_text: {
        color:'white', 
        fontSize: screenHeight * 0.028, 
        textAlign:'right'
    },
    station_route_view: {
        borderRadius:10,
        width:'100%', 
        marginTop:'2%'
    },
    station_route_text:{
        color:'white', 
        fontSize: screenHeight * 0.020, 
        textAlign:'center'
    }
});

export default NextStation