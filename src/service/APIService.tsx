import axios, { AxiosResponse } from 'axios';
import { Property, PropertyInterface } from '../common/models/property';

const url = "http://ec2-18-234-27-166.compute-1.amazonaws.com"

const endpoints = {
    user: "/user/",
    property: "/property/",
    landlord: "/landlord/",
    tenant: "/tenant/"
}

export const APIService =  {
    createUser,
    createProperty,
    getPropertiesByUserId,
    loginUser,
    updateUser,
    updateUserPassword,
    isLandlordByPropertyId
}
/* returns true if user is landlord of a property */
function isLandlordByPropertyId(userId: string, propertyId: string): any {
    let endpoint = url + endpoints.landlord + userId
    return axios.get(endpoint)
    .then(function (response) {
        response.data.forEach((house: any) => {
            if (house.id = propertyId) 
            {
                return true
            }
        });
        return false
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
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
}

function createProperty(property: PropertyInterface) : Promise<Response> {
    let endpoint = url + endpoints.property + 'create'
    
    let body = new FormData()
    body.append("street_address", property.address)
    body.append("city", property.city)
    body.append("state", property.state)
    body.append("country", property.country)
    body.append("landlord_id", property.landlordId)
    body.append("max_occupancy", property.maxOccupancy.toString())
    body.append("description", property.description)

    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function getPropertiesByUserId(userId: string) : any {
    let r = uninitializedResponse()
    let endpoint = url + endpoints.property
    var propertyList:Property[] = new Array()
    return axios.get(endpoint)
    .then(function (response) {
        response.data.forEach((house: any) => {
            propertyList.push(new Property({
                address: house.street_address,
                city: house.city,
                country: house.country,
                state: house.state,
                id: house.id,
                landlordId: house.landlord_id,
                maxOccupancy: house.max_occupancy,
                description: house.description
            }))
        });
        return propertyList
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
}

function loginUser(email: string, password: string) : Promise<Response> {
    let endpoint = url + endpoints.user + 'login'

    let body = new FormData()
    body.append("email", email)
    body.append("password", password)

    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}




function updateUser(id: string, email: string, firstName: string, lastName: string) : any {

}

function updateUserPassword(id: string, password: string) : any {

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