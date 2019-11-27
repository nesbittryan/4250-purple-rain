import { Property } from './property';

export interface ContactInterface {
  name: string,
  relationship: string,
  id: string,
  property: Property,
}
export class Contact implements ContactInterface {
  name: string
  relationship: string
  id: string
  property: Property


  constructor(contact: ContactInterface) {
      this.name=contact.name
      this.relationship=contact.relationship
      this.id=contact.id
      this.property=contact.property
  }
}