"use strict";

import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions} from 'react-native';
import CustomButton from '../components/customButton';

const screenWidth = Dimensions.get('window').width;

const Welcome = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/images/rocket.jpg')} resizeMode="cover" style={styles.image} ></ImageBackground>
      <View style={styles.body}>
        <Text style={{fontSize: 32, fontFamily: 'LINESeedSans_A_Bd', color:'#000000'}}>Welcome to</Text>
        <Text style={{fontSize: 64, fontFamily: 'LINESeedSans_A_Bd', color:'#000000'}}>proRail</Text>
        <Text style={{paddingTop: 10,fontSize: 20, fontFamily: 'LINESeedSans_A_Bd', color:'#000000'}}>Suggested the</Text>
        <Text style={{fontSize: 20, fontFamily: 'LINESeedSans_A_Bd', color:'#000000'}}>best route for you</Text>
      </View>
      <View style={styles.footer}>
        <CustomButton 
          text="Let's go" 
          backgroundColor={'#000000'} 
          textColor={'#FFFFFF'} 
          width={screenWidth*0.9} 
          function={()=>{
            props.navigation.navigate('Regist', {
              routes: props.routes 
        })
        console.log('Let\'s go!');
        }}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  body: {
    paddingLeft: 20,
    justifyContent: 'center'
  },
  footer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    right:-200,
    bottom:-260,
    height: 800,
    width: 300
  }
})

export default Welcome;
