import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const AlertClearAllSelectedStation = ({ modalVisible, setModalVisible, setOriStation, setItemsCode, setDestStation}) => {
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
              <Text style={styles.warningText}>Clear All Route</Text>
              <View style={{marginVertical:8, borderWidth:1, borderColor: '#EBEBEB', width: '100%'}}/>
              <Text style={styles.detailText}>
                Your selected station(s) will be cleared. {'\n'}Do you sure you want to?
              </Text>
            </View>
            
            <View style={{alignItems: 'center', marginTop: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                style={styles.buttonConfirm}
                onPress={() =>{
                  setOriStation(null);
                  setItemsCode([]);
                  setDestStation(null);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.discardText}>Discard</Text>
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
});


export default AlertClearAllSelectedStation;
