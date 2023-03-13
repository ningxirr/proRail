"use strict";

import React from 'react';
import {  StyleSheet, Text, View, Dimensions} from 'react-native';

const ExitList = (props) => {
  let exitList = props.exit;

  return (
    <View style={Styles.component}>
        <Text style={Styles.title_text}>
            Exits
        </Text>
        <View>
            {
                exitList.map((item, index) => (
                    <View key={index} style={Styles.exit_view}>
                        <View style={[Styles.exit_number_view , {backgroundColor:props.color}]}>
                            <Text style={Styles.exit_number_text}>
                                {item.number}
                            </Text>
                        </View>
                        {
                            props.language === 'th' ? 
                                <Text style={[Styles.exit_description_text, {fontFamily:'LINESeedSansTH_A_Rg'}]}>{item.th}</Text> : 
                                <Text style={[Styles.exit_description_text, {fontFamily:'LINESeedSans_A_Rg'}]}>{item.en}</Text>
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
        paddingVertical: 30,
    },
    title_text:{
        fontSize: 20,
        fontFamily: 'LINESeedSans_A_Bd',
        color: 'black',
        paddingVertical: 10,
    },
    exit_view:{
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 7,
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
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    exit_number_text:{
        fontSize: 16,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    exit_description_text: {
        fontSize: 14,
        fontFamily: 'LINESeedSans_A_Rg',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 1, 
        flexWrap: 'wrap',
        color: 'black',
        marginLeft: 30,
    },
});

export default ExitList;
