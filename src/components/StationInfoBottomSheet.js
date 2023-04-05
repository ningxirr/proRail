import React, {useMemo, useRef, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import platformLineStationInfo from '../../data/platform_line_station_info.json';
import StationList from './StationList';

import NextStation from '../components/nextStation';
import AllStationsSearchList from '../components/AllStationsSearchList';

const platformLineStationsList = JSON.parse(
  JSON.stringify(platformLineStationInfo),
);
const platformsData = Object.entries(platformLineStationsList).map(
  ([platformId, platformData]) => platformData,
);

const StationInfoBottomSheet = ({ clicked, searchPhrase, setClicked, memoScale, num, notSelectedStation, setFullScreenMap }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => memoScale, []);
  
  const handleSheetChange = useCallback((index) => {
    if(index === 0) setFullScreenMap(true);
    else setFullScreenMap(false);
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const [platformTab, setPlatformTab] = useState(0);
  const [platformLineTab, setPlatformLineTab] = useState(0);
  useEffect(() => {
    setPlatformLineTab(0);
  }, [platformTab]);
  useEffect(() => {
    if(clicked) handleSnapPress(2);
    else handleSnapPress(1);
  }, [clicked])

  return (
      <BottomSheet 
        ref={bottomSheetRef} 
        index={1} 
        snapPoints={snapPoints} 
        onChange={handleSheetChange} 
        overDragResistanceFactor={10}
        handleComponent={() => <></>}
        enableOverDrag={false}
        style={Styles.bottom_sheet}
        >
          <View style={{marginHorizontal: '5%', marginVertical: 20, marginBottom: 25}}>
            <NextStation isNearestOnly={true}/>
          </View>
            {
              clicked ? 
              <AllStationsSearchList searchPhrase={searchPhrase} setClicked={setClicked} num={num} notSelectedStation={notSelectedStation}/>
              : 
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
                  {
                    Object.values(platformsData[platformTab].platform_line).map((line, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {platformLineTab
                          setPlatformLineTab(index);
                        }}>
                        <View style={ platformLineTab == index ? styles.platformLineView : styles.inplatformLineView }>
                          <Text
                            style={[
                              styles.platformLineText,
                              {color: platformLineTab == index ? 'black' : '#B4B4B4'},
                            ]}>
                            {line.name_en}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  )}
                </ScrollView>
              </View>
            }
            {
              clicked ?
              null:
              <BottomSheetScrollView contentContainerStyle={{paddingBottom: 20}}>
                {platformsData[platformTab].platform_line[platformLineTab] == undefined
                  ? platformsData[platformTab].platform_line[0].stations.map((code, index) => 
                      <StationList key={index} code={code} num={num} notSelectedStation={notSelectedStation}/>
                    )
                  : platformsData[platformTab].platform_line[platformLineTab].stations.map((code, index) => (
                      <StationList key={index} code={code} isSiamSukhumvit={platformTab === 0 && platformLineTab === 0 && code==='CEN'} num={num} notSelectedStation={notSelectedStation}/>
                    ))}
              </BottomSheetScrollView>
            }
      </BottomSheet>
  );
};

const Styles = StyleSheet.create({
  bottom_sheet: {
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  }
});

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

export default StationInfoBottomSheet;
