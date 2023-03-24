// // import React, {useState, useEffect} from 'react';
// // import {View, Text} from 'react-native';
// // import Geolocation from 'react-native-geolocation-service';
// // import notifee from '@notifee/react-native';

// // async function onDisplayNotification(latitude, longitude) {
// //         // Request permissions (required for iOS)
// //         await notifee.requestPermission()
        
    
// //         // Create a channel (required for Android)
// //         const channelId = await notifee.createChannel({
// //           id: 'default',
// //           name: 'Default Channel',
// //         });
// //         const latlong = {
// //             latitude: latitude,
// //             longitude: longitude
// //         }
// //         console.log(latitude)
// //         console.log(longitude)
// //         // Display a notification
// //         await notifee.displayNotification({
// //           title: 'Notification Title',
// //           body: JSON.stringify(latlong),
// //           android: {
// //             channelId,
// //             pressAction: {
// //               id: 'default',
// //             },
// //           },
// //         });
// //       }

// // const WatchLocation = () => {
// //   const [location, setLocation] = useState(undefined);

// //   useEffect(() => {
// //     const _watchId = Geolocation.watchPosition(
// //       position => {
// //         const {latitude, longitude} = position.coords;
// //         setLocation({latitude, longitude});
// //         onDisplayNotification(latitude, longitude)
// //         console.log(position)
// //       },
// //       error => {
// //         console.log(error);
// //       },
// //       {
// //         enableHighAccuracy: true,
// //         distanceFilter: 0,
// //         interval: 5000,
// //         fastestInterval: 2000,
// //         backgroundMode: true,
// //       },
// //     );
    

// //     return () => {
// //       if (_watchId) {
// //         Geolocation.clearWatch(_watchId);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <View>
// //       {location ? (
// //         <>
// //           {/* <Text>Latitude: {location.latitude}</Text>
// //           <Text>Latitude: {location.longitude}</Text> */}
// //         </>
// //       ) : (
// //         <Text>Loading...</Text>
// //       )}
// //     </View>
// //   );
// // };

// // export default WatchLocation;
// // Calculate Distance Between Two Locations in React Native App
// // https://aboutreact.com/react-native-calculate-distance-between-two-locations/

// // import React in our code
// import React from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   TouchableHighlight,
// } from 'react-native';

// /*
//  * 1. getDistance, Calculates the distance between two geo coordinates.
//  * 2. getPreciseDistance, Calculates the distance between two geo coordinates.
//  *    This method is more accurate then getDistance, especially for long distances
//  *    but it is also slower. It is using the Vincenty inverse formula for ellipsoids.
//  */
// import { getDistance, getPreciseDistance } from 'geolib';

// const App = () => {
//   const calculateDistance = () => {
//     var dis = getDistance(
//       { latitude: 20.0504188, longitude: 64.4139099 },
//       { latitude: 51.528308, longitude: -0.3817765 }
//     );
//     alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
//   };

//   const calculatePreciseDistance = () => {
//     var pdis = getPreciseDistance(
//       { latitude: 20.0504188, longitude: 64.4139099 },
//       { latitude: 51.528308, longitude: -0.3817765 }
//     );
//     alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Text style={styles.header}>
//             Example to Calculate Distance Between Two Locations
//           </Text>
//           <Text style={styles.textStyle}>
//             Distance between
//             {'\n'}
//             India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
//           </Text>
//           <TouchableHighlight
//             style={styles.buttonStyle}
//             onPress={calculateDistance}>
//             <Text>Get Distance</Text>
//           </TouchableHighlight>
//           <Text style={styles.textStyle}>
//             Precise Distance between
//             {'\n'}
//             India(20.0504188, 64.4139099) and UK (51.528308, -0.3817765)
//           </Text>
//           <TouchableHighlight
//             style={styles.buttonStyle}
//             onPress={calculatePreciseDistance}>
//             <Text>Get Precise Distance</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: 'black',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   textStyle: {
//     marginTop: 30,
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'black',
//     paddingVertical: 20,
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//     backgroundColor: '#dddddd',
//     margin: 10,
//   },
// });

// export default App;
import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  // hooks
  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  return (<GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      
      <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
      
      
    </View></GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
});

export default App;