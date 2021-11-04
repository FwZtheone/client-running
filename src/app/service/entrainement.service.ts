import { ApiResponse } from './../interface/RegisterResponse';
import { HttpClient } from '@angular/common/http';
import { Entrainement } from './../interface/Entrainement';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntrainementService {


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




}
