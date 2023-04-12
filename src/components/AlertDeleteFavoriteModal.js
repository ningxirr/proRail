import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import stationInfo from '../../data/station_info.json';
import storeDataToAsyncStorage from '../function/storeDataToAsyncStorage';

const AlertDeleteFavoriteModel = ({setFavaoriteRoute, favoriteRoute, modalVisible, setModalVisible, stationList}) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[
            styles.centeredView,
            modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
          ]}>
          <View style={styles.modalView}>
            <View style={styles.warningView}>
              <Text style={styles.warningText}>Delete your favorite route</Text>
              <View style={{marginVertical:8, borderWidth:1, borderColor: '#EBEBEB', width: '100%'}}/>
              <Text style={styles.detailText}>
                Your following favorite route will be deleted.
              </Text>
            </View>
            
            <View style = {styles.next_station_view}>
              <Text style = {styles.next_station_text}>
                  {stationInfo[stationList[0]].station_name.en}
              </Text>
              <Text style = {styles.next_station_text} numberOfLines={1}>
                  &gt; {stationInfo[stationList[stationList.length-1]].station_name.en}
              </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 2}}>
              {
                stationList.map((station, index) => (
                    <View key={index} style= {[styles.route_view ,{backgroundColor: stationInfo[station].platform.color.path_color}]}>
                        <Text style = {[styles.route_text]} numberOfLines={1}>
                            {stationInfo[station].station_name.en}
                        </Text>
                    </View>
                ))
              }
              </View>
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.discardText}>Discard</Text>
              </Pressable>
              <Pressable
                style={styles.buttonConfirm}
                onPress={() =>{
                  const remainingRoute = favoriteRoute.filter((route) => route !== stationList.join('-'));
                  console.log('****************')
                  console.log(remainingRoute)
                  console.log('****************')
                  setFavaoriteRoute(remainingRoute);
                  storeDataToAsyncStorage('@favorite', [...remainingRoute].reverse());
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'center',
    margin: (20),
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: (2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonConfirm: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '49%',
  },
  buttonClose: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '49%',
  },
  confirmText:{
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'white',
  },
  discardText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
  },
  warningText: {
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
    fontSize: 20
  },
  warningView: {
    alignItems: 'flex-start',
  },
  detailText: {
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
    fontSize: 14,
  },
  next_station_view: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    borderColor: '#E4E4E4',
    borderWidth: 2
  },
  next_station_text: {
    color:'black', 
    fontSize: 14, 
    fontFamily: 'LINESeedSansApp-Bold',
    marginVertical: 2,
  },
  route_view: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  route_text: {
    color:'#FFFFFF',
    fontSize: 10,
    fontFamily: 'LINESeedSansApp-Regular',
},
});


export default AlertDeleteFavoriteModel;
