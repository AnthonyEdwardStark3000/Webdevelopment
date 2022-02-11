import { Component, OnInit } from '@angular/core';
import { Contact } from '../Schemas/contacts';
import { ContactsService } from './../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [ContactsService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: number;

  constructor(private contactservice: ContactsService) { }

  ngOnInit(): void {
    this.contactservice.getContacts().subscribe(
      (contacts: any) =>{
      this.contacts = contacts
      }
    )
  }

  AddContact(newContact: any)
  {
    this.contactservice
  .addContact(newContact)
  .subscribe(contact => this.contacts.push(newContact));
  }

 DeleteContact(id: any)
  {
    this.contactservice
  .deleteContact(id)
  .subscribe();
  console.log(id);
  }

  UpdateContact(id: any)
   {
     this.contactservice
   .updateContact(id)
   .subscribe();
   console.log(id);
   }
}
