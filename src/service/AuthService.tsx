import { APIService } from './APIService'
import { BehaviorSubject } from 'rxjs'
import {AsyncStorage} from 'react-native'

//const currentUserSubject = new BehaviorSubject(JSON.parse(AsyncStorage.cd getItem("token")));
export const AuthService = {
    login,
    logout,
}

function login(email: string, password: string) : boolean {
    return true
    let response = APIService.loginUser(email, password)
    if (response.code != 200) {
        alert("Login attempt failed: " + response.status)
        return false
    } else {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        return true
    }
}

function logout() : boolean {
    //localStorage.removeItem('token')
    return true
}