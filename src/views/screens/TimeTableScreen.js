import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Row, Table} from 'react-native-table-component';
import freqJS from '../../../data/freq.json';
import schJS from '../../../data/schedule.json';
import StationInfo from '../../../data/station_info.json';
import flTime from '../../../data/flt.json';

const checkStyleBorder = (index, data) => {
  if (index === 0 && data.length - 1 === 0) {
    console.log('borderOne');
    return styles.borderOne;
  } else if (index === 0) {
    console.log('borderFirst');
    return styles.borderFirst;
  } else if (index === data.length - 1) {
    console.log('borderLast');
    return styles.borderLast;
  } else {
    return styles.borderNormal;
  }
};

const lineBorder = index => {
  if (index !== 0) {
    return styles.line;
  }
};

const Day = ({pf}) => {
  if (pf === '1' || pf === '2' || pf === '4' || pf === '5' || pf === '9') {
    console.log(pf)
    console.log('Mon-Fri Sat-Sun')
    console.log(freqJS[pf]['Mon-Fri'][0].period_time)
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Text style={{  marginBottom: 15, fontSize: 20, fontFamily: 'LINESeedSansApp-Regular', color: 'black'}}>Departure Frequency</Text>
        <Text style={{ fontSize: 15, fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>Monday - Friday</Text>
        <View style={{paddingBottom: 20, alignItems: 'center'}}>
          <View style={{marginTop: 10, marginBottom: 10, borderRadius: 13, width: 360,paddingVertical: 10, backgroundColor: '#ECEBEB'}}>
            <Table >
              <Row
                data = {['Period','Duration/Train(mins)']}
                flexArr = {[1,1]}
                textStyle = {{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black',
                }}
              />
            </Table>
          </View>
          <View>
            {freqJS[pf]['Mon-Fri'].map((item,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row'}}>
                  {/* <View style={{borderRadius: 13, width: 120, backgroundColor: '#ECEBEB'}}>
                    <Text style={{ margin: 15, fontSize: 12, textAlign: 'left'}}>{item.name_en}</Text>
                  </View> */}
                  {/* <View style={index===0? styles.borderFirst:styles.borderNormal}> */}
                  <View style={checkStyleBorder(index,freqJS[pf]['Mon-Fri'])}>
                    <Text style={styles.textItem}>{item.period_time}</Text>
                  </View>
                  <View style={{...lineBorder(index), width: 180, backgroundColor: 'transparent'}}>
                    <Text style={styles.textItem}>{item.period_interval}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
        <Text style={{ fontSize: 15, fontFamily: 'LINESeedSansApp-Bold', color: 'black'}} >Saturday - Sunday {'\n'}& Public Holidays</Text>
        <View style={{alignItems:'center',paddingBottom: 20,backgroundColor: 'transparent'}}>
          <View style={{marginTop: 10, marginBottom: 10, borderRadius: 13,  width: 360,paddingVertical: 10, backgroundColor: '#ECEBEB'}}>
            <Table >
              <Row
                data = {['Period','Duration/Train(mins)']}
                
                flexArr = {[1,1]}
                textStyle = {{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black',
                  
                }}
              />
            </Table>
          </View>
          <View>
            {freqJS[pf]['Sat-Sun'].map((item,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row'}}>
                  {/* <View style={{borderRadius: 13, width: 120, backgroundColor: '#ECEBEB'}}>
                    <Text style={{ margin: 15, fontSize: 12, textAlign: 'left'}}>{item.name_en}</Text>
                  </View> */}
                  <View style={checkStyleBorder(index,freqJS[pf]['Sat-Sun'])}>
                    <Text style={styles.textItem}>{item.period_time}</Text>
                  </View>
                  <View style={{...lineBorder(index), width: 180, backgroundColor: 'transparent'}}>
                    <Text style={styles.textItem}>{item.period_interval}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
  else if (pf === '3') {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Text style={{fontSize: 15, fontFamily: 'LINESeedSansApp-Bold', fontWeight: 'bold'}}>Monday - Friday</Text>
        <View style={{paddingBottom: 20}}>
          <View style={{marginTop: 10, marginBottom: 10, borderRadius: 13,  width: 360, paddingVertical: 10,backgroundColor: '#ECEBEB'}}>
            <Table >
              <Row
                data = {['Period','Duration/Train(mins)']}
                flexArr = {[1,1]}
                textStyle = {{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black',
                  
                }}
              />
            </Table>
          </View>
          <View>
            {freqJS[pf]['Mon-Fri'].map((item,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row'}}>
                  <View style={checkStyleBorder(index,freqJS[pf]['Mon-Fri'])}>
                    <Text style={styles.textItem}>{item.period_time}</Text>
                  </View>
                  <View style={{...lineBorder(index), width: 180, backgroundColor: 'transparent'}}>
                    <Text style={styles.textItem}>{item.period_interval}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
        <Text style={{fontSize: 15, fontFamily: 'LINESeedSansApp-Bold', fontWeight: 'bold'}}>Saturday</Text>
        <View style={{alignItems:'center',paddingBottom: 20,backgroundColor: 'transparent'}}>
          <View style={{marginTop: 10, marginBottom: 10, borderRadius: 13,  width: 360,paddingVertical: 10, backgroundColor: '#ECEBEB'}}>
            <Table >
              <Row
                data = {['Period','Duration/Train(mins)']}
                
                flexArr = {[1,1]}
                textStyle = {{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black',
                  
                }}
              />
            </Table>
          </View>
          <View>
            {freqJS[pf]['Sat'].map((item,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row'}}>
                  <View style={checkStyleBorder(index,freqJS[pf]['Sat'])}>
                    <Text style={styles.textItem}>{item.period_time}</Text>
                  </View>
                  <View style={{...lineBorder(index), width: 180, backgroundColor: 'transparent'}}>
                    <Text style={styles.textItem}>{item.period_interval}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
        <Text style={{fontSize: 15, fontFamily: 'LINESeedSansApp-Bold', fontWeight: 'bold'}}>Sunday</Text>
        <View style={{alignItems:'center',paddingBottom: 20,backgroundColor: 'transparent'}}>
          <View style={{marginTop: 10, marginBottom: 10, borderRadius: 13,  width: 360,paddingVertical: 10, backgroundColor: '#ECEBEB'}}>
            <Table >
              <Row
                data = {['Period','Duration/Train(mins)']}
                
                flexArr = {[1,1]}
                textStyle = {{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black',
                  
                }}
              />
            </Table>
          </View>
          <View>
            {freqJS[pf]['Sun'].map((item,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row'}}>
                  <View style={checkStyleBorder(index,freqJS[pf]['Sun'])}>
                    <Text style={styles.textItem}>{item.period_time}</Text>
                  </View>
                  <View style={{...lineBorder(index), width: 180, backgroundColor: 'transparent'}}>
                    <Text style={styles.textItem}>{item.period_interval}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
  else if (pf === '10' || pf === '11') {
    console.log(pf)
    console.log('EveryDay')
    return (
      <View>
        <Text style={{fontSize: 15,  fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>Everyday</Text>
        <View style={{alignItems:'center',paddingBottom: 20}}>
          <View style={{marginTop: 10, marginBottom: 10, borderRadius: 13,  width: 360,paddingVertical: 10, backgroundColor: '#ECEBEB'}}>
            <Table >
              <Row
                data = {['Period','Duration/Train(mins)']}
                
                flexArr = {[1,1]}
                textStyle = {{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black',
                  
                }}
              />
            </Table>
          </View>
          <View>
            {freqJS[pf]['Every'].map((item,index) => {
              return (
                <View key={index} style={{ flexDirection: 'row'}}>
                  {/* <View style={{borderRadius: 13, width: 120, backgroundColor: '#ECEBEB'}}>
                    <Text style={{ margin: 15, fontSize: 12, textAlign: 'left'}}>{item.name_en}</Text>
                  </View> */}
                  <View style={checkStyleBorder(index,freqJS[pf]['Every'])}>
                    <Text style={styles.textItem}>{item.period_time}</Text>
                  </View>
                  <View style={{...lineBorder(index), width: 180, backgroundColor: 'transparent'}}>
                    <Text style={styles.textItem}>{item.period_interval}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
  else {
    return ''
  }
}

const Time = ({st, pf, activeTab}) => {
  if (pf === '5') {
    console.log(pf);
    console.log('Mon-Fri Sat-Sun');
    console.log(activeTab)
    // return 1
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 20,
            fontFamily: 'LINESeedSansApp-Bold',
            color: 'black'
          }}>
          TimeTable
        </Text>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <View
            style={{
              marginTop: 1,
              marginBottom: 10,
              borderRadius: 13,
              width: 360,
              backgroundColor: '#ECEBEB',
            }}>
            <Table>
              <Row
                data={['Monday - Friday']}
                height={33}
                flexArr={[1]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black'
                }}
              />
            </Table>
          </View>
          <View>
            {schJS[pf][st][activeTab]['Mon-Fri'].map((item, index) => {
              return (
                <View key={index} style={{flexDirection: 'row'}}>
                  {/* <View style={{borderRadius: 13, width: 120, backgroundColor: '#ECEBEB'}}>
                    <Text style={{ margin: 15, fontSize: 12, textAlign: 'left'}}>{item.name_en}</Text>
                  </View> */}
                  {/* <View style={index===0? styles.borderFirst:styles.borderNormal}> */}
                  <View
                    style={checkStyleBorder(
                      index,
                      schJS[pf][st][activeTab]['Mon-Fri'],
                    )}>
                    <Text style={styles.textItem}>{item.clock} o'clock</Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 180,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        {/* <Text style={{marginTop: 20, marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>TimeTable</Text> */}
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <View
            style={{
              marginTop: 1,
              marginBottom: 10,
              borderRadius: 13,
              width: 360,
              backgroundColor: '#ECEBEB',
            }}>
            <Table>
              <Row
                data={['Saturday - Sunday and Public Holidays']}
                height={33}
                flexArr={[1]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black'
                }}
              />
            </Table>
          </View>
          <View>
            {schJS[pf][st][activeTab]['Sat-Sun'].map((item, index) => {
              return (
                <View key={index} style={{flexDirection: 'row'}}>
                  {/* <View style={{borderRadius: 13, width: 120, backgroundColor: '#ECEBEB'}}>
                    <Text style={{ margin: 15, fontSize: 12, textAlign: 'left'}}>{item.name_en}</Text>
                  </View> */}
                  <View
                    style={checkStyleBorder(
                      index,
                      schJS[pf][st][activeTab]['Sat-Sun'],
                    )}>
                    <Text style={styles.textItem}>{item.clock}</Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 180,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  } else if (pf === '10' || pf === '11') {
    console.log(pf);
    console.log(st);
    console.log('EveryDay');
    console.log(schJS[pf][st][activeTab]['Every']);
    console.log('.......');
    // return 1
    return (
      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 20,
            fontFamily: 'LINESeedSansApp-Bold',
            color: 'black'
          }}>
          TimeTable
        </Text>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <View
            style={{
              marginTop: 1,
              marginBottom: 10,
              borderRadius: 13,
              width: 360,
              backgroundColor: '#ECEBEB',
            }}>
            <Table>
              <Row
                data={['Everyday']}
                height={33}
                flexArr={[1]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black'
                }}
              />
            </Table>
          </View>
          <View>
            {schJS[pf][st][activeTab]['Every'].map((item, index) => {
              return (
                <View key={index} style={{flexDirection: 'row'}}>
                  {/* <View style={{borderRadius: 13, width: 120, backgroundColor: '#ECEBEB'}}>
                    <Text style={{ margin: 15, fontSize: 12, textAlign: 'left'}}>{item.name_en}</Text>
                  </View> */}
                  <View
                    style={checkStyleBorder(
                      index,
                      schJS[pf][st][activeTab]['Every'],
                    )}>
                    <Text style={styles.textItem}>{item.clock} o'clock</Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 180,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
  else {
    return ''
  }
};

const BGroup = ({buttons, code}) => {
  const [activeTab, setActiveTab] = useState(0);
  if (buttons.length == 1) {
    return (
      <View>
        <View style={{
          paddingVertical: 10,
          marginTop: -5,
          marginBottom: 10, 
          width: '100%', 
          flexDirection: 'row', 
          backgroundColor: StationInfo[code].platform.color.color, 
          borderBottomRightRadius: 20, 
          borderBottomLeftRadius: 20,
          justifyContent: 'center',
          }}>
          <View style={{alignSelf:'center'}}>
          {buttons.map((buttonLabel, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setActiveTab(index);
                }}
                key={index}
                style={
                  activeTab == index
                    ? {...styles.buttonActive, width: 345}
                    : {
                        ...styles.button,
                        width: 345,
                        backgroundColor: 'transparent',
                      }
                }>
                <Text
                  style={
                    activeTab == index
                      ? {
                          ...styles.textActive,
                          color: StationInfo[code].platform.color.color,
                        }
                      : styles.text
                  }>
                  {buttonLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
          </View>
          
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 13,
              width: 360,
              backgroundColor: '#ECEBEB',
              alignSelf: 'center',
            }}>
            <Table>
              <Row
                data={['', 'First train', 'Last train']}
                height={33}
                flexArr={[1, 1, 1]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black'
                }}
              />
            </Table>
          </View>
          <View>
            {flTime[code][activeTab].map((item, index) => {
              console.log(item);
              return (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <View
                    style={{
                      ...checkStyleBorder(index, flTime[code][activeTab]),
                      ...lineBorder(index),
                      width: 120,
                    }}>
                    <Text style={{margin: 15, fontSize: 12, textAlign: 'left', fontFamily: 'LINESeedSansApp-Bold', color: 'black'}}>
                      {item.name_en}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 120,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.first}</Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 120,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.last}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>
              <Time
                st={flTime[code][activeTab][0].station_id}
                pf={flTime[code][activeTab][0].platform_line_id}
                activeTab={flTime[code][activeTab][0].direction}
              />
            </Text>
          </View>
          
          <View style = {{alignItems: 'center'}}>
            <Text>
              <Day pf={flTime[code][activeTab][0].platform_line_id}/>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <View style={{
          paddingVertical: 10,
          marginBottom: 10, 
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center', 
          backgroundColor: StationInfo[code].platform.color.color, 
          borderBottomRightRadius: 20, 
          borderBottomLeftRadius: 20
          }}>
          {buttons.map((buttonLabel, index) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab(index);
                  }}
                  key={index}
                  style={
                    activeTab == index
                      ? styles.buttonActive
                      : {...styles.button, backgroundColor: 'transparent'}
                  }>
                  <Text
                    style={
                      activeTab == index
                        ? {
                            ...styles.textActive,
                            color: StationInfo[code].platform.color.color,
                          }
                        : styles.text
                    }>
                    {buttonLabel}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <ScrollView style={{alignSelf: 'center'}}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 13,
              width: 360,
              backgroundColor: '#ECEBEB',
              alignSelf: 'center',
            }}>
            <Table>
              <Row
                data={['', 'First train', 'Last train']}
                height={33}
                flexArr={[1, 1, 1]}
                textStyle={{
                  textAlign: 'center',
                  fontFamily: 'LINESeedSansApp-Regular',
                  color: 'black'
                }}
              />
            </Table>
          </View>
          <View>
            {flTime[code][activeTab].map((item, index) => {
              console.log(item);
              return (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <View
                    style={{
                      ...checkStyleBorder(index, flTime[code][activeTab]),
                      ...lineBorder(index),
                      width: 120,
                    }}>
                    <Text style={{margin: 15, fontSize: 12, textAlign: 'left', fontFamily: 'LINESeedSansApp-Regular',color: 'black'}}>
                      {item.name_en}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 120,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.first}</Text>
                  </View>
                  <View
                    style={{
                      ...lineBorder(index),
                      width: 120,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.textItem}>{item.last}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>
              <Time
                st={flTime[code][activeTab][0].station_id}
                pf={flTime[code][activeTab][0].platform_line_id}
                activeTab={activeTab + 1}
              />
            </Text>
          </View>
          <View style = {{alignItems: 'center'}}>
            <Text>
              <Day pf={flTime[code][activeTab][0].platform_line_id}/>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
};

const TimeTable = ({route}) => {
  const code = route.params.route.code;
  console.log(code)
  console.log(flTime[code].length);
  let dir = [];
  if (flTime[code].length == 1) {
    dir.push('To '+flTime[code][0][0].dirname);
  } else {
    dir.push('To '+flTime[code][0][0].dirname);
    dir.push('To '+flTime[code][1][0].dirname);
  }
  console.log(dir);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={true}>
        <View style={styles.body}>
          <View
            style={{
              ...styles.header,
              backgroundColor: StationInfo[code].platform.color.color,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'LINESeedSansApp-Bold',
                marginTop: 100,
                marginLeft: 15,
                paddingBottom: 10
              }}>
              {flTime[code][0][0].stname_en}'s Departure Time
            </Text>
          </View>
          <View>
              <BGroup buttons={dir} code={code} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  body: {
    flex: 9,
  },
  footer: {
    flex: 1,
  },
  header: {
    width: '100%',
  },
  textItem: {
    margin: 15,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'LINESeedSansApp-Regular',
    color: 'black',
  },
  borderNormal: {
    width: 180,
    backgroundColor: '#ECEBEB',
  },
  borderFirst: {
    width: 180,
    backgroundColor: '#ECEBEB',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  borderLast: {
    width: 180,
    backgroundColor: '#ECEBEB',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  borderOne: {
    width: 180,
    backgroundColor: '#ECEBEB',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  line: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    // width: '100%'
  },
  button: {
    height: 45,
    width: 170,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    margin: 3,
  },
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'LINESeedSansApp-Regular',
    margin: 13,
  },
  buttonActive: {
    height: 45,
    width: 170,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    margin: 3,
  },
  textActive: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'LINESeedSansApp-Regular',
    margin: 13,
  },
});

export default TimeTable;
