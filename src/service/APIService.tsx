import axios from 'axios';
import { Property, PropertyInterface } from '../common/models/property';

const url = "http://ec2-18-234-27-166.compute-1.amazonaws.com"
const endpoints = {
    user: "/user/",
    property: "/property/"
}

export const APIService =  {
    createUser,
    createProperty,
    getPropertiesByUserId,
    loginUser,
}

function createUser(email: string, password: string, firstName: string, lastName: string) : any {
    let endpoint = url + endpoints.user + 'create'
    
    let body = new FormData()
    body.append("email", email)
    body.append("first_name", firstName)
    body.append("last_name", lastName)
    body.append("password", password)

    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })

    return uninitializedResponse()
}

function createProperty(property: Property) : Response {
    let r = uninitializedResponse()

    return r
}

function getPropertiesByUserId(userId: string) : any {
    let r = uninitializedResponse()
    let endpoint = url + endpoints.property
    var propertyList:Property[] = new Array()
    return axios.get(endpoint)
    .then(function (response) {
        response.data.forEach((house: { street_address: string; id: string; description: string; }) => {
            propertyList.push(new Property({
                address : house.street_address,
                id : house.id,
                description : house.description
            }))
        });
        return propertyList
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
}

function loginUser(username: string, password: string) : Response {
    let endpoint = url + endpoints.user + 'login'
    let r = uninitializedResponse()

    axios.post(endpoint, { username: username, password: password })
        .then((response: { status: number; statusText: string; data: any; }) => {
            r = new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            r = new Response(500, error, null)
        })

    return r
}

function uninitializedResponse() : Response {
    return new Response (500, "UNITIALIZED_RESPONSE", null)
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