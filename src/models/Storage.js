import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage{
    async getStorage(nameItem){
        try {
            return await AsyncStorage.getItem(nameItem);
        } catch (error) {
            console.log('ha sucedido un error');
        }
    }

    async setStorage(itemName, value){
        try {
            const jsonItem = JSON.stringify(value)
            await AsyncStorage.setItem(itemName, jsonItem);
            return 'create';
        } catch (e) {
            console.log('ha sucedido un error')
        }
    }
}

export const { getStorage, setStorage } = new Storage();