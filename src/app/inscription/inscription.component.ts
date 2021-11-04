import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';




interface Sexe {
  value : boolean;
  viewValue : string;
}

interface Niveau {
  value: string,
  viewValue: string
}









@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {


  sexe : Sexe[] = [{value : false , viewValue : 'Homme',},{value : true , viewValue : 'Femme'}]
  niveau: Niveau[] = [
    {value:"debutant", viewValue : "Débutant"},
    {value:"intermediaire", viewValue : "intermédiaire"},
    {value:"expert", viewValue : "Expert"},
]
  // pattern pour avoir un mot de passe avec 8 lettres, M, @
  //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  profileForm =  this.fb.group({


    nom : ['', [Validators.minLength(1),Validators.required]] ,
    prenom : ['',[Validators.minLength(1),Validators.required] ],
    email : ['',[Validators.minLength(1),Validators.required, Validators.email]],
    password : ['',[Validators.minLength(1),Validators.required,Validators.minLength(8)] ],
    sexe : ['',[Validators.required] ],
    poids : ['',[Validators.required] ],
    niveau : ['',[Validators.required] ],
    age : ['',[Validators.required] ]
  })
  


  //ici je mets la notification
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder, 
    private router: Router ,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  get nom(){
    return this.profileForm.get('nom');
  }


  get prenom(){
    return this.profileForm.get('prenom');
  }

  get email(){
    return this.profileForm.get('email');
  }

  get password(){
    return this.profileForm.get('password');
  }

  get poids(){
    return this.profileForm.get('poids');
  }

  get getSexe(){
    return this.profileForm.get('sexe');
  }


  get age(){
    return this.profileForm.get('age');
  }

  get getNiveau(){
    return this.profileForm.get('niveau')
  }

   handleSubmit(){
    if(this.profileForm.status === "INVALID"){
      console.error('erreur')
      
    }
    else{
      this.userService.inscription(this.profileForm.value).subscribe((data)=>{
        console.log(data);
        if(!data.success){
          this.openSnackBar("l'émail est déjà prise")
        }
        else{
          this.openSnackBar("inscription réussie !")
          this.router.navigate(['']);
        }
      })
    }
  }



  openSnackBar(msg:string) {
    this._snackBar.open(msg, void 0, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    });
  }



}
