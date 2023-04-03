"use strict";
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { getDistance, findNearest } from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import stationInfo from '../../data/station_info'
import stationLocation from '../../data/station_location'
import { color } from 'react-native-reanimated';

const NextStation = (props) => {
    const [stationGPS, setStationGPS] = useState(props.beginingStation === undefined ? null : props.beginingStation); //set the station code of the nearest station
    const [stationDistance, setStationDistance] = useState(false); //set the distance between the nearest station and the user
    const [hasLocationPermission, setHasLocationPermission] = useState(false);

    const filteredStation = props.isNearestOnly ? stationLocation : props.filteredStation;
    useEffect(() => {
        if(Platform.OS === 'ios'){
            setHasLocationPermission(true);
        }
        else if(Platform.OS === 'android'){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => setHasLocationPermission(response));
        }
    }, []);

    useEffect(() => {
        const _watchId = Geolocation.watchPosition(
            position => {
                let nearest = findNearest(position.coords, filteredStation);
                setStationGPS(nearest.code);
                setStationDistance(getDistance(nearest, position.coords));
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 10000,
                fastestInterval: 10000,
            },
        );
        return () => {
            if (_watchId) {
            Geolocation.clearWatch(_watchId);
            }
        };
    }, [filteredStation]);
    
    const selectNavigateText = () => {
        if (props.isNearestOnly || stationDistance > 5000){
            return 'Nearest\nStation';
        }
        else if (props.stationInterchanges.length !== 0) {
          if (stationGPS === props.beginingStation) return 'Get on \nthe train at';
          else if (stationDistance < 100 && props.stationInterchanges.includes(stationGPS)) return 'Interchange\nat';
          else return 'Next\nStation';
        }
        else {
          return 'Next\nStation';
        }
      }

    if(!hasLocationPermission){
        return null;
    }
    return (
        <View>
            <View style = {[Styles.container, {backgroundColor: 'white'}]}>
                <View style={Styles.overall_next_station_view}>
                    <View style = {Styles.next_station_view}>
                        <Text style = {Styles.next_station_text}>
                            {selectNavigateText()}
                        </Text>
                    </View>
                    <View style = {Styles.station_name_view}>
                        {
                            stationGPS === null ? 
                            <View>
                                <Text style = {[Styles.station_name_text, {color:'grey'}]}>
                                    Loading...
                                </Text>
                                <View style = {[Styles.station_route_view, { backgroundColor: '#cfcfcf' }]}>
                                    <Text style = {Styles.station_route_text}>
                                        Loading...
                                    </Text>
                                </View>
                            </View>:
                            <View>
                                <Text style = {Styles.station_name_text} numberOfLines={2} ellipsizeMode='tail'>
                                    {stationInfo[stationGPS].station_name.en}
                                </Text>
                                <View style = {[Styles.station_route_view, { backgroundColor: stationInfo[stationGPS].platform.color.color }]}>
                                    <Text style = {Styles.station_route_text}>
                                        {stationInfo[stationGPS].platform.platform}
                                    </Text>
                                </View>
                            </View>
                        }
                       
                    </View>
                </View> 
                {
                    !props.isNearestOnly && stationDistance > 5000 &&
                    <View style={Styles.description_view}>
                        <Text style={Styles.description_text}>
                            {'You are out of the route'}
                        </Text>
                    </View>
                }
                
            </View>
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