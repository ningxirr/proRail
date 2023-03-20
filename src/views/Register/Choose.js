import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import CustomButton from '../../components/customButton';

const screenWidth = Dimensions.get('window').width;

const BGroup = ({buttons}) => {
  console.log(buttons);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View>
      {buttons.map((buttonLabel, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setActiveTab(index);
            }}
            key={index}
             style={
               activeTab == index
                 ? styles.buttonActive
                 : styles.buttonInactive
                   }
            >
             <Text style={styles.text}>
               {buttonLabel}
             </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Choose = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../assets/images/rocket.jpg')} resizeMode="cover" style={styles.image} ></ImageBackground>
        <View style={styles.body}>
          <Text style={{paddingTop: 110,fontSize: 40,fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>Personalized</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{paddingBottom: 20,fontSize: 24,fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>Which route style{'\n'}that matched you ?</Text>
            <BGroup buttons={['Fastest','Cheapest','Lastest Interchange']} />
          </View>
        </View>
        <View style={{paddingTop: 50}}>
        <CustomButton 
          text="Let's Go" 
          backgroundColor={'#000000'} 
          textColor={'#FFFFFF'} 
          width={screenWidth*0.9} 
          function={()=> console.log("Next")}/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  body: {
    alignSelf: 'center',
    flex: 9
  },
  image: {
    flex: 1,
    right: -200,
    top: -320,
    height: 800,
    width: 300,
  },
  button: {
    height: 45,
    width: 358,
    borderRadius: 10,
    backgroundColor: 'black'
  },
  buttonInactive: {
    height: 45,
    width: screenWidth* 0.9,
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    margin: 3,
  },
  text: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'LINESeedSans_A_Rg',
    margin: 13,
  },
  buttonActive: {
    height: 45,
    width: screenWidth* 0.9,
    borderRadius: 10,
    backgroundColor: 'grey',
    margin: 3,
  },
});

export default Choose;
