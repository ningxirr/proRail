import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import stationInfo from '../../data/station_info';

const stationWithCode = ({code}) => {
    return (
        <View style={Style.container}>
            <View style={[Style.station_code_view, {backgroundColor: stationInfo[code].platform.color.path_color}]}>
                <Text style={Style.station_code_text}>
                    {code}
                </Text>
            </View>
            <Text style={Style.station_name_text}>
                {stationInfo[code].station_name.en.length >= 30 ? stationInfo[code].station_name.en.substring(0, 30)+'...' : stationInfo[code].station_name.en}
            </Text>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    station_code_view: {
        width: 60,
        paddingVertical: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    station_code_text: {
        fontSize: 15,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'white',
        textAlign: 'center'
    },
    station_name_text: {
        fontSize: 15,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'black',
        marginLeft: 5
    }
})

export default stationWithCode;