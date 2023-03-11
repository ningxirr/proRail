"use strict";
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
                            time={route.time} 
                            interchange={route.path.length}
                            price={route.price.reduce((sum, x) => sum + x, 0)}/> : null
                    }
                    {
                        route.path.map((item, index) => 
                        <View key={index}>
                            <Route 
                                key={index}
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
    }
});

export default AllRoute;