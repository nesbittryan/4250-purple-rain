export interface PropertyInterface {
    address: string
    city: string
    country: string
    description: string
    id: string
    landlordId: string
    maxOccupancy: number
    state: string
}

export class Property implements PropertyInterface {
    address: string
    city: string
    country: string
    description: string
    id: string
    landlordId: string
    maxOccupancy: number
    state: string
    
    constructor(propInterface: PropertyInterface) {
        this.address = propInterface.address
        this.city = propInterface.city
        this.country = propInterface.country
        this.description = propInterface.description
        this.id = propInterface.id
        this.landlordId = propInterface.landlordId
        this.maxOccupancy = propInterface.maxOccupancy
        this.state = propInterface.state
    }
}