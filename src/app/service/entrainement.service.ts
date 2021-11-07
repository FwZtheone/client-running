import { ApiResponse } from './../interface/RegisterResponse';
import { HttpClient } from '@angular/common/http';
import { Entrainement } from './../interface/Entrainement';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import ListEntrainement from '../interface/AllEntrainement';
import EntrainementDTO from '../interface/EntrainementDto';
import AllEntrainement from '../interface/AllEntrainement';

@Injectable({
  providedIn: 'root'
})
export class EntrainementService {

 
  public entrainementSubject$ = new BehaviorSubject<Entrainement>({} as Entrainement);
  public entrainementUserSubject$ = new BehaviorSubject<Entrainement>({} as Entrainement);
  // public entrainementUserFinishedSubject$ = new BehaviorSubject<Entrainement>({} as Entrainement);

  


  sendEntrainement(entrainement:any){
    this.entrainementSubject$.next(entrainement)
  }

  afficherTousEntrainement(){
    return this.http.get<AllEntrainement>('http://localhost:8000/entrainement');
  }

  afficherTousEntrainementUser(sportif_id:number){
    return this.http.post<AllEntrainement>('http://localhost:8000/user/entrainement', {
        sportif_id,
      });
  }

  ajouterEntrainementUser(sportif_id:number,entrainement_id:number){
    return this.http.post<AllEntrainement>('http://localhost:8000/user/suivre/entrainement', {
           sportif_id,
           entrainement_id
         }) 
   }


   supprimerEntrainementUser(sportif_id:number,entrainement_id:number){
    return this.http.post<AllEntrainement>('http://localhost:8000/user/quitter/entrainement', {
           sportif_id,
           entrainement_id
         }) 
   }


  






  // je renvois tous les entraînements
  getEntrainementAPI(){
    return this.http.get<AllEntrainement>('http://localhost:8000/entrainement').subscribe(
      (data:AllEntrainement) => {
          
          return this.entrainementSubject$.next(data.response);
      }
    )
  }
    //je récupère les entraînements que mon user possède
    getEntrainementUserAPI(sportif_id:number){
      return this.http.post<AllEntrainement>('http://localhost:8000/user/entrainement', {
        sportif_id,
      
      }).subscribe((data)=>{

        this.entrainementUserSubject$.next(data.response);
      })
    }

    addEntrainementUserAPI(sportif_id:number,entrainement_id:number){
      return this.http.post<AllEntrainement>('http://localhost:8000/user/suivre/entrainement',{
        sportif_id,
        entrainement_id
      }).subscribe((data:AllEntrainement)=>{
        
        this.entrainementUserSubject$.next(data.response);
      })
    }







  //je récupère la valeur des useurs
  // getEntrainementUserFinishedAPI(sportif_id:number){
  //   return this.http.post<AllEntrainement>('http://localhost:8000/user/fini/entrainement',{
  //     sportif_id
  //   }).subscribe(
  //     (data:any) => {
  //       this.entrainementUserFinishedSubject$.next(data);
  //     }
  //   )
  // }

  // addEntrainementUserAPI(sportif_id:number,entrainement_id:number){
  //   return this.http.post<ApiResponse<AllEntrainement>>('http://localhost:8000/user/suivre/entrainement', {
  //     sportif_id,
  //     entrainement_id
  //   }).subscribe(
  //     (data:any)=>{
  //       console.log(this.entrainementUserSubject$);
  //       this.entrainementUserSubject$.next(data);
  //     }
  //   )
  // }

 
  constructor(private http: HttpClient) { }


 
}
