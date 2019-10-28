
export interface UserInterface {
    email: string
    firstName: string
    lastName: string
    id: string,
    password: string,
    token: string
    
}
export class User implements UserInterface {
    email: string
    firstName: string
    lastName: string
    id: string
    password: string
    token: string

    constructor(user: UserInterface) {
        this.email=user.email
        this.firstName=user.firstName
        this.lastName=user.lastName
        this.id=user.id
        this.password=user.password
        this.token=user.token
    }
}