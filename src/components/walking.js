"use strict";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Walking = (props) => {
    return(   
        <View style={Styles.path_with_icon_view}>
            <Icon name='walking' color={'black'} size={20} style={Styles.walking_icon}/>
            <View style={Styles.description_text_view}>
                <Text style={Styles.briefly_path_text}>
                    {props.time} mins to {'\t'}
                </Text>
                <Text style={[Styles.briefly_path_text, {fontFamily: 'LINESeedSans_A_Bd'}]}>
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
        alignItems: 'center'
    },
    walking_icon: {
        marginLeft: 30,
    },
    description_text_view:{
        marginLeft: 40,
        flexDirection: 'row'
    },  
    briefly_path_text: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'LINESeedSans_A_Rg',
    },
});

export default Walking;