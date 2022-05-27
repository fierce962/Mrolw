import { db } from './firebaseConfig';
import { addDoc, getDocs, collection, limit, orderBy, query, where } from "firebase/firestore";


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
