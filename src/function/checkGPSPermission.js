import { PermissionsAndroid } from 'react-native';

module.exports = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ProRail App Location Permission',
          message:
            'For the app to achieve full functionality, it is necessary to have access to GPS.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
        console.log('You can use the camera');
      } else {
        setHasLocationPermission(false);
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };