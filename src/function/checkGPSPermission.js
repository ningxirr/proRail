import { PermissionsAndroid, Platform } from 'react-native';

module.exports = async () => {
  //Ning You have to add check geolocation permission for iOS here
  if (Platform.OS === 'android') {
    try {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!response) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'ProRail App Location Permission',
            message:
              'For the app to achieve full functionality, it is necessary to have access to GPS.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
          console.log('You can use the Geolocation');
        } else {
          setHasLocationPermission(false);
          console.log('Geolocation permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
