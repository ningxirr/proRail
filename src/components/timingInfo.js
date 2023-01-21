"use strict";

import React from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TimingInfo = (props) => {
  return (
    <View style={Styles.timing_view}>
        <View style={Styles.alignment_timing_view}>
        <Text style={Styles.frequency_text}>
            Frequency
        </Text>
        <View style={Styles.freq_min_view}>
            <Text style={Styles.frequency_num_text}>
            {props.frequency}
            </Text>
            <Text style={Styles.frequency_mins_text}>
            mins
            </Text>
        </View>
        </View>
        <View style={Styles.alignment_timing_view}>
        <TouchableOpacity onPress={props.function}>
            <View style={Styles.time_table_botton_view}>
            <Text style={Styles.time_table_botton_text}>
                Time Table
            </Text>
            </View>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  timing_view: {
    paddingVertical: screenHeight*0.02,
    paddingHorizontal: screenHeight*0.03,
    marginTop: '-15%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
  },
  frequency_text: {
    fontSize: screenHeight*0.017,
    fontFamily: 'LINESeedSans_A_Rg',
    marginBottom: screenHeight*0.005,
    color: 'black'
  },
  frequency_num_text: {
    fontSize: screenHeight*0.02,
    fontFamily: 'LINESeedSans_A_Rg',
    color: 'black'
  },
  frequency_mins_text: {
    fontSize: screenHeight*0.015,
    fontFamily: 'LINESeedSans_A_Rg',
    textAlignVertical: 'bottom',
    color: 'black'
  },
  freq_min_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time_table_botton_view:{
    backgroundColor: '#1C1C1C',
    paddingVertical: screenHeight*0.005,
    paddingHorizontal: screenHeight*0.015,
    borderRadius: 5,
  },
  time_table_botton_text:{
    color: 'white',
    fontSize: screenHeight*0.017,
    fontFamily: 'LINESeedSans_A_Rg',
  },
  alignment_timing_view: {
    alignSelf: 'center',
  }
});

export default TimingInfo;
