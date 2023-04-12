"use strict";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Choices = (props) => {
    return(
      <TouchableOpacity style={Styles.choice_component_view} onPress={props.function}>
        <View style={Styles.number_view}>
            <Text style={Styles.number_text}>{props.number}</Text>
            <Text style={Styles.unit_text}>{props.unit}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={[Styles.topic_text,{color:props.selected?'black':'#818181'}]}> 
            {props.choice}
          </Text>
          {props.selected?<View style={{borderBottomWidth:2, borderBottomColor:'black', width: 110}}/>:null}
        </View>
      </TouchableOpacity>
    );
  }

const Styles = StyleSheet.create({
  choice_component_view: {
      width: 150,
      height: 150,
      backgroundColor: '#D7D6D6',
      borderRadius:10, 
      padding: 15
  },
  number_view:{
      textAlign: 'right'
  },
  number_text: {
      fontSize: 36, 
      color:'black', 
      fontFamily: 'LINESeedSansApp-Bold',
      textAlign:'right'
  },
  unit_text: {
    fontSize: 16, 
    fontFamily: 'LINESeedSansApp-Bold',
    color:'black', 
    textAlign:'right'
  },
  topic_text: {
    fontSize: 14, 
    fontFamily: 'LINESeedSansApp-Regular',
    marginBottom: 5, 
    marginLeft: 5,
    textAlign:'left'
  }
});

export default Choices;