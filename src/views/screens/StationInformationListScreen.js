import React, {useState} from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/header';
import RailMap from '../../components/RailMap';
import StationInfoBottomSheet from '../../components/StationInfoBottomSheet';

const StationInformationListScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={{position: 'relative'}}>
          <View style={{position: 'relative'}}>
            <RailMap />
            <View style={{position: 'absolute', width: '100%'}}>
              <Header title={'Station Information'} />
            </View>
          </View>

          <View style={{position: 'absolute', marginTop: (50), alignItems: 'center', width: '100%'}}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          </View>
        </View>
        <StationInfoBottomSheet
          clicked={clicked}
          searchPhrase={searchPhrase}
          setClicked={setClicked}
          memoScale={['50%', '80%']}
        />
      </View>
    </GestureHandlerRootView>
    
  );
};

export default StationInformationListScreen;
