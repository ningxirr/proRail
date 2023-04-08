"use strict";
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import stationInfo from '../../data/station_info.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeleteFavoriteAlert from './DeleteFavoriteAlert';


const FavoriteRouteList = (props) => {
    const stationList = props.route.split('-');
    const [modalVisible, setModalVisible] = useState(false);
    const DeleteFavorite = () => {
        setModalVisible(true);
    }
    return (
        <TouchableOpacity 
            style = {Styles.container} 
            onPress={()=>{
                props.navigation.navigate('AddStopNavigator',{
                screen: 'ResultScreen',
                initial: false,
                params: {
                    code: stationList
                },
            })}}>
            <DeleteFavoriteAlert
                favoriteRoute={props.favoriteRoute}
                setFavaoriteRoute={props.setFavaoriteRoute}
                navigation={props.navigation}
                stationList={stationList}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                />
            <View style = {Styles.next_station_view}>
                <View style={{flex:15}}>
                    <Text style = {Styles.next_station_text}>
                        {stationInfo[stationList[0]].station_name.en}
                    </Text>
                    <Text style = {Styles.next_station_text} numberOfLines={1}>
                        &gt; {stationInfo[stationList[stationList.length-1]].station_name.en}
                    </Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    {
                        stationList.map((station, index) => (
                            <View key={index} style= {[Styles.route_view ,{backgroundColor: stationInfo[station].platform.color.path_color}]}>
                                <Text style = {[Styles.route_text]} numberOfLines={1}>
                                    {stationInfo[station].station_name.en}
                                </Text>
                            </View>
                        ))
                    }
                    </View>
                </View>
                <TouchableOpacity style={{flex:1, alignSelf:'center'}} onPress={DeleteFavorite}>
                    <Ionicons name="ios-close-outline" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        flexDirection:'row',
        justifyContent: 'space-between',
        borderColor: '#E4E4E4',
        borderWidth: 2
    },
    next_station_view: {
        margin:'5%',
        flex: 1,
        flexDirection:'row',
        // justifyContent: 'space-between',
    },
    next_station_text: {
        color:'black', 
        fontSize: 14, 
        fontFamily: 'LINESeedSansApp-Bold',
        marginVertical: 2,
    },
    route_view: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 2,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        // maxWidth: 150
    },
    route_text: {
        color:'#FFFFFF',
        fontSize: 10,
        fontFamily: 'LINESeedSansApp-Regular',
    },
    station_route_view: {
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal:'5%',
        paddingVertical: 5,
        width: '30%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    station_stop_text:{
        color:'black', 
        fontSize: 14, 
        textAlign:'center',
        fontFamily: 'LINESeedSansApp-Regular',
    }
});

export default FavoriteRouteList