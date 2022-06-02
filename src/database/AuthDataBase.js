import { afAuth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { createUsers } from './database';

class AuthDataBase{

    async loginUser(email, password){
        console.log('login fn', email, password)
        try {            
            const login = await signInWithEmailAndPassword(afAuth, email, password);
            console.log(login)
            return 'login'
        } catch (error) {
            // auth/invalid-email
            console.log('error in login', error.code);
            if(error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found'){
                return 'invalid-email';
            }else if(error.code === 'auth/wrong-password'){
                return 'invalid-password';
            }
        }
    }

    async createUser(userName, email, password){
        console.log(email, password)
        try {
            const user = await createUserWithEmailAndPassword(afAuth, email, password);
            await createUsers(userName, user.user.uid);
            return 'create';
        } catch (error) {
            console.log('error', error.code)
            if(error.code === 'auth/email-already-in-use'){
                return 'email-duplicate';
            }
        }
    }

    async closeSession(){
        try {
            await signOut(afAuth);
        } catch (error) {
            console.log('no cerro la session', error)
        }
    }
}

const authdb = new AuthDataBase();
export const { loginUser, createUser, closeSession } = authdb;