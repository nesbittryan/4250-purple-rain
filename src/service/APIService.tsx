import npm from 'axios';
import axios from 'axios';
import { Property, PropertyInterface } from '../common/models/property';
import { resolvePlugin } from '@babel/core';

const url = "http://ec2-18-234-27-166.compute-1.amazonaws.com"

export const APIService =  {
    createUser,
    createProperty,
    getPropertiesByUserId,
    loginUser,
}

function createUser(username: string, password: string, name: string) : Response {
    let endpoint = url + '/user/create'
    let r = uninitializedResponse()

    axios.post(endpoint, { email: username, password: password, username: name })
        .then((response: { status: number; statusText: string; data: any; }) => {
            r = new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            r = new Response(500, error, null)
        })

        return r
}

function createProperty(property: Property) : Response {
    let r = uninitializedResponse()

    return r
}

function getPropertiesByUserId(userId: string) : any {
    let r = uninitializedResponse()
    let endpoint = url + '/property/'
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
    
   /* var list:Property[] = new Array(2)
    list[0] = new Property({ address: "301 McConnell St", id: "-1", description:"My parents house"})
    list[1] = new Property({ address: "807 Gordon St", id: "-2", description:"My guelph house"})
    r.code = 200
    r.status = 'SUCCESS'
    r.data = list
    return r */
}

function loginUser(username: string, password: string) : Response {
    let endpoint = url + '/user/login'
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