"use strict";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

const Result = () => {
  return (
    <SafeAreaView style={pageStyles.container}>
      <ScrollView>
        <Text>
            test123456
        </Text>
        <Text>
            test123456
        </Text>
        <Text>
            test123456
        </Text>
        <Text>
            test123456
        </Text>
        <Text>
            test123456
        </Text>
        <Text>
            test123456
        </Text>
        <Text>
            test123456
        </Text>
      </ScrollView>
    </SafeAreaView>
)};

const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Result;
