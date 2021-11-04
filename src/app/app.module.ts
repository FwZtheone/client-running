import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './service/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';





//  ========================= MATERIAL ANGULAR ================================
import {MatTableModule} from '@angular/material/table';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { InscriptionComponent } from './inscription/inscription.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule} from '@angular/material/paginator';



// =============================================================================


//jwt 
import { JwtHelperService,JWT_OPTIONS } from "@auth0/angular-jwt";
// =============================================================================


// CHARTJS

import { ChartsModule } from 'ng2-charts';



import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import { PerfomanceComponent } from './chart/perfomance/perfomance.component';
import { EntrainementComponent } from './entrainement/entrainement.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';

// ============================ CALENDAR =====================================

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { AgendaComponent } from './agenda/agenda.component';
import { MycalendarComponent } from './mycalendar/mycalendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { DialogentrainementComponent } from './dialog/dialogentrainement/dialogentrainement.component';



import { BarRatingModule } from "ngx-bar-rating";




export function momentAdapterFactory() {
  return adapterFactory(moment);
};

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InscriptionComponent,
    DashboardComponent,
    NavigationComponent,
    PerfomanceComponent,
    EntrainementComponent,
    UserDashboardComponent,
    AgendaComponent,
    MycalendarComponent,
    DialogentrainementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatRippleModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    FullCalendarModule,
    MatDialogModule,
    BarRatingModule
    
    
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
