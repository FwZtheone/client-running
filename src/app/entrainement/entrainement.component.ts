import { DialogentrainementComponent } from './../dialog/dialogentrainement/dialogentrainement.component';
import { Entrainement } from './../interface/Entrainement';
import { UserService } from './../user.service';
import { Component, OnInit,  OnDestroy,ViewChild ,AfterViewInit} from '@angular/core';
import { EntrainementService } from '../service/entrainement.service';
import {MatDialog} from '@angular/material/dialog';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import {ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';
import AllEntrainement from '../interface/AllEntrainement';


export interface TableauEntrainement {
  id:number,
  nom: string;  
  objectif: string;
  niveau: string;
  commentaire:string;
  rating:number;
}

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';




@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.scss']
})


export class EntrainementComponent  implements OnInit, OnDestroy  {

  
 


  test:number=1;
  displayedColumns: string[] = ['id', 'nom', 'objectif',  'niveau', "commentaire", "rating","ajouter"];



  dataSource:any;
  clickedRows = new Set<TableauEntrainement>();



  displayedColumnsUser: string[] = ['id','nom','objectif','niveau','commentaire','rating','delete','finish'];
  dataSourceUser:any;
  clickedRowsUser = new Set<TableauEntrainement>();




  displayedColumnsUserFini: string[] = ['id', 'nom', 'objectif',  'niveau', "commentaire", "rating"];



  dataSourceUserFini:any;
  clickedRowsFini = new Set<TableauEntrainement>();


   // mon composant qui veut écouter 
 

  //  private subscriptionName = new Subscription();
  //  private subscriptionListEntrainement = new Subscription();
  //  private subscriptionListEntrainementFinished = new Subscription();
 
   
  ngOnDestroy(){
    // this.subscriptionName.unsubscribe();
    // this.subscriptionListEntrainement.unsubscribe();
    // this.subscriptionListEntrainementFinished.unsubscribe();
  }


  constructor(
    public userService: UserService, 
    public entrainementService:EntrainementService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

    ) {

       




      // this.entrainementService.getEntrainementAPI()
      //   this.entrainementService.getEntrainementUserAPI(this.userService.getId());
        // this.entrainementService.getEntrainementUserFinishedAPI(this.userService.getId())
        // this.subscriptionName = this.entrainementService.entrainementSubject$.subscribe((data)=>{
         
        //   this.dataSource = data
        // })

        // this.subscriptionListEntrainement = this.entrainementService.entrainementUserSubject$.subscribe(
        //   (data:any)=>{
        //     this.dataSourceUser = data.Entrainements
        //   }
        // )

        // this.subscriptionListEntrainementFinished = this.entrainementService.entrainementUserFinishedSubject$.subscribe(
        //   (data:any) => {
        //     this.dataSourceUserFini = data.response[0].Entrainements
        //   }
        // )

       
      
   }

   durationInSeconds = 5;
   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.entrainementService.afficherTousEntrainement().subscribe(
      data => {
          this.dataSource = data.response
      }
    )

    this.entrainementService.afficherTousEntrainementUser(this.userService.getId()).subscribe(
      (data:any)=>{
        
        this.dataSourceUser = data.response.Entrainements
      }
    )

    
  }
  openSnackBar(msg:string,type:string[]) {
    this._snackBar.open(msg, void 0, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
      panelClass: type
    });
  }


  handleAjouter(element:Entrainement){
    
   
    this.entrainementService.ajouterEntrainementUser(this.userService.getId(),element.id).subscribe(
      data =>{
        this.openSnackBar("Entraînement ajouté !", ["success-snackbar"])
        this.ngOnInit()

      },
      err =>{
        this.openSnackBar("Tu as déjà cet entraînement !", ["error-snackbar"])
      }
    )

   
 
  }



   openDialog(row:any) {
    const dialogRef = this.dialog.open(DialogentrainementComponent, { data: {
      dataKey: row
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  
  handleDelete(element:Entrainement){
   
    this.entrainementService.supprimerEntrainementUser(this.userService.getId(), element.id).subscribe(
      (data) => {
        console.log(data)
        this.ngOnInit();
        
      }
      ,
      err => {
        console.log(err);
      }
    )
   }


  






}


