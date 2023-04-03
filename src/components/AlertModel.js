import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const AlertModel = ({modalVisible, setModalVisible}) => {
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
              <Text style={styles.warningText}>Warning ! </Text>
              <Text style={styles.detailText}>
                {`You need to select the origin \n and destination first.`}
              </Text>
            </View>

            <View style={{alignItems: 'center', marginBottom: 15}}>
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
    backgroundColor: 'white',
    height: (170),
    width: (325),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: (2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
  },
  buttonClose: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    padding: (10),
    width: '80%',
  },
  discardText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
  },
  warningText: {
    fontFamily: 'LINESeedSansApp-Bold',
    paddingVertical: 10,
    color: 'black',
    fontSize: 16
  },
  warningView: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: (20),
    marginVertical: (15),
  },
  detailText: {
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
    fontSize: 14,
  },
});


export default AlertModel;
