"use strict";
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import FavoriteRoute from '../views/FavoriteRoute';
import Route from './route';
import RouteDescription from './routeDescription';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AllRoute = (props) => {

    return( 
        <View style = {Styles.overall_component_view}>
            {
                props.routes.map((route, index) => (
                    <View key={index}>
                        {
                            props.path === 'Fastest' ?
                            <View>
                                {
                                    props.routes.length !== 1 ?
                                    <RouteDescription 
                                        index={index} 
                                        time={route.fastest.time} 
                                        interchange={route.fastest.interchange}
                                        price={route.fastest.price}/> : null
                                }
                                {
                                    route.fastest.route.map((item, index) => (
                                        <Route 
                                            key={index}
                                            item={item.walk}
                                            path={item.path} 
                                            walk={item.walk}
                                            route_en={item.station.en} 
                                            route_th={item.station.th}
                                            price={route.fastest.price}/>
                                    ))
                                }
                            </View>
                            :
                            props.path === 'Cheapest' ?
                            <View>
                                <RouteDescription 
                                    index={index} 
                                    time={route.chepest.time} 
                                    interchange={route.chepest.interchange}
                                    price={route.chepest.price}/>
                                {
                                    route.chepest.route.map((item, index) => (
                                        <Route 
                                            key={index}
                                            item={item.walk}
                                            path={item.path} 
                                            walk={item.walk}
                                            route_en={item.station.en} 
                                            route_th={item.station.th}
                                            price={route.chepest.price}/>
                                    ))
                                }
                            </View>
                            :
                            props.path === 'Least Interchanges' ?
                            <View>
                                <RouteDescription 
                                    index={index} 
                                    time={route.chepest.time} 
                                    interchange={route.chepest.interchange}
                                    price={route.chepest.price}/>
                                {
                                    route.leastInterchanges.route.map((item, index) => (
                                        <Route 
                                            key={index}
                                            item={item.walk}
                                            path={item.path} 
                                            walk={item.walk}
                                            route_en={item.station.en} 
                                            route_th={item.station.th}
                                            price={route.leastInterchanges.price}/>
                                    ))
                                }
                            </View>
                            :
                            <View>
                            <RouteDescription 
                               time={route.time} 
                               interchange={route.interchange}
                               price={route.price}/>
                            {
                                route.route.map((item, index) => (
                                    <Route 
                                        key={index}
                                        item={item.walk}
                                        path={item.path} 
                                        walk={item.walk}
                                        route_en={item.station.en} 
                                        route_th={item.station.th}
                                        price={item.price}/>
                                ))
                            }
                            </View>
                        }
                    </View>  
                ))
            } 
        </View>
    );
}

const Styles = StyleSheet.create({
    overall_component_view: {
        marginHorizontal :screenHeight*0.025,
    }
});

export default AllRoute;