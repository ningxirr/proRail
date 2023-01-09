"use strict";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import NavBar from '../components/Result/navBar';
import Header from '../components/Result/Header/header';
import Body from '../components/Result/Body/body';

const Result = ({navigation}) => {
  const [header, setHeader] = useState('Result');
  return (
    <SafeAreaView style={pageStyles.container}>
      <ScrollView>
        <Header header={header} />
        <Body changeHeader={header => setHeader(header)} navigate={navigation}/>
      </ScrollView>
    </SafeAreaView>
)};

const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Result;
