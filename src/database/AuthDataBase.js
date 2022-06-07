import { afAuth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { createUsers, getUserData } from './database';
import { hasReconnected } from '../models/networkInfo';
class AuthDataBase{

    async loginUser(email, password){
        try {            
            const resultLogin = await signInWithEmailAndPassword(afAuth, email, password);
            await getUserData(resultLogin.user.uid);
            return 'login'
        } catch (error) {
            if(error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found'){
                return 'invalid-email';
            }else if(error.code === 'auth/wrong-password'){
                return 'invalid-password';
            }if(error.code === 'auth/network-request-failed'){
                console.log('error conection in login user');
                await hasReconnected();
                return await loginUser(email, password);
            }
        }
    }

    async createUser(userName, email, password){
        try {
            const user = await createUserWithEmailAndPassword(afAuth, email, password);
            const userId = await createUsers(userName, user.user.uid);
            return userId;
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                return 'email-duplicate';
            }if(error.code === 'auth/network-request-failed'){
                await hasReconnected();
                return await createUser(userName, email, password);
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