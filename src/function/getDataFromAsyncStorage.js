import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function (key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log("GetFromAsyncStorage: "+ jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error('Error getting recommended data:', e);
    }
  }