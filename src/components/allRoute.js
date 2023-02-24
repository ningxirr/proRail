"use strict";
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import stationInfo from '../../data/station_info.json';
import FavoriteRoute from '../views/FavoriteRoute';
import Route from './route';
import RouteDescription from './routeDescription';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AllRoute = (props) => {
    console.log(props.routes)
    return( 
        <View style = {Styles.overall_component_view}>
            {
                props.routes.map((route, index) => 
                <View key={index}>
                    {
                        props.routes.length !== 1 ?
                        <RouteDescription 
                            index={index} 
                            time={route.time} 
                            interchange={route.length}
                            price={route.price}/> : null
                    }
                    {
                        route.path.map((item, index) => 
                        // console.log(route.path[index+1] !== undefined ? route.path[index+1][0] : null)
                        <View key={index}>
                            <Route 
                            key={index}
                            route={item}
                            walk={route.walk[index-1]}
                            price={route.price[index]}
                            haveToWalk={index === 0 ? false : true}
                            
                            // item={route.walk[index]}
                            // path={item.path} 
                            // walk={route.walk[index]}
                            // route_en={stationInfo[route.path]} 
                            // route_th={item.station.th}
                            // price={route.fastest.price}
                        /></View>
                        )
                    }
                   
                </View>)
                

                // props.routes.map((route, index) => (
                //     <View key={index}>
                //         {
                //             props.path === 'fastest' ?
                //             <View>
                //                 {
                //                     props.routes.length !== 1 ?
                //                     <RouteDescription 
                //                         index={index} 
                //                         time={route.fastest.time} 
                //                         interchange={route.fastest.interchange}
                //                         price={route.fastest.price}/> : null
                //                 }
                //                 {
                //                     route.fastest.route.map((item, index) => (
                //                         <Route 
                //                             key={index}
                //                             item={item.walk}
                //                             path={item.path} 
                //                             walk={item.walk}
                //                             route_en={item.station.en} 
                //                             route_th={item.station.th}
                //                             price={route.fastest.price}/>
                //                     ))
                //                 }
                //             </View>
                //             :
                //             props.path === 'cheapest' ?
                //             <View>
                //                 <RouteDescription 
                //                     index={index} 
                //                     time={route.chepest.time} 
                //                     interchange={route.chepest.interchange}
                //                     price={route.chepest.price}/>
                //                 {
                //                     route.chepest.route.map((item, index) => (
                //                         <Route 
                //                             key={index}
                //                             item={item.walk}
                //                             path={item.path} 
                //                             walk={item.walk}
                //                             route_en={item.station.en} 
                //                             route_th={item.station.th}
                //                             price={route.chepest.price}/>
                //                     ))
                //                 }
                //             </View>
                //             :
                //             props.path === 'leastInterchanges' ?
                //             <View>
                //                 <RouteDescription 
                //                     index={index} 
                //                     time={route.chepest.time} 
                //                     interchange={route.chepest.interchange}
                //                     price={route.chepest.price}/>
                //                 {
                //                     route.leastInterchanges.route.map((item, index) => (
                //                         <Route 
                //                             key={index}
                //                             item={item.walk}
                //                             path={item.path} 
                //                             walk={item.walk}
                //                             route_en={item.station.en} 
                //                             route_th={item.station.th}
                //                             price={route.leastInterchanges.price}/>
                //                     ))
                //                 }
                //             </View>
                //             :
                //             <View>
                //             <RouteDescription 
                //                time={route.time} 
                //                interchange={route.interchange}
                //                price={route.price}/>
                //             {
                //                 route.route.map((item, index) => (
                //                     <Route 
                //                         key={index}
                //                         item={item.walk}
                //                         path={item.path} 
                //                         walk={item.walk}
                //                         route_en={item.station.en} 
                //                         route_th={item.station.th}
                //                         price={item.price}/>
                //                 ))
                //             }
                //             </View>
                //         }
                //     </View>  
                // ))
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