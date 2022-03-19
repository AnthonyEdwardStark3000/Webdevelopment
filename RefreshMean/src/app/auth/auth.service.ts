import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService
{
  constructor(private http: HttpClient){}
  createUser(email: String, password: String)
  {
    const authData: AuthData = { email: email, password: password}
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    }); // this line stuck me for days simple subscription and error handling fixed it.
    console.log("create User");
  }

  login(email: String,password: String){
    const authData: AuthData = {email: email, password: password}
    this.http.post("http://localhost:3000/api/user/login", authData).subscribe(res=>{
      console.log(res);
    });
  }

}
