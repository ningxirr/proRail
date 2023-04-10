"use strict";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Walking = (props) => {
    return(   
        <View style={Styles.path_with_icon_view}>
            <MaterialIcons name='directions-walk' color={'black'} size={20} style={Styles.walking_icon}/>
            <View style={[Styles.description_text_view, {flex: 1}]}>
                <Text style={[Styles.briefly_path_text]} numberOfLines={1}>
                    {props.time} mins to {'   '}
                </Text>
                <Text style={[Styles.briefly_path_text, {fontFamily: 'LINESeedSansApp-Bold', flex: 0.9}]} numberOfLines={1}>
                    {props.station}
                </Text>
            </View>
        </View>     
    );
}

const Styles = StyleSheet.create({
    path_with_icon_view: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    walking_icon: {
        marginLeft: 30,
    },
    description_text_view:{
        marginLeft: 25,
        flexDirection: 'row',
    },  
    briefly_path_text: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'LINESeedSansApp-Regular'
    },
});

export default Walking;