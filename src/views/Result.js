import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import NavBar from '../components/Result/navBar';
import Header from '../components/Result/Header/header';
import Body from '../components/Result/Body/body';

const Result = () => (
  <SafeAreaView style={pageStyles.container}>
   <NavBar />    
    <ScrollView>
      <Header />
      <Body />
    </ScrollView>
  </SafeAreaView>
);

const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Result;
