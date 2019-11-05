export interface ContactInterface {
  name: string,
  relationship: string,
  id: string,
}
export class Contact implements ContactInterface {
  name: string
  relationship: string
  id: string


  constructor(contact: ContactInterface) {
      this.name=contact.name
      this.relationship=contact.relationship
      this.id=contact.id
  }
}