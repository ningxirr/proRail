"use strict";
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BrieflyRoute = (props) => {
    let route = [
        {
            "from": "50",
            "to": "20",
            "fastest": [[50,51,52,53,54,55,56,57,58,59,60]],
            "chepest": [[50,20,19,18,17,90,91,92,93,94,95,96,97,98,99],[61,60]],
            "leastInterrchange": [[50,20,19,18,17,90,91,92,93,94,95,96,97,98,99],[61,60]]
        }
    ]

    return( 
        <View style={Styles.overall_component_view}>
            {
                route.map((item, index) => (
                    <View key={index}>
                        <View style={Styles.path_view}>
                            <View style={Styles.path_with_image_view}>
                                <Image source={require('../../../../assets/images/brieflyDarkGreen.png')} style={Styles.briefly_path_image}/>
                                <Text style={Styles.briefly_path_text}>
                                    Kasetsart University{"\n"}มหาวิทยาลัยเกษตรศาสตร์
                                </Text>
                            </View>
                            <View style={Styles.path_with_image_view}>
                                <Image source={require('../../../../assets/images/brieflyDarkGreen.png')} style={[Styles.briefly_path_image,{transform: [{ scaleX: -1 },{ scaleY: -1 }]}]}/>
                                <Text style={Styles.briefly_path_text}>
                                    Phahonyothin{"\n"}พหลโยธิน
                                </Text>
                            </View>
                        </View>
                        <View style={Styles.path_view}>
                            <View style={Styles.path_with_image_view}>
                                <Image source={require('../../../../assets/images/brieflyBlue.png')} style={Styles.briefly_path_image}/>
                                <Text style={Styles.briefly_path_text}>
                                    Phahonyothin{"\n"}พหลโยธิน
                                </Text>
                            </View>
                            <View style={Styles.path_with_image_view}>
                                <Image source={require('../../../../assets/images/brieflyBlue.png')} style={[Styles.briefly_path_image,{transform: [{ scaleX: -1 },{ scaleY: -1 }]}]}/>
                                <Text style={Styles.briefly_path_text}>
                                    Huai Khwang{"\n"}ห้วยขวาง
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                ))
            } 
        </View>
    );
}

const Styles = StyleSheet.create({
    overall_component_view: {
        marginHorizontal :screenHeight*0.025
    },
    path_view: {
        paddingVertical: screenHeight*0.015,
        marginVertical: screenHeight*0.005,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
    },
    path_with_image_view: {
        flexDirection: 'row',
        paddingVertical: screenHeight*0.001,
        alignItems: 'center'
    },
    briefly_path_image: {
        height: screenHeight*0.06,
        resizeMode: 'contain'
    },
    briefly_path_text: {
        marginLeft: screenWidth*0.05,
        fontSize: screenHeight*0.016,
        fontColor: 'black',
        fontWeight: 'bold',
    },
});

export default BrieflyRoute;