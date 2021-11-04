import { DialogentrainementComponent } from './../dialog/dialogentrainement/dialogentrainement.component';
import { Entrainement } from './../interface/Entrainement';
import { UserService } from './../user.service';
import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { EntrainementService } from '../service/entrainement.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';




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


export class EntrainementComponent   {

 
  displayedColumns: string[] = ['id', 'nom', 'objectif',  'niveau', "commentaire", "rating"];
  dataSource:any;
  clickedRows = new Set<TableauEntrainement>();

  constructor(
    public userService: UserService, 
    public entrainementService:EntrainementService,
    public dialog: MatDialog
    
    ) {
    this.entrainementService.getAllEntrainement().subscribe((data)=>{
      
      this.dataSource = data.response;

    })
   }


   openDialog(row:any) {
    const dialogRef = this.dialog.open(DialogentrainementComponent, { data: {
      dataKey: row
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }








}


