import { TokenService } from './../service/token.service';
import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


//line chart
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  //line chart 
  
   


  


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    private tokenService: TokenService
    ) {
      //ici se trouve toute ma logique lorsqu'on arrive sur le board
      const {user} = this.tokenService.getIdOfDecodedToken()
      this.userService.setId(user);

      //je récupère toutes les informations de mon user grace à cette méthode
      this.userService.getInformation(this.userService.getId()).subscribe(data=>{
        //ici que je vais sauvegarder toutes mes données importantes
        
        this.userService.setNom(data.response.nom);
        this.userService.setEmail(data.response.email);
        this.userService.setPrenom(data.response.prenom);
        this.userService.setSexe(data.response.sexe);
        this.userService.setPassword(data.response.password);
        this.userService.setPoids(data.response.poids);
        this.userService.setIsLogged(true);
        this.userService.setRule(data.response.rule);
        //reste age kmtotal et activité total 
        
      },
      err=>{
        console.log(err)
      })
  }
}
