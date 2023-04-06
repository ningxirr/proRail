import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from '../../../components/customButton'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Header from '../../../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';

const image = require('../../../../assets/images/feature.png')
const slideFeature1 = require('../../../../assets/images/slideFeature1.png')
const slideFeature2 = require('../../../../assets/images/slideFeature2.png')
const slideFeature3 = require('../../../../assets/images/slideFeature3.png')
const screenWidth = Dimensions.get('window').width;

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

data = [
    {
        source: slideFeature1
    },
    {
        source: slideFeature2
    },
    {
      source: slideFeature3
    },
  ]

const CarouselCardItem = ({ item, index }) => {
    return (
        <View>
            <Image source={item.source} style={styles.image} resizeMode='contain'/>
        </View>
    )
  }

const CarouselCards = () => {
    const [index, setIndex] = React.useState(0)
    const isCarousel = React.useRef(null)

    return (
      <View>
        <Carousel
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
          // fix slide animate
        />
        <View>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'white'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        </View>
        
    )
  }

const Feature = (props) => {
  return (
    <Fragment>
        <SafeAreaView style={{ flex:0, backgroundColor: 'white' }} edges={['right', 'left', 'top']} />
            <View style={[styles.icon_header_view]}>
              <TouchableOpacity style={{width: 25, height: 25}} onPress={()=>props.navigation.goBack()}>
                <Icon name='angle-left' color={'black'} size={25} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.prorail_view}>
                    <Text style={styles.prorail_text}>{`proRail\nFeatures`}</Text>
                </View>
                <View style={styles.image_view}>
                    <Image source={image} style={styles.image_size}/>
                </View>
                <View style={{backgroundColor: 'black', paddingTop: 20, marginTop: -100}}>
                    <CarouselCards />
                    <View style={styles.footer}>
                        <CustomButton 
                        text="Let's go!" 
                        backgroundColor={'#FFFFFF'} 
                        textColor={'#000000'} 
                        width={screenWidth*0.9} 
                        function={()=>{
                            props.navigation.navigate('Choose', {
                            routes: props.routes 
                          })
                        }}/>
                    </View>
                </View>
            </ScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
    prorail_text: {
        fontFamily: 'LINESeedSansApp-Bold',
        fontSize: 40,
        color: 'black'
    },
    prorail_view: {
        marginHorizontal: 20
    },
    image_size: {
        width: 500,
        height: 500
    },
    image_view: {
        marginTop: -110,
        marginLeft: 30
    },
    footer: {
        flex: 1,
        paddingBottom: 20,
        justifyContent: 'flex-end'
    },
    image: {
        width: ITEM_WIDTH,
        height: 700,
    },
    icon_header_view: {
      paddingTop: 5,
      paddingHorizontal: 20,
      // backgroundColor: 'transparent'
      backgroundColor: 'white'
    },
})

export default Feature