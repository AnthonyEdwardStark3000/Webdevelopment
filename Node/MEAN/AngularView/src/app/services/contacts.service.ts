
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
// import { Contact } from './contact';
import { Injectable, Inject } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from './../Schemas/contacts';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

check = {
  firstName : "Checker",
  lastName : "Data",
  phone : 3456
}
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  //retrieving contacts
  getContacts()
  {
    // return this.http.get('http://localhost:3000/contacts').pipe(map(function(res: any){
    //   res.json()
    // }))
    return this.http.get('http://localhost:3000/contacts');
  }



  //Adding new contact
  // addContact(newContact: any)
  // {
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/contacts', newContact)
  //   .pipe(map((res) => res
  //   ));
  // }

  addContact(newContact: Contact): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:3000/contacts', newContact);
  }

  // //delete id

  // deleteContact(id:any)
  // {
  //   return this.http.delete('http://localhost:3000/contact'+id)
  //   .pipe(map((res => res)));
  // }
  /** DELETE: delete the hero from the server */

  deleteContact(id: number): Observable<unknown> {
  const url = `${'http://localhost:3000'}/contacts/${id}`; // DELETE api/heroes/42
  return this.http.delete(url);
    }

updateContact(id: number): Observable<unknown> {
const url = `${'http://localhost:3000'}/contacts/${id}`; // update api/heroes/42
return this.http.put(url,this.check);
}

}
