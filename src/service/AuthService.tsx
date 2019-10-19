import { APIService } from './APIService'

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
        return true
    }
}

function logout() : boolean {
    //localStorage.removeItem('token')
    return true
}