import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function AllStorage(){
    const striper = await AsyncStorage.getItem('striper');
    const am = await AsyncStorage.getItem('am');
    const uuid = await AsyncStorage.getItem('uuid');
    const raceId = await AsyncStorage.getItem('raceId');
    const codeInitial = await AsyncStorage.getItem('codeInitial');
    const codeFinish  = await AsyncStorage.getItem('codeFinish');
    const confirmCodeInitial = await AsyncStorage.getItem('confirmCodeInitial');
    const confirmCodeFinish  = await AsyncStorage.getItem('confirmCodeFinish');
    const storage = {
        striper:striper,
        am:am,
        uuid:uuid,
        raceId:raceId,
        codeInitial:codeInitial,
        codeFinish:codeFinish,
        confirmCodeInitial:confirmCodeInitial,
        confirmCodeFinish:confirmCodeFinish
    }

    return storage;
}