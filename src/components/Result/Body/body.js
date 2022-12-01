"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import Route from './Route';
import RecommendedRoute from './recommendedRoute';
import Choices from './Choices';
import CustomButton from '../../customButton';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Body = () => {
  return(
    <View>
      {/* RecommendedRoute */}
      <View style ={{ marginTop: -screenHeight*0.1 }}>
        <View style={Styles.recommended_route_view}>
          <RecommendedRoute topic = {'Times'} number = {'36'} unit = {'mins'} />
          <RecommendedRoute topic = {'Interchange'} number = {'1'} unit = {'station(s)'}/>
          <RecommendedRoute topic = {'Price'} number = {'65'} unit = {'baht'}/>
        </View>
      </View>

      <View style = {Styles.body_view}>
        <Text style = {Styles.route_text}>
          Route
        </Text>
      </View>

      <Route moreDetail={true}/>

      {/* Button */}
      <View style = {Styles.body_view}>
        <CustomButton text={'Show More'} backgroundColor={'white'} borderColor={'black'} textColor={'black'} function={()=>console.log('Show More')}/>
        <CustomButton text={'Confirm'} backgroundColor={'black'} borderColor={'black'} textColor={'white'} function={()=>console.log('Confirm')}/>
      </View>

      {/* MoreChoice */}
      <View style={Styles.more_choice_component_view}>
        <Text style={Styles.more_choice_text}>
          More Choices
        </Text>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
          <View style={{margin:screenWidth*0.02}}/>
          <Choices number={28} unit={'mins'} choice={'Fastest'} selected={true}/>
          <Choices number={35} unit={'baht'} choice={'Chepest'} selected={false}/>
          <Choices number={1} unit={'station(s)'} choice={'Least\nInterchange'} selected={false}/>
          <View style={{margin:screenWidth*0.02}}/>
        </ScrollView>
      </View>

    </View>
    
  );
};

const Styles = StyleSheet.create({
  body_view: {
    width: '100%',
    paddingTop: '3%',
    paddingHorizontal: '5%',
  },
  recommended_route_view: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: '7%', 
    paddingVertical: screenHeight*0.019,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  route_text: {
    color:'black', 
    fontSize: screenHeight*0.025, 
    fontWeight:'500'
  },
  more_choice_component_view: {
    width: screenWidth,
    marginTop: screenHeight*0.03,
    marginBottom: screenHeight*0.05,
    borderTopColor:'#E4E4E4',
    borderTopWidth:1,
  },
  more_choice_text: {
    fontSize:screenHeight*0.036, 
    color:'black', 
    fontWeight:'bold', 
    paddingHorizontal: '5%'
  },
});

export default Body;