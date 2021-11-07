import { EntrainementComponent } from './../../entrainement/entrainement.component';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EntrainementService } from 'src/app/service/entrainement.service';
import { UserService } from 'src/app/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialogentrainement',
  templateUrl: './dialogentrainement.component.html',
  styleUrls: ['./dialogentrainement.component.scss']
})
export class DialogentrainementComponent implements OnInit {

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  sportif_id:number=  this.userService.getId();
  entrainement_id:number=0;

  constructor(  
         @Inject(MAT_DIALOG_DATA) public data: any,
         private entrainementService:EntrainementService,
         public userService:UserService,
         private _snackBar: MatSnackBar,
         
  
) {
  
  this.entrainement_id = data.dataKey.id;
 
 }


 openSnackBar(msg:string,type:string[]) {
  this._snackBar.open(msg, void 0, {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 5 * 1000,
    panelClass: type
  });
}

  ngOnInit(): void {
  }

  handleSubmit(sportif_id:number,entrainement_id:number){
    this.entrainementService.subscriptionEntrainement(sportif_id,entrainement_id).subscribe(
      (data)=>{
        this.openSnackBar("Entraînement ajouté !", ["success-snackbar"])
        

    },
    (err)=>{
      this.openSnackBar("Tu as déjà cet entraînement !", ["error-snackbar"])
    }
    
    
    )
 
  }





}
