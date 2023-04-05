import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import stationInfo from '../../data/station_info'

const stationWithCode = ({code}) => {
    return (
        <View style={Style.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={[Style.station_code_view, 
                    {
                        backgroundColor: stationInfo[code].platform.color.path_color, 
                        marginHorizontal: 5
                    }]}>
                    <Text style={[Style.station_code_text, ]}>
                        {code}
                    </Text>
                </View>
                <View style={[Style.station_code_view, 
                    {
                        borderColor: stationInfo[code].platform.color.path_color,
                        borderWidth: 1
                    }]}>
                    <Text style={[Style.station_code_text, 
                        {
                            color: stationInfo[code].platform.color.path_color
                        }]}>
                        {stationInfo[code].platform.platform}
                    </Text>
                </View>
                
            </View>
            
            <Text style={[Style.station_name_text, {paddingHorizontal: 10}]} ellipsizeMode='tail' numberOfLines={1}>
                {stationInfo[code].station_name.en}
            </Text>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginHorizontal: 10,
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
        fontFamily: 'LINESeedSansApp-Regular',
        color: 'white',
        textAlign: 'center'
    },
    station_name_text: {
        fontSize: 15,
        fontFamily: 'LINESeedSansApp-Regular',
        color: 'black',
        marginLeft: 5,
        width: '75%'
    }
})

export default stationWithCode;