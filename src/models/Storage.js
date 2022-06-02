import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage{
    async getStorage(nameItem){
        try {
            return JSON.parse(await AsyncStorage.getItem(nameItem));
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

    async removeStorage(itemName){
        try {
            await AsyncStorage.removeItem(itemName);
        } catch (error) {
            console.log('error');
        }
    }

    async clearAll(){
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log('error clear Store', error);
        }
    }
}

export const { getStorage, setStorage, removeStorage, clearAll } = new Storage();