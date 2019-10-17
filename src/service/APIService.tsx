import axios, { AxiosResponse } from 'axios';

const url = "http://localhost:2020"

export const APIService =  {
    createUser,
    loginUser,
}

function createUser(username: string, password: string, name: string) : Response {
    let endpoint = url + '/users/create'
    let r = uninitializedResponse()

    axios.post(endpoint, { username: username, password: password, name: name })
        .then((response) => {
            r = new Response(response.status, response.statusText, response.data)
        })
        .catch((error) => {
            console.log(error)
            alert(error)
            r = new Response(500, "INTERNAL_SERVER_ERROR", error)
        })

        return r
}

function loginUser(username: string, password: string) : Response {
    let endpoint = url + '/users/login'
    let r = uninitializedResponse()

    axios.post(endpoint, { username: username, password: password })
        .then((response) => {
            r = new Response(response.status, response.statusText, response.data)
        })
        .catch((error) => {
            console.log(error)
            alert(error)
            r = new Response(500, "INTERNAL_SERVER_ERROR", error)
        })

    return r
}

function uninitializedResponse() : Response {
    return new Response (500, "INTERNAL_SERVER_ERROR", null)
}

export class Response {
    code: number
    status: string
    data: any

    constructor(code: number, status: string, data: any){
        this.code = code
        this.status = status
        this.data = data
    }
}