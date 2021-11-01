import { User } from './../interface/User';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegisterResponse } from '../interface/RegisterResponse';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
  constructor(
    private router: Router,
    private http:HttpClient
  ) { }



  connexion(data:User){
    return this.http.post<RegisterResponse>('http://localhost:8000/user/login',
    data, {'headers': this.headers}
    );


  }
 
  

 
 

}
