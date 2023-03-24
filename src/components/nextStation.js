"use strict";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';

const NextStation = (props) => {
    return (
        <View>
            {props.navigate && (
                <View style = {[Styles.container, {backgroundColor: 'white'}]}>
                    <View style={Styles.overall_next_station_view}>
                        <View style = {Styles.next_station_view}>
                            <Text style = {Styles.next_station_text}>
                                {props.navigateText}
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
                    {
                        props.outOfRoute &&
                        <View style={Styles.description_view}>
                            <Text style={Styles.description_text}>
                                {props.description}
                            </Text>
                        </View>
                    }
                    
                </View>
            )}
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    overall_next_station_view:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    next_station_view: {
        alignSelf: 'center',
    },
    next_station_text: {
        color:'black', 
        fontSize: 20, 
        fontFamily: 'LINESeedSans_A_Bd',
    },
    station_name_view: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        flex : 1
    },
    station_name_text: {
        color:'black', 
        fontSize: 18, 
        textAlign:'right',
        fontFamily: 'LINESeedSans_A_Rg',
    },
    station_route_view: {
        borderRadius: 15,
        marginTop: 2,
        paddingVertical: 5,
        width: 150
    },
    station_route_text:{
        color:'white', 
        fontSize: 15, 
        textAlign:'center',
        fontFamily: 'LINESeedSans_A_Bd',
    },
    description_view:{
        marginHorizontal: 10,
        marginTop: 10,
        paddingVertical: 10,
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    description_text:{
        color:'black',
        fontSize: 14,
        fontFamily: 'LINESeedSans_A_Rg',
    }
});

export default NextStation