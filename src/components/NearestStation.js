import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StationInfo from '../../data/station_info.json';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';

// TODO: change the default code
const NearestStation = ({code = 'N24'}) => {
  // const [location, setLocation] = useState(false);

  // useEffect(() => {
  //   const _watchId = Geolocation.watchPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       console.log("nearest st" + latitude + longitude);
  //       setLocation({latitude, longitude});
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 0,
  //       interval: 5000,
  //       fastestInterval: 2000,
  //     },
  //   );
  // });

  return (
    <View>
      <TouchableOpacity>
        <View style={styles.containerView}>
          <View style={{flex: 0.5, alignItems: 'flex-start'}}>
            <Text style={styles.nearestText}>Nearest</Text>
            <Text style={[styles.nearestText, {fontWeight: 'bold'}]}>
              Station
            </Text>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Text style={styles.stationNameText}>
              {StationInfo[code].station_name.en}
            </Text>
            <View style={styles.platformLineView}>
              {StationInfo[code].platform.platform == 'BTS' ? (
                <Text style={styles.platformLineText}>
                  {StationInfo[code].platform.platform} skytrain
                </Text>
              ) : (
                <Text style={styles.platformLineText}>
                  {StationInfo[code].platform.platform}
                </Text>
              )}
            </View>
            <View>
              {/* <Text>Latitude: {location.latitude}</Text>
              <Text>Latitude: {location.longitude}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    height: 90,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  platformLineView: {
    backgroundColor: '#77CC00',
    borderRadius: 20,
    marginTop: 5,
    height: 25,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 5},
  },
  nearestText: {
    fontSize: 20,
    fontFamily: 'LINE Seed Sans TH App',
    lineHeight: 30,
  },
  stationNameText: {
    fontSize: 20,
    fontFamily: 'LINE Seed Sans TH App',
  },
  platformLineText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'LINE Seed Sans TH App',
  },
});

export default NearestStation;
