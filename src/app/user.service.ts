import { TokenService } from './service/token.service';
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
    km_total : 0,
    niveau: 'débutant'
   }

   //getter 

  //  getNom(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.nom
  
  // }
  //  getId(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.id
  //   }
  //  getPrenom(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.prenom
  //   }
  //  getEmail(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.email
  //   }
  //  getSexe(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.sexe
  //   }
  //  getPassword(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.password
  //   }
  //  getPoids(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.poids
  //   }
  //  getIsLogged()
  //  {
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.isLogged
  //   }
  //  getRule(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.rule
  //   }
  //  getActivityTotal(){
  //    return this.user.activity_total
  //   }
  //  getKmTotal(){
  //    return this.user.km_total
  //   }
  //  getAge(){
  //   const variable = JSON.parse(`${localStorage.getItem('user')}`) ;
  //   return variable.age
  //   }



   getNom(){
     const nom = this.tokenService.getTokenDecoded()
     console.log(nom);
    return this.user.nom
  
  }
   getId(){
     return this.user.id
    }
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
   getNiveau(){return this.user.niveau}
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

  setNiveau(niveau:string):void{
    this.user.niveau = niveau;
  }
   

   




  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
 

  
  constructor(private http: HttpClient, private tokenService: TokenService) {



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


  //je récupère le token et je fais une requête pour récuperer les datas
  initializeToken(){
    try{
      const {user}  = this.tokenService.getIdOfDecodedToken();
  
      this.getInformation(user).subscribe(data=>{
        this.setId(data.response.id);
        this.setNom(data.response.nom);
        this.setEmail(data.response.email);
        this.setPrenom(data.response.prenom);
        this.setSexe(data.response.sexe);
        this.setPassword(data.response.password);
        this.setPoids(data.response.poids);
        this.setIsLogged(true);
        this.setRule(data.response.rule);
        //ajouter le niveau , age ,activité totale et km total  (4)
        this.setNiveau(data.response.niveau);
        this.setAge(data.response.age);
        this.setActivityTotal(data.response.activity_total);
        this.setKmTotal(data.response.km_total);
      })
    }
    catch(err:any){
      console.log("err");
    }
  }
  


  
  logout(){
    this.http.post('http://localhost:8000/user/logout', {
      email : this.getEmail()
    }).subscribe(data => {
      console.log(data)
    }, err=>{
      console.log(err)
    })
  }



}
