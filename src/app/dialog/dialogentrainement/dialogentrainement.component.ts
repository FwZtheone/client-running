import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EntrainementService } from 'src/app/service/entrainement.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dialogentrainement',
  templateUrl: './dialogentrainement.component.html',
  styleUrls: ['./dialogentrainement.component.scss']
})
export class DialogentrainementComponent implements OnInit {


  id:number=  this.userService.getId();
 

  constructor(  
         @Inject(MAT_DIALOG_DATA) public data: any,
         private entrainementService:EntrainementService,
         public userService:UserService
  
) {
  

 
 }

  ngOnInit(): void {
  }

  handleSubmit(value:any){
    console.log(value)
      // this.entrainementService.subscriptionEntrainement(sportif_id,entrainment_id).subscribe(data=>{
      //   console.log(data)
      // })
  }


}
