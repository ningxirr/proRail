"use strict";
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PathIcon = (props) => {
    if (props.isHeader){
        return (
            <View>
                <View style={[Styles.header_line, {backgroundColor: props.color}]}>
                    <View style={[Styles.circle, {backgroundColor:  props.lightColor}]}/>
                </View>
            </View>
        )
    }
    return(
        <View>
            <View style={[Styles.path_line, {backgroundColor: props.color}]}>
                <View style={[Styles.circle, {backgroundColor:  props.lightColor}]}/>
            </View>
        </View>
    );
}
const Styles = StyleSheet.create({
    header_line:{
        borderTopStartRadius: 50, 
        borderTopEndRadius: 50,
        height:55, 
        width:9, 
    },
    path_line:{
        height:55, 
        width:9, 
    },
    circle:{ 
        borderRadius : 25, 
        height:25, 
        width:25, 
        alignSelf: 'center', 
        top: 10
    }
});

export default PathIcon;
