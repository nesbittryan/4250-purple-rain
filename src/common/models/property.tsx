import { user } from './user'

export interface PropertyInterface {
    address: string
    description: string
    id: string
    //owner: user
}

export class Property {
    address: string
    description: string
    id: string
    //owner: user

    constructor(property: PropertyInterface) {
        this.address = property.address
        this.description = property.description
        this.id = property.id
        //this.owner = property.owner
    }
}