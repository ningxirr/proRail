import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import StationInfo from '../../data/station_info.json';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const SelectedTypeStationModal = ({code, modalVisible, setModalVisible, num, notSelectedStation, setSelectedType, setSelectedCodeAddStop}) => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);
  const [selected, setSelected] = useState(0);

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
    setSelected(0)
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
                  <View style={{flex: 0.5, flexWrap: 'wrap', flexDirection: 'row'}}>
                    <Text style={styles.station_text} ellipsizeMode='tail' numberOfLines={2}>
                      {StationInfo[code].station_name.en}
                    </Text>
                  </View>
                  <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
                    <View style={[styles.code_platform_view, {backgroundColor:StationInfo[code].platform.color.path_color}]}>
                      <Text style={styles.code_text}>{code}</Text>
                    </View>
                    <View style={[styles.code_platform_view, {backgroundColor:'white', borderColor: StationInfo[code].platform.color.path_color, borderWidth: 1}]}>
                      <Text style={[styles.code_text, {color: StationInfo[code].platform.color.path_color}]}>{StationInfo[code].platform.platform}</Text>
                    </View>
                  </View>
                 
                </View>
                <View style={{height: 1, backgroundColor: '#EBEBEB', marginHorizontal: 10}}/>

                <View style={styles.add_to_view}>
                  <Text style={styles.add_to_text}>Add to</Text>
                </View>

                <View style={{marginHorizontal:20, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                  <TouchableOpacity
                    style={[
                      selected == 0 ? styles.type_station_active_view : styles.type_station_inactive_view, 
                      {borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderEndWidth: 0}]
                    }
                    onPress={() => {
                      setSelected(0);
                    }}
                  >
                    <Text 
                      style={[styles.type_station_text, 
                        selected == 0 ? {color:'white'}: {color:'black'}
                      ]}
                    >Origin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      selected == 1 ? styles.type_station_active_view : styles.type_station_inactive_view, 
                      {borderEndWidth: 0}]}
                    onPress={() => {
                      setSelected(1);
                    }}
                  >
                    <Text
                      style={[styles.type_station_text, 
                        selected == 1 ? {color:'white'}: {color:'black'}
                      ]}
                    >Stop</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      selected == 2 ? styles.type_station_active_view : styles.type_station_inactive_view, 
                    {borderTopRightRadius: 10, borderBottomRightRadius: 10}]}
                    onPress={() => {
                      setSelected(2);
                    }}
                  >
                    <Text
                      style={[styles.type_station_text, 
                        selected == 2 ? {color:'white'}: {color:'black'}
                      ]}
                    >Destination</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottonsView}>
                  {
                    notSelectedStation !== undefined && notSelectedStation.includes(code) ? 
                    null :
                    <TouchableOpacity
                      style={[styles.buttonView, {backgroundColor: '#000000'}]}
                      onPress={() => {
                        setConfirm(true);
                        setSelectedCodeAddStop(code)
                        setSelectedType(selected)
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
    backgroundColor: 'white',
    height: 210,
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
    marginTop: 5,
    marginLeft: 10,
    flex: 1
  },
  station_text: {
    marginHorizontal: 10,
    fontSize: 20,
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
    width: 65
  },
  code_text: {
    fontFamily: 'LINESeedSansTHApp-Regular',
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 10
  },
  add_to_view: {
    marginLeft: 15,
    marginVertical: 10
  },
  add_to_text: {
    fontFamily: 'LINESeedSansTHApp-Regular',
    fontSize: 12,
    color: '#9B9B9B'
  },
  type_station_active_view: {
    borderColor: 'black',
    borderWidth: 1,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginBottom: 5
  },
  type_station_inactive_view: {
    borderColor: 'black',
    borderWidth: 1,
    width: '35%',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

export default SelectedTypeStationModal;
