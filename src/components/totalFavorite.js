"use strict";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TotalFavorite = (props) => {
    return (
        <View>
            <View style = {Styles.container}>
                <View style = {Styles.total_fav_view}>
                    <View style={Styles.star_icon_view}>
                        <Icon name='star' color='#FF5733' size={20} />
                    </View>
                    <Text style = {Styles.total_fav_text}>
                        Total Favorite
                    </Text>
                </View>
                <View style = {Styles.fav_num_view}>
                    <Text style = {Styles.fav_num_text}>
                        {props.favCount}
                    </Text>
                    <Text style = {Styles.route_text}>
                        routes
                    </Text>
                </View>
            </View> 
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    total_fav_view: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    star_icon_view:{
        marginRight: 10,
        alignItems: 'center',
        marginTop: 5
    },
    total_fav_text: {
        color:'black', 
        fontSize: 20, 
        fontFamily: 'LINESeedSansApp-Regular',
    },
    fav_num_view: {
        marginVertical: 20,
        alignSelf: 'center',
        alignContent: 'center',
    },
    fav_num_text: {
        color:'black', 
        fontSize: 20, 
        textAlign:'right',
        fontFamily: 'LINESeedSansApp-Bold',
    },
    route_text:{
        color:'black', 
        fontSize: 13, 
        textAlign:'right',
        fontFamily: 'LINESeedSansApp-Regular',
    }
});

export default TotalFavorite