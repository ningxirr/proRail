"use strict";
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, PermissionsAndroid, PermissionsIOS, Platform, AppState } from 'react-native';
import { getDistance, findNearest } from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import stationInfo from '../../data/station_info'
import stationLocation from '../../data/station_location'
import { useIsFocused } from '@react-navigation/native';
import notifee from '@notifee/react-native';
import getDataFromAsyncStorage from '../function/getDataFromAsyncStorage';

const NextStation = (props) => {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    
    const [stationGPS, setStationGPS] = useState(props.beginingStation === undefined ? null : props.beginingStation); //set the station code of the nearest station
    const [stationDistance, setStationDistance] = useState(false); //set the distance between the nearest station and the user
    const [hasLocationPermission, setHasLocationPermission] = useState(null);
    const [canNoti, setCanNoti] = useState(null);
    const isFocused = useIsFocused();
    const filteredStation = props.isNearestOnly ? stationLocation : props.filteredStation;
    let stationInterchanges = props.stationInterchanges;
    const [firstInterchangeStation, setFirstInterchangeStation] = useState(null);
    const [lastInterchangeStation, setLastInterchangeStation] = useState(null);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
          });
          return () => {
            subscription.remove();
          };
    }, []);

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
            Geolocation.requestAuthorization('whenInUse').then((status) => setHasLocationPermission(status) )
        }
        else if(Platform.OS === 'android'){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => setHasLocationPermission(response));
        }
    }, [props.beginingStation, props.lastStation]);

    useEffect(() => {
        let _watchId;
        if (isFocused && canNoti !== null && hasLocationPermission === 'granted' && appStateVisible !== 'background') 
        {
          _watchId = Geolocation.watchPosition(
            position => {
                let nearest = findNearest(position.coords, filteredStation);
                let distance = getDistance(nearest, position.coords);
                setStationGPS(nearest.code);
                setStationDistance(distance);
                if (stationInterchanges !== undefined && canNoti !== null && firstInterchangeStation !== null && lastInterchangeStation !== null) {
                        if(stationInterchanges.includes(nearest.code)){
                            if(firstInterchangeStation === nearest.code){
                                onDisplayNotification(0, nearest.code);
                                stationInterchanges = stationInterchanges.filter((item) => item !== nearest.code);
                                props.setStationInterchanges(stationInterchanges);
                            }
                            else if(lastInterchangeStation === nearest.code && distance < 5000){
                                onDisplayNotification(2, nearest.code);
                                stationInterchanges = stationInterchanges.filter((item) => item !== nearest.code);
                                props.setStationInterchanges(stationInterchanges);
                            }
                            else if (distance < 5000){
                                onDisplayNotification(1, nearest.code);
                                stationInterchanges = stationInterchanges.filter((item) => item !== nearest.code);
                                props.setStationInterchanges(stationInterchanges);
                            }
                        }  
                } 
                },
                error => {
                console.log(error);
                },
                {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 10000,
                fastestInterval: 10000,
                showsBackgroundLocationIndicator: true
                },
            );
        }
        
        return () => {
          if (_watchId) {
            Geolocation.clearWatch(_watchId);
          }
        };

      }, [isFocused, filteredStation, canNoti, hasLocationPermission, firstInterchangeStation, lastInterchangeStation]); 

      useEffect(() => {
        if (appStateVisible === 'background' && props.isNearestOnly && isFocused) {
            console.log("ning ")
            Geolocation.stopObserving();
        }
      }, [appStateVisible])

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
            body: type === 0 ? `Get on the Train at ${stationInfo[code].platform.platform} ${stationInfo[code].station_name.en} (${stationInfo[code].platform_line}).` 
                : type === 1 ? `Next Station is INTERCHANGE Station. Get on the train at ${stationInfo[code].platform.platform} ${stationInfo[code].station_name.en} (${stationInfo[code].platform_line}).` 
                : `Next Station is your DESTINATION: ${stationInfo[code].platform.platform} ${stationInfo[code].station_name.en} (${stationInfo[code].platform_line}).`,
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

    if(hasLocationPermission !== 'granted' || !isFocused){
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
                                    <Text style = {[Styles.station_route_text, {fontSize: 10, fontFamily: 'LINESeedSansApp-Regular', marginLeft: 5}]}>
                                        ({stationInfo[stationGPS].platform_line})
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
        shadowOpacity: 0.08,
        shadowColor: "#000",
        shadowOffset: { //for ios
            width: 0,
            height: 6,
        },
        shadowRadius: 6, //for ios
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
        paddingVertical: 3,
        width: 150,
        alignItems: 'baseline',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
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