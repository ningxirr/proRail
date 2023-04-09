import React, {useState, useRef, useCallback} from 'react';
import {SafeAreaView, View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/header';
import RailMap from '../../components/RailMap';
import StationInfoBottomSheet from '../../components/StationInfoBottomSheet';

const ChooseDirectionScreen = ({navigation, route}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const bottomSheetRef = useRef(null);
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
      <GestureHandlerRootView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{position: 'relative'}}>
        <View style={{position: 'relative'}}>
          <View style={{marginTop: fullScreenMap ? 140 : 20 }}>
            <RailMap 
              cannotClicked={false}
              num={route.params.num} 
              notSelectedStation={route.params.notSelectedStation} 
              oriStationCode={route.params.oriStation}
              destStationCode={route.params.destStation}
              />
          </View>
          <View style={{position: 'absolute', width: '100%'}}>
              <Header 
                haveBackIcon={true} 
                title={route.params.header} 
                function={() => navigation.goBack()}/>
          </View>
        </View>

        <View style={{position: 'absolute', marginTop: 100, alignItems: 'center', width: '100%', zIndex:1}}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
      </View>
      <StationInfoBottomSheet
        bottomSheetRef={bottomSheetRef}
        handleSnapPress={handleSnapPress}
        setFullScreenMap={fullScreenMap => setFullScreenMap(fullScreenMap)}
        clicked={clicked}
        searchPhrase={searchPhrase}
        setClicked={setClicked}
        memoScale={["10%", "44%", "75%"]}
        num={route.params.num}
        notSelectedStation={route.params.notSelectedStation}
      />
    </View>
    </GestureHandlerRootView>
    </SafeAreaView> 
  );
};

export default ChooseDirectionScreen;
