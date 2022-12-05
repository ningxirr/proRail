"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Choices = (props) => {
    return(
      <TouchableOpacity style={Styles.choice_component_view} onPress={props.function}>
        <Text style={Styles.number_text}>{props.number}</Text>
        <Text style={Styles.unit_text}>{props.unit}</Text>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={[Styles.topic_text,{color:props.selected?'black':'#818181'}]}> 
            {props.choice}
          </Text>
          {props.selected?<View style={{borderBottomWidth:2, borderBottomColor:'black', width:screenWidth*0.15}}/>:null}
        </View>
      </TouchableOpacity>
    );
  }

const Styles = StyleSheet.create({
  choice_component_view: {
      width: screenHeight*0.17,
      height: screenHeight*0.17,
      marginHorizontal:screenWidth*0.01, 
      marginTop:screenHeight*0.02,
      backgroundColor: '#cdcdcd',
      borderRadius:10, 
      padding: screenHeight*0.015
  },
  number_text: {
      fontSize:screenHeight*0.042, 
      color:'black', 
      fontWeight:'500', 
      textAlign:'right'
  },
  unit_text: {
    fontSize:screenHeight*0.018, 
    color:'black', 
    textAlign:'right'
  },
  topic_text: {
    fontSize:screenHeight*0.018, 
    marginBottom:screenHeight*0.01, 
    textAlign:'left'
  }
});

export default Choices;