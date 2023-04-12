"use strict";
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Route from './route';
import RouteDescription from './routeDescription';

const AllRoute = (props) => {
    return( 
        <View style = {Styles.overall_component_view}>
            {
                props.routes.map((route, index) => 
                <View key={index}>
                    {
                        props.routes.length !== 1 ?
                        <RouteDescription 
                            index={index} 
                            time={Math.ceil(route.time)} 
                            interchange={route.path.length-1}
                            price={Math.ceil(route.price.reduce((sum, x) => sum + x, 0))}/> : null
                    }
                    {
                        route.path.map((item, index) => 
                            (item.length === 1 && item[0] === 'CEN') || item.length === 1 && item[0] === 'BL01' ? null :
                            <View key={index}> 
                                <Route 
                                    index={index}
                                    route={item}
                                    walk={route.walk[index-1]}
                                    price={route.price[index]}
                                    haveToWalk={index === 0 ? false : true}
                                />
                            </View>
                        )
                    }
                   
                </View>)
            } 
        </View>
    );
}

const Styles = StyleSheet.create({
    overall_component_view: {
        marginHorizontal : 25,
        paddingBottom: 100  
    }
});

export default AllRoute;