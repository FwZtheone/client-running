export interface Entrainement {
    id : 1;
    commentaire:string;
    rating:number;
    nom:string;
    niveau:string;
    objectif:string;
    Entrainements?:[];
    SportifEntrainement?:Sport;
}

interface Sport {

    entrainement_id:number;
}

