import { TokenService } from './../service/token.service';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hide:boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private AuthService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
  }

  profileForm =  this.fb.group({


    email : ['',[Validators.minLength(1),Validators.required, Validators.email]],
    password : ['',[Validators.minLength(1),Validators.required,Validators.minLength(8)] ],
  })

  get email(){
    return this.profileForm.get('email');
  }

  get password(){
    return this.profileForm.get('password');
  }


  handleSubmit(){
    if(this.profileForm.status === "INVALID"){
      console.error('testing')
    }
    else{
      this.AuthService.connexion(this.profileForm.value).subscribe((data)=>{
        
        if(!data.success){
          
          this.openSnackBar("L'émail ou le mot de passe n'est pas bon")
        }
        else{
          console.log(data.response)
          this.openSnackBar("Connexion réussie !")
          this.tokenService.saveToken(JSON.stringify(data.response));
          this.router.navigate(['dashboard'])
          
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
