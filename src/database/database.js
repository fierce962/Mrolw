import { db } from './firebaseConfig';
import { addDoc, getDocs, collection, limit, orderBy, query, where } from "firebase/firestore";


export async function getWordsDb(){
    //where("id", "<=", rangeNumber),
    //orderBy("id", 'asc'), limit(5)
    try {
        const querySnapshot = await getDocs(query(collection(db, 'words'), where('id', '==', 1)));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    } catch (error) {
        console.log('error')
    }
}
