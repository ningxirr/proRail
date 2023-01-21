"use strict";

import React from 'react';
import {  StyleSheet, Text, View, Dimensions} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const facilityList = ['ATM', 'Lift', 'Automated External Defibrillator (AED)', 'First Aid Room', 'Skybridge connection', 'Rabbit & Carrot Service Center', 'Toilets', 'Ramp for disabled', 'Fire Hose', 'National Credit Bureau', 'Refuge Area for disabled persons', 'wifi', 'Escalator', 'Stairlift for disabled passenger use', 'Parcel delivery service', 'Pathway for a person with visually impaired', 'Car Park', 'Parking for people with disabilities', 'Tourist Information Center (TIC)', 'Bangkok Metropolitan Administration Express', 'Service', 'Money Exchange', 'Wifi Rental Center', 'Tour Agency', 'Public Phone', 'Luggage Service'];

const FacilityList = (props) => {
  return (
    <View style={Styles.component}>
        <Text style={Styles.title_text}>
            Facility
        </Text>
        <View style={Styles.facility_list_view}>
            {
                facilityList.map((item, index) => (
                    <View key={index} style={[index !== 0 ? {borderTopColor: '#CCCCCC', borderTopWidth: 1} : null, Styles.facility_view]}>
                        <View>
                            {getIcon(item)}
                        </View>
                        <Text style={Styles.facility_text}>
                            {item}
                        </Text>
                    </View>
                ))
            }
        </View>
    </View>
  );
};

function getIcon(value){
    switch(value){
    case 'ATM':
        return <IconMaterialCommunityIcons name='atm' size={25} color={'black'}/>
    case 'Lift':
        return <IconMaterialCommunityIcons name='elevator-passenger-outline' size={25} color={'black'}/>
    case 'Automated External Defibrillator (AED)':
        return <IconMaterialCommunityIcons name='heart-pulse' size={25} color={'black'}/>
    case 'First Aid Room':
        return <IconMaterialCommunityIcons name='hospital-building' size={25} color={'black'}/>
    case 'Skybridge connection':
        return <IconMaterialCommunityIcons name='stairs' size={25} color={'black'}/>
    case 'Rabbit & Carrot Service Center':
        return <IconMaterialCommunityIcons name='rabbit' size={25} color={'black'}/>
    case 'Toilets':
        return <IconMaterialCommunityIcons name='toilet' size={25} color={'black'}/>
    case 'Ramp for disabled':
        return <IconMaterialCommunityIcons name='wheelchair-accessibility' size={25} color={'black'}/>
    case 'Fire Hose':
        return <IconMaterialCommunityIcons name='fire-hydrant' size={25} color={'black'}/>
    case 'National Credit Bureau':
        return <IconMaterialCommunityIcons name='credit-card' size={25} color={'black'}/>
    case 'Refuge Area for disabled persons':
        return <IconMaterialCommunityIcons name='seat-legroom-normal' size={25} color={'black'}/>
    case 'wifi':
        return <IconMaterialCommunityIcons name='wifi' size={25} color={'black'}/>
    case 'Escalator':
        return <IconMaterialCommunityIcons name='escalator' size={25} color={'black'}/>
    case 'Stairlift for disabled passenger use':
        return <IconMaterialCommunityIcons name='stairs' size={25} color={'black'}/>
    case 'Parcel delivery service':
        return <IconMaterialCommunityIcons name='package-variant-closed' size={25} color={'black'}/>
    case 'Pathway for a person with visually impaired':
        return <IconMaterialCommunityIcons name='eye' size={25} color={'black'}/>
    case 'Car Park':
        return <IconMaterialCommunityIcons name='car-parking-lights' size={25} color={'black'}/>
    case 'Parking for people with disabilities':
        return <IconMaterialCommunityIcons name='wheelchair-accessibility' size={25} color={'black'}/>
    case 'Tourist Information Center (TIC)':
        return <IconMaterialCommunityIcons name='information-outline' size={25} color={'black'}/>
    case 'Bangkok Metropolitan Administration Express':
        return <IconMaterialCommunityIcons name='bus-clock' size={25} color={'black'}/>
    case 'Service':
        return <IconMaterialCommunityIcons name='car-wash' size={25} color={'black'}/>
    case 'Money Exchange':
        return <IconMaterialCommunityIcons name='currency-usd' size={25} color={'black'}/>
    case 'Wifi Rental Center':
        return <IconMaterialCommunityIcons name='wifi' size={25} color={'black'}/>
    case 'Tour Agency':
        return <IconMaterialCommunityIcons name='airplane-takeoff' size={25} color={'black'}/>
    case 'Public Phone':
        return <IconMaterialCommunityIcons name='phone' size={25} color={'black'}/>
    case 'Luggage Service':
        return <IconMaterialCommunityIcons name='bag-suitcase' size={25} color={'black'}/>
    default:
        return <IconMaterialCommunityIcons name='help-circle-outline' size={25} color={'black'}/>
    }
}

const Styles = StyleSheet.create({
    component:{
        paddingVertical: screenHeight*0.03,
    },
    title_text:{
        fontSize: screenHeight*0.02,
        fontFamily: 'LINESeedSans_A_Bd',
        color: 'black',
        paddingVertical: screenHeight*0.01,
    },
    facility_list_view:{
        paddingHorizontal: screenWidth*0.02,
    },
    facility_view:{
        flexDirection: 'row',
        paddingVertical: screenHeight*0.01,
    },
    facility_icon:{
        marginLeft: screenWidth*0.02,
    },
    facility_text: {
        fontSize: screenHeight*0.016,
        fontFamily: 'LINESeedSans_A_Rg',
        textAlignVertical: 'center',
        textAlign: 'left',
        color: 'black',
        marginLeft: screenWidth*0.07,
    }
});

export default FacilityList;
