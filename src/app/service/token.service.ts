import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

 
  
  constructor(private jwtHelperService: JwtHelperService) { }

  public saveToken(token:string){
    localStorage.setItem('auth-token',token);
  }

  public getToken():any{
    return localStorage.getItem('auth-token');
  }

  public deleteToken():void{
    return localStorage.clear();
  }
  
  public getTokenDecoded(){
    return this.jwtHelperService.decodeToken(this.getToken())
  }

  public getTokenExpirationDate(token:string){
    return this.jwtHelperService.getTokenExpirationDate(token);
  }

  public getIsTokenExpired(token:string){
    return this.jwtHelperService.isTokenExpired(token);
  }

  public getIdOfDecodedToken(){
    return this.getTokenDecoded();
  }


}
