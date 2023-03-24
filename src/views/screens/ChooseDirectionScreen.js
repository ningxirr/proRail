import React, {useState} from 'react';
import {View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/header';
import RailMap from '../../components/RailMap';
import StationInfoBottomSheet from '../../components/StationInfoBottomSheet';

const ChooseDirectionScreen = ({navigation, route}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{position: 'relative'}}>
        <View style={{position: 'relative'}}>
          <RailMap/>
          <View style={{position: 'absolute', width: '100%'}}>
              <Header 
                haveBackIcon={true} 
                title={route.params.header} 
                function={() => navigation.goBack()}/>
          </View>
        </View>

        <View style={{position: 'absolute', marginTop: (90), alignItems: 'center', width: '100%'}}>
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
        memoScale={['50%', '75%']}
        num={route.params.num}
        notSelectedStation={route.params.notSelectedStation}
      />
    </View>
    </GestureHandlerRootView>
  );
};

export default ChooseDirectionScreen;
