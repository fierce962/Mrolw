import { afAuth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "firebase/auth";
import { createUsers } from './database';

class AuthDataBase{

    async loginUser(email, password){
        try {            
            const login = await signInWithEmailAndPassword(afAuth, email, password);
            console.log(login)
            return 'login'
        } catch (error) {
            // auth/invalid-email
            console.log('error in login', error.code);
            if(error.code === 'auth/invalid-email'){
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
}

const authdb = new AuthDataBase();
export const { loginUser, createUser } = authdb;