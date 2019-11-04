
export interface PaymentInterface {
    amount: string
    payer: string
    requester: string
    id: string,
    requested_at: string,
    paid_at: string,
    received_at: string,
    description: string,
    status: string,
    other_name:string,
    due_date: string
}

export class Payment implements PaymentInterface {
    amount= ''
    payer= ''
    requester= ''
    id= ''
    requested_at= ''
    paid_at= ''
    received_at= ''
    description= ''
    status= ''
    other_name= ''
    due_date=''

    constructor(payment: PaymentInterface) {
        this.id=payment.id
        this.amount=payment.amount
        this.description=payment.description

        this.payer=payment.payer
        this.requester=payment.requester
        
        this.requested_at=payment.requested_at
        this.paid_at=payment.paid_at
        this.received_at=payment.received_at
        this.status=payment.status
        this.due_date=payment.due_date
        this.other_name=payment.other_name
    }
}