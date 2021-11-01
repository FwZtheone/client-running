import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RegisterResponse, ApiResponse } from './interface/RegisterResponse';
import { User } from './interface/User';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  
   user: User= {
    nom: "",
    id: 0,
    prenom: '',
    age: 0,
    email: '',
    sexe: false,
    password: '',
    poids: 0,
    isLogged: false,
    rule: '',
    activity_total: 0,
    km_total : 0

   }

   //getter 

   getNom(){return this.user.nom}
   getId(){return this.user.id}
   getPrenom(){ return this.user.prenom}
   getEmail(){return this.user.email}
   getSexe(){ return this.user.sexe}
   getPassword(){return this.user.password}
   getPoids(){return this.user.poids}
   getIsLogged(){return this.user.isLogged}
   getRule(){return this.user.rule}
   getActivityTotal(){return this.user.activity_total}
   getKmTotal(){return this.user.km_total}
   getAge(){return this.user.age}


   //setter
   setNom(nom:string):void{
     this.user.nom = nom;
   }

   setId(id:number):void{
    this.user.id = id;
  }

  setPrenom(prenom:string):void{
    this.user.prenom = prenom;
  }

  setEmail(email:string):void{
    this.user.email = email;
  }

  setSexe(sexe:boolean):void{
    this.user.sexe = sexe;
  }

  setPassword(password:string):void{
    this.user.password = password;
  }

  setPoids(poids:number):void{
    this.user.poids = poids;
  }

  setIsLogged(logged:boolean):void{
    this.user.isLogged = logged;
  }

  setRule(rule:string):void{
    this.user.rule = rule;
  }

  setActivityTotal(nb:number):void{
    this.user.activity_total = nb;
  }

  setKmTotal(nb:number):void{
    this.user.km_total = nb;
  }

  setAge(age:number):void{
    this.user.age = age;
  }

   

   




  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
 

  
  constructor(private http: HttpClient) {



   }

  inscription(data:any){
    
    return this.http.post<RegisterResponse>('http://localhost:8000/user/create',data, {'headers': this.headers});
  }




  connexion(data:User){
    
    return this.http.post<RegisterResponse>('http://localhost:8000/user/login',
    data, {'headers': this.headers}
    )
  }



  getInformation(id:number){
    return this.http.get<ApiResponse<User>>('http://localhost:8000/user/' + id);
  }





}
