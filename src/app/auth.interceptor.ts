import { Router } from '@angular/router';
import { TokenService } from './service/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


//la logique ici me permet d'éviter la duplication d'en ête header dans angular grâce à ce service j'injecte directement mon token dans toutes mes demandes vers mon API
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      headers: request.headers.set('authorization', 'Bearer ' + this.tokenService.getToken())
    })
    
    // je supprime le token et je redirige sur la page login
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          localStorage.clear();
          this.router.navigate([''])
      }
     
      const error = err.error.message || err.statusText;
          return throwError(error);
  }));
  }
}
