
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import NextStation from '../../nextStation';
import StartAndEndRoute from './startAndEndRoute';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const navigate = true;

const Header = () => {
    return (
      <View>
        <ImageBackground  source={require('../../../../assets/images/background.png')}>
          <View style = {{backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <View style = {navigate ? Styles.header_view: Styles.header_no_navigate_view}>
              <View style = {Styles.header_body_view}>
                <NextStation stationName = {'Bang Wa'} stationPlatform = {'MRT'} stationColor = {'#325E9A'} backgroundColor={'#595959'} navigate={navigate}/>
                <Text style = {{color:'white', fontSize: screenHeight * 0.038, fontWeight:'bold'}}>
                  Result
                </Text>
                <View style = {Styles.start_and_end_route_view}>
                  <StartAndEndRoute stationName = {'Bangkhae'} stationPlatform = {'BTS skytrain'} stationColor = {'#325E9A'}/>
                  <Text style = {{color:'white', fontSize: screenHeight * 0.020, fontWeight:'normal'}}>
                    to
                  </Text>
                  <StartAndEndRoute stationName = {'Siam'} stationPlatform = {'MRT'} stationColor = {'#76B729'}/>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const Styles = StyleSheet.create({
    header_view: {
      width: screenWidth,
      height: screenHeight*0.48,
      paddingHorizontal: screenWidth*0.005,
      paddingVertical: screenHeight*0.03,
    },
    header_no_navigate_view: {
      width: screenWidth,
      height: screenHeight*0.35,
      paddingHorizontal: screenWidth*0.005,
      paddingVertical: screenHeight*0.01,
    },
    header_body_view:{
      paddingHorizontal: '5%',
    },
    start_and_end_route_view: {
      width: '100%',
      paddingVertical: '8%',
      paddingHorizontal: screenHeight*0.015,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  });

  export default Header;