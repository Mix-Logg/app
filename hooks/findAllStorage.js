import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function AllStorage(){
    const striper = await AsyncStorage.getItem('striper');
    const am = await AsyncStorage.getItem('am');
    const uuid = await AsyncStorage.getItem('uuid');
    
    const storage = {
        striper:striper,
        am:am,
        uuid:uuid
    }

    return storage;
}