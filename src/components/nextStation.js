"use strict";
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, PermissionsAndroid, PermissionsIOS, Platform } from 'react-native';
import { getDistance, findNearest } from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import stationInfo from '../../data/station_info'
import stationLocation from '../../data/station_location'
import { useIsFocused } from '@react-navigation/native';
import notifee from '@notifee/react-native';
import getDataFromAsyncStorage from '../function/getDataFromAsyncStorage';

const NextStation = (props) => {
    const [stationGPS, setStationGPS] = useState(props.beginingStation === undefined ? null : props.beginingStation); //set the station code of the nearest station
    const [stationDistance, setStationDistance] = useState(false); //set the distance between the nearest station and the user
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [canNoti, setCanNoti] = useState(null);
    const isFocused = useIsFocused();
    const filteredStation = props.isNearestOnly ? stationLocation : props.filteredStation;
    let stationInterchanges = props.stationInterchanges;
    const [firstInterchangeStation, setFirstInterchangeStation] = useState(null);
    const [lastInterchangeStation, setLastInterchangeStation] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDataFromAsyncStorage('@notification');
            setCanNoti(data);
            if(props.beginingStation !== undefined && props.lastStation !== undefined){
                setFirstInterchangeStation(props.beginingStation);
                setLastInterchangeStation(props.lastStation);
            }
        };
        fetchData();
        if(Platform.OS === 'ios'){
            // Geolocation.requestAuthorization('always')
            // .then((status) => status === 'granted' ? setHasLocationPermission(true) : setHasLocationPermission(false))
            requestForegroundLocationPermission()
        }
        else if(Platform.OS === 'android'){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => setHasLocationPermission(response));
        }
    }, [props.beginingStation, props.lastStation]);
    
    function requestForegroundLocationPermission() {
        // try {
        //   const status = await PermissionsIOS.request('locationWhenInUse');
        //   if (status === 'authorized') {
        //     console.log('Foreground location permission granted');
        //     setHasLocationPermission(true)
        //   } else {
        //     console.log('Foreground location permission denied');
        //     setHasLocationPermission(false)
        //   }
        // } catch (err) {
        //   console.warn(err);
        // }
        Geolocation.requestAuthorization('whenInUse')
        .then((status) => status === 'granted' ? setHasLocationPermission(true) : setHasLocationPermission(false))
    }

    useEffect(() => {
        let _watchId;
        if (isFocused && canNoti !== null && hasLocationPermission) {
          _watchId = Geolocation.watchPosition(
            position => {
              let nearest = findNearest(position.coords, filteredStation);
              console.log(_watchId)
              if (stationInterchanges !== undefined && canNoti !== null && firstInterchangeStation !== null && lastInterchangeStation !== null) {
                    if(stationInterchanges.includes(nearest.code)){
                        if(firstInterchangeStation === nearest.code){
                            onDisplayNotification(0, nearest.code);
                        }
                        else if(lastInterchangeStation === nearest.code){
                            onDisplayNotification(2, nearest.code);
                        }
                        else{
                            onDisplayNotification(1, nearest.code);
                        }
                        stationInterchanges = stationInterchanges.filter((item) => item !== nearest.code);
                        props.setStationInterchanges(stationInterchanges);
                    }  
              } 
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
        }
    
        return () => {
          if (_watchId) {
            Geolocation.clearWatch(_watchId);
          }
        };
      }, [isFocused, filteredStation, canNoti, hasLocationPermission, firstInterchangeStation, lastInterchangeStation]); 

    async function onDisplayNotification(type, code) {
        if(canNoti){
            // Request permissions (required for iOS)
            await notifee.requestPermission()
            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            vibrationPattern: [300, 500],
            });
            
            // Display a notification
            await notifee.displayNotification({
            title: 'Navigation',
            body: type === 0 ? `Get on the Train at ${stationInfo[code].station_name.en}` : type === 1 ? `Next Station is Interchage Station. Get on the train at ${stationInfo[code].station_name.en}.` : `You are at your destination (${stationInfo[code].station_name.en}).`,
            android: {
                    channelId,
                    pressAction: {
                    id: 'default'
                },
                vibrationPattern: [300, 500],
            },
            });
        }
    }

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
    
    if(hasLocationPermission === 'denied' || !isFocused){
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
                                <View style={{marginBottom: 5}}>
                                    <Text style = {[Styles.station_name_text, {color:'grey'}]}>
                                        Loading...
                                    </Text>
                                </View>
                                
                                <View style = {[Styles.station_route_view, { backgroundColor: '#cfcfcf' }]}>
                                    <Text style = {Styles.station_route_text}>
                                        Loading...
                                    </Text>
                                </View>
                            </View>:
                            <View>
                                <View style={{marginBottom: 5}}>
                                    <Text style = {Styles.station_name_text} numberOfLines={2} ellipsizeMode='tail'>
                                        {stationInfo[stationGPS].station_name.en}
                                    </Text>
                                </View>
                                <View style = {[Styles.station_route_view, { backgroundColor: stationInfo[stationGPS].platform.color.path_color }]}>
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
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowOpacity: 0.15,
        shadowColor: "#000",
        shadowOffset: { //for ios
            width: 0,
            height: 3,
        },
        shadowRadius: 3, //for ios
        elevation: 3, //for android
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
        fontFamily: 'LINESeedSansApp-Bold',
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
        fontFamily: 'LINESeedSansApp-Regular',
    },
    station_route_view: {
        borderRadius: 15,
        marginTop: 2,
        paddingVertical: 5,
        width: 150,
        alignSelf: 'flex-end'
    },
    station_route_text:{
        color:'white', 
        fontSize: 15, 
        textAlign:'center',
        fontFamily: 'LINESeedSansApp-Bold',
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
        fontFamily: 'LINESeedSansApp-Regular',
    }
});

export default NextStation