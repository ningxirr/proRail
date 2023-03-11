// import React, {useState} from 'react';
// import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground} from 'react-native';


// export default class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       routes: [
//         { rou_id: '1', rou_name: 'Fastest', backgroundcolor: 'whitesmoke' },
//         { rou_id: '2', rou_name: 'Cheapest', backgroundcolor: 'whitesmoke' },
//         { rou_id: '3', rou_name: 'Lastest Interchange', backgroundcolor: 'whitesmoke' },
//       ],
//       change: false,
//     };
//   }

//   changeBackground = item => {
//     let routes = JSON.parse(JSON.stringify(this.state.routes));

//     for (let x = 0; x < this.state.routes.length; x++) {
//       if (this.state.routes[x].rou_id == item.rou_id) {
//         routes[x].backgroundcolor = 'grey';

//         this.setState({
//           routes: routes,
//         });
//       } else {
//         routes[x].backgroundcolor = 'whitesmoke';

//         this.setState({
//           routes: routes,
//         });
//       }
//     }
//   };
//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ImageBackground source={require('../../assets/images/rocket.jpg')} resizeMode="cover" style={styles.image} ></ImageBackground>
//         <View style={styles.body}>
//           <Text style={{paddingTop: 110,fontSize: 40,fontWeight: 'bold'}}>Personalized</Text>
//           <Text style={{paddingTop: 150,fontSize: 24,fontWeight: 'bold'}}>Which route style</Text>
//           <Text style={{paddingBottom: 25,fontSize: 24,fontWeight: 'bold'}}>that matched you ?</Text>
//           {this.state.routes.map((item, key) => (
//           <TouchableOpacity
//             style={{
//               height: 45,
//               width: 358,
//               borderRadius: 10,
//               marginTop: 9,
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: item.backgroundcolor,
//             }}
//             onPress={() => this.changeBackground(item)}>
//             <Text style={{ color: 'black',fontSize: 15 }}>
//               {' '}
//               {item.rou_name}
//             </Text>
//           </TouchableOpacity>
//           ))}
//         </View>
//         <View style={styles.footer}>
//           <Button title="Next" buttonStyle={styles.button}/>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   body: {
//     flex: 9
//   },
//   footer: {
//     flex: 1
//   },
//   button: {
//     height: 45,
//     width: 358,
//     borderRadius: 10,
//     backgroundColor: 'black'
//   },
//   image: {
//     flex: 1,
//     // justifyContent: 'center',
//     right:-200,
//     top:-320,
//     height: 800,
//     width: 300
//   }
// });