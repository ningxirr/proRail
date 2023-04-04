import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import StationList from './StationList';
import StationInfo from '../../data/station_info.json';

const AllStationsSearchList = ({searchPhrase, setClicked, num, notSelectedStation}) => {
  const stationsCode = Object.keys(StationInfo);
  const renderItem = ({item, index}) => {
    if (searchPhrase == '') {
      return <StationList key={index} code={item} num={num} notSelectedStation={notSelectedStation} />;
    } 
    else if (StationInfo[item].station_name.en.toUpperCase().includes(searchPhrase.toUpperCase())) {
      return <StationList key={index} code={item} num={num} notSelectedStation={notSelectedStation}/>;
    } 
    else if (StationInfo[item].station_name.th.toUpperCase().includes(searchPhrase.toUpperCase())) {
      return <StationList key={index} code={item} num={num} notSelectedStation={notSelectedStation}/>;
    } 
    else if (item.toUpperCase().includes(searchPhrase.toUpperCase())) {
      return <StationList key={index} code={item} num={num} notSelectedStation={notSelectedStation}/>;
    }
  };

  return (
    <BottomSheetFlatList
      contentContainerStyle={{paddingBottom: 20}}
      data={stationsCode}
      renderItem={renderItem}
      keyExtractor={index => {
        return index.toString();
      }}
    />
  );
};

export default AllStationsSearchList;
