export class Response {
    readonly code: number
    readonly isSuccess: boolean
    readonly status: string

    constructor(code: number, isSuccess: boolean, status: string) {
        this.code = code
        this.isSuccess = isSuccess
        this.status = status
    }
}

export const onLogOut = () => {
    // send logout request/invalidate token?
    return new Response(404, false, "SUCESS")
}

export const onLogIn = () => {
    // send login request
}

export const onSignUp = (name: string, email: string, password: string) => {
    // send sign up request
    return new Response(404, false, "SUCESS")
}