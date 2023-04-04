"use strict";

import React from 'react';
import {  StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TimingInfo = (props) => {
  return (
    <View style={Styles.timing_view}>
        <View style={Styles.alignment_timing_view}>
        <Text style={Styles.frequency_text}>
            Frequency
        </Text>
        <View style={Styles.freq_min_view}>
            <Text style={Styles.frequency_num_text}>
            {/* {props.frequency} */}
            5
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
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    fontSize: 14,
    fontFamily: 'LINESeedSansApp-Regular',
    marginBottom: 5,
    color: 'black'
  },
  frequency_num_text: {
    fontSize: 20,
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black'
  },
  frequency_mins_text: {
    paddingLeft: 5,
    fontSize: 12,
    fontFamily: 'LINESeedSansApp-Regular',
    textAlignVertical: 'bottom',
    color: 'black'
  },
  freq_min_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time_table_botton_view:{
    backgroundColor: '#1C1C1C',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  time_table_botton_text:{
    color: 'white',
    fontSize: 16,
    fontFamily: 'LINESeedSansApp-Regular',
  },
  alignment_timing_view: {
    alignSelf: 'center',
  }
});

export default TimingInfo;
