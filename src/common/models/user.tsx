
export interface UserInterface {
    email: string
    firstName: string
    id: string
    lastName: string
    
}
export class user implements UserInterface {
    email: string
    firstName: string
    id: string
    lastName: string

    constructor() {
        this.firstName= ""
        this.lastName= ""
        this.email= ""
        this.id=""
    }
}