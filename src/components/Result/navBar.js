import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenHeight = Dimensions.get('window').height;

const NavBar = () => {
    return (
        <View style = {headerStyles.header_navbar_view}>
            <TouchableOpacity style = {{alignSelf:'center'}}>
                <Icon name='angle-left' borderRadius={15} size={25} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity style = {{alignSelf:'center'}}>
                <Text style = {{ color: 'white', fontSize: screenHeight * 0.016, fontWeight:'normal', textAlign: 'right'}}>
                    Customized{"\n"}Route
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const headerStyles = StyleSheet.create({
    header_navbar_view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: screenHeight*0.01,
        paddingHorizontal: screenHeight*0.02,
        backgroundColor: 'black'
    }
});

export default NavBar;