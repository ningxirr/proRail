"use strict";
import React from 'react';
import { StyleSheet, View } from 'react-native';

const BrieflyPathIcon = (props) => {
    return(
        <View>
            <View style={[Styles.line, {backgroundColor: props.color}]}>
                <View style={[Styles.big_circle, {backgroundColor:  props.lightColor}]}/>
            </View>
            <View style={[Styles.small_circle, {backgroundColor: props.color}]}/>
        </View>
    );
}
const Styles = StyleSheet.create({
    line:{
        borderRadius : 50, 
        height:42, 
        width:9, 
    },
    big_circle:{ 
        borderRadius : 25, 
        height:25, 
        width:25, 
        alignSelf: 'center', 
        top: 8
    },
    small_circle:{
        backgroundColor: 'red',
        borderRadius : 100, 
        height:9, 
        width:9, 
        marginTop: 2
    }
});

export default BrieflyPathIcon;
