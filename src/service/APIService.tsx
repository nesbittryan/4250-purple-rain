import axios from 'axios';
import { Property, PropertyInterface } from '../common/models/property';
import { User } from '../common/models/user';
import { Payment } from '../common/models/payment'


const url = "http://ec2-18-234-27-166.compute-1.amazonaws.com"

const endpoints = {
    user: "/user/",
    property: "/property/",
    landlord: "/landlord/",
    tenant: "/tenant/",
    payment: "/payment/"
}

export const APIService =  {
    createPayment,
    createProperty,
    createUser,
    getTenantsInProperty,
    getPropertiesByUserId,
    getPaymentsByUserId,
    getRelatedUsers,
    isLandlordByPropertyId,
    loginUser,
    markPaymentPayed,
    markPaymentReceived,
    removeTenantFromProperty,
    addTenantToPropertyByEmail,
    updateProperty,
    updateUser,
    updateUserPassword,
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
        console.log(error)
    })
}

function createPayment(payerId: string, requesterId: string, description: string, amount: string, dueDate: string) : Promise<Response> {
    let endpoint = url + endpoints.payment + 'request'

    let body = new FormData()
    body.append("payer", payerId)
    body.append("requester", requesterId)
    body.append("description", description)
    body.append("amount", amount)
    if (dueDate != '')
        body.append("due_date", dueDate)

    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function createProperty(property: PropertyInterface, isLandlord: boolean, userId: string) : Promise<Response> {
    let endpoint = url + endpoints.property + 'create'
    
    let body = new FormData()
    body.append("street_address", property.address)
    body.append("city", property.city)
    body.append("state", property.state)
    body.append("country", property.country)
    body.append("max_occupancy", property.maxOccupancy.toString())
    body.append("description", property.description)
    body.append("assign_as", isLandlord ? "landlord" : "tenant")
    body.append("user_id", userId)
    
    return axios.post(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function createUser(email: string, password: string, firstName: string, lastName: string) : Promise<Response> {
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

function getPaymentsByUserId(userId: string) : Promise<Response> {
    let endpoint = url + endpoints.payment + '?user_id=' + userId

    return axios.get(endpoint)
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function getPropertiesByUserId(userId: string) : any {
    let endpoint = url + endpoints.property + "user/" + userId
    
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

function getRelatedUsers(userId: string) : Promise<Response> {
    let endpoint = url + endpoints.user + "related/" + userId

    return axios.get(endpoint)
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
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
        .then((response) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function markPaymentPayed(paymentId: string, userId: string) : Promise<Response> {
    let endpoint = url + endpoints.payment + 'pay'
    let body = new FormData()
    
    body.append("payment_id", paymentId)
    body.append("user_id", userId)

    return axios.put(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function markPaymentReceived(paymentId: string, userId: string) : Promise<Response> {
    let endpoint = url + endpoints.payment + 'receive'
    let body = new FormData()

    body.append("payment_id", paymentId)
    body.append("user_id", userId)

    return axios.put(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response: { status: number; statusText: string; data: any; }) => {
            return new Response(response.status, response.statusText, response.data)
        })
        .catch((error: string) => {
            console.log(error)
            return new Response(500, error, null)
        })
}

function removeTenantFromProperty(propertyId : string, userId: string) : Promise<Response> {
    let endpoint = url + endpoints.tenant + 'delete'
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

function addTenantToPropertyByEmail(propertyId: string, userEmail: string): Promise<Response> {
    let endpoint = url + '/invite/tenant'
    let body = new FormData()
    
    body.append("email", userEmail)
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

function updateProperty(id: string, address: string, city: string, state: string, country: string, description: string) : Promise<Response> {
    let endpoint = url + endpoints.property + 'update/' + id

    let body = new FormData()
    body.append("street_address", address)
    body.append("city", city)
    body.append("state", state)
    body.append("country", country)
    body.append("description", description)

    return axios.put(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
    .then((response: { status: number; statusText: string; data: any; }) => {
        return new Response(response.status, response.statusText, response.data)
    })
    .catch((error: string) => {
        console.log(error)
        return new Response(500, error, null)
    })
}

function updateUser(id: string, email: string, firstName: string, lastName: string) : Promise<Response> {
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

function updateUserPassword(id: string, email: string, password: string, oldPassword: string) : Promise<Response> {
    let endpoint = url + endpoints.user + 'update/password/' + id
    let body = new FormData()

    body.append("email", email)
    body.append("password", oldPassword)
    body.append("new_password", password)

    return axios.put(endpoint, body, { headers: {'Content-Type': 'multipart/form-data' }})
    .then((response: { status: number; statusText: string; data: any; }) => {
        return new Response(response.status, response.statusText, response.data)
    })
    .catch((error: string) => {
        console.log(error)
        return new Response(500, error, null)
    })
}