"use strict";
import React from 'react';
import { StyleSheet, Text,  View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderBar = (props) => {
    return (
        <View style={{marginTop: 30}}>
            <View style = {Styles.header_navbar_view}>
                <Icon name='angle-left' color={'white'} size={25} onPress={props.backIconFunction}/>
                {
                  props.isFavorite ?
                    <Icon name='star' color={'#FF5733'} size={20} onPress={props.starIconFunction}/>:
                    <Icon name='star-o' color={'white'} size={20} onPress={props.starIconFunction}/>
                }
            </View>
            <View style={Styles.header_bar_view}>
                <Text style={Styles.header_bar_text}>
                    { props.selectedPath === 'fastest' ? 'Fastest' : props.selectedPath === 'cheapest' ? 'Cheapest' : 'Least Interchanges' } 
                </Text>
                {
                  props.resultPathLength-1 === 0 ? null :
                    <View style = {Styles.stop_view}>
                      <Text style = {Styles.stop_text}>
                          {props.resultPathLength-1} stop(s)
                      </Text>
                    </View>
                }
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    header_navbar_view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 20
      },
      header_bar_view:{
        paddingVertical: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      header_bar_text:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'LINESeedSansApp-Bold',
      },
      stop_view: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: '#ffff',
        borderWidth: 1,
        borderRadius:15,
      },
      stop_text:{
        color:'white', 
        fontSize: 15, 
        textAlign:'center',
        fontFamily: 'LINESeedSansApp-Regular',
      },
});

export default HeaderBar;