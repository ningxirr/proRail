import React, {useState, useRef,useCallback} from 'react';
import { SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/header';
import RailMap from '../../components/RailMap';
import StationInfoBottomSheet from '../../components/StationInfoBottomSheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StationInformationListScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const bottomSheetRef = useRef(null);
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'black'}}>
      <GestureHandlerRootView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={{position: 'relative'}}>
          <View style={{position: 'relative'}}>
            <View style={{marginTop: fullScreenMap ? 80 : 20 }}>
              <RailMap />
            </View>
            <View style={{position: 'absolute', width: '100%'}}>
              <Header title={'Station Information'} />
            </View>
          </View>

          <View style={{position: 'absolute', marginTop: 75, alignItems: 'center', width: '100%', zIndex: 1}}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
            <View style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              paddingHorizontal: 10,
              marginHorizontal: 20,
              backgroundColor: 'black',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
              <FontAwesome name="chevron-up" size={25} color="white" onPress={()=>handleSnapPress(1)}/>
            </View>
        <StationInfoBottomSheet
          bottomSheetRef={bottomSheetRef}
          handleSnapPress={handleSnapPress}
          setFullScreenMap={fullScreenMap => setFullScreenMap(fullScreenMap)}
          clicked={clicked}
          searchPhrase={searchPhrase}
          setClicked={setClicked}
          memoScale={["10%", "44%", "65%"]}
        />
        
      </View>
    </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default StationInformationListScreen;
