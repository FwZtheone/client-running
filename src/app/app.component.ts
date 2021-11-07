import { UserService } from './user.service';
import { TokenService } from './service/token.service';

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntrainementService } from './service/entrainement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client-running';
 constructor(private tokenService:TokenService, private userService:UserService, private entrainementService:EntrainementService){
 }
  ngOnInit(): void {
    
  }
}
