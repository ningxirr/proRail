"use strict";

import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, ImageBackground, Dimensions} from 'react-native';
import CustomButton from '../components/customButton';

const screenWidth = Dimensions.get('window').width;

const Regist = (props) => {
  const [text, onChangeText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/images/rocket.jpg')} resizeMode="cover" style={styles.image} ></ImageBackground>
      <View style={styles.body}>
        <Text style={{fontSize: 64, color:'#000000',fontFamily: 'LINESeedSans_A_Bd',}}>Hello</Text>
        <Text style={{fontSize: 24, color:'#000000', fontFamily: 'LINESeedSans_A_Bd',}}>How can we call you ?</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Name"
            placeholderTextColor='black'
        />
      </View>
      <View style={styles.footer}>
      <CustomButton 
          text="Next" 
          backgroundColor={'#000000'} 
          textColor={'#FFFFFF'} 
          width={screenWidth*0.9} 
          function={()=>{
            props.navigation.navigate('Choose', {
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
    justifyContent: 'flex-start',
    paddingTop: 200,
    paddingLeft: 20
  },
  footer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'flex-end'
  },
  input: {
    fontFamily: 'LINESeedSans_A_Bd',
    height: 45,
    width: 241,
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'whitesmoke'
  },
  button: {
    height: 45,
    width: 358,
    borderRadius: 10,
    backgroundColor: 'black'
  },
  image: {
    flex: 1,
    right:-200,
    bottom:-15,
    height: 800,
    width: 300
  },
})

export default Regist;
