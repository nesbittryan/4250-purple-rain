import axios, { AxiosResponse } from 'axios';
import { Property, PropertyInterface } from '../common/models/property';
import { User } from '../common/models/user';

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
    isLandlordByPropertyId,
    getTenantsInProperty,
    removeTenantFromProperty
}
/* returns true if user is landlord of a property */
function isLandlordByPropertyId(userId: string, propertyId: string): any {
    let endpoint = url + endpoints.landlord + userId
    let final = false
    return axios.get(endpoint)
    .then(function (response) {
        response.data.property_id.forEach((id: any) => {
            if (id == propertyId) 
            {
                final = true
            }
        });
        return final
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
    //let r = uninitializedResponse()
    let endpoint = url + endpoints.property + "user/" + userId
    console.log(endpoint)
    var propertyList:Property[] = new Array()
    return axios.get(endpoint)
    .then(function (response) {
        response.data.landlord.forEach((house: any) => {
            propertyList.push(new Property({
                address: house.street_address,
                city: house.city,
                country: house.country,
                state: house.state,
                id: house.id.toString(),
                maxOccupancy: house.max_occupancy,
                description: house.description
            }))
        });
        response.data.tenant.forEach((house: any) => {
            propertyList.push(new Property({
                address: house.street_address,
                city: house.city,
                country: house.country,
                state: house.state,
                id: house.id.toString(),
                maxOccupancy: house.max_occupancy,
                description: house.description
            }))
        });
        return propertyList
    })
    .catch(function (error) {
        console.log(error)
    })
}


function getTenantsInProperty(propertyId: string) : any {
    let endpoint = url + endpoints.user + "property/" + propertyId
    var userList:User[] = new Array()
    return axios.get(endpoint)
    .then(function (response) {
        response.data.tenant.forEach((user: any) => {
            userList.push(new User({
                email: user.email,
                firstName: user.first_name,
                id: user.id,
                lastName: user.last_name,
                password: "",
                token: ""
            }))     
        });
        return userList
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
    let endpoint = url + endpoints.user + 'update/' + id
    
    let body = new FormData()
    body.append("email", email)
    body.append("first_name", firstName)
    body.append("last_name", lastName)

    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function updateUserPassword(id: string, password: string) : any {

}
function removeTenantFromProperty(propertyId : string, userId: string) : Promise<Response>{
    let endpoint = url + endpoints.tenant + 'delete'
    console.log(endpoint)
    console.log(propertyId)
    console.log(userId)
    let body = new FormData()
    body.append("user_id", userId)
    body.append("property_id", propertyId)

    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
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

