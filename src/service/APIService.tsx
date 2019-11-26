import { AxiosResponse } from 'axios';
import { get, post, put } from './axios-wrapper';
import { Property, PropertyInterface } from '../common/models/property';
import { User } from '../common/models/user';


const url = "http://ec2-18-234-27-166.compute-1.amazonaws.com"

const endpoints = {
  user: "/user/",
  property: "/property/",
  landlord: "/landlord/",
  tenant: "/tenant/",
  payment: "/payment/",
  maintenance: "/maintenance/"
}

export async function createMaintenanceRequest(propertyId: string, userId: string, description: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.maintenance + 'create'
  let body = new FormData()
  body.append("property_id", propertyId)
  body.append("created_by", userId.toString())
  body.append("description", description)
  console.log(body)
  return await post(endpoint, body)
}

export async function createPayment(payerId: string, requesterId: string, description: string, amount: string, dueDate: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.payment + 'request'

  let body = new FormData()
  body.append("payer", payerId)
  body.append("requester", requesterId)
  body.append("description", description)
  body.append("amount", amount)
  if (dueDate != '')
    body.append("due_date", dueDate)

  return await post(endpoint, body);
}

export async function createProperty(property: PropertyInterface, isLandlord: boolean, userId: string): Promise<AxiosResponse | undefined> {
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
  return await post(endpoint, body)
}

export async function createUser(email: string, password: string, firstName: string, lastName: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.user + 'create'

  let body = new FormData()
  body.append("email", email)
  body.append("first_name", firstName)
  body.append("last_name", lastName)
  body.append("password", password)

  return await post(endpoint, body)
}

export async function getMaintenanceRequestsByProperty(propertyId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.maintenance + 'property/' + propertyId
  return await get(endpoint)
}

export async function getPaymentsByUserId(userId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.payment + userId

  return await get(endpoint);
}

export async function getPropertiesByUserId(userId: string): any {
  let endpoint = url + endpoints.property + "user/" + userId

  var propertyList: Property[] = new Array()
  const response = await get(endpoint)
  // TODO refactor
  if (response === undefined || response.data === undefined || response.data.landlord === undefined) {
    return [];
  }
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

  // Filter duplicate property ids
  propertyList = propertyList.reduce((acc, current) => {
    const x = acc.find(p => p.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return propertyList
}

export async function getRelatedUsers(userId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.user + "related/" + userId

  return await get(endpoint);
}

export async function getTenantsInProperty(propertyId: string): any {
  let endpoint = url + endpoints.user + "property/" + propertyId
  var userList: User[] = new Array()
  const response = await get(endpoint)
  if (response === undefined) {
    return []
  }
  response.data.tenant.forEach((user: any) => {
    userList.push(new User({
      email: user.email,
      firstName: user.first_name,
      id: user.id,
      lastName: user.last_name,
      password: "",
      token: ""
    }))
  })

  return userList
}

/* returns true if user is landlord of a property */
export async function isLandlordByPropertyId(userId: string, propertyId: string): Promise<boolean> {
  let endpoint = url + endpoints.landlord + userId

  const response = await get(endpoint);
  if (response === undefined || response.data === undefined) return false;

  const isLandlord = response.data.property_id.some((id: any) => id === parseInt(propertyId));

  return isLandlord;
}

export async function loginUser(email: string, password: string): Promise<any> {
  console.info('inside');
  let endpoint = url + endpoints.user + 'login'

  let body = new FormData()
  body.append("email", email)
  body.append("password", password)

  return await post(endpoint, body);
}

export async function markMaintenanceRequestAcknowledged(requestId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.maintenance + 'acknowledge/' + requestId

  return await post(endpoint)
}

export async function markMaintenanceRequestCancelled(requestId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.maintenance + 'cancel/' + requestId

  return await post(endpoint)
}

export async function markMaintenanceRequestCompleted(requestId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.maintenance + 'complete/' + requestId

  return await post(endpoint)
}

export async function markPaymentPayed(paymentId: string, userId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.payment + 'pay'
  let body = new FormData()

  body.append("payment_id", paymentId)
  body.append("user_id", userId)

  return await put(endpoint, body);
}

export async function markPaymentReceived(paymentId: string, userId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.payment + 'receive'
  let body = new FormData()

  body.append("payment_id", paymentId)
  body.append("user_id", userId)

  return await put(endpoint, body);
}

export async function removeLandlordFromProperty(propertyId: string, userId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.landlord + 'delete'
  let body = new FormData()
  body.append("user_id", userId)
  body.append("property_id", propertyId)
  return await post(endpoint, body);
}

export async function removeTenantFromProperty(propertyId: string, userId: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.tenant + 'delete'
  let body = new FormData()
  body.append("user_id", userId)
  body.append("property_id", propertyId)

  return await post(endpoint, body);
}

export async function addTenantToPropertyByEmail(propertyId: string, userEmail: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + '/invite/tenant'
  let body = new FormData()
  body.append("email", userEmail)
  body.append("property_id", propertyId)

  return await post(endpoint, body);
}

export async function updateMaintenanceRequest(requestId: string, action: string, estCompletionDate: string, description: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.maintenance + 'update/' + requestId

  let body = new FormData()
  if (estCompletionDate != '')
    body.append("estimated_complete_date", estCompletionDate)
  body.append("action", action)
  body.append("description", description)

  return await put(endpoint, body);
}

export async function updateProperty(id: string, address: string, city: string, state: string, country: string, description: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.property + 'update/' + id

  let body = new FormData()
  body.append("street_address", address)
  body.append("city", city)
  body.append("state", state)
  body.append("country", country)
  body.append("description", description)

  return await put(endpoint, body);
}

export async function updateUser(id: string, email: string, firstName: string, lastName: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.user + 'update/' + id

  let body = new FormData()
  body.append("email", email)
  body.append("first_name", firstName)
  body.append("last_name", lastName)

  return await put(endpoint, body)
}

export async function updateUserPassword(id: string, email: string, password: string, oldPassword: string): Promise<AxiosResponse | undefined> {
  let endpoint = url + endpoints.user + 'update/password/' + id
  let body = new FormData()

  body.append("email", email)
  body.append("password", oldPassword)
  body.append("new_password", password)

  return put(endpoint, body)
}
