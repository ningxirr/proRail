"use strict";
import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const RouteDescription = (props) => {
    return (
        <View style={Styles.overall_component_view}>
            <View style={Styles.main_route_view}>
            <View style={Styles.line_view} />
            <View>
                <Text style={Styles.route_text}>
                    {'\t'}{'\t'}ROUTE {props.index+1}{'\t'}{'\t'}
                </Text>
            </View>
            <View style={Styles.line_view} />
            </View>
            <View style={[Styles.route_description_view, {marginVertical: '2%', marginHorizontal: '2%'}]}>
                <View style={Styles.route_description_view}>
                    <Text style={Styles.label_text}>TIME</Text>
                    <Text style={Styles.value_text}>{props.time}</Text>
                    <Text style={Styles.label_text}>mins</Text>
                </View>
                <View style={Styles.route_description_view}>
                    <Text style={Styles.value_text}>{props.interchange}</Text>
                    <Text style={Styles.label_text}>interchange(s)</Text>
                </View>
                <View style={Styles.route_description_view}>
                    <Text style={Styles.label_text}>PRICE</Text>
                    <Text style={Styles.value_text}>{props.price}</Text>
                    <Text style={Styles.label_text}>THB</Text>
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    overall_component_view: {
        marginVertical: '2%',
    },
    main_route_view: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    line_view: {
        flex: 1, 
        height: 1, 
        backgroundColor: '#CCCCCC'
    },
    route_text: {
        textAlign: 'center',
        fontFamily: 'LINESeedSans_A_Rg',
        fontSize: screenHeight*0.018,
        fontWeight: 'bold',
        color: '#CCCCCC'
    },
    route_description_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label_text: {
        fontSize: screenHeight*0.014,
        fontFamily: 'LINESeedSans_A_Rg',
        color: 'black',
        marginHorizontal: '0.5%'
    },
    value_text: {
        fontSize: screenHeight*0.028,
        fontFamily: 'LINESeedSans_A_Bd',
        color: 'black',
        marginHorizontal: '0.5%'
    }
});

export default RouteDescription;