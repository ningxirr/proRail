"use strict";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import AllRoute from './allRoute';
import RecommendedRoute from './recommendedRoute';
import Choices from './Choices';
import CustomButton from '../../customButton';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Body = (props) => {
  const [path, setPath] = useState('Fastest');
  const [choice, setMoreChoice] = useState(true);
  return(
    <View>
      {/* RecommendedRoute */}
      <View style ={[{ marginTop: -screenHeight*0.08 }, Styles.recommended_route_with_summary_view]}>
        <RecommendedRoute/>
      </View>

      <View style = {Styles.select_choice_view}>
        <CustomButton   
          text={'Recommended'}
          backgroundColor={choice? 'black': 'white'} 
          borderColor={choice? 'white': 'black'} 
          textColor={choice? 'white': 'black'} 
          width = {'49%'}
          function={()=> {
            props.changeHeader('Fastest')
            setMoreChoice(true)
            setPath('Fastest')
          }}/>
        <CustomButton  
          text={'More Choices'} 
          backgroundColor={choice? 'white': 'black'} 
          borderColor={choice? 'black': 'white'} 
          textColor={choice? 'black': 'white'} 
          width = {'49%'}
          function={()=> {
            props.changeHeader('Cheapest')
            setMoreChoice(false)
            setPath('Cheapest')
          }}/>
      </View>

      {/* MoreChoice */}
      {
        choice? null:
        <View style={Styles.more_choice_component_view}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{margin:screenWidth*0.02}}/>
            <Choices number={35} unit={'baht'} choice={'Cheapest'} selected={path==='Cheapest'} recommended={false} function={()=> {
                props.changeHeader('Cheapest')
                setPath('Cheapest')
              }}/>
            <Choices number={1} unit={'station(s)'} choice={'Least\nInterchanges'} recommended={false} selected={path==='Least Interchanges'} function={()=> {
                props.changeHeader('Least Interchanges')
                setPath('Least Interchanges')
              }}/>
            <View style={{margin:screenWidth*0.02}}/>
          </ScrollView>
        </View>
      }
      <AllRoute moreDetail={true} path={path}/>
      <View style = {Styles.overall_component_view}>
        <View style = {Styles.body_view}>
            <CustomButton 
                text={'Confirm'} 
                backgroundColor={'black'} 
                borderColor={'black'} 
                textColor={'white'} 
                width = {'100%'}
                function={()=>{
                    props.navigate.navigate('Navigate')
                    console.log('Confirm');
                }}/>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  overall_component_view: {
    marginHorizontal :screenHeight*0.025,
  },
  select_choice_view: {
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recommended_route_with_summary_view:{
    width: '90%',
    marginHorizontal: screenWidth*0.05,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  recommended_route_view: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: '10%', 
    paddingVertical: screenHeight*0.019,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  all_route_summary_view:{
    padding: '2.5%',
    flexDirection: 'row',
  },
  summary_text:{
    fontSize: screenHeight*0.016,
    fontFamily: 'LINESeedSans_A_Rg',
    textAlign: 'center',
  },
  route_text: {
    color:'black', 
    fontSize: screenHeight*0.025, 
    fontFamily: 'LINESeedSans_A_Bd'
  },
  more_choice_component_view: {
    width: screenWidth,
    marginBottom: screenHeight*0.02
  },
  more_choice_text: {
    fontSize:screenHeight*0.036, 
    color:'black', 
    fontFamily: 'LINESeedSans_A_Bd',
    paddingTop: '5%',
    paddingHorizontal: '5%'
  },
  body_view: {
    paddingVertical: '2%'
  },
});

export default Body;