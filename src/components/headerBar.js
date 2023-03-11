"use strict";
import React from 'react';
import { StyleSheet, Text,  View } from 'react-native';
import TochableIcon from '../components/tochableIcon';

const HeaderBar = (props) => {
    return (
        <View>
            <View style = {Styles.header_navbar_view}>
                <TochableIcon name='angle-left' size={25} color={'white'} function={props.backIconFunction}/>
                {
                  props.isFavorite ?
                    <TochableIcon name='star' size={20} color={'#FF5733'} function={props.starIconFunction}/>:
                    <TochableIcon name='star-o' size={20} color={'white'} function={props.starIconFunction}/>
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
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 20
      },
      header_bar_view:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      header_bar_text:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'LINESeedSans_A_Bd',
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
        fontFamily: 'LINESeedSans_A_Rg',
      },
});

export default HeaderBar;