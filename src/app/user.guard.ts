import { TokenService } from './service/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  constructor(
    private tokenService: TokenService,
    private router: Router
    ){}

    
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.tokenService.getIsTokenExpired(this.tokenService.getToken())){
      
      this.router.navigate([''])
    }
    console.log(this.tokenService.getIsTokenExpired(this.tokenService.getToken()))
    return true;
  }
  
}
