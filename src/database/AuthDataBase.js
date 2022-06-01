import { afAuth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "firebase/auth";
import { createUsers } from './database';

class AuthDataBase{

    async loginUser(email, password){
        try {            
            const login = await signInWithEmailAndPassword(afAuth, email, password);
            console.log(login)
        } catch (error) {
            // auth/invalid-email
            console.log('error in login', error.code)
        }
    }

    async createUser(userName, email, password){
        console.log(email, password)
        try {
            const user = await createUserWithEmailAndPassword(afAuth, email, password);
            await createUsers(userName, user.user.uid);
        } catch (error) {
            // (auth/email-already-in-use)
            console.log('error in create user', error)
        }
    }
}

const authdb = new AuthDataBase();
export const { loginUser, createUser } = authdb;