import { Observable } from 'rxjs';
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


    variable = JSON.parse(`${localStorage.getItem('user')}`)
  
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

   getNom(){
    return this.variable.nom
  
  }
   getId(){
    return this.variable.id
    }
   getPrenom(){
    return this.variable.prenom
    }
   getEmail(){
    return this.variable.email
    }
   getSexe(){
    return this.variable.sexe
    }
   getPassword(){
    return this.variable.password
    }
   getPoids(){
    return this.variable.poids
    }
   getIsLogged()
   {
    return this.variable.isLogged
    }
   getRule(){
    return this.variable.rule
    }
   getActivityTotal(){
     return this.variable.activity_total
    }
   getKmTotal(){
     return this.variable.km_total
    }
   getAge(){
    return this.variable.age
    }

    getNiveau(){
      return this.variable.niveau
    }



  //  getNom(){
  //   return this.user.nom
  
  // }
  //  getId(){
  //    return this.user.id
  //   }
  //  getPrenom(){ return this.user.prenom}
  //  getEmail(){return this.user.email}
  //  getSexe(){ return this.user.sexe}
  //  getPassword(){return this.user.password}
  //  getPoids(){return this.user.poids}
  //  getIsLogged(){return this.user.isLogged}
  //  getRule(){return this.user.rule}
  //  getActivityTotal(){return this.user.activity_total}
  //  getKmTotal(){return this.user.km_total}
  //  getAge(){return this.user.age}
  //  getNiveau(){return this.user.niveau}
   //setter
   setNom(nom:string):void{
     this.variable.nom = nom;
   }

   setId(id:number):void{
    this.variable.id = id;
  }

  setPrenom(prenom:string):void{
    this.variable.prenom = prenom;
  }

  setEmail(email:string):void{
    this.variable.email = email;
  }

  setSexe(sexe:boolean):void{
    this.variable.sexe = sexe;
  }

  setPassword(password:string):void{
    this.variable.password = password;
  }

  setPoids(poids:number):void{
    this.variable.poids = poids;
  }

  setIsLogged(logged:boolean):void{
    this.variable.isLogged = logged;
  }

  setRule(rule:string):void{
    this.variable.rule = rule;
  }

  setActivityTotal(nb:number):void{
    this.variable.activity_total = nb;
  }

  setKmTotal(nb:number):void{
    this.variable.km_total = nb;
  }

  setAge(age:number):void{
    this.variable.age = age;
  }

  setNiveau(niveau:string):void{
    this.variable.niveau = niveau;
  }
   

   




  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
 

  
  constructor(private http: HttpClient, private tokenService: TokenService) {



   }

  inscription(data:any){
    
    return this.http.post<RegisterResponse>('http://localhost:8000/user/create',data, {'headers': this.headers});
  }




  connexion(data:User):Observable<RegisterResponse>{
    
    return this.http.post<RegisterResponse>('http://localhost:8000/user/login',
    data, {'headers': this.headers}
    )
  }



  getInformation(id:number){
    return this.http.get<ApiResponse<User>>('http://localhost:8000/user/' + id);
  }


  //je récupère le token et je fais une requête pour récuperer les datas
  initializeToken(){

      const {user}  = this.tokenService.getIdOfDecodedToken();


      this.getInformation(user).subscribe(data=>{
        this.localStorageUser(JSON.stringify(data.response));
        console.log(JSON.parse(JSON.stringify(data.response)))
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



    localStorageUser(user:any){
      localStorage.setItem('user', user)
    }
  


  
  logout(){
    this.http.post('http://localhost:8000/user/logout', {
      email : this.getEmail()
    }).subscribe(data => {
      localStorage.clear();
    }, err=>{
      console.log(err)
    })
  }



}
