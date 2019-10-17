
export interface UserInterface {
    email: string
    firstName: string
    lastName: string
    token: string
    
}
export class User implements UserInterface {
    email: string
    firstName: string
    lastName: string
    token: string

    constructor() {
        this.firstName= ""
        this.lastName= ""
        this.email= ""
        this.token=""
    }
}