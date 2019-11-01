
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
}

export interface CreatePaymentInterface {
    amount: string,
    payer: string,
    requester: string,
    description: string,
}

export class Payment implements PaymentInterface {
    amount: string
    payer: string
    requester: string
    id: string
    requested_at: string
    paid_at: string
    received_at: string
    description: string
    status: string
    other_name = ''

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
    }
}