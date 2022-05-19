import { db } from './firebaseConfig';
import { addDoc, getDocs, collection, limit, orderBy, query, where } from "firebase/firestore";


export async function getWordsDb(rangeNumber){
    try {
        const wordsList = [];
        const querySnapshot = await getDocs(query(collection(db, 'words'), 
                where("id", ">=", rangeNumber - 4), where("id", "<=", rangeNumber),
                orderBy('id', 'asc'), limit(5)));
        querySnapshot.forEach((doc) => {
            wordsList.push(doc.data());
        });
        return wordsList;
    } catch (error) {
        console.log('error')
    }
}
