import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import StationInfo from '../../data/station_info.json';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const SelectedStationModal = ({code, modalVisible, setModalVisible, num, notSelectedStation}) => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (confirm) {
      navigation.navigate({
        name: chooseScreenNameToNavigate(),
        params: {
          code: code,
          num: num
        },
        merge: true,
      });
      setConfirm(null);
      setModalVisible(false);
    } else {
      setConfirm(null);
      setModalVisible(false);
    }
  }, [confirm]);

  function chooseScreenNameToNavigate() {
    const routes = navigation.getState()?.routes;
    if (routes[0].name == 'StationInformationListScreen') {
      // EachStationInfoScreen
      return 'StationInformationScreen';
    } else if (routes[0].name == 'AddStopScreen') {
      return 'AddStopScreen';
    }
    return routes[routes.length - 2].name;
  }

  return (
    <View>
      <BlurView
        blurType={modalVisible ? 'light' : 'dark'}
        blurAmount={modalVisible ? 10 : 0}>
        {modalVisible && (
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
              <View style={[styles.modalView]}>
                <View style={{flex:1, justifyContent: 'center', marginLeft: 5, }}>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'baseline'}}>
                    <Text style={styles.stationText}>
                      {StationInfo[code].station_name.en}
                    </Text>
                  </View>
                  
                  <View
                    style={[
                      styles.platformView, 
                      {
                        backgroundColor:
                          StationInfo[code].platform.color.path_color,
                      },
                    ]}>
                    <Text style={styles.platformText}>
                      {StationInfo[code].platform.platform}
                    </Text>
                  </View>

                </View>

                <View style={styles.bottonsView}>
                  {
                    notSelectedStation !== undefined && notSelectedStation.includes(code) ? 
                    null :
                    <TouchableOpacity
                      style={[styles.buttonView, {backgroundColor: '#000000'}]}
                      onPress={() => {
                        setConfirm(true);
                      }}>
                      <Text style={[styles.bottonText, {color: '#FFFFFF'}]}>
                        Confirm
                      </Text>
                    </TouchableOpacity> 
                  }
                  

                  <TouchableOpacity
                    style={[
                      styles.buttonView,
                      {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#000000',
                        borderWidth: 1,
                      },
                    ]}
                    onPress={() => {
                      setConfirm(false);
                    }}>
                    <Text style={[styles.bottonText, {color: '#000000'}]}>
                      Discard
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </BlurView>
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
    margin: 20,
    backgroundColor: 'white',
    height: (180),
    width: (325),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  stationText: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 25,
    fontFamily: 'LINESeedSansTHApp-Regular',
    color: '#000000',
    lineHeight: 30,
  },
  platformView: {
    borderRadius: 100,
    padding: (3),
    marginLeft: (15),
    marginVertical: 5,
    width: '40%',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 2},
  },
  platformText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'LINESeedSansTHApp-Regular',
  },
  buttonView: {
    borderRadius: 10,
    height: '62%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottonText: {
    fontSize: 14,
    fontFamily: 'LINESeedSansTHApp-Regular',
  },
  bottonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 5
  }
});

export default SelectedStationModal;
