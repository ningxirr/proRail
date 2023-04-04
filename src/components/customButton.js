"use strict";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
    return(
        <TouchableOpacity style = {[Styles.button, {borderColor: props.borderColor, backgroundColor: props.backgroundColor, width: props.width}]} onPress={props.function}>
            <Text style = {[Styles.button_text, {color: props.textColor}]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({  
    button: {
        paddingVertical: 12,
        alignSelf: 'center', 
        borderColor:'black', 
        borderWidth:1,
        borderRadius: 10,
        justifyContent: 'center',
    },
    button_text: {
        textAlign:'center', 
        alignContent:'center', 
        fontSize: 14,
        fontFamily: 'LINESeedSansApp-Regular',
    }
});

export default CustomButton;


