import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function (key, value) {
    try {
      console.log("Store: "+ value)
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      
    }
  }