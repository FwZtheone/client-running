import { AgendaComponent } from './agenda/agenda.component';
import { EntrainementComponent } from './entrainement/entrainement.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserGuard } from './user.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '', component: HomeComponent
  },
  {
    path:'inscription', component: InscriptionComponent
  },
  {
    path: 'user', component: NavigationComponent, canActivate: [UserGuard],
    
    children : [

      {
        path: '', component: DashboardComponent, canActivate: [UserGuard],
        },
      {
        
        path : 'entrainement', component: EntrainementComponent, canActivate: [UserGuard]
      },
      {
        
        path : 'agenda', component: AgendaComponent, canActivate: [UserGuard]
      },
 

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
