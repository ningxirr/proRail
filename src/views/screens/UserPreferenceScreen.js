"use-strict"

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View,  Dimensions, Image, Text, Switch  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import DraggableUserPref from './../../components/draggableUserPref';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UserPreference = () => {
    const name = 'Somsak';
    const [isEnabled, setIsEnable] = useState(false);
    const toggleSwitch = () => setIsEnable(previousState => !previousState)
    
    return(
        <View style={Styles.container}>
            <Image source={require('../../../assets/images/background.png')} style={Styles.profile_image}/>
            <View style={Styles.name_text_view}>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSans_A_Rg', color: 'black'}}>Hello, </Text>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>{name}</Text>
            </View>
            <View style={Styles.notification_view}>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>Alert notification</Text>
                <Switch 
                    trackColor={{false: 'grey', true: 'black'}}
                    thumbColor={isEnabled ? '#fcfcfc' : '#fcfcfc'}  
                    ios_backgroundColor={'black'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}  
                    style={{ transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                />
            </View>
            <View style={Styles.route_suggestion_view}>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>Route Suggestion</Text>
                {/* <DraggableUserPref/> */}
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: screenHeight*0.15,
        flex:1,
        backgroundColor: 'white'
    },
    profile_image: {
        height: screenWidth*0.3,
        width: screenWidth*0.3,
        borderRadius: (screenWidth*0.3)/2,
        marginVertical: 10,
        alignSelf: 'center',
    },
    name_text_view: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    notification_view: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    route_suggestion_view: {
        marginVertical: 10
    }
});

export default UserPreference;