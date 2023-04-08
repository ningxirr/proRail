import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import StationInfo from '../../data/station_info.json';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const StationList = ({code, isSiamSukhumvit, num, notSelectedStation}) => {
  const navigation = useNavigation();
  function chooseScreenNameToNavigate() {
    const routes = navigation.getState()?.routes;
    console.log(routes)
    if (routes[0].name == 'StationInformationListScreen') {
      // EachStationInfoScreen
      return 'StationInformationScreen';
    }
    return routes[routes.length - 2].name;
  }

  const submit = code => {
    navigation.navigate({
      name: chooseScreenNameToNavigate(),
      params: {
        code: code,
        num : num
      },
      merge: true,
    });
  };
  if(navigation.getState()?.routes[0].name !== 'StationInformationListScreen' && notSelectedStation.includes(code)){
    return (
    <View style={[styles.containerView, {backgroundColor: '#F8F8F8'}]}>
      {/* <View style={[styles.codeView,{backgroundColor: '#D9D9D9'}]}>
        <Text style={styles.codeText}>{code}</Text>
      </View>
      <View style={[styles.codeView,{backgroundColor: '#D9D9D9'}]}>
        <Text style={styles.codeText}>{StationInfo[code].platform.platform}</Text>
      </View> */}
      <View style={{flexDirection:'column'}}>
          <View
            style={[styles.codeView,{backgroundColor: '#D9D9D9'}]}>
            <Text style={styles.codeText}>{code}</Text>
          </View>
          <View style={[styles.codeView, 
            {
              marginTop: 7,
              borderWidth: 1,
              borderColor: '#D9D9D9',
              backgroundColor: 'white'
            }
          ]}>
              <Text style={[styles.codeText, {color: '#D9D9D9'}]}>{StationInfo[code].platform.platform}</Text>
            </View>
        </View>

      <ScrollView>
        <View style={{marginLeft: (10)}}>
          <Text style={[styles.staNameEn, {color: '#B4B4B4'}]}>
            {StationInfo[code].station_name.en}
          </Text>

          <Text style={styles.staNameTh}>
            {StationInfo[code].station_name.th}
          </Text>
        </View>
      </ScrollView>
    </View>
    );
  }
  return (
    <TouchableOpacity onPress={() => submit(code)}>
      <View style={styles.containerView}>
        <View style={{flexDirection:'column'}}>
          <View
            style={[
              styles.codeView,
              {backgroundColor: isSiamSukhumvit ? '#4CAF1D': StationInfo[code].platform.color.path_color},
            ]}>
            <Text style={styles.codeText}>{code}</Text>
          </View>
          <View style={[styles.codeView, 
            {
              marginTop: 7,
              borderWidth: 1,
              borderColor: isSiamSukhumvit ? '#4CAF1D': StationInfo[code].platform.color.path_color,
              backgroundColor: 'transparent'
            }
          ]}>
              <Text style={[styles.codeText, {color: isSiamSukhumvit ? '#4CAF1D': StationInfo[code].platform.color.path_color}]}>
                {StationInfo[code].platform.platform}
              </Text>
            </View>
        </View>

        <ScrollView>
          <View style={{marginLeft: (10)}}>
            <Text style={styles.staNameEn}>
              {StationInfo[code].station_name.en}
            </Text>

            <Text style={styles.staNameTh}>
              {StationInfo[code].station_name.th}
            </Text>
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    marginHorizontal: (20),
    marginVertical: (5),
    borderRadius: 10,
    height: 70
  },
  codeView: {
    height: (24),
    width: (70),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: (10),
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'LINESeedSansApp-Regular',
  },
  staNameEn: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'LINESeedSansApp-Regular',
  },
  staNameTh: {
    color: '#B4B4B4',
    fontSize: 14,
    fontFamily: 'LINESeedSansTHApp-Regular',
    lineHeight: 18,
  },
});
export default StationList;
