"use strict";

import React from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const exitList = [
    {
        number: 1,
        color: '',
        name: 'Khu Khot Police Station, Park&Ride Khu Khot, Bus Stop'
    },
    {
        number: 2,
        name: 'Esso Gas Station, PTT Gas Station, Bus Stope'
    },
    {
        number: 3,
        name: 'Shell Gas Station'
    }
]

const ExitList = (props) => {
  return (
    <View style={Styles.component}>
        <Text style={Styles.title_text}>
            Exit
        </Text>
        <View style={Styles.exit_list_view}>
            {
                exitList.map((item, index) => (
                    <View key={index} style={Styles.exit_view}>
                        <View style={[Styles.exit_number_view , {backgroundColor:'#4CAF1D'}]}>
                            <Text style={Styles.exit_number_text}>
                                {item.number}
                            </Text>
                        </View>
                        <Text style={Styles.exit_description_text}>
                            {item.name}
                        </Text>
                    </View>
                ))
            }
        </View>
    </View>
  );
};

const Styles = StyleSheet.create({
    component:{
        paddingVertical: screenHeight*0.03,
    },
    title_text:{
        fontSize: screenHeight*0.02,
        fontFamily: 'LINESeedSans_A_Bd',
        color: 'black',
        paddingVertical: screenHeight*0.01,
    },
    exit_list_view:{
        paddingHorizontal: screenWidth*0.02,
    },
    exit_view:{
        flexDirection: 'row',
        paddingVertical: screenHeight*0.02,
        paddingHorizontal: screenWidth*0.03,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: screenHeight*0.007,
        backgroundColor: 'white',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    exit_number_view:{
        paddingVertical: screenHeight*0.007,
        paddingHorizontal: screenWidth*0.04,
        borderRadius: 5,
        alignSelf: 'center',
    },
    exit_number_text:{
        fontSize: screenHeight*0.018,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: screenWidth*0.02,
    },
    exit_description_text: {
        fontSize: screenHeight*0.016,
        fontFamily: 'LINESeedSans_A_Rg',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 1, 
        flexWrap: 'wrap',
        color: 'black',
        marginLeft: screenWidth*0.07,
    },
});

export default ExitList;
