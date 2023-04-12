import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import platformLineStationInfo from '../../data/platform_line_station_info.json';
import StationList from './StationList';

const platformLineStationsList = JSON.parse(
  JSON.stringify(platformLineStationInfo),
);
const platformsData = Object.entries(platformLineStationsList).map(
  ([platformId, platformData]) => platformData,
);

const AllStationsInfoList = () => {
  const [platformTab, setPlatformTab] = useState(0);
  const [platformLineTab, setPlatformLineTab] = useState(0);
  // Keyboard.dismiss();
  useEffect(() => {
    setPlatformLineTab(0);
  }, [platformTab]);

  return (
    <View>
      {/* shows platform */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.platformScrollView}>
        {platformsData.map((platform, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setPlatformTab(index);
            }}>
            <View
              style={
                platformTab == index
                  ? [styles.platformView, {backgroundColor: 'black'}]
                  : [styles.platformView, {backgroundColor: 'white'}]
              }>
              <Text
                style={{
                  color: platformTab == index ? 'white' : 'black',
                  fontSize: 16,
                  fontFamily: 'LINESeedSansApp-Regular',
                  textAlign: 'center',
                }}>
                {Object.values(platform.platform_name.name_en)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* shows platform line */}
      <ScrollView horizontal={true} style={styles.platformLineScrollView}>
        {Object.values(platformsData[platformTab].platform_line).map(
          (line, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {platformLineTab
                setPlatformLineTab(index);
              }}>
              <View
                style={
                  platformLineTab == index
                    ? styles.platformLineView
                    : styles.inplatformLineView
                }>
                <Text
                  style={[
                    styles.platformLineText,
                    {color: platformLineTab == index ? 'black' : '#B4B4B4'},
                  ]}>
                  {line.name_en}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>

      {/* shows station */}
      {/* <View style={{height: 350, paddingBottom: 200}}> */}
        <BottomSheetScrollView>
          {platformsData[platformTab].platform_line[platformLineTab] ==
          undefined
            ? platformsData[platformTab].platform_line[0].stations.map(
                (code, index) => <StationList key={index} code={code} />,
              )
            : platformsData[platformTab].platform_line[
                platformLineTab
              ].stations.map((code, index) => (
                <StationList key={index} code={code} />
              ))}
        </BottomSheetScrollView>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  platformLineScrollView: {
    marginLeft: (20),
    marginTop: (5),
  },
  platformScrollView: {
    width: '100%',
    marginLeft: (20),
  },
  platformView: {
    height: 40,
    paddingHorizontal: (10),
    borderRadius: (15),
    marginBottom: 5,
    marginRight: 5,
    justifyContent: 'center'
  },
  platformLineView: {
    textDecorationLine: 'underline',
    borderColor: '#000000',
    borderBottomWidth: 3,
    marginBottom: (10),
    marginRight: (12),
  },
  inplatformLineView: {
    marginRight: (12),
    marginBottom: (10),
  },
  platformLineText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'LINESeedSansApp-Regular',
  },
});

export default AllStationsInfoList;
