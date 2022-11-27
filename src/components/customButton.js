import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Button, TouchableOpacity, SafeAreaView } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CustomButton = (props) => {
    return(
        <TouchableOpacity style = {[Styles.button, {borderColor: props.borderColor, backgroundColor: props.backgroundColor}]} onPress={props.function}>
            <Text style = {[Styles.button_text, {color: props.textColor}]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({  
    button: {
        width: '100%',
        height: screenHeight*0.05,
        alignSelf: "center", 
        borderColor:'black', 
        borderWidth:1,
        marginVertical:'1%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    button_text: {
        textAlign:'center', 
        alignContent:'center', 
        fontSize: screenHeight*0.017
    }
});

export default CustomButton;


