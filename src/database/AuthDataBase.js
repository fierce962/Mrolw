import { afAuth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "firebase/auth";

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

    async createUser(email, password, repeatPassword, userName){
        try {
            if(password === repeatPassword){
                await signInWithEmailAndPassword(email, password);
            }else{
                console.log('la clave no coinciden')
            }
        } catch (error) {
            console.log('error in create user', error)
        }
    }
}

const authdb = new AuthDataBase();
export const { loginUser, createUser } = authdb;