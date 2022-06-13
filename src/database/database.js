import { db } from './firebaseConfig';
import { addDoc, getDocs, updateDoc, doc, collection, limit, orderBy, query, where } from "firebase/firestore";
import { setStorage } from '../models/Storage';
import { hasReconnected } from '../models/networkInfo';

export async function getWordsRangeDb(rangeMax, limitNumb = 5){
    try {
        const wordsList = [];
        const querySnapshot = await getDocs(query(collection(db, 'words'), 
                where("id", ">=", rangeMax - 4), where("id", "<=", rangeMax),
                orderBy('id', 'asc'), limit(limitNumb)));
        if(querySnapshot.metadata.fromCache === true){
            await hasReconnected();
            return await getWordsRangeDb(rangeMax, limitNumb);
        }else{
            querySnapshot.forEach((doc) => {
                wordsList.push(doc.data());
            });
            return wordsList;
        }
    } catch (error) {
        console.log('error', error.code)
    }
}

export async function createUsers(userName, id){
    const user = {
        idUser: id,
        userName: userName
    }
    const querySnapshot = await addDoc(collection(db, 'users'), user);
    if(querySnapshot.metadata.fromCache === true){
        await hasReconnected();
        await createUsers(userName, id);
    }else{
        user.tableId = querySnapshot.docs[0].id;
        await setStorage('user', user);
        return querySnapshot.id;
    }
};

export async function getUserData(uidUser){
    try {        
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('idUser', '==', uidUser)));
        if(querySnapshot.metadata.fromCache === true){
            await hasReconnected();
            await getUserData(uidUser);
        }else{
            const user =  querySnapshot.docs[0].data();
            user.tableId = querySnapshot.docs[0].id;
            await setStorage('user', user);
        }
    } catch (error) {
        console.log('error get userdata', error)
    }
}

export async function setUserDataWords(user){
    try {
        const id = user.tableId;
        delete user.tableId;
        await updateDoc(doc(db, 'users', id), user);
    } catch (error) {
        console.log('setuserdata', error)
    }
};

export async function getWordsTestAudio(searchWords){
    try {
        const words = [];
        const querySnapshot = await getDocs(query(collection(db, 'words'), 
                    where("id", 'in', searchWords),
                    limit(5)));
        querySnapshot.forEach((doc) => {
            words.push(doc.data());
        });
        console.log('words', words)
        return words;
    } catch (error) {
        console.log('error', error);
    }
}
