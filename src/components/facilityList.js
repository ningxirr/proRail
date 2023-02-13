"use strict";

import React from 'react';
import {  StyleSheet, Text, View, Dimensions} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FacilityList = (props) => {
    let facilityList= props.facility;
    return (
        <View style={Styles.component}>
            <Text style={Styles.title_text}>
                Facilities
            </Text>
            <View style={Styles.facility_list_view}>
                {
                    facilityList.map((item, index) => (
                        <View key={index} style={[index !== 0 ? {borderTopColor: '#CCCCCC', borderTopWidth: 1} : null, Styles.facility_view]}>
                            <View>
                                {getIcon(item)}
                            </View>
                            <Text style={[Styles.facility_text,{fontFamily: props.language === 'th' ? 'LINESeedSansTH_A_Rg':'LINESeedSans_A_Rg'}]}>
                                {getFacility(item, props.language)} 
                            </Text>
                        </View>
                    ))
                }
            </View>
        </View>
    );
};

function getFacility(value, language){
    switch(value){
        case 1:
            if(language === 'th') return "เครื่องเอทีเอ็ม";
            else return "ATM";
        case 2:
            if(language === 'th') return "ลิฟต์";
            else return 'Lift';
        case 3:
            if(language === 'th') return "บันไดเลื่อน";
            else return "Escalator";
        case 4:
            if(language === 'th') return "ศูนย์บริการนักท่องเที่ยว";
            else return "Tourist Information Center (TIC)";
        case 5:
            if(language === 'th') return "ศูนย์บริการประชาขน (BMA)";
            else return "Bangkok Metropolitan Administration Express Service";
        case 6:
            if(language === 'th') return "ศูนย์แลกเปลี่ยนเงิน";
            else return "Money Exchange"
        case 7:
            if(language === 'th') return "ร้านเช่า Wifi"
            else return "Wifi Rental Center"
        case 8:
            if(language === 'th') return "บริษัททัวร์"
            else return "Tour Agency"
        case 9:
            if(language === 'th') return "โทรศัพท์สาธารณะ"
            else return "Public Phone"
        case 14:
            if(language === 'th') return "บริการรับฝากกระเป๋า"
            else return "Luggage Service"
        case 16:
            if(language === 'th') return "เครื่องวินิจฉัยการเต้นของหัวใจ (AED)"
            else return "Automated External Defibrillator (AED)"
        case 17:
            if(language === 'th') return "ห้องพยาบาล"
            else return "First Aid Room"
        case 18:
            if(language === 'th') return "ทางเชื่อมเข้าสถานี"
            else return "Skybridge connection"
        case 19:
            if(language === 'th') return "ศูนย์บริการบัตรแรบบิทและแครอท"
            else return "Rabbit & Carrot Service Center"
        case 20:
            if(language === 'th') return "ห้องน้ำ"
            else return "Toilets"
        case 21:
            if(language === 'th') return "ทางลาดสำหรับรถเข็น"
            else return "Ramp for disabled"
        case 22:
            if(language === 'th') return "สายฉีดดับเพลิง"
            else return "Fire Hose"
        case 23:
            if(language === 'th') return "ศูนย์ตรวจสอบเครดิตบูโร"
            else return "National Credit Bureau"
        case 24:
            if(language === 'th') return "พื้นที่สำหรับหนีภัยของคนพิการ"
            else return "Refuge Area for disabled persons"
        case 25:
            if(language === 'th') return "ไวไฟ"
            else return "wifi"
        case 26:
            if(language === 'th') return "ลิฟต์ราวบันไดสำหรับคนพิการ"
            else return "Stairlift for disabled passenger use"
        case 27:
            if(language === 'th') return "บริการรับ-ส่งพัสดุ"
            else return "Parcel delivery service"
        case 28:
            if(language === 'th') return "พื้นผิวต่างสัมผัสสำหรับผู้พิการทางสายตา"
            else return "Pathway for a person with visually impaired"
        case 29:
            if(language === 'th') return "ที่จอดรถ"
            else return "Car Park"
        case 30:
            if(language === 'th') return "ที่จอดรถสำหรับคนพิการ"
            else return "Parking for people with disabilities"
        default:
            return null;
    }
}

function getIcon(value){
    switch(value){
    case 1:
        return <IconMaterialCommunityIcons name='atm' size={25} color={'black'}/>
    case 2:
        return <IconMaterialCommunityIcons name='elevator-passenger-outline' size={25} color={'black'}/>
    case 16:
        return <IconMaterialCommunityIcons name='heart-pulse' size={25} color={'black'}/>
    case 17:
        return <IconMaterialCommunityIcons name='hospital-building' size={25} color={'black'}/>
    case 18:
        return <IconMaterialCommunityIcons name='stairs' size={25} color={'black'}/>
    case 19:
        return <IconMaterialCommunityIcons name='rabbit' size={25} color={'black'}/>
    case 20:
        return <IconMaterialCommunityIcons name='toilet' size={25} color={'black'}/>
    case 21:
        return <IconMaterialCommunityIcons name='wheelchair-accessibility' size={25} color={'black'}/>
    case 22:
        return <IconMaterialCommunityIcons name='fire-hydrant' size={25} color={'black'}/>
    case 23:
        return <IconMaterialCommunityIcons name='credit-card' size={25} color={'black'}/>
    case 24:
        return <IconMaterialCommunityIcons name='seat-legroom-normal' size={25} color={'black'}/>
    case 25:
        return <IconMaterialCommunityIcons name='wifi' size={25} color={'black'}/>
    case 3:
        return <IconMaterialCommunityIcons name='escalator' size={25} color={'black'}/>
    case 26:
        return <IconMaterialCommunityIcons name='stairs' size={25} color={'black'}/>
    case 27:
        return <IconMaterialCommunityIcons name='package-variant-closed' size={25} color={'black'}/>
    case 28:
        return <IconMaterialCommunityIcons name='eye' size={25} color={'black'}/>
    case 29:
        return <IconMaterialCommunityIcons name='car-parking-lights' size={25} color={'black'}/>
    case 30:
        return <IconMaterialCommunityIcons name='wheelchair-accessibility' size={25} color={'black'}/>
    case 4:
        return <IconMaterialCommunityIcons name='information-outline' size={25} color={'black'}/>
    case 5:
        return <IconMaterialCommunityIcons name='bus-clock' size={25} color={'black'}/>
    case 6:
        return <IconMaterialCommunityIcons name='currency-usd' size={25} color={'black'}/>
    case 7:
        return <IconMaterialCommunityIcons name='wifi' size={25} color={'black'}/>
    case 8:
        return <IconMaterialCommunityIcons name='airplane-takeoff' size={25} color={'black'}/>
    case 9:
        return <IconMaterialCommunityIcons name='phone' size={25} color={'black'}/>
    case 14:
        return <IconMaterialCommunityIcons name='bag-suitcase' size={25} color={'black'}/>
    default:
        return <IconMaterialCommunityIcons name='help-circle-outline' size={25} color={'black'}/>
    }
}

const Styles = StyleSheet.create({
    component:{
        paddingTop: screenHeight*0.03,
    },
    title_text:{
        fontSize: 20,
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
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'left',
        color: 'black',
        marginLeft: screenWidth*0.07,
    }
});

export default FacilityList;
