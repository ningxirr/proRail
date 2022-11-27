import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const BrieflyRoute = (props) => {
    /*let Interchange = [
      {
        "from": {
            "key": "1",
            "station":{
                "en": "ฺBangkhae",
                "th": "บางแค"
            },
            color: "#325E9A"
        },
        "to":{
            "key": "10",
            "station":{
                "en": "Sala Daeng",
                "th": "ศาลาแดง"
            },
            "color": "#76B729"
        }, 
        "walk": "7"
      }
    ]
    return( 
      <View style={Styles.overall_component}>
        {Interchange.map((item) => (
          <View>
            {item.from.key == item.to.key?
                <View>
  
                </View>
              :
                <View>
                    <View style={[Styles.component, {borderLeftColor: item.from.color}]}>
                        <Icon name="subway" size={screenHeight*0.03} color="black" style={{marginHorizontal:screenWidth*0.02}}/>
                        <Text style={Styles.text_station_en_name}>
                            to
                        </Text>
                        <View style={Styles.station_name_component}>
                            <Text style={Styles.text_station_en_name}>
                                {item.from.station.en}
                            </Text>
                            <Text style={Styles.text_station_th_name}>
                                {item.from.station.th}
                            </Text>
                        </View>
                    </View>
                    <View style={Styles.walk_component}>
                        <Icon name="walking" size={screenHeight*0.03} color="black" style={{marginHorizontal:screenWidth*0.02}}/>
                        <Text>
                            {item.walk} mins to
                        </Text>
                        <Text style={Styles.text_station_en_name}>
                            {item.from.station.en}
                        </Text>
                    </View>
                </View>
            }
          </View>
        ))}
      </View>
    );*/
}

const Styles = StyleSheet.create({
    overall_component: {
        margin:screenHeight*0.015
    },
    component: {
        padding: screenHeight*0.02,
        borderWidth:1,
        borderLeftWidth: 10,
        borderRadius: 10,
        flexDirection:'row',
    },
    text_to:{

    },
    station_name_component: {
        marginLeft: screenWidth*0.1
    },
    text_station_en_name: {
        fontSize: screenHeight*0.016,
        fontWeight: 'bold'
    },
    text_station_th_name: {
        fontSize: screenHeight*0.014,
        fontWeight: 'normal'
    },
    walk_component: {
        marginHorizontal: screenHeight*0.015,
        marginVertical: screenHeight*0.015,
        flexDirection:'row',
    }
});

  export default BrieflyRoute;