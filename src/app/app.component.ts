import { UserService } from './user.service';
import { TokenService } from './service/token.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-running';

 constructor(private tokenService:TokenService, private userService:UserService){
  // je dois vérifier si j'ai un token, si oui alors je décode le token pour récupérer l'id et je requête mon api avec getAllInformation()

  this.userService.initializeToken()

 }
}
