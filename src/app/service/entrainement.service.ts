import { ApiResponse } from './../interface/RegisterResponse';
import { HttpClient } from '@angular/common/http';
import { Entrainement } from './../interface/Entrainement';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import ListEntrainement from '../interface/ListEntrainement';

@Injectable({
  providedIn: 'root'
})
export class EntrainementService {

 
  public entrainementSubject$ = new Subject();
  public entrainementUserSubject$ = new Subject();
  public entrainementUserFinishedSubject$ = new Subject();


  sendEntrainement(entrainement:any){
    this.entrainementSubject$.next(entrainement)
  }

  getEntrainementAPI(){
    return this.http.get<ApiResponse<Entrainement>>('http://localhost:8000/entrainement').subscribe(
      (data:any) => {
          this.entrainementSubject$.next(data)
      }
    )
  }

  //je récupère les entraînements que mon user possède
  getEntrainementUserAPI(sportif_id:number){
    return this.http.post<ApiResponse<ListEntrainement>>('http://localhost:8000/user/entrainement', {
      sportif_id,
    
    }).subscribe((data:any)=>{
      
      this.entrainementUserSubject$.next(data);
    })
  }

  getEntrainementUserFinishedAPI(sportif_id:number){
    return this.http.post<ApiResponse<ListEntrainement>>('http://localhost:8000/user/fini/entrainement',{
      sportif_id
    }).subscribe(
      data => {
        this.entrainementUserFinishedSubject$.next(data);
      }
    )
  }

 







   // après
  entrainement:Entrainement = {
    id : 1,
    nom: '',
    rating: 0,
    commentaire:'',
    objectif:'',
    
    niveau: ''
  }

  constructor(private http: HttpClient) { }



  getAllEntrainement(){
      return this.http.get<ApiResponse<Entrainement>>('http://localhost:8000/entrainement');
  }



  subscriptionEntrainement(sportif_id:number,entrainement_id:number){
    return this.http.post<ApiResponse<Entrainement>>('http://localhost:8000/user/suivre/entrainement', {
      sportif_id,
      entrainement_id
    });
  }

  getEntrainementByUser(sportif_id:number){
    return this.http.post<ApiResponse<Entrainement>>('http://localhost:8000/user/entrainement', {
      sportif_id
    });
  }



  deleteEntrainementUserById(sportif_id:number,entrainement_id:number|undefined){
    return this.http.post<ApiResponse<Entrainement>>('http://localhost:8000/user/quitter/entrainement', {
      sportif_id,
      entrainement_id
    });
  }

  getEntrainementFinishedByUser(sportif_id:number){
    return this.http.post<ApiResponse<Entrainement|any>>('http://localhost:8000/user/fini/entrainement',{
      sportif_id
    });
  }




}
