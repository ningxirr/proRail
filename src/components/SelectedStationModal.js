import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import StationInfo from '../../data/station_info.json';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const SelectedStationModal = ({code, modalVisible, setModalVisible, num,  notSelectedStation}) => {
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
                <View style={styles.head_station_info_view}>
                  <View style={{flex: 2, flexWrap: 'wrap', flexDirection: 'row'}}>
                    <Text style={styles.station_text} ellipsizeMode='tail' numberOfLines={StationInfo[code].station_name.en.indexOf(' ') >= 0 ? 2 : 1}>
                      {StationInfo[code].station_name.en}
                    </Text>
                  </View>
                  <View style={{flex: 1.5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={[styles.code_platform_view, {backgroundColor:StationInfo[code].platform.color.path_color}]}>
                      <Text style={styles.code_text}>{code}</Text>
                    </View>
                    <View style={[styles.code_platform_view, {backgroundColor:'white', borderColor: StationInfo[code].platform.color.path_color, borderWidth: 1}]}>
                      <Text style={[styles.code_text, {color: StationInfo[code].platform.color.path_color}]}>
                        {StationInfo[code].platform.platform}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{height: 1, backgroundColor: '#EBEBEB', paddingHorizontal: 8}}/>

                <View style={styles.add_to_view}>
                  <Text style={styles.add_to_text}>
                    {
                      navigation.getState()?.routes[0].name === 'StationInformationListScreen' ?
                      'View This Station Information' : 
                      notSelectedStation !== undefined && notSelectedStation.includes(code) ? 
                      'You cannot select the same station \nconsecutively in your route.' :
                      navigation.getState()?.routes[0].name === 'AddStopScreen' ?
                      num === 0 ? 'Select this station as your origin.':
                      num === 4 ? 'Select this station as your destination.':
                      'Select this station as your stop.' :
                      num === 0 ? 'Select this station as your origin.': 'Select this station as your destination.'
                    }
                  </Text>
                </View>

                <View style={styles.bottonsView}>
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
    padding: 8,
    backgroundColor: 'white',
    height: 200,
    width: 325,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  head_station_info_view: {
    flexDirection: 'row',
    alignItems:'center',
    flex: 1.5
  },
  station_text: {
    marginHorizontal: 10,
    fontSize: 19,
    fontFamily: 'LINESeedSansTHApp-Regular',
    color: '#000000',
    lineHeight: 25,
  },
  code_platform_view: {
    borderRadius: 5,
    marginVertical: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  code_text: {
    fontFamily: 'LINESeedSansTHApp-Regular',
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 10
  },
  add_to_view: {
    flex: 1,
    padding: 8,
  },
  add_to_text: {
    fontFamily: 'LINESeedSansTHApp-Regular',
    fontSize: 15,
    color: 'grey'
  },
  type_station_active_view: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginBottom: 5
  },
  type_station_inactive_view: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  type_station_text: {
    fontFamily: 'LINESeedSansTHApp-Regular',
    fontSize: 14,
    paddingVertical: 5,
  },
  buttonView: {
    borderRadius: 10,
    height: 40,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  bottonText: {
    fontSize: 14,
    fontFamily: 'LINESeedSansTHApp-Regular',
  },
  bottonsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

export default SelectedStationModal;
