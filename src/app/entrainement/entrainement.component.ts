import { DialogentrainementComponent } from './../dialog/dialogentrainement/dialogentrainement.component';
import { Entrainement } from './../interface/Entrainement';
import { UserService } from './../user.service';
import { Component, OnInit,  OnDestroy,ViewChild ,AfterViewInit} from '@angular/core';
import { EntrainementService } from '../service/entrainement.service';
import {MatDialog} from '@angular/material/dialog';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import {ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';


export interface TableauEntrainement {
  id:number,
  nom: string;  
  objectif: string;
  niveau: string;
  commentaire:string;
  rating:number;
}






@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.scss']
})


export class EntrainementComponent  implements OnInit, OnDestroy  {

  
 


  test:number=1;
  displayedColumns: string[] = ['id', 'nom', 'objectif',  'niveau', "commentaire", "rating"];



  dataSource:any;
  clickedRows = new Set<TableauEntrainement>();



  displayedColumnsUser: string[] = ['id','nom','objectif','niveau','commentaire','rating','delete','finish'];
  dataSourceUser:any;
  clickedRowsUser = new Set<TableauEntrainement>();




  displayedColumnsUserFini: string[] = ['id', 'nom', 'objectif',  'niveau', "commentaire", "rating"];



  dataSourceUserFini:any;
  clickedRowsFini = new Set<TableauEntrainement>();


   // mon composant qui veut écouter 
 

   private subscriptionName = new Subscription();
   private subscriptionListEntrainement = new Subscription();
   private subscriptionListEntrainementFinished = new Subscription();
 
   
  ngOnDestroy(){
    this.subscriptionName.unsubscribe();
    this.subscriptionListEntrainement.unsubscribe();
    this.subscriptionListEntrainementFinished.unsubscribe();
  }


  constructor(
    public userService: UserService, 
    public entrainementService:EntrainementService,
    public dialog: MatDialog,


    ) {
        this.entrainementService.getEntrainementAPI()
        this.entrainementService.getEntrainementUserAPI(this.userService.getId());
        this.entrainementService.getEntrainementUserFinishedAPI(this.userService.getId())
        this.subscriptionName = this.entrainementService.entrainementSubject$.subscribe((data:any)=>{
          this.dataSource = data.response
        })

        this.subscriptionListEntrainement = this.entrainementService.entrainementUserSubject$.subscribe(
          (data:any)=>{
            this.dataSourceUser = data.response.Entrainements
          }
        )

        this.subscriptionListEntrainementFinished = this.entrainementService.entrainementUserFinishedSubject$.subscribe(
          (data:any) => {
            this.dataSourceUserFini = data.response[0].Entrainements
          }
        )

       
      
   }

  ngOnInit(): void {


    // this.entrainementService.getEntrainementAPI()
    // forkJoin([this.entrainementService.getAllEntrainement(),this.entrainementService.getEntrainementByUser(this.userService.getId()),this.entrainementService.getEntrainementFinishedByUser(this.userService.getId())]).subscribe(
    //   data => {
    //     this.dataSource = data[0].response;
    //     this.dataSourceUser = data[1].response.Entrainements;
    //     this.dataSourceUserFini = data[2].response[0].Entrainements
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )
    
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
     this.entrainementService.deleteEntrainementUserById(this.userService.getId(), element.SportifEntrainement?.entrainement_id).subscribe(
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


