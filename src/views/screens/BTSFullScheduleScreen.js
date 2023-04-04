import {View, Image, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import {ScrollView} from 'react-native-gesture-handler';
import GestureHandler, { PinchGestureHandler, State } from 'react-native-gesture-handler'

const screen = Dimensions.get('window');

const image = require('../../../assets/images/ServiceTimetable.png');

const BTSFullScheduleScreen = ({navigation}) => {
  scale = new Animated.Value(1);

  onPinchEvent = Animated.event([{ nativeEvent: { scale: this.scale } }], {
    useNativeDriver: true,
  });

  onPinchStateChange = (event) => {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 1,
      }).start();
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
      <View style={{backgroundColor: '#FAFAFA', marginBottom: (65)}}>
        <Header haveBackIcon={true} title={'BTS Full Schedule'} function={()=>navigation.goBack()}/>
        <ScrollView>
          <View style={{margin: (10)}}>
            <View style={styles.imageView}>
              {/* <Image source={image} style={styles.fullPicture} /> */}
              <PinchGestureHandler
                onGestureEvent={this.onPinchEvent}
                onHandlerStateChange={this.onPinchStateChange}
              >
                <Animated.Image
                  source={image}
                  style={[
                    // styles.image,
                    styles.fullPicture,
                    {
                      transform: [{ scale: this.scale }],
                    },
                  ]}
                  resizeMode="contain"
                />
              </PinchGestureHandler>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullPicture: {
    width: undefined,
    height: undefined,
    aspectRatio: 4.5 / 15,
  },
  imageView: {
    padding: 5,
    marginBottom: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 30
  },
});

export default BTSFullScheduleScreen;
