import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Image} from 'react-native';
import NextStation from '../../components/nextStation';
import AlertModel from '../../components/AlertModel';
import StationWithCode from '../../components/stationWithCode'
import Entypo from 'react-native-vector-icons/Entypo';

const {width, height} = Dimensions.get('window');
const image = require('../../../assets/images/choose-direction.png');

const moreInfo1 = require('../../../assets/images/moreInfo1.png');
const moreInfo2 = require('../../../assets/images/moreInfo2.png');

const HomeProRailScreen = ({route, navigation}) => {
  const [oriStation, setOriStation] = useState(null);
  const [destStation, setDestStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function checkCollectStation() {
    if (oriStation == null || destStation == null) {
      setModalVisible(true);
    } else {
      navigation.navigate('AddStopNavigator',{
        screen: 'ResultScreen',
        initial: false,
        params: {
          code: [oriStation, destStation]
        },
      });
    }
  }

  useEffect(() => {
    if(route.params?.code === undefined){
      setOriStation(null);
      setDestStation(null);
    }
    if (route.params?.num == 0) {
      setOriStation(route.params?.code);
    } else {
      setDestStation(route.params?.code);
    }
  }, [route.params]);

  const HEADER_HEIGHT = 0;

  return (
    <View style={{backgroundColor: '#F5F5F5', flex: 1}}>
      <AlertModel
        text={`You need to select the origin \n and destination first.`}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{flex: 1}} contentOffset={{ y: HEADER_HEIGHT }} showsVerticalScrollIndicator={false} bounces={false}>
        
        <ImageBackground source={image} style={styles.image} resizeMode='cover'>
          <Text style={styles.proRailText}>proRail</Text>
        </ImageBackground>
        
        <View style={{marginTop: -height*0.3,}}>
            <View style={{  marginHorizontal: '5%', marginVertical: 20}}>
              <NextStation 
                isNearestOnly={true}/>
            </View>

            <View style={styles.chooseDirView}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center'}}>
                <View style={{marginTop: 20}}>
                  <Text style={styles.chooseDirText}>{'Choose\nDirection'}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.add_stop_view}
                  onPress={() => {
                    console.log("oriStation " + oriStation)
                    navigation.navigate('AddStopNavigator', {
                      screen: 'AddStopScreen',
                      params: {directions: [oriStation, destStation]}
                    });
                  }}
                >
                  <Text style={styles.add_stop_text}>Add Stop</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.choseStTouch}
                  onPress={() => {
                    navigation.navigate('ChooseDirectionScreen', {
                      header: 'Choose Origin',
                      num: 0,
                      notSelectedStation: destStation ? [destStation] : [],
                    });
                  }}>
                  {
                    oriStation == null ? 
                    <Text style={styles.choseStText}>Origin</Text>:
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <StationWithCode code={oriStation}/>
                      <Entypo
                        name="cross"
                        size={20}
                        color="grey"
                        style={{ marginLeft: 'auto', marginRight: 5 }}
                        onPress={() =>{
                          setOriStation(null);
                        }}
                      />
                    </View>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.choseStTouch}
                  onPress={() => {
                    navigation.navigate('ChooseDirectionScreen', {
                      header: 'Choose Destination',
                      num: 1,
                      notSelectedStation: oriStation ? [oriStation] : [],
                      // oriStation: oriStation,
                      // destStation: destStation
                    });
                  }}>
                  {
                    destStation == null ? 
                    <Text style={styles.choseStText}>Destination</Text>:
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <StationWithCode code={destStation}/>
                      <Entypo
                        name="cross"
                        size={20}
                        color="grey"
                        style={{ marginLeft: 'auto', marginRight: 5}}
                        onPress={() =>{
                          setDestStation(null);
                        }}
                      />
                    </View>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.letsgoView}
                  onPress={() => {
                    checkCollectStation();
                  }}>
                  <Text style={styles.letsgoText}>Let's Go</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        <View style={{marginBottom: 20}}>
          <View style={styles.moreInfoSecView}>
            <Text style={styles.moreInfoText}>More Information</Text>
            <ScrollView horizontal={true} style={{marginLeft: 20}} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={styles.moreInfoInScrollTouch}
                onPress={() => navigation.navigate('AboutProRailScreen')}>
                  <ImageBackground source={moreInfo1} style={{height: '105%', width: '100%', justifyContent:'flex-end'}}>
                    <Text style={styles.moreInfoInScrollText}>
                      {'About\nproRail'}
                    </Text>
                  </ImageBackground>

              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moreInfoInScrollTouch}
                onPress={() => navigation.navigate('BTSFullScheduleScreen')}>
                  <ImageBackground source={moreInfo2} style={{height: '105%', width: '100%', justifyContent:'flex-end'}}>
                    <Text style={styles.moreInfoInScrollText}>
                      {'BTS\nSchedule'}
                    </Text>
                  </ImageBackground>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  proRailText: {
    fontSize: 36,
    flex: 1,
    color: 'white',
    marginTop: 25,
    padding: 20,
    fontFamily: 'LINESeedSansApp-Bold',
  },
  centerSecView: {
    flex: 5,
    justifyContent: 'center',
  },
  moreInfoSecView: {
    flex: 2,
    marginTop: 10,
    justifyContent: 'center',
  },
  moreInfoInScrollTouch: {
    backgroundColor: '#F2F2F2',
    width: 200,
    height: 140,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: 'black'
  },
  moreInfoText: {
    fontSize: 24,
    color: 'black',
    marginLeft: 25,
    marginVertical: 15,
    fontFamily: 'LINESeedSansApp-Bold',
  },
  chooseDirView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    height: 290,
  },
  chooseDirText: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'LINESeedSansApp-Bold',
    lineHeight: 30,
  },
  add_stop_view: {
    borderWidth: 1,
    borderColor: '#1C1C1C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_stop_text: {
    fontFamily: 'LINESeedSansApp-Regular',
    fontSize: 12,
    color: '#1C1C1C',
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  choseStTouch: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  letsgoView: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginHorizontal: 25,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  image: {
    height: height*0.6,
    width: width,
  },
  choseStText: {
    fontSize: 15,
    fontFamily: 'LINESeedSansApp-Regular',
    color: '#404040',
    paddingLeft: 10,
  },
  letsgoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'LINESeedSansApp-Regular',
  },
  moreInfoInScrollText: {
    margin: 10,
    fontSize: 20,
    color: 'white',
    fontFamily: 'LINESeedSansApp-Bold',
    lineHeight: 30,
  },
});

export default HomeProRailScreen;
