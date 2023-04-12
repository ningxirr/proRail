import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function (key) {
    try 
    {
        console.log("Remove: "+ key)
        await AsyncStorage.removeItem(key)
    } 
    catch(e) 
    {
        console.log(e)
    }
}