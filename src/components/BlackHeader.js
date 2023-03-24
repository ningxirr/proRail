import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.screenNameView}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.screenNameText}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: 'Header',
};

const styles = StyleSheet.create({
  screenNameText: {
    fontSize: 24,
    color: 'white',
    marginLeft: (10),
    fontWeight: 'bold',
    fontFamily: 'LINE Seed Sans TH App',
  },
  screenNameView: {
    backgroundColor: 'black',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: (10),
    paddingBottom: (30),
  },
});

export default Header;
