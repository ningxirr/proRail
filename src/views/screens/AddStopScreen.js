import React, {useState, useMemo, useRef, useEffect, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';
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
  const snapPoints = useMemo(() => ["10%", "40%", "65%"], []);
  const handleSheetChange = useCallback((index) => {
    if(index === 0) setFullScreenMap(true);
    else setFullScreenMap(false);
  }, []);

  const [itemsCode, setItemsCode] = useState([]);
  const [oriStation, setOriStation] = useState(null);
  const [destStation, setDestStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const [alertText, setAlertText] = useState('');

  const removeItems = item => {
    const index = itemsCode.indexOf(item);
    if (index > -1) {
      const newItemsCode = [...itemsCode];
      newItemsCode.splice(index, 1);
      setItemsCode(newItemsCode);
    }
  };

  const checkBeforeSubmit = () => {
    if (oriStation === null || destStation === null) {
      setAlertText('You need to select the origin \n and destination first.');
      setModalVisible(true);
    } 
    else if ((oriStation === destStation && itemsCode.length === 0)
            || oriStation === itemsCode[0] 
            || destStation === itemsCode[itemsCode.length-1]
            || itemsCode.some((value, index) => value === itemsCode[index+1])){
      setAlertText('You cannot select the same station consecutively in your route. Please choose difference stations');
      setModalVisible(true);
    }
    else {
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
    switch(route.params?.num){
      case 0:
        setOriStation(route.params?.code);
        break;
      case 1:
        if(itemsCode[1] !== undefined && itemsCode[2] !== undefined) setItemsCode([route.params?.code, itemsCode[1], itemsCode[2]]);
        else if(itemsCode[1] !== undefined) setItemsCode([route.params?.code, itemsCode[1]]);
        else setItemsCode([route.params?.code])
        break;
      case 2:
        if(itemsCode[2] !== undefined) setItemsCode([itemsCode[0], route.params?.code, itemsCode[2]])
        else setItemsCode([itemsCode[0], route.params?.code]);
        break;
      case 3:
        setItemsCode([itemsCode[0], itemsCode[1], route.params?.code]);
        break;
      case 4:
        setDestStation(route.params?.code);
        break;
      default:
        break;
    }
  }, [route.params]);

  function getNotSelectedStation(index){
    switch(index){
      case 0:
        if(itemsCode.length > 1) return [oriStation, itemsCode[1]]
        else return [oriStation, destStation]
      case 1:
        if(itemsCode.length > 2) return [itemsCode[0], itemsCode[2]]
        else if(itemsCode.length === 2) return [itemsCode[0], destStation]
        else return [oriStation, destStation]
      case 2:
         return [itemsCode[1], destStation]
      default:
        return []
    }
  }

  function addStopStation({item, index}) {
    return (
      <TouchableOpacity 
        style={styles.choosebox}
        onPress={() => {
          navigation.navigate('ChooseDirectionScreen',{
            header: index === 0 ? 'Change First Stop' : index === 1 ? 'Change Second Stop' : 'Change Third Stop',
            num : index+1,
            notSelectedStation: getNotSelectedStation(index)
          });
          console.log(index)
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <StationWithCode code={item} />
          <Entypo
            name="cross"
            size={20}
            color="grey"
            style={{ marginLeft: 'auto', marginRight: 5 }}
            onPress={() => {
              removeItems(item);
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'black'}}>
      <GestureHandlerRootView style={{flex: 1}}> 
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={{zIndex: 1}}>
          <Header title="Choose Direction"/>
        </View>
        <View style={styles.navigation_view}>
          <NextStation isNearestOnly={true}/>
        </View>
        <AlertModel
          text={alertText}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={{marginTop: fullScreenMap ? 0 : -80 }}>
          <RailMap
            cannotClicked={true}
            num={route.params?.num}
            oriStationCode={oriStation}
            destStationCode={destStation}
            itemsCode={itemsCode}
          />
        </View>
      </View>
      <BottomSheet 
        ref={bottomSheetRef} 
        index={1} 
        snapPoints={snapPoints} 
        onChange={handleSheetChange} 
        overDragResistanceFactor={10}
        handleComponent={() => <></>}
        enableOverDrag={false}
        >
        <BottomSheetFlatList
          data={itemsCode}
          ListHeaderComponent={startStation()}
          renderItem={addStopStation}
          ListFooterComponent={endButton()}
        />
      </BottomSheet>
    </GestureHandlerRootView>
    </SafeAreaView>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               <StationWithCode code={oriStation}/>
               <Entypo
                name="cross"
                size={20}
                color="grey"
                style={{ marginLeft: 'auto', marginRight: 5 }}
                onPress={() => {
                  setOriStation(null)
                }}
              />
            </View>
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
                header: itemsCode.length === 0 ? 'Add First Stop' : itemsCode.length === 1 ? 'Add Second Stop' : 'Add Third Stop',
                num: itemsCode.length+1,
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               <StationWithCode code={destStation}/>
               <Entypo
                name="cross"
                size={20}
                color="grey"
                style={{ marginLeft: 'auto', marginRight: 5 }}
                onPress={() => {
                  setDestStation(null)
                }}
              />
            </View>
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
    fontFamily: 'LINESeedSansApp-Regular',
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
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: (10),
    marginHorizontal: (20),
    marginTop: (20),
    height: (40),
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
    fontFamily: 'LINESeedSansApp-Regular',
  },
  textInAddBox: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'LINESeedSansApp-Regular',
  },
  navigation_view: {
    zIndex:1,
    marginTop: -20,
    paddingHorizontal: '5%',
  },
});

export default AddStopScreen;
