import axios from 'axios';
import { Property, PropertyInterface } from '../common/models/Property';

const url = "http://localhost:2020"

export const APIService =  {
    createUser,
    createProperty,
    getPropertiesByUserId,
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
            r = new Response(500, error, null)
        })

        return r
}

function createProperty(property: Property) : Response {
    let r = uninitializedResponse()

    return r
}

function getPropertiesByUserId(userId: string) : Response {
    let r = uninitializedResponse()
    var list:Property[] = new Array(2)
    list[0] = new Property({ address: "301 McConnell St", id: "-1", description:"My parents house"})
    list[1] = new Property({ address: "807 Gordon St", id: "-2", description:"My guelph house"})
    r.code = 200
    r.status = 'SUCCESS'
    r.data = list
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
            r = new Response(500, error, null)
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