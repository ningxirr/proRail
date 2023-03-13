"use strict";

import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FacilityList = (props) => {
    let facilityList= props.facility;
    return (
        <View style={Styles.component}>
            <Text style={Styles.title_text}>
                Facilities
            </Text>
            <View style={Styles.facility_list_view}>
                {
                    facilityList.map((item, index) => (
                        <View key={index} style={[index !== 0 ? {borderTopColor: '#CCCCCC', borderTopWidth: 1} : null, Styles.facility_view]}>
                            <View>
                                <IconMaterialCommunityIcons name={item.icon} size={25} color={'black'}/>
                            </View>
                            {
                                props.language === 'th' ? 
                                    <Text style={[Styles.facility_text, {fontFamily:'LINESeedSansTH_A_Rg'}]}>{item.th}</Text> : 
                                    <Text style={[Styles.facility_text, {fontFamily:'LINESeedSans_A_Rg'}]}>{item.en}</Text>
                            }
                        </View>
                    ))
                }
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    component:{
        paddingTop: 20,
    },
    title_text:{
        fontSize: 20,
        fontFamily: 'LINESeedSans_A_Bd',
        color: 'black',
        paddingVertical: 10,
    },
    facility_list_view:{
        paddingHorizontal: 10,
    },
    facility_view:{
        flexDirection: 'row',
        paddingVertical: 9,
    },
    facility_icon:{
        marginLeft: 20,
    },
    facility_text: {
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'left',
        color: 'black',
        marginLeft: 20,
    }
});

export default FacilityList;
