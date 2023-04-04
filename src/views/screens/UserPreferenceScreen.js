"use-strict"

import React, { useState, useEffect } from 'react';
import { StyleSheet, View,  Dimensions, Image, Text, Switch, SafeAreaView  } from 'react-native';
import CustomButton from './../../components/customButton';
import getDataFromAsyncStorage from './../../function/getDataFromAsyncStorage';
import storeDataToAsyncStorage from './../../function/storeDataToAsyncStorage';
import removeDataFromAsyncStorage from './../../function/removeDataFromAsyncStorage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UserPreference = () => {
    const [isEnabled, setIsEnable] = useState(false);
    const [recommended, setRecommended] = useState(['cheapest', 'fastest', 'leastInterchanges']);
    const [name, setName] = useState('');
    const [selectedCheapest, setSelectedCheapest] = useState(false);
    const [selectedFastest, setSelectedFastest] = useState(false);
    const [selectedLeastInterchanges, setSelectedLeastInterchanges] = useState(false);

    const toggleSwitch = () => {
        setIsEnable(previousState => !previousState)
        removeDataFromAsyncStorage('@name')
    }
    
    useEffect(() => {
        getDataFromAsyncStorage
    },[])

    useEffect(() => {
        const fetchData = async () => {
            const name = await getDataFromAsyncStorage('@name');
            const recommended = await getDataFromAsyncStorage('@recommended');
            setRecommended(recommended);
            setName(name);
            if(recommended[0] === 'cheapest'){
                setSelectedCheapest(true);
                setSelectedFastest(false);
                setSelectedLeastInterchanges(false);
            } 
            else if(recommended[0] === 'fastest'){
                setSelectedCheapest(false);
                setSelectedFastest(true);
                setSelectedLeastInterchanges(false);
            } 
            else if(recommended[0] === 'leastInterchanges'){
                setSelectedCheapest(false);
                setSelectedFastest(false);
                setSelectedLeastInterchanges(true);
            } 
        };
        fetchData();
      }, []);

    if(!recommended){
        return (<View></View>)
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
            <View style={{backgroundColor:'white', flex:1}}>
            <View style={Styles.header_view}>
                <Text style={Styles.header_text}>Preference</Text>
            </View>
            <View style={Styles.container}>
            <Image source={require('../../../assets/images/background.png')} style={Styles.profile_image}/>
            <View style={Styles.name_text_view}>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSansApp-Regular', color: 'black'}}>Hello</Text>
                {
                    name === '' ? 
                    <Text style={{fontSize: 20, fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>, User01</Text>:
                    <Text style={{fontSize: 20, fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>, {name}</Text>
                }
            </View>
            <View style={Styles.notification_view}>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>Alert notification</Text>
                <Switch 
                    trackColor={{false: 'grey', true: 'black'}}
                    thumbColor={isEnabled ? '#fcfcfc' : '#fcfcfc'}  
                    ios_backgroundColor={'black'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}  
                    style={{ transform: [{scaleX: 1.0}, {scaleY: 1.0}]}}
                />
            </View>
            <View style={Styles.route_suggestion_view}>
                <Text style={{fontSize: 20, fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>Route Suggestion</Text>
                <View style={{paddingTop : 20, paddingBottom: 5}}>
                    <CustomButton 
                    text="Cheapest" 
                    borderColor={selectedCheapest ? 'black' : '#F2F2F2'} 
                    backgroundColor={'#F2F2F2'} 
                    textColor={'#000000'} width={'100%'} 
                    function={()=> {
                        setRecommended(['cheapest', 'fastest', 'leastInterchanges'])
                        setSelectedCheapest(true);
                        setSelectedFastest(false);
                        setSelectedLeastInterchanges(false);
                        storeDataToAsyncStorage('@recommended',['cheapest', 'fastest', 'leastInterchanges']);
                    }}/>
                </View>
                <View style={{paddingVertical: 5}}>
                    <CustomButton 
                    text="Fastest" 
                    borderColor={selectedFastest ? 'black': '#F2F2F2'} 
                    backgroundColor={'#F2F2F2'} 
                    textColor={'#000000'} 
                    width={'100%'} 
                    function={()=> {
                        setRecommended(['fastest', 'cheapest', 'leastInterchanges'])
                        setSelectedCheapest(false);
                        setSelectedFastest(true);
                        setSelectedLeastInterchanges(false);
                        storeDataToAsyncStorage('@recommended',['fastest', 'cheapest', 'leastInterchanges']);
                    }}/>
                </View>
                <View style={{paddingVertical: 5}}>
                    <CustomButton 
                    text="Least Interchanges" 
                    borderColor={selectedLeastInterchanges ? 'black' :'#F2F2F2'} 
                    backgroundColor={'#F2F2F2'} 
                    textColor={'#000000'} 
                    width={'100%'} 
                    function={()=> {
                        setRecommended(['leastInterchanges', 'cheapest', 'fastest'])
                        setSelectedCheapest(false);
                        setSelectedFastest(false);
                        setSelectedLeastInterchanges(true);
                        storeDataToAsyncStorage('@recommended',['leastInterchanges', 'cheapest', 'fastest']);
                    }}/>
                </View>
            </View>
        </View>
            </View>
            
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        // paddingTop: screenHeight*0.15,
        paddingTop: 50,
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
        marginVertical: 30,
    },
    header_view: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        backgroundColor: 'black',
        height: 100,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    header_text:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'LINESeedSansApp-Bold',
    },
});

export default UserPreference;