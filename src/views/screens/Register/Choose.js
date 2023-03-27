import React, {useState} from 'react';
import {ImageBackground, Text, View, StyleSheet, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from 'react-native-reanimated';
import {PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from '../../../components/customButton';
import storeDataToAsyncStorage from '../../../function/storeDataToAsyncStorage';

const ChooseScreen = ({navigation}) => {
  if(Platform.OS === 'ios'){
    const [recommendedOrder, setRecommendedOrder] = useState({"1": 0, "2": 1, "3": 2});
    const clamp = (value, lowerBound, upperBound) => {
      'worklet';
      return Math.max(lowerBound, Math.min(value, upperBound));
    };
    
    const objectMove = (object, from, to) => {
      'worklet';
      const newObject = Object.assign({}, object);
    
      for (const id in object) {
        if (object[id] === from) {
          newObject[id] = to;
        }
        if (object[id] === to) {
          newObject[id] = from;
        }
      }
      return newObject;
    };
    
    const listToObject = (list) => {
        const values = Object.values(list);
        const object = {};
        for (let i = 0; i < values.length; i++) {
          object[values[i].id] = i;
        }
        return object;
      }
    
    const Choose = [
      {
        id: '1',
        title: 'Fastest',
      },
      {
        id: '2',
        title: 'Cheapest',
      },
      {
        id: '3',
        title: 'Lastest Interchange',
      },
    ];
    
    const HEIGHT = 65;
    const ABOVE_HEIGHT = 480;
    
    const Buttons = ({title}) => {
      return (
        <View style={styles.buttonInactive}>
          <Text style={styles.text}>{title}</Text>
        </View>
      );
    };
    
    const Movable = ({id, title, positions, scrollY, Count}) => {
      const [moving, setMoving] = useState(false);
      const top = useSharedValue(positions.value[id] * HEIGHT);
      useAnimatedReaction(
        () => positions.value[id],
        (currentPosition, previousPosition) => {
          if (currentPosition !== previousPosition) {
            if (!moving) {
              top.value = withSpring(currentPosition * HEIGHT);
            }
          }
        },
        [moving],
      );
      const gestureHandler = useAnimatedGestureHandler({
        onStart() {
          runOnJS(setMoving)(true);
        },
        onActive(event) {
        //   const positionY = event.absoluteY + scrollY.value;
          const positionY = event.absoluteY + scrollY.value - ABOVE_HEIGHT + HEIGHT;
    
          top.value = withTiming(positionY - HEIGHT, {
            duration: 16,
          });
          const newPosition = clamp(
            Math.floor(positionY / HEIGHT),
            0,
            Count - 1,
          );
          if (newPosition !== positions.value[id]) {
            positions.value = objectMove(
              positions.value,
              positions.value[id],
              newPosition,
            );
          }
        },
        onFinish() {
          top.value = positions.value[id] * HEIGHT;
          runOnJS(setMoving)(false);
          setRecommendedOrder(positions.value);
        },
      });
      const animatedStyle = useAnimatedStyle(() => {
        return {
          position: 'absolute',
          left: 0,
          right: 0,
          top: top.value,
          zIndex: moving ? 1 : 0,
          shadowColor: 'black',
          // shadowOffset: {
          //   height: 0,
          //   width: 0,
          // },
          shadowOpacity: withSpring(moving ? 0.2 : 0),
          shadowRadius: 10,
          elevation: 10,
        };
      }, []);
      
      return (
        <Animated.View style={animatedStyle}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View>
              <Buttons title={title} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      );
    };
    
    const TextDrag = () => {
      return (
        <View style={styles.textDrag}>
          <Text style={{fontSize: 40, fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>
            Personalized
          </Text>
          <Text style={{paddingTop: 100, fontSize: 24, fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>
            Drag and reorder{'\n'}your route preference?
          </Text>
        </View>
      );
    };
    const positions = useSharedValue(listToObject(Choose));
    const scrollY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler(event => {
      scrollY.value = event.contentOffset.y;
    });
    
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <GestureHandlerRootView style={{flex: 1}}>
            <ImageBackground source={require('../../../../assets/images/rocket.jpg')} resizeMode="cover" style={styles.image} />
            <TextDrag/>
            <Animated.ScrollView
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={{
                flex: 1,
                position: 'relative',
                backgroundColor: 'white',
              }}
              contentContainerStyle={{
                height: Choose.length * HEIGHT,
              }}>
              {Choose.map(item => (
                <Movable
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  positions={positions}
                  scrollY={scrollY}
                  Count={Choose.length}
                />
              ))}
            </Animated.ScrollView>
            <View style={styles.footer}>
              <CustomButton 
                  text="Let's go!" 
                  backgroundColor={'#000000'} 
                  textColor={'#FFFFFF'} 
                  width={'90%'} 
                  function={()=>{
                    navigation.navigate('HomeProRailNavigator')
                    if (recommendedOrder["1"] === 0 && recommendedOrder["2"] === 1 && recommendedOrder["3"] === 2){
                      storeDataToAsyncStorage('@recommended', ['fastest', 'cheapest', 'leastInterchanges']);
                    }
                    else if (recommendedOrder["1"] === 0 && recommendedOrder["2"] === 2 && recommendedOrder["3"] === 1){
                      storeDataToAsyncStorage('@recommended', ['fastest', 'leastInterchanges', 'cheapest']);
                    }
                    else if (recommendedOrder["1"] === 1 && recommendedOrder["2"] === 0 && recommendedOrder["3"] === 2){
                      storeDataToAsyncStorage('@recommended', ['cheapest', 'fastest', 'leastInterchanges']);
                    }
                    else if (recommendedOrder["1"] === 1 && recommendedOrder["2"] === 2 && recommendedOrder["3"] === 0){
                      storeDataToAsyncStorage('@recommended', ['cheapest', 'leastInterchanges', 'fastest']);
                    }
                    else if (recommendedOrder["1"] === 2 && recommendedOrder["2"] === 0 && recommendedOrder["3"] === 1){
                      storeDataToAsyncStorage('@recommended', ['leastInterchanges', 'fastest', 'cheapest']);
                    }
                    else if (recommendedOrder["1"] === 2 && recommendedOrder["2"] === 1 && recommendedOrder["3"] === 0){
                      storeDataToAsyncStorage('@recommended', ['leastInterchanges', 'cheapest', 'fastest']);
                    }
                  }}/>
              </View>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  const [recommended, setRecommended] = useState(['cheapest', 'fastest', 'leastInterchanges']);
  const [selectedCheapest, setSelectedCheapest] = useState(true);
  const [selectedFastest, setSelectedFastest] = useState(false);
  const [selectedLeastInterchanges, setSelectedLeastInterchanges] = useState(false);
  return (
    <SafeAreaView style={androidStyles.container}>
        <ImageBackground source={require('../../../../assets/images/rocket.jpg')} resizeMode="cover" style={androidStyles.image} ></ImageBackground>
        <View style={androidStyles.body}>
          <Text style={{paddingTop: 110,fontSize: 40,fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>Personalized</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{paddingBottom: 20,fontSize: 24,fontFamily: 'LINESeedSans_A_Bd', color: 'black'}}>Which route style{'\n'}that matched you ?</Text>
          </View>
          <View style={{paddingVertical: 5}}>
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
              }}/>
          </View>
        </View>
        <View style={androidStyles.footer}>
          <CustomButton 
            text="Let's Go" 
            backgroundColor={'#000000'} 
            textColor={'#FFFFFF'} 
            width={'90%'} 
            function={()=> {
              storeDataToAsyncStorage('@recommended', recommended);
              navigation.navigate('BottomNavigator')
            }}/>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 9,
  },
  footer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    right: -200,
    top: -300,
    height: 800,
    width: 300,
  },
  button: {
    height: 45,
    width: 358,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonInactive: {

    width: '90%',
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    marginHorizontal: 20,
  },
  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'LINESeedSans_A_Rg',
  },
  textDrag: {
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

const androidStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 9,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    right: -200,
    top: -280,
    height: 800,
    width: 300,
  },
  button: {
    height: 45,
    width: 358,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonInactive: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    marginHorizontal: 20,
  },
  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'LINESeedSans_A_Rg',
  },
  textDrag: {
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

export default ChooseScreen;

