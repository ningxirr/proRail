import {View, Text, StyleSheet, ImageBackground, Image, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/header';

const firstImg = require('../../../assets/images/AboutProRail1.png');
const lastImg = require('../../../assets/images/AboutProRail2.png');

const diagnostic = require('../../../assets/images/icons/001-diagnostic.png');
const coding = require('../../../assets/images/icons/002-coding.png');
const navigations = require('../../../assets/images/icons/003-gps-navigation.png');
const effort = require('../../../assets/images/icons/004-effort.png');

const AboutProRailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
      <View style={{backgroundColor:'white', position:'relative'}}>
        <View>
        <ScrollView contentContainerStyle={{alignItems: 'center', marginTop: 100}}>
            <Image source={firstImg} style={styles.firstImage} />
            <View style={styles.objectiveContainerView}>
                <View style={{margin: 10}}>
                    <Text style={styles.objectiveHeaderText}>Objectives</Text>
                    <View style = {{ borderWidth: 0.6, borderColor:'black',margin:15 }} />
                </View>
                
                <View style={styles.deatilAndIconView}>
                    <View style={styles.iconView}>
                        <Image source={diagnostic} style={{width: 45, height: 45}}/>
                    </View>
                    <View style={{flex: 6}}>
                        <Text style={styles.objectiveDetailText}>{'Recommend a \nPreferred Route'}</Text>
                    </View>
                    
                </View>
                <View style={styles.deatilAndIconView}>
                    <View style={styles.iconView}>
                        <Image source={coding} style={{width: 40, height: 35}} />
                    </View>
                    <View style={{flex: 6}}>
                        <Text style={styles.objectiveDetailText}>Develop the {'\n'}mobile application</Text>
                    </View>
                </View>
                <View style={styles.deatilAndIconView}>
                    <View style={styles.iconView}>
                        <Image source={navigations} style={{width: 30, height: 30}} />
                    </View>
                    <View style={{flex: 6}}>
                        <Text style={styles.objectiveDetailText}>Develop the {'\n'}navigation system</Text>
                    </View>
                    
                </View>
                <View style={styles.deatilAndIconView}>
                    <View style={styles.iconView}>
                        <Image source={effort} style={{width: 40, height: 40}} />
                    </View>
                    <View style={{flex: 6}}>
                        <Text style={styles.objectiveDetailText}>Evaluate results {'\n'}and performance</Text>
                    </View>
                </View>
            </View>

            <Image source={lastImg} style={styles.lastImg}/>
        </ScrollView>
        </View>
        
        <View style={{position: 'absolute', width: '100%'}}>
          <Header haveBackIcon={true} title={'About'} function={()=>navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  firstImage: {
    width: 500,
    height: 400,
    marginTop: -80
  },
  lastImg: {
    width: 500,
    height: 400,
    marginTop: -40
  },
  objectiveContainerView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 20,
    height: 370,
    marginTop: -250
  },
  objectiveHeaderText: {
    fontSize: 24,
    fontFamily: 'LINESeedSansApp-Bold',
    color: 'black',
    marginLeft: 20
  },
  objectiveDetailText: {
    fontSize: 14,
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
    marginBottom: 10,
  },
  deatilAndIconView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconView: {
    flex: 3,
    alignItems: 'center'
  },
  iconImg: {
    width: 40,
    height: 40
  },
});

export default AboutProRailScreen;