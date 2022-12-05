"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Walking = (props) => {
    return(   
        <View style={Styles.path_with_icon_view}>
            <Icon name='walking' color={'black'} width={screenWidth*0.05} size={20} style={Styles.walking_icon}/>
            <View style={Styles.description_text_view}>
                <Text style={Styles.briefly_path_text}>
                    {props.time} mins to {'\t'}
                </Text>
                <Text style={[Styles.briefly_path_text, {fontWeight: 'bold'}]}>
                    {props.station}
                </Text>
            </View>
        </View>     
    );
}

const Styles = StyleSheet.create({
    path_with_icon_view: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: screenHeight*0.02,
        marginVertical: screenHeight*0.005,
        alignItems: 'center'
    },
    walking_icon: {
        marginLeft: screenWidth*0.08,
    },
    description_text_view:{
        marginLeft: screenWidth*0.12,
        flexDirection: 'row'
    },  
    briefly_path_text: {
        fontSize: screenHeight*0.016,
        fontColor: 'black'
    },
});

export default Walking;