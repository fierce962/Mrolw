import { db } from './firebaseConfig';
import { addDoc, getDocs, collection, limit, orderBy, query, where } from "firebase/firestore";
import { setStorage } from '../models/Storage';

export async function getWordsRangeDb(rangeMax, limitNumb = 5){
    try {
        const wordsList = [];
        const querySnapshot = await getDocs(query(collection(db, 'words'), 
                where("id", ">=", rangeMax - 4), where("id", "<=", rangeMax),
                orderBy('id', 'asc'), limit(limitNumb)));
        querySnapshot.forEach((doc) => {
            wordsList.push(doc.data());
        });
        return wordsList;
    } catch (error) {
        console.log('error', error)
    }
}

export async function createUsers(userName, id){
    const user = {
        idUser: id,
        userName: userName
    }
    const querySnapshot = await addDoc(collection(db, 'users'), user);
    await setStorage('user', user);
    return querySnapshot.id;
};

export async function getUserData(uidUser){
    try {        
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('idUser', '==', uidUser)));
        await setStorage('user', querySnapshot.docs[0].data());
    } catch (error) {
        console.log('error get userdata', error)
    }
}
