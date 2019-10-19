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

    constructor(propInterface: PropertyInterface) {
        this.address = propInterface.address
        this.description = propInterface.description
        this.id = propInterface.id
        //this.owner = property.owner
    }
}