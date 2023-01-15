"use strict";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const start = 1;

const NextStation = (props) => {
    return (
        <View>
            {props.navigate && (
                <View style = {[Styles.container, {backgroundColor: 'white'}]}>
                    <View style = {Styles.next_station_view}>
                        <Text style = {Styles.next_station_text}>
                            Take the
                        </Text>
                        <Text style = {Styles.next_station_text}>
                            train to
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
        fontSize: screenHeight * 0.024, 
        fontFamily: 'LINESeedSans_A_Bd',
    },
    station_name_view: {
        margin:'5%', 
        width:'43%',
        alignSelf: 'center',
    },
    station_name_text: {
        color:'black', 
        fontSize: screenHeight * 0.028, 
        textAlign:'right',
        fontFamily: 'LINESeedSans_A_Rg',
    },
    station_route_view: {
        borderRadius:100,
        width:'100%', 
        marginTop:'2%',
        paddingVertical: '2%',
    },
    station_route_text:{
        color:'white', 
        fontSize: screenHeight * 0.020, 
        textAlign:'center',
        fontFamily: 'LINESeedSans_A_Bd',
    }
});

export default NextStation