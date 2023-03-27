import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NextStation from '../../components/nextStation';
import Header from '../../components/header';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AlertModel from '../../components/AlertModel';
import RailMap from '../../components/RailMap';
import Entypo from 'react-native-vector-icons/Entypo';
import StationWithCode from '../../components/stationWithCode';

const AddStopScreen = ({route, navigation}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const [itemsCode, setItemsCode] = useState([]);
  const [oriStation, setOriStation] = useState(null);
  const [destStation, setDestStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const removeItems = item => {
    const index = itemsCode.indexOf(item);
    if (index > -1) {
      const newItemsCode = [...itemsCode];
      newItemsCode.splice(index, 1);
      setItemsCode(newItemsCode);
    }
  };

  const checkBeforeSubmit = () => {
    if (oriStation == null || destStation == null) {
      setModalVisible(true);
    } else {
      const resultStations = [oriStation, ...itemsCode, destStation]
      navigation.navigate({
        name: 'ResultScreen',
        params: {
          code: resultStations,
        }
      });
    }
  };

  useEffect(() => {
    if(route.params?.code === undefined){
      setOriStation(null);
      setItemsCode([]);
      setDestStation(null);
    }
    if (route.params?.num === 0) {
      setOriStation(route.params?.code);
    } 
    else if (route.params?.num === 4) {
      setDestStation(route.params?.code);
    } 
    else if (route.params?.num === 1 || route.params?.num === 2 || route.params?.num === 3) {
      setItemsCode(itemsCode.concat(route.params?.code));
    }
  }, [route.params]);

  function addStopStation({item}) {
    return (
      <View style={styles.choosebox}>
        <StationWithCode code={item} />
        <Entypo
          name="cross"
          size={20}
          color="grey"
          style={{padding: 1}}
          onPress={() => removeItems(item)}
        />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}> 
      <View style={{backgroundColor: 'white', flex: 1}}>
        <AlertModel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <View style={{position: 'relative'}}>
          <View style={{position: 'relative'}}>
            <RailMap
              cannotClicked={true}
              num={route.params?.num}
              oriStationCode={oriStation}
              destStationCode={destStation}
              itemsCode={itemsCode}
            />
            <View style={{position: 'absolute', width: '100%'}}>
              <Header title={'Choose Direction'} />
              <View style={{marginHorizontal: '5%', marginVertical: -20}}>
                <NextStation navigate={true} navigateText={'Nearest\nStation'} stationName={'Khu Khot'} stationColor={'#71B047'} stationPlatform={'BTS'}/>
              </View>
            </View>
          </View>
        </View>

      <BottomSheet 
        ref={bottomSheetRef} 
        index={0} 
        snapPoints={snapPoints} 
        onChange={handleSheetChange} 
        overDragResistanceFactor={10}
        handleComponent={() => <></>}
        enableOverDrag={false}
        >
        {/* <View
          style={[styles.infoBox, {justifyContent: 'space-around'}, {flex: 6}]}> */}
          <BottomSheetFlatList
            data={itemsCode}
            ListHeaderComponent={startStation()}
            renderItem={addStopStation}
            ListFooterComponent={endButton()}
          />
        {/* </View> */}
      </BottomSheet>
    </View>
    </GestureHandlerRootView>
  );

  function startStation() {
    return (
      <View>
        <TouchableOpacity
          style={styles.choosebox}
          onPress={() => {
            navigation.navigate('ChooseDirectionScreen',{
              header: 'Choose Origin',
              num : 0,
              notSelectedStation: itemsCode.length === 0 ? [destStation] : [itemsCode[0]]
            });
          }}>
          {
            oriStation === null ? 
            <Text style={styles.textInChooseBox}>Origin</Text>:
            <StationWithCode code={oriStation}/>
          }
        </TouchableOpacity>
      </View>
    );
  }

  function endButton() {
    return (
      <View style={{marginBottom: (30)}}>
        {itemsCode.length < 3 ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChooseDirectionScreen',{
                header: 'Add Stop',
                num: 1,
                notSelectedStation: itemsCode.length === 0 ? [oriStation, destStation] : [itemsCode[itemsCode.length - 1], destStation]
              }); 
            }}>
            <View style={styles.addbox}>
              <Text style={styles.textInAddBox}>Add More Stop</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <TouchableOpacity
          style={styles.choosebox}
          onPress={() => {
            navigation.navigate('ChooseDirectionScreen',{
              header: 'Choose Destination',
              num: 4,
              notSelectedStation: itemsCode.length === 0 ? [oriStation] : [itemsCode[itemsCode.length - 1]]
            });
          }}>
          {
            destStation === null ? 
            <Text style={styles.textInChooseBox}>Destination</Text>:
            <StationWithCode code={destStation}/>
          }
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.letsgoButton}
          onPress={() => {
            checkBeforeSubmit();
          }}>
          <Text style={styles.letsgoText}>
            Let's Go
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  letsgoText: {
    color: 'white',
    fontSize: 15, 
    fontFamily: 'LINESeedSans_A_Rg',
  },
  infoBox: {
    flex: 4,
    backgroundColor: '#FAFAFA',
    borderTopEndRadius: (30),
    borderTopStartRadius: (30),
    justifyContent: 'space-between',
  },
  addbox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: (10),
    marginHorizontal: (20),
    marginTop: (20),
    height: (40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosebox: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: (10),
    marginHorizontal: (20),
    marginTop: (20),
    height: (40),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  letsgoButton: {
    backgroundColor: 'black',
    borderRadius: (10),
    marginHorizontal: (20),
    marginTop: (20),
    alignItems: 'center',
    justifyContent: 'center',
    height: (40),
  },
  textInChooseBox: {
    fontSize: 15,
    paddingLeft: (10),
    fontFamily: 'LINESeedSans_A_Rg',
  },
  textInAddBox: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'LINESeedSans_A_Rg',
  },
});

export default AddStopScreen;
