"use strict";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import NavBar from '../components/navBar';
import Header from '../components/Result/header';
import Body from '../components/Result/body';

const Result = (props) => {
  const [header, setHeader] = useState('Result');
  return (
    <SafeAreaView style={pageStyles.container}>
      {console.log(props.route.params === undefined)}
      <ScrollView>
        <Header header={props.route.params === undefined ? header : 'Favorite Route'} />
        <Body changeHeader={header => setHeader(header)} favRoute={props.route.params} navigate={props.navigation}/>
      </ScrollView>
    </SafeAreaView>
)};

const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Result;
